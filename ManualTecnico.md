## Manual Técnico

### Descripción General
Este proyecto está desarrollado con HTML y JavaScript, utilizando la biblioteca `tytus.js` para implementar modelos de Machine Learning. El sitio web es alojado en GitHub Pages, proporcionando una interfaz interactiva para cargar datasets y realizar operaciones de Machine Learning.

### Tecnologías Utilizadas
- **HTML**: Estructura del sitio web.
- **JavaScript**: Lógica del sitio y manejo de datos.
- **tytus.js**: Biblioteca principal para la implementación de modelos de Machine Learning.
- **CSS**: Estilos del sitio web.
- **Bootstrap**: Para mejorar el diseño de la pagina.
- **GitHub Pages**: Para el alojamiento del sitio web.

### Configuración y Dependencias
- **tytus.js**: La biblioteca se importa directamente en el proyecto desde el repositorio [TytusDB en GitHub](https://github.com/tytusdb/tytusjs/blob/main/dist/tytus.js).

### Estructura de Archivos
- `index.html`: Página principal con la estructura base del sitio.
- `index.js`: Archivo principal de JavaScript donde se implementan las funciones de carga de archivos, selección de modelos, parametrización y ejecución de operaciones.
- `styles.css`: Estilos del sitio para una mejor presentación de la interfaz.

### Descripción de Funciones Clave


### Instalación y Ejecución
1. Clona el repositorio desde GitHub.
2. Abre `index.html` en un navegador web para ejecutar la aplicación.
3. Carga un archivo CSV y sigue los pasos descritos en el manual de usuario.

### Ejemplo de Uso
A continuación, un ejemplo básico para utilizar el sitio:
1. Carga el archivo `dataset.csv`.
2. Selecciona un modelo de clasificación.
3. Configura el porcentaje de datos de entrenamiento y el objetivo de clasificación.
4. Ejecuta el entrenamiento.
5. Realiza una predicción con un nuevo conjunto de datos.

### Consideraciones de Desarrollo
- **Compatibilidad**: Asegurarse de que el sitio sea compatible con los principales navegadores.
- **Optimización**: Reducir el tamaño del archivo de la biblioteca `tytus.js` cargada para un rendimiento óptimo.
- **Seguridad**: Validar los archivos cargados para evitar datos maliciosos.
