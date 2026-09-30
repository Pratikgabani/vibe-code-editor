import type { TemplateDefinition } from "../types";

export const vueTemplate: TemplateDefinition = {
  id: "VUE",
  name: "Vue.js",
  description:
    "Progressive JavaScript framework for building user interfaces with an approachable learning curve",
  category: "frontend",
  language: "JavaScript",
  framework: "Vue",
  iconPath: "/vuejs-icon.svg",
  files: {
    folderName: "vue-starter",
    items: [
      {
        filename: "package",
        fileExtension: "json",
        content: JSON.stringify(
          {
            name: "vue-starter",
            version: "0.0.0",
            private: true,
            type: "module",
            scripts: {
              dev: "vite",
              build: "vite build",
              preview: "vite preview",
            },
            dependencies: {
              vue: "^3.5.0",
            },
            devDependencies: {
              "@vitejs/plugin-vue": "^5.2.0",
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
    <title>Vue App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`,
      },
      {
        filename: "vite.config",
        fileExtension: "js",
        content: `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
});`,
      },
      {
        folderName: "src",
        items: [
          {
            filename: "main",
            fileExtension: "js",
            content: `import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App).mount('#app');`,
          },
          {
            filename: "App",
            fileExtension: "vue",
            content: `<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div class="app">
    <h1>Vue Starter</h1>
    <div class="card">
      <button @click="count++">Count is {{ count }}</button>
      <p>Edit <code>src/App.vue</code> and save to see changes.</p>
    </div>
  </div>
</template>

<style scoped>
.app {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #42b883;
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
  border-color: #42b883;
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
}
</style>`,
          },
          {
            filename: "style",
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
}`,
          },
        ],
      },
    ],
  },
};
