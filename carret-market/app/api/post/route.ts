import { db } from "@/app/lib/db";
import {NextRequest} from "next/server";
import {useParams} from "next/navigation";

// //데이터 가져올 때
// export async function GET(req: NextRequest){
//     const data = await db.board.findMany({})
//     return Response.json(data)
// }

export async function GET(req: NextRequest) {
    const data = await db.board.findFirst({
        where: {
            id: parseInt(req.nextUrl.searchParams.get("id") as string),
        },
    });

    return Response.json(data);
}

// //데이터 보낼 때
// export async function POST(req: NextRequest){
//     const params = req.nextUrl.searchParams;
//
//     // console.log();
//
//     const data = await db.board.findMany({});
//     const id = data[data.length - 1].id;
//     console.log(data[data.length - 1]);
//
//     const data2 = await db.board.create({
//         data: {
//             title: `${id + 1} 번째 글 입니다.`
//         },
//     });
//
//     return Response.json("post 요청을 받았습니다.");
// }

//데이터 수정
export async function PUT(req: NextRequest){
    return Response.json("put 요청을 받았습니다.");
}

//데이터 삭제할 때
export async function DELETE(req: NextRequest){
    return Response.json("delete 요청을 받았습니다.");
}