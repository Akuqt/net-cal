import { summarize } from "../../src/calc";

describe("IPv4 Summarization", () => {
  it("should summarize", () => {
    const res = summarize("192.168.10.0/24", "192.168.20.0/24");
    expect(res.address()).toBe("192.168.0.0");
    expect(res.mask()).toBe("255.255.224.0");
    expect(res.wildcard()).toBe("0.0.31.255");
    expect(res.prefix()).toBe(19);
  });
});
