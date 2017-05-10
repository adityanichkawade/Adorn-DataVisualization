(function (aModule) {
    'use strict';
    /**
     * Utility observer class.
     */
    aModule.createClass({
        /**
         * Name of the class.
         *
         * @type {String}
         */
        className: 'Observer',
        /**
         * Constructor for the observer class.
         *
         * @return {undefined}
         */
        create: function () {
            /**
             * List of observers the list has.
             *
             * @type {Array}
             */
            this._observers = [];

            /**
             * Scope under which notify event will occur.
             *
             * @type {Object}
             */
            this._scope = this;
        },
        /**
         * Function to add listener to observable pattern.
         *
         * @param  {Object} aFunction Function which will listen to the change in observer pattern.
         * @return {undefined}
         */
        addListener: function (aFunction) {
            this._observers.push(aFunction);
        },
        /**
         * Function to remove the listener from the observable pattern.
         *
         * @param  {Object} aFunction Function which will be removed from the listener.
         * @return {undefined}
         */
        removerListener: function (aFunction) {
            var index = this._observers.indexOf(aFunction);
            if (index > -1) {
                this._observers.splice(1, index);
            }
        },
        /**
         * Function to notify the observers in the observer pattern.
         *
         * @param  {Object} aChange   Type of change happened.
         * @return {undefined}
         */
        notify: function (aChange) {
            for (var i = 0; i < this._observers.length; i++) {
                var func = this._observers[i];
                if (func) {
                    func.apply(this._scope, arguments);
                }
            }
        },
        properties: {
            /**
             * Get or set the scope in which change event will fire.
             *
             * @type {Object}
             */
            scope: {
                get: function () {
                    return this._scope;
                },
                set: function (aValue) {
                    this._scope = aValue;
                }
            }
        }
    });

    /**
     * Class used for holding the list of objects.
     * Validate the list, modify the list.
     */
    aModule.createClass({
        /**
         * Name of the class.
         *
         * @type {String}
         */
        className: 'List',
        /**
         * Constructor for the list class.
         *
         * @return {undefined}
         */
        create: function () {
            /**
             * List of objects.
             *
             * @type {Array}
             */
            this._collection = [];

            /**
             * Set of allowed type to be added in the list.
             *
             * @type {Object}
             */
            this._allowedTypes = arguments.length > 0 ? Array.prototype.slice.call(arguments) : [];
        },
        /**
         * Function to check whether the element which is passed as parameter is allowed
         * to be added into the list. This verifies the allowed types array list.
         *
         * @param  {Object}  aElement Element to be checked to be allowed to be added into the list.
         * @return {Boolean}
         */
        isAllowed: function (aElement) {
            for (var i = 0; this._allowedTypes.length > 0; i++) {
                var allowedType = this._allowedTypes[i];
                if (aModule.isFunction(allowedType) && (aElement instanceof allowedType)) {
                    return true;
                }
            }
            return false;
        },
        /**
         * Function to add the element in the list.
         *
         * @param  {Object} aElement    Element to be added to the list.
         * @return {undefined}
         */
        add: function (aElement) {
            if (this.isAllowed(aElement)) {
                this._collection.push(aElement);
            }
        },
        /**
         * Function to check whether the passed value is present in the list or not.
         *
         * @param  {Object} aElement Element to be checked whether it is present in list or not.
         * @return {Boolean}
         */
        contains: function (aElement) {
            return this._collection.indexOf(aElement) !== 1;
        },
        /**
         * Function to retrieve the element at the given index.
         *
         * @param  {Number} aIndex Index to retrieve element at position.
         * @return {Object}
         */
        get: function (aIndex) {
            if (this.contains(aIndex)) {
                return this._collection[aIndex];
            }
            return null;
        },
        properties: {
            /**
             * Return the number of elements in the list.
             * @type {Object}
             */
            count: {
                get: function () {
                    return this._collection.length;
                }
            },
            /**
             * Return the allowed types for the list.
             *
             * @type {Object}
             */
            allowedTypes: {
                set: function (aValue) {
                    if (aModule.isArray(aValue)){
                        this._allowedTypes = aValue;
                    }
                },
                get: function () {
                    return this._allowedTypes;
                }
            }
        }
    });

    /**
     * Class for the maintaining the key value pair structure.
     */
    aModule.createClass({
        /**
         * Name of the class.
         * @type {String}
         */
        className: 'HashMap',
        /**
         * Connstructor of the class.
         * @return {undefined}
         */
        create: function () {
            /**
             * Elements in the the hash map.
             * @type {Object}
             */
            this._elements = {};

            /**
             * No of elements in the hash map.
             * @type {Number}
             */
            this._size = 0;
        },
        /**
         * Function to check whether the key specified this there in the hash map or not.
         * 
         * @param {Number} aKey Key to check whether it belongs to the hashmap.
         * @return {Boolean} True if the key already belongs to the hash map else false.
         */
        contains: function (aKey) {
            return this._elements.hasOwnProperty(aKey);
        },
        /**
         * Function to addd key value pair in the hash map.
         * 
         * @param  {String}  aKey   Key to the corresponding value for the hash map.
         * @param  {Var}     aValue Value to for the given key for the hashmap.
         * @return {Var}            Return the corresponding value which was added to the hash map.  
         */
        add: function (aKey, aValue) {
            if (this.contains(aKey) === false) {
                this._size++;
                this._elements[aKey] = aValue;
                return this._elements[aKey];
            }
            return null;
        },
        /**
         * Function to retreive the value for the key corresponding key in the hashmap.
         * 
         * @param  {String}  aKey Key for which corresponding value from the element to be retreived.
         * @return {Var}          Value for the corresponding key from the hashmap. 
         */
        get: function (aKey) {
            return this.contains(aKey) ? this._elements[aKey] : null;
        },
        /**
         * Function to remove the element from the hash map for the key specified.
         * 
         * @param  {String} aKey Key for which corresponding element to be remove from the hashmap.
         * @return {Var}         Value which is removed for the corresponding key.
         */
        remove: function (aKey) {
            if (this.contains(aKey)) {
                this._size--;
                var element = this._elements[aKey];
                delete this._elements[aKey];
                return element;
            }
            return null;
        },
        /**
         * Function to retrieve all the keys in the hash map.
         * 
         * @return {Array} Return the array of keys within hashmap.
         */
        keys: function () {
            var keys = [];
            for (var prop in this._elements) {
                if (this._elements.hasOwnProperty(prop)) {
                    keys.push(prop);
                }
            }
            return keys;
        },
        /**
         * Function to retrieve all the values in the hash map.
         * 
         * @return {Array} Return the array of values within hashmap.
         */
        values: function () {
            var values = [];
            for (var prop in this._elements) {
                if (this._elements.hasOwnProperty(prop)) {
                    values.push(this._elements[prop]);
                }
            }
            return values;
        },
        /**
         * Function to check whether the hashmap is empty or not.
         * 
         * @return {Boolean} To check whether the hash map is empty or not.
         */
        isEmpty: function () {
            return aModule.isEmptyObject(this._elements);
        },
        /**
         * Properties associated
         * @type {Object}
         */
        properties: {
            /**
             * Property which return the size of the of hash map.
             * @type {Object}
             */
            size: {
                get: function () {
                    return this._length;
                }
            }
        }
    });
})(window.Adorn = window.Adorn || {});