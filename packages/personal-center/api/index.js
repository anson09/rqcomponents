import { axios, urlencodePost } from "../../common/api"

const getAccount = (uid) => {
  return urlencodePost("community/api/user/account", {
    uid
  });
}

const getSubscribe = (uid) => {
  return urlencodePost("api/pts/list?page=1&count=6&filter=mysubscribed", {
    uid
  });
}

export { getAccount }
