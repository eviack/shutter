import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostValidation } from "@/utils/validator";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { useCreatePost, useUpdatePost } from "@/appwrite/react-query/Mutations";
import { userContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

const PostForm = ({post, action}) => {
  const {user} = userContext()
  const navigate = useNavigate()

  const {toast} = useToast()
  const {mutateAsync: createUserPost, isPending: isCreatingPost} = useCreatePost()
  const {mutateAsync: updateUserPost, isPending: isUpdating} = useUpdatePost()



  const form = useForm({
      resolver: zodResolver(PostValidation),
      defaultValues: {
        caption: post ? post?.caption : "",
        file: [],
        location: post ? post.location : "",
        tags: post ? post.tags.join(",") : "",
      },
    });

  

 async function create(values) {
  if(post && action=="Update"){
    const updatedPost = await updateUserPost({
      ...values,
      postId: post?.$id,
      imageId: post?.imageId,
      imageUrl: post?.imageUrl
    })

    if(!updatedPost){
      toast({title:"Error updating post, try again"})
    }

    navigate(`/posts/${post.$id}`)
    return
  }

    const newPost = await createUserPost({
      ...values,
      userId: user.id,

    })

    if(!newPost){
      toast({title:"Error creating post, try again"})
    }

    navigate('/')
    
  }




  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(create)}
        className="flex flex-col gap-9 w-full  max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Upload image</FormLabel>
              <FormControl>
                <FileUploader fieldChange = {field.onChange} mediaUrl={post?.imageUrl}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Enter the location of this pic"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Hashtags (seperated by comma ',')
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Art, Music, Love..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-end items-center">
        <Button type='button' onClick={() => navigate(-1)} className="shad-button_dark_4 ">
        Cancel Post
        </Button>
        <Button type="submit" className="shad-button_primary whitespace-nowrap"
        disabled={isCreatingPost || isUpdating}>

          {(isCreatingPost || isUpdating) && <Loader/>} {action} Post
          
          </Button>
            
        </div>
       
      </form>
    </Form>
  );
};

export default PostForm;
