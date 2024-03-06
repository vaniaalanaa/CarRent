import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { stat } from "fs"
import md5 from "md5"
import { sign } from "jsonwebtoken"

const prisma = new PrismaClient()

const createAdmin = async (request: Request, response: Response) => {
    try {
        const adminName = request.body.adminName
        const email = request.body.email
        const password = md5(request.body.password)


        const newData = await prisma.admin.create({
            data: {
                adminName,
                email,
                password

            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: `Admin has been created`,
                data: newData
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}
const readAdmin = async (request: Request, response: Response) => {
    try {
        const dataAdmin = await prisma.admin.findMany()
        return response
            .status(200)
            .json({
                status: true,
                message: `Admin has been loaded`,
                data: dataAdmin
            })
            
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const updateAdmin = async (request: Request, response: Response) => {
    try {
        const AdminId = request.params.AdminId
        const adminName = request.body.adminName
        const email = request.body.email
        const password = md5(request.body.password)

        const findAdmin = await prisma.admin.findFirst({
            where: { adminID: Number(AdminId) }

        })

        if (!findAdmin) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Admin event not found`
                })
        }

        const dataAdmin = await prisma.admin.update({
            where: { adminID: Number(AdminId) },
            data: {
                adminName: adminName || findAdmin.adminName,
                email: email || findAdmin.email,
                password: password || findAdmin.password
            }
        })
        return response.status(200)
            .json({
                status: true,
                message: `Data has beed updated`,
                data: dataAdmin
            })

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}
const delateAdmin = async (request: Request, response: Response) => {
    try {
        const AdminId = request.params.AdminId
        const findAdmin = await prisma.admin.findFirst({
            where: { adminID: Number(AdminId) }
        })



        if (!findAdmin) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Seat not found`
                })
        }
        const dataAdmin = await prisma.admin.delete({
            where: { adminID: Number(AdminId) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `admin  tiket has been deleted`
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const login = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5(request.body.password)
        const admin = await prisma.admin.findFirst(

            {
                where: { email: email, password: password }
            }
        )
        if (admin) {
            const payload = admin
            const secretkey = 'caca'
            const token = sign(payload,secretkey)
            return response.status(200).json({
                status: true,
                message: "login berhasil",
                token: token

            })
        }

        else {
            return response.status(200).json({
                status: false,
                message: "gagal berhasil bos"
            })
        }

    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}
export { createAdmin, readAdmin, updateAdmin, delateAdmin, login }