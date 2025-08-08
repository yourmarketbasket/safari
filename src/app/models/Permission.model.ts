export interface Permission {
  permissionNumber: string;
  description: string;
  roles: string[];
  modulePage: string;
  httpMethod: "GET" | "POST" | "PUT" | "DELETE";
  constraints: string;
}
