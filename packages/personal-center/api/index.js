import { axios, urlencodePost } from "../../common/api";

const getSubscribe = async () => {
  const url = "api/pts/list";
  const params = {
    page: 1,
    count: 6,
    filter: "mysubscribed"
  };
  const { data } = await axios.get(url, { params });
  return data;
};

const getShare = async uid => {
  const url = "api/pts/info";
  const { data } = await axios.get(url, { params: { uid } });
  return data;
};

const communityGetApi = async (uid, key, page=1, count=4) => {
  const url = `community/api/user/${uid}/${key}`;
  const params = {
    uid,
    page,
    count
  };
  const { data } = await axios.get(url, { params });
  return data;
};

const communityPostApi = async (key, params) => {
  return urlencodePost(`community/api/user/${key}`, params);
};

const getTopic = (uid, page = 1, count = 6) => {
  return communityGetApi(uid, "topics", page, count);
};

const getFollow = (uid, page = 1, count = 6) => {
  return communityGetApi(uid, "following", page, count);
};

const getFans = (uid, page = 1, count = 6) => {
  return communityGetApi(uid, "followers", page, count);
};

const getCollection = (uid, page = 1, count = 6) => {
  return communityGetApi(uid, "favourites", page, count);
};

const getAccount = uid => {
  return communityPostApi("account", {
    uid
  });
};

const toggleFollow = (uid, type) => {
  return communityPostApi("toggleFollow", {
    uid,
    type
  });
};

export {
  getAccount,
  getSubscribe,
  getShare,
  getTopic,
  getFollow,
  getFans,
  getCollection,
  toggleFollow
};
