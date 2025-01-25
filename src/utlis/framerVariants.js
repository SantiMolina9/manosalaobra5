export const containerVariants = {
        hidden: { opacity: 0 }, // Estado inicial de los elementos
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Cascada progresiva
            },
        },
    };
    
export const itemVariants = {
        hidden: { opacity: 0, y: 20 }, // Elemento está oculto y desplazado hacia abajo
        visible: { opacity: 1, y: 0 }, // Elemento visible y en su posición final
    };

export const buttonVariants = {
            hidden: { opacity: 0, x: -100 }, // El botón aparece desde la izquierda
            visible: { 
                opacity: 1, 
                x: 0, 
                transition: { type: "spring", stiffness: 50 } // Animación fluida
            },
    }; 

export const headerVariants = {
        hidden: {
            opacity: 0,
            y: -50, // Posición inicial por encima de la pantalla
        },
        visible: {
            opacity: 1,
            y: 0, // Posición final en su lugar original
            transition: {
                duration: 1.1, // Duración de la animación
                ease: "easeOut", // Transición suave
            },
        },
    };

export const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 }, // Imagen inicial más pequeña y opaca
        visible: {
            opacity: 1,
            scale: 1, // Imagen en tamaño real
            transition: {
                duration: 1.5, // Duración más larga
                ease: "easeInOut", // Efecto de entrada y salida suave
            },
        },
    };

export const h1Variants = {
    hidden: {
        opacity: 0,
        y: -50, // Posición inicial por encima de la pantalla
    },
    visible: {
        opacity: 1,
        y: 0, // Posición final en su lugar original
        transition: {
            duration: 1.2, // Más duración para el h1
            ease: "easeOut", // Transición suave
        },
    },
};

export const itemFormVariants = {
    hidden: { 
        opacity: 0, 
        y: 20 // Desplazado hacia abajo
    },
    visible: { 
        opacity: 1, 
        y: 0, // Posición original
        transition: {
            duration: 0.5, 
        },
    },
};

export const formVariants = {
    hidden: { 
        opacity: 0, 
        x: 100 // Desplazado hacia la derecha
    },
    visible: { 
        opacity: 1, 
        x: 0, // Posición original
        transition: {
            duration: 0.7, 
            ease: 'easeOut',
            when: 'beforeChildren', // Espera antes de animar los hijos
            staggerChildren: 0.3, // Animación en cascada de los hijos
        },
    },
};