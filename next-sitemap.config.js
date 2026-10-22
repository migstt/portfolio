/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://migueltrinidad.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "./out",
  // Parked/preview routes, the /profile redirect stub and the fun /terminal
  // page: reachable by URL but deliberately kept out of the sitemap.
  exclude: ["/landing", "/profile", "/theme-neu", "/terminal"],
};
