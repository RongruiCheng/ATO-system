import React from 'react';
import dva from 'dva';
import tabelModel from './model/tableModel.js';
import detailModel from './model/detailModel.js';
import registerModel from './model/registerModel.js';
import route from './route.js';

const app = dva();
app.model(tabelModel);
app.model(detailModel);
app.model(registerModel);

app.router(route);

app.start('#app');