import exp from "constants";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
const verifyAdmin = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.headers.authorization
        const token = header?.split(" ")[1] || ''
        const secretkey = 'caca'
        verify(token, secretkey, error =>{
            if (error) {
                return response.status(401).json
               ({
                   status: false,
                    message: "unautorized"
   
               })
              }
              next()
        })

    } catch (error) {
        return response.status(500).json
            ({
                status: false,
                message: "eror"
            })
    }
}

export{verifyAdmin}