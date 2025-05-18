import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Plus,
  Settings,
  ArrowLeft,
  Sliders,
  MessageSquare,
  Bot,
} from "lucide-react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { mockAIModels } from "./data";
import { AIModel } from "./types";

// Import components
import AIModelsList from "./components/AIModelsList";
import AIModelForm from "./components/AIModelForm";
import AIModelPromptForm from "./components/AIModelPromptForm";

const AIModelManagement = () => {
  const [activeTab, setActiveTab] = useState("models-list");
  const [aiModels, setAIModels] = useState<AIModel[]>(mockAIModels);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);

  // AI Model CRUD operations
  const handleCreateModel = (modelData: any) => {
    const newModel: AIModel = {
      id: Date.now().toString(),
      name: modelData.name,
      provider: modelData.provider,
      version: modelData.version,
      description: modelData.description,
      capabilities: modelData.capabilities,
      parameters: modelData.parameters,
      contextLength: modelData.contextLength,
      status: modelData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      prompts: [],
    };
    setAIModels([...aiModels, newModel]);
    setActiveTab("models-list");
  };

  const handleUpdateModel = (modelData: any) => {
    if (!editingModel) return;

    const updatedModels = aiModels.map((model) => {
      if (model.id === editingModel.id) {
        return {
          ...model,
          name: modelData.name,
          provider: modelData.provider,
          version: modelData.version,
          description: modelData.description,
          capabilities: modelData.capabilities,
          parameters: modelData.parameters,
          contextLength: modelData.contextLength,
          status: modelData.status,
          updatedAt: new Date().toISOString(),
        };
      }
      return model;
    });

    setAIModels(updatedModels);
    setActiveTab("models-list");
    setEditingModel(null);
  };

  const handleDeleteModel = (modelId: string) => {
    setAIModels(aiModels.filter((model) => model.id !== modelId));
  };

  const handleEditModel = (model: AIModel) => {
    setEditingModel(model);
    setActiveTab("model-form");
  };

  const handleConfigurePrompts = (model: AIModel) => {
    setEditingModel(model);
    setActiveTab("prompt-form");
  };

  const handleSavePrompts = (promptData: any) => {
    if (!editingModel) return;

    const updatedModels = aiModels.map((model) => {
      if (model.id === editingModel.id) {
        return {
          ...model,
          prompts: promptData.prompts || [],
          updatedAt: new Date().toISOString(),
        };
      }
      return model;
    });

    setAIModels(updatedModels);
    setActiveTab("models-list");
    setEditingModel(null);
  };

  // Filter functions based on search query
  const filteredModels = aiModels.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Helper function to determine if we're in a form view
  const isFormView = activeTab === "model-form" || activeTab === "prompt-form";

  // Helper function to get the appropriate back button target
  const getBackTarget = () => {
    return "models-list";
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      <Header
        title="AI Model Management"
        description="Configure and manage AI models for your chat widgets"
      />

      {!isFormView ? (
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>

          <div>
            {activeTab === "models-list" && (
              <Button onClick={() => setActiveTab("model-form")}>
                <Plus className="mr-2 h-4 w-4" /> Add AI Model
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => {
              setActiveTab(getBackTarget());
              setEditingModel(null);
            }}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
          </Button>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full md:w-[400px]">
          <TabsTrigger
            value="models-list"
            className="flex items-center"
            disabled={isFormView}
          >
            <Brain className="mr-2 h-4 w-4" /> AI Models
          </TabsTrigger>
        </TabsList>

        {/* AI Models List Tab */}
        <TabsContent value="models-list" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>AI Models</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <AIModelsList
                models={filteredModels}
                onEdit={handleEditModel}
                onDelete={handleDeleteModel}
                onConfigurePrompts={handleConfigurePrompts}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Model Form Tab */}
        <TabsContent value="model-form" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>
                {editingModel ? "Edit AI Model" : "Create AI Model"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <AIModelForm
                onSubmit={editingModel ? handleUpdateModel : handleCreateModel}
                model={editingModel}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prompt Configuration Tab */}
        <TabsContent value="prompt-form" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Configure Prompts for {editingModel?.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <AIModelPromptForm
                onSubmit={handleSavePrompts}
                model={editingModel}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>API Keys for {editingModel?.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium">API Key</label>
                      <div className="flex mt-1">
                        <Input
                          type="password"
                          value="sk_test_51M9LqHSIKYhXXXXXXXXXXXXXX"
                          className="rounded-r-none font-mono text-sm"
                          readOnly
                        />
                        <Button
                          variant="outline"
                          className="rounded-l-none border-l-0"
                          onClick={() => alert("API key copied to clipboard")}
                        >
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Production API key for live environment
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Test API Key
                      </label>
                      <div className="flex mt-1">
                        <Input
                          type="password"
                          value="sk_test_51M9LqHSIKYhXXXXXXXXXXXXXX"
                          className="rounded-r-none font-mono text-sm"
                          readOnly
                        />
                        <Button
                          variant="outline"
                          className="rounded-l-none border-l-0"
                          onClick={() =>
                            alert("Test API key copied to clipboard")
                          }
                        >
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Test API key for development environment
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">
                      API Key Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium">
                          Rate Limit
                        </label>
                        <div className="flex mt-1 items-center gap-2">
                          <Input
                            type="number"
                            defaultValue="100"
                            className="w-24"
                          />
                          <span className="text-sm text-muted-foreground">
                            requests per minute
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Usage Quota
                        </label>
                        <div className="flex mt-1 items-center gap-2">
                          <Input
                            type="number"
                            defaultValue="10000"
                            className="w-24"
                          />
                          <span className="text-sm text-muted-foreground">
                            tokens per month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">Access Control</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium">
                          Allowed Domains
                        </label>
                        <Input
                          placeholder="example.com, app.example.com"
                          defaultValue="*"
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Comma-separated list or * for all domains
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          IP Restrictions
                        </label>
                        <Input
                          placeholder="192.168.1.1, 10.0.0.0/24"
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Comma-separated list or leave empty for no
                          restrictions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Regenerate Keys</Button>
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelManagement;
