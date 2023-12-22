"use client"
import {useEffect, useState} from "react";
import Input from "@/components/Input";
import {useRouter} from "next/navigation";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";

const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500)


    useEffect(() => {
        const query = {
            keyword: debouncedValue,
        }

        const url = qs.stringifyUrl({
            url:'/search',
            query: query
        });

        router.push(url)
    }, [debouncedValue, router]);

    return (
        <div>
            <Input placeholder={"검색어를 입력하시오"}
                   value={value}
                   onChange={(e)=>setValue(e.target.value)}>
            </Input>
        </div>
    )
}
export default SearchInput;