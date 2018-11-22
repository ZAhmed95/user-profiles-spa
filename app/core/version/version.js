'use strict';

angular.module('userProfilesSPA.version', [
  'userProfilesSPA.version.interpolate-filter',
  'userProfilesSPA.version.version-directive'
])

.value('version', '0.1');
