import { Injectable } from '@angular/core';
declare var crossfilter: any;
declare var jsonQ: any;

import 'crossfilter/crossfilter.min.js';
import 'jsonq/jsonQ.min.js';

@Injectable()
export class JSONUtilityService {

  constructor() { }

  // JSON Utility methods

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
    if (typeof targetJson === 'object') {
      jsonArray.unshift(targetJson);
      jsonArray.unshift(true);
      jsonQ.merge.apply(this, jsonArray);
    } else {
      throw new TypeError("Incompatible type for targetJson: it must be an array or an object");
    }
  }

  /**
   * [_mergeJsons merge jsons into new json]
   * @param  {any}        json [ source json ]
   * @param  {Array<any>} jsonArray  [ json array to merged ]
   * @return {[object]}                [ new merged json ]
   */
  _mergeJsons(json: any, jsonArray: Array<any>) {
    if (typeof json === 'object') {
      jsonArray.unshift(json);
      jsonArray.unshift({});
      return jsonQ.merge.apply(this, jsonArray);
    } else {
      throw new TypeError("Incompatible type for targetJson: it must be an array or an object");
    }
  }

  /**
   * [_findIndexOfJson find index of json into targetJson using search as an object or an array ]
   * @param  {any}     targetJson   [ json to be searched in ]
   * @param  {any}     jsonToSearch [ json object or an array to be searched in targetJson ]
   * @param  {boolean} qualifier    [ tells weather seconde jsonToSearch is qualifier or not, jsonToSearch can be direct object for which we want to find index or it can be a qualifier(part of object) ]
   * @return {[number]}               [ index of found json object or an array or -1 is returned if not found ]
   */
  _findIndexOfJson(targetJson: any, jsonToSearch: any, qualifier: boolean) {
    if (typeof targetJson === 'object' && typeof jsonToSearch === 'object') {
      return jsonQ.index(targetJson, jsonToSearch, qualifier);
    } else {
      throw new TypeError("Incompatible type for targetJson or jsonToSearch: it must be an array or an object");
    }
  }

  /**
   * [_findIndexOfJson find index of json into targetJson using search as a custom function ]
   * @param  {any}     targetJson   [ json to be searched in ]
   * @param  {any}     jsonToSearch [ custom functional logic to search json in targetJson ]
   * @return {[number]}               [ index of found json object or an array or -1 is returned if not found ]
   */
  _findIndexOfJsonUsingCustomQualifier(targetJson: any, functionToSearch) {
    if (typeof targetJson === 'object') {
      if (typeof functionToSearch === 'function') {
        return jsonQ.index(targetJson, functionToSearch, true);
      } else {
        throw new TypeError("Incompatible type for functionToSearch: it must be a function handler");
      }
    } else {
      throw new TypeError("Incompatible type for targetJson: it must be an array or an object");
    }
  }

  /**
   * [_cloneJson clone the json into new json object or array]
   * @param  {any}    sourceJson [source json to clone]
   * @return {[any]}            [new cloned json]
   */
  _cloneJson(sourceJson: any) {
    return jsonQ.clone(sourceJson);
  }

  /**
   * [_findIfJsonIsPresent find the json object or an array is present in targetJson or not]
   * @param  {any}     targetJson   [json to be searched in]
   * @param  {any}     jsonToSearch [json object or an array to be searched in targetJson]
   * @param  {boolean} qualifier    [tells weather seconde jsonToSearch is qualifier or not, jsonToSearch can be direct object for which we want to find index or it can be a qualifier(part of object)]
   * @return {[boolean]}               [ returns true if json is present in targetJson ]
   */
  _findIfJsonIsPresent(targetJson: any, jsonToSearch: any, qualifier: boolean) {
    if (typeof targetJson === 'object' && typeof jsonToSearch === 'object') {
      return jsonQ.contains(targetJson, jsonToSearch, qualifier);
    } else {
      throw new TypeError("Incompatible type for targetJson or jsonToSearch: it must be an array or an object");
    }
  }

  /**
   * [_findIfJsonIsPresentUsingCustomQualifier find the json object or an array is present in targetJson or not using custom functional qualifier ]
   * @param  {any}    targetJson       [ json to be searched in ]
   * @param  {[type]} functionToSearch [ custom functional logic to search json in targetJson ]
   * @return {[boolean]}                  [ returns true if json is present in targetJson ]
   */
  _findIfJsonIsPresentUsingCustomQualifier(targetJson: any, functionToSearch) {
    if (typeof targetJson === 'object') {
      if (typeof functionToSearch === 'function') {
        return jsonQ.contains(targetJson, functionToSearch, true);
      } else {
        throw new TypeError("Incompatible type for functionToSearch: it must be a function handler");
      }
    } else {
      throw new TypeError("Incompatible type for targetJson: it must be an array or an object");
    }
  }

  /**
   * [_findNthElementInJson find the element from targetJson at nth index ]
   * @param  {any}    targetJson [ json to be searched in ]
   * @param  {number} index      [ json index to be searched ]
   * @return {[any]}            [ searched element from targetJson ]
   */
  _findNthElementInJson(targetJson: any, index: number) {
    if (typeof targetJson === 'object') {
      return jsonQ.nthElm(targetJson, index);
    } else {
      throw new TypeError("Incompatible type for targetJson: it must be an array or an object");
    }
  }

  /**
   * [_checkIfJsonsAreIdentical check if two jsons are identical or not]
   * @param  {any}    jsonA [first json to be checked]
   * @param  {any}    jsonB [second json to be checked]
   * @return {[boolean]}       [returns true if found identical]
   */
  _checkIfJsonsAreIdentical(jsonA: any, jsonB: any) {
    if (typeof jsonA === 'object' && typeof jsonB === 'object') {
      return jsonQ.identical(jsonA, jsonB);
    } else {
      throw new TypeError("Incompatible type for jsonA or jsonB : it must be an array or an object");
    }
  }

  /**
   * [_getUnionOfJsons get the union of jsons ]
   * @param  {any[]}  arrayOfJsons [ source jsons for union operation ]
   * @return {[any[]]}              [ json returned after union operation ]
   */
  _getUnionOfJsons(arrayOfJsons: any[]) {
    if (arrayOfJsons instanceof Array) {
      return jsonQ.union.apply(this, arrayOfJsons);
    } else {
      throw new TypeError("Incompatible type for arrayOfJsons : it must be an array");
    }
  }

  /**
   * [_findCommonElementsFromJsons find common elements from jsons]
   * @param  {any[]}  arrayOfJsons [ source jsons for intersection operation ]
   * @return {[any[]]}              [ returns common elements from jsons ]
   */
  _findCommonElementsFromJsons(arrayOfJsons: any[]) {
    if (arrayOfJsons instanceof Array) {
      return jsonQ.intersection.apply(this, arrayOfJsons);
    } else {
      throw new TypeError("Incompatible type for arrayOfJsons : it must be an array");
    }
  }

  /**
   * [_getAllUniqueElementsFromJson get unique elements from targetJson ]
   * @param  {any[]}  targetJson [ source json to find unique elements ]
   * @return {[any[]]}            [ array of all unique elements ]
   */
  _getAllUniqueElementsFromJson(targetJson: any[]) {
    if (targetJson instanceof Array) {
      return jsonQ.unique.apply(this, targetJson);
    } else {
      throw new TypeError("Incompatible type for arrayOfJsons : it must be an array");
    }
  }

  /**
   * [_getPathValueFromJson find elements from targetJson using json pathToFind]
   * @param  {any}      targetJson [source json from which you want to get data ]
   * @param  {string[]} pathToFind [ path array which contains all key to reach a particular value in JSON ]
   * @return {[any]}              [ returned elements which mathced the path ]
   */
  _getPathValueFromJson(targetJson: any, pathToFind: string[]) {
    if (typeof targetJson === 'object') {
      return jsonQ.pathValue(targetJson, pathToFind);
    } else {
      throw new TypeError("Incompatible type for targetJson : it must be an array or an object");
    }
  }

  /**
   * [_setPathValueInJson set value into a targetJson using pathToFind ]
   * @param  {any}      targetJson [source json from which you want to get data]
   * @param  {string[]} pathToFind [path array which contains all key to reach a particular value in JSON]
   * @param  {any}      valueToSet [value you want to set to targetJson]
   * @return {[type]}              [returns value if set ]
   */
  _setPathValueInJson(targetJson: any, pathToFind: string[], valueToSet: any) {
    if (typeof targetJson === 'object') {
      return jsonQ.setPathValue(targetJson, pathToFind, valueToSet);
    } else {
      throw new TypeError("Incompatible type for targetJson : it must be an array or an object");
    }
  }

  /**
   * Basic Utility functions used with JSON
   */



}
