import { Injectable } from '@angular/core';
import {JSONUtilityService} from './json-utility.service';
import {CommonOps} from 'common-operations.service';

@Injectable()
export class JSONCommons {

    constructor(private jsonFilter: JSONUtilityService, private commonOps: CommonOps) {
    }

    /**************************************************************************************************
     * Common JSON operations JSON Arrays
     **************************************************************************************************/

    /**
     * [_findJSONObject find unique JSON object from an Array using key and value ]
     * @param  {Array<object>}  jsonArray [ json containning objects to find from ]
     * @param  {string}  keyToSearch [ key to search in json array ]
     * @param  {any}  valToSearch [ value to search against in json array ]
     * @returns {[any]}              [ returns found object or null if not found ]
     */
    _findJSONObject(jsonArray: Array<object>, keyToSearch: string, valToSearch: any): any {
        // prepare jsonQ object
        let jsonqObject = this.jsonFilter._getJsonqObject(jsonArray);
        if (this.commonOps._checkIfValidIdentifier(valToSearch)) {
            // get 'this' context in self
            let self = this;
            let foundObjectList = this.jsonFilter._findAllValuesInJson(jsonqObject, keyToSearch, function () {
                // return if valToSearch is found
                return self.jsonFilter._checkIfJsonsAreIdentical(this, valToSearch);
            });
            // filter the first element
            let filteredList = this.jsonFilter._getFilteredListFromJson(foundObjectList, 'first', true);
            // check if array is not empty
            if (this.commonOps._checkIfValidIdentifier(filteredList) && filteredList.length > 0) {
                return filteredList[0];
            } else {
                return null;
            }
        } else {
            throw new ReferenceError('valToSearch does not exist, may be undefined or null');
        }
    }

    /**
     * [_findAllJSONObjects find all JSON objects from an Array using key and value ]
     * @param  {Array<object>}  jsonArray [ json containning objects to find from ]
     * @param  {string}  keyToSearch [ key to search in json array ]
     * @param  {any}  valToSearch [ value to search against in json array ]
     * @returns {[any]}              [ returns found objects array or null if not found ]
     */
    _findAllJSONObjects(jsonArray: Array<object>, keyToSearch: string, valToSearch: any): any {
        // prepare jsonQ object
        let jsonqObject = this.jsonFilter._getJsonqObject(jsonArray);
        if (this.commonOps._checkIfValidIdentifier(valToSearch)) {
            // get 'this' context in self
            let self = this;
            let foundObjectList = this.jsonFilter._findAllValuesInJson(jsonqObject, keyToSearch, function () {
                // return if valToSearch is found
                return self.jsonFilter._checkIfJsonsAreIdentical(this, valToSearch);
            });
            // filter the first element
            let filteredList = this.jsonFilter._getFilteredListFromJson(foundObjectList, 'first', true);
            // check if array is not empty
            if (this.commonOps._checkIfValidIdentifier(filteredList) && filteredList.length > 0) {
                return filteredList;
            } else {
                return null;
            }
        } else {
            throw new ReferenceError('valToSearch does not exist, may be undefined or null');
        }
    }
}
