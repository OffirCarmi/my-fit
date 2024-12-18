import { useState, useEffect } from "react";

import { useExercisesStore } from "../stores/exercises-store";
import { useCurrTrainStore } from "../stores/curr-train-store";

import { FormInput } from "../cmps/form/form-input";
import { FormTextArea } from "../cmps/form/form-textarea";
import { utilService } from "../services/util.service";

export const ExerciseInTrain = ({ currEx }) => {
  const { editExercise } = useExercisesStore();
  const { endExercise } = useCurrTrainStore();

  // בדיקת תקינות `currEx` לפני קביעת ה-state הראשוני
  const [exerciseToSave, setExerciseToSave] = useState(() =>
    currEx
      ? {
          weight: currEx.weight || 0,
          notes: currEx.notes || "",
          imgs: currEx.imgs || [],
        }
      : { weight: 0, notes: "", imgs: [] }
  );

  useEffect(() => {
    if (currEx) {
      setExerciseToSave({
        weight: currEx.weight || 0,
        notes: currEx.notes || "",
        imgs: currEx.imgs || [],
      });
    }
  }, [currEx]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "weight") value = +value; // התייחסות למספרים

    setExerciseToSave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      currEx.weight !== exerciseToSave.weight ||
      currEx.notes !== exerciseToSave.notes
    );
  };

  const onSave = () => {
    if (!currEx) return; // לוודא ש`currEx` תקין לפני שמירה
    const updatedEx = {
      ...currEx,
      ...exerciseToSave,
      dateModified: Date.now(),
    };
    editExercise(updatedEx.id, updatedEx);
  };

  const onEndExercise = () => {
    setExerciseToSave({ weight: 0, notes: "", imgs: [] });
    endExercise(); 
  };
  

  if (!currEx) {
    return <div className="error">אין תרגיל להצגה</div>;
  }

  return (
    <section className="exercise-in-train">
      <h3 className="title">{currEx.name}</h3>
      <form className="exercise-details">
        <FormInput
          label=""
          type="number"
          name="weight"
          value={exerciseToSave.weight}
          onChange={handleChange}
        />
        <FormTextArea
          label=""
          name="notes"
          value={exerciseToSave.notes}
          onChange={handleChange}
        />
      </form>
      <div className="exercise-update">
        <p>
          עדכון משקל אחרון:{" "}
          {utilService.convertTimestampToDate(currEx.dateModified)}
        </p>
        <button
          className={isFormValid() ? "edited" : ""}
          onClick={onSave}
          disabled={!isFormValid()}
        >
          שמור שינויים
        </button>
      </div>
      <div className="btns">
        {/* <button className="other">החלף תרגיל</button> */}
        <button className="done" onClick={onEndExercise}>
          סיימתי
        </button>
      </div>
      <div className="exercise-imgs" key={currEx.id}>
        {!!exerciseToSave.imgs.length &&
          exerciseToSave.imgs.map((link, idx) => (
            <video className="link" key={idx} playsInline autoPlay loop muted>
              <source src={link} />
            </video>
          ))}
      </div>
    </section>
  );
};

// import { useState, useEffect } from "react";

// import { useExercisesStore } from "../stores/exercises-store";

// import { FormInput } from "../cmps/form/form-input";
// import { FormTextArea } from "../cmps/form/form-textarea";
// import { utilService } from "../services/util.service";

// export const ExerciseInTrain = ({ currEx }) => {
//   //   console.log(currEx);
//   const { editExercise } = useExercisesStore();

//   const [exerciseToSave, setExerciseToSave] = useState({
//     weight: 0,
//     notes: "",
//     imgs: [],
//   });

//   useEffect(() => {
//     setExerciseToSave({
//       weight: currEx.weight,
//       notes: currEx.notes,
//     });
//   }, [currEx]);

//   const handleChange = (e) => {
//     let { name, value } = e.target;
//     if (name === "weight") value = +value;

//     setExerciseToSave((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const isFormValid = () => {
//     if (
//       currEx.weight === exerciseToSave.weight &&
//       currEx.notes === exerciseToSave.notes
//     )
//       return false;
//     return true;
//   };

//   const onSave = () => {
//     const updatedEx = { ...currEx, ...exerciseToSave };
//     editExercise(updatedEx.id, updatedEx);
//   };

//   return (
//     <section className="exercise-in-train">
//       <h3 className="title">{currEx.name}</h3>
//       <form className="exercise-details">
//         <FormInput
//           label=""
//           type="number"
//           name="weight"
//           value={exerciseToSave.weight}
//           onChange={handleChange}
//         />
//         <FormTextArea
//           label=""
//           notes={exerciseToSave.notes}
//           onChange={handleChange}
//         />
//       </form>
//       <div className="exercise-update">
//         <p>עדכון אחרון: {utilService.convertTimestamp(currEx.dateModified)}</p>
//         <button className={isFormValid() ? "edited" : ""} onClick={onSave}>
//           שמור שינויים
//         </button>
//       </div>
//       <div className="exercise-imgs"></div>
//     </section>
//   );
// };
