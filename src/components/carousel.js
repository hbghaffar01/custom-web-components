class CarouselComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        ${this.style}
      </style>
      <div class="carousel-container">
        <button class="arrow left-arrow">&lt;</button>
        <div class="carousel-slides">
          <slot></slot>
        </div>
        <button class="arrow right-arrow">&gt;</button>
        <div class="carousel-dots"></div>
      </div>
    `;
    this.currentSlide = 0;
    this.slidesContainer = this.shadowRoot.querySelector(".carousel-slides");
    this.dotsContainer = this.shadowRoot.querySelector(".carousel-dots");

    this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
      this.slides = Array.from(this.querySelectorAll("product-card"));
      this.createDots();
      this.goToSlide(this.currentSlide);
    });

    this.shadowRoot.querySelector(".left-arrow").addEventListener("click", () => this.prevSlide());
    this.shadowRoot.querySelector(".right-arrow").addEventListener("click", () => this.nextSlide());

    window.addEventListener('resize', () => this.createDots());
  }

  get style() {
    return `
      .carousel-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        max-width: 1175px;
        margin: 0 auto;
      }
      .carousel-slides {
        display: flex;
        gap: 1.5rem;
        transition: transform 0.5s ease-in-out;
        width: 100%;
      }
      .carousel-slides ::slotted(product-card) {
        flex: 0 0 auto;
        width: 250px;
        margin: 10px;
      }
      .carousel-dots {
        display: flex;
        justify-content: center;
        padding: 10px;
        position: absolute;
        bottom: -10px;
        width: 100%;
        pointer-events: none;
      }
      .carousel-dot {
        width: 12px;
        height: 12px;
        margin: 0 5px;
        background-color: lightblue;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .carousel-dot.active {
        background-color: #007BFF;
      }
      .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        z-index: 1;
      }
      .left-arrow {
        left: 16px;
      }
      .right-arrow {
        right: 0px;
      }
      @media (max-width: 768px) {
        .carousel-container {
          max-width: 580px;
          margin: 0;
          overflow: hidden;
        }
        .arrow {
          padding: 5px;
        }
        .carousel-dot {
          width: 8px;
          height: 8px;
        }
      }
    `;
  }

  createDots() {
    this.dotsContainer.innerHTML = "";
    const itemsPerSlide = window.innerWidth < 767 ? 2 : 4;
    const numDots = Math.ceil(this.slides.length / itemsPerSlide);

    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement("div");
      dot.className = "carousel-dot";
      dot.addEventListener("click", () => this.goToSlide(i * itemsPerSlide));
      this.dotsContainer.appendChild(dot);
    }
    this.updateDots();
  }

  updateDots() {
    const itemsPerSlide = window.innerWidth < 767 ? 2 : 4;
    const dots = this.dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === Math.floor(this.currentSlide / itemsPerSlide));
    });
  }

  goToSlide(index) {
    const itemsPerSlide = window.innerWidth < 767 ? 2 : 4;
    this.currentSlide = index;
    this.updateDots();
    const slideWidthPercentage = 100 / itemsPerSlide;
    this.slidesContainer.style.transform = `translateX(-${index * slideWidthPercentage}%)`;
  }

  nextSlide() {
    const itemsPerSlide = window.innerWidth < 767 ? 2 : 4;
    if (this.currentSlide + itemsPerSlide < this.slides.length) {
      this.goToSlide(this.currentSlide + itemsPerSlide);
    } else {
      this.goToSlide(this.slides.length - itemsPerSlide);
    }
  }

  prevSlide() {
    const itemsPerSlide = window.innerWidth < 767 ? 2 : 4;
    if (this.currentSlide - itemsPerSlide >= 0) {
      this.goToSlide(this.currentSlide - itemsPerSlide);
    } else {
      this.goToSlide(0);
    }
  }
}

customElements.define("carousel-component", CarouselComponent);
