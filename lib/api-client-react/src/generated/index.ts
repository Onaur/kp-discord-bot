import { useQuery } from "@tanstack/react-query";

const BASE_URL = "";

export async function healthCheck(): Promise<{ status: string }> {
  const res = await fetch(`${BASE_URL}/api/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json() as Promise<{ status: string }>;
}

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: healthCheck,
  });
}
