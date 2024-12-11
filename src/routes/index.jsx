import ProjectList from '../pages/proyect-list/index.jsx'
import Epics from '../features/epics/index.jsx'
import Settings from '../pages/settings/index.jsx'
import Home from '../pages/home/index.jsx'
import Login from '../pages/login/index.jsx'
import StoriesList from '../pages/stories-list/index.jsx'
import Stories from '../features/stories/index.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Tasks from '../features/tasks/index.jsx'
import ErrorNotFound from '../features/Error/error.jsx'
import ProtectedRoute from '../features/ProtectedRoute/index.jsx'

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
        errorElement: <ErrorNotFound/>
    },      
    {
        path: "/home",
        element: (
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>
        )
    },  
    {
        path: "/my-projects",
        element: (
            <ProtectedRoute>
                <ProjectList />
            </ProtectedRoute>
        ),
        errorElement: <ErrorNotFound />
        //Esto debe devolver un listado de todos los proyectos
    },
    {
        path: "my-projects/:projectID",
        element: (
            <ProtectedRoute>
                <Epics />
            </ProtectedRoute>
        ),
        errorElement: <ErrorNotFound />
        //Esto deberia devolver un listado de epicas de ese proyecto en particular
    }, 
    {
        path: "my-projects/:projectID/:epicID",
        element: (
            <ProtectedRoute>
                <Stories />
            </ProtectedRoute>
        ),
        errorElement: <ErrorNotFound />
        //Esto deberia devolver un listado de historias de esa epica en particular 
    },
    {
        path: "my-projects/:projectID/:epicID/:userStoryID",
        element: (
            <ProtectedRoute>
                <Tasks />
            </ProtectedRoute>
        ),
        errorElement: <ErrorNotFound />     
    },
    {
        path: "/my-stories",
        element: (
        <ProtectedRoute>
            <StoriesList />
        </ProtectedRoute>
        ),
        errorElement: <ErrorNotFound />
        //Esto deberia devolver todas las historias de todos los proyectos
    },
    {
        path: "/settings",
        element: (
            <ProtectedRoute>
                <Settings />
            </ProtectedRoute>
        ),
        errorElement: <ErrorNotFound />
        //Esto debe devolver un apartado de Configuracion
    },
    {
        path: "*", // Ruta comodín para manejar 404 en cualquier ruta no válida
        element: <ErrorNotFound />
    }
    ])
