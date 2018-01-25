
const TO_MANY_INJECTIONS_EXCEPTION = 'To many injections';

function injectDependenciesAndInstantiate(item: any, injectList: any[]): any {
  const i: any = injectList;
  let r: any;

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
    default: throw TO_MANY_INJECTIONS_EXCEPTION;
  }

  return r;
}

function injectDependencies(item: any, injectList: any[]): any {
  const i: any = injectList;
  let r: any;

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
    default: throw TO_MANY_INJECTIONS_EXCEPTION;
  }

  return r;
}

export {
  TO_MANY_INJECTIONS_EXCEPTION,
  injectDependenciesAndInstantiate,
  injectDependencies
}
