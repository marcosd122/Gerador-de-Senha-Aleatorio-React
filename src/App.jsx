import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaClipboard } from "react-icons/fa";
import { useForm } from "./useForm";
import { getRandomChar, getSpecialChar } from "./utils"


function App() {

  const [values, setValues] = useForm({
    length: 6,
    capital:true,
    small: true,
    number: false,
    symbol: false,
  })

  const [result, setResult] = useState("");

  /*Indicação da tabela https://www.ascii-code.com/ */

  const fieldsArray = [
    {
      field: values.capital,
      getChar: () => getRandomChar(65, 90),
    },
    {
      field: values.small,
      getChar: () => getRandomChar(97, 122),
    },
    {
      field: values.number,
      getChar: () => getRandomChar(48, 57),
    },
    {
      field: values.symbol,
      getChar: () => getSpecialChar(),
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = "";
    const checkedFields = fieldsArray.filter(({field}) => field);

    for(let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      
      const letter = checkedFields[index]?.getChar();

      if(letter) {
        generatedPassword += letter;
      }

      if(generatedPassword) {
        setResult(generatedPassword);
      } else {
        toast.error("Selecione pelo menos uma opção");
      }

    }
  };

  const handleClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success("copiado para a área de transferência");
    } else {
      toast.error("Nenhuma senha copiada");
    }
    }
  
  return (
    <section>
      <div className="container">
        <form id="pg-form" onSubmit={handleOnSubmit}>
          <div className="result">
            <input type="text" id="result" placeholder="Mínimo de 6 dígitos" readOnly value={result}/>
            <div className="clipboard" onClick={handleClipboard}>
                <FaClipboard></FaClipboard>
            </div>
          </div>
          <div>
            <div className="field">
                <label htmlFor="length">Dígitos</label>
                <input type="number" id="length" min={6} max={10} name="length" value={values.length} onChange={setValues} />
            </div>
            <div className="field">
              <label htmlFor="capital">Maiúsculo</label>
              <input type="checkbox" id="capital" name="capital" checked={values.capital} onChange={setValues}/>
            </div>
            <div className="field">
              <label htmlFor="small">Minúscula</label>
              <input type="checkbox" id="small" name="small" checked={values.small} onChange={setValues}/>
            </div>
            <div className="field">
              <label htmlFor="number">Números</label>
              <input type="checkbox" id="number" name="number" checked={values.number} onChange={setValues}/>
            </div>
            <div className="field">
              <label htmlFor="symbol">Símbolos</label>
              <input type="checkbox" id="symbol"  name="symbol" checked={values.symbol} onChange={setValues}/>
            </div>
          </div>
          <button type="submit">Gerar senha</button>
        </form>
      </div>
    </section>
  );
}

export default App;
