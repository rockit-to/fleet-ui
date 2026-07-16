import { apiGet } from "../../../lib/apiClient";

export function getBrowse() {
  return apiGet("/api/fleet/browse");
}

export function getCategories() {
  return apiGet("/api/fleet/categories");
}

export function getCatalog() {
  return apiGet("/api/fleet/catalog");
}

export function getStays() {
  return apiGet("/api/fleet/stays");
}
