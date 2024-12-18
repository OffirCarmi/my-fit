import { useBodyAreasStore } from "../../stores/body-areas-store";

export const FormSelect = ({ label, selected, onChange }) => {
  const { bodyAreas } = useBodyAreasStore();

  return (
    <label>
      {label}:
      <select
        name="bodyArea"
        id="bodyArea"
        value={selected || ""} // אם selected לא מוגדר, יוגדר כערך ריק
        onChange={onChange}
      >
        <option value="" disabled>
          בחר איזור
        </option>
        {bodyAreas.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </label>
  );
};
