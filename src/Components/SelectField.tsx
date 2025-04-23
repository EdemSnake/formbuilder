export function SelectField({ field, value, onChange, classNames }) {
    return (
      <select
        id={field.name}
        name={field.name}
        value={value}
        onChange={onChange}
        required={field.required}
        className={classNames.inputSelect}
      >
        {field.options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    );
  }