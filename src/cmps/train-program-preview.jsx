import { useBodyAreasStore } from "../stores/body-areas-store";

import { AreaList } from "./area-list";

export const TrainProgramPreview = ({ trainProgram, onSelectTrain }) => {
  const allBodyAreas = useBodyAreasStore((state) => state.bodyAreas);

  const areasToShow = allBodyAreas.filter((area) =>
    trainProgram.areas.includes(area.id)
  );

  return (
    <li className="train-box" onClick={() => onSelectTrain(trainProgram.name)}>
      <h4 className="area-name">{trainProgram.name}</h4>
      <AreaList areas={areasToShow} showExercises={false} />
    </li>
  );
};
