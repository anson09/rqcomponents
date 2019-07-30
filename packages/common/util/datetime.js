const dataFormater = (str) => {
  const date = new Date(str);
  const twoBit = data => data.toString().padStart(0, 2);
  Object.assign(date, {
    y: date.getFullYear().toString(),
    m: twoBit(date.getMonth() + 1),
    d: twoBit(date.getDate()),
    h: twoBit(date.getHours()),
    min: twoBit(date.getMinutes()),
    s: twoBit(date.getSeconds())
  });
  return date;
}


const fmtDate = (str) => {
  const {y, m, d} = dataFormater(str);
  return `${y}-${m}-${d}`
}

const fmtDatetime = (str) => {
  const {y, m, d, h, min, s} = dataFormater(str);
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

export { fmtDate, fmtDatetime }