import type { TemplateDefinition } from "../types";

export const reactTemplate: TemplateDefinition = {
  id: "REACT",
  name: "React",
  description:
    "A JavaScript library for building user interfaces with component-based architecture",
  category: "frontend",
  language: "JavaScript",
  framework: "React",
  iconPath: "/react.svg",
  files: {
    folderName: "react-starter",
    items: [
      {
        filename: "package",
        fileExtension: "json",
        content: JSON.stringify(
          {
            name: "react-starter",
            private: true,
            version: "0.0.0",
            type: "module",
            scripts: {
              dev: "vite",
              build: "vite build",
              preview: "vite preview",
            },
            dependencies: {
              react: "^18.3.1",
              "react-dom": "^18.3.1",
            },
            devDependencies: {
              "@vitejs/plugin-react": "^4.3.4",
              vite: "^6.0.0",
            },
          },
          null,
          2
        ),
      },
      {
        filename: "index",
        fileExtension: "html",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      },
      {
        filename: "vite.config",
        fileExtension: "js",
        content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
      },
      {
        folderName: "src",
        items: [
          {
            filename: "main",
            fileExtension: "jsx",
            content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
          },
          {
            filename: "App",
            fileExtension: "jsx",
            content: `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>React Starter</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          Count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to see changes.</p>
      </div>
    </div>
  );
}

export default App;`,
          },
          {
            filename: "index",
            fileExtension: "css",
            content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #242424;
  color: #ffffffde;
}

.app {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.card {
  padding: 2rem;
}

button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: #ffffffde;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

p {
  margin-top: 1rem;
  color: #888;
}

code {
  background-color: #1a1a1a;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9rem;
}`,
          },
        ],
      },
    ],
  },
};
