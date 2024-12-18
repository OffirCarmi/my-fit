import { AreaPreview } from "./area-preview";

export const AreaList = ({ areas, showExercises = false, currEx = false }) => {
  // console.log("currEx", currEx);

  return (
    <ul className="area-list clean-list">
      {areas.map((area) => (
        <AreaPreview
          key={area.id}
          area={area}
          showExercises={showExercises}
          currEx={currEx}
        />
      ))}
    </ul>
  );
};
