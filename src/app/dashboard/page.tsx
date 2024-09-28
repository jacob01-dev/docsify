import DashboardLayout from "./DashboardLayout";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import ChatbotsContainer from "@/components/Chatbot/ChatbotsContainer";

const DashboardPage = (): JSX.Element => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ChatbotsContainer />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
