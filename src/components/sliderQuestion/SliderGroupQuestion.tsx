import React from "react";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";

interface SliderGroupQuestionProps {
  data: {
    ques: string;
    subQuestions: {
      label: string;
      options: string[];
    }[];
  };
  values: number[];
  onChange: (index: number, value: number) => void;
}

export default function SliderGroupQuestion({
  data,
  values,
  onChange,
}: SliderGroupQuestionProps) {
  const handleSliderChange =
    (index: number) => (_event: Event, newValue: number | number[]) => {
      onChange(index, newValue as number);
    };

  return (
    <FormControl sx={{ width: "100%" }}>
      <FormLabel
        id="slider-group-question-label"
        sx={{
          fontWeight: "bold",
          color: "#3845B8",
          marginBottom: "16px",
        }}
      >
        {data.ques}
      </FormLabel>

      {data.subQuestions.map((subQ, index) => (
        <Box key={index} sx={{ marginBottom: "24px" }}>
          <FormLabel
            sx={{
              fontWeight: "500",
              color: "#555",
              marginBottom: "8px",
              display: "block",
            }}
          >
            {subQ.label}
          </FormLabel>
          <Slider
            aria-labelledby={`slider-${index}`}
            value={values[index]}
            onChange={handleSliderChange(index)}
            marks={[
              { value: 10, label: subQ.options[0] },
              { value: 50, label: subQ.options[1] },
              { value: 90, label: subQ.options[2] },
            ]}
            step={null}
            min={0}
            max={100}
            sx={{
              color: "#0B1A97",
              "& .MuiSlider-thumb": {
                height: 20,
                width: 20,
                border: "2px solid #0B1A97",
                backgroundColor: "white",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 0 0 8px rgba(11, 26, 151, 0.16)",
                },
              },
              "& .MuiSlider-markLabel": {
                color: "#333",
                marginLeft: "-1.5rem",
              },
              "& .MuiSlider-rail, & .MuiSlider-track": {
                height: 2,
              },
            }}
          />
        </Box>
      ))}
    </FormControl>
  );
}
