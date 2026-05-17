
import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import type { UserLogin, UserRegister } from "./auth.validation";
import { sendEmail } from "../../utils/sendEmail";


// register user

const registerUser = async (payload:UserRegister) =>{
    const handlePassword=await bcrypt.hash(payload.password, 10)

    const verifyToken = await crypto.randomUUID()

    const user = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: handlePassword,
            verifyToken: verifyToken
        }

    });

    await sendEmail(
       user.email,
  "Verify Your Email",
  `
    <h1>Email Verification</h1>

    <a href="http://localhost:5000/api/v1/auth/confirm-email?token=${verifyToken}">
      Verify Email
    </a>
  ` )
const {password, verifyToken: token, ...safeUser} = user;
    return safeUser
}

//logiin user

const loginUser = async (payload: UserLogin)=>{
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if(!user){
        throw new Error("User not found")
    }

    const isPasswordValid = await bcrypt.compare(
        payload.password,
        user.password
    )
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
const { password, verifyToken, ...safeUser } = user;

return safeUser;
}

//confrim email

const confirmEmail = async(token: string)=>{
    const user = await prisma.user.findFirst({
        where:{
            verifyToken: token
        }
    })
    if(!user){
        throw new Error("Invalid verification token")
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data:{
            isVerified: true,
            verifyToken: null
        }
    })

      const { password, verifyToken, ...safeUser } = updatedUser;

  return safeUser;
    
}



export const AuthService = {
    registerUser,
    loginUser,
    confirmEmail
}
