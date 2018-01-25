import { Injector } from './injector';

describe('injector', () => {
  let injector: Injector;

  beforeEach(() => {
    injector = new Injector();
  });

  it('should create valid instance', () => {
    expect(injector).toBeInstanceOf(Injector);
  });

  it('should allow to register and retrieve a value', () => {
    injector.registerValue('test', 'my value');
    expect(injector.get('test')).toBe('my value');
  });

  it('should allow to register and retrieve a service', () => {
    injector.registerValue('value', 'some value');
    injector.registerService('service', Service);

    const serviceA = injector.get('service');
    const serviceB = injector.get('service');

    expect(serviceA).toBe(serviceB);
  });

  it('should allow to register and retrieve a class', () => {
    injector.registerValue('value', 'some value');
    injector.registerClass('MyClass', MyClass);

    const MyClass_ = injector.get('MyClass');
    const myClass: any = new MyClass_('test');

    expect(myClass.getValue()).toBe('some value');
  });
});

class Service {

  static $inject: string[] = ['value'];

  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}

const MyClass: any = function _MyClass(value: string) {
  class __MyClass {
    constructor() {
    }

    getValue(): string {
      return value;
    }
  }

  return __MyClass;
}
MyClass.$inject = ['value'];
