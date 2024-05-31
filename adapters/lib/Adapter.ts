import { z } from "zod"


export class Adapter {
  constructor() {
    console.log('Adapter constructor')
  }

  /**
   * The shape is the data that the adapter will return
   */
  public shape() {
    return z.object({})
  }

  /**
   * the schema is the data that the adapter will accept as input
   * so the shape of a previous adapter should match the schema of this adapter
   */
  public schema() {
    return z.object({})
  }
}