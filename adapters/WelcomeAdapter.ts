import { sleep } from "bun"
import { Adapter } from "./Adapter"

export class WelcomeAdapter extends Adapter {
  constructor() {
    super()
    console.log('WelcomeAdapter constructor')
  }

  async job() {
    await sleep(2000)
    console.log('WelcomeAdapter job')
  }
}