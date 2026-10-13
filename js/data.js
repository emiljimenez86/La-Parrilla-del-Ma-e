const menuData = {
  restaurant: "La Parrilla del Mañe",
  tagline: "Asados y comidas rápidas",
  categories: [
    {
      id: "asados",
      name: "Asados",
      short: "A la parrilla",
      accent: "fire",
      items: [
        { name: "Punta de Anca", price: 30000 },
        { name: "Churrasco", price: 30000 },
        { name: "Carne de cerdo", price: 20000 },
        { name: "Pechuga", price: 20000 },
        { name: "Res", price: 20000 },
        { name: "Costilla a la BBQ", price: 28000 },
        { name: "Plato de la Casa (Morrillo, Lengua y Ubre)", price: 28000 },
        { name: "Morrillo", price: 28000 },
        { name: "Lengua", price: 30000 },
        { name: "Ubre", price: 28000 },
      ],
    },
    {
      id: "rapidas",
      name: "Comidas Rápidas",
      short: "Para llevar",
      accent: "gold",
      items: [
        { name: "Chuzo de Pollo", price: 20000 },
        { name: "Chuzo de Res", price: 5000 },
        { name: "Chuzo de Cerdo", price: 5000 },
        { name: "Chorizo", price: 15000 },
        { name: "Hamburguesa Artesanal", price: 18000 },
      ],
    },
    {
      id: "adiciones",
      name: "Adiciones",
      short: "Para completar",
      accent: "ember",
      items: [
        { name: "Papas a la francesa", price: 5000 },
        { name: "Papas al vapor", price: 4000 },
        { name: "Yuca", price: 4000 },
        { name: "Chimichurri", price: 4000 },
      ],
    },
    {
      id: "bebidas",
      name: "Bebidas",
      short: "Para acompañar",
      accent: "red",
      items: [
        { name: "Gaseosas", price: 5000 },
        { name: "Gaseosas Pequeñas", price: 2000 },
        { name: "Jugos Hit", price: 5000 },
        { name: "Aguas Saborizadas", price: 4000 },
        { name: "Cervezas", price: 5000 },
      ],
    },
  ],
};

const contactData = {
  title: "Contáctanos",
  hours: {
    label: "Horario de atención",
    time: "6:00 p.m. a 11:00 p.m.",
    days: "Martes, miércoles, jueves, viernes, sábado y domingo",
    closed: "Cerrado los lunes",
  },
  address: {
    label: "Nuestra dirección",
    lines: [
      "Parqueadero al lado del tránsito municipal",
      "Cl. 21a #101",
      "Caucasia, Antioquia",
    ],
    href: "https://maps.app.goo.gl/8o9f8xKM1wZm6Fod8",
  },
  links: [
    {
      id: "phone",
      name: "Llamar",
      href: "tel:+573216278642",
      icon: "image/redes/llamadas.png",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      href: "https://wa.me/573216278642",
      icon: "image/redes/whatsApp.png",
    },
  ],
  whatsappOrder: {
    phone: "573216278642",
    icon: "image/redes/whatsApp.png",
    label: "Pedir Domicilio Por WhatsApp",
  },
};

function formatPrice(value) {
  return `$${value.toLocaleString("es-CO")}`;
}
