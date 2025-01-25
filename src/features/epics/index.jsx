import HeaderBack from "../../components/HeaderBack";
import Footer from '../../components/Footer'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CargandoComponent from "../../components/CargandoComponent";
import './index.scss'
import { useEffect, useState } from "react";
import { formConfigs } from "../../utlis/formConfigs";
import { GenericFormService } from '../../utlis/genericFormService';
import { api, endpoints } from '../../utlis/apiService';
import { containerVariants, itemVariants, buttonVariants } from "../../utlis/framerVariants";
import { motion } from "framer-motion"

function Epics(){
    const { projectID } = useParams();
    const [projectName, setProjectName] = useState(''); 
    const [editEpic, setEditEpic] = useState(null);
    const [epics, setEpics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const {
        register, handleSubmit, reset, formState:{errors}
    } = useForm({
        defaultValues: formConfigs.epic.defaultValues
    });

    const epicService = new GenericFormService('epic', api);

    useEffect(() => {
        const fetchEpics = async () => {
            try {
                const response = await api.get(endpoints.projectEpics(projectID));
                setEpics(response.data);
                setProjectName(response.projectName);
            } catch (error) {
                console.error('Error fetching epics:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchEpics();
    }, [projectID, epicService])

    const onSubmit = (data) => {
        try{
            const response = epicService.handleSubmit(data, editEpic ? editEpic._id : null, projectID)
            if(editEpic){
                setEpics((prev) => prev.map((epic) => epic._id === response._id ? response : epic));
        }else{
            setEpics((prev) => [...prev, response]);
        }
        reset();
        setShowForm(false);
    } catch (error) {
        console.error('Error submitting project:', error);
    }
    }

    const handleDelete = async (epicID) => {
        if (!window.confirm('Estas seguro de eliminar esta epica?')) return;
    
        try {
            await epicService.handleDelete(epicID);
            setEpics((prev) => prev.filter((epic) => epic._id !== epicID));
        } catch (error) {
            console.error("Error eliminando la epica: ", error);
        }
    }

    const handleEdit = (epic) => {
        setEditEpic(epic); // Establece el proyecto a editar
        reset({ name: epic.name, description: epic.description }); // Llena el formulario con los datos del proyecto
        setShowForm(true); // Muestra el formulario
    }
    return (
        <>
        <HeaderBack titulo = {`Proyecto: ${projectName}`}/>
        <div className = "add-button-container">
            <motion.button 
                className = "add-button" 
                type = "button" 
                onClick = {() => setShowForm(true)}
                variants = {buttonVariants}
                initial = "hidden"
                animate = "visible"
                >Agregar Epica ✴️
            </motion.button>
        </div>
        <ul className = "list">
        {
            isLoading ?
            <CargandoComponent/>
            :
            epics.length > 0 ?
                <motion.div
                    variants = {containerVariants}
                    initial = "hidden"
                    animate = "visible"
                >
                {
                    epics.map((epica) => 
                    <motion.li
                        key = {epica._id} 
                        className = "items"
                        variants = {itemVariants}
                    >
                    <Link key = {epica._id} to = {`/my-projects/${projectID}/${epica._id}`} className = "item">
                    <h2>{epica.name}</h2>
                    <p><strong>{epica.description}</strong></p>
                    </Link>
                    <div className="button-group">
                        <button className = "button-delete" type="button" onClick = {() => {handleDelete(epica._id)} }>🗑️</button>
                        <button className = "button-edit" type = "button" onClick={() => {handleEdit(epica)}}>✏️</button>
                    </div>
                    </motion.li>
                )}
            </motion.div>
            :
            <div className="cero-items-container">
                <h2 className = "cero-items">
                    No contiene epicas
                </h2>
            </div>
        }
        </ul>
        {showForm && (
                <div className="popup-form">
                    <div className="popup-content">
                        <h2>{editEpic ? "Editar Epica" : "Agregar Epica"}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre de la Épica</label>
                                <input
                                    id="name"
                                    {...register("name", formConfigs.epic.validationRules.name)}
                                />
                                {errors.name && <p className="errors">{errors.name.message}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    id="description"
                                    {...register("description", formConfigs.epic.validationRules.description)}
                                ></textarea>
                                {errors.description && <p className="errors">{errors.description.message}</p>}
                            </div>
                            <div className="buttons">
                                <button className = "save-button" type="submit">✔</button>
                                <button
                                    className = "cancel-button"
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false); // Cierra el popup
                                        reset(); // Resetea el formulario
                                        setEditEpic(null); // Resetea el proyecto a editar
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
export default Epics;
