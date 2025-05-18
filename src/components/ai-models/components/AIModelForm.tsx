import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AIModel } from "../types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface AIModelFormProps {
  onSubmit: (data: any) => void;
  model: AIModel | null;
}

const modelFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  provider: z.string().min(1, { message: "Provider is required" }),
  version: z.string().min(1, { message: "Version is required" }),
  description: z.string().min(5, { message: "Description is required" }),
  capabilities: z.array(z.string()),
  parameters: z.object({
    temperature: z.number().min(0).max(1),
    topP: z.number().min(0).max(1),
    frequencyPenalty: z.number().min(0).max(2),
    presencePenalty: z.number().min(0).max(2),
  }),
  contextLength: z.number().min(1),
  status: z.enum(["active", "inactive", "deprecated"]),
});

const AIModelForm: React.FC<AIModelFormProps> = ({ onSubmit, model }) => {
  const form = useForm({
    resolver: zodResolver(modelFormSchema),
    defaultValues: {
      name: model?.name || "",
      provider: model?.provider || "",
      version: model?.version || "",
      description: model?.description || "",
      capabilities: model?.capabilities || [],
      parameters: {
        temperature: model?.parameters?.temperature || 0.7,
        topP: model?.parameters?.topP || 1,
        frequencyPenalty: model?.parameters?.frequencyPenalty || 0,
        presencePenalty: model?.parameters?.presencePenalty || 0,
      },
      contextLength: model?.contextLength || 4096,
      status: model?.status || "active",
    },
  });

  React.useEffect(() => {
    if (model) {
      form.reset({
        name: model.name,
        provider: model.provider,
        version: model.version,
        description: model.description,
        capabilities: model.capabilities,
        parameters: {
          temperature: model.parameters.temperature,
          topP: model.parameters.topP,
          frequencyPenalty: model.parameters.frequencyPenalty,
          presencePenalty: model.parameters.presencePenalty,
        },
        contextLength: model.contextLength,
        status: model.status,
      });
    } else {
      form.reset({
        name: "",
        provider: "",
        version: "",
        description: "",
        capabilities: [],
        parameters: {
          temperature: 0.7,
          topP: 1,
          frequencyPenalty: 0,
          presencePenalty: 0,
        },
        contextLength: 4096,
        status: "active",
      });
    }
  }, [model, form]);

  const handleSubmit = (data: any) => {
    onSubmit(data);
    form.reset();
  };

  const providers = [
    "OpenAI",
    "Anthropic",
    "Google",
    "Cohere",
    "Mistral",
    "Custom",
  ];
  const capabilities = [
    { id: "text-generation", label: "Text Generation" },
    { id: "chat-completion", label: "Chat Completion" },
    { id: "embeddings", label: "Embeddings" },
    { id: "function-calling", label: "Function Calling" },
    { id: "image-generation", label: "Image Generation" },
    { id: "code-generation", label: "Code Generation" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-4 rounded-lg border">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name</FormLabel>
                <FormControl>
                  <Input placeholder="GPT-4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-4 rounded-lg border">
          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Version</FormLabel>
                <FormControl>
                  <Input placeholder="1.0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contextLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Context Length (tokens)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="4096"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-muted/20 p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-3">Model Description</h3>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the AI model and its capabilities"
                    className="resize-none min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-muted/20 p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-3">Model Capabilities</h3>
          <FormField
            control={form.control}
            name="capabilities"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Capabilities</FormLabel>
                  <FormDescription>
                    Select the capabilities of this AI model
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {capabilities.map((capability) => (
                    <div
                      key={capability.id}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(capability.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, capability.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== capability.id,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <span className="font-medium">{capability.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-muted/20 p-4 rounded-lg border">
          <h3 className="text-sm font-medium">Model Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="parameters.temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature (0-1)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      placeholder="0.7"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Controls randomness: Lower values are more deterministic
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parameters.topP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Top P (0-1)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      placeholder="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Controls diversity via nucleus sampling
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="parameters.frequencyPenalty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency Penalty (0-2)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Reduces repetition of token sequences
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parameters.presencePenalty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presence Penalty (0-2)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Increases likelihood of discussing new topics
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-muted/20 p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-3">Model Status</h3>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="active" />
                      </FormControl>
                      <FormLabel className="font-normal">Active</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="inactive" />
                      </FormControl>
                      <FormLabel className="font-normal">Inactive</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="deprecated" />
                      </FormControl>
                      <FormLabel className="font-normal">Deprecated</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {model ? "Update AI Model" : "Create AI Model"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AIModelForm;
