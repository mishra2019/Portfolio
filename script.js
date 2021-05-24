


$(document).ready(function(){
  $(window).scroll(function(){
  	var scroll = $(window).scrollTop();
	 if(scroll > 20){
       $(".navbar").css("background" ,"crimson");
    }
    else{
      $(".navbar").css("background" ,"");
    }

  })
})





$(document).ready(function(){
$(window).scroll(function(){
    if(this.scrollY >20){
      $('.navbar').addClass("sticky");
    }else{
      $('.navbar').removeClass("sticky");
    }
    if(this.scrollY >500){
        $('.scroll-up-btn').addClass("show");
    }
    else{
      $('.scroll-up-btn').removeClass("show");
    }
  });
  // slide-up script
  $('.scroll-up-btn').click(function(){
    $("html").animate({scrollTop: 0});
  });
  // typing animation script
  var typed =new Typed(".typing",{
    strings:["Programmer","Developer"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
  });
  var typed =new Typed(".typing-2",{
    strings:[ "","Developer","Programmer"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
  });
  // toggle menu/navbar section
  $(".menu-btn").click(function(){
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");

  });
});
function sendMail() {
       var link = "mailto:mroshanmishra0072@gmail.com"
       + "?cc=myCCaddress@gmail.com"
       + "&subject=" + escape("This is my subject")
       + "&body=" + escape(document.getElementById('body').value)
   ;

   window.location.href = link;
}
window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above

    var form = document.getElementById("my-form");
    var status = document.getElementById("status");

    // Success and Error functions for after the form is submitted

    function success() {
      form.reset();
      status.classList.add("success");
      status.innerHTML = "Thanks!";
    }

    function error() {
      status.classList.add("error");
      status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });

  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
