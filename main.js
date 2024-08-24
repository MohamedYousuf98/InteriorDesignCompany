// Navbar

function toggleMenu() {
  const toggleMenu = document.querySelector(".toggleMenu");
  const navigation = document.querySelector(".navigation");
  toggleMenu.classList.toggle("active");
  navigation.classList.toggle("active");
}

// Slider
var swiper = new Swiper(".testimonial-slider", {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    800: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

// Popup
document.addEventListener("DOMContentLoaded", function () {
  var showSliderIcons = document.querySelectorAll(".show-slider");
  var closeBtns = document.querySelectorAll(".close-btn");
  var prevBtns = document.querySelectorAll(".prev");
  var nextBtns = document.querySelectorAll(".next");
  var slideIndexes = Array.from(document.querySelectorAll(".slider-popup")).map(
    () => 0
  );

  showSliderIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      var popupId = icon.getAttribute("data-popup");
      var sliderPopup = document.getElementById(popupId);
      sliderPopup.style.display = "flex";
      var index = Array.from(
        document.querySelectorAll(".slider-popup")
      ).indexOf(sliderPopup);
      showSlides(popupId, slideIndexes[index]);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      var sliderPopup = btn.closest(".slider-popup");
      sliderPopup.style.display = "none";
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      var sliderPopup = btn.closest(".slider-popup");
      var popupId = sliderPopup.id;
      var index = Array.from(
        document.querySelectorAll(".slider-popup")
      ).indexOf(sliderPopup);
      moveSlide(popupId, -1, index);
    });
  });

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      var sliderPopup = btn.closest(".slider-popup");
      var popupId = sliderPopup.id;
      var index = Array.from(
        document.querySelectorAll(".slider-popup")
      ).indexOf(sliderPopup);
      moveSlide(popupId, 1, index);
    });
  });

  function moveSlide(popupId, n, index) {
    slideIndexes[index] += n;
    var sliderPopup = document.getElementById(popupId);
    showSlides(popupId, slideIndexes[index]);
  }

  function showSlides(popupId, n) {
    var sliderPopup = document.getElementById(popupId);
    var slides = sliderPopup.querySelectorAll(".slides img");
    if (slides.length === 0) return; // Return if no slides
    if (n >= slides.length) {
      n = 0; // Wrap to the first slide
    }
    if (n < 0) {
      n = slides.length - 1; // Wrap to the last slide
    }
    slides.forEach((slide, index) => {
      slide.style.display = index === n ? "block" : "none"; // Show current slide
    });
  }
});

// Contact Us Validation
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("emailError").textContent = "";

    // Get input values
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    let valid = true;

    // Validate name
    if (name === "") {
      document.getElementById("nameError").textContent = "Name is required.";
      valid = false;
    }

    // Validate phone number (basic validation for demonstration)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      document.getElementById("phoneError").textContent =
        "Phone number must be 10 digits.";
      valid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent =
        "Invalid email address.";
      valid = false;
    }

    // If all validations pass, submit the form
    if (valid) {
      this.submit();
    }
  });
