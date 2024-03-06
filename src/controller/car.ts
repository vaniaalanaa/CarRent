import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient()
const createCar = async (request: Request, response: Response) => {
    try {
        const nopol = request.body.nopol
        const merk_mobil = request.body.merk_mobil
        const harga_perhari = request.body.harga_perhari

        const dataCar = await prisma.car.create({
            data: {
                nopol: nopol,
                merk_mobil: merk_mobil,
                harga_perhari: harga_perhari

            }
        })
        return response
            .status(200)
            .json({
                status: true,
                massage: `Car has been created`,
                data: dataCar
            })

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                massage: error
            })
    }
}

const readCar = async (request: Request, response: Response) => {
    try {
        const page = Number (request.query.page) || 1;
        const qty = Number (request.query.qty) || 10;
        const keyword = request.query.keyword?.toString() ||"";
        const dataCar = await prisma.car.findMany({
            take: qty,
            skip: (page - 1)*qty,
            where:{
                OR:[
                    {nopol: {contains: keyword}},
                    {merk_mobil: {contains: keyword}}
                ]
            }
        })
        return response
            .status(200)
            .json({
                status: true,
                massage: `Car has been loaded`,
                data: dataCar
            })

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                massage: error
            })
    }
}
const updateCar = async (request: Request, response: Response) => {
    try {
    const carID = request.params.carID
    const nopol = request.body.nopol
    const harga_perhari = Number(request.body.harga_perhari)
    
    const findCar = await prisma.car.findFirst({
        where: {carID: Number(carID)}
    })
    if(!findCar){
        return response 
        .status(400)
        .json({
            status: false,
            massage: `Data car not found`
        })
    }

    const dataCar = await prisma.car.update({
        where:{carID: Number(carID)},
        data: {
            nopol: nopol || findCar.nopol,
            harga_perhari: harga_perhari || findCar.harga_perhari
        }
    })
    return response.status(200).json({
        status: true,
        massage: `Car has been update`,
        data: dataCar
    })

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                massage: error
            })
    }
}
const delateCar = async (request: Request, response: Response) => {
    try {
        const carID = request.params.carID
        const findCar = await prisma.car.findFirst({
            where: { carID: Number(carID) }
        })



        if (!findCar) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Seat not found`
                })
        }
        const dataCar = await prisma.car.delete({
            where: { carID: Number(carID) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `car  tiket has been deleted`
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
export {createCar, readCar,updateCar, delateCar}