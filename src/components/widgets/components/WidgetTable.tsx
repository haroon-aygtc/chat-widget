import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Code } from "lucide-react";
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
import { Widget } from "../types";

interface WidgetTableProps {
  widgets: Widget[];
  onStatusChange: (id: string, status: "active" | "inactive") => void;
  onEdit: (widget: Widget) => void;
  onDelete: (id: string) => void;
  onGenerateCode: (widget: Widget) => void;
}

const WidgetTable = ({
  widgets,
  onStatusChange,
  onEdit,
  onDelete,
  onGenerateCode,
}: WidgetTableProps) => {
  return (
    <div className="rounded-md bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-muted/30">
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>AI Model</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {widgets.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground bg-card"
              >
                No widgets found. Create your first widget to get started.
              </TableCell>
            </TableRow>
          ) : (
            widgets.map((widget) => (
              <TableRow
                key={widget.id}
                className="group hover:bg-muted/30 transition-all duration-200 border-b"
              >
                <TableCell className="font-medium">{widget.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={widget.status === "active"}
                      onCheckedChange={(checked) =>
                        onStatusChange(
                          widget.id,
                          checked ? "active" : "inactive",
                        )
                      }
                    />
                    <Badge
                      variant={
                        widget.status === "active" ? "default" : "secondary"
                      }
                      className="transition-all"
                    >
                      {widget.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{widget.aiModel}</TableCell>
                <TableCell>{widget.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2 opacity-70 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onGenerateCode(widget)}
                      className="hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(widget)}
                      className="hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-destructive/10 hover:scale-105 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Widget</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the widget "
                            {widget.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(widget.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WidgetTable;
