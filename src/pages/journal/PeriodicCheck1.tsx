import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import left from "/icons/arrowLeft.svg";
import plusSign from "/icons/plus-sign.svg";
import HorizontalSidebar from "../../components/sidebar/HorizontalSidebar";
import SliderQuestion from "../../components/sliderQuestion/SliderQuestion";
import RadioButton from "../../components/radioButton/RadioButton";
import SliderGroupQuestion from "../../components/sliderQuestion/SliderGroupQuestion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PeriodicCheck1 = () => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

    const navigate = useNavigate();
    const user = useSelector((state: any) => state.auth.user);
    const id = user?.id;

    const [loading, setLoading] = useState(false);

    // Form state to manage slider and radio button answers
    const [formData, setFormData] = useState({
        size: 0,
        amount: 0,
        lethargy: "",
        meals: "",
        eatingSpeed: "",
        additionalNotes: "",
        otherConcerns: "",
        drink: "",
        difficulty: "",
        remarks: "",
        breath: "",
        odor: "",
        dental: "",
        drool: "",
        limb: "",
        difficult: "",
        jump: "",
        gums: "",
        scratch: "",
        changes: "",
        frequency: "",
        signs: "",
        eye: "",
        any: "",
        earColor: ""
    });
    const [sliderValues, setSliderValues] = useState([10, 50, 90]); // Default values for sliders

    const handleSliderChange = (value: number) => {
        setFormData((prevState) => ({ ...prevState, size: value }));
    };

    const handleEstimatedSlider = (value: number) => {
        setFormData((prevState) => ({ ...prevState, size: value }));
    };

    const handleGroupSliderChange = (index: number, value: number) => {
        const updatedValues = [...sliderValues];
        updatedValues[index] = value;
        setSliderValues(updatedValues);
    };

    const handleRadioChange = (field: string, value: string) => {
        setFormData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleTextChange = (field: string, value: string) => {
        setFormData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const sizeLabel =
            formData.size === 0 ? "Small" : formData.size === 50 ? "Medium" : "Large";

        console.log("Form Data:", {
            size: sizeLabel,
            lethargy: formData.lethargy,
            meals: formData.meals,
            eatingSpeed: formData.eatingSpeed,
            additionalNotes: formData.additionalNotes,
            otherConcerns: formData.otherConcerns,
            groupSliderValues: sliderValues,
        });

        // Add backend submission logic here
    };

    return (
        <div className="h-screen bg-white">
            <div>
                <div
                    className={`${isTablet ? "bg-[#0B1A97]" : "bg-white"
                        } flex flex-col h-full overflow-y-auto`}
                >
                    {/* Header */}
                    <div className="flex justify-between mx-3 items-center py-7">
                        <img
                            src={left}
                            width={33}
                            alt="Back"
                            onClick={() => navigate(-1)}
                            style={{ cursor: "pointer" }}
                        />
                        <h1 className="text-2xl text-white md:text-black">Smart Journal</h1>
                        <button onClick={() => navigate("/Profile-edit")}>
                            <img src={plusSign} width={33} alt="Add" />
                        </button>
                    </div>

                    {/* Content */}
                    <nav className="flex-1 w-full mx-auto bg-white rounded-t-3xl px-4 py-6 overflow-y-auto">
                        {loading ? (
                            <div className="flex justify-center items-center h-96">
                                <CircularProgress size={50} />
                            </div>
                        ) : (
                            <div className="w-fit mx-3">
                                {/* <h1 className="font-bold text-2xl my-7 mx-auto w-fit">
                                    Periodic <br />
                                    Comprehensive Check
                                </h1> */}

                                <h1 className="font-bold text-2xl my-7 mx-auto w-fit text-center">
                                    <span className="block">Periodic</span>
                                    <span className="block">Comprehensive Check</span>
                                </h1>
                                <h1 className="font-bold text-xl my-7  w-fit">
                                    Behaviorial Observations
                                </h1>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5 mx-auto w-fit mb-16"
                                >
                                    <SliderQuestion
                                        data={{
                                            ques: "Your pet overall mood",
                                            options: [""],
                                        }}
                                        value={formData.size}
                                        onChange={handleSliderChange}
                                    />

                                    <SliderQuestion
                                        data={{
                                            ques: "Interaction level with family",
                                            options: [""],
                                        }}
                                        value={formData.changes}
                                        onChange={handleSliderChange}
                                    />

                                    <SliderQuestion
                                        data={{
                                            ques: "Any unusual aggression or fear",
                                            options: [""],
                                        }}
                                        value={formData.frequency}
                                        onChange={handleSliderChange}
                                    />

                                    <SliderQuestion
                                        data={{
                                            ques: "Sleep patterns & quality",
                                            options: [""],
                                        }}
                                        value={formData.signs}
                                        onChange={handleSliderChange}
                                    />


                                    <RadioButton
                                        data={{
                                            ques: "Any coughing",
                                            yes: "Yes",
                                            no: "No",
                                        }}
                                        value={formData.any}
                                        onChange={(value) => handleRadioChange("remarks", value)}
                                    />


                                    <SliderQuestion
                                        data={{
                                            ques: "The frequency of sneezing in your pet",
                                            options: [""],
                                        }}
                                        value={formData.earColor}
                                        onChange={handleSliderChange}
                                    />

                                    <SliderQuestion
                                        data={{
                                            ques: "The frequency of coughing in your pet",
                                            options: [""]
                                        }}
                                        value={formData.scratch}
                                        onChange={(value) => handleRadioChange("remarks", value)}
                                    />

                                    <RadioButton
                                        
                                        data={{
                                            ques: "Has your pet shown any adverse reactions to new foods or treats?",
                                            yes: "Yes",
                                            no: "No",
                                        }}
                                        value={formData.dental}
                                        onChange={(value) => handleRadioChange("remarks", value)}
                                    />

                                    <RadioButton
                                        data={{
                                            ques: "Has your pet reacted negatively to these changes in routine?",
                                            yes: "Yes",
                                            no: "No",
                                        }}
                                        value={formData.dental}
                                        onChange={(value) => handleRadioChange("remarks", value)}
                                    />


                                    <RadioButton
                                        data={{
                                            ques: "Has your pet experienced any side effects or adverse reactions to the medication changes?",
                                            yes: "Yes",
                                            no: "No",
                                        }}
                                        value={formData.dental}
                                        onChange={(value) => handleRadioChange("remarks", value)}
                                    />


                                    <SliderQuestion
                                        data={{
                                            ques: "Recent vaccinations or vet visits",
                                            options: [""],
                                        }}
                                        value={formData.drool}
                                        onChange={handleSliderChange}
                                    />


                                    <div>
                                        <h1 className="text-base font-bold text-[#4552C5] my-3">
                                            Additional Notes
                                        </h1>
                                        <textarea
                                            className="w-[327px] h-[112px] bg-[#F6F4FF] rounded-3xl border p-4"
                                            rows={5}
                                            placeholder="Feel free to add any relevant information..."
                                            value={formData.additionalNotes}
                                            onChange={(e) =>
                                                handleTextChange("additionalNotes", e.target.value)
                                            }
                                        ></textarea>
                                    </div>

                                    <RadioButton
                                        data={{
                                            ques: "Any additional remarks on physical, behavioural or environmental changes?",
                                            yes: "Yes",
                                            no: "No",
                                        }}
                                        value={formData.remarks}
                                        onChange={(value) => handleRadioChange("remarks", value)}
                                    />


                                    <div>
                                        <h1 className="text-base font-bold text-[#4552C5] my-3">
                                            Other Concerns
                                        </h1>
                                        <textarea
                                            className="w-[327px] h-[112px] bg-[#F6F4FF] rounded-3xl border p-4"
                                            rows={5}
                                            placeholder="Please note any additional observations..."
                                            value={formData.otherConcerns}
                                            onChange={(e) =>
                                                handleTextChange("otherConcerns", e.target.value)
                                            }
                                        ></textarea>
                                    </div>

                                    <div className="w-fit mx-auto mt-24">
                                        <button
                                            type="submit"
                                            className="w-[327px] h-[48px] mx-auto rounded-full bg-[#0B1A97] text-white"
                                            onClick={() => navigate("/PeriodicCheck1")}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
            {isTablet}
        </div>
    );
};

export default PeriodicCheck1;

