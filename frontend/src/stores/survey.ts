import { v4 as uuidv4 } from "uuid";

export enum FormType {
  dropdown, checkbox, number, radio
}

export class Survey {
  constructor(public itemList: Item[]) {}

  getItemObject() {
    return this.itemList;
  }

  addItem(item: Item) {
    this.itemList.push(item);
  }

  getItemById(id: number) {
    return this.itemList[id];
  }

  getJson(): string {
    return JSON.stringify(this)
           .split("")
           .reduce((total: string, letter: string) => {
              if (letter === `"`) {
                return total.concat(`\"`);
              }
            return total.concat(letter);
           });
  }
}

export class Options {
  id: string = uuidv4();
  constructor(public image: string, public value: string) {}
}

export abstract class Item {
  constructor(public title: string, public options: Options[], public type: FormType) {}

  setTitle(title: string) {
    this.title = title;
  }

  addOption(option: Options) {
    this.options.push(option);
  }
}

export class FormCheckbox extends Item {
    constructor(title: string, options: Options[]) {
        super(title, options, FormType.checkbox);
    }
}

export class FormRadio extends Item {
    constructor(title: string, options: Options[]) {
        super(title, options, FormType.radio);
    }
}