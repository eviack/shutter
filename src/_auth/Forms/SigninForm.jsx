import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../../components/ui/input";
import Logo from "@/components/shared/Logo";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/utils/validator";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { useLoginUser } from "@/appwrite/react-query/Mutations";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import { userContext } from "@/context/AuthContext";

function SignupForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: LoginUser, isPending: isLogging } = useLoginUser();
  const { checkAuthUser, isLoading: isUserLoading } = userContext();

  const form = useForm({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const handleSignin = async (user) => {
    try {
      const session = await LoginUser(user);

      if (!session) {
        toast({ title: "Login failed. Please try again." });

        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });

        return;
      }
    } catch (error) {
      toast({title: error.message})

      console.error(error)
    }
  };

  return (
    <Form {...form}>
      <div className="flex-center flex-col">
        <Logo />

        <h2 className="h3-bold md:h2-bold sm:pt-12">
          Welcome back ! Let's shutter
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          To use shutter, please login with your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="gap-2 mt-4 w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    type="email"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {isLogging || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Logging you in...
              </div>
            ) : (
              "SignIn"
            )}
          </Button>
          <p className="small-semibold text-light-2 text-center mt-2">
            Don't have an account ?
            <Link
              to="/sign-up"
              className="text-primary-500 small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignupForm;
