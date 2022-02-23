export const jSQL = {
    version: '1.0.0',
    sort: {
        asc: 1,
        desc: -1,
        compare(a, b, sortDirection = jSQL.sort.asc) {
            // if(typeof(a) === 'number' && typeof(b) === 'number'){
            if (jSQL.isNumber(a) && jSQL.isNumber(b)) {
                return jSQL.sort.compareNumber(Number(a), Number(b), sortDirection);
            }
            else if (typeof a === 'string' && typeof b === 'string') {
                return jSQL.sort.compareString(a, b, sortDirection);
            }
        },
        compareNumber(a, b, sortDirection = jSQL.sort.asc) {
            return (sortDirection === jSQL.sort.desc ? (b - a) : -(b - a));
        },
        compareString(a, b, sortDirection = jSQL.sort.asc) {
            return (sortDirection === jSQL.sort.desc ? -a.localeCompare(b) : a.localeCompare(b));
        },
        compareDate(a, b, sortDirection = jSQL.sort.asc) {
            if (jSQL.isDate(a) && jSQL.isDate(b)) {
                a = new Date(a).getTime();
                b = new Date(b).getTime();
                return (sortDirection === jSQL.sort.desc ? (b - a) : -(b - a));
            }
        },
    },
    date: {
        now() {
            return jSQL.date.format();
        },
        format(date) {
            let d = jSQL.isDate(date) ? new Date(date) : new Date();
            return d.getFullYear() + '-' +
                ('00' + (d.getMonth()+1)).slice(-2) + '-' +
                ('00' + d.getDate()).slice(-2) + ' ' +
                ('00' + d.getHours()).slice(-2) + ':' +
                ('00' + d.getMinutes()).slice(-2) + ':' +
                ('00' + d.getSeconds()).slice(-2);
            // return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
        },
    },
    getPropertyValue(key, item) {
        if(!!key && !!item) {
            let keys = key.split('.');
            let newObj = item;
            for (let i = 0; i < keys.length; i++) {
                if (newObj?.[keys[i]] !== undefined) {
                    newObj = newObj[keys[i]];
                    if (i === keys.length - 1) {
                        return newObj;
                    }
                } else {
                    return;
                }
            }
        }
    },
    createProperty(key, value) {
        return key.split('.').reverse().reduce((prev, current, id) => (
            { [current] : (id !== 0 ? {...prev} : value) }
        ), {});
    },
    updateProperty(obj, access, value){
        if (typeof(access)=='string'){
            access = access.split('.');
        }
        if (access.length > 1){
            this.updateProperty(obj[access.shift()],access,value);
        } else {
            obj[access[0]] = value;
        }
        return obj;
    },
    isNumber(value) {
        return /^-?[0-9.]+(e\+?[0-9]+)?$/.test(value);
        // return typeof value === 'number';
    },
    isDate(value) {
        return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) || !isNaN(Date.parse(value));
    },
    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },
}


