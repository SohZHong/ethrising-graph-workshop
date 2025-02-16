import { gql, request } from 'graphql-request';

const url = 'https://api.studio.thegraph.com/query/90479/defi-analysis/v0.0.2';

const SEARCH_QUERY = gql`INSERT QUERY HERE`;

export async function fetchData(searchQuery: string): Promise<any> {
  // Return empty
  if (!searchQuery) {
    console.warn('fetchData: searchQuery is empty, returning null');
    return null;
  }

  try {
    const response = await request(url, SEARCH_QUERY, {
      search: searchQuery,
    });
    if (!response) {
      throw new Error('Data not found');
    }
    return response;
  } catch (error) {
    console.error('GraphQL Request Error:', error);
    throw error;
  }
}
