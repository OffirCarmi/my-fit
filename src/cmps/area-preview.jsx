import { useExercisesStore } from "../stores/exercises-store";

import { ExList } from "../cmps/ex-list";

export const AreaPreview = ({ area, showExercises, currEx = false }) => {
  const { getExercisesByBodyAreaId } = useExercisesStore();

  let exercisesById = [];

  if (showExercises) exercisesById = getExercisesByBodyAreaId(area.id);

  const currArea = currEx.bodyAreaId;
  // console.log("currEx", currEx);
  // console.log("currArea", currArea);

  return (
    <li className="area-preview">
      <div className="area-title">
        <h4 className={currArea === area.id ? "selected" : ""}>{area.name}</h4>
      </div>
      {showExercises && <ExList excercises={exercisesById} />}
    </li>
  );
};
