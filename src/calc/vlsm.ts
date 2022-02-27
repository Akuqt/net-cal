import { range } from "./range";
import {
  IPv4,
  getParam,
  IPv4Base,
  getMagic,
  increment,
  createMask,
  VLSMResult,
  IPv4Address,
} from "../common";

export const vlsm = (base: IPv4 | IPv4Base, hosts: number[]): VLSMResult => {
  if (!(base instanceof IPv4)) {
    base = new IPv4(base);
  }
  const totalH = hosts.reduce((acc, curr) => acc + curr, 0);
  const availableH = 32 - base.prefix();
  if (getParam(totalH) > availableH) {
    throw new Error("There's no space to cover the required networks.");
  }
  const result_: VLSMResult = {
    available: 2 ** availableH,
    required: totalH,
    result: [],
  };
  const rules = hosts.sort((a, b) => (a > b ? -1 : 1));
  const step1 = rules.map((r) => {
    const s = 32 - getParam(r);
    const mask = createMask(s);
    const magic = getMagic(mask.octets);
    return {
      s,
      magic,
      mask: mask.plain,
    };
  });
  const first = new IPv4(`${base.address()}/${step1[0].s}` as IPv4Base);
  const res = [first];
  let base_ = first.address("decimalOctets") as number[];
  for (let i = 1; i < step1.length; i++) {
    const newIP = increment(base_, step1[i - 1].magic);
    base_ = newIP;
    res.push(
      new IPv4({
        address: newIP.join(".") as IPv4Address,
        mask: step1[i].mask as IPv4Address,
      })
    );
  }
  for (const ip of res) {
    result_.result.push({
      fullNetwork: ip,
      range: range(ip),
    });
  }
  return result_;
};
