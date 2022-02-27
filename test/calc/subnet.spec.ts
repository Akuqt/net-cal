import { subnetFromMask, subnetFromParams } from "../../src/calc";
import { IPv4 } from "../../src/common";

describe("IPv4 Subnetting From Mask", () => {
  it("should get subnets (prefix)", () => {
    const res = subnetFromMask("10.180.10.18/8", 10);
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBe(4);
    expect(res[0].fullNetwork).toBeInstanceOf(IPv4);
    expect(res[0].range).toBeDefined();
    expect(res[0].range.network).toBe("10.128.0.0");
    expect(res[0].range.mask).toBe("255.192.0.0");
    expect(res[0].range.wildcard).toBe("0.63.255.255");
    expect(res[0].range.prefix).toBe(10);
    expect(res[0].range.first).toBe("10.128.0.1");
    expect(res[0].range.last).toBe("10.191.255.254");
    expect(res[0].range.broadcast).toBe("10.191.255.255");
  });

  it("should get subnets (mask)", () => {
    const res = subnetFromMask("10.180.10.18/8", "255.192.0.0");
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBe(4);
    expect(res[0].fullNetwork).toBeInstanceOf(IPv4);
    expect(res[0].range).toBeDefined();
    expect(res[0].range.network).toBe("10.128.0.0");
    expect(res[0].range.mask).toBe("255.192.0.0");
    expect(res[0].range.wildcard).toBe("0.63.255.255");
    expect(res[0].range.prefix).toBe(10);
    expect(res[0].range.first).toBe("10.128.0.1");
    expect(res[0].range.last).toBe("10.191.255.254");
    expect(res[0].range.broadcast).toBe("10.191.255.255");
  });

  it("shouldn't get subnets", () => {
    expect(() => subnetFromMask("10.180.10.18/8", 7)).toThrow(
      "Invalid Subnetting."
    );
  });
});

describe("IPv4 Subnetting From Params", () => {
  it("should get subnets (without n)", () => {
    const res = subnetFromParams("192.168.64.0", 9, 10);
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBe(16);
    expect(res[0].fullNetwork).toBeInstanceOf(IPv4);
    expect(res[0].range).toBeDefined();
  });

  it("should get subnets (with n)", () => {
    const res = subnetFromParams("100.100.96.0", 30, 100, 20);
    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBe(32);
    expect(res[0].fullNetwork).toBeInstanceOf(IPv4);
    expect(res[0].range).toBeDefined();
  });

  it("shouldn't get subnets", () => {
    expect(() => subnetFromParams("100.100.96.0", 300, 100, 20)).toThrow(
      "Invalid Params."
    );
  });
});
