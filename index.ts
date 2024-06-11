import { Hono } from 'hono'
import template from './routes/template'
import runner from './routes/runner'

const app = new Hono()

app.route('/template', template)
app.route('/runner', runner)

export default {
  port: 8000,
  fetch: app.fetch,
} 