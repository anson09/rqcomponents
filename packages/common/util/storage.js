const storageKeys = {
  account: "common_account",
  theme: "common_theme",
  workspace: "common_workspace",
};

const getStorage = (name) => {
  const val = localStorage[storageKeys[name]];
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
};
const setStorage = (name, val) =>
  localStorage.setItem(
    storageKeys[name],
    typeof val === "object" ? JSON.stringify(val) : val
  );

const removeStorage = (name) => localStorage.removeItem(storageKeys[name]);

export { getStorage, setStorage, removeStorage };
