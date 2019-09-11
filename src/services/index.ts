import axios from "axios";
import { API_URL } from "../config";

export async function get(url: string, config: object) {
  let result: { success: boolean; error?: string; data?: any };
  try {
    const response = await axios.get(`${API_URL}${url}`, { ...config });
    result = { success: true, data: response.data };
  } catch (error) {
    result = { success: false, error: error.toString() };
  }
  return result;
}
