class ApiService {
  constructor(baseURL = 'https://pweb-api-c0rq.onrender.com') {
    this.baseURL = baseURL;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('token')
    };
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, {
      method: 'GET'
    });
  }

  async post(endpoint, data) {
    console.log(data)
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

// Endpoints actualizados según tus rutas
export const endpoints = {
  // Projects
  projects: '/projects',
  project: (id) => `/projects/${id}`,
  projectEpics: (projectId) => `/projects/${projectId}/epics`,
  
  // Epics
  epics: '/epics',
  epic: (id) => `/epics/${id}`,
  epicStories: (epicId) => `/epics/${epicId}/stories`,
  
  // Stories
  stories: '/stories',
  story: (id) => `/stories/${id}`,
  storyTasks: (storyId) => `/stories/${storyId}/tasks`,
  
  // Tasks
  tasks: '/tasks',
  task: (id) => `/tasks/${id}`,
  
  //Users
  users: '/users',
  user: (id) => `/users/${id}`
};

export const api = new ApiService();