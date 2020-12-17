import test from './controller/test'

const router = (app) => {
    app.use('/test', test);
}

export default router