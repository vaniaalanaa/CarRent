import Express from "express";
import car from "./route/carroute"
import admin from "./route/adminroute"
import rent from "./route/rentroute"

const app = Express()

const PORT = 8000

app.use(Express.json())

app.use(car, admin, rent)

app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
})