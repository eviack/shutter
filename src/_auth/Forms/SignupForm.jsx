import React, { useState } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/utils/validator";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser, useLoginUser } from "@/appwrite/react-query/Mutations";
import { useToast } from "@/hooks/use-toast";
import { userContext } from "@/context/AuthContext";

function SignupForm() {
  const {toast} = useToast()
  const navigate = useNavigate()

  const {checkAuthUser, isLoading} = userContext()
  const {mutateAsync: createUser, isPending: isCreating} = useCreateUser()
  const {mutateAsync: LoginUser, isPending: isLogging} = useLoginUser()

  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });


  const create = async(data) => {
    try {
        const userData = await createUser(data)
        if(!userData){
          toast({
            title: "Sign up failed ! Please try again"
          })
        }

        const session = await LoginUser({email:data.email, password:data.password})

        if(!session){
          toast({
            title: "Sign in failed ! Please try again"
          })
          navigate("/sign-in")

          return
        }

        const isLoggedIn = await checkAuthUser()

        if(isLoggedIn){
          form.reset()
          navigate("/")
          toast({title:"Signed in sucessfully!"})

        }else{
          toast({title:"Sign up failed. Please try again."})
          return
        }

    } catch (error) {
        console.log(error)
    }
}

  return (
    <Form {...form}>
      <div className="flex-center flex-col">
        <Logo />

        <h2 className="h3-bold md:h2-bold sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">
          To use shutter, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(create)}
          className="gap-2 mt-4 w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
                    type="text
                 "
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
                    type="text"
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
                    placeholder="Create a password"
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
            {isCreating || isLoading || isLogging ? (
              <div className="flex-center gap-2">
                <Loader /> Signing you in...
              </div>
            ) : (
              "SignUp"
            )}
          </Button>
          <p className="small-semibold text-light-2 text-center mt-2">
            Already have an account ?
            <Link
              to="/sign-in"
              className="text-primary-500 small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignupForm;
