export interface User {
  id: string;
  email: string;
  provider: string;
  role: "user" | "admin";
  tokenVersion : number;
  name:string;
}


 export const users  = new Map <string, User>();
