import { useNavigate } from "react-router-dom";

import { useTrainProgramStore } from "../stores/train-program-store";
import { useExercisesStore } from "../stores/exercises-store";
import { useBodyAreasStore } from "../stores/body-areas-store";
import { useTrainsHistoryStore } from "../stores/trains-history-store";
import { useCurrTrainStore } from "../stores/curr-train-store";

import { trainService } from "../services/train.service";

import { TrainProgramList } from "../cmps/train-program-list";

export const PickTrain = () => {
  const navigate = useNavigate();
  const { trainPrograms, getTrainProgramByName } = useTrainProgramStore();
  const { getExercisesByBodyAreaId } = useExercisesStore();
  const { getExercisesPerTrainById } = useBodyAreasStore();
  const { getHistoryByName } = useTrainsHistoryStore();
  const { setNewCurrTrain } = useCurrTrainStore();

  const onSelectTrain = (trainName) => {
    const trainProgram = getTrainProgramByName(trainName);
    const initialData = trainProgram.areas.map((area) => ({
      bodyAreaId: area,
      exercises: getExercisesByBodyAreaId(area),
      exsPerTrain: getExercisesPerTrainById(area),
    }));
    const initialTrain = { name: trainName, initialData: initialData };
    const history = getHistoryByName(trainName);
    const newTrain = trainService.makeNewTrain(initialTrain, history);
    setNewCurrTrain(newTrain);
    navigate("/train");
  };

  return (
    <section className="pick-train">
      <h3>איזה אימון עושים היום?</h3>
      <TrainProgramList
        trainPrograms={trainPrograms}
        onSelectTrain={onSelectTrain}
      />
    </section>
  );
};
