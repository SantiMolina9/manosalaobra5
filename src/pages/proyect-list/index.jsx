import Header from "../../components/header";
import CargandoComponent from "../../components/CargandoComponent";
import './index.scss'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function ProjectList(){

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [editProject, setEditProject] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const {
        register, 
        handleSubmit,
        formState: {errors},
        reset, 
    } = useForm();

    useEffect(() => {
        fetch('http://localhost:3000/projects',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': localStorage.getItem('token')
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                setProjects(data.data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching projects:', error)
                setIsLoading(false);
            });
    }, [])

    const onSubmit = (data) => {
        if (editProject) {
            // Editar proyecto existente
            fetch(`http://localhost:3000/projects/${editProject._id}`, {
                method: 'PUT', // Método PUT para actualizar
                headers: {
                    'Content-Type': 'application/json',
                    auth: localStorage.getItem('token'),
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((updatedProject) => {
                    setProjects((prev) =>
                        prev.map((project) =>
                            project._id === updatedProject.data._id ? updatedProject.data : project
                        )
                    );
                    setEditProject(null);
                    reset();
                    setShowForm(false);
                })
                .catch((error) => console.error('Error actualizando el proyecto:', error));
        } else {
            fetch(`http://localhost:3000/projects/`, {
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((newProject) => {
                setProjects((prev) => [...prev, newProject.data]);
                reset();
                setShowForm(false);
            })
        }
    }

    const handleDelete = (projectID) => {
        if (!window.confirm('Estas seguro de eliminar este proyecto?')) return;
    
        fetch(`http://localhost:3000/projects/${projectID}`, {
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
            setProjects((prev) => prev.filter((project) => project._id !== projectID));
        })
        .catch((error) => console.error("Error eliminando el proyecto: ", error));
    };

    const handleEdit = (project) => {
        setEditProject(project); // Establece el proyecto a editar
        reset({ name: project.name, description: project.description }); // Llena el formulario con los datos del proyecto
        setShowForm(true); // Muestra el formulario
    };

    return(
        <>
        <Header nombre = 'PROJECT LIST'/>
        <div className = "buttons-container">
            <button onClick = {() => setShowForm(true)}className = "crear-proyecto" type = "button">Agregar Proyecto</button>
        </div>
        <div>
            <ul className = "lista-proyectos">
            {isLoading ? 
                <CargandoComponent/>
                : 
                projects.length > 0 ? projects.map((proyecto) => (
                <li key = {proyecto.id} className = "item-proyecto">
                    <Link to = {`/my-projects/${proyecto._id}`} className = "proyecto">
                    <h2>{proyecto.name}</h2>
                    <p><strong>{proyecto.description}</strong></p>
                    </Link>
                    <div className="button-group">
                    <button className = "button-delete" type="button" onClick = {() => {handleDelete(proyecto._id)}}>🗑️</button>
                    <button id = "editar" className = "editar-proyecto" type = "button" onClick={() => {handleEdit(proyecto)}}>✏️</button>
                    </div>
                </li>
            ))
            :
            <h2 className = "cero-items">
                No hay proyectos
            </h2>
            }
            </ul>
        </div>
        {showForm && (
                <div className="popup-form">
                    <div className="popup-content">
                        <h2>Agregar Proyecto</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre del Proyecto</label>
                                <input
                                    id="name"
                                    {...register("name", { required: "El nombre es obligatorio" })}
                                />
                                {errors.name && <p className = "errors">{errors.name.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    id="description"
                                    {...register("description", {
                                        required: "La descripción es obligatoria",
                                    })}
                                ></textarea>
                                {errors.description && <p className = "errors">{errors.description.message}</p>}
                            </div>
                            <div className="buttons">
                                <button type="submit">Guardar</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false); // Cierra el formulario
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
export default ProjectList;