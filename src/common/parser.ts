import { IPv4Address, IPv4Base, ValidationResult } from "./types";
import { bin2int, int2bin } from "./binary";
import { ParserResult } from ".";

const getOctets = (base: IPv4Address) => {
  return base.split(".").map((oc) => parseInt(oc));
};

const getPrefix = (mask: IPv4Address) => {
  const txt = mask
    .split(".")
    .map((int) => int2bin(int))
    .join("");
  return (txt.match(/1/g) || []).length;
};

const createMask = (prefix: number | string) => {
  if (typeof prefix === "string") {
    prefix = parseInt(prefix);
  }
  if (prefix > 32 || prefix < 0) {
    throw new Error("Invalid mask prefix.");
  }
  const rawBits = new Array<number>(32).fill(1, 0, prefix).fill(0, prefix, 32);
  return rawBits
    .reduce((acc, curr, i) => {
      if (i % 8 === 0 && i > 0) {
        acc += `.${curr}`;
      } else {
        acc += curr;
      }
      return acc;
    }, "")
    .split(".")
    .map((oc) => bin2int(oc))
    .join(".");
};

const validate = (ipv4: IPv4Address) => {
  const octets = getOctets(ipv4);
  let valid = true;
  if (octets.length > 4) {
    return {
      valid: false,
      octets,
    };
  }
  for (const octet of octets) {
    if (octet < 0 || octet > 255) {
      valid = false;
      break;
    }
  }
  return { valid, octets };
};

const parser_ = (
  address: ValidationResult,
  mask: ValidationResult
): ParserResult => {
  if (!address.valid || !mask.valid) {
    throw new Error(
      `IP ${address.octets.join(".")} with mask ${mask.octets.join(
        "."
      )} is not a valid IPv4.`
    );
  }
  return {
    address: address.octets,
    mask: mask.octets,
    wildcard: mask.octets.map((m) => 255 - m),
    prefix: getPrefix(mask.octets.join(".") as IPv4Address),
  };
};

export const parser = (ipv4: IPv4Base) => {
  let address = {
    valid: false,
    octets: [0, 0, 0, 0],
  };
  let mask = {
    valid: false,
    octets: [0, 0, 0, 0],
  };

  if (typeof ipv4 === "string") {
    const [address_, prefix] = ipv4.split("/");
    address = validate(address_ as IPv4Address);
    mask = validate(createMask(prefix) as IPv4Address);
  } else if (typeof ipv4 === "object") {
    address = validate(ipv4.address);
    mask = validate(ipv4.mask);
  } else {
    throw new Error("Invalid IPv4 address.");
  }
  return parser_(address, mask);
};
