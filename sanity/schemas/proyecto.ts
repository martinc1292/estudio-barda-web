import { defineType, defineField } from 'sanity'

export const proyectoSchema = defineType({
  name: 'proyecto',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'ciudad', title: 'Ciudad', type: 'string' }),
    defineField({ name: 'anio', title: 'Año', type: 'number' }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Casa', value: 'casa' },
          { title: 'Departamento', value: 'departamento' },
          { title: 'Refacción', value: 'refaccion' },
          { title: 'Local', value: 'local' },
          { title: 'Espacio de trabajo', value: 'trabajo' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Otro', value: 'otro' },
        ],
      },
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Principal', value: 'principal' },
          { title: 'Secundario', value: 'secundario' },
        ],
      },
    }),
    defineField({
      name: 'destacadoEnHome',
      title: 'Destacado en Home',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'orden', title: 'Orden', type: 'number' }),
    defineField({
      name: 'descripcionCorta',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'descripcionLarga',
      title: 'Descripción larga',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'imagenPrincipal',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'galeria',
      title: 'Galería',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({ name: 'titulo_en', title: 'Title (EN)', type: 'string' }),
    defineField({
      name: 'descripcionCorta_en',
      title: 'Short description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descripcionLarga_en',
      title: 'Long description (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'ordenAsc',
      by: [{ field: 'orden', direction: 'asc' }],
    },
    {
      title: 'Año (reciente)',
      name: 'anioDesc',
      by: [{ field: 'anio', direction: 'desc' }],
    },
  ],
})
