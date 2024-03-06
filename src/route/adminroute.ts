import express from "express";
import { createAdmin, readAdmin, updateAdmin, delateAdmin, login } from "../controller/adminController";
import { verifyAdmin } from "../miidleware/verify";

const app = express()

app.use(express.json())

app.post(`/admin`, createAdmin)
app.get(`/admin`, verifyAdmin, readAdmin)
app.put(`/admin/:adminID`, verifyAdmin, updateAdmin)
app.delete(`/admin/:adminID`, verifyAdmin, delateAdmin)
app.post(`/admin/login`, login)

export default app