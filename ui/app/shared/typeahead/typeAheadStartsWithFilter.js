"use strict"
var app = angular.module('myApp');
 app.filter('typeAheadStartsWithFilter', function() {
  return function(input, toMatch) {
      
      var matched = [];
      for(var x = 0; x < input.length; x++)
      {
          if(!input[x].name)
          {
              input[x] = {name : input[x] + ""};
          }
          if(input[x].name.toLowerCase().indexOf(toMatch.toLowerCase()) === 0)
          {
             matched.push(input[x]); 
          }
      
      };
      
      return matched;
  };
});
