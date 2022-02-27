export interface IPv4T {
  toString: (full?: boolean) => string;
  address: (format: AddressFormat) => FormatResult;
  mask: (format: AddressFormat) => FormatResult;
  wildcard: (format: AddressFormat) => FormatResult;
  prefix: () => number;
}

export type IPv4Address = `${number}.${number}.${number}.${number}`;

export interface ExplicitIPv4Address {
  address: IPv4Address;
  mask: IPv4Address;
}

export interface ValidationResult {
  valid: boolean;
  octets: number[];
}

export interface ParserResult {
  address: number[];
  mask: number[];
  wildcard: number[];
  prefix: number;
}

export type ImplicitIPv4Address = `${IPv4Address}/${number}`;

export type IPv4Base = ImplicitIPv4Address | ExplicitIPv4Address;

export type FormatResult = string | string[] | number[];

export type AddressFormat =
  | "plainDecimals"
  | "plainBits"
  | "decimalOctets"
  | "bitOctets";

export interface Magic {
  value: number;
  octet: number;
}

export interface RangeResult {
  network: IPv4Address;
  prefix: number;
  mask: IPv4Address;
  first: IPv4Address;
  last: IPv4Address;
  broadcast: IPv4Address;
  wildcard: IPv4Address;
}

export interface VLSMResult {
  result: {
    fullNetwork: IPv4T;
    range: RangeResult;
  }[];
  required: number;
  available: number;
}

export interface SubnetResult {
  fullNetwork: IPv4T;
  range: RangeResult;
}
