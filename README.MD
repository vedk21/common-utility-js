# common-utility-js

## Installation

To install this library, run:

```bash
$ npm install common-utility-js --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install common-utility-js
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { CommonUtilityModule } from 'common-utility-js';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    CommonUtilityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its services (JSONFilterService) in your Angular application:

```typescript
// You can now use your library service to utilize json filter services
import { Component } from '@angular/core';
import { JSONUtilityService } from 'common-utility-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private jsonFilter: JSONUtilityService) {}

  // use JSONUtilityService methods to perform various operations on JSON
  //for-example

  getJsonFiltered() {
    const jsonArray = [
      {
        key: 'qwerty',
        val: 'asdfgh'
      },
      {
        key: 'zxcvb',
        val: 'lkjhg'
      }
    ];

    let targetJson = [{
      key: 'qwerty',
      val: 'asdfgh'
    }];

    console.log('_foreach');
    this.jsonFilter._foreach(jsonArray, (key, value) => {
      console.log('key: ' + key + ' --> val: ' + JSON.stringify(value));
    });

    console.log('_jsonType');
    console.log('type of json : ' + this.jsonFilter._jsonType(jsonArray[0].key));


    console.log('_mergeJsons');
    console.log(this.jsonFilter._mergeJsons(targetJson, jsonArray));

    // you can also nest the methods to draw more filtered and useful output 
    console.log(this.jsonFilter._jsonType(this.jsonFilter._mergeJsons(targetJson, jsonArray)));

```


## License

MIT © [vedant kakade](mailto:vedant99kakade@gmail.com)
