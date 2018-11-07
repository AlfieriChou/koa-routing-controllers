import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import { UserController } from './controller/user'
import './middleware/startTime'
import './middleware/endTime'

const app = createKoaServer({
   controllers: [UserController]
})

app.listen(3000)
console.log('Koa server is running on port 3000.')