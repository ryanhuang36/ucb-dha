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
      var linkPromises = [];

      console.log(dropDownValues);

        var path = database.ref();
        path.once('value').then(function(snapshot) {
          for (val in dropDownValues) {
            var length = snapshot.child("" + dropDownValues[val]).numChildren();
            console.log("length: " + length);
            var randomNum = getRandomInt(1, length);
            var subPath = database.ref("" + dropDownValues[val] + "/" + randomNum);
            console.log("subPath: " + subPath);
            linkPromises.push(subPath.once('value'));
          }

          Promise.all(linkPromises).then(function (snapshots) {
            console.log("snapshot: " + snapshots);
            var links = snapshots.map(snapshot => snapshot.val());
            $("#recommendations").empty();
            for (let i = 0; i < links.length; i++) {
              $("#recommendations").append("<a target='_blank' + href=" + " ' " + links[i] + " ' " + ">" + links[i] + "</a>");
              $("#recommendations").append("<br>");
            }
            console.log(links);
          });

        });

    });

    //Returns a random number between min and max
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});