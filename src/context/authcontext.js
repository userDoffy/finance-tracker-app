import { createContext } from "react";

export const authContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {}, // Placeholder for the setter function
});
