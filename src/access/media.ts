import type { Where } from 'payload'

/**
 * Filtre appliqué aux champs image du site public : seules les photos
 * dont le consentement est renseigné (écrit, oral ou non requis) et dont
 * l'usage « web » est autorisé peuvent être choisies dans l'admin.
 */
export const mediaPubliable: Where = {
  and: [
    { consentement: { not_equals: 'absent' } },
    { usageAutorise: { in: ['web'] } },
  ],
}
