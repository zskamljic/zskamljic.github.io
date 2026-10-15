// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true
    },
    // The blog is served from /blog so that CoinApp can live beside it at
    // /coinapp on the same GitHub Pages site. basePath rewrites every generated
    // asset URL and next/link href, so the pages keep working unchanged.
    basePath: "/blog",
    // GH Pages serves directories as well as .html, so this makes the export
    // emit maven-gradle/index.html instead of maven-gradle.html.
    trailingSlash: true,
}

module.exports = nextConfig
