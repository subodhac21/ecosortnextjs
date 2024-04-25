module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "subodh21.pythonanywhere.com/",
          port: '',
          pathname: '/account123/**',
        },
      ],
      
    },
    transpilePackages: ['@mui/x-charts']
  }