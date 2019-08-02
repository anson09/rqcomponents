import { axios, urlencodePost } from "../../common/api"

const getAccount = (uid) => {
  return urlencodePost("community/api/user/account", {
    uid
  });
}

const getSubscribe = async () => {
  const url = "api/pts/list";
  const params = {
    page: 1,
    count: 6,
    filter: "mysubscribed"
  };
  const { data } = await axios.get(url, {params});
  return data;
}

const getShare = async (uid) => {
  const url = "api/pts/info";
  const { data } = await axios.get(url, {params:{uid}});
  return data;
}


const communityApi = async (uid, key, page=1, count=4) => {
  const url = `community/api/user/${uid}/${key}`;
  const params = {
    uid,
    page,
    count
  };
  const { data } = await axios.get(url, {params});
  return data;
}

const getTopic = (uid, page=1, count=6) => {
  return communityApi(uid, 'topics', page, count);
}

const getFollow = (uid, page=1, count=6) => {
  return communityApi(uid, 'following', page, count);
}

const getFans = (uid, page=1, count=6) => {
  return communityApi(uid, 'followers', page, count);
}

export { getAccount, getSubscribe, getShare, getTopic, getFollow, getFans }
