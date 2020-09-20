$( document ).ready(function() {

  var dropdown = $('#multi-select')
  dropdown.dropdown();

  var dropDownValues;
  var links = [];

  dropdown.dropdown('setting', 'onChange', function(val){
    dropDownValues = val;
    links = [];
  });

    $("#find-button").click(function() {
      // console.log(dropDownValues);

      for (val in dropDownValues) {
        var path = database.ref();
        // console.log("path: " + path);
        path.once('value').then(function(snapshot) {
          var length = snapshot.child("" + dropDownValues[val]).numChildren()
          // console.log("snapshot: " + snapshot.child("" + dropDownValues[val]).numChildren());
          var randomNum = getRandomInt(1, length);
          var subPath = database.ref("" + dropDownValues[val] + "/" + randomNum);
          subPath.once('value').then(function(snapshot2) {
            links.push("" + snapshot2.val());
            // console.log('Link: ' + snapshot2.val());
          });
        });
      }

      for (i = 0; i < links.length; i++) {
        console.log("link num: " +link);
        document.getElementById("" + (i + 1)).title = links[i];
        document.getElementById("" + (i + 1)).href = links[i];
      }
      console.log(links);

    });

    //Returns a random number between min and max
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }



      
    //     dropdown.dropdown('get value', function(val) {
    //       console.log(val);
    //     });

        // var path = database.ref('games/1');
        // path.once('value').then(function(snapshot) {
        //   console.log("snapshot: ");
        //   console.log(snapshot);
        // });

    //   $('#find-button')
    //   .on('click', function() {
    // $('#multi-select')
    //   .dropdown('get value', function(val) {
    //     console.log(val);
    //   })
    //   });




});