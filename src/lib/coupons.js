import "../components/button.js";
import { getCoupons } from "../utils/apiUtils.js";

const createCouponCard = (coupon) => {
  const card = document.createElement('div');
  card.className = 'coupon-card';
  
  const code = document.createElement('h3');
  code.innerText = `Code: ${coupon.code}`;

  const discount = document.createElement('p');
  discount.innerText = `Discount: ${coupon.discount}%`;

  const terms = document.createElement('p');
  terms.innerText = `Terms: ${coupon.terms}`;

  const button = document.createElement('custom-button');
  button.setAttribute('text', `Copy ${coupon.code}`);
  button.addEventListener('click', () => {
    navigator.clipboard.writeText(coupon.code)
      .then(() => {
        alert(`Coupon code ${coupon.code} copied to clipboard!`);
      })
      .catch(err => {
        console.error('Failed to copy coupon code: ', err);
      });
  });

  card.appendChild(code);
  card.appendChild(discount);
  card.appendChild(terms);
  card.appendChild(button);
  
  return card;
};

const displayCoupons = async () => {
  try {
    const coupons = await getCoupons();
    const couponsContainer = document.getElementById('coupons-container');
    
    coupons.forEach(coupon => {
      const card = createCouponCard(coupon);
      couponsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load coupons: ', error);
  }
};

document.addEventListener('DOMContentLoaded', displayCoupons);