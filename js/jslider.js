function jslider_adaptive(){
  
}

$(document).ready(function() {
     jslider_adaptive();  
});

$(window).resize(function() {
    jslider_adaptive(); 
});

function jslider_register(selector,listType,delay){
    var curSlideN = 0;
    var active = false;
    var renderSpeed = 1;

    function add_navs() {
        var slideCount = $(selector+' .sliders .slider').length;
        var navsPoints = $(selector+' .nav i').length;
        var html = '';
        if (navsPoints != slideCount){
            navsPoints = slideCount;
            for (var i=0; i<navsPoints; i++){
                html = html+'<i></i>';
            }
            $(selector+' .nav').html(html);
        }
    };

    function listPrev(prevN){
        if (active){return;}
        var slideCount = $(selector+' .sliders .slider').length;
        $(selector+' .sliders .slider').css('opacity','0');
        var curSlider = $(selector+' .sliders .slider:eq('+curSlideN+')');
        if (slideCount == 1){
            var slider_clone = $(selector+' .sliders .slider:eq('+curSlideN+')').clone();
            $(slider_clone).css({'opacity':'0'});
            $(selector+' .sliders').prepend(slider_clone);
            curSlideN++;
        }else if (prevN == curSlideN){
            return;
        }
        
        //list
        if (listType == 'list'){
            $(curSlider).css({'left': '0%','opacity':'1'});
            var prevSlider = $(selector+' .sliders .slider:eq('+prevN+')');
            $(prevSlider).css({'left':'-100%','opacity':'1'});
            var time = 0;
            active = true;
            var timer = setInterval(function(){
                time = time + renderSpeed;
                if (time > delay){
                    active = false;
                    curSlideN = prevN;
                    clearInterval(timer);
                    return;
                }
                var value = 100 - parseFloat(time/delay*100).toFixed(2);
                if (value < 0){value = 0;}
                else if (value > 100){value = 100;}
                $(curSlider).css('left', (100-value)+'%');
                $(prevSlider).css('left', -value+'%');
            },renderSpeed);
        }else if (listType == 'twist'){
            $(curSlider).css({'left': '0%','opacity':'1','transform':'none'});
            var prevSlider = $(selector+' .sliders .slider:eq('+prevN+')');
            $(prevSlider).css({'left':'0%','opacity':'0'});
            var time = 0;
            active = true;
            var timer = setInterval(function(){
                time = time + renderSpeed;
                if (time > delay){
                    active = false;
                    curSlideN = prevN;
                    clearInterval(timer);
                    return;
                }
                var value = 100 - parseFloat(time/delay*100).toFixed(2);
                if (value < 0){value = 0;}
                else if (value > 100){value = 100;}
                var sub_val = parseFloat(value/100).toFixed(2);
                $(curSlider).css({'opacity':sub_val});
                $(prevSlider).css({'transform':'rotate3d(1,1,1,'+(-value)+'deg) scale3d('+(1-sub_val)+','+(1-sub_val)+','+(1-sub_val)+')',
                'opacity':(1-sub_val)});
            },renderSpeed);
        }else if(listType == 'horizontal'){
            var nextSlider = $(selector+' .sliders .slider:eq('+prevN+')');
            $(nextSlider).css({'left':'0%','opacity':'0','z-index':'1'});
            var clone1 = $(nextSlider).clone();
            var clone2 = $(nextSlider).clone();
            $(clone1).css({'transform': 'translateY(50%)','opacity':'1'});
            $(clone2).css({'transform': 'translateY(-50%)','opacity':'1'});
            $(curSlider).parents('.jslider').prepend('<div class="clone_wr1 slider"></div>');
            $(curSlider).parents('.jslider').prepend('<div class="clone_wr2 slider"></div>');
            var container1 = $(curSlider).parents('.jslider').find('.clone_wr1');
            var container2 = $(curSlider).parents('.jslider').find('.clone_wr2');
            $(container1).css({'transform': 'translateY(-100%)','z-index':'3','opacity':'1','overflow':'hidden'});
            $(container2).css({'transform': 'translateY(100%)','z-index':'3','opacity':'1','overflow':'hidden'});
            $(container1).prepend(clone1);
            $(container2).prepend(clone2);
            $(curSlider).css({'left': '0%','opacity':'1','transform':'none','z-index':'1'});
            var time = 0;
            active = true;
            var timer = setInterval(function(){
                time = time + renderSpeed;
                if (time > delay){
                    $(selector+' .sliders .slider').css({'left':'0%','opacity':'0','z-index':'1'});
                    $(nextSlider).css({'left':'0%','opacity':'1','z-index':'1'});
                    $(container1).remove();
                    $(container2).remove();
                    active = false;
                    curSlideN = prevN;
                    clearInterval(timer);
                    return;
                }
                var value1 = (-100) + parseFloat(parseFloat(time/delay/2*100).toFixed(2));
                var value2 = 100 - parseFloat(parseFloat(time/delay/2*100).toFixed(2));
                $(container1).css({'transform': 'translateY('+value1+'%)'});
                $(container2).css({'transform': 'translateY('+value2+'%)'});
            },renderSpeed);
        }else{
            $(curSlider).css({'left': '0%','opacity':'1'});
            var prevSlider = $(selector+' .sliders .slider:eq('+prevN+')');
            $(prevSlider).css({'left':'0%','opacity':'0'});
            var time = 0;
            active = true;
            var timer = setInterval(function(){
                time = time + renderSpeed;
                if (time > delay){
                    active = false;
                    curSlideN = prevN;
                    clearInterval(timer);
                    return;
                }
                var value = 1 - parseFloat(time/delay).toFixed(2);
                if (value < 0){value = 0;}
                else if (value > 1){value = 1;}
                $(curSlider).css('opacity',value);
                $(prevSlider).css('opacity', 1-value);
            },renderSpeed);
        }
    }


    function listNext(nextN){
        if (active){return;}
        var slideCount = $(selector+' .sliders .slider').length;
        $(selector+' .sliders .slider').css('opacity','0');
        var curSlider = $(selector+' .sliders .slider:eq('+curSlideN+')');
        if (slideCount == 1){
            var slider_clone = $(selector+' .sliders .slider:eq('+curSlideN+')').clone();
            $(slider_clone).css({'opacity':'0'});
            $(selector+' .sliders').prepend(slider_clone);
            curSlideN++;
        }else if (nextN == curSlideN){
            return;
        }
        
        
        //list
        if (listType == 'list'){
            $(curSlider).css({'left': '0%','opacity':'1'});
            var nextSlider = $(selector+' .sliders .slider:eq('+nextN+')');
            $(nextSlider).css({'left':'100%','opacity':'1'});
            var time = 0;
            active = true;
            var timer = setInterval(function(){
                time = time + renderSpeed;
                if (time > delay){
                    active = false;
                    curSlideN = nextN;
                    clearInterval(timer);
                    return;
                }
                var value = parseFloat(time/delay*100).toFixed(2);
                if (value < 0){value = 0;}
                else if (value > 100){value = 100;}
                $(curSlider).css('left', -value+'%');
                $(nextSlider).css('left', (100-value)+'%');
            },renderSpeed);
        }else if(listType == 'twist'){
            $(curSlider).css({'left': '0%','opacity':'1','transform':'none'});
            var nextSlider = $(selector+' .sliders .slider:eq('+nextN+')');
            $(nextSlider).css({'left':'0%','opacity':'0'});
            var time = 0;
            active = true;
            var timer = setInterval(function(){
                time = time + renderSpeed;
                if (time > delay){
                    active = false;
                    curSlideN = nextN;
                    clearInterval(timer);
                    return;
                }
                var value = 100-parseFloat(time/delay*100).toFixed(2);
                if (value < 0){value = 0;}
                else if (value > 100){value = 100;}
                var sub_val = parseFloat(value/100).toFixed(2);
                $(curSlider).css({'opacity':sub_val});
                $(nextSlider).css({'transform':'rotate3d(1,1,1,'+value+'deg) scale3d('+(1-sub_val)+','+(1-sub_val)+','+(1-sub_val)+')',
                'opacity':(1-sub_val)});
            },renderSpeed);
        }else if(listType == 'horizontal'){
            var clone1 = $(curSlider).clone();
            var clone2 = $(curSlider).clone();
            $(clone1).css({'transform': 'translateY(50%)','opacity':'1'});
            $(clone2).css({'transform': 'translateY(-50%)','opacity':'1'});
            $(curSlider).parents('.jslider').prepend('<div class="clone_wr1 slider"></div>');
            $(curSlider).parents('.jslider').prepend('<div class="clone_wr2 slider"></div>');
            var container1 = $(curSlider).parents('.jslider').find('.clone_wr1');
            var container2 = $(curSlider).parents('.jslider').find('.clone_wr2');
            $(container1).css({'transform': 'translateY(-50%)','z-index':'3','opacity':'1','overflow':'hidden'});
            $(container2).css({'transform': 'translateY(50%)','z-index':'3','opacity':'1','overflow':'hidden'});
            $(container1).prepend(clone1);
            $(container2).prepend(clone2);
            $(curSlider).css({'left': '0%','opacity':'0','transform':'none','z-index':'1'});
            var nextSlider = $(selector+' .sliders .slider:eq('+nextN+')');
            $(nextSlider).css({'left':'0%','opacity':'1','z-index':'2'});
            var time = 0;
            active = true;
            var timer = setInterval(function(){
                time = time + renderSpeed;
                if (time > delay){
                    $(container1).remove();
                    $(container2).remove();
                    active = false;
                    curSlideN = nextN;
                    clearInterval(timer);
                    return;
                }
                var value1 = (-50)-parseFloat(time/delay/2*100).toFixed(2);
                var value2 = parseFloat(parseFloat(time/delay/2*100).toFixed(2)) + 50;
                $(container1).css({'transform': 'translateY('+value1+'%)'});
                $(container2).css({'transform': 'translateY('+value2+'%)'});
            },renderSpeed);
        }else{
            $(curSlider).css({'left': '0%','opacity':'1'});
            var nextSlider = $(selector+' .sliders .slider:eq('+nextN+')');
            $(nextSlider).css({'left':'0%','opacity':'0'});
            var time = 0;
            active = true;
            var timer = setInterval(function(){
                time = time + renderSpeed;
                if (time > delay){
                    active = false;
                    curSlideN = nextN;
                    clearInterval(timer);
                    return;
                }
                var value = 1-parseFloat(time/delay).toFixed(2);
                if (value < 0){value = 0;}
                else if (value > 1){value = 1;}
                $(curSlider).css('opacity', value);
                $(nextSlider).css('opacity', 1-value);
            },renderSpeed);
        }
    }


    $(document).on("click", selector, function() {
        add_navs();
    });


    $(document).on("click", selector+" .prev", function() {
        var slideCount = $(selector+' .sliders .slider').length;
        var prevN = curSlideN - 1;
        if (prevN < 0){prevN = slideCount-1;}
        listPrev(prevN);
    });
    
    $(document).on("click", selector+" .next", function() {
        var slideCount = $(selector+' .sliders .slider').length;
        var nextN = curSlideN + 1;
        if (nextN > slideCount-1){nextN = 0;}
        listNext(nextN);
    });
    
    $(document).on("click", selector+" .nav i", function() {
        var index = $(this).index('.nav i');
        if (index < curSlideN){
            listPrev(index);
        }else if(index > curSlideN){
            listNext(index);
        }
    });
}
