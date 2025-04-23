export function CheckboxField({ field, value, onChange, classNames }) {
    return (
      <input
        id={field.name}
        name={field.name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        required={field.required}
        className={classNames.inputCheckbox}
      />
    );
  }