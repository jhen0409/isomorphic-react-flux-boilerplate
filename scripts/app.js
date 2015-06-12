'use strict';
import Fluxible from 'fluxible';
import App from './components/Routes.jsx';
import ApplicationStore from './stores/ApplicationStore';

const app = new Fluxible({
  component: App,
  stores: [ApplicationStore]
});

export default app;