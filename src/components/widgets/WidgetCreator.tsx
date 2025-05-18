import React, { useState } from "react";
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
import { ColorPicker, ColorSwatch } from "@/components/ui/color-picker";
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

interface WidgetCreatorProps {
  widgetId?: string;
  onSave?: (widgetData: any) => void;
  onCancel?: () => void;
  onGenerateCode?: () => void;
}

const WidgetCreator = ({
  widgetId,
  onSave = () => {},
  onCancel = () => {},
  onGenerateCode = () => {},
}: WidgetCreatorProps) => {
  const [activeTab, setActiveTab] = useState("appearance");
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
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: widgetData.appearance.primaryColor,
                        }}
                      />
                      <Input
                        type="text"
                        value={widgetData.appearance.primaryColor}
                        onChange={(e) =>
                          handleAppearanceChange("primaryColor", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: widgetData.appearance.secondaryColor,
                        }}
                      />
                      <Input
                        type="text"
                        value={widgetData.appearance.secondaryColor}
                        onChange={(e) =>
                          handleAppearanceChange(
                            "secondaryColor",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Text Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: widgetData.appearance.textColor,
                        }}
                      />
                      <Input
                        type="text"
                        value={widgetData.appearance.textColor}
                        onChange={(e) =>
                          handleAppearanceChange("textColor", e.target.value)
                        }
                      />
                    </div>
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
                    <Select
                      value={widgetData.appearance.position}
                      onValueChange={(value) =>
                        handleAppearanceChange("position", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      value={widgetData.appearance.fontFamily}
                      onValueChange={(value) =>
                        handleAppearanceChange("fontFamily", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Icon Type</Label>
                    <Select
                      value={widgetData.appearance.iconType}
                      onValueChange={(value) =>
                        handleAppearanceChange("iconType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-open">Auto Open</Label>
                    <Switch
                      id="auto-open"
                      checked={widgetData.behavior.autoOpen}
                      onCheckedChange={(checked) =>
                        handleBehaviorChange("autoOpen", checked)
                      }
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
                    <Label htmlFor="show-timestamp">Show Timestamp</Label>
                    <Switch
                      id="show-timestamp"
                      checked={widgetData.behavior.showTimestamp}
                      onCheckedChange={(checked) =>
                        handleBehaviorChange("showTimestamp", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="persist-conversation">
                      Persist Conversation
                    </Label>
                    <Switch
                      id="persist-conversation"
                      checked={widgetData.behavior.persistConversation}
                      onCheckedChange={(checked) =>
                        handleBehaviorChange("persistConversation", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="collect-user-info">Collect User Info</Label>
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
                    <Select
                      value={widgetData.aiModel.modelId}
                      onValueChange={(value) =>
                        handleAIModelChange("modelId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        {aiModelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
        <div className="w-1/2 p-4 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Live Preview</h3>
            <p className="text-sm text-muted-foreground">
              This is how your widget will appear to users.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg relative overflow-hidden">
            <div
              className="relative shadow-lg"
              style={{
                width: `${widgetData.appearance.width}px`,
                height: `${widgetData.appearance.height}px`,
                borderRadius: `${widgetData.appearance.borderRadius}px`,
                fontFamily: widgetData.appearance.fontFamily,
                backgroundColor: widgetData.appearance.secondaryColor,
                color: widgetData.appearance.textColor,
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
                    <p className="text-sm">Hello, I need help with my order.</p>
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

            {/* Widget Button */}
            <div
              className="absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              style={{ backgroundColor: widgetData.appearance.primaryColor }}
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
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
