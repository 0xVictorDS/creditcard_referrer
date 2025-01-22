import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains:['localhost', '127.0.0.1', 'creditcard-referrer.vercel.app', 'github.com', ],
    remotePatterns: [
      {
        hostname:'creditcard-referrer.vercel.app',
        pathname: '/**',
        port: '',
        protocol: 'https'
      },
      {
        hostname: 'rewardsccapi.blob.core.windows.net',
        pathname: '/**',
        port: '',
        protocol: 'https'
      }
    ]
  }
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key:'Strict-Transport-Security',
  //           value: 'max-age=63072000; includeSubDomains; preload'
  //         }
  //       ]
  //     }
  //   ]
  // }
};

export default nextConfig;
