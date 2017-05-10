(function (aModule) {
    'use strict';

    aModule.createClass({
        /**
         * @class Chart
         */
        className: 'Graph',

        /**
         * @extends Canvas
         */
        inherit: 'Canvas',

        /**
         * Constructor for Chart
         * @constructor
         */
        create: function () {
            this._graphRect = null;
            aModule.method('Canvas', this, arguments, 'create');
        },

        /*
         * TODO: Add comment here.
         */
        calculateChartToGraphPoint: function (aNumberOfScalePoints, aScaleInterval, aPlotPoint, aAxisLength) {
            var chartPointFactor = aPlotPoint / aScaleInterval;
            var graphPointFactor = aAxisLength / aNumberOfScalePoints;
            return chartPointFactor * graphPointFactor;
        },

        /*
         * TODO: Add comment here.
         */
        convertChartToGraphPoint: function (aPlotPoint, aScalePosition, aScalePoints) {
            var length = aScalePosition.startPoint.lengthBetween(aScalePosition.endPoint);
            return this.calculateChartToGraphPoint(aScalePoints.length,
                aScalePoints[0],
                aPlotPoint,
                length);
        },

        /*
         * TODO: Add comment here.
         */
        convertPlotPoint: function (aXScalePoints, aYScalePoints, aPlotX, aPlotY) {
            var scalePositionX = this.getXScalePosition();
            var scalePositionY = this.getYScalePosition();
            var xPos = this.convertChartToGraphPoint(aPlotX, scalePositionX, aXScalePoints);
            var yPos = this.convertChartToGraphPoint(aPlotY, scalePositionY, aYScalePoints);
            return new aModule.Vector(xPos + scalePositionX.startPoint.x, scalePositionY.startPoint.y - yPos);
        },

        /*
         * TODO: Add comment here.
         */
        chartToGraphPoint: function (aPlotX, aPlotY) {
            var xAxis = this.attributes.xAxis;
            var yAxis = this.attributes.yAxis;
            return this.convertPlotPoint(xAxis.data, yAxis.data, aPlotX, aPlotY);
        },

        /*
         * TODO: Add comment here.
         */
        getChartToGraphPoints: function (aPlotData) {
            var graphPointsData = [];
            for (var i = 0; i < aPlotData.length; i++) {
                var data = aPlotData[i];
                var point = this.chartToGraphPoint(data[0], data[1]);
                graphPointsData.push(point);
            }
            return graphPointsData;
        },

        /**
         * Function to update the rect with margin.
         * 
         * @param {Object} aMargin Margin to be applied to the graph.
         */
        updateMargin: function (aMargin) {
            if (aMargin) {
                this._graphRect.margin(aMargin);
            }
        },

        /**
         * Function to calcuate the graph rect in which to draw the graph.
         * 
         * @param  {Number} aWidth  Width of the canvas
         * @param  {Number} aHeight Height of the canvas
         * 
         * @return {Object} Return the calcuate graph rect
         */
        calculateArea: function (aWidth, aHeight) {
            this._graphRect = new aModule.Rect(0, 0, aWidth, aHeight);
        },

        /**
         * Function to apply the style for the style object passed as parameter.
         * 
         * @param {Object} aStyle Style object
         */
        applyStyle: function (aContext, aStyle) {
            if (aStyle) {
                aStyle.redraw(aContext);
            }
        },

        /**
         * Function to return the attributes for drawing x-axis and y-axis
         * 
         * @param {Object} aAttributes Attributes for the graph axis on the graph.
         */
        getAxesDrawAttributes: function (aAttributes) {
            return {
                rect: new aModule.Rect(this._graphRect.x, this._graphRect.y, this._graphRect.width, this._graphRect.height)
            };
        },

        /**
         * Return the attributes scales drawing on the graph.
         */
        computeScaleDrawAttributes: function (aStartPoint, aDirection, aLength, aData) {
            return {
                scalePosition: aStartPoint,
                scaleGap: aLength / aData.length,
                scaleData: aData,
                scaleDirection: aDirection
            };
        },

    
        /*
         * TODO: Add comment here
         */
        getScaleDrawAttributes: function (aScaleAttributes, aStartPoint, aEndPoint) {
            if (aScaleAttributes) {
                return this.computeScaleDrawAttributes(aStartPoint,
                    aStartPoint.directionBetween(aEndPoint),
                    aStartPoint.lengthBetween(aEndPoint),
                    aScaleAttributes.data);
            }
        },


        /**
         * Function to draw the graph x-axes and y-axes.
         * 
         * @param {Object} aContext Rendering context.
         */
        getXScalePosition: function () {
            var rect = this._graphRect;
            return {
                startPoint: new aModule.Vector(rect.left, rect.bottom),
                endPoint: new aModule.Vector(rect.right, rect.bottom)
            };
        },

        /**
         * Function to draw the graph x-axes and y-axes.
         * 
         * @param {Object} aContext Rendering context.
         */
        getYScalePosition: function () {
            var rect = this._graphRect;
            return {
                startPoint: new aModule.Vector(rect.left, rect.bottom),
                endPoint: new aModule.Vector(rect.left, rect.top)
            };
        },


        /**
         * Function to draw the graph x-axes and y-axes.
         * 
         * @param {Object} aContext Rendering context.
         */
        drawAxes: function (aContext, aAttributes) {
            var drawAttributes = this.getAxesDrawAttributes(aAttributes);
            if (drawAttributes) {
                aModule.GraphDrawing.drawAxes(aContext, drawAttributes);
            }
        },


        /**
         * Function to draw the graph x-axes and y-axes.
         * 
         * @param {Object} aContext Rendering context.
         */
        drawScale: function (aContext, aScaleAttributes, aScalePosition) {
            var drawAttributes = this.getScaleDrawAttributes(aScaleAttributes,
                aScalePosition.startPoint,
                aScalePosition.endPoint);

            if (drawAttributes) {
                this.applyStyle(aContext, aScaleAttributes.style);
                aModule.GraphDrawing.drawScale(aContext, drawAttributes);
            }
        },


        /**
         * Function to draw the graph x-axes and y-axes.
         * 
         * @param {Object} aContext Rendering context.
         */
        drawScales: function (aContext, aAttributes) {
            aContext.save();
            this.drawScale(aContext, aAttributes.xAxis, this.getXScalePosition());
            this.drawScale(aContext, aAttributes.yAxis, this.getYScalePosition());
            aContext.restore();
        },

        getChartPoints: function (aPlottingAttributes) {
            return (aPlottingAttributes) ? this.getChartToGraphPoints(aPlottingAttributes.data) : [];
        },

        /**
         * Function to draw the chart.
         * 
         * @param {Object} aContext Rendering context.
         * @param {Object} aChart   Chart object.
         */
        drawChart: function (aContext, aChart) {
            aContext.save();
            aChart.redraw(aContext, {
                graph: this
            });
            aContext.restore();
        },

        /**
         * Function to draw charts.
         * 
         * @param {Object} aContext Rendering context.
         * @param {Object} aCharts  Array of charts.
         */
        drawCharts: function (aContext, aAttributes) {
            var charts = aAttributes.charts;
            if (charts) {
                for (var i = 0; i < charts.length; i++) {
                    this.drawChart(aContext, charts[i]);
                }
            }
        },

        /**
         * Function to draw the graph x-axes and y-axes.
         * 
         * @param {Object} aContext Rendering context.
         */
        drawGraph: function (aContext, aAttributes) {
            this.drawAxes(aContext, aAttributes);
            this.drawScales(aContext, aAttributes);
            this.drawCharts(aContext, aAttributes);
        },

        /**
         * Overrided from the base class to draw the graph axes.
         * 
         * @param {Object} aContext     Rendering context.
         */
        drawBackground: function (aContext) {
            this.drawGraph(aContext, this.attributes);
        },

        /**
         * Override from the base class to update the attributes for the new attributes.
         * 
         * @param {Object} aAttributes Attributes to be updated
         */
        updateAttributes: function (aAttributes) {
            aModule.method('Canvas', this, arguments, 'updateAttributes');
            this.updateMargin(aAttributes.margin);
        }
    });

})(window.Adorn = window.Adorn || {});