import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Une variable retirée d'un objet par déstructuration (« ...reste ») n'est pas une erreur.
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: [
      '.next/**',
      '.next-dev/**',
      'node_modules/**',
      'src/payload-types.ts',
      'src/migrations/**',
      'src/app/(payload)/**',
      'next-env.d.ts',
    ],
  },
]

export default config
