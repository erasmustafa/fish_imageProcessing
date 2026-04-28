import { demoUser } from "./constants";

export const demoCredentials = {
  email: "demo@aquascope.app",
  password: "aquascope123",
};

export function getDemoSession() {
  return {
    user: demoUser,
    authenticated: true,
  };
}
