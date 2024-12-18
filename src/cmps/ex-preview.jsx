import { useNavigate } from "react-router-dom";

export const ExPreview = ({ exercise }) => {
  const navigate = useNavigate();

    return <li className="exercise-name" onClick={() => navigate(`/exercises/${exercise.id}`)}>{exercise.name}</li>;
};