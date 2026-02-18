export function calculateHelixPosition(
  index: number, 
  total: number, 
  radiusBase: number, 
  heightFactor: number
): [number, number, number] {
  // Higher rotation count for more "amazing" spiral
  const rotations = 6 // Increased from 4
  const angle = (index / total) * Math.PI * 2 * rotations
  
  // Double helix logic
  const isSecondStrand = index % 2 === 0
  const finalAngle = angle + (isSecondStrand ? Math.PI : 0)
  
  // Vortex effect: Radius increases significantly with height for a 'flaring' look
  const radius = radiusBase * (0.4 + (index / total) * 1.2)
  
  const x = Math.cos(finalAngle) * radius
  const z = Math.sin(finalAngle) * radius
  
  // Standard vertical distribution
  const y = (index - total / 2) * heightFactor
  
  return [x, y, z]
}
