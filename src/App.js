import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";

import { useEffect } from "react";
import { useExercisesStore } from "./stores/exercises-store";

export const App = () => {
  const initializeExercises = useExercisesStore((state) => state.initializeExercises);

  useEffect(() => {
    initializeExercises(); // בדיקה ואתחול נתונים בטעינה ראשונית
  }, [initializeExercises]);

  return (
    <>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} element={<Component />} path={path} />
        ))}
      </Routes>
    </>
  );
};
