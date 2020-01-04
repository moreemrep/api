import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './.env.local.test' })
} else {
  dotenv.config({ path: './.env.travis.test' })
}
