import { getDiplomas } from "@/features/diploma/apis/diploma.api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest){


   const payload = await getDiplomas(req)

   return NextResponse.json(payload)

}

