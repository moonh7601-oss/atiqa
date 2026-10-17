window.addEventListener('scroll',function() {
  let navbar=document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  }
  else{
    navbar.classList.remove('scrolled');
  }
})
function goToSignup() {
  window.location.href="signup.html"
}
/* Hamburger menu toggle for mobile */
function toggleMenu() {
  const navItems = document.querySelector('.navbar-items');
  navItems.classList.toggle('active');
}

/* Close menu when a link is clicked (mobile) */
document.querySelectorAll('.navbar-items ul li a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.navbar-items').classList.remove('active');
  });
});