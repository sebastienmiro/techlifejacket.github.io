var darkMode;

if (localStorage.getItem('dark-mode')) {  
  // if dark mode is in storage, set variable with that value
  darkMode = localStorage.getItem('dark-mode');
} else {  
  // if dark mode is not in storage, set variable to 'light'
  darkMode = 'light';  
}

if (darkMode == 'dark') {
  // if the above is 'dark' then apply 'page-dark-mode' class to body
  $("body").toggleClass("page-dark-mode");  
  // Toggle mode on click event
  $(function() {
    $('#change-skin').on('click', function () {
      $("body").toggleClass("page-dark-mode");
      BeautifulJekyllJS.initNavbar();
      darkMode = 'light';
      localStorage.setItem('dark-mode', 'light'); 
    });
   });
}
else {
  $(function() {
    $('#change-skin').on('click', function () {
      $("body").toggleClass("page-dark-mode");
      darkMode = 'dark';
      localStorage.setItem('dark-mode', 'dark'); 
      BeautifulJekyllJS.initNavbar();
    });
   });
   
}
