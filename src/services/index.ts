export { ServiceError } from "./types";
export type { ServiceResult } from "./types";

// Re-export other services directly
export { experienceService, projectService, skillService, disconnectDatabase } from "./database";

// Export Types
export type { 
    DatabaseExperience,
    DatabaseSkill, 
    DatabaseProject 
} from "./database";
