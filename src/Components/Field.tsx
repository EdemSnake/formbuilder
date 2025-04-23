import { CheckboxField } from "./CheckboxField";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";

export const Field = ({ field, value, onChange, classNames }) => {

  return (
    <div key={field.name}>
      <label className={classNames.label} htmlFor={field.name}>{field.label}</label>
      {field.type === 'select' && (
        <SelectField classNames={classNames} field={field} value={value} onChange={onChange} />
      )}
      {field.type === 'checkbox' && (
        <CheckboxField  classNames={classNames}  field={field} value={value} onChange={onChange} />
      )}
      {field.type !== 'select' && field.type !== 'checkbox' && (
        <TextField  classNames={classNames}  field={field} value={value} onChange={onChange} />
      )}
    </div>
  );
};
