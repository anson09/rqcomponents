const handleLink = function (params) {
  if (!params) return;
  let link = params;
  if (typeof params === "string") {
    link = { path: params };
  }
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
