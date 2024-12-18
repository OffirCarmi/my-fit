import { create } from "zustand";

export const useTrainProgramStore = create((set, get) => ({
    trainPrograms: [
        { id: "sd7ns", name: "A", areas: [101, 102, 103, 106, 109] },
        { id: "xc0sL", name: "B", areas: [104, 105, 107, 108] }
    ],
    getTrainProgramByName: (name) => {
        return get().trainPrograms.find((program) => program.name === name);
    },

    addTrainProgram: (newTrainProgram) => {
        set((state) => ({ trainPrograms: [...state.trainPrograms, newTrainProgram] }))
    },
}));