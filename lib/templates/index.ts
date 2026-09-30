/**
 * Template Registry
 *
 * Central registry for all supported starter templates.
 * Provides type-safe access to template definitions by their identifier.
 *
 * Usage:
 *   import { getTemplate, templateRegistry } from '@/lib/templates';
 *
 *   const react = getTemplate("REACT");
 *   const allTemplates = getAllTemplates();
 */

export type {
  TemplateId,
  TemplateCategory,
  TemplateDefinition,
  TemplateRegistry,
} from "./types";

import type { TemplateId, TemplateDefinition, TemplateRegistry } from "./types";

import { reactTemplate } from "./react/template";
import { nextjsTemplate } from "./nextjs/template";
import { expressTemplate } from "./express/template";
import { angularTemplate } from "./angular/template";
import { vueTemplate } from "./vue/template";
import { honoTemplate } from "./hono/template";

/**
 * The master template registry — contains all supported starter templates.
 */
export const templateRegistry: TemplateRegistry = {
  REACT: reactTemplate,
  NEXTJS: nextjsTemplate,
  EXPRESS: expressTemplate,
  ANGULAR: angularTemplate,
  VUE: vueTemplate,
  HONO: honoTemplate,
};

/**
 * Retrieve a single template definition by its identifier.
 *
 * @param id - The template identifier (e.g. "REACT", "NEXTJS")
 * @returns The full TemplateDefinition for that template
 */
export function getTemplate(id: TemplateId): TemplateDefinition {
  return templateRegistry[id];
}

/**
 * Retrieve all template definitions as an array.
 *
 * @returns Array of all TemplateDefinition entries
 */
export function getAllTemplates(): TemplateDefinition[] {
  return Object.values(templateRegistry);
}

/**
 * Get the starter files (TemplateFolder) for a given template.
 * This is a convenience shortcut for `getTemplate(id).files`.
 *
 * @param id - The template identifier
 * @returns The TemplateFolder containing the starter file tree
 */
export function getTemplateFiles(id: TemplateId) {
  return templateRegistry[id].files;
}

/**
 * All supported template identifiers.
 */
export const SUPPORTED_TEMPLATES: readonly TemplateId[] = [
  "REACT",
  "NEXTJS",
  "EXPRESS",
  "ANGULAR",
  "VUE",
  "HONO",
] as const;
