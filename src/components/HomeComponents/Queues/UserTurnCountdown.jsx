import React, { useState, useEffect } from "react";

function UserTurnCountdown({ sessions, userId }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const now = new Date().getTime();
        const filteredSessions = sessions.filter((session) => {
            const sessionStartTime = new Date(session.start_time).getTime();
            return sessionStartTime > now && session.student.id === userId;
        });

        const upcomingSession = filteredSessions.sort(
            (a, b) =>
                new Date(a.start_time).getTime() -
                new Date(b.start_time).getTime()
        )[0];

        if (!upcomingSession) {
            setTimeLeft("No upcoming sessions found for the user.");
            return;
        }

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const distance =
                new Date(upcomingSession.start_time).getTime() - currentTime;
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(hours + "h " + minutes + "m " + seconds + "s ");

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft("It's your turn!");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sessions, userId]);

    return <div>{timeLeft}</div>;
}

export default UserTurnCountdown;
