import React, { useState, useEffect } from "react";

function CountdownTimer({ endTime }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const endTimeParsed = new Date(endTime).getTime();
            const now = new Date().getTime();
            const distance = endTimeParsed - now;

            if (distance < 0) {
                // Countdown is over
                return "EXPIRED";
            } else {
                // Time calculations for days, hours, minutes and seconds
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                return `${
                    days > 0 ? `${days}d ` : ""
                }${hours}h ${minutes}m ${seconds}s`;
            }
        };

        // Update immediately to avoid initial delay
        setTimeLeft(calculateTimeLeft());

        // Set interval to update every second
        const interval = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (newTimeLeft === "EXPIRED") clearInterval(interval);
        }, 1000);

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, [endTime]);

    return <div>{timeLeft}</div>;
}

export default CountdownTimer;
