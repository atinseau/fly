import { Adapter } from "./Adapter";

export class GmailAdapter extends Adapter {
  constructor() {
    super()
    console.log('GmailAdapter constructor')
  }

  async job() {
    console.log('GmailAdapter job')
  }
}