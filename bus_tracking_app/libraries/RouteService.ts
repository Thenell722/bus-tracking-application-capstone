const apibase = "http://192.168.1.117:3000/api/routes/"; // Base endpoint for routes API

/**
 * Route interface - defines the structure of route data
 */
export interface Route {
  route_id: string;  
  name?: string;    
  location?: string;
  fares?: string;    
}

/**
 * Fetches all available routes from the API
 * @throws Error if request fails
 * @returns Promise with array of Route objects
 */
export async function getAllRoutes(): Promise<Route[]> {
  const res = await fetch(apibase);
  if (!res.ok) throw new Error("Error " + res.status);
  return res.json();
}

/**
 * Fetches a specific route by its ID
 * @param routeId - The ID of the route to retrieve
 * @throws Error if route not found
 * @returns Promise with Route object
 */
export async function getRouteByRouteId(routeId: string): Promise<Route> {
  const res = await fetch(`${apibase}${routeId}`);
  if (!res.ok) throw new Error("Route not found");
  return res.json();
}