const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? "http://localhost:3000" : "https://salarymgmtNext.netlify.app"
export const jwtSecret = 'ThisIsVerySecretive2022'

// const j = require('crypto').randomBytes(64).toString('hex') // jwt secret
