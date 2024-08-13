import * as esbuild from "esbuild";
import * as nodemon from "nodemon";

import { readFileSync } from "fs";
import { resolve } from "path";

const isDev = process.argv.includes("--dev");
const nodePackage = JSON.parse(readFileSync(resolve(process.cwd(), "package.json"), "utf8"));

/** @type {esbuild.BuildOptions} */
const buildOptions = {
    banner: {
        "js" : "import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);"
    },
    entryPoints: [resolve(process.cwd(), "src", "bin", "www.js")],
    outfile: resolve(process.cwd(), "dist", "server.mjs"),
    platform: "node",
    format: "esm",
    bundle: true,
    sourcemap: true,
    sourceRoot: "src",
    external: [
        Object.keys(nodePackage.dependencies ?? {}),
        Object.keys(nodePackage.peerDependencies ?? {}),
        Object.keys(nodePackage.devDependencies ?? {}),
    ].flat(),
};

if (isDev) {
    await esbuild.context(buildOptions)
        .then(async ctx => {
            await ctx.watch();

            /** @type { nodemon.NodemonSettings } */
            const nodemonSettings = {
                exec: "node --enable-source-maps dist/server.mjs",
                events: {
                    ["restart"]: "echo '\\n\\n<================== BACKEND START ==================>\\n\\n'"
                }
            };
            nodemon.default(nodemonSettings);
        });
} else {
    await esbuild.build(buildOptions);
}