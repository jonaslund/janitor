<!doctype html>
<html>

<head>
    <title>v 0.1</title>
    <script src='js/jquery-2.0.3.min.js'></script>
    <script src='js/jquery.transit.js'></script>
    <style>

        * {
          -webkit-backface-visibility: hidden;
        }
        
        body, html {
            height:100%;    
      
            background-color:white;
            -webkit-blend-mode: normal;
            -webkit-transform: translateZ(0);
            margin:0;
            padding:0;
        }


        #janitor img {
            -webkit-transform: translateZ(0);
            position:absolute;
            -webkit-transition: all 5s linear;
            
        }
        
        #janitor img.zoom {
            -webkit-transform:scale(1.5);
        }
        
       
      /*  #A {
            -webkit-transition: all 10s linear;
            -webkit-transform: scale(3);
            -webkit-opacity:0;
            

        }

        body.move #A {
            -webkit-transform: scale(1.2);
            -webkit-opacity:1;
        }

        #B {
            -webkit-blend-mode:  multiply;
            -webkit-transition: all 10s linear;
            -webkit-transform: scale(1.2);
            -webkit-opacity:1;
        }

        body.move #B {
            -webkit-transform:  rotate(180deg);
            -webkit-opacity:0;
        }
        
        
        body.move2 #B {
            -webkit-transform: scale(12);
        }*/
    </style>
</head>
<body>

    <div id='janitor'>
        
    </div>

    
    <script>
        $(document).ready(function () {
            var s = {};
            
            $(window).resize(function() {
                s = {
                    width: $(window).width(),
                    height: $(window).height()
                }
            }); 
            
            $(window).resize();
            
            
            var img = new Image();
            
            $(img).load(function () {
                var $img = $(img);
              
                
                
                $("#janitor").append(img);
                
                setTimeout(function () {
                    
                    $(img).addClass('zoom');
                },1000);
                
            }).attr('src', 'images/9uyvs0.jpg');
            
             
            
           
            
        
        });
    </script>
</body>

</html>


t
            1    2    3    4     5    6     7    8
a.opacity   0   50  100  100    50    0     0    0
a.scale     0                       100     0    0

b.opacity   0    0   50  100   100   50     0    0
b.scale     0    0                        100    0

c.opacity   0         0   50   100  100    50    0
c.scale     0         0                        100 
