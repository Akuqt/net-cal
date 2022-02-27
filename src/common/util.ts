import { bin2int, int2bin } from "./binary";
import { IPv4Address, Magic } from "./types";

export const getParam = (rule: number, param: "s" | "h" = "h") => {
  const base = Math.log2(rule + (param === "h" ? 2 : 0));
  const int = Math.floor(base);
  const rest = base - int;
  if (rest !== 0) return int + 1;
  return base;
};

export const getMagic = (mask: number[]) => {
  let value = 0;
  let octet = 1;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] < 255) {
      octet = i;
      value = 256 - mask[i];
      break;
    }
  }
  return {
    value,
    octet,
  };
};

export const increment = (base: number[], magic: Magic): number[] => {
  const base_ = [...base];
  const actual = base_[magic.octet];
  const newValue = actual + magic.value;
  if (newValue > 255 && magic.octet >= 0) {
    base_[magic.octet] = 0;
    return increment(base_, { value: 1, octet: magic.octet - 1 });
  }
  base_[magic.octet] = newValue;
  return base_;
};

export const fromPlainBits = (base: string) => {
  return base
    .split(".")
    .map((u) => bin2int(u))
    .join(".") as IPv4Address;
};

export const getOctets = (base: IPv4Address) => {
  return base.split(".").map((oc) => parseInt(oc));
};

export const getPrefix = (mask: IPv4Address) => {
  const txt = mask
    .split(".")
    .map((int) => int2bin(int))
    .join("");
  return (txt.match(/1/g) || []).length;
};

export const createMask = (prefix: number | string) => {
  if (typeof prefix === "string") {
    prefix = parseInt(prefix);
  }
  if (prefix > 32 || prefix < 0) {
    throw new Error("Invalid mask prefix.");
  }
  const rawBits = new Array<number>(32).fill(1, 0, prefix).fill(0, prefix, 32);
  const plain_ = rawBits.reduce((acc, curr, i) => {
    if (i % 8 === 0 && i > 0) {
      acc += `.${curr}`;
    } else {
      acc += curr;
    }
    return acc;
  }, "");

  const plain = fromPlainBits(plain_);

  return {
    plain,
    octets: getOctets(plain as IPv4Address),
  };
};
