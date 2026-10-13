const icons = {
  asados: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c2 3 2.5 5 0 8-2.5-3-2-5 0-8Z"/><path d="M8.5 8c1.4 2.2 1.7 3.7 0 6-1.7-2.3-1.4-3.8 0-6Z"/><path d="M15.5 8c1.4 2.2 1.7 3.7 0 6"/><path d="M5 14c2.8 1.2 5.2 1.8 7 1.8s4.2-.6 7-1.8"/><path d="M7 18h10"/></svg>`,
  rapidas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9.2c0-2.6 2.6-4.7 6-4.7s6 2.1 6 4.7"/><path d="M5 9.2h14"/><path d="M6.2 12.4h11.6"/><path d="M5.6 15.4c.5 2.2 2.7 3.8 6.4 3.8s5.9-1.6 6.4-3.8"/><path d="M8 12.5c.5.8 1.2.9 1.7.2"/></svg>`,
  adiciones: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg>`,
  bebidas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4h8l-1 14a3 3 0 0 1-3 2.7A3 3 0 0 1 9 18L8 4Z"/><path d="M8 8h8"/><path d="M15.5 4c.6-1.2 1.8-2 3.2-2"/></svg>`,
};

const viewEl = document.getElementById("view");

function getCategory(id) {
  return menuData.categories.find((category) => category.id === id);
}

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash) {
    const [name, id] = hash.split("/");
    return { name, id };
  }
  const cat = new URLSearchParams(window.location.search).get("cat");
  if (cat) return { name: "categoria", id: cat };
  return { name: "home" };
}

function goHome() {
  window.location.hash = "";
}

function goCategory(id) {
  window.location.hash = `categoria/${id}`;
}

function orderDishName(category, item) {
  if (category.id === "jugos") return `Jugo de ${item.name}`;
  return item.name;
}

function orderMessage(dishName, extra = "") {
  const detail = extra ? ` ${extra}` : "";
  return `¡Hola, ${menuData.restaurant}! 🔥 Me antojó *${dishName}*${detail} y quiero pedirlo a domicilio. ¿Me lo dejan listo? 😉`;
}

function orderUrl(dishName, extra = "") {
  const phone = contactData.whatsappOrder.phone;
  return `https://wa.me/${phone}?text=${encodeURIComponent(orderMessage(dishName, extra))}`;
}

function juiceChooser(item, index) {
  if (!item.bases) return "";
  const options = item.bases
    .map((base) => {
      const label = base === "leche" ? "En leche" : "En agua";
      return `
        <label class="chulo">
          <input type="radio" name="base-${index}" value="${base}" />
          <span class="chulo-box" aria-hidden="true"></span>
          ${label}
        </label>
      `;
    })
    .join("");
  return `
    <fieldset class="juice-bases">
      <legend>¿En leche o en agua?</legend>
      ${options}
    </fieldset>
  `;
}

function bindJuiceOrders() {
  viewEl.querySelectorAll(".dish[data-juice]").forEach((dish) => {
    const dishName = dish.dataset.juice;
    const btn = dish.querySelector(".order-btn");
    const basesEl = dish.querySelector(".juice-bases");
    if (!btn || !basesEl) return;

    const selectedBase = () => {
      const checked = dish.querySelector("input[type=radio]:checked");
      return checked ? checked.value : "";
    };

    const extraText = (base) => (base === "leche" ? "en leche" : base === "agua" ? "en agua" : "");

    const syncLink = () => {
      const extra = extraText(selectedBase());
      btn.href = orderUrl(dishName, extra);
      btn.setAttribute(
        "aria-label",
        extra
          ? `Pedir ${dishName} ${extra} a domicilio por WhatsApp`
          : `Pedir ${dishName} a domicilio por WhatsApp`
      );
    };

    dish.querySelectorAll("input[type=radio]").forEach((input) => {
      input.addEventListener("change", () => {
        basesEl.classList.remove("is-needed");
        syncLink();
      });
    });

    btn.addEventListener("click", (event) => {
      if (selectedBase()) {
        syncLink();
        return;
      }
      event.preventDefault();
      basesEl.classList.add("is-needed");
    });
  });
}

