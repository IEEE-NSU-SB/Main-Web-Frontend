declare module "odometer" {
  interface OdometerOptions {
    el: HTMLElement;
    value?: number;
    format?: string;
    theme?: string;
    duration?: number;
  }

  export default class Odometer {
    constructor(options: OdometerOptions);
    update(newValue: number): void;
  }
}
