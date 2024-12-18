import { ExPreview } from "./ex-preview";

export const ExList = ({ excercises }) => {
  return (
    <ul className="ex-list clean-list">
      {excercises.map((ex) => (
        <ExPreview key={ex.id} exercise={ex} />
      ))}
    </ul>
  );
};
