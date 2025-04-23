import React from "react";
import { CheckboxField } from "./CheckboxField";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";

const COMPONENT_MAP = {
  select: SelectField,
  checkbox: CheckboxField,
  text: TextField,
  email: TextField,
  number: TextField,
};

 const FieldComponent = ({ field, value, onChange,error, classNames }) => {
  const Component = COMPONENT_MAP[field.type] || TextField;
  return (
    <div key={field.name} className={classNames.field}>
      {field.type !== "checkbox" && (
        <label className={classNames.label} htmlFor={field.name}>
          {field.label}
        </label>
      )}

      <Component
        field={field}
        value={value}
        onChange={onChange}
        classNames={classNames}
      />
      {error && <div className={classNames.error}>{error}</div>}
    </div>
  );
};

// React.memo will skip re-render if field/value/error/onChange/classNames are ===
export const Field = React.memo(FieldComponent)