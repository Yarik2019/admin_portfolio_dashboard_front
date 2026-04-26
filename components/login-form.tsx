"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";

import Link from "next/link";
import { signinValidation } from "@/utils/formValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { signIn } from "@/lib/user/operation";
import { selectIsRefreshing } from "@/lib/user/selectors";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading  = useSelector(selectIsRefreshing);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handelSubmit = (values: any) => {
    dispatch(signIn(values));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your data to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={signinValidation}
            onSubmit={handelSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">

                {/* NAME */}
                <div>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Field
                    name="name"
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className={cn(
                      "w-full border p-2 rounded",
                      errors.name && touched.name && "border-red-500"
                    )}
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className={cn(
                      "w-full border p-2 rounded",
                      errors.email && touched.email && "border-red-500"
                    )}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    placeholder="password"
                    className={cn(
                      "w-full border p-2 rounded",
                      errors.password &&
                        touched.password &&
                        "border-red-500"
                    )}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* BUTTON */}
                <div className="flex flex-col gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>

                  <FieldDescription className="text-center">
                    Don’t have an account?{" "}
                    <Link href="/signup">Sign up</Link>
                  </FieldDescription>
                </div>

              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}