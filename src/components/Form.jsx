
import React, { useState } from 'react'

const Form = () => {
    const carreras = ['Ing. en Sistemas', 'Ing. en Quimica', 'Lic. en Administracion', "Ing. en TIC'S",
        'Ing. en Civil', 'Ing. en Logistica', 'Ing. en Electrica', 'Ing. en Mecatronica']

    //Hooks
    const [alumnos, setAlumnos] = useState([])
    const [matricula, setMatricula] = useState('')
    const [nombre, setNombre] = useState('')
    const [carrera, setCarrera] = useState('')
    const [imagen, setImagen] = useState()
    const [funcion, setFunciones] = useState('registrar')
    const [bloqueo, setBloqueo] = useState(false)

    const hanleMatriculachangeut = (event) => {
        setMatricula(event.target.value)
    }
    const hanleNombrechangeut = (event) => {
        setNombre(event.target.value)
    }
    const hanleCarrerachangeut = (event) => {
        setCarrera(event.target.value)
    }
    const hanleImagenchangeut = (e) => {//manda a la image del archivo
        const file = e.target.files[0]
        setImagen(file)
    }

    //enviar datos
    const sumitForms = (event) => {

        event.preventDefault()//resivira todo los que a enviado
        
        if (funcion === 'registrar') {
            const objeto = { matricula: matricula, nombre: nombre, carrera: carrera, foto: imagen }
            setAlumnos([...alumnos, objeto])
            limpiar()
        } else {
            const index1 = alumnos.findIndex((alumno) => alumno.matricula === matricula)
            const datosActualizar = alumnos[index1]
            datosActualizar.nombre = nombre
            datosActualizar.carrera = carrera
            datosActualizar.imagen= imagen

            if (imagen != null) {
                datosActualizar.foto = imagen
            }
            const copia = [...alumnos]
            copia[index1] = datosActualizar
            setAlumnos(copia)
            setFunciones('registrar')
            limpiar()
        }

    }

    const eliminar = (index) => {
        setAlumnos(alumnos.filter((_, i) => i !== index))
    }
    const editar = (datos) => {
        setFunciones('guardar')
        setMatricula(datos.matricula)
        setNombre(datos.nombre)
        setCarrera(datos.carrera)
        setImagen(datos.imagen)
        setBloqueo(true)

    }
    const limpiar = () => {
        setMatricula('')
        setNombre('')
        setCarrera('')
        setImagen(null)
        setBloqueo(false)
    }

    return (
        <>

            <form className="row g-3 needs-validation" onSubmit={sumitForms }>
                <div className="col-md-4">
                    <label for="validationCustom01" class="form-label">Matricula</label>
                    <input type="text" placeholder='matricula' onChange={hanleMatriculachangeut} value={matricula} disabled={bloqueo} required />
                </div>
                <div className="col-md-4">
                    <label for="validationCustom02" class="form-label">Nombre Completo</label>
                    <input type="text" placeholder='nombre' onChange={hanleNombrechangeut} value={nombre} required />
                </div>
                <div className="col-md-4" >
                    <select onChange={hanleCarrerachangeut} value={carrera} required>
                        <option selected>--Seleccionar carrera--</option>
                        {carreras.map((carr, index) => {
                            return <option key={index}>{carr}</option>
                        })}
                    </select>
                </div>

                <div className="col-md-4"  >
                    <label for="validationCustom02" class="form-label"> Seleccione Imagen</label>
                    <input type="file" accept='image/*' onChange={hanleImagenchangeut} ref={imagen} />
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" type='submit'>{funcion}</button>
                </div>

            </form >
            <sectio>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Matricula</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Carrera</th>
                            <th scope="col">foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumno, index) =>
                        (
                            <tr>
                                <td key={index}>{alumno.matricula}</td>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.carrera}</td>
                                <td>{alumno.foto ? <img width={100} src={URL.createObjectURL(alumno.foto)} alt='foto' /> : ''}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => editar(alumno)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => eliminar(index)}>Eliminar</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </sectio>
        </>
    )
}

export default Form