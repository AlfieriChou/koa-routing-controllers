import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import './middleware/morganDev'

const app = createKoaServer({
  controllers: [__dirname + '/controller/*.ts']
})

app.listen(3000)
console.log('Koa server is running on port 3000.')
