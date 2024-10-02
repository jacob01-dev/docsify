import { useEffect, useState } from "react";

const useGetSubscription = ({
  setSubscription,
}: {
  setSubscription: (data: any) => void;
}) => {
  useEffect(() => {
    const getSubscription = async () => {
      const response = await fetch("/api/subscription/plan");
      const data = await response.json();
      setSubscription(data);
    };
    getSubscription();
  }, []);
};

export default useGetSubscription;
