import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//COMPONENTS
import Routes from './routes';
import Header from './components/header';
import SubHeader from './components/subheader';

const App = () => {

    return (
        <div>

            <div >

                <BrowserRouter>
                    <div>
                        <header>
                            <Header />
                        </header>
                        
                            <Routes />
                        
                    </div>
                </BrowserRouter>

            </div>
        </div>
    )

};

ReactDOM.render(<App />, document.getElementById('root'))

