const handleLink = function (params) {
  let link = params;
  if (typeof params === "string") {
    link = { path: params };
  }
  if (!params) return;
  const { outer, newBlock, path } = link;
  if (!path) return;
  if (newBlock) {
    window.open(path);
  } else if (outer) {
    window.location.href = path;
  } else {
    this.$router.push(path);
  }
};

export { handleLink };
