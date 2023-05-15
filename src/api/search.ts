import apiRequest from "./index";
import { MAX_SUGGESTIONS } from "../constants";

const RESOURCE = "/search";

export const searchRecommendation = async (
  q: string,
  page: number,
  limit: number = MAX_SUGGESTIONS
) => {
  try {
    const response = await apiRequest.get(
      `${RESOURCE}?q=${q}&page=${page}&limit=${limit}`
    );

    return response;
  } catch (error) {
    throw new Error("API searchRecommendation error");
  }
};
