const __prod = process.env.NODE_ENV === 'production'

/**
 * @type {import('typeorm').ConnectionOptions}
 */
module.exports = {
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  type: 'postgres',
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: !__prod,
  logging: !__prod,
  entities: ['dist/**/*.entity.js']
}
