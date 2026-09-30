import type { TemplateDefinition } from "../types";

export const expressTemplate: TemplateDefinition = {
  id: "EXPRESS",
  name: "Express",
  description:
    "Fast, unopinionated, minimalist web framework for Node.js to build APIs and web applications",
  category: "backend",
  language: "JavaScript",
  framework: "Express",
  iconPath: "/expressjs-icon.svg",
  files: {
    folderName: "express-starter",
    items: [
      {
        filename: "package",
        fileExtension: "json",
        content: JSON.stringify(
          {
            name: "express-starter",
            version: "1.0.0",
            private: true,
            type: "module",
            scripts: {
              dev: "node --watch src/index.js",
              start: "node src/index.js",
            },
            dependencies: {
              express: "^4.21.0",
            },
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
            fileExtension: "js",
            content: `import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Express Starter',
    status: 'running',
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});`,
          },
        ],
      },
    ],
  },
};
