import CryptoJS from "crypto-js";

export async function retrieveTokens() {
    try {
        const encryptionKey = import.meta.env.VITE_PASS_ENCRIPT_KEY;

        // Directly retrieve the values without options
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const storedOrganization = localStorage.getItem("organization");
        const storedUserRole = localStorage.getItem("user_role");

        // Attempt decryption
        let decryptedAccessToken = CryptoJS.AES.decrypt(
            storedAccessToken,
            encryptionKey
        ).toString(CryptoJS.enc.Utf8);
        let decryptedRefreshToken = CryptoJS.AES.decrypt(
            storedRefreshToken,
            encryptionKey
        ).toString(CryptoJS.enc.Utf8);
        let decryptedOrganization = CryptoJS.AES.decrypt(
            storedOrganization,
            encryptionKey
        ).toString(CryptoJS.enc.Utf8);
        let decryptedUserRole = CryptoJS.AES.decrypt(
            storedUserRole,
            encryptionKey
        ).toString(CryptoJS.enc.Utf8);

        // Check if decryption was successful
        if (!decryptedAccessToken || !decryptedRefreshToken) {
            throw new Error("Decryption failed");
        }

        return {
            accessToken: decryptedAccessToken,
            refreshToken: decryptedRefreshToken,
            organization: decryptedOrganization,
            user_role: decryptedUserRole,
        };
    } catch (error) {
        console.error("Error retrieving tokens:", error);
        // Return undefined or null for tokens to indicate failure
        return {
            accessToken: null,
            refreshToken: null,
            organization: null,
            user_role: null,
        };
    }
}
