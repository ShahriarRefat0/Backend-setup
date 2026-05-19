import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env")})

const env = {
    port: process.env.PORT || 5000,
    jwt_secret: process.env.JWT_SECRET as String,
    jwt_expires_in: process.env.JWT_EXPIRES_IN as String,
    node_env: process.env.NODE_ENV  as String,
    mongo_uri: process.env.MONGO_URI as String,
    email_user: process.env.EMAIL_USER as string,
    email_pass: process.env.EMAIL_PASS as string,
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),
}

export default env;