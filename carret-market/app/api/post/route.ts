import { db } from "@/app/lib/db";

//데이터 가져올 때
export async function GET(req: Request){
    return Response.json("겟요청을 받았습니다.")
}

//데이터 보낼 때
export async function POST(req: Request){
    return Response.json("post 요청을 받았습니다.");
}

//데이터 수정
export async function PUT(req: Request){
    return Response.json("put 요청을 받았습니다.");
}

//데이터 삭제할 때
export async function DELETE(req: Request){
    return Response.json("delete 요청을 받았습니다.");
}