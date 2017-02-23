import qs from 'qs';
import path from 'path';
import Express from 'express';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import counterApp from './reducers';
import App from './containers/App';
import {renderToString} from 'react-dom/server';

const app = Express();
const port = 3000;
app.use('static', Express.static('static'))
app.use(handleRender);

function handleRender(req, res) {
    const params = qs.parse (req.query);
    const counter = parseInt (params.counter, 10) || 0;
    let preloadedState = {counter}

    const store = createStore(counterApp);
    const html = renderToString(
    <Provider store={store}>
        <App/>
    </Provider>
    );
    const finalState = store.getState();
    res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
return `
    <!doctype html>
    <html>
        <head>
            <title>Redux Universal Application</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
            </script>
            <script src="/public/bundle.js"></script>
        </bod>
    </html>
`


}

app.listen (port);