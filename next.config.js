/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    NEXT_PUBLIC_REGION: process.env.NEXT_PUBLIC_REGION,
    NEXT_PUBLIC_USERPOOLID: process.env.NEXT_PUBLIC_USERPOOLID,
    NEXT_PUBLIC_USERPOOLWEBCLIENTID: process.env.NEXT_PUBLIC_USERPOOLWEBCLIENTID,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_REDIRECTURI: process.env.NEXT_PUBLIC_REDIRECTURI,
    NEXT_PUBLIC_APIURL: process.env.NEXT_PUBLIC_APIURL,
    NEXT_PUBLIC_CUSTOMPROVIDER: process.env.NEXT_PUBLIC_CUSTOMPROVIDER,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
