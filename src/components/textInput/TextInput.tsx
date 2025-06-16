import React from "react";
import TextField from "@mui/material/TextField";

const TextInput = ({ data, value, onChange }) => {
  return (
    <div>
      <h4 className="font-semibold mb-2 text-[#0b1A97]">{data.ques}</h4>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        sx={{
            backgroundColor: "#F6F4FF",
            // borderRadius: "650px",
            // border: "1px solid #C4C7C7",
        }}
      />
    </div>
  );
};

export default TextInput;
