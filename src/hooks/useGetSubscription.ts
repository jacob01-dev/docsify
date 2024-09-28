import { useEffect, useState } from "react";

const useGetSubscription = (): any => {
  const [subscription, setSubscription] = useState<any>();
  useEffect(() => {
    const getSubscription = async () => {
      const response = await fetch("/api/subscription/plan");
      const data = await response.json();
      setSubscription(data);
    };
    getSubscription();
  }, []);
  return subscription;
};

export default useGetSubscription;
