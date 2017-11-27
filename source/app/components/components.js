import angular from 'angular';
import Report from './report/report';

let componentModule = angular.module('app.components', [
  Report
])

.name;

export default componentModule;
