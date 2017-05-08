(function (aModule) {
    'use strict';

    /**
    * Class for the point.
    */
    aModule.createClass({
        /**
         * Class Name.
         * @type {String}
         */
        className: 'Vector',
        /**
         * Constructor of the class.
         * 
         * @param  {Number} aXPos X-Coordinate Point.
         * @param  {Number} aYPos Y-Coordinate Point.
         * @return {undefined}
         */
        create: function (aXPos, aYPos) {
            this._x = aXPos;
            this._y = aYPos;
        },
        /**
         * Function to set the value of the current vector.
         * 
         * @param  {Number} aXPos Value to be set for x-coordinate.
         * @param  {Number} aYPos Value to be set for y-coordinate.
         * @return {undefined}
         */
        setPos: function (aXPos, aYPos) {
            this._x = aXPos;
            this._y = aYPos;
        },
        /**
         * Function to set the current vector.
         * 
         * @param  {Object} aVector Vector class object to be set to current vector.
         * @return {undefined}
         */
        set: function (aVector) {
            this._x = aVector.x;
            this._y = aVector.y;
        },
        /**
         * Function to return the X-Coordinate position.
         * 
         * @return {Number} X-Coordinate.
         */
        _getX: function () {
            return this._x;
        },
        /*
         * Function to return the Y-Co-ordinate position.
         * 
         * @return {Number} Y-Coordinate.
         */
        _getY: function () {
            return this._y;
        },
        /**
         * Function to set the X-Coordinate position.
         * 
         * @param {Number} aValue Value to be set as the x-coordinate.  
         */
        _setX: function (aValue) {
            this._x = aValue;
        },
        /**
         * Function to set the Y-Coordinate position.
         * 
         * @param {Number} aValue Value to be set as the y-coordinate.  
         */
        _setY: function (aValue) {
            this._y = aValue;
        },
        /**
         * Function to add the offset to the to the point.
         *  
         * @param  {Number} aXPos X-Offset
         * @param  {Number} aYPos Y-Offset
         * @return {undefined}       
         */
        offsetPos: function (aXPos, aYPos) {
            this.x += aXPos;
            this.y += aYPos;
        },
        /**
         * Function to divide the point for the x and y coordinate which is passed as parameter.
         * 
         * @param  {Number} aXPos    X-Coordinate.
         * @param  {Number} aYPos    Y-Coordinate.
         * @return {undefined}
         */
        dividePos: function (aXPos, aYPos) {
            this.x /= aXPos;
            this.y /= aYPos;
        },
        /**
         * Functin to multiply the point for the x and y coordinate which is passed as parameter.
         * 
         * @param {type} aXPos  X-Coordinate.
         * @param {type} aYPos  Y-Coordinate.
         * @return {undefined}
         */
        multiplyPos: function (aXPos, aYPos) {
            this.x *= aXPos;
            this.y *= aYPos;
        },
        /**
         * Function to add the point as offset to the given point.
         *  
         * @param {Object} aVector Point to be added to the current point.
         * @return {undefined}
         */
        add: function (aVector) {
            return this.offsetPos(aVector.x, aVector.y);
        },
        /**
         * Function to subtract the point for the point specified as parameter.
         * 
         * @param {Object} aVector Point to be subtract from the current point.
         * @returns {undefined}
         */
        subtract: function (aVector) {
            return this.offsetPos(-aVector.x, -aVector.y);
        },
        /**
         * Function to subtract the point for the point specified as parameter.
         * 
         * @param {Object} aVector Point to be multiply to the current point.
         * @returns {undefined}
         */
        multiply: function (aVector) {
            return this.multiplyPos(aVector.x, aVector.y);
        },
        /**
         * Function to divide the point for the point specified as parameter.
         * 
         * @param {Object} aVector Point to be divide to the current point.
         * @returns {undefined}
         */
        divide: function (aVector) {
            return this.dividePos(aVector.x, aVector.y);
        },
        /**
         * Function to calculate vector length.
         * @return {Number}
         */
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        /**
         * Function to calculate length between the current vector and vector
         * specified as parameter.
         * 
         * @param {Object} aVector  Point between which length to be calculated.
         * @return {Number}
         */
        lengthBetween: function (aVector) {
            return Math.sqrt(Math.pow((aVector.x - this.x), 2) + Math.pow((aVector.y - this.y), 2));
        },
        /**
         * Function to return the normalized value of current vector.
         * 
         * @return {Number}
         */
        normalize: function () {
            return 1 / this.length();
        },
        /**
         * Function to return the normalized value of between the current vector
         * and vector which is passed as parameter.
         * 
         * @param  {Object} aVector Vector class object between which normalized value to be calculated.
         * @return {Number}
         */
        normalizeBetween: function (aVector) {
            return 1 / this.lengthBetween(aVector);
        },
        /**
         * Function to get the vector direction for the specified vector and normalized value.
         * 
         * @param {Object} aPoint           Vector class object.
         * @param {Number} aNormalizeValue  Vector normalized value.
         * @returns {undefined}
         */
        _calculateDirection: function (aPoint, aNormalizeValue) {
            return new aModule.Vector(aPoint.x * aNormalizeValue, aPoint.y * aNormalizeValue);
        },

        /**
         * Function to get the vector direction for the specified vector and normalized value.
         * 
         * @param {Object} aPoint           Vector class object.
         * @param {Number} aNormalizeValue  Vector normalized value.
         * @returns {undefined}
         */
        _calculateDirectionBetween: function (aPoint, aNormalizeValue) {
            return new aModule.Vector((aPoint.x - this.x) * aNormalizeValue, (aPoint.y - this.y) * aNormalizeValue);
        },

        /**
         * Function to find the direction of the current vector.
         *  
         * @return {Object} Vector class object.
         */
        direction: function () {
            var normal = 1 / this.normal();
            return this._calculateDirection(this, normal);
        },
        /**
         * Function to find the direction between the current vector and vector which is passed as parameter.
         * 
         * @param {Object} aVector  Vector class object 
         * @returns {undefined}
         */
        directionBetween: function (aVector) {
            var normal = this.normalizeBetween(aVector);
            return this._calculateDirectionBetween(aVector, normal);
        },

        properties: {
            /**
             * Property for x position.
             * @type {Number}
             */
            x: {
                get: function () {
                    return this._getX();
                },
                set: function (aValue) {
                    this._setX(aValue);
                }
            },
            /**
             * Property for y position.
             * @type {Number}
             */
            y: {
                set: function (aValue) {
                    this._setY(aValue);
                },
                get: function () {
                    return this._getY();
                }
            }
        }
    });


    /**
     * 2D Matrix Class.
     * Sets up 3x3 matrix.
     */
    aModule.createClass({
        /**
         * @class Matrix
         */
        className: 'Matrix',
        /*
         * Constructor of the class Matrix.
         * 
         * @constructor
         */
        create: function () {
            this._initializeMatrix();
            if (arguments.length === 9) {
                this.setValues.apply(this, arguments);
            }
        },
        /**
         * Function to initialize matrix parameter.
         * 
         * @returns {undefined}
         */
        _initializeMatrix: function () {
            /**
             * Define matrix array data.
             */
            this._matrix = new Array(3);
            for (var i = 0; i < this._matrix.length; i++) {
                this._matrix[i] = new Array(3);
            }

            this.setIdentity();
        },
        /**
         * Function to set matrix array.
         *  
         * @param {Number} aM00
         * @param {Number} aM01
         * @param {Number} aM02
         * @param {Number} aM10
         * @param {Number} aM11
         * @param {Number} aM12
         * @param {Number} aM20
         * @param {Number} aM21
         * @param {Number} aM22
         * @returns {undefined}
         */
        setValues: function (aM00, aM01, aM02, aM10, aM11, aM12, aM20, aM21, aM22) {
            this._matrix[0][0] = aM00;
            this._matrix[0][1] = aM01;
            this._matrix[0][2] = aM02;
            this._matrix[1][0] = aM10;
            this._matrix[1][1] = aM11;
            this._matrix[1][2] = aM12;
            this._matrix[2][0] = aM20;
            this._matrix[2][1] = aM21;
            this._matrix[2][2] = aM22;
        },
        /**
         * Function to set the current matrix to identity matrix.
         * 
         * @return {undefined}
         */
        setIdentity: function () {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    this._matrix[i][j] = (i === j) ? 1 : 0;
                }
            }
        },
        /**
         * Function to get the matrix value for the specified row and column.
         * 
         * @param {Number} aRow Row of the matrix.
         * @param {Number} aCol Column of the matrix.
         * @return {undefined}
         */
        get: function (aRow, aCol) {
            return this._matrix[aRow][aCol];
        },
        /**
         * Function to set the matrix value for cell specified by row column.
         * 
         * @param {Number} aRow   Row to set the value.
         * @param {Number} aCol   Column to set the value.
         * @param {Number} aValue Value to set for the cell.
         * 
         * @return {undefined}
         */
        set: function (aRow, aCol, aValue) {
            this._matrix[aRow][aCol] = aValue;
        },
        /**
         * Function to get the number of rows in the matrix.
         * 
         * @return {Number} Number of rows in the matrix.    
         */
        _getRowsCount: function () {
            return this._matrix.length;
        },
        /**
         * Function to get the number of columns in the matrix.
         * 
         * @return {Number} Number of rows in the matrix.    
         */
        _getColumnsCount: function () {
            return this._matrix[0].length;
        },
        /**
         * Function to add the matrix to the current matrix.
         * 
         * @param {Object} aMatrix Matrix Class Object.
         * @return {undefined}
         */
        add: function (aMatrix) {
            var rows = aMatrix.rowsCount;
            var cols = aMatrix.columnsCount;

            if ((this.rowsCount === rows) && (this.columnsCount === cols)) {
                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        this._matrix[i][j] += aMatrix.get(i, j);
                    }
                }
            }
        },
        /**
         * Function to multiply two matrix with current matrix.
         * 
         * @param  {Object} aMatrixA Matrix Class Object.
         * @param  {Object} aMatrixB Matrix Class Object.
         * @return {undefined}          
         */
        _multiply: function (aMatrixA, aMatrixB) {
            var sum = 0;

            var matrixARowsCount = aMatrixA.rowsCount;
            var matrixBColsCount = aMatrixB.columnsCount;
            var matrixAColsCount = aMatrixA.rowsCount;

            for (var i = 0; i < matrixARowsCount; i++) {
                for (var j = 0; j < matrixBColsCount; j++) {
                    sum = 0;
                    for (var k = 0; k < matrixAColsCount; k++) {
                        sum += aMatrixA.get(i, k) * aMatrixB.get(k, j);
                    }
                    this._matrix[i][j] = sum;
                }
            }
        },
        /**
         * Function to prepend the matrix with the current matrix.
         * 
         * @param  {Object} aMatrix Matrix class object to be prepend to the current matrix. 
         * @return {undefined}         
         */
        prepend: function (aMatrix) {
            this._multiply(aMatrix, this);
        },
        /**
         * Function to prepend the matrix with the current matrix.
         * 
         * @param  {Object} aMatrix Matrix class object to be append to the current matrix. 
         * @return {undefined}         
         */
        append: function (aMatrix) {
            this._multiply(aMatrix, this);
        },
        properties: {
            /**
             * Property to get the number of rows in matrix.
             */
            rowsCount: {
                get: function () {
                    return this._getRowsCount();
                }
            },
            /**
             * Property to get number of columns in matrix.
             */
            columnsCount: {
                get: function () {
                    return this._getColumnsCount();
                }
            }
        }
    });

    aModule.createClass({
        /**
         * @class Rect
         */
        className: 'Rect',

        /**
         * Constructor of the Rect class
         * 
         * @constructor 
         * @param {Number} aX      X-Axis position of the rect
         * @param {Number} aY      Y-Axis position of the rect
         * @param {Number} aWidth  Width of the rect
         * @param {Number} aHeight Height of the rect
         */
        create: function (aX, aY, aWidth, aHeight) {
            this.setRect(aX, aY, aWidth, aHeight);
        },

        /**
         * Function to set the position and dimension of the rect.
         * 
         * @param {Number} aX      X-Axis position of the rect
         * @param {Number} aY      Y-Axis position of the rect
         * @param {Number} aWidth  Width of the rect
         * @param {Number} aHeight Height of the rect
         */
        setRect: function (aX, aY, aWidth, aHeight) {
            this._x = aX;
            this._y = aY;
            this._width = aWidth;
            this._height = aHeight;
        },

        /**
         * Function to set the position of the rect
         * 
         * @param {Number} aX X-Axis position of the rect
         * @param {Number} aY Y-Axis position of the rect
         */
        setPos: function (aX, aY) {
            this._x = aX;
            this._y = aY;
        },

        /**
         * Function to set the width and height of the rect
         * 
         * @param {Number} aWidth  Width of the rect
         * @param {Number} aHeight Height of the rect
         */
        setSize: function (aWidth, aHeight) {
            this._width = aWidth;
            this._height = aHeight;
        },

        /**
         * Function to set the bounds of the rectangle.
         * 
         * @param {Number} aLeft    X-Coordinate of the left edge of the rect
         * @param {Number} aTop     Y-Coordinate of the top edge of the rect
         * @param {Number} aRight   X-Coordinate of the right edge of the rect 
         * @param {Number} aBottom  Y-Coordinate of the bottom edge of the rect
         */
        setBounds: function (aLeft, aTop, aRight, aBottom) {
            this.setRect(aLeft, aTop, aRight - aLeft, aBottom - aTop);
        },

        /**
         * Function to check whether the passed parameter matches the currect bounds 
         * 
         * @param  {type} aX      X-Coordinate of the rectangle
         * @param  {type} aY      Y-Coordinate of the rectangle
         * @param  {type} aWidth  Width of the rectangle 
         * @param  {type} aHeight Height of the rectangle
         * @return {Boolean}      Returns true of the passed parameter matches current rect.
         */
        equal: function (aX, aY, aWidth, aHeight) {
            return (this._x === aX) ||
                (this._y === aY) ||
                (this._width === aWidth) ||
                (this._height === aHeight);
        },

        equalRect: function (aRect) {
            return this.equal(aRect.x, aRect.y, aRect.width, aRect.height);
        },

        /**
         * Function to check whether points are inside the rect bounds 
         * 
         * @param {Number} aX X-Coordinate 
         * @param {Number} aY Y-Coordinate 
         * @returns {Boolean} Returns true if the points are within bounds of rectangle 
         */
        contains: function (aX, aY) {
            return (aX >= this._x) && (aX < (this._x + this._width)) &&
                (aY >= this._y) && (aY < (this._y + this._height));
        },

        containsPoint: function (aVector) {
            return this.contains(aVector.x, aVector.y);
        },

        containsRect: function (aRect) {
            return (this._x <= aRect.x) && (aRect.right <= this.right) &&
                (this._y <= aRect.y) && (aRect.bottom <= this.bottom);
        },

        inflate: function (aWidth, aHeight) {
            this.set(this._x - aWidth, this._y - aHeight, this._width + 2 * aWidth, this._height + 2 * aHeight);
        },

        inflatePoint: function (aVector) {
            this.inflate(aVector.x, aVector.y);
        },

        scale: function (aScaleX, aScaleY) {
            this.setSize(this._width * aScaleX, this._height * aScaleY);
        },

        translate: function (aX, aY) {
            this.setPos(this._x + aX, this._y + aY);
        },

        offsetBounds: function (aLeft, aTop, aRight, aBottom) {
            this.setBounds(this.left + aLeft, this.top + aTop, this.right + aRight, this.bottom + aBottom);
        },

        increaseBounds: function (aLeft, aTop, aRight, aBottom) {
            this.offsetBounds(-aLeft, -aTop, aRight, aBottom);
        },

        decreaseBounds: function (aLeft, aTop, aRight, aBottom) {
            this.offsetBounds(aLeft, aTop, -aRight, -aBottom);
        },

        isEmpty: function () {
            return (this._x === 0) && (this._y === 0) && (this._width === 0) && (this._height === 0);
        },

        isEmptyArea: function () {
            return (this._width <= 0) || (this._height <= 0);
        },

        intersect: function (aRect) {
            var left = Math.max(this.left, aRect.left);
            var top = Math.max(this.top, aRect.top);
            var right = Math.min(this.right, aRect.right);
            var bottom = Math.min(this.bottom, aRect.bottom);
            var width = right - left;
            var height = bottom - top;

            return new aModule.Rect(left, top, width, height);
        },
        
        /**
         * Function to calcuate the union rect of two rect.
         * 
         * @param  {Object} aRect Rect with which union of current rect to be calculated
         * @return {Object} Union of the two rect.
         */
        union: function (aRect) {
            var left = Math.min(this.left, aRect.left);
            var top = Math.min(this.top, aRect.top);
            var right = Math.max(this.right, aRect.right);
            var bottom = Math.max(this.bottom, aRect.bottom);
            var width = right - left;
            var height = bottom - top;

            return new aModule.Rect(left, top, width, height);
        },

        intersects: function (aRect) {
            return (this.left < aRect.right) && (this.top < aRect.bottom) &&
                   (this.right > this.left) && (this.bottom > aRect.top);
        },

        /**
         * Function to set the margin to rect to recalculate the bounds of the rect
         * 
         * @param {Number} aMargin Margin passed to rect
         */
        setMargin: function (aMargin) {
            this.decreaseBounds(aMargin, aMargin, aMargin, aMargin);
        },

        margin: function(aMargin){
            this.decreaseBounds(aMargin.left, aMargin.top, aMargin.right, aMargin.bottom);
        },
        
        offsetFromCenter: function(aLeft, aTop, aRight, aBottom){
            var centerX = this.centerX;
            var centerY = this.centerY;
            
            this.left   = centerX - aLeft;
            this.top    = centerY - aTop;
            this.right  = centerX + aRight;
            this.bottom = centerY + aBottom;
        },

        properties: {
            x: {
                set: function (aValue) {
                    this._x = aValue;
                },
                get: function () {
                    return this._x;
                }
            },
            y: {
                set: function (aValue) {
                    this._y = aValue;
                },
                get: function () {
                    return this._y;
                }
            },
            left: {
                set: function (aValue) {
                    this._x = aValue;
                },
                get: function () {
                    return this._x;
                }
            },
            top: {
                set: function (aValue) {
                    this._y = aValue;
                },
                get: function () {
                    return this._y;
                }
            },
            right: {
                set: function (aValue) {
                    this._width = aValue - this._x;
                },
                get: function () {
                    return this._x + this._width;
                }
            },
            bottom: {
                set: function (aValue) {
                    this._width = aValue - this._y;
                },
                get: function () {
                    return this._y + this._height;
                }
            },
            width: {
                set: function (aValue) {
                    this._width = aValue;
                },
                get: function () {
                    return this._width;
                }
            },
            height: {
                set: function (aValue) {
                    this._height = aValue;
                },
                get: function () {
                    return this._height;
                }
            },
            centerX: {
                set: function (aValue) {
                    this._x = aValue - this._width / 2;
                },
                get: function () {
                    return this._x + this._width / 2;
                }
            },
            centerY: {
                set: function (aValue) {
                    this._y = aValue - this._height / 2;
                },
                get: function () {
                    return this._y + this._height / 2;
                }
            }
        }
    });

    aModule.createClass({
        /**
         * @class Margin
         */
        className: 'Margin',

        
        create: function(aLeft, aTop, aRight, aBottom){
            this.setMargin(aLeft, aTop, aRight, aBottom);
        },

        setMargin: function(aLeft, aTop, aRight, aBottom){
            this._left = aLeft;
            this._top = aTop;
            this._right = aRight;
            this._bottom = aBottom;
        },

        properties:{
            left: {
                set: function(aValue){
                    this._left = aValue;
                },
                get: function(aValue){
                    return this._left;
                }
            },
            top: {
                set: function(aValue){
                    this._top = aValue;
                },
                get: function(){
                    return this._top;
                }
            },
            right: {
                set: function(aValue){
                    this._right = aValue;
                },
                get: function(){
                    return this._right;
                }
            },
            bottom: {
                set: function(aValue){
                    this._bottom = aValue;
                },
                get: function(){
                    return this._bottom;
                }
            }
        }
    });
})(window.Adorn = window.Adorn || {});