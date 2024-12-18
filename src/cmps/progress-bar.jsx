export const ProgressBar = ({ totalExercises, currExercise }) => {
  // חישוב אחוז ההתקדמות
  const progressPercentage =
    totalExercises > 0
      ? Math.min((currExercise / totalExercises) * 100, 100)
      : 0;

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};
