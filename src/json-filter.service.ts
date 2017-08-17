import { Injectable } from '@angular/core';
declare var crossfilter: any;
declare var jsonQ: any;

import '../node_modules/crossfilter/crossfilter.min.js';
import '../node_modules/jsonq/jsonQ.min.js';

@Injectable()
export class JSONFilterService {

  constructor() { }

  // JSON filter methods

  /**
   * [_foreach To loop around the passed json object or array ]
   * @param  {any}      json_elm [ json object or array ]
   * @param  {Function} callback [ Logic you want to apply on each loop ]
   * @return {[type]}            [description]
   */
  _foreach(json_elm: any, callback) {
    jsonQ.each(testJson, (key, value) => {
      callback(key, value);
    });
  }

  /**
   * [_jsonType get the type of json ]
   * @param  {any}    json_elm [json]
   * @return {[string]}          [type of json in string format]
   */
  _jsonType(json_elm: any) {
    return jsonQ.objType(json_elm);
  }




}
