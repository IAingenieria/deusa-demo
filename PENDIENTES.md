# Pendientes / mejoras futuras

No hubo errores bloqueantes durante la construcción. El build compila limpio
(`npm run build`) y no hay errores de consola en runtime. Lo siguiente son mejoras
y "para después", no fallas del demo.

## Para conectar cuando deje de ser demo
- [ ] **Base de datos real**: reimplementar `src/services/dataService.js` con
      Baserow o Supabase (ver sección en el README). Es el único archivo a tocar.
- [ ] **WhatsApp**: implementar el envío real donde está el comentario marcado en
      `AppContext.jsx → notificar()` (Twilio / WhatsApp Business API).
- [ ] **Autenticación real**: hoy el rol es un selector sin login. Falta auth
      (Supabase Auth / Clerk) y permisos por usuario en servidor.
- [ ] **Storage de imágenes**: las fotos de tickets y ofertas hoy son base64/URLs.
      Migrar a un bucket (Supabase Storage) y guardar solo la URL.

## Mejoras de producto
- [ ] Logo real de DeUSA (reemplazar `public/logo_deusa.png` y el componente `Logo`).
- [ ] Iconos PWA definitivos (los actuales son generados por script como placeholder).
- [ ] Comisión configurable por pedido/cliente (hoy es fija de $150 en el carrito).
- [ ] Búsqueda de ofertas por texto y orden por precio.
- [ ] Sustitución de ítem con captura de la nota/foto del reemplazo (hoy hay estado
      "sustituido" y campo `notaSustitucion`, falta UI para editarlo).
- [ ] Exportar reporte de utilidad / estado de cuenta a PDF o CSV.
- [ ] Paginación / lazy-load del feed si crece el catálogo.

## Técnicos menores
- [ ] `npm audit` reporta vulnerabilidades de dependencias transitivas de dev
      (heredadas del scaffold). No afectan el runtime del demo; revisar antes de
      producción con `npm audit fix`.
- [ ] Tests (unitarios de los helpers de `dataService` y de flujos con Vitest).
- [ ] Modo oscuro (hoy solo claro).
