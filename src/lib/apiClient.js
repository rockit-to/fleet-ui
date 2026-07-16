const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiGet(path) {
  if (!BASE_URL) {
    throw new ApiError("Fleet API is not configured. Set REACT_APP_API_BASE_URL before starting the app.", 0);
  }

  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new ApiError(`GET ${path} failed with status ${res.status}`, res.status);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new ApiError(`GET ${path} returned ${contentType || "a non-JSON response"}`, res.status);
  }

  return res.json();
}
