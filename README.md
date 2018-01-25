# RrTsdi

[![Build Status](https://travis-ci.org/robertrypula/rr-tsdi.svg?branch=master)](https://travis-ci.org/robertrypula/rr-tsdi)

This library is very simple implementation of Dependency Injection
written in TypeScript.

## Installation

Install as npm package:

```
npm install rr-tsdi --save
```

## Usage (TypeScript)

```typescript
import { Injector, InjectorInterface } from './injector';

const injector: InjectorInterface = new Injector();

// ----------------------------

const
  CONFIG = 'config',
  UTIL = 'util';

// ----------------------------

class Util {

  private config: any;
  static $inject = [CONFIG];

  constructor (config: any) {
    this.config = config;
  }
  
  login(): void {
    alert(this.config.login + ' ' + this.config.password);
  }
}

injector.registerService(UTIL, Util);

// ----------------------------

const config: any = {
  login: 'john',
  password: 'myp4$w0rd'
};

injector.registerValue(CONFIG, config);

// ----------------------------

const util: Util = injector.get(UTIL);

util.login();

```

## Usage directly in the browser (ES5)

```javascript
var injector = new RrTsdi.Injector();

// ----------------------------

var
  CONFIG = 'config',
  UTIL = 'util';

// ----------------------------

function Util(config) {
  this.config = config;
}

Util.$inject = [CONFIG];

Util.prototype.login = function () {
  alert(this.config.login + ' ' + this.config.password);
}

injector.registerService(UTIL, Util);

// ----------------------------

var config = {
  login: 'john',
  password: 'myp4$w0rd'
};

injector.registerValue(CONFIG, config);

// ----------------------------

var util = injector.get(UTIL);

util.login();
```

## Licence

The MIT License (MIT)

Copyright (c) 2018 Robert Rypuła

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

