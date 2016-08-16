import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import ModalComponent from './modal.component';
componentsModule.component('modal', ModalComponent);

export default componentsModule;