Array.prototype.append = function(json){
    return this.concat([json]);
}
Array.prototype.appendAt = function(index = 0, json){
    let left = this.slice(0, index), right = this.slice(index, this.length);
    return left.concat([json]).concat(right);
}
Array.prototype.avg = Array.prototype.average = Array.prototype.mean = function (key) {
    if (jSQL.isNumber(this.sum(key))) {
        return this.sum(key) / this.thatHave(key).length;
    }
}
Array.prototype.createMultipleRelationships = function (keyArray, relationalArray, relationalKey, relationshipKey = relationalKey) {
    this.forEach(item => {
        let keys = jSQL.getPropertyValue(keyArray, item);
        if(!!keys && Array.isArray(keys)) {
            keys.forEach(key => {
                let relations = relationalArray.where(relationalKey, '=', key).first();
                let relationshipValue = jSQL.getPropertyValue(relationshipKey, item);
                jSQL.updateProperty(item, relationshipKey, [...(Array.isArray(relationshipValue) ? relationshipValue : []), relations]);
            });
        }
    });
    return this;
}
Array.prototype.createRelationship = function (key, relationalArray, relationalKey, relationshipKey = relationalKey) {
    this.forEach((item, id) => {
        let itemValue = jSQL.getPropertyValue(key, item);
        if(itemValue !== undefined) {
            let relations = relationalArray.whereManyOrFirst(relationalKey, '=', itemValue);
            if(jSQL.getPropertyValue(relationshipKey) === undefined) {
                this[id] = JSON.merge({}, item, jSQL.createProperty(relationshipKey, relations));
            } else {
                jSQL.updateProperty(item, relationshipKey, relations);
            }
        }
    });
    return this;
}
Array.prototype.duplicates = function (){
    let orig = [];
    let copy = [];
    this.forEach(item => {
        if(typeof item === 'object' && !Array.isArray(item)) {
            if(!orig.includesJSON(item)){
                orig.push(item);
            } else if(!copy.includesJSON(item)) {
                copy.push(item);
            }
        } else {
            if(!orig.includes(item)) {
                orig.push(item);
            } else if(!copy.includes(item)) {
                copy.push(item);
            }
        }
    });
    return copy;
}
Array.prototype.each = function (callback) {
    this.forEach(callback);
    return this;
}
Array.prototype.extract = function (key, callback) {
    return this.thatHave(key).map(
        item => typeof callback === 'function'
            ? callback(item, key)
            : jSQL.getPropertyValue(key, item)
    );
}
Array.prototype.first = function () {
    return this[0];
}
Array.prototype.get = function (id = 0) {
    return this[id];
}
Array.prototype.has = Array.prototype.thatHas = function (key) {
    if(typeof key === 'object') {
        let res = false;
        this.forEach(item => {
            if (JSON.isEqual(key, item)) {
                res = true;
            }
        });
        return res;
    }
    else {
        return !!this.thatHave(key).length;
    }
}
Array.prototype.includesJSON = function (json) {
    let included = false;
    this.forEach(item => {
        if(JSON.isEqual(item, json)){
            included = true;
        }
    });
    return included;
}
Array.prototype.insertAfter = Array.prototype.insert = function(json){
    this.push(Object.assign({}, json));
    return this;
}
Array.prototype.insertAt = function(index = 0, json){
    this.splice(index, 0, Object.assign({}, json));
    return this;
}
Array.prototype.insertBefore = function(json){
    this.unshift(Object.assign({}, json));
    return this;
}
Array.prototype.last = function () {
    return this[this.length - 1];
}
Array.prototype.like = Array.prototype.searchFor = function (searchTerm = '', caseSensitive = true) {
    let result = [];

    function searchObject(obj, str, caseSensitive = true) {
        var found = [];
        for (var prop in obj) {
            let type = typeof (obj[prop]);
            let searchResult;
            let objectSearchResults;
            if (type === "number") {
                searchResult = String(obj[prop]).indexOf(str) > -1;
            }
            if (type === "string") {
                searchResult = (caseSensitive ? obj[prop] : obj[prop].toLowerCase()).indexOf(caseSensitive ? str : String(str).toLowerCase()) > -1;
            }
            if (searchResult) {
                found.push([str, obj[prop], searchResult]);
            }
            if (type === "object") {
                objectSearchResults = searchObject(obj[prop], str, caseSensitive);
            }
            if (objectSearchResults) {
                found.push([str, obj[prop], objectSearchResults]);
            }
            // strings and numbers
            // if (type === 'string' || type === 'number') {
            //     var searchResult = (caseSensitive || type === 'number' ? obj[prop] : obj[prop].toLowerCase()).indexOf( caseSensitive || type === 'number' ? str : str.toLowerCase()) > -1;
            //     if(searchResult) {
            //         found.push( [str, obj[prop], searchResult] );
            //     }
            // }
            //opens objects for searching
            // if ( type === 'object' ) {
            //     var objectSearchResults = searchObject(obj[prop], str, caseSensitive);
            //     if(objectSearchResults) {
            //         found.push( [str, obj[prop], objectSearchResults] );
            //     }
            // }
        }
        return !!found.length;
    }

    this.forEach(item => {
        if (searchObject(item, searchTerm, caseSensitive)) {
            result.push(item);
        }
    });
    return result;
}
Array.prototype.limit = function (recordCount = 1000, recordOffset = 0) {
    return this.slice(recordOffset, recordCount + recordOffset);
}
Array.prototype.lowerCase = function (key) {
    return this.map( item => {
        let propValue = jSQL.getPropertyValue(key, item) ?? null;
        if(typeof propValue === 'string')
            propValue = propValue.toLowerCase();
        if(typeof item[key] === 'string')
            return Object.assign({}, item, jSQL.createProperty(key, item[key].toLowerCase()));
        if(typeof item === 'string')
            return item.toLowerCase();
        if(typeof item[key] === 'object' && Array.isArray(item[key]))
            return JSON.merge({}, item, jSQL.createProperty(key, item[key].lowerCase(key)));
        if(typeof item === 'object' && !Array.isArray(item) && propValue !== null)
            return JSON.merge({}, item, jSQL.createProperty(key, propValue));
        return item;
    });
}
Array.prototype.max = function (key) {
    if(!this.has(key)){
        return;
    }
    return this.orderBy(key).last();
}
Array.prototype.median = function (key) {
    let median = 0,
        values = this.thatHave(key).sortBy(key).map( item => Number( jSQL.getPropertyValue(key, item) ) );
    length = values.length;
    if (length % 2 === 0) {
        let num1 = values[length / 2 - 1],
            num2 = values[length / 2];
        median = (num1 + num2) / 2;
    } else {
        median = values[(length - 1) / 2];
    }
    return median;
}
Array.prototype.min = function (key) {
    if(!this.has(key)){
        return;
    }
    return this.orderBy(key).first();
}
Array.prototype.occurrences = function (key, value){
    return this.where(key, '=', value).length;
}
Array.prototype.orderBy = Array.prototype.sortBy = function (key, sortDirection = jSQL.sort.asc) {
    return typeof (key) === 'function' ? this.sort(key) : this.sort((a, b) => {
        return jSQL.sort.compare(a[key], b[key], sortDirection);
    });
}
Array.prototype.orderByDate = Array.prototype.sortByDate = function (key, sortDirection = jSQL.sort.asc) {
    return this.sort((a, b) => {
        if(jSQL.isDate(a[key]) && jSQL.isDate(b[key])) {
            return jSQL.sort.compareDate(a[key], b[key], sortDirection);
        }
    });
}
Array.prototype.pages = function (recordsPerPage) {
    return Math.ceil(this.length / (recordsPerPage ? recordsPerPage : this.length));
}
Array.prototype.paginate = function (recordsPerPage = 1000, page = 1) {
    return this.slice((page - 1) * recordsPerPage, page * recordsPerPage);
}
Array.prototype.parseJSON = function () {
    let res = [];
    this.forEach(val => {
        try {
            res.push(JSON.parse(val));
        } catch (e) {
            res.push(val);
        }
    });
    return res;
}
Array.prototype.prepend = function(json){
    return [json].concat(this);
}
Array.prototype.removeDuplicates = function (){
    let res=[];
    this.forEach(item => {
        if(typeof item === 'object' && !Array.isArray(item)){
            if(!res.includesJSON(item)){
                res.push(item);
            }
        } else {
            if(!res.includes(item)){
                res.push(item);
            }
        }
    });
    return res;
}
Array.prototype.select = Array.prototype.pluck = function (key) {
    let res = [];
    let map = this.map(item => {
        let obj = {};
        let arr = Array.isArray(key) ? key : [...arguments];
        arr.forEach(val => {
            if (item.hasOwnProperty(val)) {
                obj[val] = item[val];
            }
        });
        return obj;
    });
    map.forEach(item => {
        if (item !== undefined && Object.keys(item).length !== 0) {
            res.push(item);
        }
    });
    return res;
}
Array.prototype.sum = Array.prototype.total = function (key) {
    let sum;
    this.thatHave(key).where(item => {
        let res = jSQL.getPropertyValue(key, item);
        if (jSQL.isNumber(res)) {
            if (sum === undefined) {
                sum = 0;
            }
            sum += Number(res);
        }
    });
    return sum;
}
Array.prototype.thatHave = function (key = '') {
    return this.where(item => jSQL.getPropertyValue(key, item) !== undefined);
    // return this.where(obj => obj.hasOwnProperty(key));
}
Array.prototype.transform = function (callback) {
    return this.map(callback);
}
Array.prototype.upperCase = function (key) {
    return this.map( item => {
        let propValue = jSQL.getPropertyValue(key, item) ?? null;
        if(typeof propValue === 'string')
            propValue = propValue.toUpperCase();
        if(typeof item[key] === 'string')
            return Object.assign({}, item, jSQL.createProperty(key, item[key].toUpperCase()));
        if(typeof item === 'string')
            return item.toUpperCase();
        if(typeof item[key] === 'object' && Array.isArray(item[key]))
            return JSON.merge({}, item, jSQL.createProperty(key, item[key].upperCase(key)));
        if(typeof item === 'object' && !Array.isArray(item) && propValue !== null)
            return JSON.merge({}, item, jSQL.createProperty(key, propValue));
        return item;
    });
}
Array.prototype.where = Array.prototype.andWhere = function () {
    if (arguments.length) {
        if (typeof (arguments[0]) != 'function' && arguments.length === 3) {
            let val1 = arguments[0], op = arguments[1], val2 = arguments[2];
            return this.thatHave(val1).filter(item => {
                let propValue = jSQL.getPropertyValue(val1, item);
                switch (op) {
                    case '<':
                        return propValue < val2;
                    case '<=':
                        return propValue <= val2;
                    case '=':
                        return propValue === val2;
                    case '!=':
                        return propValue !== val2;
                    case '>':
                        return propValue > val2;
                    case '>=':
                        return propValue >= val2;
                }
            });
        }
        return typeof (arguments[0]) === 'function' ? this.filter(item => arguments[0](item)) : this;
    }
    return this;
    // return comparison === undefined
    //     ? this
    //     : this.filter(item => comparison(item));
}
Array.prototype.whereFalse = function (key) {
    return this.where(key, '=', false);
}
Array.prototype.whereManyOrFirst = function () {
    let res = this.where(...arguments);
    return res.length === 1 ? res.first() : res;
}
Array.prototype.whereNotNull = function (key) {
    return this.where(key, '!=', null);
}
Array.prototype.whereNull = function (key) {
    return this.where(key, '=', null);
}
Array.prototype.whereTrue = function (key) {
    return this.where(key, '=', true);
}

