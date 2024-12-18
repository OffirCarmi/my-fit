import { useTimerStore } from "../stores/timer-store";
import { utilService } from "../services/util.service";

export const Timer = () => {
  const { elapsedTime } = useTimerStore();
  const { convertTimeToTimer } = utilService;

  return (
    <div className="timer">
      <span className="timer">{convertTimeToTimer(elapsedTime)}</span>
    </div>
  );
};
