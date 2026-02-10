'use client'

import { Float, Text, ScrollControls, Scroll } from '@react-three/drei'
import { careerData } from '@/data/career'

const TimelineNode = ({ milestone, index }: { milestone: any, index: number }) => {
  const position: [number, number, number] = [index % 2 === 0 ? 2 : -2, -index * 4, 0]
  
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Text
        position={[index % 2 === 0 ? 1 : -1, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX={index % 2 === 0 ? "left" : "right"}
        maxWidth={4}
      >
        {milestone.year}\n{milestone.role}\n{milestone.company}
      </Text>
    </group>
  )
}

const Timeline = () => {
  return (
    <ScrollControls pages={careerData.length} damping={0.1}>
      <Scroll>
        {careerData.map((milestone, index) => (
          <TimelineNode key={index} milestone={milestone} index={index} />
        ))}
      </Scroll>
    </ScrollControls>
  )
}

export default Timeline