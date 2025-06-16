import React, { FC } from "react";
import { TextField, InputAdornment, styled } from "@mui/material";

// Props Interface
interface CustomInputProps {
  placeholder?: string; // Placeholder text
  leftIcon?: React.ReactNode; // Icon on the left
  rightIcon?: React.ReactNode; // Icon on the right
  value?: string; // Input value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  type?: string; // Input type (e.g., "text", "password", "email")
  disabled?: boolean; // Disable the input
  fullWidth?: boolean; // Expand input to full width
  [key: string]: any; // Allow additional props
}

// Styled TextField Component
const StyledTextField = styled(TextField)(({ theme }) => ({
  height: "48px",
  width: "327px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
    backgroundColor: "#F5F5FF",
    "& fieldset": {
      borderColor: "transparent", // No visible border
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main, // Border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main, // Border on focus
      borderWidth: "2px",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 16px", // Spacing for text
  },
}));

const MuiInput: FC<CustomInputProps> = ({
  placeholder = "Enter text",
  leftIcon,
  rightIcon,
  value,
  onChange,
  type = "text",
  disabled = false,
  fullWidth = true,
  ...props
}) => {
  return (
    <StyledTextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      slotProps={{
        input: {
          startAdornment: leftIcon && (
            <InputAdornment position="start">{leftIcon}</InputAdornment>
          ),
          endAdornment: rightIcon && (
            <InputAdornment position="end">{rightIcon}</InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default MuiInput;
