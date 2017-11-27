import angular from 'angular';
import uiRouter from 'angular-ui-router';
import reportComponent from './report.component';
import ReportService from './report.service';

let reportModule = angular.module('report', [])

.service('ReportService',ReportService)
.component('report', reportComponent)

.name;

export default reportModule;
