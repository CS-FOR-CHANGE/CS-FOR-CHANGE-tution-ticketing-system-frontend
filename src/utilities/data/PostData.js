import { BackendLink } from "../BackendLink";

const postData = async function postData(url, dataToSend) {
    try {
        const response = await fetch(BackendLink + url, {
            method: 'POST', // Use the POST method
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(dataToSend), // Convert the JavaScript object to a JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Assuming the server responds with JSON data
        return data;
    } catch (error) {
        console.error("Could not post the data: ", error);
    }
};

export default postData;
