module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST ? process.env.MYSQL_HOST : '127.0.0.1',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  database: process.env.MYSQL_DATABASE ? process.env.MYSQL_DATABASE : 'shop',
  username: process.env.MYSQL_USERNAME ? process.env.MYSQL_USERNAME : 'root',
  password: process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : 'root',
  charset: 'utf8mb4_bin',
  synchronize: true,
  logging: false,
  entities: [
    process.env.NODE_ENV === 'production' ?
        'dist/entity/**/*.js' :
        'src/entity/**/*.ts',
  ],
  migrations: [
    process.env.NODE_ENV === 'production' ?
        'dist/migration/**/*.js' :
        'src/migration/**/*.ts',
  ],
  subscribers: [
    process.env.NODE_ENV === 'production' ?
        'dist/subscriber/**/*.js' :
        'src/subscriber/**/*.ts',
  ],
  cli: {
    'entitiesDir': 'src/entity',
    'migrationsDir': 'src/migration',
    'subscribersDir': 'src/subscriber',
  },
}