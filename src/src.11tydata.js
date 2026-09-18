// Directory data for everything under src/.
// Keep the existing flat URLs (portfolio-about.html, cv.html, …) instead of
// Eleventy's default pretty URLs (/portfolio-about/), so no link on the site,
// the CV or LinkedIn changes.
module.exports = {
  permalink: (data) => `${data.page.filePathStem}.html`,
};
