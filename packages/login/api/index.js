import { urlencodePost } from "../../common/api/index";

const login = async function ({ username, password }) {
  const res = await urlencodePost("/api/user/login", {
    username,
    password,
  });
  return res.data;
};

export { login };
