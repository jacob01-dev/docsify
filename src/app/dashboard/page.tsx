import DashboardLayout from "./DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ChatbotsContainer from "@/components/ChatbotsContainer";

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
