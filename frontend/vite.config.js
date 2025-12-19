// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";
// // export default defineConfig({ plugins: [react()] });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // Use plain esbuild JSX transform instead of @vitejs/plugin-react
// export default defineConfig({
//     plugins: [react()],
//   base: "/", // 🔑 CRITICAL for Railway static hosting
//   esbuild: {
//     jsxInject: `import React from "react"`,
//     jsxFactory: "React.createElement",
//     jsxFragment: "React.Fragment",
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
