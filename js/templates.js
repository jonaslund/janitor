var jade = require('jade');
var buckets_view = jade.compile([
    '- each bucket in buckets',
    '  .bucket(data-path="#{bucket._id}")',
    '    a(href="#/bucket/id=#{bucket._id}")',
    '      .title #{bucket.title}',
    '      .icon',
    '        img(src="#{bucket.path}/#{bucket.images[0].image}")',
    '    a.deleteBucket(data-id="#{bucket._id}", href="#") &times;',
    '.bucket.bucketform',
    //'  h1 Add New Bucket +++',
    '    form(id="newBucket")',
    '      input(type="file", id="folder", nwdirectory)',
    '      input(type="submit", value="go")',
    '    a.newBucket(href="#") +'
].join('\n'));

var bucket_view = jade.compile([
  '#singleBucket(data-id="#{bucket._id}", data-path="#{bucket.path}")',
  '  h1.title #{bucket.title}',
  '  a(href="#/play/id=#{bucket._id}") PLAY BUCKET',
  '  ul.images',
  '    - each image in bucket.images',
  '      li(class="image cf")',
  '        img(src="#{bucket.path}/#{image.image}", data-filename="#{image.image}" )',
  '        div',
  '         label Transition',
  '         select(class="transition")',  
  '           types = ["Normal", "Difference", "Darken", "Lighten", "Multiply"]',
  '           for item in types',
  '             option(selected=image.transition == item, value="#{item}") #{item}',
  '        div',
  '         label Time',
  '         select(class="time")',  
  '           times = [1,2,3,4,5,6,7,8,9,10,15]',
  '           for time in times',
  '             option(selected=image.time == time, value="#{time}") #{time}',
  '        a.deleteImage(href="#") &times;',
  '  a.reloadBucket(href="#") RELOAD FOLDER'
].join('\n'));
