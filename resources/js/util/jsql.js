export const jSQL = {
    VERSION:'1.0.0',
    DESC:'DESC',
    ASC:'ASC',
    USE: function(jsonArray) {
        return jsonArray;
    },
    LPAD: function(inputString = '', padLength = 0, padString = ''){
        return inputString.padStart(padLength, padString);
    },
    RPAD: function(inputString = '', padLength = 0, padString = ''){
        return inputString.padEnd(padLength, padString);
    },
    NOW: function(){
        var date = new Date()
        date = this.LPAD(date.getUTCHours(),2,'0') + ':' + this.LPAD(date.getUTCMinutes(),2,'0') + ':' + this.LPAD(date.getUTCSeconds(),2,'0');
        return this.CURDATE() + ' ' + date;
    },
    CURDATE: function(){
        var date = new Date()
        date = date.getUTCFullYear() + '-' + this.LPAD(date.getUTCMonth() + 1,2,'0') + '-' + this.LPAD(date.getUTCDate(),2,'0');
        return date;
    },
    COMPARE_BY_STR: (a='', b='', sortDirection = 'ASC') => {
        return (sortDirection.toUpperCase() === jSQL.DESC ? -a.localeCompare(b) : a.localeCompare(b));
    },
    COMPARE_BY_NUM: (a=0, b=0, sortDirection = 'ASC') => {
        return (sortDirection.toUpperCase() === jSQL.DESC ? (b - a) : -(b - a));
    },
}

Array.prototype.SELECT = function(key) {
    return !key || key === '*' ? this : this.map(function(item) {
        if (Array.isArray(key)) {
            var obj = {};
            key.forEach(val => {
                obj[val] = item[val];
            });
            return obj;
        } else return {
            [key]: item[key]
        };
    });
}

Array.prototype.WHERE = function(query) {
    return this.filter(item => query(item));
}

Array.prototype.LIKE = function(searchTerm='', keys=[]) {
    let result=[];
    function searchObject(obj,str){
        var found=[];
        // if(typeof(obj[prop]) === 'object' && !Array.isArray(obj[prop]))
        for(prop in obj){
            if(typeof(obj[prop]) === 'object' && !Array.isArray(obj[prop])){
                //found=searchObject(obj[prop], str);
                // if(searchObject(obj[prop], str))
                console.log(obj[prop],searchObject(obj[prop], str));
            } else
            if(typeof(obj[prop]) === 'string' || typeof(obj[prop]) === 'number')
                if(String(obj[prop]).indexOf(String(str)) > -1)
                    found.push(String(obj[prop]).indexOf(String(str)));
            // console.log(typeof(obj[prop]) === 'string',  typeof(obj[prop]) === 'number', String(obj[prop]).indexOf(String(str)) > -1);
        }
        return found.length ? true : false;
    }
    this.forEach((item,id) => {
        if(searchObject(item, searchTerm))
            result.push(item);
    });
    return result;
}

Array.prototype.LIMIT = function(offset = 0, rowCount) {
    if (rowCount === undefined) {
        rowCount = offset;
        offset = 0;
    }
    return this.slice(offset, rowCount);
}

Array.prototype.ORDER_BY = function(key, sortDirection = 'ASC') {
    var descending = sortDirection.toUpperCase() === jSQL.DESC;
    return typeof(key) === 'function' ? this.sort(key) : this.sort(function(a, b){
        var x = a[key], y = b[key];
        return ((x < y) ? (descending ? 1 : -1) : ((x > y) ? (descending ? -1 : 1) : 0));
    });
}

Array.prototype.PAGINATE = function(resultsPerPage = 1000, page = 1) {
    return this.slice((page - 1) * resultsPerPage, page * resultsPerPage);
}

Array.prototype.FIRST = function() {
    return this[0];
}

Array.prototype.LAST = function() {
    return this[this.length - 1];
}

Array.prototype.GET = function(id = 0) {
    return this[id];
}
