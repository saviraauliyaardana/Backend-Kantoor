import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import * as Express from "express";
import gedungs from '../routes/gedungs.routes'
import bookings from '../routes/bookings.routes'
import user from '../routes/users.routes'
import { generateString } from "../logic/createdId";
import { login } from '../controller/user.controller';
import cors from 'cors';
const app = Express.default();
const port = process.env.portApp||3000;

const allowedOrigins = [process.env.frontendName,"http://192.168.100.26:8080"]
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
    credentials: true,
    methods: ["GET","PUT","POST","DELETE"],
    origin: allowedOrigins,
    preflightContinue: true,
    optionsSuccessStatus:200
};
app.use(cors(options))
 
app.get(
    "/",
    async (req, res) => {
        return res.status(200).send({
            message: generateString(22),
        });
    }
);

app.use("/gedungs",gedungs)
app.use("/bookings",bookings)
app.use("/user",user)
app.post("/login",login)


try {
    app.listen(port, (): void => {
        console.log(process.env.frontendName)
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error:any) {
    console.error(`Error occured: ${error.message}`);
}