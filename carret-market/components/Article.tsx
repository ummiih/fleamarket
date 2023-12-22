"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";

interface ArticleProps {
    postId: number;
    title : string;
    seller: seller;
    price: number;
    mainImageUrl: string;
    likeCount: number;
    views: number;
}
interface seller {
    name: string;
    address: string;
    temperature: number;
}

const Article: React.FC<ArticleProps> = ({
                                             postId, title, price,
                                             mainImageUrl,likeCount,
                                             views, seller
}) => {
    const router = useRouter()
    const onClick = () => {
        router.push("/articles/" + postId)
    }

    return (
        <div className={"hover:scale-105 transition"} onClick={onClick}>
            <div className={"group cursor-pointer"}>
                <div className={"rounded-xl relative w-[220px] h-[220px] bg-black overflow-hidden"}>
                <Image
                    src={mainImageUrl}
                    alt={postId}
                    className={"object-cover"}
                    fill/>
                </div>
                <div className={"flex flex-col"}>
                    <span className={"font-normal mt-3"}>{title}</span>
                    <span className={"text-[16px] font-semibold"}>{price}원</span>
                    <span className={"text-sm font-light"}>{seller.address}</span>
                    <div className={"flex gap-x-1"}>
                    <span className={"text-sm font-light text-[#939BA2]"}>관심 {likeCount} ∙</span><span className={"text-sm font-light text-[#939BA2]"}>조회 {views}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Article;