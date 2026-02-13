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
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";

import Swal from "sweetalert2";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // onSubmit: async ({ value }) => {
    //   const toastId = toast.loading(`Loading...`);
    //   try {
    //     const { data, error } = await authClient.signIn.email(value);
    //     console.log(data, error);
    //     if (error && data === null) {
    //       toast.error(error.message, { id: toastId });
    //     }
    //     if (data !== null) {
    //       toast.success(`Login successfully`, { id: toastId });
    //       router.push("/");
    //       router.refresh();
    //     }
    //   } catch (error) {
    //     toast.error(`Login field, Please try again`, {
    //       id: toastId,
    //     });
    //   }
    // },

    onSubmit: async ({ value }) => {
      try {
        // 🔄 Loading alert
        Swal.fire({
          title: "Logging in...",
          text: "Please wait while we verify your credentials.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const { data, error } = await authClient.signIn.email(value);

        if (error && data === null) {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.message,
          });
          return;
        }

        if (data !== null) {
          Swal.fire({
            icon: "success",
            title: "Login Successful 🎉",
            text: "Welcome back!",
            timer: 1500,
            showConfirmButton: false,
          });

          router.push("/");
          router.refresh();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Login failed, please try again.",
        });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}>
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="Enter Your Email"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="Enter Your Password"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <Field>
                <Button id="login-form" type="submit">
                  Login
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
