import { defineType, defineField } from 'sanity'

export const servicioSchema = defineType({
  name: 'servicio',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Principal', value: 'principal' },
          { title: 'Complementario', value: 'complementario' },
        ],
      },
    }),
    defineField({ name: 'orden', title: 'Orden', type: 'number' }),
    defineField({ name: 'titulo_en', title: 'Title (EN)', type: 'string' }),
    defineField({
      name: 'descripcion_en',
      title: 'Description (EN)',
      type: 'text',
      rows: 4,
    }),
  ],
})
