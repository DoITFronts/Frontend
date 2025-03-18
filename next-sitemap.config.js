/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://doitz.netlify.app",
  generateRobotsTxt: true, // robots.txt 자동 생성
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};