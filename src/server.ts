import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import {UserController} from './controller/user'

const app = createKoaServer({
   controllers: [UserController]
})

app.listen(3000)