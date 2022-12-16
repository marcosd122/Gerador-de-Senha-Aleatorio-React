import { useState } from "react";

export function useForm(initialvalues) {
  const [values, setValues] = useState(initialvalues);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    },
  ];
}
