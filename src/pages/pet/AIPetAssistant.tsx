import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import left from "/icons/arrowLeft.svg";
import ArrowIcon from "/icons/aiArrow.png";
import { petAIAssistant } from "../../services/AIPetAssistant/petAIServices";
import HorizontalSidebar from "../../components/sidebar/HorizontalSidebar";
import { useSelector } from "react-redux";

const AIPetAssistant = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [petName, setPetName] = useState("");
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.auth.user);
  let petname: string;

  const location = useLocation();
  const { searchTerm } = location.state || {};

  const customQuestions = [
    "Why does my dog keep scratching even though they don’t have fleas?",
    "My cat has stopped eating their usual food—should I be worried?",
    "Is my puppy [Your Pet Name] getting enough exercise for their age and breed?",
    "Why does my pet [Your Pet Name] seem anxious whenever I leave the house?",
    "When is [Your Pet Name]’s next pet visit?",
  ];

  const fetchBotResponse = async (userInput: string) => {
    try {
      const response = await petAIAssistant({
        message: userInput,
        petName: petname,
        userName: userData.fullName || "Hooman",
        breed: "Golden Retriever",
        age: 1,
      });

      const botMessage = response.data.reply;
      const points = botMessage
        .split("\n\n")
        .map((point: any) => point.trim())
        .filter((point: any) => point);

      setMessages((prev) => [...prev, { sender: "bot", text: points }]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      // Refined regex to capture pet names and strip brackets
      const petNameMatch = message.match(/@(\w+)|\[(.+?)\]/);
      const extractedPetName = petNameMatch
        ? petNameMatch[1] || petNameMatch[2]
        : null;

      console.log(extractedPetName, "extractedPetName");

      if (extractedPetName) {
        petname = extractedPetName;
      }

      // Update messages
      setMessages([...messages, { sender: "user", text: message }]);
      setInput("");
      fetchBotResponse(message);
    }
  };

  const handleQuestionClick = (question: string) => {
    setInput(question); // Populate the input field with the selected question
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendMessage(input);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setMessages([{ sender: "user", text: searchTerm }]);
      fetchBotResponse(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{ backgroundColor: "#FFFFFF", overflowY: "auto", height: "90vh" }}
    >
      <div
        style={{
          backgroundColor: "#0B1A97",
          color: "#FFFFFF",
          padding: "16px",
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
          position: "relative",
          height: "10rem",
        }}
      >
        <img
          src={left}
          width={33}
          alt="Back"
          onClick={() => navigate("/user-dashboard")}
          style={{ cursor: "pointer", position: "absolute", left: "16px" }}
        />
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          AI Pet Assistant
        </Typography>
      </div>

      <div
        ref={chatContainerRef}
        style={{
          padding: "16px",
          paddingBottom: "160px",
          overflowY: "auto",
          height: "calc(100vh - 70px)",
          marginTop: "-4rem",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "50px",
        }}
      >
        <div className="flex flex-col justify-center items-center my-4">
          <div className="mb-1">
            <img
              src="/icons/SOP Logomark 2.svg"
              alt="Icon"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <p className="text-[#0B1A97] font-semibold text-xl mt-2">
            Hello Hooman
          </p>
          <p className="text-[#0B1A97] font-semibold text-xl">
            What can I help with?
          </p>
        </div>

        {/* Render custom questions */}
        <div style={{ marginBottom: "16px" }} className="relative">
          <Typography
            className="text-[#0B1A97]"
            variant="h6"
            style={{
              fontWeight: "bold",
              marginBottom: "8px",
              marginLeft: "5px",
            }}
          >
            Get started by asking…
          </Typography>
          {customQuestions.map((question, index) => (
            <Button
              key={index}
              onClick={() => handleQuestionClick(question)}
              style={{
                display: "block",
                marginBottom: "8px",
                textAlign: "left",
                textTransform: "none",
                color: "#0B1A97",
              }}
            >
              {question}
            </Button>
          ))}
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            {msg.sender === "bot" && (
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <img
                  src="/icons/SOP Logomark 2.svg"
                  alt="Bot Icon"
                  style={{
                    width: "30px",
                    height: "40px",
                    marginRight: "8px",
                  }}
                />
                <div
                  style={{
                    backgroundColor: "#F6F4FF",
                    color: "#333",
                    padding: "12px 16px",
                    borderRadius: "12px 12px 12px 0",
                    maxWidth: "75%",
                    textAlign: "left",
                  }}
                >
                  {msg.text.map((point: any, pointIndex: any) => (
                    <Typography
                      key={pointIndex}
                      variant="body2"
                      style={{ marginBottom: "8px" }}
                    >
                      {point}
                    </Typography>
                  ))}
                </div>
              </div>
            )}

            {msg.sender === "user" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#FFDDB4",
                    color: "#333",
                    padding: "12px 16px",
                    borderRadius: "12px 12px 0 12px",
                    maxWidth: "75%",
                    textAlign: "left",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative w-full">
        <div
          style={{
            position: "fixed",
            bottom: "0px",
            left: "0",
            right: "0",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F6F4FF",
            padding: "6px 16px",
            borderRadius: "24px 24px",
            boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
            width: "93%",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <TextField
            placeholder="Message"
            variant="standard"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{
              disableUnderline: true,
              style: {
                flex: 1,
                fontSize: "16px",
              },
            }}
            fullWidth
          />
          <IconButton onClick={() => handleSendMessage(input)}>
            <img src={ArrowIcon} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default AIPetAssistant;
