/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://migueltrinidad.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "./out",
  // Parked/preview routes and the /profile redirect stub: reachable by URL but
  // deliberately kept out of the sitemap.
  exclude: ["/landing", "/profile", "/theme-neu"],
};
