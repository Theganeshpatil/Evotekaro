import React, { useState } from "react";
import "../Assets/css/Faq.css";
import Sidebar from "./Sidebar";

const faqData = [
  {
    question: "What is Evotekaro?",
    answer:
      "Evotekaro is an online voting platform where you can vote for your  candidates with no hassle! You may vote for them from anywhere, be it your hostel room, academic block or from the mess.        ",
  },
  {
    question: "Why should I use Evotekaro",
    answer:
      "Going to the ballots IRL just to put a piece of paper in a box is a waste of your time and energy. With Evotekaro as long as you have a steady internet connection, it is as simple as clicking the “Vote” button!        ",
  },
  {
    question: "But is it safe?",
    answer:
      "Yes, online voting on our platform is highly secure. We prioritize the security and integrity of the voting process as we have stringent measures in place to protect your data and ensure that your vote remains anonymous and tamper-proof",
  },
  {
    question: "Can I vote multiple times?      ",
    answer:
      "Obviously not. Our platform strictly adheres to the one-person-one-vote principle. We have mechanisms in place to prevent multiple voting by the same individual, preventing manipulation of the results.        ",
  },
  {
    question: "Is my vote really anonymous?",
    answer:
      "Your vote is encrypted and stored securely, and our system is designed to ensure the anonymity of each voter. No personally identifiable information is linked to your vote.        ",
  },
  {
    question:
      "What if I encounter technical difficulties during the voting process?      ",
    answer:
      "We provide technical support to assist you throughout the voting process. If you encounter any difficulties, you can reach out to our support team via email, and we will promptly assist you in resolving any technical issues.        ",
  },
  {
    question:
      "What if I encounter technical difficulties during the voting process?      ",
    answer:
      "We provide technical support to assist you throughout the voting process. If you encounter any difficulties, you can reach out to our support team via email, and we will promptly assist you in resolving any technical issues.        ",
  },
  {
    question: "Can I change my vote after submitting it?      ",
    answer:
      "No, once your vote is submitted, it is final and cannot be changed. We advise you to review your choices carefully before submitting your vote.        ",
  },
  // Add more FAQ items as needed
];

export const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-image">
      <div className="side">
        <Sidebar></Sidebar>
      </div>
      <div className="view-section">
        <div className="faq-container">
          <div className="sumo-text">
            <h1>Frequently Asked Questions</h1>
          </div>
          {faqData.map((item, index) => (
            <div
              className={`faq-item ${
                expandedIndex === index ? "expanded" : ""
              }`}
              key={index}
              onClick={() => toggleAccordion(index)}
            >
              <div className="question">{item.question}</div>
              {expandedIndex === index && (
                <div className="answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
