import connectionDb from "../DB/dbConnection.js"
import authRouter from "./modules/auth/auth.routes.js"
import userRouter from "./modules/user/user.routes.js"
import { AppError } from "./util/ErrorHandler/AppError.js"



export const bootstrap = (app) => {
    connectionDb()

    // app.get("/", (req, res, next) => res.json("hello orld"))
    app.use("/api/v1/auth", authRouter)
    app.use("/api/v1/users", userRouter)






    app.all("*", (req, res, next) => {
        next(new AppError("Page Not Found", 404))
    })

    app.use((err, req, res, next) => {
        const error = err.message
        const code = err.statusCode || 500
        res.status(code).json({ message: "Error", error, stack: err.stack })
    })
}