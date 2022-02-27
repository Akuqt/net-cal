import {
  IPv4,
  IPv4Base,
  getMagic,
  getOctets,
  increment,
  RangeResult,
  IPv4Address,
  fromPlainBits,
} from "../common";

const base_ = (
  addressBits: string,
  wildcard: string,
  operation: "and" | "or"
) => {
  let res_ = "";
  for (let i = 0; i < addressBits.length; i++) {
    if (addressBits[i] === ".") res_ += ".";
    else {
      if (operation === "or")
        res_ += parseInt(addressBits[i]) | parseInt(wildcard[i]);
      else res_ += parseInt(addressBits[i]) & parseInt(wildcard[i]);
    }
  }
  return fromPlainBits(res_);
};

const range_ = (ip: IPv4): RangeResult => {
  const addressBits = ip.address("plainBits") as string;
  const wildcard = ip.wildcard("plainBits") as string;
  const mask = ip.mask("plainBits") as string;
  const last = base_(
    addressBits,
    wildcard.slice(0, wildcard.length - 1) + "0",
    "or"
  );
  const broadcast = base_(
    addressBits,
    wildcard.slice(0, wildcard.length - 1) + "1",
    "or"
  );
  const network = base_(addressBits, mask, "and");
  return {
    network,
    prefix: ip.prefix(),
    mask: ip.mask("plainDecimals") as IPv4Address,
    first: increment(getOctets(network), {
      value: 1,
      octet: 3,
    }).join(".") as IPv4Address,
    last,
    broadcast,
    wildcard: ip.wildcard("plainDecimals") as IPv4Address,
  };
};

export const range = (ip: IPv4 | IPv4Base) => {
  if (!(ip instanceof IPv4)) {
    ip = new IPv4(ip);
  }
  return range_(ip);
};
