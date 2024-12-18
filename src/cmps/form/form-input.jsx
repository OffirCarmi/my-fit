export const FormInput = ({ label, type, name, value, onChange }) => {

  return (
    <label className={type}>
      {label}
      {!!label && ":"}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={name === "weight" ? "number" : type}
      />
      {type === "number" && <span className="unit">ק"ג</span>}
    </label>
  );
};
