import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './app.css';
import { Routes } from './routes';
import { create } from './store';


async function boot() {
    const element = document.getElementById('mount-here');
    const store = create();

    const app = <Provider store={store}>
        <Routes />
    </Provider>;

    ReactDOM.render(app, element);
}

boot();