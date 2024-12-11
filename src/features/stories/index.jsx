import { useParams } from "react-router-dom";
import HeaderBack from "../../components/HeaderBack";
import { Link } from "react-router-dom";
import CargandoComponent from "../../components/CargandoComponent";
import "./index.scss"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function Stories(){
    const { projectID } = useParams();
    const { epicID } = useParams();
    const [editStory, setEditStory] = useState(null);
    const [epicName, setEpicName] = useState('');
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const {
        register, 
        reset, 
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        fetch(`http://localhost:3000/epics/${epicID}/stories`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
                'auth': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            setStories(data.data) 
            setEpicName(data.epicName) 
            setIsLoading(false);
            }
        )
        .catch((error) => {
            console.error('Error fetching projects:', error)
            setIsLoading(false);
        });
    }, [epicID])
    

    const onSubmit = (data) => {
        if (editStory) {
            // Editar proyecto existente
            fetch(`http://localhost:3000/stories/${editStory._id}`, {
                method: 'PUT', // Método PUT para actualizar
                headers: {
                    'Content-Type': 'application/json',
                    auth: localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    epic: epicID,
                    started: data.start,
                    finished: data.finished,
                    status: data.status
                }),
            })
                .then((res) => res.json())
                .then((updatedStory) => {
                    setStories((prev) =>
                        prev.map((story) =>
                            story._id === updatedStory.data._id ? updatedStory.data : epic
                        )
                    );
                    setEditStory(null);
                    reset();
                    setShowForm(false);
                })
                .catch((error) => console.error('Error actualizando la historia:', error));
        } else{
        fetch(`http://localhost:3000/stories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: localStorage.getItem('token'),
            },
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                epic: epicID,
                started: data.start,
                finished: data.finished,
                status: data.status
            }),
        })
        .then((res) => res.json())
        .then((newStory) => {
            setStories((prev) => [...prev, newStory.data]);
            reset();
            setShowForm(false);
        })
        .catch((error) => {
            console.log("Error: " + error)
        })
    }
    }
    
    const handleDelete = (storyID) => {
        if (!window.confirm('Estas seguro de eliminar este proyecto?')) return;
    
        fetch(`http://localhost:3000/stories/${storyID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                auth: localStorage.getItem('token'),
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("No se pudo eliminar la historia");
            }
            return res.json();
        })
        .then(() => {
            setStories((prev) => prev.filter((story) => story._id !== storyID));
        })
        .catch((error) => console.error("Error eliminando la historia: ", error));
    }
    
    const handleEdit = (story) => {
        setEditStory(story)
        reset(
            { 
            name: story.name,
            description: story.description,
            started: story.start,
            finished: story.finished,
            status: story.status
        })
        setShowForm(true);
    }
    return(
        <>
        <HeaderBack titulo = {`Epica: ${epicName}`}/>
        <div className = "buttons-container">
            <button onClick = {() => {setShowForm(true)}} className = "crear-historia" type = "button">Agregar Historia</button>
        </div>
        {
            isLoading ?
            <CargandoComponent/>
            :
            stories.length ? stories.map((story) => 
                <li key = {story._id} className = "item-stories">
                <Link to = {`/my-projects/${projectID}/${epicID}/${story._id}`} className = "stories">
                <h2>{story.name}</h2>
                <p><strong>{story.description}</strong></p>
                <p><strong>Inicio:</strong> {story.started}</p>
                <p><strong>Termina:</strong> {story.finished}</p>
                <p><strong>Creada:</strong> {story.created}</p>
                <p><strong>Estado:</strong> {story.status}</p>
                </Link>
                <div className="button-group">
                <button className = "button-delete" type="button" onClick = {() => {handleDelete(story._id)}}>🗑️</button>
                <button id = "editar" className = "editar-proyecto" type = "button" onClick={() => handleEdit(story)}>✏️</button>
                </div>
                </li>
            )
        :
        <div className="cero-items">
            No contiene Historias
        </div>
        }
        {showForm && (
                <div className="popup-form">
                    <div className="popup-content">
                        <h2>Agregar Nueva Historia</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre de la Historia</label>
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
                            <div className="form-group">
                                <label htmlFor="start">Fecha de inicio</label>
                                <input
                                id="start"
                                {...register("start", {
                                    required: "La fecha de inicio es obligatoria"
                                })}
                                type="date"></input>
                                {errors.start && <p className="errors">{errors.start.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="finished">Fecha de fin</label>
                                <input
                                id="finished"
                                {...register("finished", {
                                    required: "La fecha de fin obligatoria"
                                })}
                                type="date"></input>
                                {errors.end && <p className="errors">{errors.end.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Estado de la Historia</label>
                                <select
                                id="status"
                                {...register("status", { required: true })}>
                                    <option value="todo">To Do</option>
                                    <option value="running">Running</option>
                                    <option value="done">Done</option>
                                </select>
                                {errors.status && <p className="errors">{errors.status.message}</p>}
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
export default Stories;