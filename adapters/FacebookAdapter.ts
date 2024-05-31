import { z } from "zod";
import { Adapter } from "./lib/Adapter";

export class FacebookAdapter extends Adapter {
  constructor() {
    super()
    console.log('FacebookAdapter constructor')
  }
}