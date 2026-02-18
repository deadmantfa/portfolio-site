export function calculateHelixPosition(
  index: number, 
  total: number, 
  radiusBase: number, 
  heightFactor: number
): [number, number, number] {
  // Higher rotation count for more "amazing" spiral
  const rotations = 4
  const angle = (index / total) * Math.PI * 2 * rotations
  
  // Double helix logic
  const isSecondStrand = index % 2 === 0
  const finalAngle = angle + (isSecondStrand ? Math.PI : 0)
  
  // Vortex effect: Radius increases with height
  const radius = radiusBase * (0.6 + (index / total) * 0.9)
  
  const x = Math.cos(finalAngle) * radius
  const z = Math.sin(finalAngle) * radius
  
  // Standard vertical distribution
  const y = (index - total / 2) * heightFactor
  
  return [x, y, z]
}
