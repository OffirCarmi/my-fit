import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBodyAreasStore = create(
    persist(
        (set,get) => ({
            bodyAreas: [
                { id: 101, name: "רגליים", exercisesPerTrain: 3 },
                { id: 102, name: "ישבן", exercisesPerTrain: 2 },
                { id: 103, name: "חזה", exercisesPerTrain: 4 },
                { id: 104, name: "גב", exercisesPerTrain: 4 },
                { id: 105, name: "כתפיים", exercisesPerTrain: 3 },
                { id: 106, name: "יד אחורית", exercisesPerTrain: 3 },
                { id: 107, name: "יד קידמית", exercisesPerTrain: 3 },
                { id: 108, name: "בטן", exercisesPerTrain: 3 },
                { id: 109, name: "גב תחתון", exercisesPerTrain: 1 },
            ],
            getBodyAreaById: (id) => {
                return get().bodyAreas.find((area) => area.id === id);
            },
            getExercisesPerTrainById: (id) => {
                return get().bodyAreas.find((area) => area.id === id).exercisesPerTrain;
            },



        }),
        {
            name: "body-areas-storage", // שם המפתח ב-localStorage
        }
    )
);