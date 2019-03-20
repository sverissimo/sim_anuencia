import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import Messages from './app/common/messages'
import App from './authOrApp'

const store = applyMiddleware(promise, multi, thunk)(createStore);


const Application = () => {

    return (
        <Provider store={store(rootReducer)}>
            <App />
            <Messages />
        </Provider>
    )
};

ReactDOM.render(<Application />, document.getElementById('root'))

