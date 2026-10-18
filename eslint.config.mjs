import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    // Error boundaries: a full-page reload (<a href>) is deliberate, because
    // the client router may be the thing that broke.
    files: ["app/error.js", "app/global-error.js"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  {
    // ImageResponse (Satori) renders plain <img>; next/image does not work there.
    files: ["lib/og.jsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "public/**", "next-env.d.ts"]),
]);

export default eslintConfig;
