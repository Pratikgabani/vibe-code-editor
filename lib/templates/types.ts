/**
 * Template Registry Types
 *
 * Reuses the existing TemplateFile and TemplateFolder types from
 * modules/playground/lib/path-to-json.ts for file structure,
 * and aligns with the Prisma Templates enum for identifiers.
 */

import type { TemplateFolder } from "@/modules/playground/lib/path-to-json";

/**
 * Template identifier — matches the Prisma `Templates` enum values.
 * Keep in sync with prisma/schema.prisma.
 */
export type TemplateId = "REACT" | "NEXTJS" | "EXPRESS" | "ANGULAR" | "VUE" | "HONO";

/**
 * Template category for organizational purposes.
 */
export type TemplateCategory = "frontend" | "backend" | "fullstack";

/**
 * Master template definition.
 * Contains all metadata and starter files needed to bootstrap a playground.
 */
export interface TemplateDefinition {
  /** Unique identifier matching the Prisma Templates enum */
  id: TemplateId;
  /** Human-readable display name */
  name: string;
  /** Short description of the template */
  description: string;
  /** Category for filtering */
  category: TemplateCategory;
  /** Primary language used in the template */
  language: string;
  /** Framework or runtime name */
  framework: string;
  /** Icon path relative to /public */
  iconPath: string;
  /** Starter file tree in the existing TemplateFolder format */
  files: TemplateFolder;
}

/**
 * The template registry type — a record keyed by TemplateId.
 */
export type TemplateRegistry = Record<TemplateId, TemplateDefinition>;
