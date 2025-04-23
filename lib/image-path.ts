/**
 * Gets the correct image path based on environment
 * @param path Image path without leading slash
 * @returns Correct path with proper prefix for the current environment
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Add prefix only in production
  const prefix = process.env.NODE_ENV === 'production' ? '/roach-landing/' : '/';
  
  return `${prefix}${cleanPath}`;
}
