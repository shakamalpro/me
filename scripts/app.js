$(document).ready(function () {

  // light/dark theme toggle with persistence
  var themeToggle = $('#themeToggle');
  var themeMeta = $('meta[name="theme-color"]');

  var moonIcon = themeToggle.find('.moon-icon');
  var sunIcon = themeToggle.find('.sun-icon');

  function setTheme(theme) {
    var isDark = theme === 'dark';
    $('body').toggleClass('theme-dark', isDark);
    localStorage.setItem('portfolio-theme', theme);
    moonIcon.toggle(!isDark);
    sunIcon.toggle(isDark);
    themeToggle.attr('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    if (themeMeta.length) {
      themeMeta.attr('content', isDark ? '#07111f' : '#f2f6fb');
    }
  }

  var savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    setTheme(savedTheme);
  } else {
    setTheme('light');
  }

  themeToggle.on('click', function () {
    setTheme($('body').hasClass('theme-dark') ? 'light' : 'dark');
  });
  
  // page section scrolling
  $(".menu-link").on('click', function(e) {
    var target = $(this).attr('href');

    if (!target || target.charAt(0) !== '#') {
      return;
    }

    var section = $(target);
    if (!section.length) {
      return;
    }

    e.preventDefault();

    var headerOffset = $('header').outerHeight() + 10;
    var scrollPosition = Math.max(section.offset().top - headerOffset, 0);

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  });

  // menu responsive toggle-button
  $('.menu-icon').on("click", function () {
    var menu = $("header ul");
    menu.toggleClass('showing');
    $(this).attr('aria-expanded', menu.hasClass('showing') ? 'true' : 'false');
  })

  $('header ul li').on("click", function () {
    $("header ul").toggleClass('showing');
  })

  // active navigation link on click
  $('header ul li a').click(function () {
    $('header ul li a').removeClass("active");
    $(this).addClass("active");
  });

  // active navigation link on scroll
  $(window).on('scroll', function () {
    var scrollPos = $(window).scrollTop() + 150;
    var sections = [];

    // Collect all sections and their positions
    $('header ul li a').each(function () {
      var target = $(this).attr('href');
      if (target && target !== '#') {
        var section = $(target);
        if (section.length) {
          sections.push({
            link: $(this),
            top: section.offset().top,
            bottom: section.offset().top + section.outerHeight()
          });
        }
      }
    });

    // Find the section that contains the current scroll position
    var activeLink = null;
    for (var i = sections.length - 1; i >= 0; i--) {
      if (scrollPos >= sections[i].top) {
        activeLink = sections[i].link;
        break;
      }
    }

    $('header ul li a').removeClass("active");
    if (activeLink) {
      activeLink.addClass("active");
    }
  });


});

