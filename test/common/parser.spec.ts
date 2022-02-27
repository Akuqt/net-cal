import { parser } from "../../src/common";

describe("Parse IPv4", () => {
  it("should parse (string)", () => {
    const res = parser("10.0.0.1/8");
    expect(res.address).toEqual([10, 0, 0, 1]);
    expect(res.mask).toEqual([255, 0, 0, 0]);
    expect(res.wildcard).toEqual([0, 255, 255, 255]);
    expect(res.prefix).toBe(8);
  });

  it("should parse (object)", () => {
    const res = parser({
      address: "10.0.0.1",
      mask: "255.0.0.0",
    });
    expect(res.address).toEqual([10, 0, 0, 1]);
    expect(res.mask).toEqual([255, 0, 0, 0]);
    expect(res.wildcard).toEqual([0, 255, 255, 255]);
    expect(res.prefix).toBe(8);
  });

  it("shouldn't parse (invalid type)", () => {
    expect(() => parser(200 as any)).toThrow("Invalid IPv4 address.");
  });

  it("shouldn't parse (invalid ip)", () => {
    expect(() => parser("10.100.200.300/8")).toThrow(
      "IP 10.100.200.300 with mask 255.0.0.0 is not a valid IPv4."
    );
  });

  it("shouldn't parse (invalid octets)", () => {
    expect(() => parser("10.100.200.300.200/8")).toThrow(
      "IP 10.100.200.300.200 with mask 255.0.0.0 is not a valid IPv4."
    );
  });
});
