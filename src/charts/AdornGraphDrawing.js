(function(aModule){
    'use strict';

    aModule.createStaticClass({
        /**
         * @class GraphDrawing
         */
        className: 'GraphDrawing',
        
        applyStyle: function(aContext, aStyle){
            if (aStyle){
                aStyle.redraw(aContext);
                return true;
            }
        },

        /**
         * Function to draw the graph axes
         * 
         * @param {type} aContext
         * @param {type} aRect
         */
        drawAxes: function(aContext, aDrawAttributes){
            var rect = aDrawAttributes.rect;
            var style = aDrawAttributes.style;

            aContext.beginPath();
            aContext.moveTo(rect.left, rect.top);
            aContext.lineTo(rect.left, rect.bottom);
            aContext.lineTo(rect.right, rect.bottom);
            
            if (!this.applyStyle(aContext, style)){
                aContext.stroke();
            }
            
            aContext.closePath();
        },

        /**
         * Function to draw series of text between two points for data passed.
         * 
         * @param {Object} aStartPoint Start point of plotting.
         * @param {Object} aEndPoint   End point of plotting.
         * @param {Object} aData       Array of series to be plotted
         */
        drawScale: function(aContext, aDrawAttributes){
            var startPoint = aDrawAttributes.scalePosition;
            var data = aDrawAttributes.scaleData || [];
            var direction = aDrawAttributes.scaleDirection;
            var gap = aDrawAttributes.scaleGap;

            for(var i = 0; i < data.length; i++){
                startPoint.offsetPos(direction.x * gap, direction.y * gap);
                aContext.fillText(data[i], startPoint.x, startPoint.y);    
            }
        },

        /**
         * Function to draw the marker on the graph.
         * 
         * @param {Object} aContext         Rendering Context.
         * @param {Object} aDrawAttributes  Draw attributes.
         */
        drawMarker: function(aContext, aDrawAttributes){
            var point = aDrawAttributes.point;
            var radius = 5;

            aContext.beginPath();
            aContext.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
            if (!this.applyStyle(aContext, aDrawAttributes.style)) {
                aContext.fill();
            }
            aContext.closePath();
        }
    });
})(window.Adorn = window.Adorn || {});