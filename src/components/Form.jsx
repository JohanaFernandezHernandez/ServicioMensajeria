import React, { useState, useEffect } from "react";
import { useThreadData } from "../hooks/useThreadData";
import "../styles/form.scss";

const Form = ({ threadData, button }) => {
  const { acceptHilo } = useThreadData();

  // Estado local para manejar el estado visual de los checkboxes
  const [localCheckboxState, setLocalCheckboxState] = useState(() => {
    const initialState = {};
    threadData?.agreement?.forms.forEach((form) => {
      form.questions.forEach((question) => {
        if (question.type === "CHECK") {
          question.options.forEach((option) => {
            initialState[`${form.fid}-${question.qid}-${option.oid}`] = option.selected || false;
          });
        }
      });
    });
    return initialState;
  });

  // Estado local para manejar los valores de los inputs de texto
  const [textInputValues, setTextInputValues] = useState(() => {
    const initialValues = {};
    threadData?.agreement?.forms.forEach((form) => {
      form.questions.forEach((question) => {
        if (question.type === "TEXT") {
          initialValues[`${form.fid}-${question.qid}`] = question.response || "";
        }
      });
    });
    return initialValues;
  });

  // Obtener el estado visual de un checkbox
  const getCheckboxState = (fid, qid, oid) => {
    return localCheckboxState[`${fid}-${qid}-${oid}`] || false;
  };

  // Obtener el valor de los inputs de texto desde el estado local
  const getTextInputValue = (fid, qid) => {
    return textInputValues[`${fid}-${qid}`] || "";
  };

  // Manejador de eventos para los checkboxes
  const handleCheckboxChange = (fid, qid, oid) => (event) => {
    const { checked } = event.target;
    setLocalCheckboxState((prevState) => ({
      ...prevState,
      [`${fid}-${qid}-${oid}`]: checked,
    }));
  };

  // Manejador de eventos para los inputs de texto
  const handleTextInputChange = (fid, qid) => (event) => {
    const { value } = event.target;
    setTextInputValues((prevValues) => ({
      ...prevValues,
      [`${fid}-${qid}`]: value,
    }));
  };

  // Enviar el hilo aceptado
  const handleAcceptHilo = async () => {
    try {
      await acceptHilo(threadData);
      console.log("Hilo aceptado con éxito.");
    } catch (error) {
      console.error("Error al aceptar el hilo:", error);
    }
  };

  return (
    <div className={`form ${threadData?.closed ? "form--disabled" : ""}`}>
      {threadData?.agreement?.forms.map((form) => (
        <div key={form.fid} className="form__item">
          <h3 className="form__title">{form.title}</h3>
          {form.questions.map((question) => (
            <div key={question.qid} className="form__question">
              <label className="form__question-label">{question.label}</label>

              {/* Renderizar los checkboxes */}
              {question.type === "CHECK" &&
                question.options.map((option) => {
                  const isSelected = getCheckboxState(form.fid, question.qid, option.oid);

                  return (
                    <div key={option.oid} className="form__checkbox-container">
                      <input
                        type="checkbox"
                        className={`form__checkbox ${isSelected ? "checked" : ""}`}
                        checked={isSelected}
                        onChange={handleCheckboxChange(form.fid, question.qid, option.oid)}
                        disabled={threadData?.closed}
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
                  disabled={threadData?.closed}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      {threadData?.closed ? (
        <p className="form__status">Hilo aceptado - Formulario inhabilitado</p>
      ) : (
        <button className="form__button" onClick={handleAcceptHilo}>
          {button?.accept_button_text}
        </button>
      )}
    </div>
  );
};

export default Form;
