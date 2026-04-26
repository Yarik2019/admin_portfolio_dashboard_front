import { LoginForm } from "@/components/login-form";
import { RestrictedRoute } from "@/components/RestrictedRoute/RestrictedRoute";

const SignInPage = () => {
  return (
    <RestrictedRoute>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </RestrictedRoute>
  );
};

export default SignInPage;
