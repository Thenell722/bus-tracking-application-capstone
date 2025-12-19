const apibase = "http://192.168.1.117:3000/api/drivers/"; 

/** GeoJSON Point */
export interface GeoPoint {
  type: "Point";
  coordinates: [number, number]; // [latitude, longitude]
}

/** Driver interface */
export interface Driver {
  driver_id: string;                
  name?: string;
  contact_number?: string;
  work_status?: "active" | "inactive"; 
  number_plate?: string;
  current_route?: string;
  current_location?: GeoPoint;
  location_timestamp?: string;      
}

/**
 * Fetches all drivers from the API
 * @throws Error if request fails
 * @returns Promise with array of Driver objects
 */
export async function getAllDrivers(): Promise<Driver[]> {
  const res = await fetch(apibase);
  if (!res.ok) {
    throw new Error(`Error fetching drivers: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetches a specific driver by their driver_id
 * @param driverId - The driver_id to look up 
 * @throws Error if driver not found or request fails
 * @returns Promise with Driver object
 */
export async function getDriverByDriverId(driverId: string): Promise<Driver> {
  const res = await fetch(`${apibase}driver-id/${encodeURIComponent(driverId)}`);
  if (!res.ok) {
    throw new Error(`Driver not found: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
