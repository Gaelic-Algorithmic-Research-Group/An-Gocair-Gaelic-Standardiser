/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ["en-UK", "gd"],
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path e.g. `/hello`
     */
    defaultLocale: "en-UK",
  },
};

module.exports = nextConfig;
