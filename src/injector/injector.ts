import staticImplements from './../static-implements/static-implements';
import {
  injectDependencies,
  injectDependenciesAndInstantiate
} from './../injector-helpers/injector-helpers';

interface InjectorInterface {
  registerValue(name: string, valueItem: any): void;
  registerClass(name: string, classItem: any): void;
  registerService(name: string, serviceItem: any): void;
  get(name: string): any;
}

interface InjectorStatic {
  new(): InjectorInterface;
}

enum ItemType {
  VALUE,
  CLASS,
  SERVICE
}

interface InjectRepositoryEntryInterface {
  item: any;
  itemType: ItemType;
  resolveCache: any;
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

  private injectRepository: InjectRepositoryInterface;
  private resolveRecursionCounter: number;

  constructor() {
    this.injectRepository = {};
    this.resolveRecursionCounter = 0;
  }

  public registerValue(name: string, valueItem: any): void {
    this.register(name, valueItem, ItemType.VALUE);
  }

  public registerClass(name: string, classItem: any): void {
    this.register(name, classItem, ItemType.CLASS);
  }

  public registerService(name: string, serviceItem: any): void {
    this.register(name, serviceItem, ItemType.SERVICE);
  }

  public get(name: string): any {
    const injectList: any[] = [];
    let
      injectRepositoryEntry: InjectRepositoryEntryInterface,
      itemType: ItemType,
      i: number,
      item: any;

    injectRepositoryEntry = this.getInjectRepositoryEntry(name);
    if (injectRepositoryEntry.resolveCache) {
      return injectRepositoryEntry.resolveCache;
    }

    item = injectRepositoryEntry.item;
    itemType = injectRepositoryEntry.itemType;

    this.resolveRecursionInc();
    for (i = 0; item && item.$inject && (i < item.$inject.length); i++) {
      injectList.push(
        this.get(item.$inject[i])
      );
    }
    switch (itemType) {
      case ItemType.VALUE:
        injectRepositoryEntry.resolveCache = item;
        break;
      case ItemType.CLASS:
        injectRepositoryEntry.resolveCache = injectDependencies(item, injectList);
        break;
      case ItemType.SERVICE:
        injectRepositoryEntry.resolveCache = injectDependenciesAndInstantiate(item, injectList);
        break;
    }
    this.resolveRecursionDec();

    return injectRepositoryEntry.resolveCache;
  }

  private register(name: string, item: any, itemType: ItemType): void {
    if (typeof this.injectRepository[name] !== 'undefined') {
      throw MULTIPLE_REGISTER_EXCEPTION;
    }

    this.injectRepository[name] = {
      item,
      itemType,
      resolveCache: null
    };
  }

  private resolveRecursionInc(): void {
    this.resolveRecursionCounter++;
    if (this.resolveRecursionCounter >= RESOLVE_RECURSION_LIMIT) {
      throw RESOLVE_RECURSION_LIMIT_EXCEED_EXCEPTION;
    }
  }

  private resolveRecursionDec(): void {
    this.resolveRecursionCounter--;
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
}
