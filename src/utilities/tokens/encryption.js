// encryption.js
export async function encryptData(plainText) {
    const encoder = new TextEncoder();
    const key = await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encoder.encode(plainText)
    );
    return {
        encryptedData: Array.from(new Uint8Array(encryptedData)), // Convert ArrayBuffer to Array
        iv: Array.from(iv), // Convert Uint8Array to Array for storage
        key: await window.crypto.subtle.exportKey("jwk", key), // Export the key as JWK for storage
    };
}

export async function decryptData(encryptedData, iv, key) {
    const decoder = new TextDecoder();
    const importedKey = await window.crypto.subtle.importKey(
        "jwk",
        key,
        { name: "AES-GCM", length: 256 },
        true,
        ["decrypt"]
    );
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: new Uint8Array(iv), // Convert Array back to Uint8Array
        },
        importedKey,
        new Uint8Array(encryptedData) // Convert Array back to Uint8Array
    );
    return decoder.decode(decryptedData);
}
