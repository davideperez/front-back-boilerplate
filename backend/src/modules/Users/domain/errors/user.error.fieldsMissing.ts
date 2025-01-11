export class UserErrorFieldsMissing extends Error {
  constructor() {
    super("Mandatory fields are missing 🎲");
    // Object.setPrototypeOf(this, UserErrorFieldsMissing.prototype);
  }
}
