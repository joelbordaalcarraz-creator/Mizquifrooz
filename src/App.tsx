import { useEffect, useMemo, useState } from "react";
import logo from "./assets/miskyfrooz-logo.webp";
import iceCream from "./public/helado.webp";
import milkshakePoster from "./public/milshake.webp";
import mixPoster from "./public/mix.webp";
import oreoPoster from "./public/oreo.webp";
import dessertPoster from "./public/postre.webp";
import yogurtPoster from "./public/yogurt.webp";
import crepePoster from "./public/crepe.webp";
import galleryPoster from "./public/Galeria.webp";
import toppingsImage from "./public/topings.webp";
import coverImage from "./public/portada.webp";
import menuCover from "./public/portadacarta.webp";

type IconName =
  | "arrow"
  | "bag"
  | "chart"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "heart"
  | "home"
  | "external"
  | "lock"
  | "map-pin"
  | "message"
  | "menu"
  | "minus"
  | "orders"
  | "plus"
  | "search"
  | "send"
  | "settings"
  | "shop"
  | "sparkle"
  | "star"
  | "users";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
  chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19V3" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
  external: <><path d="M14 3h7v7M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></>,
  "map-pin": <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  minus: <path d="M5 12h14" />,
  orders: <><path d="M6 3h12v18H6z" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  shop: <><path d="M4 10v10h16V10M3 4h18l-2 6H5L3 4Z" /><path d="M9 20v-6h6v6" /></>,
  sparkle: <><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  users: <><circle cx="9" cy="8" r="4" /><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 4a4 4 0 0 1 0 8M18 15a6 6 0 0 1 4 6" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, disabled, type = "button", className = "" }: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "dark" | "icon";
  icon?: IconName; onClick?: () => void; disabled?: boolean; type?: "button" | "submit"; className?: string;
}) {
  return <button type={type} className={`button button--${variant} ${className}`} onClick={onClick} disabled={disabled}>{children}{icon && <Icon name={icon} size={18} />}</button>;
}

function Heading({ children, as = "h2", className = "" }: { children: React.ReactNode; as?: "h1" | "h2" | "h3" | "h4"; className?: string }) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

const images = {
  hero: yogurtPoster,
  fruit: mixPoster,
  strawberry: yogurtPoster,
  smoothie: milkshakePoster,
  shake: crepePoster,
};

const products = [
  { id: 1, name: "Frooz frutos rojos", description: "Yogurt natural, fresa, arándanos y granola crocante.", price: 14.9, category: "Frozen Yogurt", image: images.hero, badge: "Más pedido" },
  { id: 2, name: "Frooz tropical", description: "Yogurt natural, mango fresco, plátano y coco.", price: 15.9, category: "Frozen Yogurt", image: images.fruit, badge: "Nuevo" },
  { id: 3, name: "Berry milkshake", description: "Frutos rojos, yogurt y leche cremosa.", price: 13.9, category: "Bebidas", image: images.smoothie, badge: "" },
  { id: 4, name: "Fresa dream", description: "Fresa natural, crema ligera y topping crujiente.", price: 12.9, category: "Promociones", image: images.shake, badge: "20% dto." },
];

const galleryImages = [
  { src: milkshakePoster, alt: "Variedad de Misky Shakes" },
  { src: oreoPoster, alt: "Frozen yogurt Miskyfrooz con Oreo" },
  { src: yogurtPoster, alt: "Yogurt helado Miskyfrooz con frutas" },
  { src: dessertPoster, alt: "Postres y promociones Miskyfrooz" },
  { src: mixPoster, alt: "Variedad de frozen yogurt Miskyfrooz" },
  { src: crepePoster, alt: "Waffles Miskyfrooz" },
  { src: galleryPoster, alt: "Equipo Miskyfrooz disfrutando sus productos" },
];

const toppings = [
  { name: "Fresa", extra: 0, image: images.strawberry },
  { name: "Mango", extra: 0, image: images.fruit },
  { name: "Arándanos", extra: 0, image: images.hero },
  { name: "Granola", extra: 0, image: images.fruit },
  { name: "Oreo", extra: 1.5, image: images.shake },
  { name: "Brownie", extra: 1.5, image: images.smoothie },
  { name: "Gomitas", extra: 1.5, image: images.hero },
  { name: "Coco", extra: 1.5, image: images.fruit },
];

type CartItem = { id: number; name: string; image: string; price: number; size: string; toppings: string[]; sauce: string; quantity: number };
type DeliveryOrder = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  reference: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  createdAt: string;
  status: "Recibido" | "En preparación" | "En camino" | "Entregado";
};

const DELIVERY_ORDERS_KEY = "miskyfrooz:delivery-orders";
const DELIVERY_ORDERS_EVENT = "miskyfrooz:delivery-orders-updated";

function isDeliveryOrder(value: unknown): value is DeliveryOrder {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Record<string, unknown>;
  return typeof order.id === "string"
    && typeof order.customerName === "string"
    && typeof order.phone === "string"
    && typeof order.address === "string"
    && typeof order.reference === "string"
    && typeof order.total === "number"
    && typeof order.createdAt === "string"
    && ["Recibido", "En preparación", "En camino", "Entregado"].includes(String(order.status))
    && Array.isArray(order.items)
    && order.items.every((item: unknown) => typeof item === "object" && item !== null
      && typeof (item as Record<string, unknown>).name === "string"
      && typeof (item as Record<string, unknown>).quantity === "number"
      && typeof (item as Record<string, unknown>).price === "number");
}

