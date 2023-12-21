import Link from "next/link";
import axios from "axios";

const LoginButton = () => {

    return (
        <div>
        <Link href={"http://112.186.245.109:8080/oauth2/authorization/kakao"}>로그인이</Link>
        </div>
    )
}
export default LoginButton;