import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import DashboardLayout from "../DashboardLayout";
import TierCards from "@/components/TierCards";
import StatisticsCards from "@/components/StatisticsCards";

const PaymentsPage = async () => {
  return (
    <ProtectedRoute>
      <DashboardLayout className="gap-y-12 pt-8">
        <StatisticsCards />
        <TierCards />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PaymentsPage;
