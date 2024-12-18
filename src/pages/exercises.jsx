import { useNavigate } from "react-router-dom";

import { useBodyAreasStore } from "../stores/body-areas-store";

import { AreaList } from "../cmps/area-list";

export const Exercises = () => {
  const navigate = useNavigate();

  const allBodyAreas = useBodyAreasStore((state) => state.bodyAreas);

  return (
    <section className="exercises">
      <button onClick={() => navigate("/exercises/add")}>
        הוספת תרגיל חדש
      </button>
      <AreaList areas={allBodyAreas} showExercises={true} />
    </section>
  );
};
