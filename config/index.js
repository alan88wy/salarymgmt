const dev = process.env.NODE_ENV !== 'production'
export const svr = process.env.server

export const server = dev ? "http://localhost:3000" : svr

export const jwtSecret = 'ThisIsVerySecretive2022'


// const j = require('crypto').randomBytes(64).toString('hex') // jwt secret
