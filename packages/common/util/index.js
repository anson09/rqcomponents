// redirect with v-router or windows.methods

const storageKeys = {
  account: "common_account",
  userHistory: "common_user_history",
  theme: "theme",
  workspace: "common_workspace",
};

const getStorage = (name, type = "object") =>
  type === "object"
    ? JSON.parse(localStorage[storageKeys[name]] || "{}")
    : localStorage[storageKeys[name]];

const setStorage = (name, val) =>
  localStorage.setItem(
    storageKeys[name],
    typeof val === "object" ? JSON.stringify(val) : val
  );

const removeStorage = (name) => localStorage.removeItem(storageKeys[name]);

export { getStorage, setStorage, removeStorage };
