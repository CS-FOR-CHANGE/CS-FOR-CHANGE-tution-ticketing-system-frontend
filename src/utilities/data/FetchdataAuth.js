import { BackendLink } from "../BackendLink";
import { retrieveTokens } from "../tokens/getToken";
import { deleteToken } from "../tokens/deleteToken";

export default function fetchDataAuth(URL, Method="GET") {
    // Ensure the outermost layer returns a Promise
    return retrieveTokens()
        .then((tokens) => {
            const accessToken = tokens ? tokens.accessToken : null;

            // Check if accessToken is truthy
            if (!accessToken) {
                handleAuthFailure();
                return Promise.reject(new Error("Access token is empty"));
            }

            const myHeaders = new Headers({
                Authorization: `Bearer ${accessToken}`,
            });

            const requestOptions = {
                method: Method,
                headers: myHeaders,
                redirect: "follow",
            };

            // Fetch returns a Promise, so we are returning it to the caller
            return fetch(`${BackendLink}${URL}`, requestOptions).then(
                (response) => {
                    if (!response.ok) {
                        handleAuthFailure();
                        throw new Error(
                            `Response was not ok: ${response.statusText}`
                        );
                    }
                    return response.json(); // This also returns a Promise
                }
            );
        })
        .catch((error) => {
            throw error; // Ensure that any error is propagated
        });
}

function handleAuthFailure() {
    deleteToken();
    // For SPA navigation, it's better to use your router's navigation method
    // Assuming React Router is used, but adjust according to your project's router
    window.location.replace("/");
}
