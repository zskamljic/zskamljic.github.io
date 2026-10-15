// Assembles the single GitHub Pages site out of two independent builds:
//
//   out/index.html      redirect to /blog
//   out/blog/...        the Next.js export (built with basePath /blog)
//   out/coinapp/...     the Angular export (built with --base-href=/coinapp/)
//   out/404.html        CoinApp's index, so /coinapp/coin/<id> deep links boot
//   out/.nojekyll       without this, Jekyll eats every _next/ directory
//
// `next build` writes the export to out/ with the *contents* of the blog at the
// top level even though basePath is /blog, because the URLs inside the HTML are
// already /blog/-prefixed. So the whole export has to be moved down one level to
// line the files up with those URLs.
//
// Usage: node scripts/assemble-site.mjs <angular-browser-dist-dir>

import { readdirSync, renameSync, mkdirSync, readFileSync, writeFileSync, rmSync, cpSync, copyFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const BLOG_PREFIX = '/blog';
const APP_PREFIX = '/coinapp';
const root = resolve(process.argv[2] ?? 'out');
const angularDist = process.argv[3] && resolve(process.argv[3]);

if (!angularDist) {
  console.error('usage: node scripts/assemble-site.mjs <out-dir> <angular-browser-dist-dir>');
  process.exit(1);
}

// 1. Push the whole Next export down into out/blog/ so the files sit where the
//    basePath-prefixed URLs inside them claim they are.
const blogDir = join(root, BLOG_PREFIX.slice(1));
mkdirSync(blogDir, { recursive: true });
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.name === BLOG_PREFIX.slice(1)) continue;
  renameSync(join(root, entry.name), join(blogDir, entry.name));
}

// 2. Copy the Angular build in under out/coinapp/. Copy rather than move, so the
//    input directory is left intact and the script can be re-run.
const appDir = join(root, APP_PREFIX.slice(1));
rmSync(appDir, { recursive: true, force: true });
cpSync(angularDist, appDir, { recursive: true });

// 3. Root landing page: the domain root used to be the blog, so keep it working
//    as a redirect instead of a dead end.
writeFileSync(
  join(root, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Zan Skamljic</title>
<meta http-equiv="refresh" content="0; url=${BLOG_PREFIX}/">
<link rel="canonical" href="${BLOG_PREFIX}/">
</head>
<body>
<p>This site has moved. <a href="${BLOG_PREFIX}/">Go to the blog</a>.</p>
<p><a href="${APP_PREFIX}/">CoinApp</a></p>
</body>
</html>
`,
);

// 4. GitHub Pages has no SPA rewrite: it serves the site-root 404.html for any
//    path it cannot resolve, and there is only one of them. CoinApp needs it,
//    because /coinapp/coin/<id> is a real client route with no file behind it.
//    So the root 404 is CoinApp's index plus a guard that hands any path that is
//    not ours back to the blog, which keeps the blog's dead links sane.
const appIndex = readFileSync(join(appDir, 'index.html'), 'utf8');
const guard = `<script>
    // Served as the site-wide 404 so that ${APP_PREFIX}/coin/<id> deep links boot
    // the SPA. Any path that is not under ${APP_PREFIX}/ is not ours.
    if (!location.pathname.startsWith('${APP_PREFIX}/')) {
      location.replace('${BLOG_PREFIX}/');
    }
  </script>`;
if (!appIndex.includes('</head>')) {
  throw new Error('CoinApp index.html has no </head> to inject the 404 guard into');
}
writeFileSync(join(root, '404.html'), appIndex.replace('</head>', `  ${guard}\n</head>`));

// 5. Jekyll skips directories whose names begin with an underscore, which would
//    silently drop blog/_next/* and 404 every asset.
writeFileSync(join(root, '.nojekyll'), '');

// 6. Browsers ask for /favicon.ico on the bare domain, where there is now only
//    the redirect page. Serve the blog's icon there so the tab still looks right;
//    without this the request falls through to the HTML 404 fallback.
const favicon = join(blogDir, 'favicon.ico');
if (existsSync(favicon)) {
  copyFileSync(favicon, join(root, 'favicon.ico'));
}

console.log(`assembled ${root}`);
console.log(`  ${BLOG_PREFIX}/   blog`);
console.log(`  ${APP_PREFIX}/  CoinApp`);