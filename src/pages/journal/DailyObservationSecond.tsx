import React from "react";
import SliderQuestion from "../../components/sliderQuestion/SliderQuestion";
import RadioButton from "../../components/radioButton/RadioButton";
import TextInput from "../../components/textInput/TextInput";
import left from "/icons/arrowLeft.svg";
import { useNavigate } from "react-router-dom";

const DailyObservationSecond = ({ questions, formData, onChange, onSubmit, onBack }: any) => {

    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col bg-[#0b1A97] text-white">
            {/* <header className="p-4 flex items-center space-x-4">
        <button onClick={onBack} className="text-white text-lg font-semibold">
          {"<"}
        </button>
        <h1 className="text-xl font-bold">Smart Journal</h1>
      </header> */}

            <div className="relative flex items-center py-7">
                <img
                    src={left}
                    width={33}
                    alt="Back"
                    style={{ cursor: "pointer" }}
                    className="absolute left-3"
                   onClick={onBack}
                />
                <h1 className="w-full text-2xl text-white  text-center">Smart Journal</h1>
            </div>

            <div className="flex-1 bg-white text-gray-900 rounded-t-3xl p-6 space-y-6">
                <h2 className="text-center text-xl font-semibold">Daily Observations</h2>
                <form className="space-y-6">
                    {questions.map((question: any) => {
                        switch (question.type) {
                            case "slider":
                                return (
                                    <div key={question.id} className="space-y-2">
                                        <SliderQuestion
                                            data={{ ques: question.question, options: question.options }}
                                            value={formData[question.id]}
                                            onChange={(value) => onChange(question.id, value)}
                                        />
                                    </div>
                                );
                            case "boolean":
                                return (
                                    <div key={question.id} className="space-y-2">
                                        <RadioButton
                                            data={{ ques: question.question, options: question.options }}
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
                                            onChange={(value: any) => onChange(question.id, value)}
                                        />
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                    <div className="flex justify-between items-center space-x-4">

                        <button
                            type="button"
                            className="flex-1 bg-[#0b1A97] text-white py-3 rounded-full text-lg font-medium"
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DailyObservationSecond;
