import HeaderBack from "../../components/HeaderBack";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CargandoComponent from "../../components/CargandoComponent";
import './index.scss'
import { useEffect, useState } from "react";

function Epics(){
    const { projectID } = useParams();
    const [projectName, setProjectName] = useState(''); 
    const [editEpic, setEditEpic] = useState(null);
    const [epics, setEpics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const {
        register, handleSubmit, reset, formState:{errors}
    } = useForm();


    useEffect(() => {
        fetch(`http://localhost:3000/projects/${projectID}/epics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            setEpics(data.data) 
            setProjectName(data.projectName)
            setIsLoading(false);
        })
    }, [projectID])

    const onSubmit = (data) => {
        if (editEpic) {
            // Editar proyecto existente
            fetch(`http://localhost:3000/epics/${editEpic._id}`, {
                method: 'PUT', // Método PUT para actualizar
                headers: {
                    'Content-Type': 'application/json',
                    auth: localStorage.getItem('token'),
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((updatedEpic) => {
                    setEpics((prev) =>
                        prev.map((epic) =>
                            epic._id === updatedEpic.data._id ? updatedEpic.data : epic
                        )
                    );
                    setEditEpic(null);
                    reset();
                    setShowForm(false);
                })
                .catch((error) => console.error('Error actualizando la epica:', error));
        } else{
            fetch(`http://localhost:3000/epics`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    project: projectID,
                }),
            })
            .then((res) => res.json())
            .then((newEpic) => {
                setEpics((prev) => [...prev, newEpic.data]);
                reset();
                setShowForm(false);
            })
            .catch((error) => {
                console.log("Datos enviados:", { ...data, project: projectID });
                console.log("Error: " + error)
            })
        }
    }

    const handleDelete = (epicID) => {
        if (!window.confirm('Estas seguro de eliminar este proyecto?')) return;
    
        fetch(`http://localhost:3000/epics/${epicID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                auth: localStorage.getItem('token'),
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("No se pudo eliminar el proyecto");
            }
            return res.json();
        })
        .then(() => {
            setEpics((prev) => prev.filter((epic) => epic._id !== epicID));
        })
        .catch((error) => console.error("Error eliminando la epica: ", error));
    }

    const handleEdit = (epic) => {
        setEditEpic(epic); // Establece el proyecto a editar
        reset({ name: epic.name, description: epic.description }); // Llena el formulario con los datos del proyecto
        setShowForm(true); // Muestra el formulario
    }
    return (
        <>
        <HeaderBack titulo = {`Proyecto: ${projectName}`}/>
        <div className = "buttons-container">
            <button className = "crear-epica" type = "button" onClick = {() => setShowForm(true)} >Agregar Epica</button>
        </div>
        {
            isLoading ?
            <CargandoComponent/>
            :
            epics.length ?  
                epics.map((epica) => 
                <li key = {epica._id} className = "item-epicas">
                <Link key = {epica._id} to = {`/my-projects/${projectID}/${epica._id}`} className = "epica">
                <h2>{epica.name}</h2>
                <p><strong>{epica.description}</strong></p>
                </Link>
                <div className="button-group">
                    <button className = "button-delete" type="button" onClick = {() => {handleDelete(epica._id)} }>🗑️</button>
                    <button id = "editar" className = "editar-proyecto" type = "button" onClick={() => {handleEdit(epica)}}>✏️</button>
                </div>
                </li>
            )
            :
            <div className="cero-items">
                No contiene epicas
            </div>
        }
        {showForm && (
                <div className="popup-form">
                    <div className="popup-content">
                        <h2>Agregar Nueva Épica</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre de la Épica</label>
                                <input
                                    id="name"
                                    {...register("name", { required: "Nombre es obligatorio" })}
                                />
                                {errors.name && <p className="errors">{errors.name.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    id="description"
                                    {...register("description", {
                                        required: "Descripción es obligatoria",
                                    })}
                                ></textarea>
                                {errors.description && <p className="errors">{errors.description.message}</p>}
                            </div>
                            <div className="buttons">
                                <button type="submit">Guardar</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false); // Cierra el popup
                                        reset(); // Resetea el formulario
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
export default Epics;
