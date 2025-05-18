export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
  status: "active" | "inactive" | "pending";
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  status: "active" | "inactive" | "pending";
  roleIds: string[];
}

export interface RoleFormValues {
  name: string;
  description: string;
  permissionIds: string[];
}

export interface PermissionFormValues {
  name: string;
  description: string;
  category: string;
}
