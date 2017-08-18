import { Injectable } from '@angular/core';
declare var crossfilter: any;
declare var jsonQ: any;

import 'crossfilter/crossfilter.min.js';
import 'jsonq/jsonQ.min.js';

@Injectable()
export class JSONFilterService {

  constructor() { }

  // JSON filter methods

  /**
   * Basic Utility functions used with JSON
   */

  /**
   * [_foreach To loop around the passed json object or array ]
   * @param  {any}      json_elm [ json object or array ]
   * @param  {Function} callback [ Logic you want to apply on each loop ]
   * @return {[type]}            [description]
   */
  _foreach(json_elm: any, callback) {
    jsonQ.each(json_elm, (key, value) => {
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

  /**
   * [_mergeJsonsIntoTarget merge jsons into targetJson ]
   * @param  {any}        targetJson [ target json (all json data merged into this json)]
   * @param  {Array<any>} jsonArray  [ source json array ]
   * @return {[type]}                [description]
   */
  _mergeJsonsIntoTarget(targetJson: any, jsonArray: Array<any>) {
    if (typeof targetJson == 'object') {
      jsonQ.merge(true, targetJson, jsonArray);
    } else {
      throw new TypeError("Incompatible type for targetJson: it must be an array or an object");
    }
  }

  /**
   * [_mergeJsons merge jsons into new json]
   * @param  {any}        Json [ source json ]
   * @param  {Array<any>} jsonArray  [ json array to merged ]
   * @return {[object]}                [ new merged json ]
   */
  _mergeJsons(Json: any, jsonArray: Array<any>) {
    if (typeof Json == 'object') {
      return jsonQ.merge({}, Json, jsonArray);
    } else {
      throw new TypeError("Incompatible type for targetJson: it must be an array or an object");
    }
  }

  /**
   * [findIndexOfJson find index of json into targetJson using search as an object or an array ]
   * @param  {any}     targetJson   [ json to be searched in ]
   * @param  {any}     jsonToSearch [ json object or an array to be searched in targetJson ]
   * @param  {boolean} qualifier    [ tells weather seconde jsonToSearch is qualifier or not, jsonToSearch can be direct object for which we want to find index or it can be a qualifier(part of object) ]
   * @return {[number]}               [ index of found json object or an array or -1 is returned if not found ]
   */
  findIndexOfJson(targetJson: any, jsonToSearch: any, qualifier: boolean) {
    if (typeof targetJson == 'object' && typeof jsonToSearch == 'object') {
      return jsonQ.index(targetJson, jsonToSearch, qualifier);
    } else {
      throw new TypeError("Incompatible type for targetJson or jsonToSearch: it must be an array or an object");
    }
  }

  /**
   * [findIndexOfJson find index of json into targetJson using search as a custom function ]
   * @param  {any}     targetJson   [ json to be searched in ]
   * @param  {any}     jsonToSearch [ custom functional logic to search json in targetJson ]
   * @return {[number]}               [ index of found json object or an array or -1 is returned if not found ]
   */
  findIndexOfJsonUsingCustomQualifier(targetJson: any, functionToSearch) {
    if (typeof targetJson == 'object') {
      if (typeof functionToSearch == 'function') {
        return jsonQ.index(targetJson, functionToSearch, true);
      } else {
        throw new TypeError("Incompatible type for functionToSearch: it must be a function handler");
      }
    } else {
      throw new TypeError("Incompatible type for targetJson: it must be an array or an object");
    }
  }

}