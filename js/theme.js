function ww() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}


$(document).ready(function(){
    $('.select2').select2({
        minimumResultsForSearch: -1,       
        placeholder: "Temat",
        // multiple: true,
        tags: false,    
        closeOnSelect: false,    
    });    
    $('.select2').val('').trigger('change');

    $('.select2').on('change', function() {
        $(this).next('.select2').addClass('select2-container--chosen');
    });

    $('.select2-filter').select2({
        minimumResultsForSearch: -1,
        dropdownCssClass: 'select2-dropdown-filter'
    });

    $('.select2-default').select2({
        minimumResultsForSearch: -1,
        dropdownCssClass: 'select2-default-dropdown'
    });

    $('.select2-modal').select2({        
        minimumResultsForSearch: -1,
        dropdownCssClass: 'select2-default-dropdown select2-default-modal'
    });

    $('.select2-default-multiple').select2({
        minimumResultsForSearch: -1,
        dropdownCssClass: 'select2-multiple-dropdown'
    });
});
setTimeout(disableSearch, 100)
    function disableSearch(){
        $(".select2-search input").prop("readonly", true);
    }

const selector = document.querySelector("button.header__language--desktop");
const selectorOpen = document.querySelector("div.header__selector--desktop");

    selector.addEventListener("click", showLanguageList);
    function showLanguageList() 
    {            
        selectorOpen.classList.toggle('open');
    };  

    window.onclick = function(e){
        if (!e.target.matches('.language__dropdown--desktop') && !e.target.matches('.header__language--desktop')){            
            selectorOpen.classList.remove('open');
        }
    }

const selectorMobile = document.querySelector("button.header__language--mobile");
const selectorOpenMobile = document.querySelector("div.header__selector--mobile");

    selectorMobile.addEventListener("click", showLanguageListMobile);
    function showLanguageListMobile() 
    {            
        selectorOpenMobile.classList.toggle('open');
    };  

    window.onclick = function(e){
        if (!e.target.matches('.language__dropdown--mobile') && !e.target.matches('.header__language--mobile')){            
            selectorOpenMobile.classList.remove('open');
        }
    }    
 $(function () {
     let fluidNav = $('.header__wrapper').offset().top;
    let fluidHeight = $('.header__wrapper').outerHeight();
     let homeBannerHeight = $('.homeBanner').outerHeight()
     $(window).scroll(function () {        
         if ($(window).scrollTop() > fluidNav) {
             $('body.is--desktop').addClass('navbar-fluid');
             $('.navbar-fluid').attr('style', 'margin-top:' + fluidHeight + 'px');
         } else {
            $('body.is--desktop').removeClass('navbar-fluid');
             $('.navbar-fluid').attr('style', 'margin-top:0px;');
        }
        if ($(window).scrollTop() > homeBannerHeight + fluidHeight){
            $('.header__wrapper').addClass('header__wrapper--smaller');
        }
         else{
             $('.header__wrapper').removeClass('header__wrapper--smaller');
         }
     });
 });
 let prevScrollpos = window.pageYOffset;
 window.onscroll = function() {    
 let currentScrollPos = window.pageYOffset;
 let body = $('body')    
 if($(body).hasClass('is--mobile')){         
 $('#nav').addClass('scrollable');
 if (prevScrollpos > currentScrollPos) {
     $('.scrollable').attr('style', 'top:0px;');
     $('.title-chosen .knowledge__searchbar').attr('style', 'top:64px;');
 } else {
     $('.scrollable').attr('style', 'top:-64px;');
     $('.title-chosen .knowledge__searchbar').attr('style', 'top:0px;');
     }
     prevScrollpos = currentScrollPos;
     } 
     else{             
         $('#nav').removeClass('scrollable');
     }
 }
let msql = window.matchMedia('screen and (max-width:992px)');
if(msql.matches){
   $('body').addClass('is--mobile');
   $('body').removeClass('is--desktop');
}
else{
    $('body').addClass('is--desktop');
    $('body').removeClass('is--mobile');
}
msql.addEventListener('change', event => {
    if(msql.matches){
        $('body').addClass('is--mobile');
        $('body').removeClass('is--desktop');
        $('body').removeClass('navbar-fluid');
     }
     else{
         $('body').addClass('is--desktop');
         $('body').removeClass('is--mobile');
         $('#nav').removeClass('scrollable');
     }
});

/* menu dropdown */

const navButton = document.querySelector('button.nav-collapse-toggle');
const navCollapse = document.querySelector('div.header__nav');
const body = document.querySelector('body')
navButton.addEventListener('click',toggleNav);

function toggleNav(){
    navButton.classList.toggle('active');
    navCollapse.classList.toggle('active');    
    if (loginButton.classList.contains('active') && loginCollapse.classList.contains('active')){
        loginButton.classList.remove('active');
        loginCollapse.classList.remove('active');
    }      
    toggleModal()
}

function toggleModal(){
    let checker = false;
    if($('.header__nav').hasClass('active') || $('.nav-login-mobile').hasClass('active')){
        checker = true;
    }    
    checker ? $('body').addClass('open') : $('body').removeClass('open');
}
/* menu login */

const loginButton = document.querySelector('div.nav-login-mobile');
const loginCollapse = document.querySelector('div.header__account');
loginButton.addEventListener('click',toggleLogin);

function toggleLogin(){
    loginButton.classList.toggle('active');
    loginCollapse.classList.toggle('active');
    if (navButton.classList.contains('active') && navCollapse.classList.contains('active')){
        navButton.classList.remove('active');
        navCollapse.classList.remove('active');               
    }    
    toggleModal()
}
$('.list-group-item-action-dropdown.show').find('.collapse').css('display','block');
$('.list-group-dropdown .chevron').click(function(){
    var item = $(this).parent();    
    if (item.parent().hasClass('show')){        
        item.parent().removeClass('show').find('.collapse').slideUp('true');
    }
    else{ 
        item.parent().addClass('show').find('.collapse').slideDown('true');  
    }
})
$( document ).ready(function() {
    $('.switcher').on( "click", function() {
        if (!$('.packages').hasClass('packages--white'))  
        $('.switcher').addClass('switcher--white'),     
        $('.packages').addClass('packages--white');  
         
        else {
            $('.packages').removeClass('packages--white');
            $('.switcher').removeClass('switcher--white');
        }
    }) 
});

//cookies

$(document).ready(loadCookie);
// $(document).ready(inputPlaceholder);
function loadCookie(){
    $('#cookiePolicy').css('opacity','1');
}

const appHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
 };
 window.addEventListener('resize', appHeight);
appHeight();

$('.faq-title').click(function () {
    let item = $(this).parent()
    if (item.hasClass('open')) {
        item.removeClass('open').find('.faq-content').slideUp('true')
    } else {
        $('.faq-item.open').not(this).stop(true, true).removeClass('open').find('.faq-content').slideUp('true')
        item.addClass('open').find('.faq-content').slideDown('true')
    }
});