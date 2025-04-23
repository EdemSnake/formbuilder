export function TextField({ field, value, onChange, classNames }) {
    return (
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        value={value}
        onChange={onChange}
        required={field.required}
        className={classNames.inputText}
      />
    );
  }