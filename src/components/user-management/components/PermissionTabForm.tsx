import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Permission, PermissionFormValues } from "../types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PermissionTabFormProps {
  onSubmit: (data: PermissionFormValues) => void;
  permission: Permission | null;
}

const permissionFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
});

const PermissionTabForm: React.FC<PermissionTabFormProps> = ({
  onSubmit,
  permission,
}) => {
  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionFormSchema),
    defaultValues: {
      name: permission?.name || "",
      description: permission?.description || "",
      category: permission?.category || "",
    },
  });

  React.useEffect(() => {
    if (permission) {
      form.reset({
        name: permission.name,
        description: permission.description,
        category: permission.category,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        category: "",
      });
    }
  }, [permission, form]);

  const handleSubmit = (data: PermissionFormValues) => {
    onSubmit(data);
    form.reset();
  };

  // Common permission categories
  const categories = [
    "Users",
    "Roles",
    "Permissions",
    "Content",
    "Settings",
    "Analytics",
    "Billing",
    "System",
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="users.create" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Permission description"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            {permission ? "Update Permission" : "Create Permission"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PermissionTabForm;
