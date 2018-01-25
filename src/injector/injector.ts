import {
  injectDependencies,
  injectDependenciesAndInstantiate
} from './../injector-helpers/injector-helpers';
import staticImplements from './../static-implements/static-implements';

interface InjectorInterface {
  registerValue(name: string, valueItem: any): void;
  registerClass(name: string, classItem: any): void;
  registerService(name: string, serviceItem: any): void;
  get(name: string): any;
}

interface InjectorStatic {
  new(recursionLimit: number): InjectorInterface;
}

enum ItemType {
  VALUE,
  SERVICE,
  CLASS
}

interface InjectRepositoryEntryInterface {
  cache: any;
  item: any;
  itemType: ItemType;
}

interface InjectRepositoryInterface {
  [name: string]: InjectRepositoryEntryInterface;
}

const RESOLVE_RECURSION_LIMIT: number = 20;

const RESOLVE_RECURSION_LIMIT_EXCEED_EXCEPTION: string = 'Resolve recursion limit exceed';
const MULTIPLE_REGISTER_EXCEPTION: string = 'Multiple register calls for the same name';
const UNABLE_TO_FIND_ITEM_EXCEPTION: string = 'Unable to find factory/service for given name: ';

@staticImplements<InjectorStatic>()
class Injector implements InjectorInterface {

  private recursionLimit: number;
  private injectRepository: InjectRepositoryInterface;
  private recursionCounter: number;

  constructor(recursionLimit: number = RESOLVE_RECURSION_LIMIT) {
    this.recursionLimit = recursionLimit;
    this.injectRepository = {};
    this.recursionCounter = 0;
  }

  public registerValue(name: string, valueItem: any): void {
    this.register(name, valueItem, ItemType.VALUE);
  }

  public registerService(name: string, serviceItem: any): void {
    this.register(name, serviceItem, ItemType.SERVICE);
  }

  public registerClass(name: string, classItem: any): void {
    this.register(name, classItem, ItemType.CLASS);
  }

  public get(name: string): any {
    const injectList: any[] = [];
    let injectRepositoryEntry: InjectRepositoryEntryInterface;
    let itemType: ItemType;
    let i: number;
    let item: any;

    injectRepositoryEntry = this.getInjectRepositoryEntry(name);
    if (injectRepositoryEntry.cache) {
      return injectRepositoryEntry.cache;
    }

    item = injectRepositoryEntry.item;
    itemType = injectRepositoryEntry.itemType;

    this.recursionInc();
    for (i = 0; item && item.$inject && (i < item.$inject.length); i++) {
      injectList.push(
        this.get(item.$inject[i])
      );
    }
    switch (itemType) {
      case ItemType.VALUE:
        injectRepositoryEntry.cache = item;
        break;
      case ItemType.SERVICE:
        injectRepositoryEntry.cache = injectDependenciesAndInstantiate(item, injectList);
        break;
      case ItemType.CLASS:
        injectRepositoryEntry.cache = injectDependencies(item, injectList);
        break;
    }
    this.recursionDec();

    return injectRepositoryEntry.cache;
  }

  private register(name: string, item: any, itemType: ItemType): void {
    if (typeof this.injectRepository[name] !== 'undefined') {
      throw MULTIPLE_REGISTER_EXCEPTION;
    }

    this.injectRepository[name] = {
      cache: null,
      item,
      itemType
    };
  }

  private recursionInc(): void {
    this.recursionCounter++;
    if (this.recursionCounter >= this.recursionLimit) {
      throw RESOLVE_RECURSION_LIMIT_EXCEED_EXCEPTION;
    }
  }

  private recursionDec(): void {
    this.recursionCounter--;
  }

  private getInjectRepositoryEntry(name: string): InjectRepositoryEntryInterface {
    let injectRepositoryEntry: InjectRepositoryEntryInterface;

    injectRepositoryEntry = this.injectRepository[name];
    if (typeof injectRepositoryEntry === 'undefined') {
      throw UNABLE_TO_FIND_ITEM_EXCEPTION + name;
    }

    return injectRepositoryEntry;
  }

}

export {
  InjectorInterface,
  InjectorStatic,
  Injector
};
