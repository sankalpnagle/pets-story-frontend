import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface RadioButtonProps {
  data: {
    ques: string;
    options: string[];
  };
  value: string;
  onChange: (value: string) => void;
}

export default function RadioButton({
  data,
  value,
  onChange,
}: RadioButtonProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel
        id="radio-buttons-group-label"
        sx={{ fontWeight: "bold", mb: 1, color: "#0b1A97" }}
      >
        {data.ques}
      </FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        {data.options.map((option) => (
          <FormControlLabel
            key={option}
            value={option} 
            control={
              <Radio
                sx={{
                  color: "#797776",
                  "&.Mui-checked": {
                    color: "#0B1A97",
                  },
                }}
              />
            }
            label={option}
            sx={{
              backgroundColor: "#F6F4FF",
              borderRadius: "999px",
              padding: "0 16px",
              border: "1px solid #C4C7C7",
              width: "150px",
              height: "46px",
              display: "flex",
              alignItems: "center",
              marginLeft: "1px"
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
