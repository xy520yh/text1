
  var dh=document.documentElement.clientHeight;
  var device = /android|iphone|ipad|ipod|webos|iemobile|opear mini|linux/i.test(navigator.userAgent.toLowerCase());
  var sx=sy=ex=ey=mx=my=speedx=speedy=st=et=0;
  var startEvtName = device?"touchstart":"mousedown",
      moveEvtName = device?"touchmove":"mousemove",
      endEvtName = device?"touchend":"mouseup";
  var obj=document.getElementById('body');
  function touchStart(event){ 
//  event.preventDefault();
    st = new Date().getTime();
    sx = device?event.touches[0].clientX:event.clientX;
    sy = device?event.touches[0].clientY:event.clientY;  
    obj.addEventListener(moveEvtName,touchMove);
    obj.addEventListener(endEvtName,touchEnd);
  }
  function touchMove(event){
   event.preventDefault();
    ex = device?event.touches[0].clientX:event.clientX;
    ey = device?event.touches[0].clientY:event.clientY;      
  }
  function touchEnd(event){    
    et = new Date().getTime();
    obj.removeEventListener(moveEvtName,touchMove);   
    obj.removeEventListener(endEvtName,touchEnd);     
    ex=ex;ey=ey;mx=ex-sx;my=ey-sy;
    speedx= Math.abs(mx/(et-st));
    speedy= Math.abs(my/(et-st));     
    if(device){
      if(((speedx>0.6&&Math.abs(my)>50) || ( speedy>0.4 && Math.abs(my)>100)) && my>0 && ey!=0){        
          slideDown();
      };
      if(((speedx>0.6&&Math.abs(my)>50) || ( speedy>0.4 && Math.abs(my)>100)) && my<0 && ey!=0){       
          slideUp();    
      } 
    }else{     } 
    sx=sy=ex=ey=mx=my=speedx=speedy=st=et=0;   
  }
obj.addEventListener(startEvtName,touchStart);
  
var pages = $('.page'),
    len = $('.page').length,
    activeIndex = prevIndex = 0,
    isSildeing = false;

var timeline = 0;

function slideUp(){       
    if(!isSildeing && activeIndex <len-1){        
        isSildeing = true;       
        prevIndex = activeIndex;
        activeIndex +=1;      
        pages.eq(prevIndex).addClass('pageoutup');
        pages.eq(activeIndex).addClass('pageindown activepage initAni');        
        setTimeout(function(){          
            pages.eq(activeIndex).removeClass('pageindown');         
            pages.eq(prevIndex).removeClass('pageoutup activepage initAni');            
            isSildeing = false;
        },500)           
        initPageAni(activeIndex);
    }    
}
function slideDown(){    
    if(!isSildeing && activeIndex > 0){     
        isSildeing = true;       
        prevIndex = activeIndex;
        activeIndex -=1;       
        pages.eq(prevIndex).addClass('pageoutdown');
        pages.eq(activeIndex).addClass('pageinup activepage initAni');        
        setTimeout(function(){           
            pages.eq(activeIndex).removeClass('pageinup');            
            pages.eq(prevIndex).removeClass('pageoutdown activepage initAni');            
            isSildeing = false;
        },500);
        initPageAni(activeIndex);
    }
}

var initP6 = function (delay,dur){  
    var arr=[1344,1466,1810],arr2 = [0,0,0];
    var sp = dur/10,count = 0;
    var _actindex = activeIndex;
    for (var i = 0; i < $('.jscw').length ; i++ ) {
    	$('.jscw').eq(i).text('0.00')
    }
    (function(i){
        var hode = i;
            setTimeout(function (){       
            if(hode == activeIndex ){
                var t = setInterval(function(){
                    count ++;
                    for( var j = 0 ; j < 3 ; j++){       
                         arr2[j] += Math.floor((arr[j]/10));        
                      $('.jscw').eq(j).text(Math.floor( arr2[j])/100);
                    }          
                    if(count==10){
                        clearInterval(t);
                        $('.jscw').eq(0).text('13.44');
                        $('.jscw').eq(1).text('14.66');
                        $('.jscw').eq(2).text('18.10');
                    }          
                },sp)    
            }         
        },delay) 
    })(_actindex);
}
var initNum = function(id,dur,delay,num,tl){    
    var self = this;    
    self.hodeact = activeIndex;
    self.hodeprev = prevIndex;
    self.num = num;
    self.tl = tl;
    self.delay = delay;    
    self.obj = $("#"+id);    
    self.t = dur/20;
    self.initN = 0;   
    self.obj.text(0);     
    setTimeout(function (){
      if(self.hodeact != activeIndex || self.hodeprev !=  prevIndex || self.tl != timeline ){
          return;
      }              
        self.iv = setInterval(function (){          
           self.initN += self.num/20;
           self.obj.text(self.initN +"+");        
           if(self.initN == self.num){
               clearInterval(self.iv);
           } 
        },self.t)              
    }, self.delay)
}
function initPageAni(i){
    switch (i){
      case 4:
        var initP6Ani = new initP6(3400,800,timeline);
        break;
    	case 8:
    	  timeline = (new Date()).getTime();
    	  var initNum1 = new initNum('p9-jscw1',600,1600,3000,timeline);
        var initNum2 = new initNum('p9-jscw2',600,1600,300,timeline);
    		break;
    	default:
    		break;
    } 
}
/*一打开页面加载*/
window.onload = function (){ 
    $('.page1').addClass("activepage initAni");
    $('.loading').animate({'opacity':'0'},100,function(){$(this).css('display','none')})
}
/*一打开页面加载*/
$(document).ready(function (){
    var oMusic = document.getElementById("music");
    var oMusici = document.getElementById("musici");
setTimeout(function(){  
    $(window).scrollTop(1);  
  },0);  
      oMusic.play();  
      document.addEventListener("WeixinJSBridgeReady", function () {  
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {  
               oMusic.play();
            });  
      }, false);
setTimeout(function(){  
    $(window).scrollTop(0);  
  },0);  
    var flag =0;
    oMusici.onclick = function(){        
        if(typeof WeixinJSBridgeReady != 'undefined'){ 
          document.addEventListener("WeixinJSBridgeReady", function () {           
            if(flag == 0){
              oMusic.pause();
              oMusici.src = "img/musicoff.png"
              flag = 1;
            }else if(flag == 1){
              oMusic.play();
              oMusici.src= "img/musicon.png";
              flag = 0;
            }                
          }, false);  
        }else{
           if(flag == 0){
              oMusic.pause();
              oMusici.src = "img/musicoff.png"
              flag = 1;
            }else if(flag == 1){
              oMusic.play();
              oMusici.src= "img/musicon.png";
              flag = 0;
            }          
        }
     }
})