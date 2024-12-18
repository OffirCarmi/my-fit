import { create } from "zustand";
// import { persist } from "zustand/middleware";
import { utilService } from "../services/util.service";

import { exercisesDB } from "../data/exercises-db";

export const useExercisesStore = create((set, get) => ({
    exercises: JSON.parse(localStorage.getItem('exercises-storage')) || [],

    addExercise: (exercise) => {
        const newExercise = {
            id: utilService.makeId(),
            name: exercise.name,
            bodyAreaId: exercise.bodyAreaId,
            dateCreated: Date.now(),
            dateModified: Date.now(),
            weight: exercise.weight,
            notes: exercise.notes,
            imgs: exercise.imgs,
            lastTimeUsed: 0,
            skipCounter: 0,
        };
        const exercises = [...get().exercises, newExercise];
        localStorage.setItem('exercises-storage', JSON.stringify(exercises));
        set({ exercises });
    },

    editExercise: (id, updatedData) => {
        const exercises = get().exercises.map((ex) =>
            ex.id === id ? { ...ex, ...updatedData } : ex
        );
        localStorage.setItem('exercises-storage', JSON.stringify(exercises));
        set({ exercises });
    },

    removeExercise: (id) => {
        const exercises = get().exercises.filter((ex) => ex.id !== id);
        localStorage.setItem('exercises-storage', JSON.stringify(exercises));
        set({ exercises });
    },

    getExerciseById: (id) => {
        return get().exercises.find((exercise) => exercise.id === id);
    },

    getExercisesByBodyAreaId: (bodyAreaId) => {
        return get().exercises.filter(
            (exercise) => exercise.bodyAreaId === bodyAreaId
        );
    },

    initializeExercises: () => {
        const exercises = get().exercises;

        if (!exercises || exercises.length === 0) {
            const exercisesFromDB = exercisesDB;
            localStorage.setItem('exercises-storage', JSON.stringify(exercisesFromDB));
            set({ exercises: exercisesFromDB });
        }
    },
}));