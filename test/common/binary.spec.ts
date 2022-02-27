import { int2bin, bin2int } from "../../src/common";

describe("Decimal to binary", () => {
  it("should convert to binary (min length)", () => {
    const res = int2bin(10);
    expect(res).toBe("00001010");
  });

  it("should convert to binary (number)", () => {
    const res = int2bin(128);
    expect(res).toBe("10000000");
  });

  it("should convert to binary (string)", () => {
    const res = int2bin("128");
    expect(res).toBe("10000000");
  });
});

describe("Binary to decimal", () => {
  it("should convert to decimal", () => {
    const res = bin2int("10000000");
    expect(res).toBe(128);
  });
});
