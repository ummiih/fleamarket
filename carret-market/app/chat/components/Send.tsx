import {useEffect} from "react";

interface SendProps {
    chatHistory: [];
    chat: any;
    index: number;
}
const Send:React.FC<SendProps> = ({chat, index, chatHistory}) => {
    console.log("채팅 기록들:", chatHistory)


    useEffect(() => {
    }, [chat.unreadCount, chat.messageType]);

    return (
        <div className="flex items-end gap-x-1 float-right mx-8">
            <div className="grid ">
                {(chat.unreadCount == 0) ?
                    (
                        <div>
                            {
                                (index == chatHistory.length - 1) ?
                                    (<div className="text-[11px] text-end">읽음</div>) :
                                    (null)
                            }
                        </div>) :
                    (<div className="text-[11px] text-end">안읽음</div>)}
                <div className="text-[11px] mb-1">오전 5:27</div>
            </div>
            <div className="
                bg-[#FE6F0F]
                text-white
                p-2
                rounded-bl-full
                rounded-tl-full
                rounded-br-full
                w-fit
                right-0
                text-[14px]
                my-1
                "
            >
                {chat.message}
            </div>
        </div>
    )
}
export default Send;