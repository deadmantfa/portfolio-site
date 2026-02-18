export function calculateHelixPosition(
  index: number, 
  total: number, 
  radiusBase: number, 
  heightFactor: number
): [number, number, number] {
  // Higher rotation count for more "amazing" spiral - 8 full rotations
  const rotations = 8 
  const angle = (index / total) * Math.PI * 2 * rotations
  
  // Double helix logic: offset second strand by PI
  const isSecondStrand = index % 2 === 0
  const finalAngle = angle + (isSecondStrand ? Math.PI : 0)
  
  // Dynamic radius: Wave effect + Vortex flare
  // radiusBase is modified by a sine wave to create "bulges" and a general expansion
  const wave = Math.sin(angle * 0.5) * 1.5
  const radius = radiusBase * (0.8 + (index / total) * 1.5) + wave
  
  const x = Math.cos(finalAngle) * radius
  const z = Math.sin(finalAngle) * radius
  
  // Standard vertical distribution with slight organic jitter
  const y = (index - total / 2) * heightFactor
  
  return [x, y, z]
}

