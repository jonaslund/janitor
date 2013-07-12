# Janitor

Hi mr Harm.

Prerequisites

you need nodejs if you don't have it

run in dir <br/>
npm install nedb <br/>
npm install jade <br/>

(couldn't put them in the package.json due to node-webkit using it)

download+install node-webkit
https://github.com/rogerwang/node-webkit

to run easily, alias the binary like
alias nw="/Applications/node-webkit.app/Contents/MacOS/node-webkit"

and then to run the current app in the terminal in the dir
nw app.nw

to repackage the app run this in the dir
zip -r app.nw *

then nw app.nw

or run it wihtout packaging it with
nw . 

we're using nedb for storage, very cool js based mongodb inspired text based db
it'll be stored in the root as janitordb and will just contain the whole json objects


by the way
now it looks like a browser (for developing so u can access the devtools...)
but change line 11 in package.json to false and it'll hide the address bar and voila
(    "toolbar": true,)


bingo times
