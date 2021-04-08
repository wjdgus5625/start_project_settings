import test from './controller/test'
import search from './controller/search'

const router = (app) => {
    app.use('/test', test);
    app.use('/search', search);
}

export default router