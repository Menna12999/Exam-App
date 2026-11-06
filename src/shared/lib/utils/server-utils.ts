'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){
const cookieToken = await cookies();
const encodedToken = cookieToken.get('next-auth.session-token')?.value||cookieToken.get('__Secure-next-auth.session-token')?.value;
    if (!encodedToken) return null;
    const decodedToken = await decode({token:encodedToken,secret:process.env.NEXTAUTH_SECRET !})
    console.log('decodedToken',decodedToken!.token)

    return decodedToken!.token;

}