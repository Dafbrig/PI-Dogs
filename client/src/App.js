import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DogDetail from './components/DogDetail/DogDetail';
import DogCreation from './components/DogCreation/DogCreation';
import About from './components/About/About';
import styles from "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.Guille}>
        {/* Ruta para la página de inicio */}
        <Route exact path='/' component={LandingPage} />
        
        {/* Ruta para la página principal */}
        <Route path='/home' component={Home} />
        
        {/* Ruta para la página de detalles de perro */}
        <Route path='/dogs/:id' component={DogDetail}/>
        
        {/* Ruta para la página de creación de perros */}
        <Route path='/newDog/' component={DogCreation}/>
        
        {/* Ruta para la página "Acerca de" */}
        <Route path='/about' component={About}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
