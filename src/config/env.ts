import dotenv from "dotenv";
import path from "path";


dotenv.config({path: path.join(process.cwd(), ".env")})

const env = {
    port: process.env.PORT || 5000,
    jwt_secret: process.env.JWT_SECRET as string,

}

export default env;