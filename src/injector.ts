import staticImplements from './static-implements';

export interface InjectorInterface {
  registerValue(name: string, valueItem: any): void;
  registerClass(name: string, classItem: any): void;
  registerService(name: string, serviceItem: any): void;
  get(name: string): any;
}

export interface InjectorStatic {
  new(): InjectorInterface;
}

enum ItemType {
  VALUE,
  CLASS,
  SERVICE
}

interface InjectRepositoryEntryInterface {
  item: any,
  itemType: ItemType,
  resolveCache: any
}

@staticImplements<InjectorStatic>()
export class Injector implements InjectorInterface {

  private injectRepository: { [name: string]: InjectRepositoryEntryInterface };
  private resolveRecursionCounter: number;

  constructor () {
    this.injectRepository = {};
    this.resolveRecursionCounter = 0;
  }

  private static RESOLVE_RECURSION_LIMIT: number = 20;
  private static RESOLVE_RECURSION_LIMIT_EXCEED_EXCEPTION: string = 'Injector - resolve recursion limit exceed';
  private static MULTIPLE_REGISTER_EXCEPTION: string = 'Injector - multiple register calls for the same name';
  private static UNABLE_TO_FIND_ITEM_EXCEPTION: string = 'Injector - unable to find factory/service for given name: ';
  private static TO_MANY_INJECTIONS_EXCEPTION: string = 'Injector - to many injections';
  
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
    let 
      injectRepositoryEntry: InjectRepositoryEntryInterface, 
      injectList: any[] = [],
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
        injectRepositoryEntry.resolveCache = Injector.injectDependencies(item, injectList);
        break;
      case ItemType.SERVICE:
        injectRepositoryEntry.resolveCache = Injector.injectDependenciesAndInstantiate(item, injectList);
        break;
    }
    this.resolveRecursionDec();

    return injectRepositoryEntry.resolveCache;
  }

  private register(name: string, item: any, itemType: ItemType): void {
    if (typeof this.injectRepository[name] !== 'undefined') {
      throw Injector.MULTIPLE_REGISTER_EXCEPTION;
    }

    this.injectRepository[name] = {
      itemType: itemType,
      item: item,
      resolveCache: null
    };
  }

  private resolveRecursionInc(): void {
    this.resolveRecursionCounter++;
    if (this.resolveRecursionCounter >= Injector.RESOLVE_RECURSION_LIMIT) {
      throw Injector.RESOLVE_RECURSION_LIMIT_EXCEED_EXCEPTION;
    }
  }

  private resolveRecursionDec(): void {
    this.resolveRecursionCounter--;
  }

  private getInjectRepositoryEntry(name: string): InjectRepositoryEntryInterface {
    let injectRepositoryEntry: InjectRepositoryEntryInterface;

    injectRepositoryEntry = this.injectRepository[name];
    if (typeof injectRepositoryEntry === 'undefined') {
      throw Injector.UNABLE_TO_FIND_ITEM_EXCEPTION + name;
    }

    return injectRepositoryEntry;
  }

  private static injectDependenciesAndInstantiate(item: any, injectList: any[]): any {
    let
      i: any = injectList,
      r: any;

    switch (injectList.length) {
      case 0: r = new item(); break;
      case 1: r = new item(i[0]); break;
      case 2: r = new item(i[0], i[1]); break;
      case 3: r = new item(i[0], i[1], i[2]); break;
      case 4: r = new item(i[0], i[1], i[2], i[3]); break;
      case 5: r = new item(i[0], i[1], i[2], i[3], i[4]); break;
      case 6: r = new item(i[0], i[1], i[2], i[3], i[4], i[5]); break;
      case 7: r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6]); break;
      case 8: r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7]); break;
      case 9: r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8]); break;
      case 10: r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9]); break;
      case 11: r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10]); break;
      case 12: r = new item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11]); break;
      default: throw Injector.TO_MANY_INJECTIONS_EXCEPTION;
    }

    return r;
  }

  private static injectDependencies(item: any, injectList: any[]): any {
    let
      i: any = injectList,
      r: any;

    switch (injectList.length) {
      case 0: r = item(); break;
      case 1: r = item(i[0]); break;
      case 2: r = item(i[0], i[1]); break;
      case 3: r = item(i[0], i[1], i[2]); break;
      case 4: r = item(i[0], i[1], i[2], i[3]); break;
      case 5: r = item(i[0], i[1], i[2], i[3], i[4]); break;
      case 6: r = item(i[0], i[1], i[2], i[3], i[4], i[5]); break;
      case 7: r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6]); break;
      case 8: r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7]); break;
      case 9: r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8]); break;
      case 10: r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9]); break;
      case 11: r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10]); break;
      case 12: r = item(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11]); break;
      default: throw Injector.TO_MANY_INJECTIONS_EXCEPTION;
    }

    return r;
  }

}
