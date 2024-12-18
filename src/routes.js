import { Home } from "./pages/home";
import { PickTrain } from "./pages/pick-train";
import { Exercises } from "./pages/exercises";
import { ExerciseDetails } from "./pages/exercise-details";
import { CurrTrain } from "./pages/curr-train";
import { FinishTrain } from "./pages/finish-train";

export const routes = [
  {
    path: "/pickTrain",
    component: PickTrain,
  },
  {
    path: "/train",
    component: CurrTrain,
  },
  {
    path: "/exercises",
    component: Exercises,
  },
  {
    path: "/exercises/:id",
    component: ExerciseDetails,
  },
  {
    path: "/finish",
    component: FinishTrain,
  },
  {
    path: "/",
    component: Home,
  },
];
