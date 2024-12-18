export const FormTextArea = ({ label, value, onChange }) => {
  return (
    <label className="textarea">
      {label} {!!label && ":"}
      <textarea
        name="notes"
        value={value}
        onChange={onChange}
        rows={4}
        placeholder="הכנס הערות כאן" // טקסט ברירת מחדל אם השדה ריק
      ></textarea>
    </label>
  );
};
