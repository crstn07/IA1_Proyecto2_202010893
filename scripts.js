document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const modelSelect = document.getElementById('modelSelect');
    const trainSplit = document.getElementById('trainSplit');
    const objective = document.getElementById('objective');
    const predictionParams = document.getElementById('predictionParams');
    const classificationParams = document.getElementById('classificationParams');
    const xRange = document.getElementById('xRange');
    const numClasses = document.getElementById('numClasses');
    const inputVars = document.getElementById('inputVars');
    const outputVar = document.getElementById('outputVar');
    const trainButton = document.getElementById('trainButton');
    const predictButton = document.getElementById('predictButton');
    const plotButton = document.getElementById('plotButton');
    const results = document.getElementById('results');

    let data = null;
    let model = null;

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            data = parseCSV(csv);
            console.log('Data loaded:', data);
        };
        reader.readAsText(file);
    });

    objective.addEventListener('change', () => {
        if (objective.value === 'prediction') {
            predictionParams.style.display = 'block';
            classificationParams.style.display = 'none';
        } else if (objective.value === 'classification') {
            predictionParams.style.display = 'none';
            classificationParams.style.display = 'block';
        }
    });

    trainButton.addEventListener('click', () => {
        if (!data) {
            alert('Por favor, cargue un archivo CSV primero.');
            return;
        }

        const selectedModel = modelSelect.value;
        const trainPercentage = parseInt(trainSplit.value) / 100;
        const inputVariables = inputVars.value.split(',').map(v => v.trim());
        const outputVariable = outputVar.value.trim();

        // Separar datos de entrenamiento y prueba
        const splitIndex = Math.floor(data.length * trainPercentage);
        const trainData = data.slice(0, splitIndex);
        const testData = data.slice(splitIndex);

        // Preparar datos de entrada y salida
        const X_train = trainData.map(row => inputVariables.map(v => row[v]));
        const y_train = trainData.map(row => row[outputVariable]);
        const X_test = testData.map(row => inputVariables.map(v => row[v]));
        const y_test = testData.map(row => row[outputVariable]);

        // Crear y entrenar el modelo
        if (selectedModel === 'linearRegression') {
            model = new tytus.LinearRegression();
        } else if (selectedModel === 'knn') {
            model = new tytus.KNN();
        }
        // Añadir más modelos según sea necesario

        model.fit(X_train, y_train);

        // Evaluar el modelo
        const predictions = model.predict(X_test);
        const mse = calculateMSE(y_test, predictions);

        results.innerHTML = `
            <h3>Resultados del Entrenamiento</h3>
            <p>Error Cuadrático Medio: ${mse.toFixed(4)}</p>
        `;
    });

    predictButton.addEventListener('click', () => {
        if (!model) {
            alert('Por favor, entrene un modelo primero.');
            return;
        }

        // Aquí puedes implementar la lógica para hacer predicciones
        // basadas en nuevos datos ingresados por el usuario
    });

    plotButton.addEventListener('click', () => {
        if (!data || !model) {
            alert('Por favor, cargue datos y entrene un modelo primero.');
            return;
        }

        // Aquí puedes implementar la lógica para mostrar gráficas
        // utilizando una biblioteca como Chart.js
    });
});

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index];
            return obj;
        }, {});
    });
}

function calculateMSE(actual, predicted) {
    const sum = actual.reduce((acc, val, i) => acc + Math.pow(val - predicted[i], 2), 0);
    return sum / actual.length;
}