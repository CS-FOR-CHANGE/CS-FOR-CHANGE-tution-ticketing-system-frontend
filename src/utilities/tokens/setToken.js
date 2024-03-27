import CryptoJS from "crypto-js";

export const storeTokens = (tokensData) => {
    return new Promise((resolve, reject) => {
        const accessToken = tokensData.access;
        const refreshToken = tokensData.refresh;
        const organization = tokensData.organization;
        const user_token = tokensData.user_role;

        try {
            const encryptionKey = import.meta.env.VITE_PASS_ENCRIPT_KEY;

            const encryptedAccessToken = CryptoJS.AES.encrypt(
                accessToken,
                encryptionKey
            ).toString();
            const encryptedRefreshToken = CryptoJS.AES.encrypt(
                refreshToken,
                encryptionKey
            ).toString();
            const encryptedOrganization = CryptoJS.AES.encrypt(
                organization,
                encryptionKey
            ).toString();
            const encryptedUserRole = CryptoJS.AES.encrypt(
                user_token,
                encryptionKey
            ).toString();

            localStorage.setItem("accessToken", encryptedAccessToken, {
                secure: true,
                httpOnly: true,
            });
            localStorage.setItem("refreshToken", encryptedRefreshToken, {
                secure: true,
                httpOnly: true,
            });
            localStorage.setItem("organization", encryptedOrganization, {
                secure: true,
                httpOnly: true,
            });
            localStorage.setItem("user_role", encryptedUserRole, {
                secure: true,
                httpOnly: true,
            });

            // Resolve the Promise indicating successful token saving
            resolve();
        } catch (error) {
            // Reject the Promise if an error occurs
            reject(error);
        }
    });
};
