import {useEffect} from "react";

interface SendProps {
    chat: any
}
const Send:React.FC<SendProps> = ({chat}) => {

    useEffect(() => {

    }, [chat.unreadCount, chat.messageType]);

    return (
        <div className="flex">
            {chat.unreadCount == 0? (<span>읽음</span>) : (<span>안읽음</span>)}
            <div className="
        bg-[#FE6F0F]
        text-white
        p-2
        rounded-full
        w-fit
        right-0
        "
            >
                {chat.message}
            </div>
        </div>
    )
}
export default Send;