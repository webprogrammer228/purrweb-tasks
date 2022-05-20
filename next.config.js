const Cookies = require("js-cookie");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
module.exports = {
  async headers() {
    return [
      {
        source: "/subscriptions",
        headers: [
          {
            key: "Authorization",
            value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI1LCJlbWFpbCI6InVzZXJuYW1lMjJAbWFpbC5ydSIsImlhdCI6MTY1MzAzNTMxNX0.jERiBwxpMT4NLdUxCeK05UMRgf7kzxiKk8McCJIzCYQ`,
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};
