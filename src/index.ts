import { IPv4 } from "./common";

const ip = "192.0.0.1/17";
const ipv4 = new IPv4(ip);

console.log(ipv4.toString());
console.log(ipv4.toString(true));
console.log(ipv4.address("plainBits"));
console.log(ipv4.address("bitOctets"));
console.log(ipv4.address("plainDecimals"));
console.log(ipv4.address("decimalOctets"));
