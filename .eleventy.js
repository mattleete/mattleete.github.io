// Eleventy config for mattleete.github.io
// Stage 0: every existing .html page is copied through VERBATIM (no templating)
// so the built site is byte-identical to the hand-built one. Layouts,
// Markdown content and the CMS arrive in later stages.

module.exports = function (eleventyConfig) {
  // Static files served exactly as they are.
  for (const p of ["assets", "images", "favicon.svg", "apple-touch-icon.png", "matt-leete-cv.pdf"]) {
    eleventyConfig.addPassthroughCopy(`src/${p}`);
  }

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    // Existing pages carry inline <script>/<style>; never run them through a
    // template engine. Markdown (from Stage 1) renders via Nunjucks.
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
  };
};
