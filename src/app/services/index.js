import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import ConfigService from './config.service';
servicesModule.service('ConfigService', ConfigService);

export default servicesModule;
