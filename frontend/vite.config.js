// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// export default defineConfig({ plugins: [react()] });

import { defineConfig } from "vite";

// Use plain esbuild JSX transform instead of @vitejs/plugin-react
export default defineConfig({
  esbuild: {
    jsxInject: `import React from "react"`,
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
});
