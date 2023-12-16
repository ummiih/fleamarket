"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";

interface ArticleProps {
    id: number;
    title: string;
    userAddress: string;
    ImageUrl: string;
    price: number
    interest: number;
}

const Article: React.FC<ArticleProps> = ({
                                             id, title, userAddress,
                                             ImageUrl, price, interest
                                         }) => {
    const router = useRouter()
    const onClick = () => {
        router.push("/articles/"+id)
    }
    return (
        <div className={"hover:scale-105 transition"} onClick={onClick}>
        <div className={"group cursor-pointer"}>
            <Image src={ImageUrl} width={220} height={220} className={"rounded-lg"}></Image>
            <div className={"flex flex-col"}>
                <span className={"font-normal mt-3"}>{title}</span>
                <span className={"text-[16px] font-semibold"}>{price}원</span>
                <span className={"text-sm font-light"}>{userAddress}</span>

                <span className={"text-sm font-light text-[#939BA2]"}>관심 {interest}</span>

            </div>
        </div>
        </div>

    )
}
export default Article;