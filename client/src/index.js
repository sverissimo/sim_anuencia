import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import Messages from './app/common/messages'
import AuthOrApp from './authOrApp'

const store = applyMiddleware(promise, multi, thunk)(createStore);


const App = () => {

    return (
        <Provider store={store(rootReducer)}>
            <AuthOrApp />
            <Messages />
        </Provider>
    )
};

ReactDOM.render(<App />, document.getElementById('root'))

