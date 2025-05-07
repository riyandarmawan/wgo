import { AuthContextType } from "@/utils/types/auth";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);
