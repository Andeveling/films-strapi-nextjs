const dev = process.env.NODE_ENV !== 'production'
export const server = dev ? 'http://localhost:1337/api' : 'https://your_deployment.server.com'
