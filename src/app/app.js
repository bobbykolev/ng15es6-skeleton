import angular from 'angular';

import appConfig  from './config/app.config';
import appRun     from './config/app.run';

import 'angular-ui-router';
import 'angular-animate';
import 'angular-sanitize';

import './config/app.templates';

import './view-models/layout';
import './view-models/components';
import './view-models/pages/home';
import './view-models/pages/article';
import './view-models/pages/about';
import './services';

const requires = [
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'templates',
  'app.layout',
  'app.components',
  'app.home',
  'app.article',
  'app.about',
  'app.services'
];

window.app = angular.module('app', requires);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app'], {
      strictDi: true
    });

    FastClick.attach(document.body);
});
