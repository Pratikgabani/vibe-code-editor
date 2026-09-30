import type { TemplateDefinition } from "../types";

export const honoTemplate: TemplateDefinition = {
  id: "HONO",
  name: "Hono",
  description:
    "Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.",
  category: "backend",
  language: "TypeScript",
  framework: "Hono",
  iconPath: "/hono.svg",
  files: {
    folderName: "hono-starter",
    items: [
      {
        filename: "package",
        fileExtension: "json",
        content: JSON.stringify(
          {
            name: "hono-starter",
            version: "1.0.0",
            private: true,
            type: "module",
            scripts: {
              dev: "tsx watch src/index.ts",
              start: "tsx src/index.ts",
            },
            dependencies: {
              hono: "^4.6.0",
              "@hono/node-server": "^1.13.0",
            },
            devDependencies: {
              tsx: "^4.19.0",
              typescript: "^5.6.0",
              "@types/node": "^20",
            },
          },
          null,
          2
        ),
      },
      {
        filename: "tsconfig",
        fileExtension: "json",
        content: JSON.stringify(
          {
            compilerOptions: {
              target: "ES2022",
              module: "ES2022",
              moduleResolution: "bundler",
              strict: true,
              esModuleInterop: true,
              skipLibCheck: true,
              outDir: "./dist",
              rootDir: "./src",
              declaration: true,
            },
            include: ["src/**/*.ts"],
            exclude: ["node_modules", "dist"],
          },
          null,
          2
        ),
      },
      {
        folderName: "src",
        items: [
          {
            filename: "index",
            fileExtension: "ts",
            content: `import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'Hono Starter',
    status: 'running',
  });
});

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const port = 3000;
console.log(\`Server is running on http://localhost:\${port}\`);

serve({
  fetch: app.fetch,
  port,
});`,
          },
        ],
      },
    ],
  },
};
