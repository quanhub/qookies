(function($){

  $.fn.qookies = function(options){

    if(typeof(lang) === 'undefined') {
      throw new Error("Lang is not defined!");
    }

    var $settings = $.extend({
      theme: 'theme-default',
      position: 'bottom-right',
      expires: 30,
      path: '/',
      value: '1',
      cookieName: 'qookies-accepted',
      link: {
        text: lang.link.text,
        url: lang.link.url
      },
    }, options);


    var $mainContainer = $(this);
    $mainContainer.hide();

    if(!$mainContainer.hasClass('qookies--' + $settings.position)){
      $mainContainer.addClass('qookies--' + $settings.position);
    }

    if(!$mainContainer.hasClass('qookies-' + $settings.theme)){
      $mainContainer.addClass('qookies-' + $settings.theme);
    }

    var $innerContent = $('<div />').addClass('qookies__content');

    var $header = $('<header />').addClass('qookies__header js-qookies-header');
    var $h1 = $('<h1 />').addClass('qookies__title js-qookies-title');
    var $description = $('<div />').addClass('qookies__description js-cookies-description');
    var $linkContainer = $('<div />').addClass('qookies__link');
    var $link = $('<a />').addClass('js-cookies-link');

    var $footer = $('<div />').addClass('qookies__footer');
    var $btnAccept = $('<a />').addClass('qookies__btn js-cookies-accept');

    $h1.html(lang.title).appendTo($header);
    $description.html(lang.description);

    $link.html($settings.link.text).attr('href', $settings.link.url).appendTo($linkContainer);

    $innerContent.append($header, $description);
    $linkContainer.appendTo($footer);

    $btnAccept.html(lang.buttons.accept).appendTo($footer);
    $mainContainer.append($innerContent, $footer);

    if(Cookies.get($settings.cookieName) !== '1') {
      $mainContainer.fadeIn();
    }

    $btnAccept.on('click', function(ev){
      ev.preventDefault();
      Cookies.set($settings.cookieName, $settings.value, { expires: $settings.expires, path: $settings.path });
      $mainContainer.fadeOut();
    });

  };

})(jQuery);
