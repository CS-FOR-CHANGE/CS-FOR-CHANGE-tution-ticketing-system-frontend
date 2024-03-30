import { BackendLink } from "../BackendLink";

const postData = async function postData(url, dataToSend) {
    try {
        const response = await fetch(BackendLink + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await response.json(); // Attempt to read the body as JSON

        if (!response.ok) {
            // Instead of throwing an error, return an object indicating failure
            // and include the status code and the body (which might contain error details)
            return { success: false, status: response.status, error: data };
        }

        // If the request was successful, return an object indicating success
        // and include the response data
        return { success: true, data };
    } catch (error) {
        // If an error occurred during the fetch or during response processing,
        // return an object indicating an error with the error message.
        console.error("Could not post the data: ", error);
        return { success: false, error: error.message };
    }
};

export default postData;
