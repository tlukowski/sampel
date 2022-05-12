const swiper1 = new Swiper('.newsSwiper', {
    loop:true,
    navigation: {
        nextEl: ".swiper-button-next-news",
        prevEl: ".swiper-button-prev-news",
      },
    pagination: {
      el: ".swiper-pagination-news",
      clickable: true
    },    
    calculateHeight:true,
    autoplay: {
            delay:4000,
            disableOnInteraction: false,
    }  
  });
  

  const swiper2 = new Swiper('.services__swiper', {
    loop:true,
    navigation: {
        nextEl: ".swiper-button-next-services",
        prevEl: ".swiper-button-prev-services",
      },
      slidesPerView: 1,         
    pagination: {
      el: ".swiper-pagination-services",
      clickable: true
    },    
    calculateHeight:true,
    autoplay: {
            delay:4000,
            disableOnInteraction: false,
    }   
    
  }); 

  const swiper3 = new Swiper('.aboutUs__swiper', {  
    direction: 'horizontal',
    slidesPerView: 3,    
    calculateHeight:true,
    loop: true,
    autoplay:false, 
    navigation: {
        nextEl: ".swiper-button-next-aboutus",        
      },    
      pagination: {
        el: ".swiper-pagination-aboutUs",
        clickable: true
      },
       breakpoints: {         
         320: {
           slidesPerView: 1,            
           autoHeight: true,         
         },         
          768: {
           slidesPerView: 1, 
           autoHeight: true,
         }, 
         820: {
            slidesPerView: 2,
         },
         1200: {
            slidesPerView: 3, 
         },
         1600:{
          slidesPerView: 'auto',
         }    
       },       
  });
  const swiper4 = new Swiper ('.counter-carousel',{
    direction: 'horizontal', 
    autoplay:false,
    slidesPerView: 1,  
    loop:true,    
    pagination: {
      el: ".swiper-pagination-counter",
      clickable: true
    },
  })
  
 

  window.onresize=function(){     
    if (swiper3){
      setTimeout(function(){
        swiper3.update();
      },50)
    }    
}

var initCustom = false
var swiper5 = undefined;
var swiper6 = undefined;
var swiper7 = undefined;

function swiperMode() {
  let mobile = window.matchMedia('(min-width: 0px) and (max-width: 991px)');

  if(mobile.matches) {
    if (!initCustom){
      initCustom = true;
      swiper5 = new Swiper ('#knowledgeArticle',{
        slidesPerView: 2,
        loop: false,
        autoplay:false,  
        spaceBetween:14, 
        pagination: {
          el: ".swiper-pagination-article",
          clickable: true
        },  
        breakpoints: {  
        320: {
          slidesPerView: 1,
        }, 
        578: {
          slidesPerView: 2,
       }, 
      }   
    })
    swiper6 = new Swiper ('#knowledgeWebcast',{
      slidesPerView: 2,
      loop: false,
      autoplay:false,   
      spaceBetween:14,
      pagination: {
        el: ".swiper-pagination-webcast",
        clickable: true
      },        
      breakpoints: {  
        320: {
          slidesPerView: 1,
        }, 
        578: {
          slidesPerView: 2,
       }, 
      }
    })
    swiper7 = new Swiper ('#knowledgeEvent',{
      slidesPerView: 2,
      loop: false,
      autoplay:false,   
      spaceBetween:14,
      pagination: {
        el: ".swiper-pagination-event",
        clickable: true
      },
      breakpoints: {  
        320: {
          slidesPerView: 1,
        }, 
        578: {
          slidesPerView: 2,
       }, 
      }     
    })
    }  
  }
  else{
    if (swiper5){
      swiper5.destroy();
      initCustom = false;
    }   
    if (swiper6){
      swiper6.destroy();
      initCustom = false;
    } 
    if (swiper7){
      swiper7.destroy();
      initCustom = false;
    } 
  }
}
window.addEventListener('load', function() {
  swiperMode();
});
window.addEventListener('resize', function() {
  swiperMode();
});