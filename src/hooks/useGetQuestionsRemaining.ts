import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useGetQuestionsRemaining = ({
  setQuestionsRemaining,
}: {
  setQuestionsRemaining: (data: number) => void;
}) => {
  useEffect(() => {
    const getQuestionsRemaining = async () => {
      const response = await fetch("/api/subscription/question_usage");
      const data = await response.json();
      setQuestionsRemaining(data);
    };
    getQuestionsRemaining();
  }, []);
};

export default useGetQuestionsRemaining;
