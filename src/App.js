import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import FinalStep from './components/FinalStep';

function App() {
    return (
        <BrowserRouter>
            <div className='container'>
                <Header />
                <Switch>
                    <Route component={FirstStep} path='/' exact />
                    <Route component={SecondStep} path='/second' />
                    <Route component={FinalStep} path='/final' />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

//https://www.freecodecamp.org/news/build-a-multi-step-registration-app-with-animated-transitions-using-mern-stack/