function readDeliveryOrders(): DeliveryOrder[] {
  const storedOrders = localStorage.getItem(DELIVERY_ORDERS_KEY);
  if (!storedOrders) return [];
  const parsed: unknown = JSON.parse(storedOrders);
  if (!Array.isArray(parsed) || !parsed.every(isDeliveryOrder)) {
    throw new Error("El registro local de pedidos de delivery tiene un formato inválido.");
  }
  return parsed;
}

function saveDeliveryOrder(order: DeliveryOrder) {
  const currentOrders = readDeliveryOrders();
  localStorage.setItem(DELIVERY_ORDERS_KEY, JSON.stringify([order, ...currentOrders]));
  window.dispatchEvent(new Event(DELIVERY_ORDERS_EVENT));
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [deliveryQuantities, setDeliveryQuantities] = useState<Record<number, number>>({});
  const [deliveryError, setDeliveryError] = useState("");
  const [deliveryNotice, setDeliveryNotice] = useState("");

  const updateDeliveryQuantity = (productId: number, change: number) => {
    setDeliveryQuantities((current) => {
      const quantity = Math.max(0, (current[productId] ?? 0) + change);
      return { ...current, [productId]: quantity };
    });
    setDeliveryError("");
  };

  const submitDeliveryOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedProducts = products
      .filter((product) => (deliveryQuantities[product.id] ?? 0) > 0)
      .map((product) => ({ ...product, quantity: deliveryQuantities[product.id] }));

    if (selectedProducts.length === 0) {
      setDeliveryError("Selecciona al menos un producto para continuar.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    try {
      const order: DeliveryOrder = {
        id: crypto.randomUUID(),
        customerName: String(formData.get("delivery-name")),
        phone: String(formData.get("delivery-phone")),
        address: String(formData.get("delivery-address")),
        reference: String(formData.get("delivery-reference") || ""),
        items: selectedProducts.map(({ name, quantity, price }) => ({ name, quantity, price })),
        total: selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0),
        createdAt: new Date().toISOString(),
        status: "Recibido",
      };
      saveDeliveryOrder(order);
      setDeliveryOpen(false);
      setDeliveryQuantities({});
      setDeliveryError("");
      setDeliveryNotice("¡Pedido exitoso! Se envió al panel de caja.");
      window.setTimeout(() => setDeliveryNotice(""), 3500);
    } catch (error) {
      console.error("No se pudo guardar el pedido de delivery.", error);
      setDeliveryError("No pudimos enviar el pedido al panel de caja. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Navegación principal">
          <button
            className={`menu-button ${menuOpen ? "menu-button--open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            <span />
            <span />
            <span />
          </button>
          <a className="logo-button" href="/" aria-label="Miskyfrooz, Inicio">
            <img className="logo" src={logo} alt="Miskyfrooz" />
          </a>
          <button className="delivery-button" type="button" onClick={() => setDeliveryOpen(true)}>
            <span>Delivery</span>
          </button>
          <div id="site-menu" className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
            <a href="/" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="/carta" onClick={() => setMenuOpen(false)}>Carta</a>
            <a href="/contactanos" onClick={() => setMenuOpen(false)}>Contactanos</a>
          </div>
        </nav>
      </header>
      {deliveryOpen && <div className="overlay delivery-overlay" role="dialog" aria-modal="true" aria-labelledby="delivery-title" onMouseDown={(event) => event.target === event.currentTarget && setDeliveryOpen(false)}>
        <section className="delivery-modal">
          <div className="delivery-modal-head">
            <div><div className="eyebrow eyebrow--pink">Fresco hasta tu puerta</div><Heading as="h2" className="delivery-title" >Pide tu delivery</Heading><p>Elige tus favoritos y completa tus datos de entrega.</p></div>
            <button type="button" className="delivery-close" aria-label="Cerrar ventana de delivery" onClick={() => setDeliveryOpen(false)}><Icon name="close" /></button>
          </div>
          <form className="delivery-modal-body" onSubmit={submitDeliveryOrder}>
            <section className="delivery-products">
              <div className="delivery-section-title"><span>1</span><div><strong>Selecciona tus productos</strong><small>Elige uno o varios productos.</small></div></div>
              <div className="delivery-product-list">
                {products.map((product) => {
                  const quantity = deliveryQuantities[product.id] ?? 0;
                  return <article className={`delivery-product ${quantity ? "delivery-product--selected" : ""}`} key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div className="delivery-product-info"><strong>{product.name}</strong><small>{product.category}</small><b>S/ {product.price.toFixed(2)}</b></div>
                    <div className="delivery-quantity" aria-label={`Cantidad de ${product.name}`}>
                      <button type="button" aria-label={`Quitar uno de ${product.name}`} disabled={quantity === 0} onClick={() => updateDeliveryQuantity(product.id, -1)}><Icon name="minus" size={14} /></button>
                      <span aria-live="polite">{quantity}</span>
                      <button type="button" aria-label={`Agregar uno de ${product.name}`} onClick={() => updateDeliveryQuantity(product.id, 1)}><Icon name="plus" size={14} /></button>
                    </div>
                  </article>;
                })}
              </div>
              {deliveryError && <p className="delivery-error" role="alert">{deliveryError}</p>}
            </section>
            <section className="delivery-details">
              <div className="delivery-section-title"><span>2</span><div><strong>Datos de entrega</strong><small>¿A dónde llevamos tu pedido?</small></div></div>
              <div className="delivery-form-fields">
                <label>Nombre completo *<input name="delivery-name" autoComplete="name" placeholder="Ej. Ana Torres" required /></label>
                <label>Número de celular *<input name="delivery-phone" type="tel" autoComplete="tel" placeholder="Ej. 987 654 321" required /></label>
                <label className="delivery-field-wide">Dirección de entrega *<input name="delivery-address" autoComplete="street-address" placeholder="Calle, avenida y número" required /></label>
                <label className="delivery-field-wide">Referencia <input name="delivery-reference" placeholder="Urbanización, edificio o punto de referencia" /></label>
              </div>
              <div className="delivery-order-total"><span>Productos seleccionados</span><strong>{Object.values(deliveryQuantities).reduce((sum, quantity) => sum + quantity, 0)}</strong><span className="delivery-total-label">Subtotal</span><strong>S/ {products.reduce((sum, product) => sum + product.price * (deliveryQuantities[product.id] ?? 0), 0).toFixed(2)}</strong></div>
              <button type="submit" className="delivery-submit">Continuar <Icon name="arrow" size={16} /></button>
              <small className="delivery-note">Confirmaremos contigo el costo y la disponibilidad del delivery.</small>
            </section>
          </form>
        </section>
      </div>}
      {deliveryNotice && <div className="toast toast--success" role="status"><span><Icon name="check" size={17} /></span>{deliveryNotice}</div>}
    </>
  );
}

function App() {
  const [customizing, setCustomizing] = useState<(typeof products)[number] | null>(null);
  const [size, setSize] = useState("Mediano");
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["Fresa", "Granola"]);
  const [sauce, setSauce] = useState("Chocolate");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [toast, setToast] = useState("");

  const sizeData = size === "Pequeño" ? { price: 11.9, included: 2 } : size === "Grande" ? { price: 17.9, included: 4 } : { price: 14.9, included: 3 };
  const extraCount = Math.max(0, selectedToppings.length - sizeData.included);
  const customPrice = sizeData.price + extraCount * 1.5;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const toggleTopping = (name: string) => {
    setSelectedToppings((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  };

  const addCustom = () => {
    if (!customizing) return;
    setCart((current) => [...current, {
      id: Date.now(), name: customizing.name, image: customizing.image, price: customPrice,
      size, toppings: selectedToppings, sauce, quantity: 1,
    }]);
    setCustomizing(null);
    notify("Tu Frooz personalizado se agregó al carrito");
  };

  const currentPage = window.location.pathname.replace(/\/+$/, "") || "/";

  if (currentPage === "/caja") {
    return <AdminView onStore={() => window.location.assign("/")} />;
  }

  if (currentPage === "/carta") {
    return (
      <div className="app-shell">
        <SiteHeader />
        <main className="carta-page">
          <section className="carta-hero">
            <img src={menuCover} alt="" />
            <div className="carta-hero-copy">
              <div className="eyebrow eyebrow--light">Hecho fresco, hecho a tu gusto</div>
              <Heading as="h1">Nuestra carta</Heading>
              <p>Descubre tus favoritos preparados con ingredientes frescos.</p>
              <a className="button button--primary" href="#carta-productos">Explorar productos <Icon name="arrow" size={18} /></a>
            </div>
          </section>
          <section className="carta-products" id="carta-productos">
            <div className="container">
              <div className="section-head">
                <div><div className="eyebrow eyebrow--pink">Elige tu favorito</div><Heading>Algo delicioso te espera</Heading></div>
              </div>
              <div className="menu-grid">
                {products.map((product) => (
                  <article className="menu-card" key={product.id}>
                    <div className="menu-card-image"><img src={product.image} alt={product.name} /></div>
                    <div className="menu-card-content">
                      <div className="menu-card-title"><Heading as="h2">{product.name}</Heading><strong>S/ {product.price.toFixed(2)}</strong></div>
                      <p>{product.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (currentPage === "/contactanos") {
    return (
      <div className="app-shell">
        <SiteHeader />
        <main className="inner-page contact-page container">
          <div className="contact-layout">
            <aside className="contact-sidebar">
              <section className="contact-info-card">
                <div className="contact-info-heading">
                  <Heading as="h2" className="contact-info-title">Atención al Cliente</Heading>
                  <span className="open-badge"><i /> Abierto ahora</span>
                </div>
                <div className="contact-info-row">
                  <span className="contact-info-icon"><Icon name="map-pin" size={19} /></span>
                  <div>
                    <span className="contact-label">Ubicación</span>
                    <strong>Jr. José Olaya 106</strong>
                    <p>Huamanga — Ayacucho (a 2 cuadras de la Plaza Mayor)</p>
                    <a className="map-link" href="https://maps.google.com/?q=Jr.+Jos%C3%A9+Olaya+106,+Huamanga,+Ayacucho" target="_blank" rel="noreferrer">
                      Ver en Google Maps <Icon name="external" size={13} />
                    </a>
                  </div>
                </div>
                <div className="contact-info-row contact-hours">
                  <span className="contact-info-icon"><Icon name="clock" size={19} /></span>
                  <div>
                    <span className="contact-label">Horario</span>
                    <p><span>Lunes a Viernes:</span><strong>07:00 am – 05:30 pm</strong></p>
                    <p><span>Sábados y Domingos:</span><strong>07:00 am – 06:00 pm</strong></p>
                  </div>
                </div>
                <a className="contact-whatsapp" href="https://wa.me/51980723422" target="_blank" rel="noreferrer">
                  <Icon name="message" size={17} /> Escribir por WhatsApp (+51 980 723 422)
                </a>
              </section>
              <div className="contact-map">
                <iframe
                  title="Mapa de ubicación de Miskyfrooz en Huamanga"
                  src="https://maps.google.com/maps?q=Jr.+Jos%C3%A9+Olaya+106,+Huamanga,+Ayacucho&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
            <section className="contact-form-card">
              <Heading as="h1">Envíanos un Mensaje</Heading>
              <p className="contact-form-intro">Respondemos todas las consultas a la brevedad posible.</p>
              <form onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const message = [
                  `Nombre: ${formData.get("name")}`,
                  `Teléfono / WhatsApp: ${formData.get("phone")}`,
                  `Correo electrónico: ${formData.get("email")}`,
                  `Motivo: ${formData.get("reason")}`,
                  `Mensaje: ${formData.get("message")}`,
                ].join("\n");
                window.open(`https://wa.me/51980723422?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
              }}>
                <div className="contact-fields">
                  <label>
                    Nombre completo *
                    <input name="name" type="text" placeholder="Ej. Juan Pérez" autoComplete="name" required />
                  </label>
                  <label>
                    Teléfono / WhatsApp *
                    <input name="phone" type="tel" placeholder="Ej. 987 654 321" autoComplete="tel" required />
                  </label>
                  <label className="contact-field-wide">
                    Correo electrónico *
                    <input name="email" type="email" placeholder="tucorreo@ejemplo.com" autoComplete="email" required />
                  </label>
                  <label className="contact-field-wide">
                    Motivo de consulta *
                    <select name="reason" defaultValue="" required>
                      <option value="" disabled>Selecciona el motivo de tu consulta</option>
                      <option>Consulta sobre productos</option>
                      <option>Delivery y pedidos</option>
                      <option>Eventos y promociones</option>
                      <option>Otro motivo</option>
                    </select>
                  </label>
                  <label className="contact-field-wide">
                    Mensaje *
                    <textarea name="message" placeholder="Escribe tu mensaje aquí..." required />
                  </label>
                </div>
                <button className="contact-submit" type="submit">Enviar mensaje <Icon name="send" size={16} /></button>
              </form>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <SiteHeader />

      <main>
        <section className="hero container" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><Icon name="sparkle" size={17} /> Hecho fresco, hecho a tu gusto</div>
            <Heading as="h1">Tu momento más <span>delicioso</span> empieza aquí</Heading>
            <p className="hero-text">Disfruta nuestro frozen yogurt, frutas frescas, toppings y todas tus combinaciones favoritas.</p>
            <div className="hero-proof">
              <div className="avatar-stack"><span>MF</span><span>YA</span><span>+2k</span></div>
              <div><div className="stars">★★★★★</div><p>Favorito de más de 2,000 froozlovers</p></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-blob"></div>
            <img src={iceCream} alt="Helado de yogurt con frutas y toppings Miskyfrooz" />
            <div className="floating-card floating-card--rating"><span className="floating-icon"><Icon name="heart" size={18} /></span><div><strong>4.9</strong><small>Amor en cada cucharada</small></div></div>
            <div className="floating-card floating-card--fresh"><span className="floating-icon floating-icon--green"><Icon name="check" size={18} /></span><div><strong>100% fresco</strong><small>Fruta seleccionada cada día</small></div></div>
          </div>
        </section>

        <section className="products-section" id="productos">
          <div className="container">
            <div className="section-head">
              <div><div className="eyebrow eyebrow--pink">Nuestros favoritos</div><Heading>Elige tu antojo de hoy</Heading></div>
            </div>
            <div className="image-carousel" aria-label="Galería de imágenes de Miskyfrooz">
              <div className="image-carousel-track">
                {[0, 1].map((copy) => (
                  <div className="image-carousel-group" key={copy} aria-hidden={copy === 1}>
                    {galleryImages.map((image) => (
                      <div className="image-carousel-card" key={image.src}>
                        <img src={image.src} alt={copy === 0 ? image.alt : ""} draggable="false" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="experience container" id="experiencia">
          <div className="experience-photo"><img src={toppingsImage} alt="Frozen yogurt Miskyfrooz con frutas y toppings" /><div className="photo-stamp"><Icon name="sparkle" /><span>Tu mezcla.<br />Tus reglas.</span></div></div>
          <div className="experience-copy">
            <div className="eyebrow eyebrow--pink">Frooz a tu manera</div>
            <Heading>Tan único como tu antojo</Heading>
            <p>Elige tu tamaño, combina frutas y toppings, termina con tu salsa favorita. Nosotros lo preparamos al momento.</p>
            <div className="steps">
              {[["1", "Elige tu base", "Yogurt natural, fresa o maracuyá."], ["2", "Suma tus favoritos", "Frutas, granola, galletas y mucho más."], ["3", "Recíbelo fresco", "Delivery rápido desde tu tienda más cercana."]].map(([n, title, text]) => <div className="step" key={n}><span>{n}</span><div><Heading as="h4">{title}</Heading><p>{text}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="stores-section" id="tiendas">
          <img className="stores-cover" src={coverImage} alt="Familia disfrutando Miskyfrooz en Ayacucho" />
          <div className="container stores">
            <div className="stores-copy">
              <div className="eyebrow eyebrow--light">Siempre cerca de ti</div>
              <Heading>De nuestra tienda<br />a tu puerta</Heading>
              <p>Selecciona tu local más cercano y recibe tu Frooz fresco en pocos minutos.</p>
              <Button variant="dark" icon="arrow">Ver zonas de delivery</Button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div><img src={logo} alt="Miskyfrooz" className="footer-logo" /><p>Momentos deliciosos, frescos<br />y hechos a tu manera.</p><div className="socials"><span>ig</span><span>f</span><span>tk</span></div></div>
          <div><strong>Explora</strong><a href="#productos">Productos</a><a href="#experiencia">Cómo pedir</a><a href="#tiendas">Tiendas</a><a href="#productos">Promociones</a></div>
          <div><strong>Ayuda</strong><a href="#contacto">Preguntas frecuentes</a><a href="#contacto">Términos y condiciones</a><a href="#contacto">Política de privacidad</a><a href="#contacto">Libro de reclamaciones</a></div>
          <div id="contacto"><strong>Hablemos</strong><a href="tel:+51999999999">WhatsApp +51 999 999 999</a><p>Lun–Dom: 11:00–22:00</p><p>Ayacucho, Perú</p></div>
        </div>
        <div className="container copyright">© 2025 Miskyfrooz. Hecho con frescura en Perú.<span>Calidad que se disfruta.</span><a className="admin-footer-link" href="/caja" aria-label="Ir al panel administrador" title="Panel administrador"><Icon name="lock" size={14} /></a></div>
      </footer>

      {customizing && <div className="overlay" role="dialog" aria-modal="true" aria-label="Personaliza tu producto">
        <div className="customizer">
          <div className="customizer-head"><div><div className="eyebrow eyebrow--pink">Hazlo a tu gusto</div><Heading>Personaliza tu Frozen Yogurt</Heading></div><Button variant="icon" onClick={() => setCustomizing(null)}><Icon name="close" /></Button></div>
          <div className="customizer-content">
            <div className="customizer-options">
              <div className="option-section"><div className="option-title"><span>1</span><div><Heading as="h3">Elige tu tamaño</Heading><p>Cada tamaño incluye toppings sin costo.</p></div></div>
                <div className="size-grid">{[["Pequeño", "S/ 11.90", "2 toppings"], ["Mediano", "S/ 14.90", "3 toppings"], ["Grande", "S/ 17.90", "4 toppings"]].map(([name, price, hint]) => <button key={name} className={`size-card ${size === name ? "size-card--active" : ""}`} onClick={() => setSize(name)}><span>{name}</span><strong>{price}</strong><small>{hint}</small>{size === name && <i><Icon name="check" size={14} /></i>}</button>)}</div>
              </div>
              <div className="option-section"><div className="option-title option-title--space"><span>2</span><div><Heading as="h3">Elige tus toppings</Heading><p>Puedes elegir {sizeData.included} incluidos. Luego, S/ 1.50 c/u.</p></div><strong className={extraCount ? "counter counter--extra" : "counter"}>{selectedToppings.length}/{sizeData.included}</strong></div>
                <div className="topping-grid">{toppings.map((topping) => { const active = selectedToppings.includes(topping.name); const isExtra = active && selectedToppings.indexOf(topping.name) >= sizeData.included; return <button key={topping.name} className={`topping-card ${active ? "topping-card--active" : ""}`} onClick={() => toggleTopping(topping.name)}><img src={topping.image} alt="" /><span>{topping.name}</span><small>{isExtra || topping.extra > 0 && selectedToppings.length >= sizeData.included ? "+ S/ 1.50" : "Incluido"}</small><i>{active ? <Icon name="check" size={13} /> : <Icon name="plus" size={13} />}</i></button>; })}</div>
                {extraCount > 0 && <div className="extra-notice"><Icon name="sparkle" size={18} /><span><strong>{sizeData.included} toppings incluidos + {extraCount} adicional</strong><small>Total adicional: S/ {(extraCount * 1.5).toFixed(2)}</small></span></div>}
              </div>
              <div className="option-section"><div className="option-title"><span>3</span><div><Heading as="h3">Elige tu salsa</Heading><p>Un toque final para tu combinación.</p></div></div><div className="sauce-row">{["Chocolate", "Fresa", "Caramelo", "Maracuyá"].map((item) => <button key={item} className={sauce === item ? "sauce sauce--active" : "sauce"} onClick={() => setSauce(item)}><i></i>{item}</button>)}</div></div>
            </div>
            <aside className="order-summary">
              <img src={customizing.image} alt={customizing.name} />
              <Heading as="h3">Tu Frooz</Heading>
              <dl><div><dt>Tamaño</dt><dd>{size}</dd></div><div><dt>Base</dt><dd>Yogurt natural</dd></div><div><dt>Toppings</dt><dd>{selectedToppings.join(", ") || "Sin toppings"}</dd></div><div><dt>Salsa</dt><dd>{sauce}</dd></div>{extraCount > 0 && <div><dt>Adicionales</dt><dd>S/ {(extraCount * 1.5).toFixed(2)}</dd></div>}</dl>
              <div className="summary-total"><span>Total</span><strong>S/ {customPrice.toFixed(2)}</strong></div>
              <Button icon="bag" onClick={addCustom}>Agregar al carrito</Button>
            </aside>
          </div>
        </div>
      </div>}

      {cartOpen && <div className="overlay overlay--drawer" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}>
        <aside className="cart-drawer">
          {!checkout && !confirmed && <><div className="drawer-head"><div><div className="eyebrow eyebrow--pink">Tu selección</div><Heading>Mi pedido <span>({cart.length})</span></Heading></div><Button variant="icon" onClick={() => setCartOpen(false)}><Icon name="close" /></Button></div>
            <div className="cart-items">{cart.length === 0 ? <div className="empty-cart"><span><Icon name="bag" size={32} /></span><Heading as="h3">Tu carrito está esperando</Heading><p>Agrega algo delicioso para comenzar.</p><Button onClick={() => setCartOpen(false)}>Explorar productos</Button></div> : cart.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div><Heading as="h4">{item.name}</Heading><p>{item.size}{item.toppings.length ? ` · ${item.toppings.join(", ")}` : ""}</p><div className="quantity"><button onClick={() => setCart((current) => current.map((entry) => entry.id === item.id ? { ...entry, quantity: Math.max(1, entry.quantity - 1) } : entry))}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button onClick={() => setCart((current) => current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry))}><Icon name="plus" size={14} /></button></div></div><div className="cart-price"><strong>S/ {(item.price * item.quantity).toFixed(2)}</strong><button onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))}>Eliminar</button></div></article>)}</div>
            {cart.length > 0 && <div className="drawer-bottom"><div className="promo-input"><input placeholder="Código de descuento" aria-label="Código de descuento" /><Button variant="secondary">Aplicar</Button></div><div className="totals"><div><span>Subtotal</span><strong>S/ {subtotal.toFixed(2)}</strong></div><div><span>Delivery</span><strong>S/ 5.00</strong></div><div className="total-line"><span>Total</span><strong>S/ {(subtotal + 5).toFixed(2)}</strong></div></div><Button icon="arrow" onClick={() => setCheckout(true)}>Continuar pedido</Button><small className="secure"><Icon name="check" size={14} /> Compra segura y protegida</small></div>}
          </>}
          {checkout && !confirmed && <Checkout total={subtotal + 5} onBack={() => setCheckout(false)} onConfirm={() => setConfirmed(true)} />}
          {confirmed && <Confirmation total={subtotal + 5} onClose={() => { setConfirmed(false); setCheckout(false); setCartOpen(false); setCart([]); }} />}
        </aside>
      </div>}
      {toast && <div className="toast"><span><Icon name="check" size={17} /></span>{toast}</div>}
    </div>
  );
}

function Checkout({ total, onBack, onConfirm }: { total: number; onBack: () => void; onConfirm: () => void }) {
  const [store, setStore] = useState("Mariscal Cáceres");
  const [payment, setPayment] = useState("Yape");
  return <div className="checkout"><div className="drawer-head"><div><button className="back-link" onClick={onBack}>← Volver al carrito</button><Heading>Finaliza tu pedido</Heading></div></div><div className="checkout-progress"><span className="active">1</span><i></i><span className="active">2</span><i></i><span>3</span></div>
    <div className="checkout-section"><div className="option-title"><span>1</span><Heading as="h3">Datos de entrega</Heading></div><div className="field-grid"><label>Nombre completo<input placeholder="Ana Torres" /></label><label>Teléfono<input placeholder="999 999 999" /></label><label className="field-wide">Dirección<input placeholder="Av. Principal 123" /></label><label>Distrito<select><option>Ayacucho</option><option>San Juan Bautista</option></select></label><label>Referencia<input placeholder="Frente al parque" /></label></div></div>
    <div className="checkout-section"><div className="option-title"><span>2</span><Heading as="h3">Selecciona tu tienda</Heading></div><div className="select-cards">{["Mariscal Cáceres", "Jr. Lima"].map((item, index) => <button className={store === item ? "select-card select-card--active" : "select-card"} onClick={() => setStore(item)} key={item}><span><Icon name="shop" /></span><div><strong>Miskyfrooz — {item}</strong><small>{index ? "25–35 min" : "20–30 min"} · Abierto</small></div><i>{store === item && <Icon name="check" size={14} />}</i></button>)}</div></div>
    <div className="checkout-section"><div className="option-title"><span>3</span><Heading as="h3">Método de pago</Heading></div><div className="payment-row">{["Yape", "Plin", "Tarjeta", "Contra entrega"].map((item) => <button key={item} onClick={() => setPayment(item)} className={payment === item ? "payment payment--active" : "payment"}>{item}</button>)}</div></div>
    <div className="checkout-total"><span>Total a pagar</span><strong>S/ {total.toFixed(2)}</strong></div><Button icon="arrow" onClick={onConfirm}>Confirmar pedido</Button></div>;
}

function Confirmation({ total, onClose }: { total: number; onClose: () => void }) {
  return <div className="confirmation"><div className="success-mark"><Icon name="check" size={34} /></div><div className="eyebrow eyebrow--pink">Pedido confirmado</div><Heading>¡Tu pedido está en marcha!</Heading><p>Lo prepararemos con mucho cariño y frescura.</p><div className="order-number"><span>Número de pedido</span><strong>#MF-2847</strong></div><div className="tracking">{["Recibido", "Preparando", "En camino", "Entregado"].map((item, index) => <div className={index === 0 ? "tracking-step tracking-step--active" : "tracking-step"} key={item}><span>{index === 0 ? <Icon name="check" size={14} /> : index + 1}</span><small>{item}</small></div>)}</div><div className="confirmation-details"><div><span>Tienda</span><strong>Mariscal Cáceres</strong></div><div><span>Tiempo estimado</span><strong>20–30 min</strong></div><div><span>Método de pago</span><strong>Yape</strong></div><div><span>Total</span><strong>S/ {total.toFixed(2)}</strong></div></div><Button onClick={onClose}>Volver al inicio</Button></div>;
}

function DeliveryOrdersPanel({ orders, error, onStatusChange }: {
  orders: DeliveryOrder[];
  error: string;
  onStatusChange: (orderId: string, status: DeliveryOrder["status"]) => void;
}) {
  return <section className="cashier-orders">
    <div className="cashier-orders-heading"><div><Heading as="h3">Pedidos de delivery</Heading><p>Pedidos recibidos desde la tienda</p></div><span>{orders.length} {orders.length === 1 ? "pedido" : "pedidos"}</span></div>
    {error && <p className="cashier-orders-error" role="alert">{error}</p>}
    {orders.length === 0 ? <div className="cashier-orders-empty">Todavía no hay pedidos de delivery.</div> : <div className="cashier-orders-list">
      {orders.map((order) => <article className="cashier-order" key={order.id}>
        <div className="cashier-order-top"><div><strong>#{order.id.slice(-6).toUpperCase()}</strong><span>{new Date(order.createdAt).toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" })}</span></div>
          <label>Estado<select aria-label={`Estado del pedido ${order.id.slice(-6)}`} value={order.status} onChange={(event) => onStatusChange(order.id, event.currentTarget.value as DeliveryOrder["status"])}>
            {["Recibido", "En preparación", "En camino", "Entregado"].map((status) => <option key={status}>{status}</option>)}
          </select></label>
        </div>
        <div className="cashier-order-details"><div><span>Cliente</span><strong>{order.customerName}</strong><a href={`tel:${order.phone}`}>{order.phone}</a></div><div><span>Dirección</span><strong>{order.address}</strong>{order.reference && <small>Referencia: {order.reference}</small>}</div></div>
        <ul className="cashier-order-items">{order.items.map((item, index) => <li key={`${item.name}-${index}`}><span>{item.quantity} × {item.name}</span><strong>S/ {(item.quantity * item.price).toFixed(2)}</strong></li>)}</ul>
        <div className="cashier-order-total"><span>Total de productos</span><strong>S/ {order.total.toFixed(2)}</strong></div>
      </article>)}
    </div>}
  </section>;
}

function AdminView({ onStore }: { onStore: () => void }) {
  const [section, setSection] = useState("Dashboard");
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([]);
  const [ordersError, setOrdersError] = useState("");
  useEffect(() => {
    const refreshOrders = () => {
      try {
        setDeliveryOrders(readDeliveryOrders());
        setOrdersError("");
      } catch (error) {
        console.error("No se pudieron cargar los pedidos de delivery.", error);
        setOrdersError("No se pudieron cargar los pedidos de delivery.");
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === DELIVERY_ORDERS_KEY || event.key === null) refreshOrders();
    };
    refreshOrders();
    window.addEventListener("storage", handleStorage);
    window.addEventListener(DELIVERY_ORDERS_EVENT, refreshOrders);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(DELIVERY_ORDERS_EVENT, refreshOrders);
    };
  }, []);
  const changeOrderStatus = (orderId: string, status: DeliveryOrder["status"]) => {
    try {
      const updatedOrders = readDeliveryOrders().map((order) => order.id === orderId ? { ...order, status } : order);
      localStorage.setItem(DELIVERY_ORDERS_KEY, JSON.stringify(updatedOrders));
      setDeliveryOrders(updatedOrders);
      setOrdersError("");
      window.dispatchEvent(new Event(DELIVERY_ORDERS_EVENT));
    } catch (error) {
      console.error("No se pudo actualizar el estado del pedido.", error);
      setOrdersError("No se pudo guardar el cambio de estado del pedido.");
    }
  };
  const nav = useMemo(() => [
    ["Dashboard", "home"], ["Pedidos", "orders"], ["Tiendas", "shop"], ["Productos", "bag"], ["Categorías", "chart"],
    ["Toppings", "sparkle"], ["Promociones", "star"], ["Clientes", "users"], ["Reportes", "chart"], ["Configuración", "settings"],
  ] as [string, IconName][], []);
  return <div className="admin">
    <aside className="admin-sidebar"><button className="admin-logo" onClick={onStore}><img src={logo} alt="Miskyfrooz" /></button><nav>{nav.map(([item, icon]) => <button key={item} className={section === item ? "admin-nav active" : "admin-nav"} onClick={() => setSection(item)}><Icon name={icon} /> <span>{item}</span></button>)}</nav><div className="admin-user"><span>AT</span><div><strong>Ana Torres</strong><small>Administradora</small></div></div></aside>
    <main className="admin-main"><header className="admin-header"><div><small>Panel administrativo</small><Heading>{section}</Heading></div><div className="admin-actions"><button className="admin-search"><Icon name="search" /><span>Buscar...</span></button><Button variant="secondary" onClick={onStore}>Ver tienda</Button><span className="user-avatar">AT</span></div></header>
      <div className="admin-content">
        {section === "Pedidos" ? <DeliveryOrdersPanel orders={deliveryOrders} error={ordersError} onStatusChange={changeOrderStatus} /> : <>
        <div className="admin-welcome"><div><Heading as="h3">Buenos días, Ana</Heading><p>Aquí tienes el resumen de Miskyfrooz para hoy.</p></div><label className="date-select">Hoy, 24 mayo <Icon name="chevron" size={16} /></label></div>
        <div className="metric-grid">{[
          ["Ventas de hoy", "S/ 3,842.50", "+12.5%", "chart"], ["Pedidos de hoy", "84", "+8.2%", "orders"], ["En preparación", "12", "Ver pedidos", "clock"], ["Ticket promedio", "S/ 45.74", "+4.1%", "star"],
        ].map(([title, value, delta, icon], index) => <article className="metric-card" key={title}><div className={`metric-icon metric-icon--${index}`}><Icon name={icon as IconName} /></div><p>{title}</p><Heading as="h3">{value}</Heading><small>{delta}</small></article>)}</div>
        <div className="dashboard-grid"><article className="chart-card"><div className="card-heading"><div><Heading as="h3">Ventas de la semana</Heading><p>Rendimiento por día</p></div><strong>S/ 21,480 <small>+14.2%</small></strong></div><div className="fake-chart"><div className="y-labels"><span>4k</span><span>3k</span><span>2k</span><span>1k</span><span>0</span></div><svg viewBox="0 0 700 220" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e7317d" stopOpacity=".22" /><stop offset="100%" stopColor="#e7317d" stopOpacity="0" /></linearGradient></defs><path className="area" d="M0 180 C80 170 100 120 170 135 S260 70 330 95 S420 110 490 55 S590 90 700 28 V220 H0Z" /><path className="line" d="M0 180 C80 170 100 120 170 135 S260 70 330 95 S420 110 490 55 S590 90 700 28" /></svg><div className="x-labels"><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span></div></div></article>
          <article className="chart-card"><div className="card-heading"><div><Heading as="h3">Pedidos por tienda</Heading><p>Distribución de hoy</p></div><button>•••</button></div><div className="donut-wrap"><div className="donut"><span><strong>84</strong><small>pedidos</small></span></div><div className="legend"><div><i className="dot-pink"></i><span>Mariscal Cáceres</span><strong>52</strong></div><div><i className="dot-purple"></i><span>Jr. Lima</span><strong>32</strong></div></div></div></article></div>
        <article className="orders-card"><div className="card-heading"><div><Heading as="h3">Pedidos recientes</Heading><p>Últimas órdenes recibidas</p></div><Button variant="secondary" icon="arrow" onClick={() => setSection("Pedidos")}>Ver todos</Button></div><div className="table-wrap"><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Tienda</th><th>Total</th><th>Pago</th><th>Estado</th><th>Hora</th><th></th></tr></thead><tbody>{[
          ["#MF-2847", "Lucía Mendoza", "Mariscal Cáceres", "S/ 42.80", "Yape", "En preparación", "12:42"], ["#MF-2846", "Diego Ramírez", "Jr. Lima", "S/ 28.90", "Tarjeta", "Confirmado", "12:35"], ["#MF-2845", "Carla Paredes", "Mariscal Cáceres", "S/ 55.50", "Plin", "En camino", "12:21"], ["#MF-2844", "Andrés Soto", "Jr. Lima", "S/ 31.80", "Efectivo", "Entregado", "12:08"],
        ].map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 5 ? <span className={`status status--${cell.toLowerCase().replace(" ", "-")}`}>{cell}</span> : cell}</td>)}<td><button className="table-action"><Icon name="chevron" size={17} /></button></td></tr>)}</tbody></table></div></article>
        <DeliveryOrdersPanel orders={deliveryOrders} error={ordersError} onStatusChange={changeOrderStatus} />
        </>}
      </div>
    </main>
  </div>;
}

export default App;
