import MaxWidthWrapper from "../MaxWidthWrapper";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper className="dark min-h-screen">{children}</MaxWidthWrapper>
  );
};

export default AuthLayout;
