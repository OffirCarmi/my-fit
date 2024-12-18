import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrTrainStore } from "../stores/curr-train-store";
import { useBodyAreasStore } from "../stores/body-areas-store";

import { ProgressBar } from "../cmps/progress-bar";
import { AreaList } from "../cmps/area-list";
import { ExerciseInTrain } from "../cmps/exercise-in-train";
import { Timer } from "../cmps/timer";

export const CurrTrain = () => {
  const navigate = useNavigate();
  const { currTrain } = useCurrTrainStore();
  const { getBodyAreaById } = useBodyAreasStore();

  const { exercises, currEx } = currTrain;
  const areaIds = new Set(exercises.map((exercise) => exercise.bodyAreaId));
  const areas = Array.from(areaIds).map((id) => getBodyAreaById(id));

  useEffect(() => {
    if (currEx >= exercises.length) {
      navigate("/finish");
    }
  }, [currEx, exercises.length, navigate]);

  return (
    <section className="curr-train">
      <div className="progress">
        <ProgressBar
          totalExercises={exercises.length}
          currExercise={currEx + 1}
        />
        <AreaList areas={areas} currEx={exercises[currEx]} />
      </div>
      <ExerciseInTrain currEx={exercises[currEx] || null} key={currEx.id} />
      <Timer />
    </section>
  );
};
