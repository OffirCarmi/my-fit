import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useTrainsHistoryStore } from "./trains-history-store"
import { useExercisesStore } from "./exercises-store";
import { useTimerStore } from "./timer-store";

export const useCurrTrainStore = create(
    persist(
        (set, get) => ({
            currTrain: {
                id: "",
                dateCreated: 0,
                isDone: false,
                name: "",
                exercises: [],
                currEx: 0
            },
            setNewCurrTrain: (train) => {
                set({ currTrain: { ...train } });
                const { startTimer } = useTimerStore.getState();
                startTimer();
            },
            endExercise: () => {
                const { currTrain } = get();
                const { exercises, currEx } = currTrain;

                // עדכון `lastTimeUsed` בתרגיל הנוכחי
                if (exercises[currEx]) {
                    const currentExercise = { ...exercises[currEx], lastTimeUsed: Date.now() };

                    // שמירת התרגיל ב-`exercisesStore`
                    const { editExercise } = useExercisesStore.getState();
                    editExercise(currentExercise.id, currentExercise);
                }

                // בדיקה אם מדובר בתרגיל האחרון
                if (currEx >= exercises.length - 1) {
                    const completedTrain = { ...currTrain, isDone: true };

                    // הוספת האימון ל-`trainsHistory`
                    const { addTrainToHistory } = useTrainsHistoryStore.getState();
                    addTrainToHistory(completedTrain);

                    // איפוס `currTrain`
                    set({
                        currTrain: {
                            id: "",
                            dateCreated: 0,
                            isDone: false,
                            name: "",
                            exercises: [],
                            currEx: 0,
                        },
                    });
                } else {
                    // עדכון `currEx`
                    set({
                        currTrain: {
                            ...currTrain,
                            currEx: currTrain.currEx + 1,
                        },
                    });
                }
            },
        }),
        {
            name: "curr-train-storage",
        }
    )
);