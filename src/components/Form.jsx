import React, { useState } from "react";
import { useThreadData } from "../hooks/useThreadData";
import { useStore } from "../Stores/store";
import "../styles/main.scss";

const Form = ({ forms, button }) => {
  const threadData = useStore((state) => state.threadData);
  const { acceptHilo } = useThreadData();

  // Estado para manejar las respuestas del usuario
  const [formResponses, setFormResponses] = useState({});

  // Manejar los cambios en los inputs CHECK
  const handleCheckboxChange = (fid, qid, oid) => {
    setFormResponses((prevResponses) => {
      const currentQuestionResponses = prevResponses[qid] || [];
      const updatedResponses = currentQuestionResponses.includes(oid)
        ? currentQuestionResponses.filter((responseOid) => responseOid !== oid)
        : [...currentQuestionResponses, oid];

      // Actualizar el estado de las opciones seleccionadas en threadData
      const updatedForms = threadData.agreement.forms.map((form) => {
        if (form.fid === fid) {
          return {
            ...form,
            questions: form.questions.map((question) => {
              if (question.qid === qid) {
                return {
                  ...question,
                  options: question.options.map((option) => {
                    if (option.oid === oid) {
                      return {
                        ...option,
                        selected: !option.selected, // Cambia el valor de selected
                      };
                    }
                    return option;
                  }),
                };
              }
              return question;
            }),
          };
        }
        return form;
      });

      // Actualizar el store con los forms modificados
      useStore.setState({
        threadData: {
          ...threadData,
          agreement: {
            ...threadData.agreement,
            forms: updatedForms,
          },
        },
      });

      return { ...prevResponses, [qid]: updatedResponses };
    });
  };

  // Manejar los cambios en los inputs TEXT
  const handleTextChange = (qid, value) => {
    setFormResponses((prevResponses) => ({
      ...prevResponses,
      [qid]: value,
    }));
  };

  // Enviar el hilo aceptado con las respuestas del formulario
  const handleAcceptHilo = async () => {
    const updatedThreadData = {
      ...threadData,
      closed: true,
      agreement: {
        ...threadData.agreement,
        forms: threadData.agreement.forms.map((form) => ({
          ...form,
          questions: form.questions.map((question) => {
            if (formResponses[question.qid]) {
              return {
                ...question,
                answered: true, // Indica que la pregunta fue respondida
                response: formResponses[question.qid], // Respuestas del usuario
              };
            }
            return question;
          }),
        })),
      },
    };

    try {
      // Realiza la solicitud de aceptación con los datos actualizados
      await acceptHilo(updatedThreadData);
      console.log("Hilo aceptado con éxito.");
    } catch (error) {
      console.error("Error al aceptar el hilo:", error);
    }
  };

  return (
    <div className="form">
      {forms?.map((form) => (
        <div key={form.fid}>
          <h3>{form.title}</h3>
          {form.questions.map((question) => (
            <div key={question.qid}>
              <label>{question.label}</label>

              {/* Renderizar los checkboxes */}
              {question.type === "CHECK" &&
                question.options.map((option) => (
                  <div key={option.oid}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(form.fid, question.qid, option.oid)
                      }
                      checked={
                        threadData.agreement.forms
                          .find((f) => f.fid === form.fid)
                          ?.questions.find((q) => q.qid === question.qid)
                          ?.options.find((o) => o.oid === option.oid)
                          ?.selected || false
                      }
                    />{" "}
                    {option.label}
                  </div>
                ))}

              {/* Renderizar los inputs de texto */}
              {question.type === "TEXT" && (
                <input
                  type="text"
                  value={formResponses[question.qid] || ""}
                  onChange={(e) =>
                    handleTextChange(question.qid, e.target.value)
                  }
                  minLength={question.options[0]?.input?.min || 0}
                  maxLength={question.options[0]?.input?.max || 100}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      {threadData.closed ? (
        <>
          <p className="">Hilo aceptado</p>
        </>
      ) : (
        <button onClick={handleAcceptHilo}>{button?.accept_button_text}</button>
      )}
    </div>
  );
};

export default Form;
