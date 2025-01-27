'use client';
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { mutate } from 'swr';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useModal } from "@/app/contexts/Modal/ModalContext";

const reviewFormSchema = z.object({
  author: z.string().min(2).max(30).default('anonymous'),
  tasteRating: z.number().min(0, {
    message: "Must be greater than 0"
  }).max(10, {
    message: "Must be less than 10"
  }),
  valueRating: z.number().min(0, {
    message: "Must be greater than 0"
  }).max(10, {
    message: "Must be less than 10"
  }),
  serviceRating: z.number().min(0, {
    message: "Must be greater than 0"
  }).max(10, {
    message: "Must be less than 10"
  }),
  description: z.string().min(0).max(150),
});
interface AddReviewProps {
  id: string;
}

const AddReview = ({ id }: AddReviewProps) => {
  const { closeModal } = useModal()
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      author: "anonymous",
      tasteRating: 5,
      valueRating: 5,
      serviceRating: 5,
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeId: id,
          ...values,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      closeModal();
      mutate(`/api/review?id=${id}`);
    } catch (error) {
      console.error(`Error saving review to db ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-5">
      <div>
        <h2 className="text-xl text-matchaGreen font-bold mb-4">Add New Matcha Review</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((onSubmit))} className="space-y-8">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="anonymous" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tasteRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Taste Rating (0-10)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valueRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value Rating (0-10)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Rating (0-10)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Write your review..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isLoading ? (<Button type="submit">Submit</Button>) : (<p>Loading...</p>)}
          </form>
        </Form>
      </div>
    </div>
  )
};

export default AddReview;
