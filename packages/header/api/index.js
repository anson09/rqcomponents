import { urlencodePost } from "../../common/api"

const getAccount = () => {
  return urlencodePost("api/user/isLogin.do", {});
}

export { getAccount }
