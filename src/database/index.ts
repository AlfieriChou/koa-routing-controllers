import { config } from '../config'
import * as appRoot from 'app-root-path'
import { createConnection, ConnectionOptions } from 'typeorm'

const mysql: Object = config['mysql']

export const databaseInitializer: any = async () => {
  const connection: ConnectionOptions = {
    type: 'mysql',
    host: mysql['host'] || 'localhost',
    port: parseInt(mysql['port'] || '3306', 10),
    username:mysql['username'] || 'user',
    password: mysql['password'] || null,
    database: mysql['database'] || 'test',
    synchronize: true,
    logging: true,
    entities: [
      `${appRoot}/src/entity/*.ts`
    ],
    migrations: [
      `${appRoot}/src/migration/*.ts`
    ],
    subscribers: [
      `${appRoot}/src/subscriber/*.ts`
    ],
    cli: {
      entitiesDir: `${appRoot}/src/entity`,
      migrationsDir: `${appRoot}/src/migration`,
      subscribersDir: `${appRoot}/src/subscriber`
    }
  }
  return await createConnection(connection).then((connection) => {
    console.log('Database connection established')
  })
}