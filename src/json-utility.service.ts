import { Injectable } from '@angular/core';
declare var crossfilter: any;
declare var jsonQ: any;

import 'crossfilter/crossfilter.min.js';
import 'jsonq/jsonQ.min.js';

@Injectable()
export class JSONUtilityService {

    constructor() { }

    /**************************************************************************************************
     * Initialize jsonq object using json object or array
     **************************************************************************************************/

    _getJsonqObject(targetJson: any): any {
        if (targetJson === 'object') {
            return jsonQ(targetJson);
        } else {
            throw new TypeError('Incompatible type for targetJson: it must be an array or an object');
        }
    }

    /**************************************************************************************************
     * Basic Utility functions used with JSON
     **************************************************************************************************/

    /**
     * [_foreach To loop around the passed json object or array ]
     * @param  {any}      json_elm [ json object or array ]
     * @param  {Function} callback [ callback function containing key and value ]
     * @returns {[void]}            [void]
     */
    _foreach(json_elm: any, callback): void {
        if (typeof json_elm === 'object') {
            if (callback && typeof callback === 'function') {
                jsonQ.each(json_elm, (key, value) => {
                    callback(key, value);
                });
            } else {
                throw new TypeError('Incompatible type for callback: it must be a callback function');
            }
        } else {
            throw new TypeError('Incompatible type for json_elm: it must be an array or an object');
        }
    }

    /**
     * [_jsonType get the type of json ]
     * @param  {any}    json_elm [json]
     * @returns {[string]}          [type of json in string format]
     */
    _jsonType(json_elm: any): string {
        return jsonQ.objType(json_elm);
    }

    /**
     * [_mergeJsonsIntoTarget merge jsons into targetJson ]
     * @param  {any}        targetJson [ target json (all json data merged into this json)]
     * @param  {Array<any>} jsonArray  [ source json array ]
     * @return {[type]}                [description]
     */
    _mergeJsonsIntoTarget(targetJson: any, jsonArray: Array<any>) {
        let clone_json = this._cloneJson(jsonArray);
        if (typeof targetJson === 'object') {
            clone_json.unshift(targetJson);
            clone_json.unshift(true);
            jsonQ.merge.apply(this, clone_json);
        } else {
            throw new TypeError('Incompatible type for targetJson: it must be an array or an object');
        }
    }

    /**
     * [_mergeJsons merge jsons into new json]
     * @param  {any}        json [ source json ]
     * @param  {Array<any>} jsonArray  [ json array to merged ]
     * @return {[object]}                [ new merged json ]
     */
    _mergeJsons(json: any, jsonArray: Array<any>) {
        let clone_json = this._cloneJson(jsonArray);
        if (typeof json === 'object') {
            clone_json.unshift(json);
            if (this._jsonType(json) === 'object') {
                clone_json.unshift({});
            }else {
                clone_json.unshift([]);
            }
            return jsonQ.merge.apply(this, clone_json);
        } else {
            throw new TypeError('Incompatible type for targetJson: it must be an array or an object');
        }
    }

    /* tslint:disable */
    /**
     * [_findIndexOfJson find index of json into targetJson using search as an object or an array ]
     * @param  {any}     targetJson   [ json to be searched in ]
     * @param  {any}     jsonToSearch [ json object or an array to be searched in targetJson ]
     * @param  {boolean} qualifierFlag    [ tells weather second jsonToSearch is qualifier or not, jsonToSearch can be direct object for which we want to find index or it can be a qualifier(part of object) ]
     * @return {[number]}               [ index of found json object or an array or -1 is returned if not found ]
     */
    /* tslint:enable */
    _findIndexOfJson(targetJson: any, jsonToSearch: any, qualifierFlag: boolean) {
        if (typeof targetJson === 'object' && typeof jsonToSearch === 'object') {
            return jsonQ.index(targetJson, jsonToSearch, qualifierFlag);
        } else {
            throw new TypeError('Incompatible type for targetJson or jsonToSearch: it must be an array or an object');
        }
    }

