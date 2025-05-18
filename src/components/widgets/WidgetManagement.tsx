import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import WidgetCreator from "./WidgetCreator";
import IntegrationCodeGenerator from "./IntegrationCodeGenerator";
import WidgetHeader from "./components/WidgetHeader";
import WidgetTable from "./components/WidgetTable";
import WidgetFilters from "./components/WidgetFilters";
import WidgetStats from "./components/WidgetStats";
import EmptyState from "./components/EmptyState";
import { Widget, FilterOption } from "./types";
import Sidebar from "../dashboard/Sidebar";
import { LayoutGrid, Plus, ListFilter } from "lucide-react";

const WidgetManagement = () => {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "1",
      name: "Customer Support Chat",
      status: "active",
      createdAt: "2023-06-15",
      aiModel: "GPT-4",
    },
    {
      id: "2",
      name: "Product Recommendation",
      status: "active",
      createdAt: "2023-07-22",
      aiModel: "Claude-2",
    },
    {
      id: "3",
      name: "FAQ Assistant",
      status: "inactive",
      createdAt: "2023-08-10",
      aiModel: "GPT-3.5",
    },
    {
      id: "4",
      name: "Onboarding Guide",
      status: "active",
      createdAt: "2023-09-05",
      aiModel: "GPT-4",
    },
  ]);

  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  const [selectedWidgetForCode, setSelectedWidgetForCode] =
    useState<Widget | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [filteredWidgets, setFilteredWidgets] = useState<Widget[]>(widgets);
  const [activeTab, setActiveTab] = useState("manage");

  // Memoize the search handler to prevent unnecessary re-renders
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Apply filters and search whenever dependencies change
  useEffect(() => {
    let result = [...widgets];

    // Apply search query
    if (searchQuery) {
      result = result.filter((widget) =>
        widget.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      activeFilters.forEach((filter) => {
        if (filter.type === "status") {
          result = result.filter((widget) => widget.status === filter.value);
        } else if (filter.type === "model") {
          result = result.filter((widget) => widget.aiModel === filter.value);
        }
      });
    }

    setFilteredWidgets(result);
  }, [widgets, searchQuery, activeFilters]);

  const handleStatusChange = (id: string, newStatus: "active" | "inactive") => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === id ? { ...widget, status: newStatus } : widget,
      ),
    );
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  const handleEditWidget = (widget: Widget) => {
    setEditingWidget(widget);
    setActiveTab("create");
  };

  const handleGenerateCode = (widget: Widget) => {
    setSelectedWidgetForCode(widget);
    setShowCodeGenerator(true);
  };

  const handleCloseCreator = () => {
    setActiveTab("manage");
    setEditingWidget(null);
  };

  const handleSaveWidget = (widgetData: any) => {
    if (editingWidget) {
      // Update existing widget
      setWidgets(
        widgets.map((w) =>
          w.id === editingWidget.id
            ? {
                ...w,
                name: widgetData.name,
                aiModel:
                  widgetData.aiModel.modelId === "gpt-3.5"
                    ? "GPT-3.5"
                    : widgetData.aiModel.modelId === "gpt-4"
                      ? "GPT-4"
                      : widgetData.aiModel.modelId === "claude-2"
                        ? "Claude-2"
                        : "Custom Model",
              }
            : w,
        ),
      );
    } else {
      // Add new widget with generated ID
      const newWidget = {
        id: `${widgets.length + 1}`,
        name: widgetData.name,
        status: "inactive",
        createdAt: new Date().toISOString().split("T")[0],
        aiModel:
          widgetData.aiModel.modelId === "gpt-3.5"
            ? "GPT-3.5"
            : widgetData.aiModel.modelId === "gpt-4"
              ? "GPT-4"
              : widgetData.aiModel.modelId === "claude-2"
                ? "Claude-2"
                : "Custom Model",
      };
      setWidgets([...widgets, newWidget]);
    }
    setActiveTab("manage");
    setEditingWidget(null);
  };

  const handleRemoveFilter = (filterToRemove: FilterOption) => {
    setActiveFilters(
      activeFilters.filter(
        (filter) =>
          !(
            filter.type === filterToRemove.type &&
            filter.value === filterToRemove.value
          ),
      ),
    );
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <motion.div
        className="flex-1 overflow-auto p-6 pb-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-2">
          <WidgetHeader
            onCreateWidget={() => setActiveTab("create")}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            isCreating={activeTab === "create"}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <TabsList className="p-1 bg-muted/60 backdrop-blur-sm rounded-xl shadow-sm">
                <TabsTrigger
                  value="manage"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:scale-[1.02] transition-all duration-300"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>Manage Widgets</span>
                </TabsTrigger>
                <TabsTrigger
                  value="create"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:scale-[1.02] transition-all duration-300"
                >
                  <Plus className="h-4 w-4" />
                  <span>{editingWidget ? "Edit Widget" : "Create Widget"}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <TabsContent value="manage" className="mt-0 space-y-6" asChild>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <WidgetStats />

                  <WidgetFilters
                    activeFilters={activeFilters}
                    onRemoveFilter={handleRemoveFilter}
                    onClearFilters={handleClearFilters}
                  />

                  <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-all duration-300 bg-card">
                    <CardHeader className="bg-muted/50 pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ListFilter className="h-4 w-4 text-muted-foreground" />
                        Widgets
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {filteredWidgets.length === 0 &&
                      searchQuery === "" &&
                      activeFilters.length === 0 ? (
                        <EmptyState
                          onCreateWidget={() => setActiveTab("create")}
                        />
                      ) : (
                        <WidgetTable
                          widgets={filteredWidgets}
                          onStatusChange={handleStatusChange}
                          onEdit={handleEditWidget}
                          onDelete={handleDeleteWidget}
                          onGenerateCode={handleGenerateCode}
                        />
                      )}

                      {filteredWidgets.length === 0 &&
                        (searchQuery !== "" || activeFilters.length > 0) && (
                          <div className="py-8 px-4 text-center">
                            <p className="text-muted-foreground">
                              No widgets match your search criteria.
                            </p>
                            <button
                              onClick={handleClearFilters}
                              className="text-primary text-sm mt-2 hover:underline"
                            >
                              Clear filters
                            </button>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="create" className="mt-0" asChild>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-all duration-300 bg-card">
                    <CardContent className="p-0">
                      <WidgetCreator
                        widgetId={editingWidget?.id}
                        onSave={handleSaveWidget}
                        onCancel={handleCloseCreator}
                        onGenerateCode={() => {}}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        <Dialog open={showCodeGenerator} onOpenChange={setShowCodeGenerator}>
          <DialogContent className="sm:max-w-[800px]">
            {selectedWidgetForCode && (
              <IntegrationCodeGenerator
                widget={selectedWidgetForCode}
                onClose={() => setShowCodeGenerator(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default WidgetManagement;
