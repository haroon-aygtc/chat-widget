import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import {
  Palette,
  MessageSquare,
  Settings,
  Cpu,
  Save,
  X,
  Code,
} from "lucide-react";
import { ColorPicker } from "@/components/ui/color-picker";

interface WidgetCreatorProps {
  widgetId?: string;
  onSave?: (widgetData: any) => void;
  onCancel?: () => void;
  onGenerateCode?: () => void;
}

const PRESET_THEMES = [
  { name: "Blue", primary: "#3b82f6", secondary: "#f3f4f6", text: "#111827" },
  { name: "Purple", primary: "#8b5cf6", secondary: "#f5f3ff", text: "#1e1b4b" },
  { name: "Green", primary: "#10b981", secondary: "#ecfdf5", text: "#064e3b" },
  { name: "Red", primary: "#ef4444", secondary: "#fef2f2", text: "#7f1d1d" },
  { name: "Orange", primary: "#f97316", secondary: "#fff7ed", text: "#7c2d12" },
  { name: "Dark", primary: "#1f2937", secondary: "#f9fafb", text: "#111827" },
];

const WidgetCreator = ({
  widgetId,
  onSave = () => {},
  onCancel = () => {},
  onGenerateCode = () => {},
}: WidgetCreatorProps) => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [previewMode, setPreviewMode] = useState("desktop");
  const [previewState, setPreviewState] = useState("open");
  const [previewPosition, setPreviewPosition] = useState("bottom-right");
  const [previewScale, setPreviewScale] = useState(1);

  const [widgetData, setWidgetData] = useState({
    name: widgetId ? "Customer Support Widget" : "New Widget",
    appearance: {
      primaryColor: "#3b82f6",
      secondaryColor: "#f3f4f6",
      textColor: "#111827",
      borderRadius: 8,
      position: "bottom-right",
      width: 350,
      height: 500,
      fontFamily: "Inter",
      iconType: "chat",
    },
    behavior: {
      autoOpen: false,
      greeting: "Hello! How can I help you today?",
      placeholder: "Type your message here...",
      responseDelay: 500,
      showTimestamp: true,
      persistConversation: true,
      collectUserInfo: false,
    },
    aiModel: {
      modelId: "gpt-3.5",
      temperature: 0.7,
      maxTokens: 150,
      contextPrompt: "You are a helpful customer support assistant.",
    },
  });

  // Update preview position when widget position changes
  useEffect(() => {
    setPreviewPosition(widgetData.appearance.position);
  }, [widgetData.appearance.position]);

  const handleAppearanceChange = (field: string, value: any) => {
    setWidgetData({
      ...widgetData,
      appearance: {
        ...widgetData.appearance,
        [field]: value,
      },
    });
  };

  const handleBehaviorChange = (field: string, value: any) => {
    setWidgetData({
      ...widgetData,
      behavior: {
        ...widgetData.behavior,
        [field]: value,
      },
    });
  };

  const handleAIModelChange = (field: string, value: any) => {
    setWidgetData({
      ...widgetData,
      aiModel: {
        ...widgetData.aiModel,
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    onSave(widgetData);
  };

  const positionOptions = [
    { value: "bottom-right", label: "Bottom Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "top-right", label: "Top Right" },
    { value: "top-left", label: "Top Left" },
  ];

  const fontOptions = [
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
    { value: "Montserrat", label: "Montserrat" },
  ];

  const iconOptions = [
    { value: "chat", label: "Chat Bubble" },
    { value: "message", label: "Message" },
    { value: "help", label: "Help" },
    { value: "support", label: "Support" },
  ];

  const aiModelOptions = [
    { value: "gpt-3.5", label: "GPT-3.5" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "claude-2", label: "Claude 2" },
    { value: "custom", label: "Custom Model" },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <h2 className="text-xl font-semibold">
          {widgetId ? "Edit Widget" : "Create New Widget"}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Widget
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-h-[800px]">
        {/* Left side - Configuration */}
        <div className="w-1/2 border-r overflow-y-auto p-4">
          <Input
            className="mb-4"
            placeholder="Widget Name"
            value={widgetData.name}
            onChange={(e) =>
              setWidgetData({ ...widgetData, name: e.target.value })
            }
          />

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="appearance" className="flex items-center">
                <Palette className="mr-2 h-4 w-4" /> Appearance
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" /> Behavior
              </TabsTrigger>
              <TabsTrigger value="aiModel" className="flex items-center">
                <Cpu className="mr-2 h-4 w-4" /> AI Model
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Theme Presets</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {PRESET_THEMES.map((theme, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-auto p-2 flex flex-col items-center justify-center gap-1 hover:border-primary"
                            onClick={() => {
                              handleAppearanceChange(
                                "primaryColor",
                                theme.primary,
                              );
                              handleAppearanceChange(
                                "secondaryColor",
                                theme.secondary,
                              );
                              handleAppearanceChange("textColor", theme.text);
                            }}
                          >
                            <div className="flex gap-1">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: theme.primary }}
                              />
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: theme.secondary }}
                              />
                            </div>
                            <span className="text-xs">{theme.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <ColorPicker
                        color={widgetData.appearance.primaryColor}
                        onChange={(color) =>
                          handleAppearanceChange("primaryColor", color)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <ColorPicker
                        color={widgetData.appearance.secondaryColor}
                        onChange={(color) =>
                          handleAppearanceChange("secondaryColor", color)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <ColorPicker
                        color={widgetData.appearance.textColor}
                        onChange={(color) =>
                          handleAppearanceChange("textColor", color)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Border Radius: {widgetData.appearance.borderRadius}px
                      </Label>
                      <Slider
                        min={0}
                        max={20}
                        step={1}
                        value={[widgetData.appearance.borderRadius]}
                        onValueChange={(value) =>
                          handleAppearanceChange("borderRadius", value[0])
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Position</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {positionOptions.map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={
                              widgetData.appearance.position === option.value
                                ? "default"
                                : "outline"
                            }
                            className="justify-start"
                            onClick={() => {
                              handleAppearanceChange("position", option.value);
                              setPreviewPosition(option.value);
                            }}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>Preview Scale: {previewScale.toFixed(1)}x</Label>
                      <Slider
                        min={0.5}
                        max={1.5}
                        step={0.1}
                        value={[previewScale]}
                        onValueChange={(value) => setPreviewScale(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Width: {widgetData.appearance.width}px</Label>
                      <Slider
                        min={250}
                        max={500}
                        step={10}
                        value={[widgetData.appearance.width]}
                        onValueChange={(value) =>
                          handleAppearanceChange("width", value[0])
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Height: {widgetData.appearance.height}px</Label>
                      <Slider
                        min={300}
                        max={700}
                        step={10}
                        value={[widgetData.appearance.height]}
                        onValueChange={(value) =>
                          handleAppearanceChange("height", value[0])
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {fontOptions.map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={
                              widgetData.appearance.fontFamily === option.value
                                ? "default"
                                : "outline"
                            }
                            className="justify-start"
                            style={{ fontFamily: option.value }}
                            onClick={() =>
                              handleAppearanceChange("fontFamily", option.value)
                            }
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Icon Type</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {iconOptions.map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={
                              widgetData.appearance.iconType === option.value
                                ? "default"
                                : "outline"
                            }
                            className="h-auto py-2 px-3"
                            onClick={() =>
                              handleAppearanceChange("iconType", option.value)
                            }
                          >
                            {option.value === "chat" && (
                              <MessageSquare className="h-4 w-4 mx-auto mb-1" />
                            )}
                            {option.value === "message" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-auto mb-1"
                              >
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                              </svg>
                            )}
                            {option.value === "help" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-auto mb-1"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                            )}
                            {option.value === "support" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-auto mb-1"
                              >
                                <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z"></path>
                              </svg>
                            )}
                            <span className="text-xs">{option.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-open" className="mb-1 block">
                        Auto Open
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically open chat when page loads
                      </p>
                    </div>
                    <Switch
                      id="auto-open"
                      checked={widgetData.behavior.autoOpen}
                      onCheckedChange={(checked) => {
                        handleBehaviorChange("autoOpen", checked);
                        if (checked) setPreviewState("open");
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Greeting Message</Label>
                    <Textarea
                      placeholder="Enter greeting message"
                      value={widgetData.behavior.greeting}
                      onChange={(e) =>
                        handleBehaviorChange("greeting", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Input Placeholder</Label>
                    <Input
                      placeholder="Enter placeholder text"
                      value={widgetData.behavior.placeholder}
                      onChange={(e) =>
                        handleBehaviorChange("placeholder", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Response Delay: {widgetData.behavior.responseDelay}ms
                    </Label>
                    <Slider
                      min={0}
                      max={2000}
                      step={100}
                      value={[widgetData.behavior.responseDelay]}
                      onValueChange={(value) =>
                        handleBehaviorChange("responseDelay", value[0])
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-timestamp" className="mb-1 block">
                        Show Timestamp
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Display time for each message
                      </p>
                    </div>
                    <Switch
                      id="show-timestamp"
                      checked={widgetData.behavior.showTimestamp}
                      onCheckedChange={(checked) =>
                        handleBehaviorChange("showTimestamp", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="persist-conversation"
                        className="mb-1 block"
                      >
                        Persist Conversation
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Save chat history between sessions
                      </p>
                    </div>
                    <Switch
                      id="persist-conversation"
                      checked={widgetData.behavior.persistConversation}
                      onCheckedChange={(checked) =>
                        handleBehaviorChange("persistConversation", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="collect-user-info" className="mb-1 block">
                        Collect User Info
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Ask for name and email before chat
                      </p>
                    </div>
                    <Switch
                      id="collect-user-info"
                      checked={widgetData.behavior.collectUserInfo}
                      onCheckedChange={(checked) =>
                        handleBehaviorChange("collectUserInfo", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="aiModel" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>AI Model</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {aiModelOptions.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={
                            widgetData.aiModel.modelId === option.value
                              ? "default"
                              : "outline"
                          }
                          className="justify-start"
                          onClick={() =>
                            handleAIModelChange("modelId", option.value)
                          }
                        >
                          {option.value === "gpt-3.5" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                              <polyline points="3.29 7 12 12 20.71 7"></polyline>
                              <line x1="12" y1="22" x2="12" y2="12"></line>
                            </svg>
                          )}
                          {option.value === "gpt-4" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                              <path d="M12 6v2"></path>
                              <path d="M12 16v2"></path>
                            </svg>
                          )}
                          {option.value === "claude-2" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                          )}
                          {option.value === "custom" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                          )}
                          {option.label}
                        </Button>
                      ))}
                    </div>

                    {widgetData.aiModel.modelId === "custom" && (
                      <div className="mt-2">
                        <Input
                          placeholder="Enter custom model name or endpoint"
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Temperature: {widgetData.aiModel.temperature}</Label>
                    <Slider
                      min={0}
                      max={1}
                      step={0.1}
                      value={[widgetData.aiModel.temperature]}
                      onValueChange={(value) =>
                        handleAIModelChange("temperature", value[0])
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max Tokens: {widgetData.aiModel.maxTokens}</Label>
                    <Slider
                      min={50}
                      max={500}
                      step={10}
                      value={[widgetData.aiModel.maxTokens]}
                      onValueChange={(value) =>
                        handleAIModelChange("maxTokens", value[0])
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Context Prompt</Label>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Load Template
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Enter context prompt"
                      value={widgetData.aiModel.contextPrompt}
                      onChange={(e) =>
                        handleAIModelChange("contextPrompt", e.target.value)
                      }
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This prompt provides context to the AI about how it should
                      respond to users.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right side - Preview */}
        <div className="w-1/2 p-4 flex flex-col bg-background">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium mb-1">Live Preview</h3>
              <p className="text-sm text-muted-foreground">
                Changes appear in real-time as you customize
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex bg-muted rounded-md p-0.5">
                <Button
                  variant={previewMode === "mobile" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                  className="flex items-center gap-1 h-8 px-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                  </svg>
                  <span className="text-xs">Mobile</span>
                </Button>
                <Button
                  variant={previewMode === "tablet" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("tablet")}
                  className="flex items-center gap-1 h-8 px-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                  <span className="text-xs">Tablet</span>
                </Button>
                <Button
                  variant={previewMode === "desktop" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                  className="flex items-center gap-1 h-8 px-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" ry="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  <span className="text-xs">Desktop</span>
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPreviewState(previewState === "open" ? "closed" : "open")
                }
              >
                {previewState === "open" ? "Show Closed" : "Show Open"}
              </Button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg relative overflow-hidden border border-dashed border-muted-foreground/30">
            {previewState === "closed" && (
              <div
                className="absolute shadow-lg cursor-pointer animate-pulse transition-all duration-300"
                style={{
                  bottom: previewPosition.includes("bottom") ? "20px" : "auto",
                  top: previewPosition.includes("top") ? "20px" : "auto",
                  right: previewPosition.includes("right") ? "20px" : "auto",
                  left: previewPosition.includes("left") ? "20px" : "auto",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: widgetData.appearance.primaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${previewScale})`,
                  transition: "all 0.3s ease",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            )}

            {previewState === "open" && (
              <div
                className="relative shadow-lg transition-all duration-300"
                style={{
                  width:
                    previewMode === "mobile"
                      ? "320px"
                      : previewMode === "tablet"
                        ? "480px"
                        : `${widgetData.appearance.width}px`,
                  height:
                    previewMode === "mobile"
                      ? "520px"
                      : previewMode === "tablet"
                        ? "640px"
                        : `${widgetData.appearance.height}px`,
                  borderRadius: `${widgetData.appearance.borderRadius}px`,
                  fontFamily: widgetData.appearance.fontFamily,
                  backgroundColor: widgetData.appearance.secondaryColor,
                  color: widgetData.appearance.textColor,
                  transform: `scale(${previewScale})`,
                  transition: "all 0.3s ease",
                }}
              >
                {/* Widget Header */}
                <div
                  className="p-4 flex items-center justify-between"
                  style={{
                    backgroundColor: widgetData.appearance.primaryColor,
                    color: "#ffffff",
                    borderTopLeftRadius: `${widgetData.appearance.borderRadius}px`,
                    borderTopRightRadius: `${widgetData.appearance.borderRadius}px`,
                  }}
                >
                  <h3 className="font-medium">Chat Support</h3>
                  <button className="text-white hover:opacity-80">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Widget Body */}
                <div className="p-4 h-[calc(100%-120px)] overflow-y-auto">
                  {/* AI Message */}
                  <div className="flex mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 mr-2" />
                    <div
                      className="bg-white p-3 rounded-lg max-w-[80%]"
                      style={{
                        borderRadius: `${widgetData.appearance.borderRadius}px`,
                      }}
                    >
                      <p className="text-sm">{widgetData.behavior.greeting}</p>
                      {widgetData.behavior.showTimestamp && (
                        <span className="text-xs text-gray-500 block mt-1">
                          12:05 PM
                        </span>
                      )}
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex mb-4 justify-end">
                    <div
                      className="p-3 rounded-lg max-w-[80%]"
                      style={{
                        backgroundColor: widgetData.appearance.primaryColor,
                        color: "#ffffff",
                        borderRadius: `${widgetData.appearance.borderRadius}px`,
                      }}
                    >
                      <p className="text-sm">
                        Hello, I need help with my order.
                      </p>
                      {widgetData.behavior.showTimestamp && (
                        <span className="text-xs text-gray-200 block mt-1">
                          12:06 PM
                        </span>
                      )}
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 mr-2" />
                    <div
                      className="bg-white p-3 rounded-lg max-w-[80%]"
                      style={{
                        borderRadius: `${widgetData.appearance.borderRadius}px`,
                      }}
                    >
                      <p className="text-sm">
                        I'd be happy to help with your order. Could you please
                        provide your order number?
                      </p>
                      {widgetData.behavior.showTimestamp && (
                        <span className="text-xs text-gray-500 block mt-1">
                          12:07 PM
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Widget Input */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white"
                  style={{
                    borderBottomLeftRadius: `${widgetData.appearance.borderRadius}px`,
                    borderBottomRightRadius: `${widgetData.appearance.borderRadius}px`,
                  }}
                >
                  <div className="flex">
                    <Input
                      className="flex-1 mr-2"
                      placeholder={widgetData.behavior.placeholder}
                    />
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: widgetData.appearance.primaryColor,
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Button
              onClick={onGenerateCode}
              className="w-full"
              variant="outline"
            >
              <Code className="mr-2 h-4 w-4" /> Generate Integration Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetCreator;
