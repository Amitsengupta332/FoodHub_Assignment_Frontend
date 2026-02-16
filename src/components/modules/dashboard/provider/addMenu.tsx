"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { createMeal } from "@/actions/meal.actions";

const mealSchema = z.object({
  name: z.string().min(2, "Meal name is required").max(50),
  description: z.string().min(10, "Description is required").max(200),
  price: z.number().min(1, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid image URL"),
  isAvailable: z.boolean(),
});

export function CreateMealForm({ categoriesData }: any) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      image: "",
      isAvailable: true,
    },
    validators: {
      onSubmit: mealSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name,
        description: value.description,
        price: value.price,
        image: value.image,
        categoryId: value.categoryId,
        isAvailable: value.isAvailable,
      };

      const result = await createMeal(payload);

      if (result?.data && !result?.error) {
        toast.success("Meal created successfully!");
        form.reset();
        router.refresh();
      } else {
        toast.error(result?.error?.message || "Failed to create meal");
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-2xl mx-auto mt-5">
      <CardHeader>
        <CardTitle>Create Meal</CardTitle>
        <CardDescription>
          Fill in the details to add a new meal.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="meal-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(e);
          }}
          className="space-y-4">
          <FieldGroup>
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Meal Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Japanese Food"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        rows={4}
                        className="min-h-24 resize-none"
                        placeholder="This is a delicious meal..."
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value.length}/200
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Price */}
            <form.Field
              name="price"
              children={(field) => (
                <div>
                  <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </div>
              )}
            />

            {/* Category */}
            <form.Field
              name="categoryId"
              children={(field) => (
                <div>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <Select
                    onValueChange={field.handleChange}
                    value={field.state.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(categoriesData?.data || []).map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors?.length > 0 && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </div>
              )}
            />

            {/* ✅ Image URL (No Upload) */}
            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      placeholder="https://example.com/meal.jpg"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="off"
                    />

                    {/* Preview */}
                    {field.state.value && (
                      <img
                        src={field.state.value}
                        alt="Preview"
                        className="mt-2 w-32 h-32 object-cover rounded border"
                      />
                    )}

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Available */}
            <form.Field
              name="isAvailable"
              children={(field) => (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                  <FieldLabel>Available</FieldLabel>
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="meal-form">
          Create Meal
        </Button>
      </CardFooter>
    </Card>
  );
}
