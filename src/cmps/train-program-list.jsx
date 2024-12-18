import { TrainProgramPreview } from "./train-program-preview";

export const TrainProgramList = ({ trainPrograms, onSelectTrain }) => {
  return (
    <ul className="train-program-list clean-list">
      {trainPrograms.map((trainProgram) => (
        <TrainProgramPreview
          key={trainProgram.id}
          trainProgram={trainProgram}
          onSelectTrain={onSelectTrain}
        />
      ))}
    </ul>
  );
};