    /**
     * [_findIndexOfJson find index of json into targetJson using search as a custom function ]
     * @param  {any}     targetJson   [ json to be searched in ]
     * @param  {any}     qualifier [ custom functional logic to search json in targetJson or an json object or json array ]
     * @return {[number]}               [ index of found json object or an array or -1 is returned if not found ]
     */
    _findIndexOfJsonUsingCustomQualifier(targetJson: any, qualifier) {
        if (typeof targetJson === 'object') {
            if (typeof qualifier === 'function' || typeof qualifier === 'object') {
                return jsonQ.index(targetJson, qualifier, true);
            } else {
                throw new TypeError('Incompatible type for qualifier: it must be a function handler');
            }
        } else {
            throw new TypeError('Incompatible type for targetJson: it must be an array or an object');
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

    /* tslint:disable */
    /**
     * [_findIfJsonIsPresent find the json object or an array is present in targetJson or not]
     * @param  {any}     targetJson   [json to be searched in]
     * @param  {any}     jsonToSearch [json object or an array to be searched in targetJson]
     * @param  {boolean} qualifier    [tells weather second param jsonToSearch is qualifier or not, jsonToSearch can be direct object for which we want to find index or it can be a qualifier(part of object)]
     * @return {[boolean]}               [ returns true if json is present in targetJson ]
     */
    /* tslint:enable */
    _findIfJsonIsPresent(targetJson: any, jsonToSearch: any, qualifier: boolean) {
        if (typeof targetJson === 'object' && typeof jsonToSearch === 'object') {
            return jsonQ.contains(targetJson, jsonToSearch, qualifier);
        } else {
            throw new TypeError('Incompatible type for targetJson or jsonToSearch: it must be an array or an object');
        }
    }

    /* tslint:disable */
    /**
     * [_findIfJsonIsPresentUsingCustomQualifier find the json object or an array is present in targetJson or not using custom functional qualifier ]
     * @param  {any}    targetJson       [ json to be searched in ]
     * @param  {[type]} qualifier [ custom functional logic to search json in targetJson or an json object or json array  ]
     * @return {[boolean]}                  [ returns true if json is present in targetJson ]
     */
    /* tslint:enable */
    _findIfJsonIsPresentUsingCustomQualifier(targetJson: any, qualifier) {
        if (typeof targetJson === 'object') {
            if (typeof qualifier === 'function' || typeof qualifier === 'object') {
                return jsonQ.contains(targetJson, qualifier, true);
            } else {
                throw new TypeError('Incompatible type for functionToSearch: it must be a function handler');
            }
        } else {
            throw new TypeError('Incompatible type for targetJson: it must be an array or an object');
        }
    }

    /**
     * [_findNthElementInJson find the element from targetJson at nth index ]
     * @param  {any}    targetJson [ json to be searched in ]
     * @param  {any} pattern      [ json index to be searched or pattern (2n*n) to be search in ]
     * @return {[any]}            [ searched element from targetJson ]
     */
    _findNthElementInJson(targetJson: any, pattern: any) {
        if (typeof targetJson === 'object') {
          if (typeof pattern === 'number' || typeof pattern === 'string') {
              return jsonQ.nthElm(targetJson, pattern);
          } else {
              throw new TypeError('Incompatible type for pattern: it must be a number or a pattern string');
          }
        } else {
            throw new TypeError('Incompatible type for targetJson: it must be an array or an object');
        }
    }

    /**
     * [_checkIfJsonsAreIdentical check if two jsons are identical or not]
     * @param  {any}    jsonA [first json to be checked]
     * @param  {any}    jsonB [second json to be checked]
     * @return {[boolean]}       [returns true if found identical]
     */
    _checkIfJsonsAreIdentical(jsonA: any, jsonB: any): boolean {
        if (typeof jsonA === 'object' && typeof jsonB === 'object') {
            return jsonQ.identical(jsonA, jsonB);
        } else {
            throw new TypeError('Incompatible type for jsonA or jsonB : it must be an array or an object');
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
            throw new TypeError('Incompatible type for arrayOfJsons : it must be an array');
        }
    }

    /**
     * [_findCommonElementsFromJsons find the common elements from json objects and arrays]
     * @param  {any[]}  arrayOfJsons [ source jsons for intersection operation ]
     * @return {[any[]]}              [ returns common elements from jsons ]
     */
    _findCommonElementsFromJsons(arrayOfJsons: any[]) {
        if (arrayOfJsons instanceof Array) {
            return jsonQ.intersection.apply(this, arrayOfJsons);
        } else {
            throw new TypeError('Incompatible type for arrayOfJsons : it must be an array');
        }
    }

    /**
     * [_getAllUniqueElementsFromJson get unique elements from targetJson ]
     * @param  {any[]}  targetJson [ source json to find unique elements ]
     * @return {[any[]]}            [ array of all unique elements ]
     */
    _getAllUniqueElementsFromJson(targetJson: any[]) {
        if (targetJson instanceof Array) {
            return jsonQ.unique(targetJson);
        } else {
            throw new TypeError('Incompatible type for arrayOfJsons : it must be an array');
        }
    }

    /**
     * [_getPathForKeyInJson get path from json matching a key ]
     * @param {any} targetJson             [ source json from which you want to find path ]
     * @param {string} keyToFind     [ actual key whose path to find ]
     * @return {[Array<string>]}              [ returns array containing strings having the path of key ]
     */
    _getPathForKeyInJson(targetJson: any, keyToFind: string): Array<string> {
        if (typeof targetJson === 'object') {
            return jsonQ(targetJson).find(keyToFind).path();
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /**
     * [_getPathValueForKeyFromJson find elements from targetJson using json pathToFind]
     * @param  {any}      targetJson [source json from which you want to get data ]
     * @param  {Array<string>} pathToFind [ path array which contains all key to reach a particular value in JSON ]
     * @return {[any]}              [ returned elements which matched the path ]
     */
    _getPathValueForKeyFromJson(targetJson: any, pathToFind: Array<string>) {
        if (typeof targetJson === 'object') {
            return jsonQ.pathValue(targetJson, pathToFind);
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /**
     * [_setPathValueForKeyInJson set value into a targetJson using pathToFind ]
     * @param  {any}      targetJson [source json from which you want to get data]
     * @param  {Array<string>} pathToFind [path array which contains all key to reach a particular value in JSON]
     * @param  {any}      valueToSet [value you want to set to targetJson]
     * @return {[type]}              [returns json if set ]
     */
    _setPathValueForKeyInJson(targetJson: any, pathToFind: Array<string>, valueToSet: any) {
        if (typeof targetJson === 'object') {
            return jsonQ.setPathValue(targetJson, pathToFind, valueToSet);
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /**
     * [_prettifyJson get pretty string of json ]
     * @param  {any}      targetJson [source json from which you want to get data]
     * @param  {boolean} htmlReturn [ true, if you want result as html string]
     * @return {[string]}              [ string formatted json ]
     */
    _prettifyJson(targetJson: any, htmlReturn = false) {
      if (typeof targetJson === 'object') {
          return jsonQ.prettify(targetJson, htmlReturn);
      } else {
          throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
      }
    }

    /**************************************************************************************************
     * Basic return data functions used with JSON
     **************************************************************************************************/

    /**
     * [_getValueFromJsonqobj get all the values from jsonq object ]
     * @param {any} jsonqObj             [ jsonq object ]
     * @return {[array]}              [ returns array of values if available ]
     */
    _getValueFromJsonqobj(jsonqObj: any) {
      if (typeof jsonqObj === 'object') {
          try {
              return jsonQ(jsonqObj).value();
          } catch (err) {
              throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
          }
      } else {
          throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
      }
    }

    /**
     * [_getPathForKeyInJsonqObject get path from json matching a key ]
     * @param {any} jsonqObject             [ it must be an jsonQ type object ]
     * @return {[Array<string>]}              [ returns array containing strings having the path of key ]
     */
    _getPathForKeyInJsonqObject(jsonqObject: any): Array<string> {
        if (typeof jsonqObject === 'object') {
            try {
                return jsonqObject.path();
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /**
     * [_getIndexForKeyInJson get path from json matching a key ]
     * @param {any} josnqObj             [ it must be an jsonQ type object ]
     * @param {any} qualifier     [ to filter result pass a function or a part of object to search for index ]
     * @return {[number]}              [ returns index if value found, if not returns -1 ]
     */
    _getIndexForKeyInJson(josnqObj: any, qualifier: any): number {
        if (typeof josnqObj === 'object') {
            if (typeof qualifier === 'function' || typeof qualifier === 'object') {
                try {
                    return josnqObj.index(qualifier);
                } catch (err) {
                    throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
                }
            } else {
                throw new TypeError('Incompatible type for keyTofind : it must be an array or an object or an function');
            }
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /**
     * [_getPathValueFromJsonqObject get value from json matching a path ]
     * @param {any} josnqObj             [ it must be an jsonQ type object ]
     * @param {Array<string>} path     [ array containing path strings which is a path of key in json ]
     * @return {[any]}              [ returns value at path specified ]
     */
    _getPathValueFromJsonqObject(josnqObj: any, path: Array<string>): any {
        if (typeof josnqObj === 'object') {
            try {
                return josnqObj.pathValue(path);
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /**
     * [_getNthValueInJson get value from json at nth index ]
     * @param {any} josnqObj             [ it must be an jsonQ type object ]
     * @param {number} index     [ index of array  ]
     * @return {[any]}              [ returns value at path specified ]
     */
    _getNthValueInJson(josnqObj: any, index: number): any {
        if (typeof josnqObj === 'object') {
            if (index >= 0) {
                try {
                    return josnqObj.nthElm(index);
                } catch (err) {
                    throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
                }
            } else {
                throw new TypeError('index must be a positive number');
            }
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /**
     * [_getUniqueElements get unique elements from json matching a key ]
     * @param {any} targetJson             [ source json from which you want to find value ]
     * @param {string} keyToFind     [ actual key whose value to find ]
     * @return {[array]}              [ returns an array of unique values. ]
     */
    _getUniqueElements(targetJson: any, keyToFind: string) {
        if (typeof targetJson === 'object') {
            return jsonQ(targetJson).find(keyToFind).unique();
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /**************************************************************************************************
     * Basic traverse and filter functions used with JSON
     **************************************************************************************************/

    /* tslint:disable */
    /**
     * [_findAllValuesInJson find all values from json matching a key ]
     * @param {any} targetJson             [ source json from which you want to find values ]
     * @param {string} keyToFind     [ actual key whose value to find ]
     * @param {any} qualifier     [ by default value is null, if null find all all values without filter, to filter result pass a function or a part of object to search ]
     * @param {boolean} outputValues     [ default is false, if false actual values array will be returned or if true returns jsonq object for further processing ]
     * @return {[any]}              [ return value depends on 'outputValues' flag if 'outputValues' true actual values array will be returned or if 'outputValues' false returns jsonq object for further processing ]
     */
    /* tslint:enable */
    _findAllValuesInJson(targetJson: any, keyToFind: string, qualifier: any = null, outputValues = false): any {
        if (typeof targetJson === 'object') {
            if (qualifier !== null) {
                if (typeof qualifier === 'function' || typeof qualifier === 'object') {
                    if (outputValues) {
                        return jsonQ(targetJson).find(keyToFind, qualifier).value();
                    }
                    return jsonQ(targetJson).find(keyToFind, qualifier);
                } else {
                    throw new TypeError('Incompatible type for keyTofind : it must be an array or an object or an function');
                }
            } else {
                if (outputValues) {
                    return jsonQ(targetJson).find(keyToFind).value();
                }
                return jsonQ(targetJson).find(keyToFind);
            }
        } else {
            throw new TypeError('Incompatible type for targetJson : it must be an array or an object');
        }
    }

    /* tslint:disable */
    /**
     * [_findSiblingsInJson find all values of sibling key from json ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {string} keyToFind     [ actual sibling key whose value to find ]
     * @param {boolean} outputValues     [ default is false, if false actual values array will be returned or if true returns jsonq object for further processing ]
     * @return {[any]}              [ return value depends on 'outputValues' flag if 'outputValues' true actual values array will be returned or if 'outputValues' false returns jsonq object for further processing ]
     */
    /* tslint:enable */
    _findSiblingsInJson(jsonqObj: any, keyToFind: string, outputValues = false): any {
        if (typeof jsonqObj === 'object') {
            try {
                if (outputValues) {
                    return jsonqObj.sibling(keyToFind).value();
                }
                return jsonqObj.sibling(keyToFind);
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an array or an object');
        }
    }

    /* tslint:disable */
    /**
     * [_findParentsInJson find all parents values from json matching a key ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {string} keyToFind     [ actual sibling key whose value to find ]
     * @param {boolean} outputValues     [ default is false, if false actual values array will be returned or if true returns jsonq object for further processing ]
     * @return {[any]}              [ return value depends on 'outputValues' flag if 'outputValues' true actual values array will be returned or if 'outputValues' false returns jsonq object for further processing ]
     */
    /* tslint:enable */
    _findParentsInJson(jsonqObj: any, keyToFind: string, outputValues = false): any {
        if (typeof jsonqObj === 'object') {
            try {
                if (outputValues) {
                    return jsonqObj.parent(keyToFind).value();
                }
                return jsonqObj.parent(keyToFind);
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an array or an object');
        }
    }

    /* tslint:disable */
    /**
     * [_findClosestKeyInJson find the closest key values going upward in json ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {string} keyToFind     [ actual closest key whose value to find ]
     * @param {boolean} outputValues     [ default is false, if false actual values array will be returned or if true returns jsonq object for further processing ]
     * @return {[any]}              [ return value depends on 'outputValues' flag if 'outputValues' true actual values array will be returned or if 'outputValues' false returns jsonq object for further processing ]
     */
    /* tslint:enable */
    _findClosestKeyInJson(jsonqObj: any, keyToFind: string, outputValues = false): any {
        if (typeof jsonqObj === 'object') {
            try {
                if (outputValues) {
                    return jsonqObj.closest(keyToFind).value();
                }
                return jsonqObj.closest(keyToFind);
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an array or an object');
        }
    }

    /* tslint:disable */
    /**
     * [_getFilteredListFromJson filter the jsonq object using qualifier filter ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {any} qualifier     [ custom functional logic to search json in targetJson or an json object or json array  ]
     * @param {boolean} outputValues     [ default is false, if false actual values array will be returned or if true returns jsonq object for further processing ]
     * @return {[any]}              [ return filtered value depends on 'outputValues' flag if 'outputValues' true actual values array will be returned or if 'outputValues' false returns jsonq object for further processing ]
     */
    /* tslint:enable */
    _getFilteredListFromJson(jsonqObj: any, qualifier: any, outputValues = false): any {
        if ( typeof jsonqObj === 'object') {
            if (typeof qualifier === 'function' || typeof qualifier === 'object') {
                try {
                    if (outputValues) {
                        return jsonqObj.filter(qualifier).value();
                    }
                    return jsonqObj.filter(qualifier);
                } catch (err) {
                    throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
                }
            } else {
                throw new TypeError('Incompatible type for qualifier : it must be an array or an object or a function');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an array or an object');
        }
    }

    /**************************************************************************************************
     * Basic json data manipulation functions used with JSON
     **************************************************************************************************/

    /**
     * [_setValueToJson set value into json against a key ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {any} valToSet     [ value to set in json against a key (can be a valid json type) ]
     * @return {[void]}              [ void ]
     */
    _setValueToJson(jsonqObj: any, valToSet: any): void {
        if ( typeof jsonqObj === 'object') {
                try {
                    return jsonqObj.value(valToSet);
                } catch (err) {
                    throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
                }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an array or an object');
        }
    }

    /**
     * [_appendValueToJson append value into json against a key ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {any} valToSet     [ value to append in json against a key (can be a valid json type) ]
     * @return {[void]}              [ void ]
     */
    _appendValueToJson(jsonqObj: any, valToSet: any): void {
        if ( typeof jsonqObj === 'object') {
            try {
                return jsonqObj.append(valToSet);
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an array or an object');
        }
    }

    /**
     * [_prependValueToJson prepend value into json against a key ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {any} valToSet     [ value to prepend in json against a key (can be a valid json type) ]
     * @return {[void]}              [ void ]
     */
    _prependValueToJson(jsonqObj: any, valToSet: any): void {
        if ( typeof jsonqObj === 'object') {
            try {
                return jsonqObj.prepend(valToSet);
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an array or an object');
        }
    }

    /**
     * [_appendValueAtIndexToJson append value at index into json against a key ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {any} valToSet     [ value to append in json against a key (can be a valid json type) ]
     * @param {any} index     [ index at which you want to append value ]
     * @return {[void]}              [ void ]
     */
    _appendValueAtIndexToJson(jsonqObj: any, valToSet: any, index: number): void {
        if ( typeof jsonqObj === 'object') {
            if (index >= 0) {
                try {
                    return jsonqObj.appendAt(index, valToSet);
                } catch (err) {
                    throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
                }
            } else {
                throw new TypeError('index must be a positive number');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
        }
    }

    /**
     * [_setPathValueToJsonqObject set value at path into json against a key ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {any} valToSet     [ value to set in json against a path of key (can be a valid json type) ]
     * @param {Array<string>} path     [ path array which contains all key to reach a particular value in JSON ]
     * @return {[void]}              [ void ]
     */
    _setPathValueToJsonqObject(jsonqObj: any, valToSet: any, path: Array<string>): void {
        if ( typeof jsonqObj === 'object') {
            try {
                return jsonqObj.setPathValue(path, valToSet);
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
        }
    }

    /**
     * [_loopJsonqObject loop through jsonq object finding key, value and path of json ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @param {[Function]} callback             [ callback function containing key, value, path  ]
     * @return {[void]}              [ void ]
     */
    _loopJsonqObject(jsonqObj: any, callback): void {
        if ( typeof jsonqObj === 'object') {
            if (callback && typeof callback === 'function') {
                try {
                    return jsonqObj.each(callback);
                } catch (err) {
                    throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
                }
            } else {
                throw new TypeError('Incompatible type for callback: it must be a callback function');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
        }
    }

    /**
     * [_refreshJsonqObject After any manipulation on jsonQ object you must call refresh method. ]
     * @param {any} jsonqObj             [ it must be an jsonQ type object ]
     * @return {[void]}              [ void ]
     */
    _refreshJsonqObject(jsonqObj: any): void {
        if ( typeof jsonqObj === 'object') {
            try {
                jsonqObj.refresh();
            } catch (err) {
                throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
            }
        } else {
            throw new TypeError('Incompatible type for jsonqObj : it must be an jsonQ type object');
        }
    }
}
