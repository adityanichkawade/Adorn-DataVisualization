(function(aModule){
    'use strict';
    
    /**
     * Defining the canvas class
     */
    aModule.createClass({
        /**
         * @class Canvas
         */
        className: 'Canvas',
        
        /**
         * @extends Element
         */
        inherit: 'BaseObject',
        
        
        /**
         * Constructor for the Canvas class.
         * @param {Object} aAttributes Attributes object provided in constructror.
         * @constructor
         */
        create: function(aAttributes) {
            this._context2d = null;
            aModule.method('BaseObject', this, arguments, 'create');
        },
        
        /**
         * Function to check whether the canvas is supported by current browser or not.
         *
         * @param  {Object/HTMLElement} aCanvasElement Canvas element
         * @return {Boolean}
         */
        supportCanvas: function(aCanvasElement) {
            return aCanvasElement && aCanvasElement.getContext;
        },

        /**
         * To create the canvas for the canvas element which is passed as
         * a parameter.
         *
         * @param  {Object/HTMLElement} aCanvasElement Canvas element for which canvas to be created.
         * @return {Boolean} Return true if canvas element is created.
         */
        createContext: function(aCanvasElement) {
            return this.supportCanvas(aCanvasElement) ? aCanvasElement.getContext('2d') : null;
        },
        
        calculateArea: function(aWidth, aHeight){  
        },

        /**
         * Function to create canvas element.
         * 
         * @param {Object} aDiv Div element on which canvas to be rendered.
         * @param {Object} aCanvasName Name of the canvas element 
         */
        setupCanvasElement: function(aCanvasName, aDiv){
            var canvasElement = document.createElement(aCanvasName);
            canvasElement.width = aDiv.scrollWidth;
            canvasElement.height = aDiv.scrollHeight;
            aDiv.appendChild(canvasElement);
            return canvasElement;
        },

        /**
         * Function to setup context and initialize its properties.
         * @param {Object} aCanvasElement Element from which context to be created.
         */
        setupContext: function(aCanvasElement){
            if (aModule.isAssigned(aCanvasElement)){
                this._context2d = this.createContext(aCanvasElement);
                this.calculateArea(this._context2d.canvas.width, this._context2d.canvas.height);
            }
        },

        /**
         * Create the canvas on the div which is passed as parameter.
         * 
         * @param {HTMLElement} aDiv Div element on which canvas is drawn.
         */
        setupCanvas: function(aDiv) {
            if (aModule.isElementOf(aDiv, 'DIV')){
                var canvasElement = this.setupCanvasElement('canvas', aDiv);
                this.setupContext(canvasElement);
            }
        },

        drawClearRect: function(aContext, aDrawAttributes){
            var width = aDrawAttributes.width;
            var height = aDrawAttributes.height;
            aContext.clearRect(0, 0, width, height);
        },

        drawBackground: function(aContext, aDrawAttributes){

        },
        
        /**
         * Function to repaint the canvas contents.
         */
        redraw: function() {
            var context = this._context2d;
            if (aModule.isAssigned(context)) {
                var canvas = context.canvas;
                var drawAttributes = {width: canvas.width, height: canvas.height};
                this.drawClearRect(context, drawAttributes);
                this.drawBackground(context, drawAttributes);
            }
        },
        
        /**
         * Override from the base class to update attributes.
         * 
         * @param {Object} aAttributes Attributes which are passed as object.
         */
        updateAttributes: function(aAttributes){
            aModule.method('BaseObject', this, arguments, 'updateAttributes');
            this.setupCanvas(aAttributes.div);
        }
    });
})(window.Adorn = window.Adorn || {});