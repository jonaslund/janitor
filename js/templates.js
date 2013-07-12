var jade = require('jade');
var buckets_view = jade.compile([
    '- each bucket in buckets',
    '  .bucket(data-path="#{bucket._id}")',
    '    a(href="#/bucket/id=#{bucket._id}")',
    '      .icon',
    '        img(src="#{bucket.path}/#{bucket.images[0].image}")',
    '      .title #{bucket.title}',
    '    a.deleteBucket(data-id="#{bucket._id}", href="#") &times;',
    '.bucket',
    '  h1 Add New Bucket +++',
    '    form(id="newBucket")',
    '      input(type="file", id="folder", nwdirectory)',
    '      input(type="submit", value="go")'
].join('\n'));

var bucket_view = jade.compile([
  '.singleBucket(data-path="#{bucket._id}")',
  '  a(href="#/play/id=#{bucket._id}") PLAY BUCKET',
  '  ul.images',
  '    - each image in bucket.images',
  '      li',
  '        img(src="#{bucket.path}/#{image.image}")'
].join('\n'));
