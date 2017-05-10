(function(aModule){
    aModule.createClass({
        /**
         * @class Chart
         */
        className: 'Chart',

        /**
         * @extends BaseObject
         */
        inherit: 'BaseObject',

        /**
         * Constructor of GraphChart
         * @constructor
         */
        create: function(aAttributes) {
            aModule.method('BaseObject', this, arguments, 'create');
        },

        /**
         * Overrided function to update attributes for the for the charts.
         * 
         * @param {Object} aAttributes Attributes for graph object.
         */
        updateAttributes: function(aAttributes){
            aModule.method('BaseObject', this, arguments, 'updateAttributes');
        }
    });

    aModule.createClass({
        /**
         * @class Chart
         */
        className: 'LineChart',

        /**
         * @extends BaseObject
         */
        inherit: 'Chart',


        /**
         * Function to draw the chart.
         * 
         * @param {Object} aContext     Rendering context.
         * @param {Object} aAttributes  Attributes for graph drawing
         */
        redraw: function(aContext, aDrawAttributes){
            var graph = aDrawAttributes.graph;
            var data = this.attributes.data;

            for(var i = 0; i < data.length - 1; i++){

            }

            for(var j = 0; j < data.length; j++){
                var markerPoint = graph.chartToGraphPoint(data[j][0], data[j][1]);
                Adorn.GraphDrawing.drawMarker(aContext, {point: markerPoint});
            }  
        }
    });

})(window.Adorn = window.Adorn || {});