import type { TemplateDefinition } from "../types";

export const angularTemplate: TemplateDefinition = {
  id: "ANGULAR",
  name: "Angular",
  description:
    "Angular is a web framework that empowers developers to build fast, reliable applications",
  category: "fullstack",
  language: "TypeScript",
  framework: "Angular",
  iconPath: "/angular-2.svg",
  files: {
    folderName: "angular-starter",
    items: [
      {
        filename: "package",
        fileExtension: "json",
        content: JSON.stringify(
          {
            name: "angular-starter",
            version: "0.0.0",
            private: true,
            scripts: {
              start: "ng serve",
              build: "ng build",
            },
            dependencies: {
              "@angular/animations": "^18.0.0",
              "@angular/common": "^18.0.0",
              "@angular/compiler": "^18.0.0",
              "@angular/core": "^18.0.0",
              "@angular/forms": "^18.0.0",
              "@angular/platform-browser": "^18.0.0",
              "@angular/platform-browser-dynamic": "^18.0.0",
              "@angular/router": "^18.0.0",
              rxjs: "~7.8.0",
              tslib: "^2.6.0",
              "zone.js": "~0.14.0",
            },
            devDependencies: {
              "@angular-devkit/build-angular": "^18.0.0",
              "@angular/cli": "^18.0.0",
              "@angular/compiler-cli": "^18.0.0",
              typescript: "~5.4.0",
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
            compileOnSave: false,
            compilerOptions: {
              outDir: "./dist/out-tsc",
              forceConsistentCasingInFileNames: true,
              strict: true,
              noImplicitOverride: true,
              noPropertyAccessFromIndexSignature: true,
              noImplicitReturns: true,
              noFallthroughCasesInSwitch: true,
              sourceMap: true,
              declaration: false,
              downlevelIteration: true,
              experimentalDecorators: true,
              moduleResolution: "node",
              importHelpers: true,
              target: "ES2022",
              module: "ES2022",
              useDefineForClassFields: false,
              lib: ["ES2022", "dom"],
            },
            angularCompilerOptions: {
              enableI18nLegacyMessageIdFormat: false,
              strictInjectionParameters: true,
              strictInputAccessModifiers: true,
              strictTemplates: true,
            },
          },
          null,
          2
        ),
      },
      {
        filename: "angular",
        fileExtension: "json",
        content: JSON.stringify(
          {
            $schema: "./node_modules/@angular/cli/lib/config/schema.json",
            version: 1,
            newProjectRoot: "projects",
            projects: {
              "angular-starter": {
                projectType: "application",
                root: "",
                sourceRoot: "src",
                architect: {
                  build: {
                    builder:
                      "@angular-devkit/build-angular:application",
                    options: {
                      outputPath: "dist/angular-starter",
                      index: "src/index.html",
                      browser: "src/main.ts",
                      tsConfig: "tsconfig.json",
                      styles: ["src/styles.css"],
                    },
                  },
                  serve: {
                    builder:
                      "@angular-devkit/build-angular:dev-server",
                    configurations: {
                      development: {
                        buildTarget: "angular-starter:build",
                      },
                    },
                    defaultConfiguration: "development",
                  },
                },
              },
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
            fileExtension: "html",
            content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Angular Starter</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`,
          },
          {
            filename: "main",
            fileExtension: "ts",
            content: `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) =>
  console.error(err)
);`,
          },
          {
            filename: "styles",
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
  background-color: #1a1a2e;
  color: #eaeaea;
}`,
          },
          {
            folderName: "app",
            items: [
              {
                filename: "app.component",
                fileExtension: "ts",
                content: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <main class="container">
      <h1>Angular Starter</h1>
      <p>Edit <code>src/app/app.component.ts</code> to get started.</p>
    </main>
  \`,
  styles: [\`
    .container {
      text-align: center;
      padding: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #dd0031;
    }

    p {
      color: #888;
      font-size: 1.1rem;
    }

    code {
      background-color: #2a2a3e;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }
  \`],
})
export class AppComponent {
  title = 'angular-starter';
}`,
              },
            ],
          },
        ],
      },
    ],
  },
};
