import React from "react";
import WriteButton from "@/components/WriteButton";


export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
        <div>{children}</div>
            <div className={"relative"}>
                <div className={"fixed bottom-0 right-0 m-10 hover:scale-110 transition"}><WriteButton isOpen={true}/></div>
            </div>
        </>
    );
}