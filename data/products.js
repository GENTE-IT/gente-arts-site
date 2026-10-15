// Every product is sold as an access card: you buy the card, activate it with
// its key and download the files. `accent` colours the card by category.
const base = { game: "gta-v", gameLabel: "GTA V", edition: "Vol. 01", delivery: "Acceso inmediato tras la activación" };

export const categories = {
  map: { label: "Mapeado", accent: "var(--amber)", ink: "#3a2a05" },
  script: { label: "Script", accent: "var(--blue)", ink: "#0d2a36" },
  system: { label: "Sistema", accent: "var(--coral)", ink: "#3a1508" },
  clothing: { label: "Ropa", accent: "var(--leaf)", ink: "#15300f" },
};

export const products = [
  { ...base, id: "skyline-villa", likes: 312, number: "01", serial: "GA-V-001", name: "Skyline Villa", category: "map", price: 34.90, version: "1.3", featured: true, image: "/assets/products/skyline-villa.jpg", compat: ["FiveM", "ESX", "QBCore"], description: "Una residencia elevada sobre Los Santos, pensada para escenas sociales, eventos y roleplay premium.", features: ["Interior y exterior completos", "Iluminación y LOD optimizados", "Colisiones revisadas", "Actualizaciones incluidas"] },
  { ...base, id: "velocity-mechanic", likes: 248, number: "02", serial: "GA-V-002", name: "Velocity Mechanic", category: "system", price: 29.90, version: "2.0", featured: true, image: "/assets/products/velocity-mechanic.jpg", compat: ["FiveM", "ESX", "QBCore"], description: "Un flujo de taller claro y rápido para personalizar, diagnosticar y gestionar vehículos.", features: ["Interfaz responsive", "Configuración modular", "Compatible con ESX y QBCore", "Documentación incluida"] },
  { ...base, id: "orbit-inventory", likes: 97, number: "03", serial: "GA-V-003", name: "Orbit Inventory", category: "script", price: 19.90, version: "1.1", featured: false, image: "/assets/products/orbit-inventory.jpg", compat: ["FiveM", "ESX"], description: "Inventario visual ligero, preparado para economías complejas sin perder claridad.", features: ["Arrastrar y soltar", "Categorías configurables", "Bajo consumo", "Soporte directo"] },
  { ...base, id: "pulse-dispatch", likes: 183, number: "04", serial: "GA-V-004", name: "Pulse Dispatch", category: "script", price: 24.90, version: "1.4", featured: true, image: "/assets/products/pulse-dispatch.jpg", compat: ["FiveM", "ESX", "QBCore"], description: "Alertas, unidades y prioridades reunidas en un sistema ágil para servicios de emergencia.", features: ["Alertas en tiempo real", "Rutas y unidades", "Temas configurables", "Código organizado"] },
  { ...base, id: "vespucci-social", likes: 74, number: "05", serial: "GA-V-005", name: "Vespucci Social", category: "map", price: 27.90, version: "1.0", featured: false, image: "/assets/products/vespucci-social.jpg", compat: ["FiveM"], description: "Un espacio costero abierto para reuniones, negocios y eventos con identidad propia.", features: ["Zonas interiores", "LOD optimizado", "Ambiente nocturno", "Instalación guiada"] },
  { ...base, id: "core-garage", likes: 121, number: "06", serial: "GA-V-006", name: "Core Garage", category: "system", price: 22.90, version: "1.2", featured: false, image: "/assets/products/core-garage.jpg", compat: ["FiveM", "ESX", "QBCore"], description: "Gestión modular de garajes, vehículos y accesos para servidores que quieren crecer.", features: ["Garajes privados", "Permisos por rol", "Configuración central", "Actualizaciones incluidas"] },
  { ...base, id: "urban-wear", likes: 206, number: "07", serial: "GA-V-007", name: "Urban Wear Vol. 01", category: "clothing", price: 14.90, version: "1.0", featured: true, image: "/assets/products/urban-wear.jpg", compat: ["FiveM"], description: "Una colección urbana lista para ampliar la identidad visual de personajes y facciones.", features: ["Prendas configurables", "Variantes de color", "Optimizado para FiveM", "Instalación guiada"] },
];

export const featuredProducts = products.filter(product => product.featured);
export const categoryOf = product => categories[product.category];
