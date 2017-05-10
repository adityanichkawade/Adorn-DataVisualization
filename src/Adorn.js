(function (aModule) {
    'use strict';
    /**
     * Consists of list of attributes used to define class.
     *
     * @type {Object}
     */
    aModule.ClassAttributes = {
        /**
         * Attribute for class name
         *
         * @const {String}
         */
        NAME: 'className',
        /**
         * Attribute for class to be inherited.
         *
         * @const {String}
         */
        INHERIT: 'inherit',
        /**
         * Attribute for the properties in class.
         *
         * @const {String}
         */
        PROPERTIES: 'properties',
        /**
         * Attribute for static properties in class.
         *
         * @const {String}
         */
        STATICS: 'statics',
        /**
         * Attribute for constructor in class.
         *
         * @type {String}
         */
        CREATE: 'create'
    };

    /**
     * Function to check whether the given parameter is assigned or not.
     *
     * @param  {T} aVar Value to be checked whether it is assigned or not
     * @return {Boolean}
     */
    aModule.isAssigned = function (aVar) {
        return ((aVar !== null) && (aVar !== undefined));
    };

    /**
     * Function to whether passed parameter is of type Object.
     *
     * @param  {Object}  aObject Parameter to check whether it is object or not.
     * @return {Boolean}
     */
    aModule.isObject = function (aObject) {
        return (aModule.isAssigned(aObject) && (aObject instanceof Object));
    };

    /**
     * Function to check whether the given object is empty or not.
     *
     * @param  {Object}  aObject Object to be checked to whether it is empty or not.
     * @return {Boolean}
     */
    aModule.isEmptyObject = function (aObject) {
        if (aModule.isObject(aObject)) {
            for (var vProp in aObject) {
                if (aObject.hasOwnProperty(vProp))
                    return false;
            }
        }
        return true;
    };

    /**
     * Function to check whether the specified object is an array or not.
     *
     * @param  {Object}  aArray Object to check whether it is function or not.
     * @return {Boolean}
     */
    aModule.isArray = function (aArray) {
        return (aModule.isAssigned(aArray) && (aArray.constructor === Array || Object.prototype.toString.call(aArray) === '[object Array]'));
    };

    /**
     * Function to check whether passed parameter is function or not.
     * 
     * @param  {Object}  aFunction
     * @return {Boolean}           
     */
    aModule.isFunction = function (aFunction) {
        return aModule.isAssigned(aFunction) && (typeof aFunction === 'function');
    };

    /**
     * Function to check whether the passed parameter is string or not.
     *
     * @param  {Object}  aString Object to be check whether it is string or not.
     * @return {Boolean}         [description]
     */
    aModule.isString = function (aString) {
        return (aModule.isAssigned(aString) && (typeof aString === 'string'));
    };

    /**
     * Function to check whether the passed parameter is string or not.
     *
     * @param  {Object}  aString Object to check whether it is string or not.
     * @return {Boolean}
     */
    aModule.isEmptyString = function (aString) {
        if (aModule.isString(aString)) {
            var str = aString.trim();
            return (str === '' || str.length === 0);
        }
        return true;
    };

    /**
     * Function to check whether the parameter passed is date.
     *
     * @param  {Object}  aDate Date object  which is passed as parameter.
     * @return {Boolean}       Return true if passed parameter is date.
     */
    aModule.isDate = function (aDate) {
        return aModule.isObject(aDate) && (Object.prototype.toString.call(aDate) === '[object Date]');
    };

    /**
     * Function to check whether the passed parameter is boolean or not.
     *
     * @param  {Boolean}  aBoolean Parameter to check whether it is boolean.
     * @return {Boolean}           True if passed parameter is boolean.
     */
    aModule.isBoolean = function (aBoolean) {
        return typeof (aBoolean) === "boolean";
    };

    aModule.isObjectProperty = function (aObject, aProperty) {
        return aModule.isAssigned(Object.getOwnPropertyDescriptor(aObject, aProperty));
    };

    /**
     * Function to check whether the object which is passed is instance of class name specified.
     *
     * @param  {Object}  aObject    Object whose class to be checked.
     * @param  {Object}  aClass     Class to check whether it its instance.
     * @return {Boolean}            Return true if the object is the instance of specified in parameter.
     */
    aModule.isInstanceOf = function (aObject, aClass) {
        return aModule.isObject(aObject) && aModule.isObject(aClass) && (aObject instanceof aClass);
    };

    aModule.isElementOf = function(aElement, aElementName){
        return aModule.isAssigned(aElement) && (aElement.tagName === aElementName);
    };

    /**
     * Function to clone the object which is passed as parameter.
     * 
     * @param  {Object} aObject Object which is to be cloned.
     * @return {Object}         Clone object for the given object.
     */
    aModule.cloneObject = function (aObject) {
        var copy = {};
        if (aModule.isObject(aObject)) {
            for (var prop in aObject) {
                if (aObject.hasOwnProperty(prop)) {
                    copy[prop] = aModule.cloneObject(aObject[prop]);
                }
            }
        }
        return aObject;
    };

    /**
     * Function to clone the array which is passed as parameter.
     * 
     * @param  {Array} aArray  Array to be clone.
     * @return {Array}         Return the clone array.
     */
    aModule.cloneArray = function (aArray) {
        var copy = [];
        if (aModule.isArray(aArray)) {
            for (var i = 0; i < aArray.length; i++) {
                copy[i] = aModule.cloneArray(aArray[i]);
            }
            return copy;
        }
        return aArray;
    };


    /**
     * Function to clone the object which is passed as parameter.
     *
     * @param  {Object} aObject Object which is passed as parameter.
     * @return {Object}         Return clone object.
     */
    aModule.clone = function (aObject) {
        var copy = null;
        if (aModule.isDate(aObject)) {
            return new Date(aObject.getTime());
        }
        if (aModule.isArray(aObject)) {
            copy = [];
            for (var i = aObject.length - 1; i > -1; i--) {
                copy[i] = aModule.clone(aObject[i]);
            }
        }
        if (aModule.isObject(aObject)) {
            copy = {};
            for (var prop in aObject) {
                if (aObject.hasOwnProperty(prop)) {
                    copy[prop] = aModule.clone(aObject[prop]);
                }
            }
        }
        return aModule.isAssigned(copy) ? copy : aObject;
    };

    /**
     * Function to check whether the given object has the property and value.
     *
     * @param {Object} aObject Object whose whose property and value to be checked
     * @param {String} aProp Property containing that object
     * @param {T}      aValue Value to check
     *
     * @return {Boolean}
     */
    aModule.hasValue = function (aObject, aProp, aValue) {
        return (aModule.isObject(aObject) && aObject.hasOwnProperty(aProp) && (aObject[aProp] === aValue));
    };


    /**
     * Function to traverse object properties.
     *
     * @param {Object} aObject Object whose property to be traversed.
     * @param {Object} aCallback Callback function to handle when traversing each property.
     */
    aModule.traverseObject = function (aObject, aCallback) {
        for (var prop in aObject) {
            if (aObject.hasOwnProperty(prop)) {
                if ((aCallback.call(aObject, prop, aObject[prop]) === false)) {
                    return;
                }
            }
        }
    };

    /**
     * Function to deep traverse an object.
     *
     * @param {Object} aObject Object whose property to be traversed.
     * @param {Object} aCallback Callback function to handle when traversing each property.
     */
    aModule.deepTraverseObject = function (aObject, aCallback) {
        for (var prop in aObject) {
            if (aObject.hasOwnProperty(prop)) {
                if (aCallback.call(aObject, prop, aObject[prop]) === false) {
                    return;
                }
                aModule.deepTraverse(aObject[prop], aCallback);
            }
        }
    };


    /**
     * Function to extract properties getter setter methods from object to create property.
     *
     * @param {Object} aObject Object to which properties to be assigned.
     * @param {Array}  aProperties Array of properties which is assigned to the given object.
     * @return {undefined}
     */
    aModule.extractProperties = function (aObject, aProperties) {
        aModule.traverseObject(aProperties, function (aProp, aValue) {
            if (aModule.isObject(aValue)) {
                Object.defineProperty(aObject, aProp, {
                    get: aValue.get,
                    set: aValue.set,
                    enumerable: true,
                    configurable: true
                });
            }
        });
    };

    /**
     * Function to extract object properties from one object to another.
     *
     * @param  {Object}   aTarget Object to which properties to be copied.
     * @param  {Object}   aSource Object from which properties to be copied.
     * @param  {Function} aFuncComparator Comparator function to allow the property to be copied or not.
     * @return {undefined}
     */
    aModule.extractKeys = function (aTarget, aSource, aFuncComparator) {
        if (aModule.isFunction(aFuncComparator)) {
            aModule.traverseObject(aSource, function (aSourceProp, aSourceValue) {
                if (aFuncComparator(aTarget, aSource, aSourceProp) !== false) {
                    aTarget[aSourceProp] = aSourceValue;
                }
            });
        } else {
            aModule.traverseObject(aSource, function (aSourceProp, aSourceValue) {
                aTarget[aSourceProp] = aSourceValue;
            });
        }
    };

    /**
     * Inherit parent class to the specified child class.
     *
     * @param  {Object} aChildClass  Child class to be created by inheriting properties of child class.
     * @param  {Object} aParentClass Parent class from which property to be inherited.
     * @return {undefined}
     */
    aModule.inherits = function (aChildClass, aParentClass) {
        if (aModule.isFunction(aChildClass) && aModule.isFunction(aParentClass)) {
            aChildClass.prototype = Object.create(aParentClass.prototype);
            aChildClass.prototype._base = aParentClass.prototype;
            aChildClass.prototype.constructor = aChildClass;
        }
    };

    /**
     * Function to extract function from the passed object and copying it to target object.
     *
     * @param  {Object} aTargetObj Object from which function to be copied.
     * @param  {Object} aSourceObj Object to which functio to be copied.
     * @return {undefined}
     */
    aModule.extractFunctions = function (aTargetObj, aSourceObj) {
        if (aModule.isObject(aTargetObj) && aModule.isObject(aSourceObj)) {
            aModule.extractKeys(aTargetObj, aSourceObj, function (aTarget, aSource, aProp) {
                return aModule.isFunction(aSource[aProp]);
            });
        }
    };

    /**
     * Returns the new class function.
     * 
     * @return {Function} Returns the new class function.
     */
    aModule.newClass = function () {
        return function () {
            var constructorFunc = this[aModule.ClassAttributes.CREATE];
            if (aModule.isFunction(constructorFunc)) {
                constructorFunc.apply(this, arguments);
            }
        };
    };

    /**
     * Inherits class for the class name which is passed as parameter for the given class.
     * 
     * @param  {Object} aChildClass      Child class to which parent class will be inherited.
     * @param  {String} aParentClassName Name of the parent class.
     * @return {Boolean}                 Indicating whether the specified class is 
     */
    aModule.inheritClass = function (aChildClass, aParentClassName) {
        if (!aModule.isEmptyString(aParentClassName)) {
            var parentClass = aModule[aParentClassName];
            return aModule.inherits(aChildClass, parentClass);
        }
        return false;
    };

    /**
     * Setup the class for the class name and the properties associated with it.
     *
     * @param {String} aClassName       Name for the class.
     * @param {Object} aProperties      Properties for the class.
     * @param {String} aParentClassName Name of the parent class.
     */
    aModule.setupClass = function (aClassName, aProperties, aParentClassName) {
        if (!aModule.isEmptyString(aClassName)) {

            var newClass = aModule.newClass();

            aModule.inheritClass(newClass, aParentClassName);
            aModule.extractProperties(newClass.prototype, aProperties.properties);
            aModule.extractFunctions(newClass.prototype, aProperties);

            aModule[aClassName] = newClass;
            return true;
        }
        return false;
    };

    /**
     * Function to create class for the specified object which is class body.
     *
     * @param  {Object} aClassBody Object for which class to be created.
     * @return {undefined}
     */
    aModule.createClass = function (aClassBody) {
        if (aModule.isObject(aClassBody)) {
            var name = aClassBody[aModule.ClassAttributes.NAME];
            if (aModule.isString(name)) {
                var parentClassName = aClassBody[aModule.ClassAttributes.INHERIT];
                return aModule.setupClass(name, aClassBody, parentClassName);
            }
        }
        return false;
    };

    /**
     * Function to create the static class for the class name specified.
     *
     * @param  {Object} aClassBody Class Structure from which the class will be created.
     * @param  {String} aClassName Name of the class.
     * @return {Boolean}           True if the class is created else false.
     */
    aModule.setupStaticClass = function (aClassName, aClassBody) {
        if (aModule.isEmptyString(aClassName) === false) {
            var newClass = function () {};
            aModule.extractKeys(newClass, aClassBody);
            aModule[aClassName] = newClass;
            return true;
        }
        return false;
    };

    /**
     * Function to create the static class for the class name specified.
     *
     * @param  {Object} aClassBody  Class Structure from which the class will be created.
     * @return {Boolean}            True if the class is created.
     */
    aModule.createStaticClass = function (aClassBody) {
        if (aModule.isObject(aClassBody)) {
            var className = aClassBody[aModule.ClassAttributes.NAME];
            return aModule.setupStaticClass(className, aClassBody);
        }
        return false;
    };

    /**
     * To get the parent class prototype from the current scope.
     * 
     * @param  {Object} aScope Scope from which the parent prototype to be return.
     * @return {Object}        Parent class prototype.
     */
    aModule.getBaseClassPrototype = function (aScope) {
        return aModule.isObject(aScope._base) ?
            aScope._base.constructor.prototype :
            aScope.constructor.prototype;
    };

    /**
     * Function to call the base method of the scope which is passed as parameter.
     * 
     * @param  {Object} aScope          Current scope of the invoked function.
     * @param  {Array}  aArguments      Argument to be passed to the invoked function.
     * @param  {String} aMethodName     Method which which is to be invoked.
     * @param  {Object} aBasePrototype  Base class prototype.   
     * @return {Var}             
     */
    aModule.invokeBaseMethod = function (aScope, aArguments, aMethodName, aBasePrototype) {
        if (aModule.isAssigned(aBasePrototype)) {
            aScope._base = aBasePrototype;
            if (aModule.isAssigned(aScope._base[aMethodName])) {
                return aScope._base[aMethodName].apply(aScope, aArguments);
            }
        }
        return null;
    };

    /**
     * Function to call the base method for the method name specfied.
     *
     * @param  {Object} aScope      Scope of the function which who is calling it.
     * @param  {Array}  aArguments  Arguments of the function who is calling it.
     * @param  {String} aMethodName Method to be called.
     * @return {Var}
     */
    aModule.base = function (aScope, aArguments, aMethodName) {
        if ((aModule.isEmptyString(aMethodName) === false) && aModule.isObject(aScope)) {
            return aModule.invokeBaseMethod(aScope, aArguments, aMethodName, aModule.getBaseClassPrototype(aScope));
        }
        return null;
    };

    aModule.method = function(aClassName, aScope, aArguments, aMethodName){
        if (aModule.hasOwnProperty(aClassName) && aModule.isString(aMethodName)){
            aModule[aClassName].prototype[aMethodName].apply(aScope, aArguments);
        }
    };

    /**
     * To create the instance of class which is passed as parameter.
     *
     * @param  {Object} aProperties Initialize the class properties after creation.
     * @return {Object} Return the instance of that class.
     */
    aModule.createInstance = function (aProperties) {
        aModule.traverseObject(aProperties, function (aProp, aValue) {

        });
    };

    /**
     * Function to check whether the script file exists or not.
     * @param  {String} aUrl Url of the script file.
     * @return {Boolean} True for the script file exists.
     */
    aModule.scriptExist = function (aUrl) {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            if (scripts[i].src === aUrl) {
                return true;
            }
        }
        return false;
    };
    /**
     * Function to inject script for the script url which is passed as parameter.
     * 
     * @param {type} aScriptUrl
     * @returns {undefined}
     */
    aModule.injectScript = function (aScriptUrl) {
        if (aModule.scriptExist(aScriptUrl) === false) {
            var script = document.createElement('script');
            script.src = aScriptUrl;
            script.type = "text/javascript";
            script.async = false;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    },
    /**
     * Function to add the script file which is required.
     * @return {undefined}
     */
    aModule.uses = function () {
        for (var i = 0; i < arguments.length; i++) {
            var scriptUrl = arguments[i];
            aModule.injectScript(scriptUrl);
        }
    };
	
    aModule.uses('core/AdornCore.js');
    aModule.uses('graphics/AdornGraphics.js');
    aModule.uses('utility/AdornMath.js');
    aModule.uses('utility/AdornUtility.js');
    aModule.uses('charts/AdornGraph.js');
    aModule.uses('charts/AdornChart.js');
    aModule.uses('charts/AdornGraphDrawing.js');
    
})(window.Adorn = window.Adorn || {});