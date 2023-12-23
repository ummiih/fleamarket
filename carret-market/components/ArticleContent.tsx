import React from "react";

import Article from "@/components/Article";

interface ArticleContentProps {
    posts : any
}

const ArticleContent: React.FC<ArticleContentProps>= ({posts}) => {
    return (
        <div className={"grid grid-cols-3 gap-12"}>
            {Object.entries(posts.content).map(([index, post]) => (
                <React.Fragment key={index}>
                    <Article {...post}></Article>
                </React.Fragment>
            ))}
        </div>
    )
}
export default ArticleContent