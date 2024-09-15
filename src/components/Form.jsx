import React from "react";

const Form = ({ forms }) => {
  return (
    <div>
      {forms.map((form) => (
        <div key={form.fid}>
          <h3>{form.title}</h3>
          {form.questions.map((question) => (
            <div key={question.qid}>
              <label>{question.label}</label>
              {question.type === "CHECK" &&
                question.options.map((option) => (
                  <div key={option.oid}>
                    <input type="checkbox" /> {option.label}
                  </div>
                ))}
              {question.type === "TEXT" && (
                <input
                  type="text"
                  minLength={question.options[0].input.min}
                  maxLength={question.options[0].input.max}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Form;
