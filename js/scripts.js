var fs = require("fs"),
    Datastore = require('nedb'),
    db = new Datastore({ filename: '/Users/jonas/v/janitor/janitordb', autoload: true });

//get views through hashes
var nav = window.location.hash;

//http://api.theartworld.org

$(window).hashchange( function(){
  console.log( location.hash );
  nav = location.hash;
    
  //load single buckets view  
  if(nav.match(/bucket\/id=/gi)) {
    $("#main").load("views/play.html");
  
    var id = nav.substr(12);
    if(id) {
      db.find({_id: id}, function(err, res) {        
        console.log(res);
        //this is the bucket edit thingy
        $("#main").html(bucket_view({bucket: res[0]}));
      });
    }

  } else if(nav.match(/play\/id=/gi)) {
    $("#main").load("views/play.html");  
    var bid = nav.substr(12);
    if(bid) {
      db.find({_id: bid}, function(err, res) {        
        //call Janitor Init
        //to start play
        janitorInit(res);
      });
    }  
  } else {
    //home
    db.find({}, function(err, docs) {                            
      $("#main").html(buckets_view({ buckets: docs }));
    });
  } 

});

//newBucket
$("#main").on("submit", '#newBucket', function() {
  var path = $("#folder").val();
  var title = path.substr(path.lastIndexOf("/")+1);

  saveBucket(title, path, function() {
    
  });  
  return false;
});

//trigger onload
$(window).hashchange();

/**
 * [saveBucket]
 * @param  {[str]}   title   
 * @param  {[str]}   path    
 * @param  {Function} callback 
 */
function saveBucket(title, path, callback) {
  var imagesarr = [];
  console.log("SAVING", title, path);

  fs.readdir(path, function(err, files) {
    //process and insert
    (function p(i) {
      if(i < files.length) {
        if(isImage(files[i])) {
          imagesarr.push({"image": files[i]});
          p(i+1);
                
        } else {
          p(i+1);
        }

      } else {
        //done                      
        var bucket = {title: title, path: path, images: imagesarr};        
        
        db.insert(bucket, function (err, newDoc) {             
          console.log(newDoc);
          callback("Saved");
          window.location.hash = "/bucket/id=" + newDoc._id;
        });
      }
    })(0);
  });
  //get the images  
}

//bind delete
 $("#main").on( "click", '.deleteBucket', function(event) {   
  var thisID = $(this).attr("data-id");

  var r=confirm("U sure u wanna remove?");  
  if (r===true) {
    deleteBucket(thisID);
    $(this).parent(".bucket").remove();
  }

  return false;
});

function deleteBucket(id) {
 db.remove({ _id: id}, {}, function (err, numRemoved) {
  console.log(numRemoved);
 });
}


/**
 * [isImage]
 * @param  {[str]}  filename
 * @return {Boolean}
 */
function isImage(filename) {
  var ex = filename.split(".");
  if(ex[1].match(/jpeg|png|jpg|gif/gi)) {
    return 1;
  } else {
    return 0;
  }
}

//delete bucket
//reorder bucket images
//add bucket images
//remove bucket images
//set bucket image properties