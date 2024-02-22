// Modelo de Alumno
class Alumno {
    constructor(nombre, apellidos, edad, materias = [], calificaciones = []) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = materias;
        this.calificaciones = calificaciones;
    }

    // Método para asignar materia y calificación
    asignarMateriaCalificacion(materia, calificacion) {
        this.materias.push(materia);
        this.calificaciones.push(calificacion);
    }

    // Método para obtener promedio de calificaciones
    obtenerPromedio() {
        if (this.calificaciones.length === 0) return 0;
        let suma = this.calificaciones.reduce((total, calif) => total + calif);
        return suma / this.calificaciones.length;
    }
}

// Lista de Alumnos
let alumnos = [];

// Función para dar de alta un alumno
function altaAlumno(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let edad = document.getElementById('edad').value;

    let alumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(alumno);

    actualizarListaAlumnos();
    guardarEnLocalStorage();
}

// Función para mostrar lista de alumnos en el select
function actualizarListaAlumnos() {
    let selectAlumnos = document.getElementById('alumno');
    selectAlumnos.innerHTML = '';
    alumnos.forEach((alumno, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = `${alumno.nombre} ${alumno.apellidos}`;
        selectAlumnos.appendChild(option);
    });
}

// Función para asignar calificación a un alumno
function asignarCalificacion(event) {
    event.preventDefault();
    let index = document.getElementById('alumno').value;
    let materia = document.getElementById('materia').value;
    let calificacion = parseInt(document.getElementById('calificacion').value);

    if (index !== '' && !isNaN(calificacion)) {
        alumnos[index].asignarMateriaCalificacion(materia, calificacion);
        guardarEnLocalStorage();
        mostrarResultado(`Calificación de ${materia} asignada al alumno ${alumnos[index].nombre} ${alumnos[index].apellidos}`);
    } else {
        mostrarResultado('Por favor selecciona un alumno y proporciona una calificación válida.');
    }
}

// Función para buscar por nombre
function buscarPorNombre() {
    let nombre = prompt('Ingrese el nombre a buscar:');
    if (nombre) {
        let resultados = alumnos.filter(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase());
        mostrarResultado(resultados.length > 0 ? resultados : 'Alumno no encontrado.');
    }
}

// Función para buscar por apellido
function buscarPorApellido() {
    let apellido = prompt('Ingrese el apellido a buscar:');
    if (apellido) {
        let resultados = alumnos.filter(alumno => alumno.apellidos.toLowerCase() === apellido.toLowerCase());
        mostrarResultado(resultados.length > 0 ? resultados : 'Alumno no encontrado.');
    }
}

// Función para obtener promedio de un alumno
function obtenerPromedioAlumno() {
    let index = document.getElementById('alumno').value;
    if (index !== '') {
        let promedio = alumnos[index].obtenerPromedio();
        mostrarResultado(`El promedio de calificaciones del alumno ${alumnos[index].nombre} ${alumnos[index].apellidos} es: ${promedio}`);
    } else {
        mostrarResultado('Por favor selecciona un alumno.');
    }
}

// Función para obtener promedio del grupo
function obtenerPromedioGrupo() {
    if (alumnos.length > 0) {
        let sumaTotal = alumnos.reduce((total, alumno) => total + alumno.obtenerPromedio(), 0);
        let promedioGrupo = sumaTotal / alumnos.length;
        mostrarResultado(`El promedio de calificaciones del grupo es: ${promedioGrupo}`);
    } else {
        mostrarResultado('No hay alumnos en el grupo.');
    }
}

// Función para ordenar alumnos ascendente por promedio
function ordenarAscendente() {
    if (alumnos.length > 0) {
        let alumnosOrdenados = alumnos.slice().sort((a, b) => a.obtenerPromedio() - b.obtenerPromedio());
        mostrarResultado('Alumnos ordenados ascendente por promedio:', alumnosOrdenados);
    } else {
        mostrarResultado('No hay alumnos en el grupo.');
    }
}

// Función para ordenar alumnos descendente por promedio
function ordenarDescendente() {
    if (alumnos.length > 0) {
        let alumnosOrdenados = alumnos.slice().sort((a, b) => b.obtenerPromedio() - a.obtenerPromedio());
        mostrarResultado('Alumnos ordenados descendente por promedio:', alumnosOrdenados);
    } else {
        mostrarResultado('No hay alumnos en el grupo.');
    }
}

// Función para mostrar resultado en la página
function mostrarResultado(mensaje, datos = null) {
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    let p = document.createElement('p');
    p.textContent = mensaje;
    resultadoDiv.appendChild(p);

    if (datos) {
        let ul = document.createElement('ul');
        datos.forEach(item => {
            let li = document.createElement('li');
            li.textContent = JSON.stringify(item);
            ul.appendChild(li);
        });
        resultadoDiv.appendChild(ul);
    }
}

// Función para guardar en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

// Función para cargar desde LocalStorage al cargar la página
function cargarDesdeLocalStorage() {
    if (localStorage.getItem('alumnos')) {
        alumnos = JSON.parse(localStorage.getItem('alumnos'));
        actualizarListaAlumnos();
    }
}

// Event Listeners
document.getElementById('altaAlumnoForm').addEventListener('submit', altaAlumno);
document.getElementById('calificacionesForm').addEventListener('submit', asignarCalificacion);

// Cargar desde LocalStorage al cargar la página
cargarDesdeLocalStorage();
