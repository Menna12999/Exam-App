import { getExams } from "@/features/exam/api/exam.api";
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest )
   {
  const {searchParams} = new URL(req.url);
  const diplomaId = searchParams.get('diplomaId')||"";
  const result = await getExams(req, diplomaId);
  

  if (result instanceof Response) return result;
  return NextResponse.json(result);
}