
// ----navbar dropdown start
  const hoverBg = document.querySelector('.hover-bg');
  const links = document.querySelectorAll('#navbar .nav-link');
  const navbar = document.getElementById('navbar');

  links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const linkRect = e.target.getBoundingClientRect();
      const navRect = navbar.getBoundingClientRect();

      hoverBg.style.width = `${linkRect.width}px`;
      hoverBg.style.left = `${linkRect.left - navRect.left}px`;
      hoverBg.style.opacity = '1';
    });
  });

navbar.addEventListener('mouseleave', () => {
  hoverBg.style.opacity = '0';

  document.querySelector('.menu-right')?.classList.remove('active-bg');
  document.querySelectorAll('.submenu-group').forEach(group => {
    group.classList.remove('active-bg');
  });
});
  // ----
  document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const submenuGroups = document.querySelectorAll('.submenu-group[data-section]');
    const thirdLevelGroups = document.querySelectorAll('.submenu-group[data-third]');

    function hideAllSubmenus() {
      submenuGroups.forEach(group => group.classList.add('d-none'));
    }

    function deactivateAllMenus() {
      menuItems.forEach(item => item.classList.remove('active'));
    }

    function hideAllThirdLevel() {
      thirdLevelGroups.forEach(group => group.classList.add('d-none'));
    }

   menuItems.forEach(item => {
  item.addEventListener('mouseenter', function () {
    const section = this.getAttribute('data-section');
    deactivateAllMenus();
    hideAllSubmenus();
    hideAllThirdLevel();

    this.classList.add('active');
    const submenu = document.querySelector(`.submenu-group[data-section="${section}"]`);
    if (submenu) {
      submenu.classList.remove('d-none');
      document.querySelectorAll('.submenu-group').forEach(g => g.classList.remove('active-bg'));
      submenu.classList.add('active-bg');
    }

    const menuRight = document.querySelector('.menu-right');
    if (menuRight) menuRight.classList.add('active-bg');
  });
});
document.querySelectorAll('.submenu-item[data-third]').forEach(item => {
  const thirdKey = item.getAttribute('data-third');
  const thirdMenu = document.querySelector(`.submenu-group[data-third="${thirdKey}"]`);

  item.addEventListener('mouseenter', () => {
    // Deactivate all triggers and hide all third menus
    document.querySelectorAll('.submenu-item[data-third]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.submenu-group[data-third]').forEach(el => {
      el.classList.add('d-none');
      el.classList.remove('active-bg');
    });

    // Activate current trigger
    item.classList.add('active');

    // Show third menu
    if (thirdMenu) {
      thirdMenu.classList.remove('d-none');
      thirdMenu.classList.add('active-bg');
    }
  });

  item.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
      if (!thirdMenu.matches(':hover') && !item.matches(':hover')) {
        item.classList.remove('active');
        if (thirdMenu) {
          thirdMenu.classList.add('d-none');
          thirdMenu.classList.remove('active-bg');
        }
      }
    }, 100); // slight delay to detect hover over third menu
  });

  if (thirdMenu) {
    thirdMenu.addEventListener('mouseleave', () => {
      item.classList.remove('active');
      thirdMenu.classList.add('d-none');
      thirdMenu.classList.remove('active-bg');
    });
  }
});


    hideAllSubmenus();
    const defaultSubmenu = document.querySelector('.submenu-group[data-section="Get Started"]');
    if (defaultSubmenu) defaultSubmenu.classList.remove('d-none');
  });
  
  
