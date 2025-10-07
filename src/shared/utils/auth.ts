// Simple localStorage-based auth
export const login = (username: string, password: string) => {
  // For demo purposes, any username/password works
  localStorage.setItem("token", "fake-token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
