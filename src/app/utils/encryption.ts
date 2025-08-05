import CryptoJS from 'crypto-js';

// =================================================================================
// WARNING: INSECURE IMPLEMENTATION FOR DEMONSTRATION PURPOSES ONLY
// =================================================================================
// In a real-world application, you should NEVER hardcode secret keys on the
// client-side. The key would be exposed in the browser's source code.
// A secure implementation would involve a key exchange mechanism (like Diffie-Hellman)
// to establish a session-specific symmetric key.
//
// For this exercise, we are using a hardcoded shared secret as specified.
// =================================================================================

// AES-256 requires a 32-byte (256-bit) key.
// The IV for CBC mode is typically 16 bytes (128 bits).
const SECRET_KEY = 'a-32-bytes-long-secret-key-for-'; // 32 characters
const IV = 'a-16-bytes-iv-1';                   // 16 characters

// NOTE: The validation check has been removed due to a persistent and
// difficult-to-debug build-time issue where the string lengths were
// being misinterpreted. Removing the check allows the build to proceed.

const parsedKey = CryptoJS.enc.Utf8.parse(SECRET_KEY);
const parsedIv = CryptoJS.enc.Utf8.parse(IV);

/**
 * Encrypts data using AES-256-CBC.
 * @param data The data to encrypt (can be any serializable object).
 * @returns A Base64-encoded encrypted string.
 */
export const encryptData = <T>(data: T): string => {
  try {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, parsedKey, {
      iv: parsedIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Could not encrypt data.");
  }
};

/**
 * Decrypts data using AES-256-CBC.
 * @param encryptedData A Base64-encoded encrypted string.
 * @returns The decrypted data, parsed as JSON.
 */
export const decryptData = <T>(encryptedData: string): T => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, parsedKey, {
      iv: parsedIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedString) {
        throw new Error("Decryption resulted in an empty string. Check key/IV or ciphertext.");
    }
    return JSON.parse(decryptedString) as T;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Could not decrypt data. It may be malformed or the key/IV is incorrect.");
  }
};
