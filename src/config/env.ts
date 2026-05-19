import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = {
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET as string,
  jwt_expire: process.env.JWT_EXPIRE as string,
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  node_env: process.env.NODE_ENV as string,
  database_url: process.env.DATABASE_URL as string,
  email_user: process.env.EMAIL_USER as string,
  email_pass: process.env.EMAIL_PASS as string,
};

export default env;
