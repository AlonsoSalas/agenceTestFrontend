// import 'jquery';
import angular from 'angular';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import './vendor';
import 'normalize.css';

angular.module('test', [
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'mwl.calendar',
    'chart.js',
    Common,
    Components
]).component('app', AppComponent);

// require('./app.run')
require('./app.config')
require('./app.routes')
require('./app.run')
