import Image from "next/image";

interface ArticleProps {
    id: number;
    title: string;
    content: string;
    userName: string;
    userAddress: string;
    userTemperature: number;
    ImageUrl: string;
    price: number
    createdAt: string;
    interest: number;
    views: number;
    category: string;

}

const Article: React.FC<ArticleProps> = ({
                                             id, title, content, userName, userAddress, userTemperature,
                                             ImageUrl, price, createdAt, category, interest, views
                                         }) => {
    return (
        <div>
            <Image src={ImageUrl} width={200} height={200} className={"rounded-lg"}></Image>
            {title}
        </div>
   )
}
export default Article;