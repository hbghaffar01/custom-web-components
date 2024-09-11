import "../components/review-card.js";
import "../components/button.js";

document.addEventListener("DOMContentLoaded", () => {
  const renderReviews = () => {
    const carouselContainer = document.querySelector("#carousel-component");

    if (carouselContainer) {
      const reviews = [
        {
          author_name: "John Doe",
          profile_photo_url:
            "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
          rating: 5,
          text: "Great place! Exceptional service and fast shipping! The products exceeded my expectations and were exactly as described. Will definitely be shopping here again",
        },
        {
          author_name: "Jane Smith",
          profile_photo_url:
            "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
          rating: 4,
          text: "Fantastic experience! The website was easy to navigate, and my order arrived quickly and in perfect condition. Highly recommend this online store!",
        },
        {
          author_name: "John Doe",
          profile_photo_url:
            "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
          rating: 5,
          text: "Great selection and unbeatable prices! My order arrived promptly, and everything was packed securely. I'll be a repeat customer for sure",
        },
        {
          author_name: "Jane Smith",
          profile_photo_url:
            "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
          rating: 4,
          text: "Absolutely thrilled with my purchase! The quality of the items was top-notch, and the customer service was very helpful and responsive",
        },
        {
          author_name: "John Doe",
          profile_photo_url:
            "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
          rating: 5,
          text: "Shopping here was a breeze! The checkout process was smooth, and my items were delivered faster than expected. Highly satisfied with my experience",
        },
        {
          author_name: "Jane Smith",
          profile_photo_url:
            "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
          rating: 4,
          text: "This online shop is fantastic! The product range is impressive, and the delivery was quick. Everything was as described, and I’m very happy with my order.",
        },
        {
          author_name: "John Doe",
          profile_photo_url:
            "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
          rating: 5,
          text: "I couldn’t be happier with my purchase! The website is user-friendly, the shipping was speedy, and the products are of excellent quality. A+ all around!",
        },
        {
          author_name: "Jane Smith",
          profile_photo_url:
            "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
          rating: 4,
          text: "Great selection and unbeatable prices! My order arrived promptly, and everything was packed securely. I'll be a repeat customer for sure",
        },
      ];

      const carousel = document.createElement("div");
      reviews.forEach((review) => {
        const reviewCard = document.createElement("review-card");
        reviewCard.setAttribute("reviews", JSON.stringify([review]));
        carousel.appendChild(reviewCard);
      });
      carouselContainer.appendChild(carousel);
    } else {
      console.error("Carousel component not found");
    }
  };

  renderReviews();
});
