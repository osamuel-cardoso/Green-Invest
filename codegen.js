require('dotenv').config({ path: '.env.local' });

module.exports = {
  overwrite: true,
  schema: [
    {
      [process.env.NEXT_HYGRAPH_ENDPOINT]: {
        headers: {
          Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
        },
      },
    },
  ],
  documents: ['src/**/*.graphql', 'src/**/*.gql'],
  generates: {
    'src/gql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        fetcher: 'graphql-request',
        scalars: {
          DateTime: 'string',
          Date: 'string',
          Json: 'any',
        },
        enumsAsTypes: true,
        skipTypename: true,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        preResolveTypes: true,
      },
    },
  },
};