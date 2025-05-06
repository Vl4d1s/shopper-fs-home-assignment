interface HelloResponse {
  message: string;
}

export const getHelloMessage = async (): Promise<HelloResponse> => {
  const response = await fetch("http://localhost:5001/api/v1/metrics/hello");
  if (!response.ok) {
    throw new Error("Failed to fetch hello message");
  }

  return response.json();
};
