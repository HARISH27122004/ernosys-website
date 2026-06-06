import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/BackButton.css'
export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button onClick={handleBack} className="back-btn">
      ← Back
    </button>
  );
}