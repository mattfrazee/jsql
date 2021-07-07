export const jSQL = {
    version: '1.0.0',
    DESC: 'DESC',
    ASC: 'ASC',
    sort: {
        ascending: 1,
        descending: -1,
        compare(a, b, sortDirection = jSQL.ASC) {
            // if(typeof(a) === 'number' && typeof(b) === 'number'){
            if (jSQL.isNumber(a) && jSQL.isNumber(b)) {
                return jSQL.sort.compareNumber(Number(a), Number(b), sortDirection);
            }
            else if (typeof a === 'string' && typeof b === 'string') {
                return jSQL.sort.compareString(a, b, sortDirection);
            }
        },
        compareNumber(a, b, sortDirection = jSQL.ASC) {
            return (sortDirection === jSQL.DESC ? (b - a) : -(b - a));
        },
        compareString(a, b, sortDirection = jSQL.ASC) {
            return (sortDirection === jSQL.DESC ? -a.localeCompare(b) : a.localeCompare(b));
        },
        compareDate(a, b, sortDirection = jSQL.ASC) {
            if (jSQL.isDate(a) && jSQL.isDate(b)) {
                a = new Date(a).getTime();
                b = new Date(b).getTime();
                return (sortDirection === jSQL.DESC ? (b - a) : -(b - a));
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
        distanceBetween(startDate, endDate){
            return jSQL.date.countdown(endDate, startDate);
        },
        countdown(futureDate, startDate){
            if((!futureDate || !jSQL.isDate(futureDate)) || (startDate && !jSQL.isDate(startDate))){
                // throw RangeError('The date is not a valid format');
                return;
            }
            let years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
            let date = new Date(futureDate).getTime() - (startDate ? new Date(startDate) : new Date()).getTime();
            if(date < 0){
                return {
                    years: years,
                    months: months,
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                };
            }
            let time = {
                year:1000 * 60 * 60 * 24 * 365,
                month:1000 * 60 * 60 * 24 * 365 / 12,
                day:1000 * 60 * 60 * 24,
                hour:1000 * 60 * 60,
                minute:1000 * 60,
                second:1000,
            };
            years = Math.floor(date / time.year);
            date -= (years * time.year);
            months = Math.floor(date / time.month);
            date -= (months * time.month);
            days = Math.floor(date / time.day);
            date -= (days * time.day);
            hours = Math.floor(date / time.hour);
            date -= (hours * time.hour);
            minutes = Math.floor(date / time.minute);
            date -= (minutes * time.minute);
            seconds = Math.floor(date / time.second);
            date -= (seconds * time.second);
            return {
                years: years,
                months: months,
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            }
        },
    },
    getPropertyValue(key, item) {
        if(!!key && !!item) {
            let keys = key.split('.');
            let newObj = item;
            for (let i = 0; i < keys.length; i++) {
                if (newObj.hasOwnProperty(keys[i])) {
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
    isNumber(value) {
        return /^-?[0-9.]+(e\+?[0-9]+)?$/.test(value);
        // return typeof value === 'number';
    },
    isDate(value) {
        return !isNaN(Date.parse(value));
    },
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

Array.prototype.where = Array.prototype.andWhere = function () {
    if (arguments.length) {
        if (typeof (arguments[0]) != 'function' && arguments.length === 3) {
            var val1 = arguments[0], op = arguments[1], val2 = arguments[2];
            switch (op) {
                case '<':
                    return this.filter(item => (item[val1] < val2));
                case '<=':
                    return this.filter(item => (item[val1] <= val2));
                case '=':
                    return this.filter(item => (item[val1] === val2));
                case '!=':
                    return this.filter(item => (item[val1] !== val2));
                case '>':
                    return this.filter(item => (item[val1] > val2));
                case '>=':
                    return this.filter(item => (item[val1] >= val2));
            }
        }
        return typeof (arguments[0]) === 'function' ? this.filter(item => arguments[0](item)) : this;
    }
    return this;
    // return comparison === undefined
    //     ? this
    //     : this.filter(item => comparison(item));
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

    this.forEach((item, id) => {
        if (searchObject(item, searchTerm, caseSensitive)) {
            result.push(item);
        }
    });
    return result;
}

Array.prototype.limit = function (recordCount = 1000, recordOffset = 0) {
    return this.slice(recordOffset, recordCount + recordOffset);
}

Array.prototype.orderBy = Array.prototype.sortBy = function (key, sortDirection = jSQL.ASC) {
    return typeof (key) === 'function' ? this.sort(key) : this.sort((a, b) => {
        return jSQL.sort.compare(a[key], b[key], sortDirection);
    });
}

Array.prototype.orderByDate = Array.prototype.sortByDate = function (key, sortDirection = jSQL.ASC) {
    return this.sort((a, b) => {
        if(jSQL.isDate(a[key]) && jSQL.isDate(b[key])) {
            return jSQL.sort.compareDate(a[key], b[key], sortDirection);
        }
    });
}

Array.prototype.paginate = function (recordsPerPage = 1000, page = 1) {
    return this.slice((page - 1) * recordsPerPage, page * recordsPerPage);
}

Array.prototype.pages = function (recordsPerPage) {
    return Math.ceil(this.length / (recordsPerPage ? recordsPerPage : this.length));
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
    return this.orderBy(key).first();
}

Array.prototype.max = function (key) {
    return this.orderBy(key).last();
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

Array.prototype.avg = Array.prototype.average = function (key) {
    if (jSQL.isNumber(this.sum(key))) {
        return this.sum(key) / this.thatHave(key).length;
    }
}

Array.prototype.thatHave = function (key = '') {
    return this.where(item => !!jSQL.getPropertyValue(key, item));
    // return this.where(obj => obj.hasOwnProperty(key));
}

Array.prototype.has = function (key) {
    return !!this.thatHave(key).length;
}
