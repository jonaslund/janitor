var fs = require("fs");
var db = openDatabase('janitor2', '1.0', 'amazing janitor userdb', 2 * 1024 * 1024);

// Create table and insert one line
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS buckets (id unique, title, path, sequence)');
  tx.executeSql('CREATE TABLE IF NOT EXISTS images (id unique, pid, filename, sequence)'); //add additional necessesties here
});

// Query out the data
db.transaction(function (tx) {
  tx.executeSql('SELECT * FROM buckets', [], function (tx, results) {
    var len = results.rows.length, i;
    for (i = 0; i < len; i++) {
      console.log(results.rows.item(i).text);
    }
  });
});

//get views through hashes
var nav = window.location.hash;

$(window).hashchange( function(){
  console.log( location.hash );
  nav = location.hash;
});

$(window).hashchange();

function saveBucket(title, path, callback) {
  //insert bucket
  var id = getLastID("buckets");
  var imgid = getLastID("images");  
  console.log(id, imgid);

  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO buckets (id, title, path) VALUES (2, '+title+', '+path+')');
  });

  //get the images  
  fs.readdir(path, function(err, files) {
    console.log("contents", files);
    //process and insert
    (function p(i) {
      if(i < files.length) {
        if(isImage(files[i])) {
          
          //insert into DB
          db.transaction(function (tx) {            
            tx.executeSql("INSERT INTO images (pid, filename, sequence) VALUES ("+id+", "+files[i]+", "+i+")");
            p(i+1);
          });
        } else {
          p(i+1);
        }

      } else {
        //done
        callback("success");
      }
    })(0);
  });
}

setTimeout(function() {
  saveBucket("test", "/Users/jonas/v/janitor/janitor_bucket", function(bajs) {
    console.log(bajs);
  });
}, 3000);

function getLastID(table) {
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM "+table+" ORDER BY id DESC LIMIT 1", [], function(tx, results) {
      console.log(results.rows.items);    

      if(results.rows.items !== undefined) {
      console.log(results.rows.items);    
        return results.rows.items[0].id + 1;
      } else {
      
        return "1";
      }
    });
  });
}
function isImage(filename) {
  var ex = filename.split(".");
  if(ex[1].match(/jpeg|png|jpg|gif/gi)) {
    return 1;
  } else {
    return 0;
  }
}

//create bucket
//save bucket
//delete bucket

//reorder bucket images
//add bucket images
//remove bucket images