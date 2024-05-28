"use client";

import { LTDS, MEDICAL_CONDITIONS } from "@/data/answers";
import { LTD, MedicalCondition } from "@/utils/types";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type QuizEntry = LTD | MedicalCondition;
const NUMBER_OF_QUESTIONS = 10;

// Shuffle function to randomize the array elements
function shuffleArray(array: QuizEntry[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const QuizComponent = () => {
  const [questions, setQuestions] = useState<QuizEntry[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isWrongAnswerBackgroundActive, setIsWrongAnswerBackgroundActive] =
    useState(false);
  const [isCorrectAnswerBackgroundActive, setIsCorrectAnswerBackgroundActive] =
    useState(false);
  const [endScreenIsActive, setEndScreenIsActive] = useState(false);

  //Generate quiz questions

  const setup = () => {
    const falseEntries = MEDICAL_CONDITIONS.slice();
    const trueEntries = LTDS.slice();
    shuffleArray(falseEntries);
    shuffleArray(trueEntries);

    // Select at least 3 false entries
    const selectedFalse = falseEntries.slice(
      0,
      Math.max(3, NUMBER_OF_QUESTIONS - trueEntries.length)
    );
    // Fill the rest with true entries, up to a total of NUMBER_OF_QUESTIONS
    const selectedTrue = trueEntries.slice(
      0,
      NUMBER_OF_QUESTIONS - selectedFalse.length
    );

    const allEntries = [...selectedFalse, ...selectedTrue];
    shuffleArray(allEntries);
    setQuestions(allEntries);
  };

  useEffect(() => {
    setup();
  }, []);

  const handleAnswer = (isLTD: boolean) => {
    const correctAnswer = questions[questionIndex].country ? true : false; //LTDS have a country property

    console.log(questionIndex);

    if (isLTD === correctAnswer) {
      setIsCorrectAnswerBackgroundActive(true);
      setCurrentScore(currentScore + 1);
    } else {
      setIsWrongAnswerBackgroundActive(true);
      setCurrentScore(currentScore - 1);
    }

    if (questionIndex < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setEndScreenIsActive(true);
    }
  };

  const reset = () => {
    setIsCorrectAnswerBackgroundActive(false);
    setIsWrongAnswerBackgroundActive(false);
    setCurrentScore(0);
    setQuestionIndex(0);
    setup();
    setEndScreenIsActive(false);
  };

  return (
    <div className="py-4">
      <div
        className={` rounded-md text-black h-[350px] w-[300px] px-4 py-6 ${
          isWrongAnswerBackgroundActive && !endScreenIsActive
            ? "bg-red-100"
            : isCorrectAnswerBackgroundActive && !endScreenIsActive
            ? "bg-green-100"
            : "bg-white"
        }`}
      >
        {!endScreenIsActive && questions.length > 0 ? (
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-center">
              <div className="pt-2 grid grid-cols-3 justify-center">
                <div>
                  {isCorrectAnswerBackgroundActive ||
                  (isWrongAnswerBackgroundActive && questionIndex > 0)
                    ? questionIndex
                    : questionIndex + 1}
                </div>
                <div>/</div>
                <div>{NUMBER_OF_QUESTIONS}</div>
              </div>
            </div>
            <div>
              <div className="text-4xl px-10 font-bold">
                {isCorrectAnswerBackgroundActive ||
                (isWrongAnswerBackgroundActive && questionIndex > 0)
                  ? questions[questionIndex - 1].abbreviation
                  : questions[questionIndex].abbreviation}
              </div>
              <div
                className={`min-h-[100px] px-2 pt-2 flex flex-col gap-2 font-medium ${
                  isWrongAnswerBackgroundActive
                    ? "text-red-500"
                    : isCorrectAnswerBackgroundActive
                    ? "text-green-500"
                    : "text-black"
                }`}
              >
                {isCorrectAnswerBackgroundActive ||
                isWrongAnswerBackgroundActive ? (
                  <>
                    <div>{questions[questionIndex - 1].fullName}</div>
                    <div className="font-bold">
                      {questions[questionIndex - 1].country}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="min-h-[100px] flex items-end justify-center">
              <div className="grid grid-cols-1 gap-2 font-medium w-full">
                {!isCorrectAnswerBackgroundActive &&
                !isWrongAnswerBackgroundActive ? (
                  <>
                    <button
                      className="rounded-md justify-center border-black/20 hover:border-black/100 border-2 px-4 py-2 flex items-center gap-1.5"
                      onClick={() => handleAnswer(true)}
                    >
                      <span className="inline-block relative w-5 h-5">
                        <Image
                          priority
                          src="/1f1ea-1f1fa.png"
                          fill
                          alt="european flag emoji"
                        ></Image>
                      </span>{" "}
                      Limited Liability Company
                    </button>
                    <button
                      className="rounded-md border-black/20 hover:border-black/100 border-2 px-4 py-2"
                      onClick={() => handleAnswer(false)}
                    >
                      🦠 Medical Condition
                    </button>
                  </>
                ) : (
                  <button
                    className="rounded-md  bg-white border-2 border-black px-4 py-2"
                    onClick={() => {
                      if (questionIndex === questions.length) {
                        setEndScreenIsActive(true);
                      } else {
                        setIsCorrectAnswerBackgroundActive(false);
                        setIsWrongAnswerBackgroundActive(false);
                      }
                    }}
                  >
                    {questionIndex === questions.length
                      ? "Show Results"
                      : "Next"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className=" justify-between flex flex-col h-full">
            Your score
            <div className="text-5xl font-bold">{currentScore}</div>
            <p className="font-bold">
              {currentScore === 10
                ? "Nailed it!"
                : currentScore > 5
                ? "Well done!"
                : currentScore > 0
                ? "You can do better than that!"
                : "Pretty bad"}
            </p>
            <button
              className="rounded-md  bg-white border-2 border-black px-4 py-2"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        )}
      </div>

      <div
        className={`font-bold text-lg my-4 min-h-[80px] ${
          isWrongAnswerBackgroundActive
            ? "text-red-500"
            : isCorrectAnswerBackgroundActive
            ? "text-green-500"
            : "text-black"
        }`}
      >
        {!endScreenIsActive ? <div>Current Score: {currentScore}</div> : null}
      </div>
    </div>
  );
};

export default QuizComponent;
