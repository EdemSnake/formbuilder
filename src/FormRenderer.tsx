import { useCallback, useEffect, useMemo, useState } from "react";
import { Field } from "./Components/Field";
import { validateField, formatValue } from "./utils/formUtils";

const defaultClasses = {
  form: "form",
  field: "field",
  label: "label",
  inputText: "input-text",
  inputSelect: "input-select",
  inputCheckbox: "input-checkbox",
  checkboxLabel: "label",
  btnSubmit: "btn-submit",
};

const useFieldMap = (fields) =>
  useMemo(() => {
    const map = {};
    for (const field of fields) {
      map[field.name] = field;
    }
    return map;
  }, [fields]);

export const FormRenderer = ({
  definition,
  onSubmit,
  classNames = defaultClasses,
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const initialState = definition.fields.reduce((acc, el) => {
    if (el.type === "checkbox") {
      acc[el.name] = false;
    } else {
      acc[el.name] = "";
    }
    return acc;
  }, {});

  useEffect(() => {
    setValues(initialState);
  }, []);

  const fieldMap = useFieldMap(definition.fields);

  const handleChange = useCallback(
    (e) => {
      const { name, type, value: rawValue, checked } = e.target;
      const field = fieldMap[name];

      const newValue = type === "checkbox" ? checked : rawValue;
      const formatted = formatValue(field, newValue);

      setValues((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : formatted,
      }));

      setErrors((prev) => ({ ...prev, [name]: validateField(field, formatted) }));
    },
    [fieldMap]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  return (
    <form
      id={definition.id}
      onSubmit={handleSubmit}
      className={classNames.form}
    >
      {definition.fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          onChange={handleChange}
          classNames={classNames}
        />
      ))}
      <button className={classNames.btnSubmit} type="submit">
        {definition.submitText}
      </button>
    </form>
  );
};
