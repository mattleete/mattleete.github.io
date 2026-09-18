// Every Markdown file in this folder is a case study.
module.exports = {
  layout: "layouts/case-study.njk",
  tags: ["case_studies"],
  eleventyComputed: {
    // Drafts are never written to _site/ and never appear in lists.
    permalink: (d) => (d.draft ? false : `portfolio-case-study-${d.page.fileSlug}.html`),
    eleventyExcludeFromCollections: (d) => !!d.draft,
  },
};
