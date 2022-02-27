import { fromPlainBits, IPv4, IPv4Base } from "../common";

export const summarize = (
  start: IPv4 | IPv4Base,
  end: IPv4 | IPv4Base
): IPv4 => {
  if (!(start instanceof IPv4)) {
    start = new IPv4(start);
  }
  if (!(end instanceof IPv4)) {
    end = new IPv4(end);
  }
  const bits1 = start.address("plainBits").toString();
  const bits2 = end.address("plainBits").toString();
  let count = 0;
  let res = "";
  let zero = false;
  for (let i = 0; i < bits1.length; i++) {
    if (bits1[i] !== bits2[i] || zero) {
      if (!zero) zero = true;
      res += bits1[i] === "." ? "." : "0";
    } else {
      res += bits1[i];
      count += bits1[i] === "." ? 0 : 1;
    }
  }
  const base = fromPlainBits(res);
  return new IPv4(`${base}/${count}`);
};
