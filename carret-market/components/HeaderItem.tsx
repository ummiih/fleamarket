import Image from "next/image";
import {useMemo} from "react";

interface HeaderItemProps {
}

const HeaderItem:React.FC<HeaderItemProps> = ({}) => {
    const images = [
            {
                src: "/fleamarket.webp",
                color: "#FFF1AA",
                title: "믿을만한\n" + "이웃 간 중고거래",
                content: "동네 주민들과 가깝고 따뜻한 거래를\n" + "지금 경험해보세요."
            },
            {
                src: "/nearby-storesImage.png",
                color: "#F7F1EB",
                title: "동네 이웃들이\n" + "자주 가는 동네 업체",
                content: "우리 동네 사람들이\n" + "이용하는 업체를 찾아보세요."
            },
            {
                src: "/jobsImage.png",
                color: "#FFE2D2",
                title: "우리 동네에서 찾는\n" + "당근알바",
                content: "걸어서 10분 거리의\n" + "동네 알바들 여기 다 있어요."
            },
            {
                src: "/realtyImage.png",
                color: "#D2EDF9",
                title: "복비없이 투명한\n" + "부동산 직거래",
                content: "이웃이 살던 집, 당근에서\n" + "편하게 직거래해보세요."
            },
            {
                src: "/carImage.png",
                color: "#D2EDF9",
                title: "딜러 수수료 없는\n" + "중고차 직거래",
                content: "딜러 없이 믿고 살 수 있는 중고차,\n" + "당근에서 직거래해보세요.\n"
            },
        ]

    return (
        <div className={"px-60 bg-[#FFF1AA]"}>
            <div className={"flex gap-x-36"}>
                <div className={"pt-12"}>
                    <div className={"leading-relaxed text-[32px] font-semibold"}>믿을만한<br/>이웃 간 중고거래<br/></div>
                    <div className={"text-lg pt-2 text-[#3E403A]"}>동네 주민들과 가깝고 따뜻한 거래를<br />지금 경험해보세요.</div>
                </div>
                <Image alt="carretImage" src={"/fleamarket.webp"} width={400} height={400} className={""}/>
            </div>
        </div>
    )
}
export default HeaderItem