import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import StageRole2 from "./stages/StageRole2";
import StageRole3 from "./stages/StageRole3";
import { useNavigate } from "react-router-dom";

interface FormData {
  [key: string]: string;
}

const variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  // Remove role selection for registration, always register as 'user'
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Always register as 'user'
      const dataToSend = { ...formData, role: "user" };
      await axios.post("http://localhost:5000/api/auth/register", dataToSend);
      alert("Account created successfully!");
      navigate("/");
    } catch (error: any) {
      alert(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Registration failed."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 via-white to-purple-200">
      <div className="bg-white/80 p-10 sm:p-14 rounded-3xl shadow-2xl flex flex-col items-center w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8">Create your Nirvaha account</h2>
        <div className="flex justify-between mb-8 w-full max-w-xs mx-auto">
          {["Details", "Password"].map((label, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  step >= index + 1
                    ? "bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </div>
              <p className="text-xs mt-2 text-gray-700">{label}</p>
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <StageRole2
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                setFormData={setFormData}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <StageRole3
                formData={formData}
                handleChange={handleChange}
                prevStep={prevStep}
                handleSubmit={handleSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full py-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold rounded-full transition cursor-pointer shadow hover:from-teal-600 hover:to-purple-600 text-lg"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
