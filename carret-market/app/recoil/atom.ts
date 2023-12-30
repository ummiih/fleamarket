"use client"
import {atom} from "recoil";

export const allFleaMarketData = atom({
    key: "allFleaMarketData",
    default: { "result": { "content": [] } }
})

export const oneFleaMarketData = atom({
    key: "oneFleaMarketData",
    default: {"result":{"seller":{},"imageUrls":[]}}
})

export const userAddress = atom({
    key: "userAddress",
    default: ""
})
export const lat = atom({
    key: "lat",
    default: ""
})
export const lng = atom({
    key: "lng",
    default: ""
})

//글쓰기 모달창
export const modalState = atom({
    key: "modalState",
    default: false
})

export const chatRoomId = atom({
    key: "chatRoomId",
    default: ""
})
export const chattingMessage = atom({
    key: "chattingMessage",
    default: []
})
export const message = atom({
    key: "message",
    default: {}
})

export const userInfo = atom({
    key: "userInfo",
    default: {}
})

export const chatHistoryResult = atom({
    key: "chatHistoryResult",
    default: []
})