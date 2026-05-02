import { defineType, defineField } from 'sanity'

export const configuracionSchema = defineType({
  name: 'configuracion',
  title: 'Configuración del estudio',
  type: 'document',
  fields: [
    defineField({ name: 'nombreEstudio', title: 'Nombre del estudio', type: 'string' }),
    defineField({ name: 'lema', title: 'Lema', type: 'string' }),
    defineField({ name: 'bioEstudio', title: 'Bio del estudio', type: 'text', rows: 6 }),
    defineField({ name: 'bioArquitecto', title: 'Bio del arquitecto', type: 'text', rows: 6 }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp (número)', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'string' }),
    defineField({
      name: 'fotoArquitecto',
      title: 'Foto del arquitecto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),
    defineField({ name: 'lema_en', title: 'Tagline (EN)', type: 'string' }),
    defineField({ name: 'bioEstudio_en', title: 'Studio bio (EN)', type: 'text', rows: 6 }),
    defineField({ name: 'bioArquitecto_en', title: 'Architect bio (EN)', type: 'text', rows: 6 }),
  ],
})
