import { IPv4 } from "../../src/common";

describe("IPv4 Class", () => {
  const res = new IPv4("192.168.1.2/24");

  it("should create valid IPv4 instances (string)", () => {
    expect(res).toBeInstanceOf(IPv4);
    expect(res.address).toBeDefined();
    expect(res.mask).toBeDefined();
    expect(res.wildcard).toBeDefined();
    expect(res.prefix).toBeDefined();
  });

  it("should return prefix", () => {
    expect(res.prefix()).toBe(24);
  });

  it("should return address", () => {
    expect(res.address("aaaa" as any)).toBe("192.168.1.2");
    expect(res.address()).toBe("192.168.1.2");
    expect(res.address("plainDecimals")).toBe("192.168.1.2");
    expect(res.address("decimalOctets")).toEqual([192, 168, 1, 2]);
    expect(res.address("plainBits")).toBe(
      "11000000.10101000.00000001.00000010"
    );
    expect(res.address("bitOctets")).toEqual([
      "11000000",
      "10101000",
      "00000001",
      "00000010",
    ]);
  });

  it("should return mask", () => {
    expect(res.mask("aaaa" as any)).toBe("255.255.255.0");
    expect(res.mask()).toBe("255.255.255.0");
    expect(res.mask("plainDecimals")).toBe("255.255.255.0");
    expect(res.mask("decimalOctets")).toEqual([255, 255, 255, 0]);
    expect(res.mask("plainBits")).toBe("11111111.11111111.11111111.00000000");
    expect(res.mask("bitOctets")).toEqual([
      "11111111",
      "11111111",
      "11111111",
      "00000000",
    ]);
  });

  it("should return wildcard", () => {
    expect(res.wildcard("aaaa" as any)).toBe("0.0.0.255");
    expect(res.wildcard()).toBe("0.0.0.255");
    expect(res.wildcard("plainDecimals")).toBe("0.0.0.255");
    expect(res.wildcard("decimalOctets")).toEqual([0, 0, 0, 255]);
    expect(res.wildcard("plainBits")).toBe(
      "00000000.00000000.00000000.11111111"
    );
    expect(res.wildcard("bitOctets")).toEqual([
      "00000000",
      "00000000",
      "00000000",
      "11111111",
    ]);
  });

  it("should return string version", () => {
    expect(res.toString()).toBe("192.168.1.2/24");
    expect(res.toString(true)).toBe("192.168.1.2 255.255.255.0");
  });
});
