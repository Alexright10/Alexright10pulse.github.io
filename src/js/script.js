$(document).ready(function(){
  
    $('.carusel__inner').slick(
        {
            speed: 1200,
            autoplay:true,
            adaptiveHeight:true,
            prevArrow:'<button type="button" class="slick-prev"> <img src="icons/chevron left solid.png"></button>',
            nextArrow:'<button type="button" class="slick-next"><img src="icons/chevron right solid.png"></button>',
            responsive:
            [
                {
                    breakpoint: 992,
                    settings: {
                      dots: true,
                      arrows:false
                    }
                      
                }
            ]
            // fade:true,
            // cssEsea:'linear' // выцветание
            // autoPlaySpeed: 1200,
            // adaptiveHeight: true //автопереключение слайдов 
        }
    );

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    //   $('.catalog-item__link').each(function(i) {
    //     $(this).on('click', function(e)
    //     {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    //   });

    //   $('.catalog-item__back').each(function(i) {
    //     $(this).on('click', function(e)
    //     {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    //   });


      function toogleSlide(item)
      {
        $(item).each(function(i) {
            $(this).on('click', function(e)
            {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          });
      };

      toogleSlide('.catalog-item__link');
      toogleSlide('.catalog-item__back')
      //модальные окна

      $('[data-modal=consultation]').on('click',function(){
        $('.overlay , #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click',function(){
        $('.overlay,#consultation,#thanks,#order').fadeOut('slow')
      });
    //   $('.button_mini').on('click',function(){
    //     $('.overlay, #order').fadeIn('slow')
    //   });
      $('.button_mini').each(function(i){
        $(this).on('click',function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
      });


      // $('#consultation-form').validate();
      // $('#consultation form').validate(
      //   {
      //     rules:{
      //       name:"required",
      //       phone:"required",
      //       email:{
      //         required:true,
      //         email:true
      //       }
      //     },
      //     messages:
      //     {
      //       name:"пожалуйста введите свое имя",
      //       phone:"пожалуйста введите свой номер телефона",
      //       email:{
      //         required:"пожалуйста введите свою почту",
      //         email: "неправильно введен адрес"
      //       }
      //     }
      //   }
      // );
      // $('#order form').validate();
      
      function validateForm(form)
      {
        $(form).validate(
          {
            rules:{
              name:"required",
              phone:"required",
              email:{
                required:true,
                email:true
              }
            },
            messages:
            {
              name:"пожалуйста введите свое имя",
              phone:"пожалуйста введите свой номер телефона",
              email:{
                required:"пожалуйста введите свою почту",
                email: "неправильно введен адрес"
              }
            }
          }
        );
      }

      //   function validateForm(form)
      // {
      //   $(form).validate(
      //     {
      //       rules:{
      //         name:"required",
      //         phone:"required",
      //         email:{
      //           required:true,
      //           email:true
      //         }
      //       },
      //       messages:
      //       {
      //         name:"пожалуйста введите свое имя",
      //         phone:"пожалуйста введите свой номер телефона",
      //         email:{
      //           required:"пожалуйста введите свою почту",
      //           email: "неправильно введен адрес"
      //         }
      //       }
      //     }
      //   );
      // }
      validateForm('#consultation-form');
      validateForm('#consultation form');
      validateForm('#order form');

      
      $('input[name=phone]').mask("+7 (999) 999-99-99");
      
      
      
      $('form').submit(function(e){
       
        e.preventDefault();
       
        $.ajax({  
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
          
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    
  });