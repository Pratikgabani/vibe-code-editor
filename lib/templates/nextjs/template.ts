import type { TemplateDefinition } from "../types";

export const nextjsTemplate: TemplateDefinition = {
  id: "NEXTJS",
  name: "Next.js",
  description:
    "The React framework for production with server-side rendering and static site generation",
  category: "fullstack",
  language: "TypeScript",
  framework: "Next.js",
  iconPath: "/nextjs-icon.svg",
  files: {
    folderName: "nextjs-starter",
    items: [
      {
        filename: "package",
        fileExtension: "json",
        content: JSON.stringify(
          {
            name: "nextjs-starter",
            version: "0.1.0",
            private: true,
            scripts: {
              dev: "next dev",
              build: "next build",
              start: "next start",
            },
            dependencies: {
              next: "^14.2.0",
              react: "^18.3.1",
              "react-dom": "^18.3.1",
            },
            devDependencies: {
              "@types/node": "^20",
              "@types/react": "^18",
              "@types/react-dom": "^18",
              typescript: "^5",
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
              target: "ES2017",
              lib: ["dom", "dom.iterable", "esnext"],
              allowJs: true,
              skipLibCheck: true,
              strict: true,
              noEmit: true,
              esModuleInterop: true,
              module: "esnext",
              moduleResolution: "bundler",
              resolveJsonModule: true,
              isolatedModules: true,
              jsx: "preserve",
              incremental: true,
              plugins: [{ name: "next" }],
              paths: { "@/*": ["./*"] },
            },
            include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
            exclude: ["node_modules"],
          },
          null,
          2
        ),
      },
      {
        filename: "next.config",
        fileExtension: "ts",
        content: `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;`,
      },
      {
        folderName: "app",
        items: [
          {
            filename: "layout",
            fileExtension: "tsx",
            content: `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js Starter',
  description: 'A minimal Next.js starter project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
          },
          {
            filename: "page",
            fileExtension: "tsx",
            content: `export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#0a0a0a',
      color: '#ededed',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Next.js Starter
      </h1>
      <p style={{ color: '#888', fontSize: '1.1rem' }}>
        Edit <code style={{
          backgroundColor: '#1a1a1a',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
        }}>app/page.tsx</code> to get started.
      </p>
    </main>
  );
}`,
          },
          {
            filename: "globals",
            fileExtension: "css",
            content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,
          },
        ],
      },
    ],
  },
};
