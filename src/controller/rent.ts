import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()


const createRent = async (request: Request, response: Response) => {
    try {
        const carID = (request.body.carID)
        const rentID = Number(request.body.rentID)
        const nama_pengguna = request.body.nama_pengguna
        const tanggal = new Date(request.body.tanggal).toISOString()
        const lama_sewa = Number(request.body.lama_sewa)
        const car = await prisma.car.findFirst({ where: { carID: carID } })
        if (!car) {
            return response.status(400).json({
                status: false,
                message: `Data car not found`
            })
        }
        const total_bayar = car.harga_perhari * lama_sewa


        const newData = await prisma.rent.create({
            data: {
                carID,
                rentID,
                nama_pengguna,
                tanggal,
                lama_sewa,
                total_bayar

            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: `rent has been created`,
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

const readRent = async (request: Request, response: Response) => {
    try {
        const dataRent = await prisma.rent.findMany()
        return response
            .status(200)
            .json({
                status: true,
                message: `rent has been loaded`,
                data: dataRent
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

const updateRent = async (request: Request, response: Response) => {
    try {

        const rentID = request.params.rentID
        const carID = request.body.carID
        const nama_pengguna = request.body.nama_pengguna
        const tanggal = new Date(request.body.tanggal).toISOString()
        const lama_sewa = request.body.lama_sewa
        const car = await prisma.car.findFirst({ where: { carID: carID } })
        if (!car) {
            return response.status(400).json({
                status: false,
                message: `Data car not found`
            })
        }
        const total_bayar = car.harga_perhari * lama_sewa


        const findrent = await prisma.rent.findFirst({
            where: { rentID: Number(rentID) }
        })

        if (!findrent) {
            return response.status(400)
                .json({
                    status: false,
                    message: `rent event not found`
                })
        }

        const dataRent = await prisma.rent.update({
            where: { rentID: Number(rentID) },
            data: {
                carID: carID || findrent.carID,
                nama_pengguna: nama_pengguna || findrent.nama_pengguna,
                tanggal: tanggal || findrent.tanggal,
                lama_sewa: lama_sewa || findrent.lama_sewa,
                total_bayar: total_bayar || findrent.total_bayar
            }
        })
        return response.status(200)
            .json({
                status: true,
                message: `rent has beed updated`,
                data: dataRent
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
const delateRent = async (request: Request, response: Response) => {
    try {
        const rentID = request.params.rentID

        const findrent = await prisma.rent.findFirst({
            where: { rentID: Number(rentID) }
        })

        if (!findrent) {
            return response.status(400)
                .json({
                    status: false,
                    message: `rent not found`
                })
        }
        const dataRent = await prisma.rent.delete({
            where: { rentID: Number(rentID) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `rent  has been deleted`
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

export { createRent, readRent, updateRent, delateRent }