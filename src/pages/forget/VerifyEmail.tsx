import React, { useState } from "react";
import MuiButton from "../../components/button/MuiButton";

const VerifyEmail = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value.length === 1 && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const validateOtp = () => {
        const enteredOtp = otp.join("");
        const correctOtp = "1234";

        if (enteredOtp === correctOtp) {
            alert("OTP Verified!");
            setError("");
        } else {
            setError("Wrong code, please try again");
        }
    };

    const resendCodeCountdown = 30;

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
            style={{
                backgroundColor: "#f5f5ff",
                padding: "16px",
            }}
        >
            <div
                className="w-full max-w-md shadow-md rounded-lg p-6"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "#fff",
                    borderRadius: "24px",
                    padding: "24px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
            >
                <button className="text-xl mb-4 text-blue-600">←</button>
                <h1 className="text-2xl font-semibold text-blue-900 text-center">
                    Please check your Email
                </h1>
                <p className="text-center text-gray-500 mt-2">
                    We've sent a code to <strong>example@gmail.com</strong>
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                            className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    ))}
                </div>
                {/* <button
          className="mt-8 w-full bg-blue-900 text-white py-2 rounded-lg text-lg hover:bg-blue-800 transition"
          onClick={validateOtp}
        >
          Verify
        </button> */}

                <div className="mt-6">
                    {/* Submit Button */}
                    <MuiButton
                        variant="contained"
                        size="large"
                        color="#0B1A97"
                        fullWidth
                        type="submit"
                        onClick={validateOtp}
                    // disabled={isSubmitting}
                    >
                        Verify
                    </MuiButton>
                </div>
                {error && (
                    <p className="mt-2 text-center text-red-600 font-medium">{error}</p>
                )}
                <p className="mt-4 text-center text-gray-500">
                    Send code again <span className="text-blue-900">00:{resendCodeCountdown}</span>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmail;




