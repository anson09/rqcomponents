import snakeCase from "lodash/snakeCase";
import axios from "./axios";

function snakeCaseConvert(data) {
  const params = {};
  Object.entries(data).forEach(([k, v]) => {
    params[snakeCase(k)] = v;
  });
  return params;
}

function queryStringify(data) {
  return Object.entries(data)
    .map(kvArr => kvArr.join("="))
    .join("&");
}

async function urlencodePost(url, params) {
  const { data } = await axios({
    url,
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    data: queryStringify(params)
  });
  return data;
}

export { queryStringify, snakeCaseConvert, urlencodePost, axios };
