"use client"

import {usePathname} from "next/navigation";
import {useMemo} from "react";
import NavigationItem from "@/components/NavigationItem";
import Image from "next/image";

interface NavigationProps {

}

const Navigation: React.FC<NavigationProps> = ({}) => {
    const pathname = usePathname();

    const routes = useMemo(
        () => [
            {
                label: "당근",
                href: "/",
                active: true

            },
            {
                label: "중고거래",
                href: "/fleamarket",
                active: pathname === "/fleamarket"
            },
            {
                label: "동네업체",
                href: "/nearby-stores",
                active: pathname === "/nearby-stores"
            },
            {
                label: "알바",
                href: "/jobs",
                active: pathname === "/jobs"

            },
            {
                label: "부동산 직거래",
                href: "/realty",
                active: pathname === "/realty"
            },
            {
                label: "중고차 직거래",
                href: "/car",
                active: pathname === "/car"
            },

        ], [pathname]
    )

    return (
        <div>
            <div className="w-full h-[60px]">
                <div className={"flex gap-x-8 p-4 mx-20"}>

                    {routes.map((route) => (
                        <NavigationItem key={route.label} {...route}></NavigationItem>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Navigation;