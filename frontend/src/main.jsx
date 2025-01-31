import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ProjectsScreen from './screens/ProjectsScreen.jsx';
import CreateProjectScreen from './screens/CreateProjectsScreen.jsx';
import TeamsScreen from './screens/TeamsScreen.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            {/* Private Routes */}
            <Route path='' element={<PrivateRoute />}>
                <Route index={true} path='/' element={<HomeScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/projects' element={<ProjectsScreen />} />
                <Route path='/projects/create' element={<CreateProjectScreen />} />
                <Route path='/teams' element={<TeamsScreen />} />
            </Route>
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    </Provider>
)