// ----navbar dropdown end

  // ---navbar language search start
   const searchInput = document.getElementById("languageSearch");
  const languageItems = document.querySelectorAll(".lang-detail");

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    languageItems.forEach(function (item) {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
  // ---navbar language search end

// --- Language modal dropdown toggle start
const toggleBtn = document.getElementById("langToggle");
const langInfoBox = document.getElementById("langInfo");
const selectedLangSpan = toggleBtn.querySelector("span");
const langDetails = document.querySelectorAll(".lang-detail");


toggleBtn.addEventListener("click", function (e) {
  e.stopPropagation(); 
  langInfoBox.style.display =
    langInfoBox.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", function () {
  langInfoBox.style.display = "none";
});

langInfoBox.addEventListener("click", function (e) {
  e.stopPropagation();
});

langDetails.forEach(function (item) {
  item.addEventListener("click", function () {
    const selectedLangCode = this.getAttribute("data-lang");
    const langTitle = this.querySelector("h4");
    selectedLangSpan.textContent = selectedLangCode || (langTitle ? langTitle.textContent : "EN");
    langInfoBox.style.display = "none";
  });
});

  // Listen for Bootstrap collapse events
  document.querySelectorAll('[data-parent-group]').forEach((collapseEl) => {
    const targetId = '#' + collapseEl.id;
    const icon = document.querySelector(`.toggle-icon[data-target="${targetId}"]`);

    collapseEl.addEventListener('show.bs.collapse', () => {
      if (icon) {
        icon.classList.remove('bi-plus');
        icon.classList.add('bi-dash');
      }
    });

    collapseEl.addEventListener('hide.bs.collapse', () => {
      if (icon) {
        icon.classList.remove('bi-dash');
        icon.classList.add('bi-plus');
      }
    });
  })
// --- Language modal dropdown toggle end

// -----toggle menu start
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const menuBoxes = document.querySelectorAll(".mega-menu-box");
  const navArea = document.querySelector(".navbar-nav");
  const menuContainer = document.querySelector(".mega-menu-container");

  let timeoutId;

  function showMenu(box) {
    menuBoxes.forEach(b => b.classList.remove("active"));
    if (box) box.classList.add("active");
  }

  function hideMenus() {
    menuBoxes.forEach(b => b.classList.remove("active"));
  }

  navLinks.forEach(link => {
    const menuName = link.dataset.menu;
    const relatedBox = document.getElementById(`menu-${menuName}`);

    const openMenu = () => showMenu(relatedBox);

    link.addEventListener("mouseenter", openMenu);

    link.addEventListener("click", e => {
      e.preventDefault();
      showMenu(relatedBox);
    });
  });

  [navArea, menuContainer].forEach(area => {
    area.addEventListener("mouseenter", () => {
      clearTimeout(timeoutId);
    });
    area.addEventListener("mouseleave", () => {
      timeoutId = setTimeout(hideMenus, 200);
    });
  });
  
});

  // ----toggle menu end
  

  // ---slider start
  // const isMobile = window.innerWidth <= 575;
   const swiper = new Swiper(".mySwiper", {
      loop: false,
      speed: 600, 
      pagination:false,
       autoHeight: true,
    });

    const prevBtn = document.querySelector(".custom-nav.prev");
    const nextBtn = document.querySelector(".custom-nav.next");

    function updateNavButtons() {
      const isFirst = swiper.activeIndex === 0;
      const isLast = swiper.activeIndex === swiper.slides.length - 1;

      prevBtn.classList.toggle("hidden", isFirst);
      nextBtn.classList.toggle("hidden", isLast);
    }

    prevBtn.addEventListener("click", () => swiper.slidePrev());
    nextBtn.addEventListener("click", () => swiper.slideNext());

    swiper.on("slideChange", updateNavButtons);
    updateNavButtons();
  // ---slider end

  // --steps for slider
  const steps = document.querySelectorAll(".step");
const progressLine = document.querySelector(".progress-line");

function updateProgress(index) {
  const stepPercent = (index) / (steps.length - 1) * 100;
  progressLine.style.width = `${stepPercent}%`;

  steps.forEach((step, i) => {
    step.classList.toggle("active", i <= index);
  });
}

// Call initially
updateProgress(swiper.activeIndex);

// On slide change
swiper.on("slideChange", () => {
  updateProgress(swiper.activeIndex);
});
