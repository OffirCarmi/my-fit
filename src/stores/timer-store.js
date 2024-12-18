import { create } from "zustand";

export const useTimerStore = create((set, get) => ({
    startTime: null, // מתי הטיימר התחיל
    timerId: null, // מזהה של ה-interval
    elapsedTime: 0, // זמן שחלף במילישניות

    startTimer: () => {
        // אם הטיימר כבר רץ, אין צורך להפעיל שוב
        if (get().timerId) return;

        const startTime = Date.now() - get().elapsedTime; // שמור את זמן ההתחלה עם הזמן שחלף
        set({ startTime });

        const timerId = setInterval(() => {
            const elapsedTime = Date.now() - get().startTime;
            set({ elapsedTime });
        }, 1); // עדכון כל מילישנייה

        set({ timerId });
    },

    stopTimer: () => {
        const timerId = get().timerId;

        if (timerId) {
            clearInterval(timerId);
            set({ timerId: null, elapsedTime: 0 });
        }
    },

    restartTimer: () => {
        // איפוס הזמן שחלף
        set({ elapsedTime: 0, startTime: null });
        get().stopTimer();
        get().startTimer();
    },
}));


// import { create } from "zustand";

// export const useTimerStore = create((set, get) => ({
//     timestamp: null, // הזמן הנוכחי או null כאשר הטיימר אינו פעיל
//     timerId: null, // מזהה של ה-interval כדי לעצור אותו במידת הצורך

//     startTimer: () => {
//         // בדוק אם הטיימר כבר רץ
//         if (get().timerId) return;

//         // אתחול ראשוני של הזמן
//         set({ timestamp: Date.now() });

//         const timerId = setInterval(() => {
//             set({ timestamp: Date.now() });
//         }, 1000);

//         set({ timerId });
//     },

//     stopTimer: () => {
//         const timerId = get().timerId;

//         if (timerId) {
//             clearInterval(timerId); // עצור את ה-interval
//             set({ timerId: null, timestamp: null }); // אפס את הסטור
//         }
//     },
// }));
