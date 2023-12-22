import axios from "axios";

const usePostTokenRefresher = (globalURL: string, router: any, data: any) => {

    //토큰이 필요한 api요청을 보내는 axios인스턴스
    const refreshAPI = axios.create({
        baseURL: globalURL,
        headers: {
            "Content-type": "application/json"
        }
    });

    const interceptor = axios.interceptors.response.use(
        async function (response) {
            return response
        },
        async function (error) {
            const originalConfig = error.config;
            const msg = error.response.data.message;
            const status = error.response.status;

            if (status == 401) {
                if (msg == "access token expired") {
                    await axios({
                        url: globalURL,
                        method: "post",
                        data: data,
                        headers: {
                            'access-token': localStorage.getItem("accessToken"),
                            'refresh-token': localStorage.getItem("refreshToken"),
                            "Content-Type": "multipart/form-data"
                        },
                    })
                        .then((res) => {
                            localStorage.setItem("accessToken", res.headers.get("Access-Token"));
                            originalConfig.headers["Authorization"] = localStorage.getItem("accessToken")
                            return refreshAPI(originalConfig); //다시 액세스 토큰으로 요청
                        })
                        .then((res) => {
                            window.location.reload()
                        });
                } else if (msg == "refresh token expired") {
                    localStorage.clear();
                    router.push("/")
                    window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.")
                }
            } else if (status == 400 || status == 404 || status == 409) {
                window.alert(msg);
            }
            return Promise.reject(error)
        }
    );
    return () => {
        axios.interceptors.response.eject(interceptor);
    };
}
export default usePostTokenRefresher;