class ReviewCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const reviews = JSON.parse(this.getAttribute('reviews') || '[]');
  
      this.shadowRoot.innerHTML = `
        <style>
          .review-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 300px;
            margin: 10px;
            padding: 16px;
            display: flex;
            align-items: center;
            text-align: center;
            flex-direction: column;
          }
          .profile-photo {
            border-radius: 50%;
            width: 80px;
            height: 80px;
            margin-bottom: 16px;
            object-fit: cover;
          }
          .review-content {
            flex: 1;
          }
          .review-content strong {
            display: block;
            font-size: 1.2em;
            margin-bottom: 8px;
          }
          .review-content p {
            color: #555;
            font-size: 0.9em;
            margin: 4px 0;
          }
          .review-content .rating {
            font-weight: bold;
            color: #28a745;
          }
        </style>
        ${reviews.map(review => `
          <div class="review-card">
            <img src="${review.profile_photo_url}" alt="${review.author_name}" class="profile-photo" />
            <div class="review-content">
              <strong>${review.author_name}</strong>
              <p>${review.text}</p>
              <p class="rating">Rating: ${review.rating}</p>
            </div>
          </div>
        `).join('')}
      `;
    }
  }
  
  customElements.define('review-card', ReviewCard);
  