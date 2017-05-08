
(function(aModule){
    'use strict';
    
    /**
     * Style attributes constants.
     *
     */
    aModule.StyleAttributes = {
        /**
         * Constant for linear gradient.
         * @type {String}
         */
        LINEAR_GRADIENT: 'LinearGradient',
        /**
         * Constant for radial gradient.
         * @type {String}
         */
        RADIAL_GRADIENT: 'RadialGradient',
        /**
         * Constant for style pattern.
         * @type {String}
         */
        PATTERN: 'Pattern',
        /**
         * Constant for solid fill style.
         * @type {String}
         */
        SOLID: 'Solid'
    };
    
    aModule.createClass({
        /**
         * @class BaseObject
         */
        className: 'BaseObject',
        
        
        /**
         * Function which invoked when the attribute is getting changed.
         *
         * @param  {String} aAttribute Attribute or property which is getting changed.
         * @param  {Var} aCurrentValue Current value of the attribute.
         * @param  {Var} aNewValue     New value of the attribute.
         * @return {Boolean}           Returns false to dont allow the attribute value to get changed.
         */
        attributeChanging: function(aAttribute, aCurrentValue, aNewValue) {},
        
        /**
         * Constructor for the Scene Object class.
         *
         * @return {undefined}
         */
        create: function(aAttributes) {
            this._attributes = {};
            this.attributes = aAttributes;
        },
        
        /**
         * Function to draw scene objects of the scenegraph.
         *
         * @param  {Object} aDrawAttributes Object which constains drawing attributes.
         * @return {undefined}
         */
        redraw: function(aDrawAttributes) {},
      
        /**
         * To update the attributes for the class which are passed as parameter of the object.
         *
         * @param  {Object} aAttributes Attributes which are passed as parameter.
         * @return {Boolean}
         */
        updateAttributes: function(aAttributes) {
            if (aModule.isObject(aAttributes)) {
                for (var prop in aAttributes) {
                    this._attributes[prop] = aAttributes[prop];
                }
            }
        },
        properties: {
            /**
             * Get or set the data for the sceneobject.
             *
             * @type {Object}
             */
            attributes: {
                get: function() {
                    return this._attributes;
                },
                set: function(aValue) {
                    this.updateAttributes(aValue);
                }
            }
        }
    });

    /**
     * Class for element.
     */
    aModule.createClass({
        /**
         * @class Element
         */
        className: 'Element',

        /**
         * @extends BaseObject
         */
        inherit: 'BaseObject',
        
        /**
         * Constructor of the Node class.
         *
         * @return {undefined}
         */
        create: function() {
            /**
             * Calling the base constructor class.
             */
            aModule.method('BaseObject', this, arguments, 'create');
        },
     
        /**
         * Function to render the node.
         *
         * @param  {Object} aDrawAttributes Attributes for drawing.
         * @return {undefined}
         */
        redraw: function(aDrawAttributes) {}
    });

    /**
     * Class for group in scenegraph.
     */
    aModule.createClass({
        /**
         * @class Group
         */
        className: 'Group',
        
        /**
         * @extends Element
         */
        inherit: 'Element',
        
        /**
         * Constructor for the group class.
         * @constructor
         */
        create: function() {
            aModule.method('Element', this, arguments, 'create');
            this._elements = new aModule.List(aModule.Element);
        },
        /**
         * Function to add the node to the group.
         *
         * @param {Object} aElement Node Class Object
         */
        add: function(aElement) {
            if (this._elements.isAllowed(aElement)) {
                this._elements.add(aElement);
            }
        },

        /**
         * Function to draw the elements.
         *
         * @param  {Object} aDrawAttributes Attributes object for drawing.
         * @return {undefined}
         */
        redraw: function(aDrawAttributes) {}
    });

    /**
     * Class for the appearance.
     */
    aModule.createClass({
        /**
         * Name of the class
         */
        className: 'Style',
        /**
         * Parent Class.
         * @type {String}
         */
        inherit: 'BaseObject',
        
        /**
         * Constructor for the Style class.
         * @constructor 
         */
        create: function(aAttributes) {
            aModule.method('BaseObject', this, arguments, 'create');
            this._fill = null;
            this._stroke = null;
            this._styleMap = new aModule.HashMap();
            this._initializeStyle();
        },
        /**
         * Function to initialize the hash map for appearance.
         * 
         * @return {undefined}          
         */
        _initializeStyle: function() {
            this._styleMap.add(aModule.StyleAttributes.LINEAR_GRADIENT, this._createLinearGradient);
            this._styleMap.add(aModule.StyleAttributes.RADIAL_GRADIENT, this._createRadialGradient);
            this._styleMap.add(aModule.StyleAttributes.SOLID, this._createSolid);
            this._styleMap.add(aModule.StyleAttributes.PATTERN, this._createPattern);
        },
        /**
         * Function to create the linear gradient.
         * 
         * @param {type} aContext
         * @param {type} aPaintStyle
         * @returns {unresolved}
         */
        _createLinearGradient: function(aPaintStyle, aContext) {
            var linearRange = {
                x0: 0,
                y0: 0,
                x1: 100,
                y1: 0
            };

            linearRange = aModule.isObject(aPaintStyle.range) ? aPaintStyle.range : linearRange;
            var linearGradient = aContext.createLinearGradient(linearRange.x0,
                linearRange.y0,
                linearRange.x1,
                linearRange.y1);
            return linearGradient;
        },
        /**
         * Function to create radial gradient for the paint style which is passed as parameter.
         * 
         * @param {Object} aContext     Rendering Context.
         * @param {Object} aPaintStyle  
         * @returns {unresolved}
         */
        _createRadialGradient: function(aPaintStyle, aContext) {
            var radialRange = {
                x0: 100,
                y0: 100,
                r0: 100,
                x1: 100,
                y1: 100,
                r1: 100
            };

            radialRange = aModule.isObject(aPaintStyle.range) ? aPaintStyle.range : radialRange;
            var radialGradient = aContext.createRadialGradient(radialRange.x0,
                radialRange.y0,
                radialRange.x1,
                radialRange.y1);
            this._addColorStops(aPaintStyle, aContext);
            return radialGradient;
        },
        /**
         * Function to create solid style.
         * 
         * @param  {Object} aPaintStyle  Paint style attribute. 
         * @return {String} Return the color.
         */
        _createSolid: function(aPaintStyle) {
            return aPaintStyle.color || 'black';
        },
        /**
         * Function to create pattern style.
         * 
         * @param  {Object} aPaintStyle Paint Style Object.
         * @param  {Object} aContext    Rendering Context.
         * @return {Object}             Pattern style.
         */
        _createPattern: function(aPaintStyle, aContext) {
            return aContext.createPattern(aPaintStyle.element, aPaintStyle.repeat);
        },
        /**
         * Function to add color stops for the paint style object.
         * 
         * @param  {Object} aPaintStyle Paint Style Object.
         * @param  {Object} aContext    Rendering Context.
         * @return {undefined}       
         */
        _addColorStops: function(aPaintStyle, aContext) {
            var stops = aPaintStyle.stops;
            if (aModule.isArray(stops)) {
                for (var i = 0; i < stops.length; i++) {
                    var stop = stops[i];
                    if (aModule.isAssigned(stop)) {
                        aContext.addColorStop(stop.stop, stop.color);
                    }
                }
            }
        },
        /**
         * Get the context paint style.
         *
         * @param  {String} aPaintStyle Style name.
         * @param  {Object} aContext    Rendering Context.
         * @return {undefined}
         */
        _getPaintStyle: function(aPaintStyle, aContext) {
            var style = aPaintStyle.style;
            var styleFunc = this._styleMap.get(style);
            if (aModule.isAssigned(styleFunc)) {
                return styleFunc.call(this, aPaintStyle, aContext);
            }
        },
        /**
         * To fill the drawing by fill attributes specified as parameters.
         *
         * @param  {Object} aFillAttributes Object having filling attributes.
         * @param  {Object} aContext        Html Context Object
         * @return {undefined}
         */
        _applyFill: function(aFillAttributes, aContext) {
            if (aModule.isObject(aFillAttributes)) {
                var fillStyle = this._getPaintStyle(aFillAttributes, aContext);
                if (aModule.isAssigned(fillStyle)) {
                    aContext.fillStyle = fillStyle;
                    aContext.fill();
                }
            }
        },
        /**
         * Function to apply the line cap according to the stroke attributes.
         * 
         * @param  {Object} aStrokeAttributes Stroke Attributes.
         * @param  {Object} aContext          Html Context Object
         * @return {undefined}                   
         */
        _applyLineCap: function(aStrokeAttributes, aContext) {
            var lineCap = aStrokeAttributes.cap;
            if (aModule.isAssigned(lineCap)) {
                aContext.lineCap = lineCap;
            }
        },
        /**
         * Function to apply line join fro the stroke attributes.
         * 
         * @param  {Object} aStrokeAttributes Stroke attribute object.
         * @param  {Object} aContext          Graphic Context Object.
         * @return {undefined}                   
         */
        _applyLineJoin: function(aStrokeAttributes, aContext) {
            var lineJoin = aStrokeAttributes.join;
            if (aModule.isAssigned(lineJoin)) {
                aContext.lineJoin = lineJoin;
            }
        },
        /**
         * Function to apply width to the line for the stroke attributes.
         * 
         * @param {Object} aStrokeAttributes    Attribute object for stroke.
         * @param {Object} aContext             Context Object.
         * @return {undefined}
         */
        _applyLineWidth: function(aStrokeAttributes, aContext) {
            var lineWidth = aStrokeAttributes.lineWidth;
            if (aModule.isAssigned(lineWidth)) {
                aContext.lineWidth = lineWidth;
            }
        },
        /**
         * Function to apply width to the line for the stroke attributes.
         * 
         * @param {Object} aStrokeAttributes    Attribute object for stroke.
         * @param {Object} aContext             Context Object.
         * @return {undefined}
         */
        _applyMiterLimit: function(aStrokeAttributes, aContext) {
            var miterLimit = aStrokeAttributes.miterLimit;
            if (aModule.isAssigned(miterLimit)) {
                aContext.miterLimit = miterLimit;
            }
        },
        /**
         * To apply the stroke in drawing for the given stroke attributes.
         *
         * @param  {Object} aStrokeAttributes Stroke Attributes.
         * @param  {Object} aContext          Context Object.
         * @return {undefined}
         */
        _applyStroke: function(aStrokeAttributes, aContext) {
            if (aModule.isObject(aStrokeAttributes)) {
                var strokeStyle = this._getPaintStyle(aStrokeAttributes, aContext);
                if (aModule.isAssigned(strokeStyle)) {
                    aContext.strokeStyle = strokeStyle;
                    this._applyLineJoin(aStrokeAttributes, aContext);
                    this._applyMiterLimit(aStrokeAttributes, aContext);
                    this._applyLineCap(aStrokeAttributes, aContext);
                    this._applyLineWidth(aStrokeAttributes, aContext);

                    aContext.stroke();
                }
            }
        },
        /**
         * Function to apply style for the context object which is passed as parameter.
         * 
         * @param {Object}  aContext Context Object.
         * @param {Object}  aStyleAttributes Style Attribute object.   
         * @return {undefined}
         */
        _applyStyle: function(aStyleAttributes, aContext) {
            this._applyFill(aStyleAttributes.fill, aContext);
            this._applyStroke(aStyleAttributes.stroke, aContext);
            this._applyTextStyle(aStyleAttributes, aContext);
        },

        /**
         * Function to apply font from style attributes.
         * 
         * @param {Object}  aContext Context Object.
         * @param {Object}  aFont Font string to applied.   
         */
        _applyTextStyle: function(aStyleAttributes, aContext){
            aContext.font = aStyleAttributes.font || aContext.font;
            aContext.textAlign = aStyleAttributes.textAlign || aContext.textAlign;
            aContext.textBaseline = aStyleAttributes.textBaseline || aContext.textBaseline;
        },

        /**
         * Function to redraw the appearance or style assigned.
         *  
         * @param {Object} aContext HTML rendering context.
         * @param {Object} aDrawAttributes Attributes for drawing.
         * @return {undefined}
         */
        redraw: function(aContext, aDrawAttributes) {
            if (aModule.isObject(this.attributes)) {
                this._applyStyle(this.attributes, aContext);
            }
        }
    });

    aModule.createClass({
        /**
         * @class Transform
         */
        className: 'Transform',
        /**
         * @extends Component
         */
        inherit: 'BaseObject',
        /**
         * Constructor of the class transform.
         * 
         * @constructor
         */
        create: function() {
            aModule.method('BaseObject', this, arguments, 'create');
            this._matrix = new aModule.Matrix();
        },
        /**
         * Function to scale the current transformation.
         * 
         * @param   {Number} aScaleX Scale by X position.
         * @param   {Number} aScaleY Scale by Y positiion.
         * @return  {undefined}
         */
        _scaleXY: function(aScaleX, aScaleY) {
            this._matrix.append(new aModule.Matrix(aScaleX, 0, 0, 0, aScaleY, 0, 0, 0, 1));
        },
        /**
         * Function to scale the current transformation for the point which is passed as parameter.
         * 
         * @param   {Object} aVector Vector class object.
         * @return  {undefined}
         */
        _scale: function(aVector) {
            if (aModule.isAssigned(aVector) && aVector instanceof aModule.Vector) {
                this._scaleXY(aVector.x, aVector.y);
            }
        },
        /**
         * Function to translate the current transformation specified by parameter.
         * 
         * @param {Number} aTranslateX Translate by X position.
         * @param {Number} aTranslateY Translate by Y position.
         * @return {undefined}
         */
        _translateXY: function(aTranslateX, aTranslateY) {
            this._matrix.append(new aModule.Matrix(1, 0, aTranslateX, 0, 1, aTranslateY, 0, 0, 1));
        },
        /**
         * Function to translate the current transformation specified by point.
         * 
         * @param {Object} aVector Vector class object.
         * @return {undefined}
         */
        _translate: function(aVector) {
            if (aModule.isObject(aVector) && aVector instanceof aModule.Vector) {
                this._translateXY(aVector.x, aVector.y);
            }
        },
        /**
         * Function to rotate the current transformation by the angle specified.
         * 
         * @param  {Number}    aAngle   Angle by which transformation will be rotated (0 to 360).
         * @return {undefined}
         */
        _rotate: function(aAngle) {
            if (aModule.isAssigned(aAngle)) {
                var radian = aAngle / 180 * Math.PI;
                this._matrix.append(new aModule.Matrix(Math.cos(radian), Math.sin(radian), 0, -Math.sin(radian), Math.cos(radian), 0,
                    0, 0, 1));
            }
        },
        /**
         * Function to skew the current transformation by the parameters passed.
         * 
         * @param {type} aSkewX Horizontal Skewing
         * @param {type} aSkewY Vertical Skewing
         * @returns {undefined}
         */
        _skewXY: function(aSkewX, aSkewY) {
            this._matrix.append(new aModule.Matrix(1, aSkewY, 0, aSkewX, 1, 0, 0, 0, 1));
        },
        /**
         * Function to skew the matrix for the point which is passed as parameter.
         * 
         * @param   {Object} aVector Vector class object.
         * @returns {undefined}
         */
        _skew: function(aVector) {
            if (aModule.isObject(aVector) && (aVector instanceof aModule.Vector)) {
                this._skewXY(aVector.x, aVector.y);
            }
        },
        /**
         * Function  to append the matrix to current matrix.
         * 
         * @param {Object} aMatrix  Matrix class object.
         * @returns {undefined}
         */
        _append: function(aMatrix) {
            if (aModule.isObject(aMatrix) && (aMatrix instanceof aModule.Matrix)) {
                this._matrix.append(aMatrix);
            }
        },
        /**
         * Function to prepend the matrix to current matrix.
         * 
         * @param {Object} aMatrix Matrix Class Object.
         * @returns {undefined}
         */
        _prepend: function(aMatrix) {
            if (aModule.isObject(aMatrix) && (aMatrix instanceof aModule.Matrix)) {
                this._matrix.prepend(aMatrix);
            }
        },
        updateAttributes: function(aAttributes) {
            aModule.method('BaseObject', this, arguments, 'updateAttributes');
            this._updateTransform(aAttributes);
        },
        /**
         * Function to update the transform values for the attributes.
         *  
         * @param {Object} aAttributes Attributes for transformation.
         * @return {undefined}
         */
        _updateTransform: function(aAttributes) {
            if (!aModule.isEmptyObject(aAttributes)) {
                this._rotate(aAttributes.rotate);
                this._translate(aAttributes.translate);
                this._scale(aAttributes.scale);
                this._skew(aAttributes.skew);
                this._append(aAttributes.append);
                this._prepend(aAttributes.prepend);
            }
        },
        /**
         * Function to transform the context for the transformation value which is set.
         * 
         * @param {Object} aContext Rendering Context.
         * @returns {undefined}
         */
        _setTransform: function(aContext) {
            if (aModule.isObject(aContext)) {
                aContext.transform(this._matrix.get(0, 0), this._matrix.get(1, 0), this._matrix.get(0, 1),
                    this._matrix.get(1, 1), this._matrix.get(0, 2), this._matrix.get(1, 2));
            }
        },
        
        /**
         * Function to render the transformation of the current matrix.
         * 
         * @param {Object} aDrawAttributes Attributes object for drawing.
         * @returns {undefined}
         */
        redraw: function(aDrawAttributes) {
            if (aModule.isObject(aDrawAttributes)) {
                this._setTransform(aDrawAttributes.context);
            }
        }
    });
}
)(window.Adorn = window.Adorn || {});