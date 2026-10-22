(function () {
'use strict';
const OPEN_CLASS = 'is-open';
/** Mobile menu: toggle button, close on link click and on Escape. */
function initNav() {
    const header = document.getElementById('site-header');
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('primary-nav');
    if (!header || !toggle || !nav)
        return;
    const setOpen = (open) => {
        header.classList.toggle(OPEN_CLASS, open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => {
        setOpen(!header.classList.contains(OPEN_CLASS));
    });
    nav.addEventListener('click', (event) => {
        if (event.target.closest('a'))
            setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape')
            setOpen(false);
    });
}
const SCROLLED_CLASS = 'is-scrolled';
const THRESHOLD_PX = 40;
/** Adds a solid background to the header once the page is scrolled. */
function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header)
        return;
    let ticking = false;
    const update = () => {
        header.classList.toggle(SCROLLED_CLASS, window.scrollY > THRESHOLD_PX);
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    update();
}
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initHeaderScroll();
});
})();


const mainmenulist = document.getElementById("mainmenulist");
const mainmenubutton = document.getElementById("mainmenubutton");

mainmenubutton.addEventListener("click", () => {
  const isOpen = mainmenulist.classList.toggle("is-open");

  mainmenubutton.setAttribute("aria-expanded", isOpen);
  mainmenubutton.textContent = isOpen ? "LESS ↑" : "MORE ↓";
});

// سبد خرید
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const cart = new Map();

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    if (cart.has(name)) {
      cart.get(name).quantity++;
    } else {
      cart.set(name, { price, quantity: 1 });
    }

    renderCart();
  });
});

function renderCart() {
  cartItems.replaceChildren();

  let total = 0;

  if (cart.size === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "سبد خرید خالی است.";
    cartItems.appendChild(emptyItem);
  }

  cart.forEach((item, name) => {
    const li = document.createElement("li");

    li.textContent =
      `${name} × ${item.quantity} — ` +
      `${(item.price * item.quantity).toLocaleString("en-US")} T`;

    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `${total.toLocaleString("en-US")} T`;
}