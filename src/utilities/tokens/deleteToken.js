export const deleteToken = () => {
    return new Promise((resolve, reject) => {
        try {
            /** Delete the access token and the refresh token */
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('organization');
            localStorage.removeItem('user_role');

            window.location.replace("/");

            // Resolve the Promise indicating successful token deletion
            resolve();
        } catch (error) {
            // Reject the Promise if an error occurs
            reject(error);
        }
    });
};