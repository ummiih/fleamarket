import Image from "next/image";
import {useRouter} from "next/navigation";
import {sendRequest} from "@/hooks/funcs";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {chattingMessage, message} from "@/app/recoil/atom";

interface ChatProfileBox {
    chatHistory: {},
}

const ChatProfileBox:React.FC<ChatProfileBox> = ({chatHistory}) => {
    const router = useRouter()
    const address = chatHistory.chatPartner.address.split(' ')
    const [chatMessages, setChatMessages] = useRecoilState(chattingMessage)
    const [getOneChatMessages, setGetOneChatMessages] = useRecoilState(message)

    const onClick = () => {
        router.push("/chat/"+ chatHistory.roomId)
    }

    return(
        <div className="
        border-b-[1px]
        border-l-[1px]
        w-[330px]
        p-4
        flex

        hover:bg-neutral-200/60
        transition
        cursor-pointer
        justify-between
        "
             onClick={() => onClick()}
        >
            <div className={"flex items-center gap-x-2"}>
                <Image alt={"나의 프로필"} src={"/profile_default.png"} width={40} height={40}
                       className={"rounded-full border "}></Image>
                <div className={"overflow-hidden"}>
                    <div className={"flex gap-x-1"}>
                        <div className={"text-[12px] font-bold"}>{chatHistory.chatPartner.name}</div>
                        <div className={"flex gap-x-1"}>
                            <div className={"text-[11px] text-neutral-500"}>{address[2]} ·</div>
                            <div className={"text-[11px] text-neutral-500"}>오전 12:26</div>
                        </div>
                    </div>
                    <div className={"text-[13px] truncate text-neutral-800"}>{chatHistory.lastChatHistory.message}
                    </div>
                </div>
            </div>

            {/*<Image src={"/IMG_9021.jpg"} width={40} height={40} className={"rounded-xl"}/>*/}
        </div>
    )
}
export default ChatProfileBox