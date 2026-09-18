// Eleventy config for mattleete.github.io
//
// Two kinds of page live side by side during the CMS migration:
//   - legacy .html pages: copied through VERBATIM (htmlTemplateEngine: false)
//   - Markdown content (src/case-studies/*.md): rendered through Nunjucks
//     layouts in src/_includes/layouts/
// Output must stay byte-identical for anything not yet migrated.

const markdownIt = require("markdown-it");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // Static files served exactly as they are.
  for (const p of ["assets", "images", "favicon.svg", "apple-touch-icon.png", "matt-leete-cv.pdf", "admin/config.yml"]) {
    eleventyConfig.addPassthroughCopy(`src/${p}`);
  }

  // Global data may be written in YAML (src/_data/*.yml) — friendlier for the CMS than JSON.
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  // Raw HTML is allowed in Markdown so migrated case-study bodies (which keep
  // their bespoke block markup) render unchanged.
  eleventyConfig.setLibrary("md", markdownIt({ html: true, typographer: false }));

  // ── Case-study sections ──────────────────────────────────────────────
  // Editors write plain Markdown with "## Heading" per section. This turns
  // each heading + what follows into the numbered aside/body structure the
  // case-study CSS expects. Bodies migrated from the old HTML already carry
  // .cs-section markup and are passed through untouched.
  eleventyConfig.addFilter("csSections", function (content) {
    if (!content || /class="cs-section"/.test(content)) return content;
    const parts = content.split(/(?=<h2[^>]*>)/);
    let n = 0, out = "";
    for (const part of parts) {
      const m = part.match(/^<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*)$/);
      if (!m) { out += part; continue; }            // anything before the first heading
      n++;
      const body = m[2]
        // a paragraph that is ONLY bold text becomes a pull-quote
        .replace(/<p><strong>([\s\S]*?)<\/strong><\/p>/g,
          '<div class="cs-quote"><div class="cs-quote-text">$1</div></div>')
        // a bare image becomes a full-width figure; its title becomes the caption
        .replace(/<p><img src="([^"]+)" alt="([^"]*)"(?: title="([^"]*)")?><\/p>/g,
          (_, src, alt, cap) => `<div class="cs-image-full"><img class="cs-shot" src="${src}" alt="${alt}"></div>` +
            (cap ? `<div class="cs-image-caption">${cap}</div>` : ""))
        .replace(/<p>/g, '<p class="cs-body-text">');
      out += `<div class="cs-section">\n<div class="cs-section-aside">\n<div class="cs-section-label">${String(n).padStart(2, "0")}</div>\n<h2 class="cs-section-heading">${m[1]}</h2>\n</div>\n<div class="cs-section-body">\n${body.trim()}\n</div>\n</div>\n`;
    }
    return out;
  });

  // Array minus one value — used to drop the collection tag from a page's display tags.
  eleventyConfig.addFilter("without", (arr, v) => (arr || []).filter((x) => x !== v));

  // Look a case study up by slug (used for the "Next project" block).
  eleventyConfig.addFilter("bySlug", (collection, slug) =>
    (collection || []).find((p) => p.fileSlug === slug));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
  };
};
