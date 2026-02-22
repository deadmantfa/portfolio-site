import {
  Cloud, Code2, Atom, Box, Globe, Zap, FileCode, FileCode2, GitBranch,
  Crown, Brain, Lightbulb, Users, Target, Search, Layers, Terminal,
  Flame, Triangle, Smartphone, Shield, Radio, Database, Server, Cpu,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

export const SKILL_ICONS: Record<string, LucideIcon> = {
  'AWS': Cloud,
  'Python': Code2,
  'React': Atom,
  'Three.js': Box,
  'Next.js': Globe,
  'Serverless': Zap,
  'PHP': FileCode,
  'TypeScript': FileCode2,
  'DevOps': GitBranch,
  'Leadership': Crown,
  'AI Strategy': Brain,
  'Design Thinking': Lightbulb,
  'Team Building': Users,
  'Critical Thinking': Target,
  'Elasticsearch': Search,
  'Yii Framework': Layers,
  'Shell Scripting': Terminal,
  'Laravel': Flame,
  'Angular': Triangle,
  'Flutter': Smartphone,
  'PCI DSS': Shield,
  'WebSockets': Radio,
  'MySQL': Database,
  'Node.js': Server,
  'SageMaker': Cpu,
}

export function getSkillIcon(name: string): LucideIcon {
  return SKILL_ICONS[name] ?? Code2
}
