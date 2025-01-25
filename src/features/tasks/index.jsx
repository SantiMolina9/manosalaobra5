import HeaderBack from "../../components/HeaderBack";
import CargandoComponent from "../../components/CargandoComponent";
import "./index.scss"
import Footer from '../../components/Footer'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formConfigs } from "../../utlis/formConfigs";
import { GenericFormService } from '../../utlis/genericFormService';
import { api, endpoints } from '../../utlis/apiService';
import { containerVariants, itemVariants, buttonVariants } from "../../utlis/framerVariants";
import { motion } from "framer-motion"

function Tasks(){
    const { userStoryID } = useParams();
    const [storyName, setStoryName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register, 
        formState: {errors},
        reset,
        handleSubmit
    } = useForm();

    const taskService = new GenericFormService('task', api);

    useEffect(() => { 
        const fetchTasks = async () => {
            try {
                const response = await api.get(endpoints.storyTasks(userStoryID));
                setTasks(response.data);
                setStoryName(response.storyName);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTasks();
    }, [userStoryID, tasks])

    const onSubmit = (data) => {
        try{
            const response = taskService.handleSubmit(data, editTask ? editTask._id : null, userStoryID)
            if(editTask){
                setTasks((prev) => prev.map((task) => task._id === response._id ? response : task));
                setStoryName(response.storyName);
        } else {
            setTasks((prev) => [...prev, response]);
        }
        reset();
        setShowForm(false);
    } catch(error){
        console.error('Error submitting Task:', error);
    }
    }

    const handleEdit = (task) => {
        setEditTask(task);
        reset({
            title: task.title,
            description: task.description,
            start: task.start,
            end: task.end,
            status: task.status,
        });
        setShowForm(true);
    }

    const handleDelete = async (taskID) => {
        if (!window.confirm('Estas seguro de eliminar esta tarea?')) return;
        try {
            await taskService.handleDelete(taskID);
            setEpics((prev) => prev.filter((task) => task._id !== userStoryID));
        } catch (error) {
            console.error("Error eliminando la epica: ", error);
        }
    }
    
    return (
        <>
        <HeaderBack titulo = {`Historia de Usuario: ${storyName}`}/>
        <div className = "add-button-container">
            <motion.button 
                className = "add-button" 
                type = "button" 
                onClick={() => setShowForm(true)}
                variants = {buttonVariants}
                initial = "hidden"
                animate = "visible"
                >Agregar Tarea ✴️
            </motion.button>
        </div>
        <ul className = "list">
        {
        isLoading ?
            <CargandoComponent/>
        :
        tasks.length > 0 ?
            <motion.div
                variants={containerVariants}
                initial = "hidden"
                animate = "visible"
            >
            {
            tasks.map((tarea) => 
                <motion.li 
                    key = {tarea._id} 
                    className = "item-tasks"
                    variants={itemVariants}
                >
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
                        <button id = "editar" className = "button-edit" type = "button" onClick={() => handleEdit(tarea)}>✏️</button>
                    </div>
                </motion.li>
            )}
            </motion.div>
            :
            <div className="cero-items-container">
                <h2 className="cero-items">
                    No contiene Tareas
                </h2>
            </div>
        }
        </ul>
        {showForm && (
            <div className="popup-form">
            <div className="popup-content">
                <h2>{editTask ? "Editar Tarea" : "Agregar Tarea"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="title">Titulo de la Tarea</label>
                        <input
                            id="title"
                            {...register("title", formConfigs.task.validationRules.title)}
                        />
                        {errors.title && <p className="errors">{errors.title.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            {...register("description", formConfigs.task.validationRules.description)}
                        ></textarea>
                        {errors.description && <p className="errors">{errors.description.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">Fecha de inicio</label>
                        <input
                        id="start"
                        {...register("start", formConfigs.task.validationRules.start)}
                        type="date"></input>
                        {errors.start && <p className="errors">{errors.start.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="end">Fecha de fin</label>
                        <input
                        id="end"
                        {...register("end", formConfigs.task.validationRules.end)}
                        type="date"></input>
                        {errors.end && <p className="errors">{errors.end.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Estado de la Tarea</label>
                        <select
                        id="status"
                        {...register("status", formConfigs.task.validationRules.status)}>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        {errors.status && <p className="errors">{errors.status.message}</p>}
                    </div>
                    <div className="buttons">
                        <button className = "save-button" type="submit">✔</button>
                        <button
                            className = "cancel-button"
                            type="button"
                            onClick={() => {
                                setShowForm(false); // Cierra el popup
                                reset(); // Resetea el formulario
                            }}
                        >
                            ✘
                        </button>
                    </div>
                </form>
            </div>
        </div>
        )}
        <Footer />
        </>
    )
}

export default Tasks;