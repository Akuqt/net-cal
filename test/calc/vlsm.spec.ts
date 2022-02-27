import { vlsm } from "../../src/calc";
import { IPv4 } from "../../src/common";

describe("IPv4 VLSM", () => {
  it("should perform the vlsm", () => {
    const res = vlsm("192.168.10.0/24", [100, 50, 20, 10]);
    expect(res.required).toBe(180);
    expect(res.available).toBe(256);
    expect(res.result).toBeInstanceOf(Array);
    expect(res.result[0].fullNetwork).toBeInstanceOf(IPv4);
    expect(res.result[0].range).toBeDefined();
  });
  it("shouldn'd perform the vlsm", () => {
    expect(() => vlsm("192.168.10.0/24", [100, 200])).toThrow(
      "There's no space to cover the required networks."
    );
  });
});
