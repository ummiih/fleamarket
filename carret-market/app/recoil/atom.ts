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

export const previewImageFiles = atom({
    key: "previewImageFiles",
    default: []
})

export const formFiles = atom({
    key: "formFiles",
    default: []
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

//글쓰기 모달창 삭제 버튼에 사용하는 state
export const modalState = atom({
    key: "modalState",
    default: false
})

//글수정 모달창 삭제 버튼에 사용하는 state
export const editModalState = atom({
    key: "editModalState",
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

// 전체 채팅 데이터를 저장
export const chatHistoryResult = atom({
    key: "chatHistoryResult",
    default: []
})

// 게시글의 이미지 URL을 가져오는 state
export const articleUrls = atom({
    key: "articleUrls",
    default: []
})

// 게시글의 삭제할 이미지 URL을 담는 state
export const deleteUrls = atom({
    key: "deleteUrls",
    default: []
})

//거래중 거래완료 필터 확인하는 state
export const isTradingState = atom({
    key: "isTradingState",
    default: true
})
