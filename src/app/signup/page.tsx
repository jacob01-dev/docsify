import Link from "next/link";
import AuthLayout from "@/components/Auth/AuthLayout";
import SignupCard from "@/components/Auth/SignupCard";

const SignupPage = (): JSX.Element => {
  return (
    <AuthLayout>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <SignupCard />
        <div className="hidden bg-accent lg:block relative p-6 ">
          <div className="w-full flex items-center justify-end">
            <Link href={"/"}>
              <h3 className="text-8xl font-extrabold text-foreground/5">
                Docsify
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
