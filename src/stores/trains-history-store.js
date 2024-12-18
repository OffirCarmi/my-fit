import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTrainsHistoryStore = create(
    persist(
        (set, get) => ({
            trainsHistory: [],
            addTrainToHistory: (newTrainHistory) => {
                set((state) => ({ trainsHistory: [...state.trainsHistory, newTrainHistory] }))
            },
            getHistoryByName: (name) => (get().trainsHistory.filter((history) => history.name === name)),
        }),
        
        {
            name: "trains-history-storage", // שם המפתח ב-localStorage
        }
    )
);




// { id: "gNJS3", dateCreated: 1733854274390, isDone: true, name: "A", exercises: ["5xMs2", "sd91N", "cJK4l", "XM112"], currExercise: 3 },

// 