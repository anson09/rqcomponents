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


const communityApi = async (uid, key, count=4) => {
  const url = `community/api/user/${uid}/${key}`;
  const params = {
    uid,
    page: 1,
    count
  };
  const { data } = await axios.get(url, {params});
  return data;
}

const getTopic = (uid) => {
  return communityApi(uid, 'topics', 6);
}

const getFollow = (uid) => {
  return communityApi(uid, 'following');
}


const getFans = (uid) => {
  return communityApi(uid, 'followers');
}

export { getAccount, getSubscribe, getShare, getTopic, getFollow, getFans }
