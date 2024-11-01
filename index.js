document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const modelSelect = document.getElementById('modelSelect');
    const trainSplit = document.getElementById('trainSplit');
    const inputVars = document.getElementById('inputVars');
    const trainButton = document.getElementById('trainButton');
    const predictButton = document.getElementById('predictButton');
    const plotButton = document.getElementById('plotButton');
    const results = document.getElementById('results');

    let model = null;
    let [xTrain, yTrain, predictArray] = [[], [], []];

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            [xTrain, yTrain, predictArray] = parseCSV(csv)
            console.log("xTrain:", xTrain);
            console.log("yTrain:", yTrain);
            console.log("predictArray:", predictArray);

        };
        reader.readAsText(file);
    });

    trainButton.addEventListener('click', () => {
        if (!xTrain.length && !yTrain.length && !predictArray.length) {
            alert('Por favor, cargue un archivo CSV primero.');
            return;
        }

        const selectedModel = modelSelect.value;
        const inputVariables = inputVars.value.split(',').map(v => v.trim());


        // Crear y entrenar el modelo
        if (selectedModel === 'linear') {
            model = new LinearRegression();
            model.fit(xTrain, yTrain)         

            const tableContainer = document.getElementById('datosEntrenamiento');
            tableContainer.innerHTML = '<h4>Datos de Entrenamiento:</h4>';
            const table = document.createElement('table');
            table.classList.add('table'); 
            table.classList.add('table-info'); 
            table.classList.add('table-striped'); 

            // Crear el encabezado de la tabla
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['xTrain', 'yTrain']; // Encabezados para las columnas

            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
        
            // Crear las filas de la tabla basadas en la longitud de las columnas
            for (let i = 0; i < [xTrain, yTrain][0].length; i++) {
                const row = document.createElement('tr');
        
                // Añadir cada celda con los valores correspondientes
                for (let j = 0; j < [xTrain, yTrain].length; j++) {
                    const cell = document.createElement('td');
                    cell.textContent = [xTrain, yTrain][j][i];
                    row.appendChild(cell);
                }
        
                tbody.appendChild(row);
            }
        
            table.appendChild(tbody);
            tableContainer.appendChild(table);   

        } else if (selectedModel === 'polynomial') {
            model = new PolynomialRegression();
            model.fit(xTrain, yTrain);
        }
        results.innerHTML = `
            <h3>Resultados</h3>
        `;
    });

    predictButton.addEventListener('click', () => {
        const selectedModel = modelSelect.value;
        if (!model) {
            alert('Por favor, entrene un modelo primero.');
            return;
        }
        if (selectedModel === 'linear') {
            const linear = new LinearRegression();
            linear.fit(xTrain, yTrain);
            yPredict = linear.predict(xTrain);
            console.log('yPredict:', yPredict);
            var arrays = joinArrays('xTrain', xTrain, 'yTrain', yTrain, 'yPredict', yPredict)
            console.log(arrays)
            
            const tableContainer = document.getElementById('datosPrediccion');
            tableContainer.innerHTML = '<h4>Datos de Predicción:</h4>';
            const table = document.createElement('table');
            table.classList.add('table'); 
            table.classList.add('table-primary'); 
            table.classList.add('table-striped'); 

            // Crear el encabezado de la tabla
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['x', 'yPredict']; // Encabezados para las columnas

            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
        
            // Crear las filas de la tabla basadas en la longitud de las columnas
            for (let i = 0; i < [xTrain, yPredict][0].length; i++) {
                const row = document.createElement('tr');
        
                // Añadir cada celda con los valores correspondientes
                for (let j = 0; j < [xTrain, yPredict].length; j++) {
                    const cell = document.createElement('td');
                    cell.textContent = [xTrain, yPredict][j][i];
                    row.appendChild(cell);
                }
        
                tbody.appendChild(row);
            }
        
            table.appendChild(tbody);
            tableContainer.appendChild(table);   
            
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(function() {
                drawTrendChart(xTrain, yTrain, yPredict);
            });

        } else if (selectedModel === 'polynomial') {
            model = new tytus.KNN();
        }
    });

    plotButton.addEventListener('click', () => {
        if (!data || !model) {
            alert('Por favor, cargue datos y entrene un modelo primero.');
            return;
        }
    });
});

// Función para parsear el contenido del CSV
function parseCSV(data) {
    // Dividimos el archivo en líneas
    const lines = data.split('\n');

    // Creamos un array para cada columna
    const columns = Array.from({ length: 3 }, () => []);

    // Iteramos sobre cada línea, ignorando la primera si contiene encabezados
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');

        // Aseguramos que la cantidad de columnas sea correcta
        if (values.length === 2 || values.length === 3) {
            values.forEach((value, index) => {
                columns[index].push(value.trim());
            });
        }
    }

    return columns;
}

function joinArrays() {
    var a = []
    if (arguments.length == 6) {
        a.push([arguments[0],arguments[2],arguments[4]])
        for(var i = 0; i < arguments[1].length; i++) {
            a.push([arguments[1][i],arguments[3][i],arguments[5][i]])
        }
    }
    return a
}

function drawTrendChart(x, y, predicted) {
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y Original');
    data.addColumn('number', 'Y Predicted');

    for (let i = 0; i < x.length; i++) {
        data.addRow([x[i], y[i], predicted[i]]);
    }

    const options = {
        title: 'Análisis de Tendencias',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'X',
        },
        vAxis: {
            title: 'Y',
        },
        colors: ['#1b9e77', '#d95f02'],
    };

    const chart = new google.visualization.LineChart(document.getElementById('graficaTendencias'));
    chart.draw(data, options);
}