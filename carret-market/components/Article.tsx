"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";

interface ArticleProps {
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
                                             title, price,
                                             mainImageUrl,likeCount,
                                             views, seller
}) => {
    const router = useRouter()
    const onClick = () => {
    }

    return (
        <div className={"hover:scale-105 transition"} onClick={onClick}>
            <div className={"group cursor-pointer"}>
                <Image src={mainImageUrl}
                       width={220}
                       height={220}
                       className={"rounded-lg"}
                       alt={title} />
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