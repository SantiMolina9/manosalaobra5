export const formConfigs = {
    project: {
        defaultValues: {
            name: '',
            description: ''
        },
        validationRules: {
            name: { 
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" }
            },
            description: { 
                required: "La descripción es obligatoria",
                minLength: { value: 10, message: "La descripción debe tener al menos 10 caracteres" }
            }
        }
    },
    epic: {
        defaultValues: {
            name: '',
            description: '',
            projectId: ''
        },
        validationRules: {
            name: { 
                required: "El nombre de la épica es obligatorio",
                minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" }
            },
            description: { 
                required: "La descripción es obligatoria"
            }
        }
    },
    story: {
        defaultValues: {
            name: '',
            description: '',
            epicId: '',
            created: new Date().toISOString(), 
            started: new Date().toISOString(),
            finished: new Date().toISOString(),
            status: 'pending',
        },
        validationRules: {
            name: { 
                required: "El nombre de la historia es obligatorio" 
            },
            description: { 
                required: "La descripción es obligatoria" 
            },
            status: {
                required: "El estado es obligatorio",
                validate: (value) => 
                    ['todo', 'running', 'done'].includes(value) || 
                    "Estado no válido"
            }
        }
    },
    task: {
        defaultValues: {
            title: '',
            description: '',
            storyId: '',
            status: 'pending',
            start: new Date().toISOString(), 
            end: new Date().toISOString()
        },
        validationRules: {
            title: {
                required: "El título de la tarea es obligatorio" 
            },
            description: { 
                required: "La descripción es obligatoria" 
            },
            status: { 
                required: "El estado es obligatorio",
                validate: (value) => 
                    ['pending', 'in_progress', 'completed'].includes(value) || 
                    "Estado no válido"
            }
        }
    }
};
