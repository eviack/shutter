import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(3, {message:"Too short"}).max(20, {message:"Too long"}),
    username: z.string().min(3, {message:"Too short"} ).max(20, {message:"Too long"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"})
})

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"})
})

export const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
    file: z.custom(),
    location: z.string().max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
  });


  export const ProfileValidation = z.object({
    file: z.custom(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
  });
  