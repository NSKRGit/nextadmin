import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { User } from "./lib/models"
import { connectToDB } from "./lib/utils"

const login = async (credentials) => {
    try{
        connectToDB()
        const user = await User.findOne({username:credentials.username})
        if(!user)
            throw new Error("Wrong Credentials!")
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
        if(!isPasswordCorrect)
            throw new Error("Wrong Credentials!")
        return user;
    }catch(error){
        console.log(error)
        throw new Error("Failed to Login")
    }
}

export const { signIn, signOut, auth } = NextAuth({
    authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                try{
                    const user = await login(credentials);
                    return user;
                }catch(error){
                    return null;
                }
            }
        }),
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        },
    }
})