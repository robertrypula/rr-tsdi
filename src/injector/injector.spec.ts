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

    const MyClasss = injector.get('MyClass');
    const myClass: any = new MyClasss('test');

    expect(myClass.getValue()).toBe('some value');
  });
});

/*
  p00: any, p01: any, p02: any, p03: any,
  p04: any, p05: any, p06: any, p07: any,
  p08: any, p09: any, p10: any, p11: any
*/

class Service {

  public static $inject: string[] = ['value'];

  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}

const MyClass: any = function _MyClass(value: string) {
  class MyClass {
    public getValue(): string {
      return value;
    }
  }

  return MyClass;
};
MyClass.$inject = ['value'];
