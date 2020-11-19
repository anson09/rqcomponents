const handleLink = function (params) {
  if (!params) return;
  if (typeof params === "string") {
    this.$router.push(params);
    return;
  }

  const { outer, newBlock, path } = params;
  if (newBlock) {
    window.open(path);
  } else if (outer) {
    window.location.href = path;
  } else {
    this.$router.push(path);
  }
};

export { handleLink };
