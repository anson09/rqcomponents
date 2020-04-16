import { axios } from "../../../common/api";

const baseUrl = "api/rqmessager/v1";

const getMessages = async ({ read, limit, offset }) => {
  const { data } = await axios.get(`${baseUrl}/messages`, {
    params: { already_read: read, limit, offset },
  });
  return data;
};

const deleteMessage = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/message/${id}`);
  return data;
};

const deleteAllMessage = async () => {
  const { data } = await axios.delete(`${baseUrl}/messages`);
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
