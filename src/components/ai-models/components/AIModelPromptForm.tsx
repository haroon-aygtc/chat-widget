import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AIModel, Prompt } from "../types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";

interface AIModelPromptFormProps {
  onSubmit: (data: any) => void;
  model: AIModel | null;
}

const promptFormSchema = z.object({
  prompts: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, { message: "Name is required" }),
      description: z.string(),
      content: z.string().min(1, { message: "Prompt content is required" }),
      category: z.string(),
    }),
  ),
});

const AIModelPromptForm: React.FC<AIModelPromptFormProps> = ({
  onSubmit,
  model,
}) => {
  const [activePromptIndex, setActivePromptIndex] = useState<number | null>(
    null,
  );

  const form = useForm({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      prompts: model?.prompts || [],
    },
  });

  const { fields, append, remove, swap, update } = form.useFieldArray({
    name: "prompts",
  });

  React.useEffect(() => {
    if (model) {
      form.reset({
        prompts: model.prompts || [],
      });
    } else {
      form.reset({
        prompts: [],
      });
    }
  }, [model, form]);

  const handleSubmit = (data: any) => {
    onSubmit(data);
    form.reset();
  };

  const addNewPrompt = () => {
    append({
      id: Date.now().toString(),
      name: "",
      description: "",
      content: "",
      category: "general",
    });
    setActivePromptIndex(fields.length);
  };

  const promptCategories = [
    "general",
    "customer-support",
    "sales",
    "onboarding",
    "technical",
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-4xl"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Custom Prompts</h3>
          <Button type="button" onClick={addNewPrompt} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Prompt
          </Button>
        </div>

        {fields.length === 0 ? (
          <div className="text-center py-8 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">No prompts configured</p>
            <Button
              type="button"
              onClick={addNewPrompt}
              variant="outline"
              className="mt-4"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Your First Prompt
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 space-y-2 border-r pr-4">
              {fields.map((prompt, index) => (
                <Card
                  key={prompt.id}
                  className={`cursor-pointer transition-all ${activePromptIndex === index ? "border-primary" : ""}`}
                  onClick={() => setActivePromptIndex(index)}
                >
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {form.watch(`prompts.${index}.name`) ||
                          "Unnamed Prompt"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {form.watch(`prompts.${index}.category`)}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            swap(index, index - 1);
                            setActivePromptIndex(index - 1);
                          }}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                      )}
                      {index < fields.length - 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            swap(index, index + 1);
                            setActivePromptIndex(index + 1);
                          }}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(index);
                          if (activePromptIndex === index) {
                            setActivePromptIndex(null);
                          } else if (
                            activePromptIndex &&
                            activePromptIndex > index
                          ) {
                            setActivePromptIndex(activePromptIndex - 1);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="col-span-12 md:col-span-8">
              {activePromptIndex !== null &&
              activePromptIndex < fields.length ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`prompts.${activePromptIndex}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prompt Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Customer Support Greeting"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`prompts.${activePromptIndex}.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              {promptCategories.map((category) => (
                                <option key={category} value={category}>
                                  {category.charAt(0).toUpperCase() +
                                    category.slice(1)}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`prompts.${activePromptIndex}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Brief description of this prompt's purpose"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`prompts.${activePromptIndex}.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prompt Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the prompt template here..."
                            className="min-h-[200px] font-mono text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Use {"{"}
                          {"}"} for variables, e.g. {{ user_name }}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full border rounded-md p-12">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-medium mb-2">
                      {fields.length > 0
                        ? "Select a prompt from the list to edit"
                        : "Add a prompt to get started"}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      {fields.length > 0
                        ? "Click on any prompt in the left sidebar to edit its details"
                        : "Create custom prompts to standardize AI responses for different use cases"}
                    </p>
                    {fields.length === 0 && (
                      <Button
                        type="button"
                        onClick={addNewPrompt}
                        className="mt-4"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Prompt
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit">Save Prompts</Button>
        </div>
      </form>
    </Form>
  );
};

export default AIModelPromptForm;
