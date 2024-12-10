export default class Item {
  constructor(item, ...modifiers) {
    this.item = item;
    this.modifiers = modifiers;
  }

  getItem() {
    return this;
  }
}
