"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import WelcomeScreen from "@/components/Assessment/WelcomeScreen";
import PersonalInfoForm from "@/components/Assessment/PersonalInfoForm";
import QuestionCard from "@/components/Assessment/QuestionCard";
import CompletionScreen from "@/components/Assessment/CompletionScreen";
import { questions } from "@/lib/questions";
import { calculateTier, type AssessmentAnswers } from "@/lib/tierCalculator";
import toast from "react-hot-toast";

const questionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [personalInfo, setPersonalInfo] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    linkedIn?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const totalSteps = questions.length;
  const progress = ((currentStep - 1) / (totalSteps - 3)) * 100; // Adjust for welcome and completion screens

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Map answers to the format expected by tier calculator
      const assessmentAnswers: AssessmentAnswers = {
        webTechnologies: answers[3] || [],
        canBuildCRUD: answers[4] || "no",
        canImplementAuth: answers[5] || "no",
        backendFrameworks: answers[6] || [],
        knowsGolang: answers[7] || "no",
        hasDeployed: answers[8] || "no",
        canBuildAuthAPI: answers[9] || "no",
      };

      // Calculate tier
      const tierResult = calculateTier(assessmentAnswers);

      // Submit to API
      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...personalInfo,
          ...assessmentAnswers,
          ...tierResult,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit assessment");
      }

      toast.success("Assessment submitted successfully!");
      handleNext(); // Move to completion screen
    } catch (error: any) {
      toast.error(error.message || "Failed to submit assessment");
      console.error("Error submitting assessment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = currentQuestion?.id && answers[currentQuestion.id];

  // Auto-advance for single-choice questions after selection
  const handleAnswerWithAutoAdvance = (questionId: number, answer: any) => {
    handleAnswer(questionId, answer);
    const question = questions.find((q) => q.id === questionId);
    if (question && !question.allowMultiple && currentStep < totalSteps - 2) {
      setTimeout(() => handleNext(), 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        {currentStep > 1 && currentStep < totalSteps - 1 && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {currentStep - 1} of {totalSteps - 3}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Question Container */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={questionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            {currentStep === 0 && <WelcomeScreen onStart={handleNext} />}

            {currentStep === 1 && (
              <PersonalInfoForm
                onSubmit={(data) => {
                  setPersonalInfo(data);
                  handleNext();
                }}
                onBack={handleBack}
              />
            )}

            {currentStep > 1 && currentStep < totalSteps - 1 && (
              <QuestionCard
                question={currentQuestion as any}
                answer={answers[currentQuestion.id]}
                onAnswer={(answer) => {
                  handleAnswerWithAutoAdvance(currentQuestion.id, answer);
                }}
                onBack={handleBack}
              />
            )}

            {currentStep === totalSteps - 1 && (
              <CompletionScreen
                tierResult={calculateTier({
                  webTechnologies: answers[3] || [],
                  canBuildCRUD: answers[4] || "no",
                  canImplementAuth: answers[5] || "no",
                  backendFrameworks: answers[6] || [],
                  knowsGolang: answers[7] || "no",
                  hasDeployed: answers[8] || "no",
                  canBuildAuthAPI: answers[9] || "no",
                })}
                onViewDashboard={() => router.push("/admin/dashboard")}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons (for manual navigation) */}
        {currentStep > 1 &&
          currentStep < totalSteps - 1 &&
          currentQuestion.allowMultiple && (
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 transition"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isAnswered || isSubmitting}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {currentStep === totalSteps - 2
                  ? isSubmitting
                    ? "Submitting..."
                    : "Submit"
                  : "Continue →"}
              </button>
            </div>
          )}

        {/* Submit button for last question */}
        {currentStep === totalSteps - 2 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              disabled={!isAnswered || isSubmitting}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Assessment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
