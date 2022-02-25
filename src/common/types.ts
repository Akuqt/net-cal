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
