import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'estudio-barda',
  title: 'Estudio Barda',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Configuración del estudio')
              .id('configuracion')
              .child(
                S.document()
                  .schemaType('configuracion')
                  .documentId('configuracion')
              ),
            S.divider(),
            S.documentTypeListItem('proyecto').title('Proyectos'),
            S.documentTypeListItem('servicio').title('Servicios'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
