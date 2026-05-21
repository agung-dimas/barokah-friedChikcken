/**
 * Fungsi untuk memberikan foto profil kartun minimalis 
 * (seperti Canva yang belum ada PP / default silhouette)
 * yang acak namun konsisten (berdasarkan seed name/uid)
 */
export const getAvatarUrl = (name: string, uid: string) => {
  const colors = [
    'b70011', // Merah Barokah
    'fdc425', // Kuning Barokah
    'e11d48', // Rose
    'f59e0b', // Amber
    '10b981', // Emerald
    '3b82f6', // Blue
    '8b5cf6', // Violet
    'f97316', // Orange
  ];
  
  const seed = name || uid || 'Barokah';
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  const bgColor = colors[colorIndex];
  
  // Clean, high-end minimalist Canva-like profile silhouette SVG (tanpa wajah manusia)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="%23${bgColor}" />
    <circle cx="50" cy="40" r="18" fill="%23ffffff" fill-opacity="0.9" />
    <path d="M50 63C32 63 18 73.5 18 86.5C18 87.5 19 88.5 20 88.5H80C81 88.5 82 87.5 82 86.5C82 73.5 68 63 50 63Z" fill="%23ffffff" fill-opacity="0.9" />
  </svg>`;
  
  return `data:image/svg+xml;utf8,${svg}`;
};
