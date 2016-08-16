import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import ConfigService from './config.service';
servicesModule.service('ConfigService', ConfigService);

import RestService from './rest.service';
servicesModule.service('RestService', RestService);

import RouterService from './router.service';
servicesModule.service('RouterService', RouterService);

export default servicesModule;
