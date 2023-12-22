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