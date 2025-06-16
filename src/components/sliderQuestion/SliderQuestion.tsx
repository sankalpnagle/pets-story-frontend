// import React from "react";
// import Slider from "@mui/material/Slider";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// interface SliderQuestionProps {
//   data: {
//     ques: string;
//     options: string[];
//   };
//   value: any;
//   onChange: (value: any) => void;
// }

// export default function SliderQuestion({
//   data,
//   value,
//   onChange,
// }: SliderQuestionProps) {
//   const handleSliderChange = (_event: Event, newValue: any | any[]) => {
//     onChange(newValue as any);
//   };

//   return (
//     <FormControl sx={{ width: "100%" }}>
//       <FormLabel
//         id="slider-question-label"
//         sx={{
//           fontWeight: "bold",
//           color: "#3845B8",
//         }}
//       >
//         {data.ques}
//       </FormLabel>
//       <Slider
//         aria-labelledby="slider-question-label"
//         value={value}
//         onChange={handleSliderChange}
//         marks={[
//           { value: 10, label: data.options[0] },
//           { value: 50, label: data.options[1] },
//           { value: 90, label: data.options[2] },
//         ]}
//         step={null}
//         min={0}
//         max={100}
//         sx={{
//           color: "#0B1A97",
//           "& .MuiSlider-thumb": {
//             height: 20,
//             width: 20,
//             border: "2px solid #0B1A97", 
//             backgroundColor: "white", 
//             boxShadow: "none", 
//             "&:hover": {
//               boxShadow: "0 0 0 8px rgba(11, 26, 151, 0.16)", 
//             },
//           },
//           "& .MuiSlider-markLabel": {
//             color: "#333",
//             marginLeft:"-0.5rem"
//           },
//           "& .MuiSlider-rail, & .MuiSlider-track": {
//             height: 2,
//           },
//         }}
//       />
//     </FormControl>
//   );
// }



// import React from "react";
// import Slider from "@mui/material/Slider";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// interface SliderQuestionProps {
//   data: {
//     ques: string;
//     options: string[];
//   };
//   value: number;
//   onChange: (value: number) => void;
// }

// export default function SliderQuestion({
//   data,
//   value,
//   onChange,
// }: SliderQuestionProps) {
//   // Generate marks dynamically based on options
//   const marks = data.options.map((option, index) => ({
//     value: (index / (data.options.length - 1)) * 100, // Distribute marks evenly
//     label: option,
//   }));

//   const handleSliderChange = (_event: Event, newValue: number | number[]) => {
//     onChange(newValue as number);
//   };

//   return (
//     <FormControl sx={{ width: "100%" }}>
//       <FormLabel
//         id="slider-question-label"
//         sx={{
//           fontWeight: "bold",
//           color: "#3845B8",
//         }}
//       >
//         {data.ques}
//       </FormLabel>
//       <Slider
//         aria-labelledby="slider-question-label"
//         value={value}
//         onChange={handleSliderChange}
//         marks={marks}
//         step={null} // Prevent snapping between intermediate points
//         min={0}
//         max={100}
//         sx={{
//           color: "#0B1A97",
//           "& .MuiSlider-thumb": {
//             height: 20,
//             width: 20,
//             border: "2px solid #0B1A97",
//             backgroundColor: "white",
//             boxShadow: "none",
//             "&:hover": {
//               boxShadow: "0 0 0 8px rgba(11, 26, 151, 0.16)",
//             },
//           },
//           "& .MuiSlider-markLabel": {
//             color: "#333",
//             marginLeft: "0.9rem",
//           },
//           "& .MuiSlider-rail, & .MuiSlider-track": {
//             height: 2,
//           },
//         }}
//       />
//     </FormControl>
//   );
// }


// import React from "react";
// import Slider from "@mui/material/Slider";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// interface SliderQuestionProps {
//   data: {
//     ques: string;
//     options: string[];
//   };
//   value: string; // Updated to accept string values
//   onChange: (value: string) => void; // Updated to handle string values
// }

// export default function SliderQuestion({
//   data,
//   value,
//   onChange,
// }: SliderQuestionProps) {
//   // Map options to numeric values
//   const marks = data.options.map((option, index) => ({
//     value: index,
//     label: option,
//   }));

//   const handleSliderChange = (_event: Event, newValue: number | number[]) => {
//     const selectedOption = data.options[newValue as number]; // Convert numeric value back to string
//     onChange(selectedOption); // Pass the string value to the parent
//   };

//   const numericValue = data.options.indexOf(value); // Convert string to numeric index

//   return (
//     <FormControl sx={{ width: "100%" }}>
//       <FormLabel
//         id="slider-question-label"
//         sx={{
//           fontWeight: "bold",
//           color: "#3845B8",
//         }}
//       >
//         {data.ques}
//       </FormLabel>
//       <Slider
//         aria-labelledby="slider-question-label"
//         value={numericValue} // Use the numeric index
//         onChange={handleSliderChange}
//         marks={marks}
//         step={1} // Allow snapping to discrete points
//         min={0}
//         max={data.options.length - 1} // Adjust range dynamically
//         sx={{
//           color: "#0B1A97",
//           "& .MuiSlider-thumb": {
//             height: 20,
//             width: 20,
//             border: "2px solid #0B1A97",
//             backgroundColor: "white",
//             boxShadow: "none",
//             "&:hover": {
//               boxShadow: "0 0 0 8px rgba(11, 26, 151, 0.16)",
//             },
//           },
//           "& .MuiSlider-markLabel": {
//             color: "#333",
//             marginLeft: "0.9rem",
//           },
//           "& .MuiSlider-rail, & .MuiSlider-track": {
//             height: 2,
//           },
//         }}
//       />
//     </FormControl>
//   );
// }


import React from 'react';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

interface SliderQuestionProps {
  data: {
    ques: string;
    options: string[];
  };
  value: string;
  onChange: (value: string) => void;
}

export default function SliderQuestion({ data, value, onChange }: SliderQuestionProps) {
  const handleSliderChange = (_event: Event, newValue: any | any[]) => {
    const selectedOption = data.options[newValue as any];
    onChange(selectedOption);
  };

  const numericValue = data.options.indexOf(value);

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel
        id="slider-question-label"
        sx={{
          // fontWeight: 'bold',
          fontWeight : (data.ques !== 'Consistency' && data.ques !== 'Color' && data.ques !== 'Abnormalities') ? 'bold' : '',
          // color: '#0b1A97',

          color: (data.ques !== 'Consistency' && data.ques !== 'Color' && data.ques !== 'Abnormalities') ? '#0b1A97' : 'black',
        }}
      >
        {data.ques}
      </FormLabel>
      <Slider
        aria-labelledby="slider-question-label"
        value={numericValue}
        onChange={handleSliderChange}
        step={1}
        min={0}
        max={data.options.length - 1}
        sx={{
          color: '#0B1A97',
          '& .MuiSlider-thumb': {
            height: 20,
            width: 20,
            border: '2px solid #0B1A97',
            backgroundColor: 'white',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 0 0 8px rgba(11, 26, 151, 0.16)',
            },
          },
          '& .MuiSlider-rail, & .MuiSlider-track': {
            height: 2,
          },
        }}
      />
      {data.options.map((option, index) => (
        <Typography variant="body2" key={index} hidden={index !== numericValue}>
          {option}
        </Typography>
      ))}
    </FormControl>
  );
}