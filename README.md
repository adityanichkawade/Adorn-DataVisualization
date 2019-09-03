# Adorn-DataVisualization
Adorn Data Visualization Library is writtern is Javascript based on HTML5 Canvas.
Its is purely writtern is Javascript without any dependency of external libraries.

Similarily code cyclomatic complexity is maintained which is less than 5, hence code is more clean. 

Currently data visualization part is starting with charts from basic charts and will include other parts of data visualization 

Sample Example

Step 1. Adding the script

    <head>
        <script src="Adorn.js"></script>
    </head>
Step 2. Example of Line chart
            
     <script>
     function load() {
            var simpleChart =  new Adorn.LineChart({
                data: [[1000, 5], [1500, 10], [3500, 90], [2500, 80], [4500, 95]]
            });
    
        var canvas = new Adorn.Graph({
                div: document.getElementById('canvasDiv'), //Div on which charting to be rendered
                margin: new Adorn.Margin(300, 50, 300, 50),
                xAxis: {
                    data:[1000, 2000, 3000, 4000, 5000],
                    style: new Adorn.Style({
                        textBaseline: 'top',
                        textAlign:'center',
                        font: '15px arial, sans-serif'
                    })
                },
                yAxis: {
                    data:[10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                    style: new Adorn.Style({
                        textAlign: 'right',
                        textBaseline: 'middle',
                        font: '15px arial, sans-serif'
                    })
                },
                charts: [simpleChart]
            });
            
            canvas.redraw();
        }
    </script>
   
Step 3. Load
    
    <body onload="load()">
        <div id="canvasDiv" style="background-color: whitesmoke; border: solid 1px black; width: 100%; height: 400px"></div>
    </body>

  
