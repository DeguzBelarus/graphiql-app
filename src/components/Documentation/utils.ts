import { GraphQLField, GraphQLNamedType } from 'graphql';

export const getTypeName = (typeObject: GraphQLNamedType | object): string => {
  if (new Map(Object.entries(typeObject)).get('name')) {
    return new Map(Object.entries(typeObject)).get('name');
  } else {
    return getTypeName(Object.entries(typeObject)[0][1]);
  }
};

export const getTypeFields = (typeObject: GraphQLNamedType | object) => {
  const fields = Object.values(
    Object.entries(typeObject || {}).find((typeEntry) => typeEntry[0] === '_fields')?.[1] || {}
  ) as Array<GraphQLField<unknown, unknown>>;
  return fields;
};
