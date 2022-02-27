import { range } from "../../src/calc";

describe("IPv4 Ranges", () => {
  it("should get range", () => {
    const res = range("192.168.10.20/24");
    expect(res.network).toBe("192.168.10.0");
    expect(res.mask).toBe("255.255.255.0");
    expect(res.wildcard).toBe("0.0.0.255");
    expect(res.prefix).toBe(24);
    expect(res.first).toBe("192.168.10.1");
    expect(res.last).toBe("192.168.10.254");
    expect(res.broadcast).toBe("192.168.10.255");
  });
});
