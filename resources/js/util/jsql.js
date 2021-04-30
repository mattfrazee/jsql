export const jSQL = {
    version: '1.0.0',
    DESC: 'DESC',
    ASC: 'ASC',
    lpad: function (inputString = '', padLength = 0, padString = '') {
        return inputString.padStart(padLength, padString);
    },
    rpad: function (inputString = '', padLength = 0, padString = '') {
        return inputString.padEnd(padLength, padString);
    },
    now: function () {
        var date = new Date()
        date = this.lpad(date.getUTCHours(), 2, '0') + ':' + this.lpad(date.getUTCMinutes(), 2, '0') + ':' + this.lpad(date.getUTCSeconds(), 2, '0');
        return this.curdate() + ' ' + date;
    },
    curdate: function () {
        var date = new Date()
        date = date.getUTCFullYear() + '-' + this.lpad(date.getUTCMonth() + 1, 2, '0') + '-' + this.lpad(date.getUTCDate(), 2, '0');
        return date;
    },
    COMPARE_BY_STR: (a = '', b = '', sortDirection = 'ASC') => {
        return (sortDirection.toUpperCase() === jSQL.DESC ? -a.localeCompare(b) : a.localeCompare(b));
    },
    COMPARE_BY_NUM: (a = 0, b = 0, sortDirection = 'ASC') => {
        return (sortDirection.toUpperCase() === jSQL.DESC ? (b - a) : -(b - a));
    },
}

Array.prototype.select = function (key) {
    return !key || key === '*' ? this : this.map(function (item) {
        if (Array.isArray(key)) {
            var obj = {};
            key.forEach(val => {
                if(item[val] != undefined) {
                    obj[val] = item[val];
                }
            });
            return obj;
        }
        else return {
            [key]: item[key]
        };
    });
}

Array.prototype.where = function (comparison) {
    return comparison === undefined
        ? this
        : this.filter(item => comparison(item));
}

Array.prototype.like = function (searchTerm = '', keys = []) {
    let result = [];

    function searchObject(obj, str) {
        var found = [];
        // if(typeof(obj[prop]) === 'object' && !Array.isArray(obj[prop]))
        for (prop in obj) {
            if (typeof (obj[prop]) === 'object' && !Array.isArray(obj[prop])) {
                //found=searchObject(obj[prop], str);
                // if(searchObject(obj[prop], str))
                console.log(obj[prop], searchObject(obj[prop], str));
            } else if (typeof (obj[prop]) === 'string' || typeof (obj[prop]) === 'number')
                if (String(obj[prop]).indexOf(String(str)) > -1)
                    found.push(String(obj[prop]).indexOf(String(str)));
            // console.log(typeof(obj[prop]) === 'string',  typeof(obj[prop]) === 'number', String(obj[prop]).indexOf(String(str)) > -1);
        }
        return found.length ? true : false;
    }

    this.forEach((item, id) => {
        if (searchObject(item, searchTerm))
            result.push(item);
    });
    return result;
}

Array.prototype.limit = function (recordCount = 1000, recordOffset = 0) {
    return this.slice(recordOffset, recordCount + recordOffset);
}

Array.prototype.orderBy = function (key, sortDirection = 'ASC') {
    var descending = sortDirection.toUpperCase() === jSQL.DESC;
    return typeof (key) === 'function' ? this.sort(key) : this.sort(function (a, b) {
        var x = a[key], y = b[key];
        return ((x < y) ? (descending ? 1 : -1) : ((x > y) ? (descending ? -1 : 1) : 0));
    });
}

Array.prototype.paginate = function (recordsPerPage = 1000, page = 1) {
    return this.slice((page - 1) * recordsPerPage, page * recordsPerPage);
}

Array.prototype.numberOfPaginatedRecords = function (recordsPerPage = 1000) {
    return Math.ceil(this.length / recordsPerPage);
}

Array.prototype.first = function () {
    return this[0];
}

Array.prototype.last = function () {
    return this[this.length - 1];
}

Array.prototype.get = function (id = 0) {
    return this[id];
}

Array.prototype.min = function (key) {
    return this.orderBy(key, jSQL.ASC).FIRST();
}

Array.prototype.max = function (key) {
    return this.orderBy(key, jSQL.DESC).FIRST();
}
