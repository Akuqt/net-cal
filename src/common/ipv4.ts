import { FormatResult, AddressFormat, IPv4Base, IPv4T } from "./types";
import { int2bin } from "./binary";
import { parser } from "./parser";

export class IPv4 implements IPv4T {
  private mask_: number[];
  private prefix_: number;
  private address_: number[];
  private wildcard_: number[];
  constructor(ipv4: IPv4Base) {
    const { address, mask, prefix, wildcard } = parser(ipv4);
    this.mask_ = mask;
    this.prefix_ = prefix;
    this.address_ = address;
    this.wildcard_ = wildcard;
  }

  private formater(format: AddressFormat, address: number[]): FormatResult {
    switch (format) {
      case "plainDecimals":
        return address.join(".");
      case "plainBits":
        return address.map((el) => int2bin(el)).join(".");
      case "decimalOctets":
        return address;
      case "bitOctets":
        return address.map((el) => int2bin(el));
      default:
        return address.join(".");
    }
  }

  public toString(full?: boolean): string {
    if (full) {
      return this.address() + " " + this.mask();
    }
    return this.address() + "/" + this.prefix_;
  }

  public address(format: AddressFormat = "plainDecimals") {
    return this.formater(format, this.address_);
  }

  public mask(format: AddressFormat = "plainDecimals") {
    return this.formater(format, this.mask_);
  }

  public wildcard(format: AddressFormat = "plainDecimals") {
    return this.formater(format, this.wildcard_);
  }

  public prefix() {
    return this.prefix_;
  }
}
