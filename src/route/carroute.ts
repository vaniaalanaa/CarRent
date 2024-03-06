import express from "express";
import { createCar, readCar, updateCar, delateCar } from "../controller/car";

const app = express()

app.use(express.json())

app.get(`/car`, readCar)
app.post(`/car`, createCar)
app.put(`/car/:carID`, updateCar)
app.delete(`/car/:carID`, delateCar)

export default app 