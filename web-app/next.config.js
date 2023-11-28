// @ts-checkx

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /**
   * Set base path if your app is not hosted on the root domain.
   * For example, if your app is hosted at https://myapp.firebaseapp.com/myapp, set basePath to '/myapp'.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/basepath
   */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
};

module.exports = nextConfig;
