export const bin2int = (bin: string) => parseInt(bin, 2);
export const int2bin = (int: number | string) => {
  let res =
    typeof int === "string" ? parseInt(int).toString(2) : int.toString(2);
  if (res.length < 8) {
    let s = "";
    for (let i = 0; i < 8 - res.length; i++) {
      s += "0";
    }
    res = s + res;
  }
  return res;
};
