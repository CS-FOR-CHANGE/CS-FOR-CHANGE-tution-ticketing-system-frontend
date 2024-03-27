import { BackendLink } from "../BackendLink";

const fetchData = async function fetchData(url) {
    try {
        const response = await fetch(BackendLink + url, {
            credentials: "include", // This is necessary for cookies to be sent with the request
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch the data: ", error);
    }
};

export default fetchData;
