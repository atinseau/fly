import { Hono } from 'hono'
import template from './routes/template'

const app = new Hono()

app.route('/template', template)

export default {
  port: 8000,
  fetch: app.fetch,
} 