import { RestrictedRoute } from "@/components/RestrictedRoute/RestrictedRoute";
import { SignupForm } from "@/components/signup-form";

const SignUpPage = () => {
  return (
    <RestrictedRoute>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </RestrictedRoute>
  );
};

export default SignUpPage;
