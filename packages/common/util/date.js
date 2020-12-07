const getDate = (string) => {
  /*
   * string: 2010-10-10 10:00:00 or 2010-10-10
   */
  try {
    const [dateStr, timeStr = "00:00:00"] = string.split(" ");
    const [year, month, date] = dateStr.split("-");
    const [hour, minute, second] = timeStr.split(":");
    return new Date(year, month - 1, date, hour, minute, second);
  } catch (e) {
    throw new Error("日期格式不对");
  }
};

export { getDate };
