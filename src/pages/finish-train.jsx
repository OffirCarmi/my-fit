import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTimerStore } from "../stores/timer-store";

import { Timer } from "../cmps/timer";

export const FinishTrain = () => {
  const navigate = useNavigate();
  const { restartTimer, stopTimer } = useTimerStore();

  // State למעקב אחרי אם הטיימר רץ או לא
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    stopTimer(); // בדיקה ואתחול נתונים בטעינה ראשונית
  }, []);

  // פונקציה להתחלת/הפסקת הטיימר
  const handleStartStop = () => {
    if (isTimerRunning) {
      stopTimer();
      navigate("/");
    } else restartTimer();
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <section className="finish-train">
      <h3 className="title">
        עוד קצת וסיימת...
        <br />
        <span>פלאנק</span>
      </h3>
      <video className="plank" playsInline autoPlay loop muted>
        <source src="https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-forearm-plank-front.mp4#t=0.1" />
      </video>
      <button className="start-stop" onClick={handleStartStop}>
        {isTimerRunning ? "סיום" : "התחלה"}
      </button>
      <Timer />
    </section>
  );
};

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useTimerStore } from "../stores/timer-store";

// import { Timer } from "../cmps/timer";

// export const FinishTrain = () => {
//   const navigate = useNavigate();
//   const { restartTimer, stopTimer } = useTimerStore();

//   useEffect(() => {
//     stopTimer();
//     restartTimer();
//   }, []);

//   const onDone = () => {
//     stopTimer();
//     navigate("/");
//   };

//   return (
//     <section className="finish-train">
//       <h3 className="title">
//         עוד קצת וסיימת...
//         <br />
//         <span>פלאנק</span>
//       </h3>
//       <video className="plank" playsInline autoPlay loop muted>
//         <source src="https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-forearm-plank-front.mp4#t=0.1" />
//       </video>

//       <button className="done" onClick={() => onDone()}>
//         זהו להיום!
//       </button>
//       <Timer />
//     </section>
//   );
// };
