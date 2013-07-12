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
  '.singleBucket(data-path="#{bucket._id}")',
  '  h1.title #{bucket.title}',
  '  a(href="#/play/id=#{bucket._id}") PLAY BUCKET',
  '  ul.images',
  '    - each image in bucket.images',
  '      li',
  '        img(src="#{bucket.path}/#{image.image}")'
].join('\n'));
