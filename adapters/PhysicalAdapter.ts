import { Adapter } from "./lib/Adapter";


export class PhysicalAdapter extends Adapter {
  constructor() {
    super()
    console.log('PhysicalAdapter constructor')
  }
}