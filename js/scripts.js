var fs = require("fs"),
    Datastore = require('nedb'),
    db = new Datastore({ filename: 'janitordb', autoload: true });

//get views through hashes
var nav = window.location.hash;

$(window).hashchange( function(){
  console.log( location.hash );
  nav = location.hash;
    
  //load single buckets view  
  if(nav.match(/bucket\/id=/gi)) {

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
    var bid = nav.substr(10);
    console.log(bid);
    if(bid) {
      db.find({_id: bid}, function(err, res) {        
        //call Janitor Init
        //to start play
        console.log(res);
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

$("#main").on("click", '.newBucket', function() {
  $("#folder").trigger("click");
  return false;
});
$("#main").on("change", "#folder", function() {
  $("#newBucket").trigger("submit");
});

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
          imagesarr.push({
            image: files[i],
            transition: "normal",
            time: 5
          });
          
          p(i+1);
                
        } else {
          p(i+1);
        }

      } else {
        
        //no images in folder, either throw error or auto populate
        if(imagesarr.length === 0) {
          imagesarr.push({image: "error.png"});
        }

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

/**
 * [deleteBucket]
 * @param  {[str]} id
 * @return {[int]}    [Number Of Records Removed]
 */
function deleteBucket(id) {
 db.remove({ _id: id}, {}, function (err, numRemoved) {
  console.log(numRemoved);
 });
}

/**
 * [updateBucket]
 * @param  {[str]} id      
 * @param  {[json]} updates 
 * @return {[int]}  rows altered        
 */
function updateBucket(id, updates) {
  db.update({_id: id}, updates, function (err, numReplaced) {
    console.log(numReplaced);
  });
}

/**
 * [isImage]
 * @param  {[str]}  filename
 * @return {Boolean}
 */
function isImage(filename) {
  if(filename.match(/\.(jpeg|jpg|gif|png)$/)) {
    return 1;
  } else {
    return 0;
  }  
}

//sortable bucket
$("#main").on("mouseenter", ".images", function() {
  $(".images").sortable({
    stop : function() {
      var sortedArray = [];
       $(".images li").each(function() {
        sortedArray.push({
          image: $(this).find("img").attr("data-filename"), 
          transition: $(this).find(".transition").val(),
          time: $(this).find(".time").val()
        });
      });
      
      updateBucket($("#singleBucket").attr("data-id"), { $set: { images: sortedArray }});
    }
  });
});

$("#main").on("change", "select", function() {
  var sortedArray = [];
   $(".images li").each(function() {
    sortedArray.push({
      image: $(this).find("img").attr("data-filename"), 
      transition: $(this).find(".transition").val(),
      time: $(this).find(".time").val()
    });
  });
  
  updateBucket($("#singleBucket").attr("data-id"), { $set: { images: sortedArray }});
});

$("#main").on("click", ".deleteImage", function() {
  var r=confirm("U sure u wanna remove?");  
  if (r===true) {
    if($(".images li").size() === 1) {
      alert("You can't remove the last picture");
    } else {
  
      $(this).parent("li").remove();

      var sortedArray = [];
       $(".images li").each(function() {
        sortedArray.push({
          image: $(this).find("img").attr("data-filename"), 
          transition: $(this).find(".transition").val(),
          time: $(this).find(".time").val()
        });
      });

      updateBucket($("#singleBucket").attr("data-id"), { $set: { images: sortedArray }});      
    }
  }

  return false;
});

//reload folder
$("#main").on("click", ".reloadBucket", function() {
  var path = $("#singleBucket").attr("data-path");
  var id = $("#singleBucket").attr("data-id");
  var imagesarr = [];
  
  fs.readdir(path, function(err, files) {  
    //process and insert
    (function p(i) {
      if(i < files.length) {

        if(isImage(files[i])) {
          imagesarr.push({
            image: files[i],
            transition: "normal",
            time: 5
          });

          p(i+1);
                
        } else {
          p(i+1);
        }

      } else {
        
        //no images in folder, either throw error or auto populate
        if(imagesarr.length === 0) {
          imagesarr.push({image: "error.png"});
        }


        updateBucket(id, { $set: { images: imagesarr }});

        //reload page
        window.location.hash = "/bucket/id=" + id;
      }

    })(0);
  });

});

//reload folder
//set bucket image properties
