import { nanoid } from "nanoid";

export default class Order {
  /**
   *
   * @param {*} customer Customer who placed the order
   * @param {*} menuItems Items being ordered
   */
  constructor(deviceId, customer, menuItems) {
    this.deviceId = deviceId;
    this.customer = customer;
    this.menuItems = menuItems;
    this.orderTime = Math.floor(new Date().getTime() / 1000);
    this.orderId = nanoid();
  }

  /**
   *
   * @returns Order object
   */
  getOrder() {
    return this;
  }
}