function renderHome() {
  const cards = menuData.categories
    .map((category, index) => {
      return `
        <button class="category-card" data-id="${category.id}" style="--smoke-delay: ${index * 0.4}s">
          <span class="tacks" aria-hidden="true"><i></i><i></i></span>
          <span class="smoke" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          <span class="icon" aria-hidden="true">${icons[category.id]}</span>
          <h2>${category.name}</h2>
        </button>
      `;
    })
    .join("");

  const socials = contactData.links
    .map((link) => {
      const img = `<img src="${link.icon}" alt="${link.name}" />`;
      if (!link.href) {
        return `<span class="social-btn is-soon" title="${link.name} próximamente">${img}</span>`;
      }
      const extra = link.href.startsWith("http") ? ` target="_blank" rel="noopener noreferrer"` : "";
      return `<a class="social-btn" href="${link.href}" aria-label="${link.name}"${extra}>${img}</a>`;
    })
    .join("");

  viewEl.innerHTML = `
    <header class="home-header">
      <div class="logo-stage">
        <div class="logo-glow" aria-hidden="true"></div>
        <div class="smoke" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="logo-wrap">
          <img src="image/logo.jpeg" alt="Logo de ${menuData.restaurant}" />
        </div>
      </div>
      <p class="kicker">Menú digital</p>
      <p class="tagline">${menuData.tagline}</p>
      <div class="divider" aria-hidden="true"></div>
      <div class="hours">
        <p class="hours-label">${contactData.hours.label}</p>
        <p class="hours-time">${contactData.hours.time}</p>
        <p class="hours-days">${contactData.hours.days}</p>
        <p class="hours-closed">${contactData.hours.closed}</p>
      </div>
      <div class="divider" aria-hidden="true"></div>
    </header>
    <section class="category-grid" aria-label="Menú">${cards}</section>
    <section class="contact">
      <h2>${contactData.title}</h2>
      <div class="socials">${socials}</div>
      <p class="address-label">${contactData.address.label}</p>
      <a
        class="address-link"
        href="${contactData.address.href}"
        target="_blank"
        rel="noopener noreferrer"
      >${contactData.address.lines.join("<br>")}</a>
    </section>
  `;

  viewEl.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => goCategory(card.dataset.id));
  });
}

function renderCategory(id) {
  const category = getCategory(id);
  if (!category) {
    goHome();
    return;
  }

  const note = category.note
    ? `<aside class="note"><strong>Incluye en todos los platos</strong>${category.note}</aside>`
    : "";

  const dishes = category.items
    .map((item, index) => {
      const price = item.priceLabel || formatPrice(item.price);
      const description = item.description ? `<p>${item.description}</p>` : "";
      const dishName = orderDishName(category, item);
      const order = contactData.whatsappOrder;
      const juice = juiceChooser(item, index);
      return `
        <article class="dish"${item.bases ? ` data-juice="${dishName}"` : ""}>
          <span class="tacks" aria-hidden="true"><i></i><i></i></span>
          <div class="dish-main">
            <h3>${item.name}</h3>
            <span class="price">${price}</span>
          </div>
          ${description}
          ${juice}
          <a
            class="order-btn"
            href="${orderUrl(dishName)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pedir ${dishName} a domicilio por WhatsApp"
          >
            <img src="${order.icon}" alt="" />
            ${order.label}
          </a>
        </article>
      `;
    })
    .join("");

  viewEl.innerHTML = `
    <header class="category-header">
      <button class="back-btn" type="button" aria-label="Volver al menú">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 6 9 12l6 6"/>
        </svg>
      </button>
      <div>
        <h1>${category.name}</h1>
      </div>
    </header>
    ${note}
    <section class="dish-list">${dishes}</section>
  `;

  viewEl.querySelector(".back-btn").addEventListener("click", goHome);
  bindJuiceOrders();
}

function render() {
  viewEl.classList.remove("view");
  void viewEl.offsetWidth;
  viewEl.classList.add("view");

  const route = currentRoute();
  if (route.name === "categoria") {
    renderCategory(route.id);
    return;
  }
  renderHome();
}

window.addEventListener("hashchange", render);
render();
