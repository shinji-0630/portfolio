$(function(){
  //page-check
  function pageCheck(){
    $body = $('body');
    if($body.hasClass('top')){
      return 'top';
    }else if($body.hasClass('creative')){
      return 'creative';
    }else if($body.hasClass('about')){
      return 'about';
    }
  }
  //page-change
  function pageChange(){
    var $top = $('#top');
    var $creative = $('#creative');
    var $about = $('#about');
    var topFlg = true;
    var creativeFlg = false;
    var aboutFlg = false;
    var promise = null;

    $('.top-change').click(function(e){
      e.preventDefault();
      if(pageCheck() != 'top'){
        $('#creative,#about').animate({
          'opacity':'hide'
        },'slow').promise().done(function(){
          $('body').removeClass();
          $('body').addClass('top');
          $('.top-change').addClass('active');
          $('.creative-change,.about-change').removeClass('active');
          $top.animate({'opacity':'show'});
        }
        );
      }
    });
    $('.creative-change').click(function(e){
      e.preventDefault();
      if(pageCheck() != 'creative'){
        if(!creativeFlg){
          $.ajax({
            type: 'GET',
            url: '/src/creative.json',
            dataType: 'json',
            beforeSend:function(){
              $('#top,#about').animate({'opacity':'hide'},'slow');
            },
            success: function(json){
              for(i = 0;json.src.length>i;i++){
                $('#c-contents').append('<div class="c-box child-'+ i +'">'+
                  '<div class="c-over">'+
                    '<div class="over-left"><img src="'+json.src[i]["img"]+'"></div>'+
                    '<div class="over-right">' +
                      '<h2>'+json.src[i]["title"]+'</h2>' +
                      '<h3><a href="'+json.src[i]["url"]+'" target="_brank">'+json.src[i]["url"]+'</a></h3>' +
                      '<p>'+json.src[i]["comment"]+'</p>' +
                    '</div>'+
                  '</div>'+
                  '<div class="box-wrap"><a href="#">i</a></div>'+
                  '<img src="'+json.src[i]["img"]+'">'+
                  '</div>');
              }
            },
            error:function(a){
            },
            complete:function(){
              $('body').removeClass();
              $('body').addClass('creative');
              $('.top-change,.about-change').removeClass('active');
              $('.creative-change').addClass('active');
              $creative.animate({opacity:'show'});
              displayInfo();
              creativeFlg = true;
            }
          });
        }else{
          $('#top,#about').animate({opacity:'hide'},'slow').promise().done(function(){
            $('body').removeClass();
            $('body').addClass('creative');
            $('.top-change,.about-change').removeClass('active');
            $('.creative-change').addClass('active');
            $creative.animate({opacity:'show'});
          });
        }
      }
    });
    $('.about-change').click(function(e){
      e.preventDefault();
      if(pageCheck() != 'about'){
        if(!aboutFlg){
          $.ajax({
            type: 'GET',
            url: '/src/about.php',
            dataType: 'text',
            beforeSend:function(){
              $('#top,#creative').animate({opacity:'hide'},'slow');
            },
            success: function(data){
              var html = $.parseHTML(data);
              for(i = 0;html.length > i;i++){
              $('#a-contents').append(html[i]);
              }
            },
            error:function(a){
            },
            complete:function(){
                $('body').removeClass();
                $('body').addClass('about');
                $about.animate({opacity:'show'});
                $('.top-change,.creative-change').removeClass('active');
                $('.about-change').addClass('active');
                aboutFlg = true;
            }
          });
        }else{
          $('#top,#creative').animate({opacity:'hide'},'slow').promise().done(function(){
            $('body').removeClass();
            $('body').addClass('about');
            $('.top-change,.creative-change').removeClass('active');
            $('.about-change').addClass('active');
            $about.animate({opacity:'show'});
          });
        }
      }
    });
  }
  pageChange();

  //creative_overlay
  function ua_check(){
    return {
        Touch:typeof document.ontouchstart != "undefined",
        Mobile:typeof window.orientation != "undefined"
    }
  }
  function displayInfo(){
    var ua = ua_check();
    if(ua.Touch){
      //touch_device
      $('#creative .c-box').click(function(){
        var $content = $(this).find('.c-over').clone();
        $overWrap.append($content);
        $content.ready(function(){
          $overlay.animate({opacity:'show'});
        });
      });
    }else{
      $('#creative .c-box').mouseenter(function(){
        $('.box-wrap',this).stop().animate({opacity:'show'});
      });
      $('#creative .c-box').mouseleave(function(){
        $('.box-wrap',this).stop().animate({opacity:'hide'});
      });
    }
    var $openBtn = $('.box-wrap a');
    var $overlay = $('#overlay');
    var $overlayOpacity = $('#overlay-opacity');
    var $overWrap = $('#overlay-wrap');
    $openBtn.click(function(e){
      e.preventDefault();
      var $content = $(this).closest('.c-box').find('.c-over').clone();
      $overWrap.append($content);
      $content.ready(function(){
        $overlay.animate({opacity:'show'});
        $overlayOpacity.animate({opacity:'show'});
      });
    });
    $('#close > a').click(function(e){
      e.preventDefault();
      $('.c-over',$overWrap).remove().promise().done(function(){
      $overlay.animate({opacity:'hide'});
      $overlayOpacity.animate({opacity:'hide'});
      });
    });
  }


});
