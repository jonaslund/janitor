var jade = require('jade');
var buckets_view = jade.compile([
    '- each bucket in buckets',
    '  .bucket(data-path="#{bucket._id}")',
    '    a(href="#/bucket/id=#{bucket._id}")',
    '      .icon',
    '        img(src="#{bucket.path}/#{bucket.images[0].image}")',
    '      .title #{bucket.title}',    
    'form(id="newBucket")',
    '  input(type="file", id="folder", nwdirectory)',
    '  input(type="submit", value="go")'
].join('\n'));

var bucket_view = jade.compile([
  '.bucket(data-path="#{bucket._id}")',
  '  .images',
  '    - each image in bucket.images',
  '      img(src="#{bucket.path}/#{image.image}")',
].join('\n'));


      //<form id="newBucket" action="/"><input type="file" id="folder" nwdirectory/><input type="submit" value="go" /></form>
