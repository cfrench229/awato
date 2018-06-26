var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/form", {
        templateUrl : "form.html"
    })
    .when("/table", {
        templateUrl : "table.html"
    })
    .otherwise({redirectTo:'/'});
});

/*Controller that deals with adding data to the database*/
app.controller('addCtrl', function($scope, $http) {
	/*Function is called when a user clicks the submit button*/
	$scope.myFunc = function () {
	if (confirm('Are you sure you want to save this this breed into the database?')) {
    var jsondata = {breed: $scope.breed,description: $scope.description,size: $scope.size,
   					lifespan: $scope.lifespanStart+"-"+$scope.lifespanEnd+" Years"};
    	$http({
    		async: true,
    		crossDomain: true,
    		url: "https://awatoproject-1698.restdb.io/rest/dogs",
   			method: "POST",
    		headers: {
    			"content-type": "application/json",
    			"x-apikey": "5b294cd346624c7b24444fbd",
    			"cache-control": "no-cache"
  				  },
  			processData: false,
  			data: JSON.stringify(jsondata)
			})
       		.then(function mySuccess(response) {
       			window.location.reload();
    		}, function myError(response) {  
		});
			
	} else {
    //do nothing and go back to index page, or stay on add page ill think about it
	}
	window.location.href = "/index.html#!/table";	
   	} 	
});
//for some reason it works
app.controller('tableCtrl', function($scope) {
$scope.arr = [];
$scope.mySwitch = true;
$scope.checkNum = function(lifespanStart) {
	$scope.mySwitch=false;
	$scope.arr=[];
	for(var i = ++lifespanStart; i <= 20; i++) {
		$scope.arr.push(i);
	}
}

$scope.search = function() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dogs");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
};

$scope.breedName = null;
$scope.breedSize = null;
$scope.breedLife = null;
$scope.breedDescript = null;
$scope.select = function(index) {
		var tabl = document.getElementById('dogs');
		$scope.breedName =  String(tabl.rows[index+1].cells[2].innerHTML);
		$scope.breedSize =  String(tabl.rows[index+1].cells[3].innerHTML);
		$scope.breedLife =  String(tabl.rows[index+1].cells[4].innerHTML);
		$scope.breedDescript =  String(tabl.rows[index+1].cells[5].innerHTML);    	
		};

});

//GET IS FUNCTIONAL
app.controller('getCtrl', function($scope, $http){
//call add in a function on page load
     $http({
        async: true,
        crossDomain: true,
        url: "https://awatoproject-1698.restdb.io/rest/dogs",
        method: "GET",
        headers: {
            "content-type": "application/json",
            "x-apikey": "5b294cd346624c7b24444fbd",
            "cache-control": "no-cache"
        }
    }).then(function mySuccess(response) {
        $scope.success = response.data;
    }, function myError(response) {  
    }); 
    
//DEETE IS FUNCTIONAL


	$scope.Delete = function(index) {
	
	if (confirm('Are you sure you want to delete this breed from the database?')) {
    	var table = document.getElementById('dogs');
    	var id = table.rows[index+1].cells[0].innerHTML;
    	var temp = String(id);
    	var str = temp.trim();
    	var t = String(str);
		$http({
       		async: true,
 			crossDomain: true,
 			url: "https://awatoproject-1698.restdb.io/rest/dogs/"+t,
 			method: "DELETE",
 			headers: {
   			 "content-type": "application/json",
   			 "x-apikey": "5b294cd346624c7b24444fbd",
   			 "cache-control": "no-cache"
 				}
    		}).then(function mySuccess(response) {
    		window.location.reload();
    		}, function myError(response) {  
    	});	
		} else {
    // Do nothing!
	}			
	};
});  
