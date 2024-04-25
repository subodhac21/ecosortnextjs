module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "192.168.3.16",
          port: '',
          pathname: '/account123/**',
        },
      ],
      
    },
    transpilePackages: ['@mui/x-charts']
  }