JSON.merge = function(target, ...sources){
    if (!sources.length) {
        return target;
    }
    const source = sources.shift();
    if (jSQL.isObject(target) && jSQL.isObject(source)) {
        for (const key in source) {
            if (jSQL.isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                JSON.merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return JSON.merge(target, ...sources);
}
JSON.isEqual = function (json1,json2){
    if(!json1 || !json2)
        return false;
    let isEqual = true;
    const objKeys1 = Object.keys(json1).sort();
    const objKeys2 = Object.keys(json2).sort();
    function recursive(array1, array2){
        let isEqual = true;
        array1.forEach((item, id) => {
            if(typeof item === 'string' || typeof item === 'number'){
                if(array1[id] !== array2[id]){
                    isEqual = false;
                }
            }
        });
        return isEqual;
    }
    if(objKeys1.join() === objKeys2.join()){
        objKeys1.forEach(item => {
            if(typeof json1[item] === 'string' || typeof json1[item] === 'number'){
                if(json1[item] !== json2[item]){
                    isEqual = false;
                }
            }
            else if(Array.isArray(json1[item]) && Array.isArray(json2[item])){
                isEqual = recursive(json1[item], json2[item]);
            }
            else if(typeof json1[item] === 'object' && !Array.isArray(json1[item])){
                isEqual = JSON.isEqual(json1[item], json2[item]);
            }
        });
    }
    else {
        isEqual = false;
    }
    return isEqual;
}
