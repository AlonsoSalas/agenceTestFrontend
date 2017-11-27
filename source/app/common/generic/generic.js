import angular from 'angular';
import ApiService from './api.service';


let genericModule = angular.module('generic', [])

.service('ApiService', ApiService )
// .constant('ServiceBaseUrl', 'http://127.0.0.1:8000/api' )
.constant('ServiceBaseUrl', 'https://agence-test-alonso.herokuapp.com/api' )

.name;

export default genericModule;
