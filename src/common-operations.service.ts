import { Injectable } from '@angular/core';

@Injectable()
export class CommonOps {

    constructor() {
    }

    /**************************************************************************************************
     * Common JS operations
     **************************************************************************************************/

    /**
     * [_checkIfValidIdentifier check if identifier is having valid value ]
     * @param  {any}  identifier [ identifier whose value to validate ]
     * @returns {[boolean]}              [ returns true if identifier is valid else returns false ]
     */
    _checkIfValidIdentifier(identifier: any): boolean {
        if (identifier !== undefined && identifier !== 'undefined' && identifier !== null
            && identifier !== 'NULL' && identifier !== 'null') {
            return true;
        }
        return false;
    }
}
