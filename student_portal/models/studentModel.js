export const getStudentsProfileById = async () => {
  const response = await fetch(
    "http://localhost:4000/auth/students",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};