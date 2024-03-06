import express from "express";
import { createRent, readRent, updateRent, delateRent } from "../controller/rent";

const app = express()

app.use(express.json())

app.get(`/rent`, readRent)
app.post(`/rent`, createRent)
app.put(`/rent/:rentID`, updateRent)
app.delete(`/rent/:rentID`, delateRent)

export default app 