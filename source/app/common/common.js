import angular from 'angular';
import Generic from './generic/generic';
import Footer from './footer/footer';
import BlueNavbar from './bluebar/bluebar';

let commonModule = angular.module('app.common', [
    Generic,
    Footer,
    BlueNavbar,
])

.name;

export default commonModule;
