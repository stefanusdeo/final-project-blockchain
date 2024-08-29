import CryptoJS from "crypto-js";
import { Base64 } from "js-base64";

const key = CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_STRING_KEY); // Key dalam format WordArray
const iv = CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_STRING_IVKEY); // IV dalam format WordArray

export function encryptToBytes32(plaintext) {
  // Enkripsi teks asli
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Konversi hasil enkripsi ke Base64
  const encryptedBase64 = encrypted.toString();

  // Konversi Base64 ke Uint8Array
  const encryptedBytes = Base64.toUint8Array(encryptedBase64);

  // Pastikan hasilnya 32 byte panjangnya
  let bytes32Array = new Uint8Array(32);
  bytes32Array.set(encryptedBytes.slice(0, 32));

  // Konversi ke hex string
  return `0x${[...bytes32Array]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function decryptFromBytes32(bytes32Hex) {
  // Konversi bytes32 ke Uint8Array
  const byteArray = Uint8Array.from(Buffer.from(bytes32Hex.slice(2), "hex"));
  // Konversi Uint8Array ke Base64 string
  const base64String = Base64.fromUint8Array(byteArray);

  // Dekripsi
  const decrypted = CryptoJS.AES.decrypt(base64String, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Mengembalikan hasil dekripsi dalam format string UTF-8
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
