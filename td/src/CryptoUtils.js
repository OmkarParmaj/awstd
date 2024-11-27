// src/cryptoUtils.js

const crypto = window.crypto || window.msCrypto; // For IE 11

/**
 * Convert a string to an ArrayBuffer.
 * @param {string} str - The string to convert.
 * @returns {ArrayBuffer} The ArrayBuffer representation of the string.
 */
function stringToArrayBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str).buffer;
}

/**
 * Convert an ArrayBuffer to a string.
 * @param {ArrayBuffer} buffer - The ArrayBuffer to convert.
 * @returns {string} The string representation of the ArrayBuffer.
 */
function arrayBufferToString(buffer) {
    const decoder = new TextDecoder();
    return decoder.decode(buffer);
}

/**
 * Generate a random 12-byte initialization vector (IV).
 * @returns {Uint8Array} The generated IV.
 */
function generateIV() {
    const iv = new Uint8Array(12);
    crypto.getRandomValues(iv);
    return iv;
}

/**
 * Encrypt a string using AES-GCM-256.
 * @param {string} plaintext - The plaintext string to encrypt.
 * @param {Uint8Array} key - The encryption key.
 * @returns {Promise<string>} The encrypted string (Base64 encoded).
 */
async function encrypt(plaintext, key) {
    const iv = generateIV();
    const encodedPlaintext = stringToArrayBuffer(plaintext);

    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encodedPlaintext
    );

    const encryptedArray = new Uint8Array(encryptedBuffer);
    const encryptedBase64 = btoa(String.fromCharCode(...iv, ...encryptedArray));
    return encryptedBase64;
}

/**
 * Decrypt a Base64 encoded string using AES-GCM-256.
 * @param {string} encryptedBase64 - The Base64 encoded encrypted string.
 * @param {Uint8Array} key - The decryption key.
 * @returns {Promise<string>} The decrypted plaintext string.
 */
async function decrypt(encryptedBase64, key) {
    const encryptedData = atob(encryptedBase64);
    const iv = new Uint8Array(encryptedData.slice(0, 12).split('').map(c => c.charCodeAt(0)));
    const encryptedBuffer = new Uint8Array(encryptedData.slice(12).split('').map(c => c.charCodeAt(0)));

    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encryptedBuffer
    );

    return arrayBufferToString(decryptedBuffer);
}

/**
 * Generate a key for AES-GCM-256.
 * @returns {Promise<CryptoKey>} The generated key.
 */
async function generateKey() {
    return crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );
}

export { generateKey, encrypt, decrypt };
