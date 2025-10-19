import { Buffer } from "buffer";

export const encodeString = (str) => {
  return Buffer.from(str, "utf-8").toString("base64");
};

export const decodeString = (encodedStr) => {
  return Buffer.from(encodedStr, "base64").toString("utf-8");
};
