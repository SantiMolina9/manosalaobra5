import Header from "../../components/header";
import CargandoComponent from "../../components/CargandoComponent";
import Footer from "../../components/Footer"
import './index.scss';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

function StoriesList() {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://pweb-api-c0rq.onrender.com/stories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            setStories(data.data);
            setIsLoading(false);
        });
    }, []);

    // Variantes de animación
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Retraso entre las animaciones de los hijos
            },
        },
    };

    return (
        <>
            <Header nombre="STORIES LIST" />
            <div className="main-content">
                <div className="lista-stories">
                    {isLoading ? (
                        <CargandoComponent />
                    ) : stories.length > 0 ? (
                        // Usar motion.ul para animar la lista
                        <motion.ul
                            className="lista-stories"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {stories.map((story) => (
                                <motion.li
                                    key={story._id}
                                    className="item-stories"
                                    variants={itemVariants}
                                >
                                    <h2>{story.name}</h2>
                                    <p>{story.description}</p>
                                </motion.li>
                            ))}
                        </motion.ul>
                    ) : (
                        <div className="cero-items-container">
                            <h2 className="cero-items">
                                No contiene Historias
                            </h2>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default StoriesList;

