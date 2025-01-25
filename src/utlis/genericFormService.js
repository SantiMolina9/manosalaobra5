import { formConfigs } from "./formConfigs";
import { endpoints } from "./apiService";

export class GenericFormService {
    constructor(entityType, api) {
        this.entityType = entityType;
        this.api = api;
        this.config = formConfigs[entityType];
    }

    getEndpoint(id, parentId) {
        switch (this.entityType) {
            case 'user':
                return id ? endpoints.user(id) : endpoints.users;
            case 'project':
                return id ? endpoints.project(id) : endpoints.projects;
            case 'epic':
                return id ? endpoints.epic(id)
                    : parentId ? endpoints.projectEpics(parentId) 
                    : endpoints.epics;
            case 'story':
                return id ? endpoints.story(id)
                : parentId ? endpoints.epicStories(parentId) 
                : endpoints.stories;
            case 'task':
                return parentId ? endpoints.storyTasks(parentId)
                    : id ? endpoints.task(id)
                    : endpoints.tasks;
            default:
                throw new Error(`Unknown entity type: ${this.entityType}`);
        }
    }

    async handleSubmit(data, editId, parentId, callbacks = {}) {
        try {
        // Si es una creación y tenemos parentId, lo incluimos en los datos
        if (!editId && parentId) {
            switch (this.entityType) {
                case 'project':
                    data.owner = parentId;
                    break;
                case 'epic':
                    data.project = parentId;
                    break;
                case 'story':
                    data.epic = parentId;
                    break;
                case 'task':
                    data.story = parentId;
                    break;
            }
        }

        const endpoint = this.getEndpoint(editId, parentId);
        const response = editId 
            ? await this.api.put(endpoint, data)
            : await this.api.post(this.getEndpoint(), data);

        if (callbacks.onSuccess) {
            callbacks.onSuccess(response.data);
        }
        return response.data;
    } catch (error) {
        if (callbacks.onError) {
            callbacks.onError(error);
        }
        throw error;
        }
}

    async handleDelete(id, callbacks = {}) {
        try {
            const endpoint = this.getEndpoint(id);
            await this.api.delete(endpoint);
        
        if (callbacks.onSuccess) {
            callbacks.onSuccess(id);
        }
        } catch (error) {
        if (callbacks.onError) {
            callbacks.onError(error);
        }
        throw error;
        }
    }

    getDefaultValues() {
        return this.config.defaultValues;
    }

    getValidationRules() {
        return this.config.validationRules;
    }
}