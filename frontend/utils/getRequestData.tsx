import { gql, request } from 'graphql-request';

// The Graph API endpoint - this URL points to the hosted subgraph
const url =
  'https://api.studio.thegraph.com/query/90479/counter-test/version/latest';

/**
 * GraphQL Query 1: Fetch recent events
 * Retrieves the latest 5 `CounterIncremented` and `NumberSet` events.
 */
const SEARCH_QUERY_1 = gql`
  {
    counterIncrementeds(first: 5) {
      id
      previousNum
      blockNumber
    }
    numberSets(first: 5) {
      id
      user
      num
      blockNumber
      timestamp
      transactionHash
    }
  }
`;

/**
 * GraphQL Query 2: Fetch data for a specific user
 * Retrieves all `CounterIncremented` events related to a given user.
 */
const SEARCH_QUERY_2 = gql`
  query getUser($address: String!) {
    user(id: $address) {
      id
      counterIncremented {
        blockNumber
        id
        previousNum
      }
    }
  }
`;

/**
 * Fetches all recent event data (first 5 records).
 * This function queries The Graph API and returns indexed blockchain events.
 */
export async function fetchAllData(): Promise<any> {
  try {
    const response = await request(url, SEARCH_QUERY_1);
    if (!response) {
      throw new Error('Data not found'); // Ensure we handle empty responses
    }
    return response as any; // Return data for frontend display
  } catch (error) {
    console.error('GraphQL Request Error:', error);
    throw error;
  }
}

/**
 * Fetches data related to a specific user by their address.
 * If the search query is empty, it returns null.
 */
export async function fetchUserData(searchQuery: string): Promise<any> {
  // Return null if no address is provided
  if (!searchQuery) {
    console.warn('fetchUserData: searchQuery is empty, returning null');
    return null;
  }

  try {
    // Execute query with dynamic user address parameter
    const response = await request(url, SEARCH_QUERY_2, {
      address: searchQuery,
    });

    if (!response) {
      throw new Error('Data not found'); // Ensure valid response handling
    }
    return response as any;
  } catch (error) {
    console.error('GraphQL Request Error:', error);
    throw error;
  }
}
