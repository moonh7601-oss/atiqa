
  (function () {
    const user = JSON.parse(localStorage.getItem('mu_current_user') || 'null');

    // Agar login nahi hai to wapas signup/login par bhej do
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    // DOM ready hone ke baad naam inject karo
    document.addEventListener('DOMContentLoaded', () => {
      const nameEl = document.getElementById('userName');
      if (nameEl) nameEl.textContent = user.name;

      const emailEl = document.getElementById('userEmail');
      if (emailEl) emailEl.textContent = user.email;
    });
  })();
/* =========================================================
   SIDEBAR TOGGLE — Mobile drawer
   ========================================================= */
   function toggleSidebar() {
    const sidebar = document.querySelector('.Dash-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (!sidebar || !overlay) return;
  
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('show', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  
  /* Close sidebar when a menu link is clicked (mobile) */
  document.querySelectorAll('.menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.Dash-sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });
  
  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const sidebar = document.querySelector('.Dash-sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  /* Reset sidebar state if window resized back to desktop */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      const sidebar = document.querySelector('.Dash-sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  /* =========================================================
   PROFILE DROPDOWN
   ========================================================= */
(function () {
  const profileBtn      = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  if (!profileBtn || !profileDropdown) return;

  // Toggle on click
  profileBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    profileDropdown.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (!profileBtn.contains(e.target)) {
      profileDropdown.classList.remove('open');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') profileDropdown.classList.remove('open');
  });
})();

/* =========================================================
   LOGOUT
   ========================================================= */
function logout() {
  if (!confirm('Are you sure you want to logout?')) return;
  localStorage.removeItem('mu_current_user');
  window.location.href = 'login.html';
}

/* =========================================================
   FILL USER NAME + EMAIL IN DROPDOWN
   (Aapki existing IIFE ke saath yeh bhi chalega)
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(localStorage.getItem('mu_current_user') || 'null');
  if (!user) return;

  const dropName  = document.getElementById('dropName');
  const dropEmail = document.getElementById('dropEmail');
  const welcome   = document.getElementById('userName');

  if (dropName)  dropName.textContent  = user.name  || 'User';
  if (dropEmail) dropEmail.textContent = user.email || '';
  if (welcome)   welcome.textContent   = (user.name || 'User').split(' ')[0];
});