import { buildUrl } from "../utils/buildUrl";

// 1. Abstraction: unified interface for all data source adapters
export interface DataSourceAdapter {
    /**
     * Fetches data for a given resource and optional params
     * @param resource - identifier of the data resource (e.g. "countries" or "cities")
     * @param params - query parameters or filters
     * @returns Promise resolving to any JSON-serializable data
     */
    fetch(resource: string, params?: Record<string, any>): Promise<any>;
  }

  // 2. RestApiAdapter: uses fetch() to call a REST endpoint
export class RestApiAdapter implements DataSourceAdapter {
    
  
    async fetch(fullUrl: string, params: Record<string, any> = {}): Promise<any> {
      const url = buildUrl(fullUrl,params)

      const response = await this.fetch(url);

      if (!response.ok) {
        throw new Error(`REST request failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    }
  }

  // 3. StaticAdapter: returns predefined static data for resources
export class StaticAdapter implements DataSourceAdapter {
    private store: Record<string, any[]>;
  
    /**
     * @param store - a map of resource names to arrays of data
     */
    constructor(store: Record<string, any[]>) {
      this.store = store;
    }
  
    async fetch(resource: string): Promise<any> {
      // Return a copy to avoid external mutation
      return this.store[resource] ? [...this.store[resource]] : [];
    }
  }
  
  // 4. Example usage:
  //
  // const restAdapter = new RestApiAdapter('https://api.mycompany.com/geo');
  // restAdapter.fetch('countries').then(console.log);
  //
  // const staticData = { countries: [ { value: 'us', text: 'USA' } ] };
  // const staticAdapter = new StaticAdapter(staticData);
  // staticAdapter.fetch('countries').then(console.log);
  