import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  UserPlus,
  Shield,
  ShieldCheck,
  Lock,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { mockUsers, mockRoles, mockPermissions } from "./data";
import { User, Role, Permission } from "./types";

// Import components
import UsersList from "./components/UsersList";
import RolesList from "./components/RolesList";
import PermissionsList from "./components/PermissionsList";
import UserTabForm from "./components/UserTabForm";
import RoleTabForm from "./components/RoleTabForm";
import PermissionTabForm from "./components/PermissionTabForm";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users-list");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);

  const [searchQuery, setSearchQuery] = useState("");

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null,
  );

  // User CRUD operations
  const handleCreateUser = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name.toLowerCase().replace(/\s/g, "")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      roles: roles.filter((role) => userData.roleIds.includes(role.id)),
      status: userData.status,
    };
    setUsers([...users, newUser]);
    setActiveTab("users-list");
  };

  const handleUpdateUser = (userData: any) => {
    if (!editingUser) return;

    const updatedUsers = users.map((user) => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          name: userData.name,
          email: userData.email,
          updatedAt: new Date().toISOString(),
          roles: roles.filter((role) => userData.roleIds.includes(role.id)),
          status: userData.status,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setActiveTab("users-list");
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setActiveTab("user-form");
  };

  // Role CRUD operations
  const handleCreateRole = (roleData: any) => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: roleData.name,
      description: roleData.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: permissions.filter((permission) =>
        roleData.permissionIds.includes(permission.id),
      ),
    };
    setRoles([...roles, newRole]);
    setActiveTab("roles-list");
  };

  const handleUpdateRole = (roleData: any) => {
    if (!editingRole) return;

    const updatedRoles = roles.map((role) => {
      if (role.id === editingRole.id) {
        return {
          ...role,
          name: roleData.name,
          description: roleData.description,
          updatedAt: new Date().toISOString(),
          permissions: permissions.filter((permission) =>
            roleData.permissionIds.includes(permission.id),
          ),
        };
      }
      return role;
    });

    setRoles(updatedRoles);
    setActiveTab("roles-list");
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));

    // Remove this role from any users who have it
    const updatedUsers = users.map((user) => ({
      ...user,
      roles: user.roles.filter((role) => role.id !== roleId),
    }));

    setUsers(updatedUsers);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setActiveTab("role-form");
  };

  // Permission CRUD operations
  const handleCreatePermission = (permissionData: any) => {
    const newPermission: Permission = {
      id: Date.now().toString(),
      name: permissionData.name,
      description: permissionData.description,
      category: permissionData.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPermissions([...permissions, newPermission]);
    setActiveTab("permissions-list");
  };

  const handleUpdatePermission = (permissionData: any) => {
    if (!editingPermission) return;

    const updatedPermissions = permissions.map((permission) => {
      if (permission.id === editingPermission.id) {
        return {
          ...permission,
          name: permissionData.name,
          description: permissionData.description,
          category: permissionData.category,
          updatedAt: new Date().toISOString(),
        };
      }
      return permission;
    });

    setPermissions(updatedPermissions);
    setActiveTab("permissions-list");
    setEditingPermission(null);
  };

  const handleDeletePermission = (permissionId: string) => {
    setPermissions(
      permissions.filter((permission) => permission.id !== permissionId),
    );

    // Remove this permission from any roles that have it
    const updatedRoles = roles.map((role) => ({
      ...role,
      permissions: role.permissions.filter(
        (permission) => permission.id !== permissionId,
      ),
    }));

    setRoles(updatedRoles);
  };

  const handleEditPermission = (permission: Permission) => {
    setEditingPermission(permission);
    setActiveTab("permission-form");
  };

  // Filter functions based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      permission.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Helper function to determine if we're in a form view
  const isFormView =
    activeTab === "user-form" ||
    activeTab === "role-form" ||
    activeTab === "permission-form";

  // Helper function to get the appropriate back button target
  const getBackTarget = () => {
    if (activeTab === "user-form") return "users-list";
    if (activeTab === "role-form") return "roles-list";
    if (activeTab === "permission-form") return "permissions-list";
    return "";
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      <Header
        title="User Management"
        description="Manage users, roles, and permissions for your application"
      />

      {!isFormView ? (
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>

          <div>
            {activeTab === "users-list" && (
              <Button onClick={() => setActiveTab("user-form")}>
                <UserPlus className="mr-2 h-4 w-4" /> Add User
              </Button>
            )}

            {activeTab === "roles-list" && (
              <Button onClick={() => setActiveTab("role-form")}>
                <ShieldCheck className="mr-2 h-4 w-4" /> Add Role
              </Button>
            )}

            {activeTab === "permissions-list" && (
              <Button onClick={() => setActiveTab("permission-form")}>
                <Lock className="mr-2 h-4 w-4" /> Add Permission
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
              setEditingUser(null);
              setEditingRole(null);
              setEditingPermission(null);
            }}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
          </Button>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 w-full md:w-[400px]">
          <TabsTrigger
            value="users-list"
            className="flex items-center"
            disabled={isFormView}
          >
            <Users className="mr-2 h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger
            value="roles-list"
            className="flex items-center"
            disabled={isFormView}
          >
            <Shield className="mr-2 h-4 w-4" /> Roles
          </TabsTrigger>
          <TabsTrigger
            value="permissions-list"
            className="flex items-center"
            disabled={isFormView}
          >
            <Lock className="mr-2 h-4 w-4" /> Permissions
          </TabsTrigger>
        </TabsList>

        {/* Users List Tab */}
        <TabsContent value="users-list" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <UsersList
                users={filteredUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles List Tab */}
        <TabsContent value="roles-list" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Roles</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <RolesList
                roles={filteredRoles}
                onEdit={handleEditRole}
                onDelete={handleDeleteRole}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions List Tab */}
        <TabsContent value="permissions-list" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Permissions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <PermissionsList
                permissions={filteredPermissions}
                onEdit={handleEditPermission}
                onDelete={handleDeletePermission}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Form Tab */}
        <TabsContent value="user-form" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>{editingUser ? "Edit User" : "Create User"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <UserTabForm
                onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
                user={editingUser}
                roles={roles}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role Form Tab */}
        <TabsContent value="role-form" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>{editingRole ? "Edit Role" : "Create Role"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <RoleTabForm
                onSubmit={editingRole ? handleUpdateRole : handleCreateRole}
                role={editingRole}
                permissions={permissions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permission Form Tab */}
        <TabsContent value="permission-form" className="space-y-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>
                {editingPermission ? "Edit Permission" : "Create Permission"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <PermissionTabForm
                onSubmit={
                  editingPermission
                    ? handleUpdatePermission
                    : handleCreatePermission
                }
                permission={editingPermission}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
