import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Users, UserPlus, Shield, ShieldCheck, Lock } from "lucide-react";

import UsersList from "./components/UsersList";
import RolesList from "./components/RolesList";
import PermissionsList from "./components/PermissionsList";
import UserForm from "./components/UserForm";
import RoleForm from "./components/RoleForm";
import PermissionForm from "./components/PermissionForm";
import { mockUsers, mockRoles, mockPermissions } from "./data";
import { User, Role, Permission } from "./types";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);

  const [searchQuery, setSearchQuery] = useState("");

  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isRoleFormOpen, setIsRoleFormOpen] = useState(false);
  const [isPermissionFormOpen, setIsPermissionFormOpen] = useState(false);

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
    setIsUserFormOpen(false);
    setEditingUser(null);
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
    setIsUserFormOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsUserFormOpen(true);
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
    setIsRoleFormOpen(false);
    setEditingRole(null);
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
    setIsRoleFormOpen(false);
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
    setIsRoleFormOpen(true);
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
    setIsPermissionFormOpen(false);
    setEditingPermission(null);
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
    setIsPermissionFormOpen(false);
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
    setIsPermissionFormOpen(true);
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

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <h2 className="text-xl font-semibold">User Management</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>

          {activeTab === "users" && (
            <Button onClick={() => setIsUserFormOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
          )}

          {activeTab === "roles" && (
            <Button onClick={() => setIsRoleFormOpen(true)}>
              <ShieldCheck className="mr-2 h-4 w-4" /> Add Role
            </Button>
          )}

          {activeTab === "permissions" && (
            <Button onClick={() => setIsPermissionFormOpen(true)}>
              <Lock className="mr-2 h-4 w-4" /> Add Permission
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" /> Roles
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center">
              <Lock className="mr-2 h-4 w-4" /> Permissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <UsersList
                  users={filteredUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <RolesList
                  roles={filteredRoles}
                  onEdit={handleEditRole}
                  onDelete={handleDeleteRole}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <PermissionsList
                  permissions={filteredPermissions}
                  onEdit={handleEditPermission}
                  onDelete={handleDeletePermission}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Form Dialog */}
      <UserForm
        isOpen={isUserFormOpen}
        onClose={() => {
          setIsUserFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        user={editingUser}
        roles={roles}
      />

      {/* Role Form Dialog */}
      <RoleForm
        isOpen={isRoleFormOpen}
        onClose={() => {
          setIsRoleFormOpen(false);
          setEditingRole(null);
        }}
        onSubmit={editingRole ? handleUpdateRole : handleCreateRole}
        role={editingRole}
        permissions={permissions}
      />

      {/* Permission Form Dialog */}
      <PermissionForm
        isOpen={isPermissionFormOpen}
        onClose={() => {
          setIsPermissionFormOpen(false);
          setEditingPermission(null);
        }}
        onSubmit={
          editingPermission ? handleUpdatePermission : handleCreatePermission
        }
        permission={editingPermission}
      />
    </div>
  );
};

export default UserManagement;
