import React from 'react'
import  { useState } from 'react'

const Productos = () => {

    const carreras = ['De la rosa', 'Gamesa', 'Nestle', "Sabritas",
        'Vero']

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
            datosActualizar.imagen = imagen

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
        <div>Productos


            <>

                <form className="row g-3 needs-validation" onSubmit={sumitForms}>
                    <div className="col-md-4">
                        <label for="validationCustom01" class="form-label">ID</label>
                        <input type="text" placeholder='Id' onChange={hanleMatriculachangeut} value={matricula} disabled={bloqueo} required />
                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom02" class="form-label">Nombre Producto</label>
                        <input type="text" placeholder='Nombre Producto' onChange={hanleNombrechangeut} value={nombre} required />
                    </div>
                    <div className="col-md-4" >
                        <select onChange={hanleCarrerachangeut} value={carrera} required>
                            <option selected>--Seleccionar Marca--</option>
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
                                <th scope="col">Id</th>
                                <th scope="col">Nombre Producto</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Imagen del Producto</th>
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
        </div>


    )
}

export default Productos