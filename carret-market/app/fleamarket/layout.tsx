"use client"

import React, {useState} from "react";
import WriteButton from "@/components/WriteButton";


export default function Layout({ children }: React.PropsWithChildren) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
                <div>{children}</div>
        </>
    );
}