import { utilService } from "./util.service";

const makeNewTrain = (initialTrain, history) => {
  const { name, initialData } = initialTrain;

  const recentlyUsedExercises = _getRecentlyUsedExercises(history);

  const selectedExercises = [];

  initialData.forEach((bodyArea) => {
    const { exercises, exsPerTrain } = bodyArea;

    // Filter exercises that have not been recently used
    const unusedExercises = exercises.filter((exercise) => !recentlyUsedExercises.has(exercise.id));

    // Sort unused exercises by lastTimeUsed (ascending) and shuffle for randomness
    _shuffleArray(unusedExercises);
    unusedExercises.sort((a, b) => a.lastTimeUsed - b.lastTimeUsed);

    // Select the required number of exercises from unused exercises
    let selected = unusedExercises.slice(0, exsPerTrain);

    // If not enough exercises, fill from recently used
    if (selected.length < exsPerTrain) {
      const remainingSlots = exsPerTrain - selected.length;
      const usedExercises = exercises.filter((exercise) => recentlyUsedExercises.has(exercise.id));

      // Shuffle and sort recently used exercises
      _shuffleArray(usedExercises);
      usedExercises.sort((a, b) => a.lastTimeUsed - b.lastTimeUsed);

      selected = selected.concat(usedExercises.slice(0, remainingSlots));
    }

    selectedExercises.push(...selected);
  });

  return {
    id: utilService.makeId(),
    dateCreated: Date.now(),
    isDone: false,
    name,
    exercises: selectedExercises,
    currEx: 0
  };
}

const _getRecentlyUsedExercises = (history) => {
  const recentlyUsed = new Set();
  history.forEach((session) => {
    session.exercises.forEach((exerciseId) => recentlyUsed.add(exerciseId));
  });
  return recentlyUsed;
}

const _shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const trainService = {
  makeNewTrain,
}


// gpt's offer for seleceting all chest poly together - doesn't work right
// const makeNewTrain = (initialTrain, history) => {
//   const { name, initialData } = initialTrain;

//   // איסוף רשימת תרגילים שנבחרו לאחרונה מתוך ההיסטוריה
//   const recentlyUsedExercises = _getRecentlyUsedExercises(history);

//   const selectedExercises = [];

//   initialData.forEach((bodyArea) => {
//     const { id, exercises, exercisesPerTrain } = bodyArea; // נתוני האזור הנוכחי

//     // אם מדובר באזור גוף 103 (חזה), יש להפעיל לוגיקה מיוחדת
//     if (id === 103) {
//       const specialGroup = ["tqXNPBq", "kTAJN98", "D5YeVPJ"]; // מזהים של קבוצת התרגילים המיוחדת
//       const specialExercises = specialGroup
//         .map((id) => exercises.find((ex) => ex.id === id)) // חיפוש תרגילים לפי מזהים
//         .filter(Boolean); // סינון תרגילים שלא נמצאו

//       // בדיקה אם לפחות תרגיל אחד מתוך הקבוצה המיוחדת נבחר
//       const selectedSpecialExercises = specialExercises.filter(
//         (exercise) => !recentlyUsedExercises.has(exercise.id)
//       );

//       let selected = [];
//       if (selectedSpecialExercises.length > 0) {
//         // אם אחד נבחר, יש להוסיף את כל התרגילים המיוחדים
//         selected.push(...specialExercises);

//         // חישוב כמה תרגילים נוספים צריך להוסיף כדי להשלים ל-exercisesPerTrain
//         const remainingSlots = Math.max(0, exercisesPerTrain - specialExercises.length);

//         // סינון תרגילים שאינם בשימוש לאחרונה ושאינם שייכים לקבוצה המיוחדת
//         const unusedExercises = exercises.filter(
//           (exercise) =>
//             !recentlyUsedExercises.has(exercise.id) &&
//             !specialGroup.includes(exercise.id)
//         );

//         _shuffleArray(unusedExercises); // ערבוב התרגילים לשם גיוון
//         unusedExercises.sort((a, b) => a.lastTimeUsed - b.lastTimeUsed); // מיון לפי מועד השימוש האחרון

//         // הוספת תרגילים רגילים עד להשלמת המספר הנדרש
//         selected.push(...unusedExercises.slice(0, remainingSlots));
//       } else {
//         // אם אף אחד מהמיוחדים לא נבחר, בחירה רגילה
//         const unusedExercises = exercises.filter(
//           (exercise) => !recentlyUsedExercises.has(exercise.id)
//         );

//         _shuffleArray(unusedExercises); // ערבוב התרגילים
//         unusedExercises.sort((a, b) => a.lastTimeUsed - b.lastTimeUsed); // מיון לפי מועד שימוש

//         // בחירת תרגילים רגילים
//         selected = unusedExercises.slice(0, exercisesPerTrain);
//       }

//       selectedExercises.push(...selected); // הוספת התרגילים שנבחרו לאימון
//       return; // מעבר לאזור הגוף הבא
//     }

//     // לוגיקה רגילה לשאר אזורי הגוף
//     const unusedExercises = exercises.filter((exercise) => !recentlyUsedExercises.has(exercise.id));

//     _shuffleArray(unusedExercises); // ערבוב
//     unusedExercises.sort((a, b) => a.lastTimeUsed - b.lastTimeUsed); // מיון

//     let selected = unusedExercises.slice(0, exercisesPerTrain);

//     // אם אין מספיק תרגילים לא משומשים, הוספת תרגילים משומשים
//     if (selected.length < exercisesPerTrain) {
//       const remainingSlots = exercisesPerTrain - selected.length;
//       const usedExercises = exercises.filter((exercise) => recentlyUsedExercises.has(exercise.id));

//       _shuffleArray(usedExercises); // ערבוב
//       usedExercises.sort((a, b) => a.lastTimeUsed - b.lastTimeUsed); // מיון

//       selected = selected.concat(usedExercises.slice(0, remainingSlots));
//     }

//     selectedExercises.push(...selected); // הוספת התרגילים שנבחרו לאימון
//   });

//   // החזרת אובייקט האימון החדש
//   return {
//     id: utilService.makeId(), // יצירת מזהה ייחודי
//     dateCreated: Date.now(), // תאריך יצירה
//     isDone: false, // מצב האימון (לא הושלם)
//     name, // שם האימון
//     exercises: selectedExercises, // רשימת התרגילים שנבחרו
//     currEx: 0, // האינדקס של התרגיל הנוכחי
//   };
// };

// // פונקציה שמחזירה קבוצה של מזהי תרגילים שהשתמשו בהם לאחרונה
// const _getRecentlyUsedExercises = (history) => {
//   const recentlyUsed = new Set();
//   history.forEach((session) => {
//     session.exercises.forEach((exerciseId) => recentlyUsed.add(exerciseId));
//   });
//   return recentlyUsed;
// };

// // פונקציה לערבוב מערך (Fisher-Yates Shuffle)
// const _shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// export const trainService = {
//   makeNewTrain,
// };