import { range } from "./range";
import {
  IPv4,
  IPv4Base,
  getMagic,
  getPrefix,
  increment,
  RangeResult,
  IPv4Address,
  getParam,
  SubnetResult,
} from "../common";

export const subnetFromMask = (
  ip: IPv4 | IPv4Base,
  newMask: IPv4Address | number
) => {
  if (!(ip instanceof IPv4)) {
    ip = new IPv4(ip);
  }
  if (typeof newMask === "string") {
    newMask = getPrefix(newMask);
  }
  const n = ip.prefix();
  const p = newMask;
  const h = 32 - p;
  const s = p - n;
  const H1 = 2 ** (32 - n);
  const H2 = 2 ** h;
  if (n + h + s !== 32 || H2 > H1 || H2 < 1) {
    throw new Error("Invalid Subnetting.");
  }
  const result: SubnetResult[] = [];
  const temp = new IPv4(`${ip.address("plainDecimals") as IPv4Address}/${p}`);
  const first = range(new IPv4(`${range(temp).network}/${p}`));
  const network = new IPv4(`${first.network}/${first.prefix}`);
  result.push({
    fullNetwork: network,
    range: first,
  });
  const magic = getMagic(network.mask("decimalOctets") as number[]);
  let base_ = network.address("decimalOctets") as number[];
  for (let i = 1; i < 2 ** s; i++) {
    const newIP = increment(base_, magic);
    base_ = newIP;
    const tmp = new IPv4(
      `${newIP.join(".") as IPv4Address}/${network.prefix()}`
    );
    result.push({
      fullNetwork: tmp,
      range: range(tmp),
    });
  }
  return result;
};

export const subnetFromParams = (
  ip: IPv4Address,
  subnets: number,
  hosts: number,
  n?: number
): SubnetResult[] => {
  const s = getParam(subnets, "s");
  const h = getParam(hosts);
  if (n) {
    if (n + s + h !== 32) throw new Error("Invalid Params.");
    const p = s + n;
    const init = new IPv4(`${ip}/${n}`);
    return subnetFromMask(init, p);
  }
  const n_ = 32 - s - h;
  return subnetFromParams(ip, subnets, hosts, n_);
};
