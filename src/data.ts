// apiService.ts
export const mockUserData = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    token: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  },
  {
    username: "user",
    password: "user123",
    role: "user",
    token: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321",
  }
];

export const loginApi = async (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    const user = mockUserData.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setTimeout(() => resolve({ data: user }), 1000); // Simulate network delay
    } else {
      setTimeout(
        () =>
          reject({ response: { data: { message: "Invalid credentials" } } }),
        1000
      );
    }
  });
};
