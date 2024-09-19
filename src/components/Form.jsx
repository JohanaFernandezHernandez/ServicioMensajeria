import React, { useState } from "react";
import { useThreadData } from "../hooks/useThreadData";
import { useStore } from "../Stores/store";
import "../styles/form.scss";

const Form = ({ forms, button }) => {
  const threadData = useStore((state) => state.threadData);
  const { acceptHilo } = useThreadData();
  
  // Estado local de checkboxes
  const [localThreadData, setLocalThreadData] = useState(threadData || { agreement: { forms: [] } });

  // Obtener el estado checkboxes
  const getSelectedOptions = (fid, qid, oid) => {
    const form = localThreadData.agreement?.forms?.find((f) => f.fid === fid);
    const question = form?.questions?.find((q) => q.qid === qid);
    const option = question?.options?.find((o) => o.oid === oid);
    return option?.selected || false;
  };

  // Obtener el valor de los inputs 
  const getTextInputValue = (fid, qid) => {
    const form = localThreadData.agreement?.forms?.find((f) => f.fid === fid);
    const question = form?.questions?.find((q) => q.qid === qid);
    return question?.response || "";
  };

  // Eventos para los checkboxes
  const handleCheckboxChange = (fid, qid, oid) => (event) => {
    const { checked } = event.target;

    setLocalThreadData((prevData) => {
      const updatedData = { ...prevData };
      const form = updatedData.agreement.forms.find((f) => f.fid === fid);
      if (form) {
        const question = form.questions.find((q) => q.qid === qid);
        if (question) {
          const option = question.options.find((o) => o.oid === oid);
          if (option) {
            option.selected = checked;
          }
        }
      }
      return updatedData;
    });
  };

  // Eventos para los inputs de texto
  const handleTextInputChange = (fid, qid) => (event) => {
    const { value } = event.target;

    setLocalThreadData((prevData) => {
      const updatedData = { ...prevData };
      const form = updatedData.agreement?.forms?.find((f) => f.fid === fid);
      if (form) {
        const question = form.questions.find((q) => q.qid === qid);
        if (question) {
          question.response = value;
        }
      }
      return updatedData;
    });
  };

  // Enviar el hilo aceptado
  const handleAcceptHilo = async () => {
    try {
      await acceptHilo(localThreadData);
    } catch (error) {
      console.error("Error al aceptar el hilo:", error);
    }
  };

  return (
    <div className={`form ${threadData.closed ? "form--disabled" : ""}`}>
      {forms?.map((form) => (
        <div key={form.fid} className="form__item">
          <h3 className="form__title">{form.title}</h3>
          {form.questions.map((question) => (
            <div key={question.qid} className="form__question">
              <label className="form__question-label">{question.label}</label>

              {/* Renderiza los checkboxes */}
              {question.type === "CHECK" &&
                question.options.map((option) => {
                  const isSelected = getSelectedOptions(
                    form.fid,
                    question.qid,
                    option.oid
                  );

                  return (
                    <div key={option.oid} className="form__checkbox-container">
                      <input
                        type="checkbox"
                        className={`form__checkbox ${isSelected ? "checked" : ""}`}
                        checked={isSelected}
                        onChange={handleCheckboxChange(form.fid, question.qid, option.oid)} 
                        disabled={threadData.closed}
                      />
                      <span className="form__checkbox-label">{option.label}</span>
                    </div>
                  );
                })}

              {/* Renderizar los inputs de texto */}
              {question.type === "TEXT" && (
                <input
                  type="text"
                  className="form__text-input"
                  value={getTextInputValue(form.fid, question.qid)}
                  onChange={handleTextInputChange(form.fid, question.qid)} 
                  disabled={threadData.closed}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      {threadData.closed ? (
        <p className="form__status">Hilo Aceptado - Formulario Inhabilitado</p>
      ) : (
        <button className="form__button" onClick={handleAcceptHilo}>
          {button?.accept_button_text}
        </button>
      )}
    </div>
  );
};

export default Form;
