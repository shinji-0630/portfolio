$(function(){
  //pagetop
  $('#footer a').click(function(e){
    e.preventDefault();
    $("html,body").animate({scrollTop: 0}, 300);
  });
  //page-check
  function pageCheck(){
    if($('body').hasClass('top')){
      return 'top';
    }else if($('body').hasClass('creative')){
      return 'creative';
    }else if($('body').hasClass('about')){
      return 'about';
    }
  }
  //page-change
  function pageChange(){
    var $top = $('#top');
    var $creative = $('#creative');
    var $about = $('#about');
    var $loading = $('#loading');
    var topFlg = true;
    var creativeFlg = false;
    var aboutFlg = false;

    $('.top-change').click(function(e){
      e.preventDefault();
      if(pageCheck() != 'top'){
        $('#creative,#about').fadeOut().queue(function(){
          $('body').removeClass();
          $('body').addClass('top');
          $('.top-change').addClass('active');
          $('.creative-change,.about-change').removeClass('active');
          $top.fadeIn().dequeue();
        });
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
              $('#top,#about').fadeOut().queue(function(){
                $loading.fadeIn();
              });
            },
            success: function(json){
              for(i = 0;json.src.length>i;i++){
                $creative.append('<div class="c-box"><img src="'+json.src[i]["img"]+'"></div>');
                //console.log(json.src[i]["txt"]);
              }
            },
            error:function(a){
            },
            complete:function(){
              $loading.fadeOut('slow').queue(function(){
                $('body').removeClass();
                $('body').addClass('creative');
                $creative.fadeIn();
                $('.top-change,.about-change').removeClass('active');
                $('.creative-change').addClass('active');
                creativeFlg = true;
              });
            }
          });
        }else{
          $('#top,#about').fadeOut().queue(function(){
            $('body').removeClass();
            $('body').addClass('creative');
            $('.top-change,.about-change').removeClass('active');
            $('.creative-change').addClass('active');
            $creative.fadeIn().dequeue();
          });
        }
      }
    });
  }
  pageChange();


  /*resize function*/
   //run function for first load
  var br = 767;
  var $wWidth = $(window).width();
  if($wWidth > br){
  }else{
  }
  //resize function
  var timer = false;
  var $beforeWidth = $wWidth;
  $(window).resize(function() {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      var $afterWidth = $(window).width();
      if($beforeWidth > br){//pc
        if($afterWidth > br){//pc->pc
          //don't run function
        }else{//pc->smp
        }
      }else{//smp
        if($afterWidth > br){//smp->pc
        }else{//smp->smp
          //don't run function
        }
      }
      $beforeWidth = $afterWidth;
    }, 10);
  });



});
