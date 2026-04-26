"use client";

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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupValidation } from "@/utils/formValidation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { selectIsRefreshing } from "@/lib/user/selectors";
import { signUp } from "@/lib/user/operation";

export function SignupForm(props: React.ComponentProps<typeof Card>) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsRefreshing);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    const { confirmPassword, ...payload } = values;
    dispatch(signUp(payload));
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={signupValidation}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FieldGroup className="space-y-4">
                {/* NAME */}
                <div>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
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
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
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
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>

                  <Button variant="outline" type="button">
                    Sign up with Google
                  </Button>

                  <FieldDescription className="text-center">
                    Already have an account? <Link href="/signin">Sign in</Link>
                  </FieldDescription>
                </div>
              </FieldGroup>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
