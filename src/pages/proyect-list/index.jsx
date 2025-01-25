import Header from "../../components/header";
import CargandoComponent from "../../components/CargandoComponent";
import Footer from "../../components/Footer"
import './index.scss'
import { Link } from "react-router-dom";
import { api, endpoints } from '../../utlis/apiService';
import { GenericFormService } from '../../utlis/genericFormService';
import { formConfigs } from '../../utlis/formConfigs';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion"
import { containerVariants, itemVariants, buttonVariants } from "../../utlis/framerVariants";

function ProjectList(){

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [editProject, setEditProject] = useState(null);
    const [showForm, setShowForm] = useState(false);

        const ownerId = localStorage.getItem('userID');
        
        const {
            register, 
            handleSubmit,
            formState: {errors},
            reset, 
        } = useForm({
            defaultValues: formConfigs.project.defaultValues
        });

        const projectService = new GenericFormService('project', api);

        useEffect(() => {
            const fetchProjects = async () => {
                try {
                    const response = await api.get(endpoints.projects);
                    setProjects(response.data);
                } catch (error) {
                    console.error('Error fetching projects:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProjects();
        }, []);

        const onSubmit = async (data) => {
            try {
                const response = await projectService.handleSubmit(data, editProject ? editProject._id : null, ownerId);
                if (editProject) {
                    setProjects((prev) =>
                        prev.map((project) =>
                            project._id === response._id ? response : project
                        )
                    );
                } else {
                    setProjects((prev) => [...prev, response]);
                }
                reset();
                setShowForm(false);
            } catch (error) {
                console.error('Error submitting project:', error);
            }
        };

        const handleDelete = async (projectID) => {
            if (!window.confirm('Estas seguro de eliminar este proyecto?')) return;
    
            try {
                await projectService.handleDelete(projectID);
                setProjects((prev) => prev.filter((project) => project._id !== projectID));
            } catch (error) {
                console.error("Error eliminando el proyecto: ", error);
            }
        };

        const handleEdit = (project) => {
                setEditProject(project); // Establece el proyecto a editar
                reset({ name: project.name, description: project.description }); // Llena el formulario con los datos del proyecto
                setShowForm(true); // Muestra el formulario
        };

        return(
            <>
            <Header nombre = 'PROJECT LIST'/>
            <div className = "main-content">
            <div className = "add-button-container">
                <motion.button 
                    onClick = {() => setShowForm(true)} 
                    className = "add-button" 
                    type = "button"
                    variants={buttonVariants}
                    initial = "hidden"
                    animate = "visible"
                    >Agregar Proyecto ✴️
                </motion.button>
            </div>
                <ul className = "list">
                {isLoading ? 
                    <CargandoComponent/>
                    : 
                    projects.length > 0 ? 

                <motion.div 
                    variants = {containerVariants}
                    initial = "hidden"
                    animate = "visible"
                >
                {
                    projects.map((proyecto) => (
                        <motion.li
                            key = {proyecto.id} 
                            className = "items"
                            variants = {itemVariants}
                        >
                            <Link to = {`/my-projects/${proyecto._id}`} className = "item">
                            <h2>{proyecto.name}</h2>
                            <p><strong>{proyecto.description}</strong></p>
                            </Link>
                            <div className="button-group">
                            <button className = "button-delete" type="button" onClick = {() => {handleDelete(proyecto._id)}}>🗑️</button>
                            <button className = "button-edit" type = "button" onClick={() => {handleEdit(proyecto)}}>✏️</button>
                            </div>
                        </motion.li>
                ))
                }
                </motion.div>
                :
                <div className = "cero-items-container">
                    <h2 className = "cero-items">
                        No hay proyectos
                    </h2>
                </div>
                }
                </ul>
            {showForm && (
                    <div className="popup-form">
                        <div className="popup-content">
                            <h2 className = "form-title">{editProject ? "Editar Proyecto" : "Agregar Proyecto"}</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre del Proyecto</label>
                                    <input
                                        id="name"
                                        {...register("name", formConfigs.project.validationRules.name)}
                                    />
                                    {errors.name && <p className = "errors">{errors.name.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <textarea
                                        id="description"
                                        {...register("description", formConfigs.project.validationRules.description )}
                                    ></textarea>
                                    {errors.description && <p className = "errors">{errors.description.message}</p>}
                                </div>
                                <div className="buttons">
                                    <button className = "save-button" type="submit">✔</button>
                                    <button
                                        className = "cancel-button"
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false); // Cierra el formulario
                                            reset({}); // Resetea el formulario
                                            setEditProject(null)
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
                </div>
            </>
        )
    }
    export default ProjectList;