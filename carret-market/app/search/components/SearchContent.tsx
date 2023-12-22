import Article from "@/components/Article";

import React, {useState, useEffect} from "react";
interface SearchContentProps {
    data: any;
}
const SearchContent:React.FC<SearchContentProps> = ({data}) => {

    return(
        <div className={"flex justify-center "}>
        <div className={"grid grid-cols-3 gap-7"}>
            {Object.entries(data.content).map(([index, datum])=>(
                <React.Fragment key={index}>
                    <Article {...datum}></Article>
                </React.Fragment>
            ))}
        </div>
            </div>
    )

}
export default SearchContent