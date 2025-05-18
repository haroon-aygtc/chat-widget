export interface AIModel {
  id: string;
  name: string;
  provider: string;
  version: string;
  description: string;
  capabilities: string[];
  parameters: {
    temperature: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
  contextLength: number;
  status: "active" | "inactive" | "deprecated";
  createdAt: string;
  updatedAt: string;
  prompts: Prompt[];
}

export interface Prompt {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
}
