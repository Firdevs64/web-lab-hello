import type { Project } from "../types/project";

const API_URL = "/data/projects.json";

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Projeler yuklenemedi: ${response.status}`);
  }

  const data: Project[] = await response.json();
  return data;
}