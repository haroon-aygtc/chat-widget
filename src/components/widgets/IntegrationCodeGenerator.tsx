import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Check,
  Copy,
  Code,
  FileJson,
  Terminal,
  Download,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationCodeGeneratorProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  widgetId?: string;
  widgetName?: string;
  onClose?: () => void;
  widget?: any;
}

const IntegrationCodeGenerator = ({
  open = true,
  onOpenChange,
  widgetId = "widget-123",
  widgetName = "Customer Support Chat",
  onClose,
  widget,
}: IntegrationCodeGeneratorProps) => {
  const [activeTab, setActiveTab] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Use widget prop if available
  const actualWidgetId = widget?.id || widgetId;
  const actualWidgetName = widget?.name || widgetName;

  const javascriptCode = `// ${actualWidgetName} Widget Integration
<script>
  (function(w, d, s, o) {
    w['ChatWidgetObject'] = o;
    w[o] = w[o] || function() {
      (w[o].q = w[o].q || []).push(arguments);
    };
    
    var js = d.createElement(s);
    js.async = 1;
    js.src = 'https://cdn.example.com/chat-widget.js';
    js.dataset.widgetId = '${actualWidgetId}';
    
    d.head.appendChild(js);
  })(window, document, 'script', 'chatWidget');
  
  chatWidget('init', { widgetId: '${actualWidgetId}' });
</script>`;

  const reactCode = `// ${actualWidgetName} Widget Integration
import { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    // Load the widget script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.example.com/chat-widget.js';
    script.dataset.widgetId = '${actualWidgetId}';
    document.head.appendChild(script);
    
    // Initialize the widget
    window.chatWidget = window.chatWidget || function() {
      (window.chatWidget.q = window.chatWidget.q || []).push(arguments);
    };
    window.chatWidget('init', { widgetId: '${actualWidgetId}' });
    
    return () => {
      // Clean up
      document.head.removeChild(script);
    };
  }, []);
  
  return null; // Widget injects itself into the DOM
};

export default ChatWidget;`;

  const npmCode = `# Install the ChatWidget package
npm install @chatwidget/react

# Then in your component
import { ChatWidget } from '@chatwidget/react';

// Use it in your component
<ChatWidget widgetId="${actualWidgetId}" />`;

  const copyToClipboard = () => {
    let codeToCopy;
    switch (activeTab) {
      case "javascript":
        codeToCopy = javascriptCode;
        break;
      case "react":
        codeToCopy = reactCode;
        break;
      case "npm":
        codeToCopy = npmCode;
        break;
      default:
        codeToCopy = javascriptCode;
    }

    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setShowSuccess(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-card shadow-lg border-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary text-gradient">
            Integration Code for {actualWidgetName}
          </DialogTitle>
          <DialogDescription>
            Copy and paste this code into your website to integrate the chat
            widget. Choose the integration method that works best for your
            project.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 relative">
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 right-0 left-0 bg-green-500/10 text-green-500 p-2 rounded-md flex items-center justify-center gap-2 z-10"
              >
                <Check size={16} />
                <span>Code copied to clipboard!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <Tabs
            defaultValue="javascript"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid grid-cols-3 w-[400px]">
                <TabsTrigger
                  value="javascript"
                  className="flex items-center gap-2"
                >
                  <Code size={16} />
                  JavaScript
                </TabsTrigger>
                <TabsTrigger value="react" className="flex items-center gap-2">
                  <FileJson size={16} />
                  React
                </TabsTrigger>
                <TabsTrigger value="npm" className="flex items-center gap-2">
                  <Terminal size={16} />
                  NPM Package
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant={copied ? "secondary" : "outline"}
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 transition-all",
                    copied ? "text-green-500" : "",
                  )}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy Code"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Share2 size={16} />
                  Share
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="rounded-lg border bg-muted/30 backdrop-blur-sm shadow-inner overflow-hidden"
            >
              <TabsContent value="javascript" className="mt-0">
                <div className="relative">
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="text-foreground whitespace-pre-wrap">
                      {javascriptCode}
                    </code>
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-card/50 border-t text-sm text-muted-foreground">
                  <h4 className="font-medium mb-2 text-foreground">
                    Implementation Instructions:
                  </h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Copy the code above</li>
                    <li>
                      Paste it before the closing{" "}
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        &lt;/body&gt;
                      </code>{" "}
                      tag in your HTML
                    </li>
                    <li>
                      The widget will automatically initialize and appear on
                      your website
                    </li>
                  </ol>
                </div>
              </TabsContent>

              <TabsContent value="react" className="mt-0">
                <div className="relative">
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="text-foreground whitespace-pre-wrap">
                      {reactCode}
                    </code>
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-card/50 border-t text-sm text-muted-foreground">
                  <h4 className="font-medium mb-2 text-foreground">
                    Implementation Instructions:
                  </h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Copy the code above</li>
                    <li>Create a new component file in your React project</li>
                    <li>Paste the code into the file</li>
                    <li>
                      Import and use the{" "}
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        &lt;ChatWidget /&gt;
                      </code>{" "}
                      component in your app
                    </li>
                  </ol>
                </div>
              </TabsContent>

              <TabsContent value="npm" className="mt-0">
                <div className="relative">
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="text-foreground whitespace-pre-wrap">
                      {npmCode}
                    </code>
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-card/50 border-t text-sm text-muted-foreground">
                  <h4 className="font-medium mb-2 text-foreground">
                    Implementation Instructions:
                  </h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Install the package using npm or yarn</li>
                    <li>
                      Import the ChatWidget component in your React application
                    </li>
                    <li>
                      Add the component to your app with your unique widget ID
                    </li>
                    <li>
                      Customize appearance and behavior through props (see
                      <a href="#" className="text-primary hover:underline ml-1">
                        documentation
                      </a>
                      )
                    </li>
                  </ol>
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Widget is active and ready to use</span>
            </div>

            <Button
              variant="default"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationCodeGenerator;
