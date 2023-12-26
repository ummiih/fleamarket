import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {useRecoilState} from "recoil";
import {chattingMessage} from "@/app/recoil/atom";

const getChattingData = (roomId) => {
    const token = localStorage.getItem("accessToken");
    // const [chatMessages, setChatMessages] = useRecoilState(chattingMessage)
    console.log(token)

    const client = new Client({
        brokerURL: "ws://112.186.245.109:8080/ws-market", //endpoint 넣는 곳
        beforeConnect: () => {
            console.log("beforeConnect");
        },
        connectHeaders: {
            "token": token, // 우리 프로젝트의 경우 토큰이 없으면 보안에 걸려서 헤더 함께 보낸다
        },
        debug(str) {
            console.log(str);
        },
        reconnectDelay: 50000, // 자동 재연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
        console.log('WebSocket 연결이 열렸습니다.')
        client.subscribe("/sub/chat/room/" + roomId, message => { //구독하는 채널
            const datas = JSON.parse(message.body);
            console.log(datas)
            // setChatMessages((chatMessages) => [...chatMessages, JSON.parse(message)]);
        });
    };

    //에러 처리 함수
    client.onStompError = function (frame) {
        console.log(`Broker reported error`, frame.headers.message);
        console.log(`Additional details:${frame.body}`);
    };

    client.activate();
}
export default getChattingData;