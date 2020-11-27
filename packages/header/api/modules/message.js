import { axios } from "../../../common/api/index";

const baseUrl = "api/rqmessager/v1";

const getMessages = async ({ unread, limit, offset }) => {
  const { data } = await axios.get(`${baseUrl}/messages`, {
    params: { unread, limit, offset },
  });
  return data;
};

const deleteMessage = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/message/${id}`);
  return data;
};

const deleteAllMessage = async (unread) => {
  const { data } = await axios.delete(`${baseUrl}/messages`, {
    params: { unread },
  });
  return data;
};

const updateMessage = async (id) => {
  const { data } = await axios.patch(`${baseUrl}/message/${id}`);
  return data;
};

const updateAllMessage = async () => {
  const { data } = await axios.patch(`${baseUrl}/messages`);
  return data;
};

export {
  getMessages,
  deleteMessage,
  deleteAllMessage,
  updateMessage,
  updateAllMessage,
};
