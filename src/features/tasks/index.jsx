import { useParams } from "react-router-dom";
import HeaderBack from "../../components/HeaderBack";
import CargandoComponent from "../../components/CargandoComponent";
import { useEffect, useState } from "react";
import "./index.scss"
import { useForm } from "react-hook-form";

function Tasks(){
    const { userStoryID } = useParams();
    const [storyName, setStoryName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register, 
        formState: {errors},
        reset,
        handleSubmit
    } = useForm();

    useEffect(() => { 
        fetch(`http://localhost:3000/stories/${userStoryID}/tasks`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(
                data =>{
                    setTasks(data.data)
                    setStoryName(data.storyName)
                    setIsLoading(false);
                } 
            )
    }, [userStoryID])

    const onSubmit = (data) => {
        fetch(`http://localhost:3000/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: localStorage.getItem('token'),
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                story: userStoryID,
                started: data.start,
                end: data.end,
                status: data.status
            }),
        })
        .then((res) => res.json())
        .then((newTask) => {
            setTasks((prev) => [...prev, newTask.data]);
            reset();
            setShowForm(false);
        })
        .catch((error) => {
            console.log("Error: " + error)
        })
    }

    const handleDelete = (taskID) => {
        if (!window.confirm('Estas seguro de eliminar este proyecto?')) return;
    
        fetch(`http://localhost:3000/tasks/${taskID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                auth: localStorage.getItem('token'),
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("No se pudo eliminar la tarea");
            }
            return res.json();
        })
        .then(() => {
            setTasks((prev) => prev.filter((task) => task._id !== taskID));
        })
        .catch((error) => console.error("Error eliminando la tarea: ", error));
    }
    return (
        <>
        <HeaderBack titulo = {`Historia de Usuario: ${storyName}`}/>
        <div className = "buttons-container">
            <button className = "crear-tarea" type = "button" onClick={() => setShowForm(true)}>Agregar Tarea</button>
        </div>
        {
        isLoading ?
            <CargandoComponent/>
        :
        tasks.length ?
            tasks.map((tarea) => 
                <li key = {tarea._id} className = "item-tasks">
                    <input
                    type = "checkbox"
                    className = "checkbox-tarea"
                    />
                <div className = "content">
                    <h2>{tarea.title}</h2>
                    <p>{tarea.description}</p>
                    <p><strong>Estado: </strong>{tarea.status}</p>
                    <p><strong>Empieza: </strong>{tarea.start}</p>
                    <p><strong>Termina: </strong>{tarea.end}</p>
                </div>
                <div className="button-group">
                    <button className = "button-delete" type="button" onClick = {() => {handleDelete(tarea._id)} }>🗑️</button>
                    <button id = "editar" className = "editar-proyecto" type = "button">✏️</button>
                </div>
                </li>
            )
            :
            <div className="cero-items">
                No contiene Tareas
            </div>
        }
        {showForm && (
            <div className="popup-form">
            <div className="popup-content">
                <h2>Agregar Nueva Tarea</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="title">Titulo de la Tarea</label>
                        <input
                            id="title"
                            {...register("title", { required: "Titulo es obligatorio" })}
                        />
                        {errors.title && <p className="errors">{errors.title.message}</p>}
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
                        <label htmlFor="end">Fecha de fin</label>
                        <input
                        id="end"
                        {...register("end", {
                            required: "La fecha de fin es obligatoria"
                        })}
                        type="date"></input>
                        {errors.end && <p className="errors">{errors.end.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Estado de la Tarea</label>
                        <select
                        id="status"
                        {...register("status", { required: true })}>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
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
export default Tasks;