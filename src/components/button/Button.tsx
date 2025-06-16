import React, { FC, ReactNode } from "react";
import { Button, styled, darken } from "@mui/material";

// Define Props Interface
interface MyButtonProps {
  color?: string; // Custom color for the button
  variant?: "text" | "outlined" | "contained"; // MUI button variants
  size?: "small" | "medium" | "large"; // MUI button sizes
  onClick?: () => void; // Click event handler
  children: ReactNode; // Button text or content
  [key: string]: any; // Allow additional props like className, style, etc.
}

// Styled Button Component
const CustomButton = styled(Button)<{
  customcolor?: string;
  size?: string;
  variant?: string;
}>(({ theme, customcolor, size, variant }) => ({
  // Set background color for "contained" variant
  minWidth: "150px",
  backgroundColor:
    variant === "contained"
      ? customcolor || theme.palette.primary.main
      : "transparent",
  color:
    variant === "contained"
      ? "#fff"
      : customcolor || theme.palette.primary.main,
  borderRadius: "50px", // Rounded edges
  width: size === "small" ? "140px" : size === "large" ? "327px" : "250px", // Dynamic width
  padding:
    size === "small" ? "6px 12px" : size === "large" ? "8px 8px" : "8px 8px", // Dynamic padding
  border:
    variant === "outlined"
      ? `2px solid ${customcolor || theme.palette.primary.main}` // Border for outlined variant
      : "none",
  height: "48px", // Height of the button
  textTransform: "none", // Preserve text case
  "&:hover": {
    backgroundColor:
      variant === "contained"
        ? customcolor
          ? darken(customcolor, 0.2)
          : darken(theme.palette.primary.main, 0.2)
        : "rgba(0, 0, 0, 0.04)", // Add subtle hover effect for non-contained
    borderColor:
      variant === "outlined"
        ? darken(customcolor || theme.palette.primary.main, 0.2)
        : "none", // Darker border on hover for outlined
  },
}));

// MuiButton Component
const ButtonComponent: FC<MyButtonProps> = ({
  color,
  variant = "contained",
  size = "medium",
  onClick,
  children,
  ...props
}) => {
  return (
    <CustomButton
      customcolor={color}
      variant={variant}
      size={size}
      onClick={onClick}
      {...props}
    >
      {children}
    </CustomButton>
  );
};

export default ButtonComponent;
