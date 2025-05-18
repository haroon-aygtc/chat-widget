export interface Widget {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  aiModel: string;
}

export interface FilterOption {
  label: string;
  value: string;
  type: string;
}
