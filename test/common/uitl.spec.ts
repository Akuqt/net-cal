import {
  getMagic,
  getParam,
  getPrefix,
  increment,
  getOctets,
  createMask,
  fromPlainBits,
} from "../../src/common";

describe("Get Magic Number", () => {
  it("should get magic number", () => {
    const res = getMagic([255, 255, 255, 252]);
    expect(res.value).toBe(4);
    expect(res.octet).toBe(3);
  });

  it("should get magic number (invalid mask)", () => {
    const res = getMagic([255, 255, 255, 257]);
    expect(res.value).toBe(0);
    expect(res.octet).toBe(1);
  });
});

describe("Get Octets", () => {
  it("should get octets", () => {
    const res = getOctets("192.168.1.0");
    expect(res).toEqual([192, 168, 1, 0]);
  });
});

describe("Get Params", () => {
  it("should get h", () => {
    const res = getParam(2048);
    expect(res).toBe(11);
  });
  it("should get s", () => {
    const res = getParam(900, "s");
    expect(res).toBe(10);
  });
});

describe("Get Prefix", () => {
  it("should get prefix", () => {
    const res = getPrefix("255.255.255.0");
    expect(res).toBe(24);
  });

  it("should get prefix (zero)", () => {
    const res = getPrefix("0.0.0.0");
    expect(res).toBe(0);
  });
});

describe("Addres From Plain Bits", () => {
  it("should get address", () => {
    const res = fromPlainBits("00001010.00000000.00000000.00000001");
    expect(res).toBe("10.0.0.1");
  });
});

describe("Create Mask From Prefix", () => {
  it("should create mask (number)", () => {
    const res = createMask(24);
    expect(res.plain).toBe("255.255.255.0");
    expect(res.octets).toEqual([255, 255, 255, 0]);
  });
  it("should create mask (string)", () => {
    const res = createMask("24");
    expect(res.plain).toBe("255.255.255.0");
    expect(res.octets).toEqual([255, 255, 255, 0]);
  });

  it("shouldn't create mask", () => {
    expect(() => createMask(33)).toThrow("Invalid mask prefix.");
  });
});

describe("Increment Address", () => {
  it("should increment address", () => {
    const res = increment([10, 0, 0, 1], { octet: 3, value: 255 });
    expect(res).toEqual([10, 0, 1, 0]);
  });
});
