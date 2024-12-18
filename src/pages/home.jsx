import { useNavigate } from "react-router-dom";

import { useCurrTrainStore } from "../stores/curr-train-store";

import { IMain } from "../assets/icons/i-main";

export const Home = () => {
  const navigate = useNavigate();
  const { currTrain } = useCurrTrainStore();

  return (
    <section className="home">
      <h2>
        כל אימון מקרב אותך<br></br>לגרסה הטובה ביותר שלך
      </h2>
      <IMain />
      <div className="btns-box">
        <button className="new-train" onClick={() => navigate("/pickTrain")}>
          אימון חדש
        </button>
        {!!currTrain.id && (
          <button className="curr-train" onClick={() => navigate(`/train`)}>
            המשך אימון
          </button>
        )}
        <button
          className="all-exercises"
          onClick={() => navigate("/exercises")}
        >
          למאגר התרגילים
        </button>
      </div>
    </section>
  );
};
