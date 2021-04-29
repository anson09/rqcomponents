import axios from "./axios";

function queryStringify(data) {
  return Object.entries(data)
    .map((kvArr) => kvArr.join("="))
    .join("&");
}

async function urlencodePost(url, params) {
  const data = await axios({
    url,
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    data: queryStringify(params),
  });
  return data;
}

export { queryStringify, urlencodePost, axios };
