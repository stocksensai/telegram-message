// Require dependencies
import Express from 'express' // Http server
import Morgan from 'morgan' // Terminal logging
import { status500 } from '../api/middlewares/handle' // Error Models
import Session from 'express-session' //Express session manager
import MongoStore from 'connect-mongo' //Session manager for MongoDB, Express
import config from '../config'
// Initilaziation
const app = Express()

// Session Start
app.use(
    Session({
        name: 'PROJECT_PHPSESSID',
        store: MongoStore.create({ mongoUrl: config.MONGO_CONNECTION }),
        secret: config.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    })
)

// Middlewares
app.use(Morgan('dev'))
app.use(Express.json({ limit: '10mb' }))

app.use((req, res, next) => {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
    }

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

// routes
import { router as authRouter } from './routes/auth'
import { router as botRouter } from './routes/bot'
import { router as messageRouter } from './routes/message'
import { router as chatRouter } from './routes/chat'
import { router as routeRouter } from './routes/route'

app.use('/route', routeRouter)
app.use('/auth', authRouter)
app.use('/chat', chatRouter)
app.use('/bot', botRouter)
app.use('/message', messageRouter)

// Error Handling
app.use(status500)

// Listen for requests
app.listen(config.PORT, () => console.log(`API => Listening on port ${config.PORT}`))

export { app }
