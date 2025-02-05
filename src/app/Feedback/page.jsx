"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const feedbackOptions = [
  { emoji: "😢", label: "Very Bad", color: "bg-red-500" },
  { emoji: "😞", label: "Bad", color: "bg-orange-400" },
  { emoji: "😐", label: "Medium", color: "bg-yellow-400" },
  { emoji: "😊", label: "Good", color: "bg-green-400" },
  { emoji: "😁", label: "Very Good", color: "bg-blue-400" },
];

export default function FeedbackModal() {
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <FaTimes size={18} />
        </button>

        {/* Heading */}
        <h2 className="text-lg font-semibold text-center">How are you feeling?</h2>
        <p className="text-sm text-gray-500 text-center">
          Your input helps us improve our service.
        </p>

        {/* Feedback Icons */}
        <div className="flex justify-center gap-3 mt-4">
          {feedbackOptions.map((option, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-center p-2 rounded-full cursor-pointer transition-all ${
                selected === index ? "shadow-lg scale-110" : "opacity-60"
              }`}
              onClick={() => setSelected(index)}
            >
              <span className="text-3xl">{option.emoji}</span>
              {selected === index && (
                <div className={`absolute -bottom-6 text-xs text-white py-1 px-2 rounded-md ${option.color}`}>
                  {option.label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          placeholder="Add a comment..."
          className="w-full mt-5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button
          className="w-full mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-md font-semibold transition hover:opacity-90"
          disabled={selected === null}
        >
          Submit Now
        </button>
      </div>
    </div>
  );
}
