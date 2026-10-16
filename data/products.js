// Every product is sold as an access card: you buy the card, activate it with
// its key and download the resource. Naming follows the brand manual (ch. 17):
// resources carry the ga_ prefix (ga_map_ for maps, ga_cl_ for clothing,
// ga_pack_ for packs), versions are major.minor.patch, and each category owns
// one band of the raya (ch. 11): Scripts Pacífico, Mapeados Ámbar, Ropa Coral,
// Packs Naranja.
const base = { game: "gta-v", gameLabel: "GTA V", delivery: "Acceso inmediato tras la activación" };

export const categories = {
  script: { label: "Script", plural: "Scripts", band: "var(--pacifico)", hex: "#2D6CB3", prefix: "ga_" },
  map: { label: "Mapeado", plural: "Mapeados", band: "var(--ambar)", hex: "#F3B43C", prefix: "ga_map_" },
  clothing: { label: "Ropa", plural: "Ropa", band: "var(--coral)", hex: "#E04A3A", prefix: "ga_cl_" },
  pack: { label: "Pack", plural: "Packs", band: "var(--naranja)", hex: "#EE7B2F", prefix: "ga_pack_" },
};

const catalog = [
  { ...base, id: "skyline-villa", likes: 312, number: "01", resource: "ga_map_skyline_villa", name: "Skyline Villa", category: "map", price: 34.90, version: "1.3.0", updated: "2026-10-02", featured: true, image: "/assets/products/skyline-villa.jpg", compat: ["FiveM", "ESX", "QBCore"], dependencies: ["Ninguna"], description: "Residencia elevada sobre Los Santos para escenas sociales, eventos y rol de alto nivel. Interior y exterior completos.", features: ["Interior y exterior completos", "Iluminación y LOD optimizados", "Colisiones revisadas", "Actualizaciones incluidas"] },
  { ...base, id: "velocity-mechanic", likes: 248, number: "02", resource: "ga_mechanic", name: "Velocity Mechanic", category: "script", price: 29.90, version: "2.0.0", updated: "2026-10-09", featured: true, image: "/assets/products/velocity-mechanic.jpg", compat: ["FiveM", "ESX", "QBCore"], dependencies: ["ox_lib"], description: "Taller para personalizar, diagnosticar y gestionar vehículos. Instalación en dos minutos, sin tocar la base de datos.", features: ["Interfaz responsive", "Configuración modular", "Compatible con ESX y QBCore", "Documentación incluida"] },
  { ...base, id: "orbit-inventory", likes: 97, number: "03", resource: "ga_inventory", name: "Orbit Inventory", category: "script", price: 19.90, version: "1.1.0", updated: "2026-09-21", featured: false, image: "/assets/products/orbit-inventory.jpg", compat: ["FiveM", "ESX"], dependencies: ["ox_lib", "oxmysql"], description: "Inventario visual ligero para economías complejas. Arrastrar y soltar, categorías configurables y bajo consumo.", features: ["Arrastrar y soltar", "Categorías configurables", "Bajo consumo", "Soporte directo"] },
  { ...base, id: "pulse-dispatch", likes: 183, number: "04", resource: "ga_dispatch", name: "Pulse Dispatch", category: "script", price: 24.90, version: "1.4.0", updated: "2026-10-05", featured: true, image: "/assets/products/pulse-dispatch.jpg", compat: ["FiveM", "ESX", "QBCore"], dependencies: ["ox_lib"], description: "Alertas, unidades y prioridades para servicios de emergencia. Funciona con OneSync activado.", features: ["Alertas en tiempo real", "Rutas y unidades", "Temas configurables", "Código organizado"] },
  { ...base, id: "vespucci-social", likes: 74, number: "05", resource: "ga_map_vespucci_social", name: "Vespucci Social", category: "map", price: 27.90, version: "1.0.0", updated: "2026-09-14", featured: false, image: "/assets/products/vespucci-social.jpg", compat: ["FiveM"], dependencies: ["Ninguna"], description: "Espacio costero abierto para reuniones, negocios y eventos. Zonas interiores y ambiente nocturno.", features: ["Zonas interiores", "LOD optimizado", "Ambiente nocturno", "Instalación guiada"] },
  { ...base, id: "core-garage", likes: 121, number: "06", resource: "ga_garage", name: "Core Garage", category: "script", price: 22.90, version: "1.2.0", updated: "2026-09-30", featured: false, image: "/assets/products/core-garage.jpg", compat: ["FiveM", "ESX", "QBCore"], dependencies: ["ox_lib", "oxmysql"], description: "Garajes, vehículos y accesos con permisos por rol. Configuración central y actualizaciones incluidas.", features: ["Garajes privados", "Permisos por rol", "Configuración central", "Actualizaciones incluidas"] },
  { ...base, id: "urban-wear", likes: 206, number: "07", resource: "ga_cl_urban_wear", name: "Urban Wear", category: "clothing", price: 14.90, version: "1.0.0", updated: "2026-09-08", featured: true, image: "/assets/products/urban-wear.jpg", compat: ["FiveM"], dependencies: ["Ninguna"], description: "Colección urbana para personajes y facciones. Prendas configurables con variantes de color.", features: ["Prendas configurables", "Variantes de color", "Optimizado para FiveM", "Instalación guiada"] },
];

export const products = catalog;
export const fullName = product => product.name;
export const featuredProducts = products.filter(product => product.featured);
export const categoryOf = product => categories[product.category];
export const formatDate = iso => new Date(`${iso}T00:00:00`).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
