import path from "node:path";
import react from "@vitejs/plugin-react";
import { createLogger, defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(async () => {
  const isDev = process.env.NODE_ENV !== "production";
  let inlineEditPlugin, editModeDevPlugin;

  if (isDev) {
    const inlineEditor = await import(
      "./plugins/visual-editor/vite-plugin-react-inline-editor.js"
    );
    const editModeDev = await import(
      "./plugins/visual-editor/vite-plugin-edit-mode.js"
    );

    inlineEditPlugin = inlineEditor.default;
    editModeDevPlugin = editModeDev.default;
  }

  const addTransformIndexHtml = {
    name: "add-transform-index-html",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: { type: "module" },
            children: `
              window.onerror = (message, source, lineno, colno, errorObj) => {
                const errorDetails = errorObj ? JSON.stringify({
                  name: errorObj.name,
                  message: errorObj.message,
                  stack: errorObj.stack,
                  source,
                  lineno,
                  colno,
                }) : null;
                window.parent.postMessage({
                  type: 'horizons-runtime-error',
                  message,
                  error: errorDetails
                }, '*');
              };
            `,
            injectTo: "head",
          },
        ],
      };
    },
  };

  console.warn = () => {};

  const logger = createLogger();
  const loggerError = logger.error;
  logger.error = (msg, options) => {
    if (options?.error?.toString().includes("CssSyntaxError: [postcss]")) {
      return;
    }
    loggerError(msg, options);
  };

  return {
    root: ".",
    publicDir: "public",
    customLogger: logger,
    plugins: [
      ...(isDev ? [inlineEditPlugin(), editModeDevPlugin()] : []),
      react(),
      addTransformIndexHtml,
    ],
    server: {
      cors: true,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false,
        },
      },
      headers: {
        "Cross-Origin-Embedder-Policy": "credentialless",
      },
      allowedHosts: true,
    },
    resolve: {
      extensions: [".jsx", ".js", ".tsx", ".ts", ".json"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        input: resolve(__dirname, "index.html"), // ✅ points to your HTML
        external: [
          "@babel/parser",
          "@babel/traverse",
          "@babel/generator",
          "@babel/types",
        ],
      },
    },
  };
});
