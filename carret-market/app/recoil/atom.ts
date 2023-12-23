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