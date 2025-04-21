import { FetchResult } from "../types/types";

export const fetchWithOpts = async (
  url: string,
  opts?: RequestInit
): Promise<FetchResult> => {
  let result: FetchResult;

  try {
    const response = await fetch(url, opts);

    if (response.ok) {
      const data = await response.json();
      result = { status: "ok", data };
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    result = { status: "error", data: error as Error };
  }
  return result;
};
