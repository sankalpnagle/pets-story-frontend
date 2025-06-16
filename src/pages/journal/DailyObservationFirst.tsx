import React, { useState } from "react";
import SliderQuestion from "../../components/sliderQuestion/SliderQuestion";
import RadioButton from "../../components/radioButton/RadioButton";
import TextInput from "../../components/textInput/TextInput";
import left from "/icons/arrowLeft.svg";
import pen from "/icons/pen-01.svg";
import { useNavigate } from "react-router-dom";

const DailyObservationFirst = ({
  questions,
  formData,
  onChange,
  onSubmit,
  defaultValue,
  handleDefault,
  id,
}: any) => {
  const navigate = useNavigate();

  const isStoolRelated = (questionId: any) => {
    return questionId === "Q12" || questionId === "Q13" || questionId === "Q14";
  };
  return (
    <div className="h-screen min-w-[280px] overflow-x-hidden  bg-white">
      <div className=" bg-[#0B1A97] flex flex-col h-full overflow-y-auto ">
        <div className="flex justify-between mx-7 items-center py-7">
          <button onClick={() => navigate("/AddSmartJournal")}>
            <img
              src={left}
              width={33}
              alt="Back"
              style={{ cursor: "pointer" }}
              className=""
            />
          </button>
          <h1 className="w-full text-2xl text-white  text-center">
            Smart Journal
          </h1>
          <button onClick={() => handleDefault()}>
            <img
              src={pen}
              width={33}
              alt="Back"
              style={{ cursor: "pointer" }}
              className="bg-white rounded-full p-1"
            />
          </button>
        </div>
        <nav className="flex-1 w-full min-w-[280px] overflow-x-hidden pb-[2.3rem] bg-white rounded-t-3xl px-4  overflow-y-auto">
          <div className="flex-1 bg-white text-gray-900 rounded-t-3xl px-6 pt-6 space-y-6">
            <h2 className="text-center text-xl font-semibold">
              Daily Observations
            </h2>
            <form className="space-y-6 pb-11">
              {/* {questions?.map((question: any) => {
                switch (question.type) {
                  case "slider":
                    return (
                      <div key={question.id} className="space-y-2">
                        <SliderQuestion
                          data={{
                            ques: question.question,
                            options: question.options,
                          }}
                          value={formData[question.id]}
                          onChange={(value) => onChange(question.id, value)}
                        />
                      </div>
                    );
                  case "boolean":
                    return (
                      <div key={question.id} className="space-y-2">
                        <RadioButton
                          data={{
                            ques: question.question,
                            options: question.options,
                          }}
                          value={formData[question.id]}
                          onChange={(value) => onChange(question.id, value)}
                        />
                      </div>
                    );
                  case "text":
                    return (
                      <div key={question.id} className="space-y-2">
                        <TextInput
                          data={{ ques: question.question }}
                          value={formData[question.id]}
                          onChange={(value: any) =>
                            onChange(question.id, value)
                          }
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })} */}

              {questions?.map((question: any) => {
                if (isStoolRelated(question.id)) {
                  if (question.id === "Q12") {
                    return (
                      <div key="stool-section" className="space-y-2">
                        <h3 className="text-lg font-semibold text-[#0B1A97]">
                          Consistency, color, and any abnormalities in stool
                        </h3>
                        <div
                          className={
                            isStoolRelated(question.id) ? "text-black" : ""
                          }
                        >
                          <SliderQuestion
                            data={{
                              ques: question.question,
                              options: question.options,
                            }}
                            value={formData[question.id]}
                            onChange={(value) => onChange(question.id, value)}
                          />
                        </div>
                      </div>
                    );
                  }
                }
                switch (question.type) {
                  case "slider":
                    return (
                      <div key={question.id} className="space-y-2">
                        <SliderQuestion
                          data={{
                            ques: question.question,
                            options: question.options,
                          }}
                          value={formData[question.id]}
                          onChange={(value) => onChange(question.id, value)}
                        />
                      </div>
                    );
                  case "boolean":
                    return (
                      <div key={question.id} className="space-y-2">
                        <RadioButton
                          data={{
                            ques: question.question,
                            options: question.options,
                          }}
                          value={formData[question.id]}
                          onChange={(value) => onChange(question.id, value)}
                        />
                      </div>
                    );
                  case "text":
                    return (
                      <div key={question.id} className="space-y-2">
                        <TextInput
                          data={{ ques: question.question }}
                          value={formData[question.id]}
                          onChange={(value: any) =>
                            onChange(question.id, value)
                          }
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })}

              <div className="bg-white fixed sm:relative bottom-0  px-3 pt-1 pb-4 -ml-9 w-[100vw] sm:w-3/5 mx-auto ">
                <div className="sm:w-2/3 w-full flex justify-between items-center space-x-4">
                  <button
                    type="button"
                    className="flex-1 bg-[#0b1A97] text-white py-3 rounded-full text-lg font-medium"
                    onClick={onSubmit}
                  >
                    {defaultValue===true ? " Set Default Values" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DailyObservationFirst;
