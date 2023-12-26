import React from "react";
import Receive from "@/app/chat/components/Receive";
import Send from "@/app/chat/components/Send";
import {useRecoilState} from "recoil";
import {chattingMessage, userInfo} from "@/app/recoil/atom";
interface ChatUiProps {
    firstResult : [];
    user: any;
}
const ChatUi:React.FC<ChatUiProps> = ({firstResult, user}) => {
    const [chatMessages, setChatMessages] = useRecoilState(chattingMessage)
    const userId = localStorage.getItem("userId")
    console.log(userId)

    return(
        <div>
            {
                Object.entries(firstResult).map(([index, chat])  => (
                    <React.Fragment key={index}>
                        {chat.senderId == userId? (<Send chat={ chat}/>):(<Receive chat={ chat} />)}
                    </React.Fragment>
                ))
            }
            {
                Object.entries(chatMessages).map(([index, chat])  => (
                    <React.Fragment key={index}>
                        {chat.senderId == userId? (<Send chat={ chat}/>):(<Receive chat={ chat} />)}
                    </React.Fragment>
                ))
            }
        </div>
    )
}
export default ChatUi;