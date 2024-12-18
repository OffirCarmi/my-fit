import { useNavigate } from "react-router-dom";

export const Header = () => {
const navigate = useNavigate()

  return (
    <header>
      <h1 onClick={() => navigate("/")}>MyFit</h1>
    </header>
  );
};
