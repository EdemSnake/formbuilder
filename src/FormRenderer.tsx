import { useEffect, useState } from "react";
import { Field } from "./Components/Field";

const defaultClasses = {
    form: 'form',
    field: 'field',
    label: 'label',
    inputText: 'input-text',
    inputSelect: 'input-select',
    inputCheckbox: 'input-checkbox',
    checkboxLabel: 'label',
    btnSubmit: 'btn-submit'
  };


export const FormRenderer = ({ definition, onSubmit, classNames = defaultClasses }) => {
  const [values, setValues] = useState({});

  const initialState = definition.fields.reduce((acc, el) => {
    if (el.type === "checkbox") {
      acc[el.name] = false;
    } else {
      acc[el.name] = "";
    }
    return acc;
  }, {});

 useEffect(()=>{
    setValues(initialState)
 },[])

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  return (
    <form id={definition.id} onSubmit={handleSubmit} className={classNames.form}>
      {definition.fields.map((field) => (
        <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleChange}
            classNames={classNames}
        />
      ))}
      <button className={classNames.btnSubmit} type="submit">{definition.submitText}</button>
    </form>
  );
};
