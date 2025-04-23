export function CheckboxField({ field, value, onChange, classNames }) {
  return (
    <label className={classNames.checkboxLabel}>
      <input
        id={field.name}
        name={field.name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        required={field.required}
        className={classNames.inputCheckbox}
      />
      {field.label}
    </label>
  );
}
