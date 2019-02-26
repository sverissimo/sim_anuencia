import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import Routes from './routes';
import Header from './app/common/header';

const store = applyMiddleware(promise, multi, thunk)(createStore);

const App = () => {
    return (
        <Provider store={store(rootReducer)}>
            <BrowserRouter>
                <div>
                    <header>
                        <Header />
                    </header>
                    <Routes />
                </div>
            </BrowserRouter>
        </Provider>
    )

};

ReactDOM.render(<App />, document.getElementById('root'))

