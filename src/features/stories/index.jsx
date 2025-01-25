import HeaderBack from "../../components/HeaderBack";
import Footer from '../../components/Footer'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CargandoComponent from "../../components/CargandoComponent";
import "./index.scss"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formConfigs } from "../../utlis/formConfigs";
import { GenericFormService } from '../../utlis/genericFormService';
import { api, endpoints } from '../../utlis/apiService';
import { containerVariants, itemVariants, buttonVariants } from "../../utlis/framerVariants";
import { motion } from "framer-motion";

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

    const storyService = new GenericFormService('story', api);
    
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await api.get(endpoints.epicStories(epicID));
                setStories(response.data);
                setEpicName(response.epicName);
            } catch (error) {
                console.error('Error fetching stories:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStories()
    }, [epicID, storyService])
    

    const onSubmit = (data) => {
        try{
            const response = storyService.handleSubmit(data, editStory ? editStory._id : null, epicID)
            if(editStory){
                setStories((prev) => prev.map((story) => story._id === response._id ? response : story));
                setEpicName(response.epicName);
        } else {
            setStories((prev) => [...prev, response]);
        }
        reset();
        setShowForm(false);
    } catch(error){
        console.error('Error submitting Story:', error);
    }
}
    
    const handleDelete = async (storyID) => {
        if (!window.confirm('Estas seguro de eliminar esta historia?')) return;
    
        try {
            await storyService.handleDelete(storyID);
            setStories((prev) => prev.filter((story) => story._id !== epicID));
        } catch (error) {
            console.error("Error eliminando la story: ", error);
        }
    }
    
    const handleEdit = (story) => {
        setEditStory(story)
        reset(
            { 
            name: story.name,
            description: story.description,
            started: story.start,
            finished: story.finished,
            status: story.status,
            epic: epicID
        })
        setShowForm(true);
    }
    return(
        <>
        <HeaderBack titulo = {`Epica: ${epicName}`}/>
        <div className = "add-button-container">
            <motion.button 
                onClick = {() => {setShowForm(true)}} 
                className = "add-button" 
                type = "button"
                variants = {buttonVariants}
                initial = "hidden"
                animate = "visible"
                >
                    Agregar Historia ✴️
            </motion.button>
        </div>
        <ul className = "list">
        {
            isLoading ?
            <CargandoComponent/>
            :
            stories.length > 0 ?
                <motion.div
                    variants={containerVariants}
                    initial = "hidden"
                    animate = "visible"
                >
                {
                    stories.map((story) =>
                        <motion.li
                        key = {story._id} 
                        className = "items"
                        variants = {itemVariants}
                        >
                        <Link to = {`/my-projects/${projectID}/${epicID}/${story._id}`} className = "item">
                        <h2>{story.name}</h2>
                        <p><strong>{story.description}</strong></p>
                        <p><strong>Inicio:</strong> {story.started}</p>
                        <p><strong>Termina:</strong> {story.finished}</p>
                        <p><strong>Creada:</strong> {story.created}</p>
                        <p><strong>Estado:</strong> {story.status}</p>
                        </Link>
                        <div className = "button-group">
                        <button className = "button-delete" type="button" onClick = {() => {handleDelete(story._id)}}>🗑️</button>
                        <button id = "editar" className = "button-edit" type = "button" onClick={() => handleEdit(story)}>✏️</button>
                        </div>
                        </motion.li>
                )}
            </motion.div>
        :
        <div className="cero-items-container">
            <h2 className="cero-items">
                No contiene Historias
            </h2>
        </div>
        }
        </ul>
        {showForm && (
                <div className="popup-form">
                    <div className="popup-content">
                        <h2>{editStory ? "Editar Historia" : "Agregar Historia"}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre de la Historia</label>
                                <input
                                    id="name"
                                    {...register("name", formConfigs.story.validationRules.name)}
                                />
                                {errors.name && <p className="errors">{errors.name.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    id="description"
                                    {...register("description", formConfigs.story.validationRules.description)}
                                ></textarea>
                                {errors.description && <p className="errors">{errors.description.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="started">Fecha de inicio</label>
                                <input
                                id="started"
                                {...register("started", {
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
                                {...register("status", formConfigs.story.validationRules.status)}>
                                    <option value="todo">To Do</option>
                                    <option value="running">Running</option>
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
export default Stories;