import { useState } from "react";
import "./App.css";
import { FormRenderer } from "./FormRenderer";
const formDefinition = {
  id: "userForm",
  fields: [
    {
      name: "username",
      label: "Имя пользователя",
      type: "text",
      placeholder: "Введите имя",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@domain.com",
      required: true,
    },
    {
      name: "age",
      label: "Возраст",
      type: "number",
      placeholder: "Выберите возраст",
      required: false,
      min: 0,
      max: 120,
    },
    {
      name: "gender",
      label: "Пол",
      type: "select",
      options: [
        { value: "", text: "-- выберите --" },
        { value: "male", text: "Мужской" },
        { value: "female", text: "Женский" },
      ],
      required: true,
    },
    {
      name: "agree",
      label: "Согласен с условиями",
      type: "checkbox",
      required: true,
    },
  ],
  submitText: "Отправить",
};

function App() {
  const [result, setResult] = useState(null);

  const handleFormSubmit = data => {
    setResult(data);
  };

  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <h1>Динамическая форма из JSON</h1>
      <FormRenderer definition={formDefinition} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
