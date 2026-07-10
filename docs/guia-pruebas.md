# Guia para probar el proyecto

Esta guia describe como validar el sitio de `estudio-barda-web` con las herramientas que existen hoy en el repo.

## Resumen rapido

Hoy el proyecto no tiene una suite automatizada de tests unitarios o end-to-end. Las validaciones disponibles son:

- `npm run lint`
- `npm run build`
- prueba manual del sitio en desarrollo
- prueba manual del Studio de Sanity
- prueba manual del endpoint de revalidacion

## 1. Preparacion

Instalar dependencias:

```bash
npm install
```

Crear el archivo de entorno local a partir del ejemplo:

```bash
cp .env.example .env.local
```

Completar al menos estas variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
SANITY_REVALIDATE_SECRET="change_me"
```

Notas:

- Sin credenciales validas de Sanity, el sitio puede compilar, pero no va a mostrar contenido real.
- Para pruebas locales conviene usar `NEXT_PUBLIC_SITE_URL="http://localhost:3000"`.

## 2. Chequeos automaticos disponibles

### Lint

Ejecuta ESLint sobre el proyecto:

```bash
npm run lint
```

Resultado esperado:

- el comando termina sin errores

### Build de produccion

Compila la app como lo haria el deploy:

```bash
npm run build
```

Resultado esperado:

- la compilacion termina sin errores
- Next genera las rutas publicas
- no aparecen errores de TypeScript

Si queres validar el artefacto final, despues del build podes iniciar la app compilada:

```bash
npm run start
```

## 3. Prueba manual en desarrollo

Levantar el proyecto:

```bash
npm run dev
```

Abrir `http://localhost:3000`.

Checklist recomendado:

- `/` carga sin errores y muestra hero, estadisticas y obras destacadas si existen proyectos en Sanity.
- `/proyectos` lista proyectos sin errores visuales ni de consola.
- `/proyectos/[slug]` abre el detalle de un proyecto, muestra imagen principal y galeria si existen.
- `/sobre-nosotros` carga datos de configuracion y servicios.
- `/proceso` carga correctamente.
- `/contacto` muestra los datos de contacto esperados.
- la navegacion principal funciona entre paginas.
- en mobile y desktop no hay cortes obvios de layout.

Si no hay contenido cargado en Sanity, igual deberia verificarse que:

- la app no rompa
- las paginas respondan
- los estados vacios sean razonables

## 4. Prueba manual del Studio

El Studio esta embebido en:

```text
/studio
```

Importante:

- abre tanto en desarrollo como en produccion
- el acceso lo protege el login de Sanity (solo miembros invitados editan)

Checklist recomendado:

- entrar a `http://localhost:3000/studio`
- confirmar que carga el panel de Sanity
- crear o editar un `proyecto`
- revisar que existan `slug`, `imagenPrincipal` y `descripcionCorta`
- marcar algun proyecto con `destacadoEnHome` si queres probar la home con contenido

## 5. Prueba de revalidacion

El proyecto expone:

```text
POST /api/revalidate
```

Se puede probar desde PowerShell con:

```powershell
$body = @{
  _type = "proyecto"
  slug = @{
    current = "nombre-del-proyecto"
  }
} | ConvertTo-Json -Depth 3

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3000/api/revalidate?secret=change_me" `
  -ContentType "application/json" `
  -Body $body
```

Resultado esperado:

- respuesta `200`
- `revalidated: true`
- `paths` incluye `/`, `/proyectos` y `/proyectos/nombre-del-proyecto`

Casos utiles para probar:

- secreto invalido: debe devolver `401`
- `configuracion`: deberia revalidar home, proyectos, sobre nosotros, proceso y contacto
- `servicio`: deberia revalidar home y sobre nosotros

## 6. Antes de cerrar una tarea

Para un cambio normal en este repo, la validacion minima recomendada es:

1. `npm run lint`
2. `npm run build`
3. prueba manual de la ruta afectada
4. si tocaste contenido o queries de Sanity, prueba manual de `/studio` y de revalidacion

## 7. Limitaciones actuales

Al dia de hoy este repo no incluye:

- `npm test`
- pruebas unitarias
- pruebas de integracion
- pruebas end-to-end

Si mas adelante sumamos Vitest, Playwright o una alternativa similar, esta guia deberia actualizarse para incluir esos comandos.
