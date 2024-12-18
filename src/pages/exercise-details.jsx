import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useExercisesStore } from "../stores/exercises-store";

import { FormInput } from "../cmps/form/form-input";
import { FormSelect } from "../cmps/form/form-select";
import { FormTextArea } from "../cmps/form/form-textarea";
import { utilService } from "../services/util.service";

export const ExerciseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getExerciseById, addExercise, editExercise, removeExercise } =
    useExercisesStore();

  const [exerciseToSave, setExerciseToSave] = useState({
    name: "",
    weight: "",
    bodyAreaId: 0,
    notes: "",
    imgs: [],
  });

  useEffect(() => {
    const exercise = getExerciseById(id);
    if (exercise) setExerciseToSave(exercise);
    else navigate("/exercises/add");
  }, [id, getExerciseById, navigate]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // אם השם מתחיל ב-"imgs[" (זיהוי שדה תמונה)
    if (name.startsWith("imgs[")) {
      const index = parseInt(name.match(/\d+/)[0]); // חילוץ האינדקס מתוך השם
      setExerciseToSave((prev) => {
        const updatedImgs = [...prev.imgs]; // יצירת העתק של המערך
        updatedImgs[index] = value || ""; // עדכון הערך של התמונה במערך (במקרה של ערך ריק, השאר את המערך כפי שהוא)
        return {
          ...prev,
          imgs: updatedImgs, // עדכון במערך imgs
        };
      });
    }
    // טיפול בערך משקל כטקסט
    else if (name === "weight") {
      setExerciseToSave((prev) => ({
        ...prev,
        weight: value, // שמירה כטקסט
      }));
    }
    // עדכון שדות אחרים
    else {
      setExerciseToSave((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e) => {
    setExerciseToSave((prev) => ({
      ...prev,
      bodyAreaId: parseInt(e.target.value), // המרה למספר במידת הצורך
    }));
  };

  const isFormValid = () => {
    const { name, weight, bodyAreaId, notes, imgs } = exerciseToSave;

    if (id === "add") {
      // אם שם, משקל ואזור גוף קיימים והוזנו, הטופס תקין
      return !!name && weight !== "" && !!bodyAreaId;
    } else {
      const exercise = getExerciseById(id);

      // אם התרגיל לא קיים (כנראה נמחק), הטופס אינו תקין
      if (!exercise) return false;

      // השוואת כל שדה ושדה האם השתנה
      const isNameChanged = name !== exercise.name;
      const isWeightChanged = weight !== exercise.weight;
      const isBodyAreaChanged = bodyAreaId !== exercise.bodyAreaId;
      const isNotesChanged = notes !== exercise.notes;
      const isImgsChanged = !utilService.isSameArray(imgs, exercise.imgs);

      // בדיקה אם בוצע שינוי לפחות בשדה אחד
      return (
        isNameChanged ||
        isWeightChanged ||
        isBodyAreaChanged ||
        isNotesChanged ||
        isImgsChanged
      );
    }
  };

  const onSave = () => {
    // המרת weight למספר רק בשלב שמירת המידע
    const exerciseData = {
      ...exerciseToSave,
      weight: exerciseToSave.weight ? +exerciseToSave.weight : 0,
    };

    if (id === "add") addExercise(exerciseData);
    else editExercise(id, exerciseData);
    navigate("/exercises");
  };

  const onRemove = () => {
    if (id !== "add") {
      removeExercise(id);
      navigate("/exercises");
    }
  };

  const onCancel = () => {
    setExerciseToSave({
      name: "",
      weight: "", // שינוי ל-""
      bodyArea: "",
      notes: "",
      imgs: [],
    });
    navigate("/exercises");
  };

  return (
    <section className="exercise-details">
      <h3>{id === "add" ? "הוספת תרגיל חדש" : "עריכת תרגיל"}</h3>
      <form>
        <FormInput
          label="שם תרגיל"
          type="text"
          name="name"
          value={exerciseToSave.name}
          onChange={handleChange}
        />
        <FormInput
          label="משקל"
          type="text"
          name="weight"
          value={exerciseToSave.weight}
          onChange={handleChange}
        />
        <FormSelect
          label="איזור בגוף"
          selected={exerciseToSave.bodyAreaId}
          onChange={handleSelectChange}
        />
        <FormTextArea
          label="הערות"
          notes={exerciseToSave.notes}
          onChange={handleChange}
        />
        <div className="imgs">
          {exerciseToSave.imgs.map((link, idx) => (
            <div className="img" key={link || idx}>
              {/* השתמש בקישור או באינדקס כ- key */}
              <FormInput
                label={`תמונה ${idx + 1}`}
                type="text"
                name={`imgs[${idx}]`}
                value={link || ""}
                onChange={handleChange}
              />
              <video playsInline autoPlay loop muted className="link">
                <source src={link} />
              </video>
            </div>
          ))}
          <button
            className="add-img"
            type="button"
            onClick={() =>
              setExerciseToSave((prev) => ({
                ...prev,
                imgs: [...prev.imgs, ""], // הוסף שדה ריק עבור תמונה חדשה
              }))
            }
          >
            הוסף תמונה
          </button>
        </div>

        <div className="btns-box">
          <button
            className="btn-save"
            type="button"
            onClick={onSave}
            disabled={!isFormValid()}
          >
            שמור
          </button>
          {id !== "add" && (
            <button className="btn-remove" onClick={onRemove}>
              מחק תרגיל
            </button>
          )}
          <button className="btn-cancel" type="button" onClick={onCancel}>
            חזרה
          </button>
        </div>
      </form>
    </section>
  );
};
