import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { CVData } from '../utils/cv-data-extractor';

/**
 * Professional Dark Mode styles for the executive CV.
 * Adheres to the portfolio's aesthetic: Slate/Indigo color palette.
 * Optimized for a single-page executive layout.
 */
const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#030712', // Slate 950
    color: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 16,
    borderBottom: '1px solid #1f2937', // Slate 800
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    color: '#6366f1', // Indigo 500
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    fontSize: 7.5,
    color: '#9ca3af', // Gray 400
  },
  summary: {
    marginBottom: 16,
    fontSize: 9,
    color: '#e5e7eb', // Gray 200
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1px solid #1f2937',
    marginBottom: 8,
    paddingBottom: 4,
  },
  experienceItem: {
    marginBottom: 10,
  },
  roleCompanyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  role: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#f3f4f6', // Gray 100
  },
  company: {
    fontSize: 9,
    color: '#9ca3af', // Gray 400
  },
  year: {
    fontSize: 7.5,
    color: '#818cf8', // Indigo 400
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  description: {
    marginBottom: 4,
    color: '#d1d5db', // Gray 300
    fontSize: 8.5,
  },
  highlight: {
    marginLeft: 10,
    fontSize: 7.5,
    color: '#9ca3af', // Gray 400
    marginBottom: 2,
    lineHeight: 1.3,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  skillCategory: {
    width: '46%',
    marginBottom: 6,
  },
  skillCategoryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: '#f3f4f6',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  skillList: {
    fontSize: 7.5,
    color: '#9ca3af',
  },
  metricSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0f172a', // Slate 900
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
    border: '1px solid #1e293b',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
  },
  metricLabel: {
    fontSize: 6.5,
    textTransform: 'uppercase',
    color: '#9ca3af',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTop: '1px solid #1f2937',
  },
  bridgeContent: {
    width: '78%',
  },
  bridgeTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  bridgeText: {
    fontSize: 7,
    color: '#9ca3af',
    lineHeight: 1.3,
  },
  bridgeLink: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#f3f4f6',
    marginTop: 2,
  },
  qrCode: {
    width: 50,
    height: 50,
    padding: 3,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});

const CVHeader = ({ personalInfo }: { personalInfo: CVData['personalInfo'] }) => (
  <View style={styles.header}>
    <Text style={styles.name}>{personalInfo.name}</Text>
    <Text style={styles.title}>{personalInfo.title}</Text>
    <View style={styles.contact}>
      <Text>{personalInfo.email}</Text>
      <Text>•</Text>
      <Text>{personalInfo.location}</Text>
      <Text>•</Text>
      <Text>{personalInfo.linkedin}</Text>
      <Text>•</Text>
      <Text>{personalInfo.portfolio}</Text>
    </View>
  </View>
);

const CVSummary = ({ summary }: { summary: string }) => (
  <Text style={styles.summary}>{summary}</Text>
);

const CVMetrics = ({ metrics }: { metrics: CVData['metrics'] }) => (
  <View style={styles.metricSection}>
    {metrics.map((m, i) => (
      <View key={i} style={styles.metricItem}>
        <Text style={styles.metricValue}>{m.value}</Text>
        <Text style={styles.metricLabel}>{m.label}</Text>
      </View>
    ))}
  </View>
);

const CVExperience = ({ experience }: { experience: CVData['experience'] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Architectural Journey (2006 - 2026)</Text>
    {experience.slice(0, 5).map((exp, i) => (
      <View key={i} style={styles.experienceItem}>
        <View style={styles.roleCompanyRow}>
          <Text style={styles.role}>{exp.role}</Text>
          <Text style={styles.company}>{exp.company}</Text>
        </View>
        <Text style={styles.year}>{exp.year}</Text>
        <Text style={styles.description}>{exp.description}</Text>
        {exp.highlights.slice(0, 3).map((h, j) => (
          <Text key={j} style={styles.highlight}>› {h}</Text>
        ))}
      </View>
    ))}
  </View>
);

const CVSkills = ({ skills }: { skills: CVData['skills'] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Technical Expertise</Text>
    <View style={styles.skillsGrid}>
      <View style={styles.skillCategory}>
        <Text style={styles.skillCategoryTitle}>Leadership & Strategy</Text>
        <Text style={styles.skillList}>{skills.leadership.join(', ')}</Text>
      </View>
      <View style={styles.skillCategory}>
        <Text style={styles.skillCategoryTitle}>Infrastructure & DevOps</Text>
        <Text style={styles.skillList}>{skills.infrastructure.join(', ')}</Text>
      </View>
      <View style={styles.skillCategory}>
        <Text style={styles.skillCategoryTitle}>Backend Architecture</Text>
        <Text style={styles.skillList}>{skills.backend.join(', ')}</Text>
      </View>
      <View style={styles.skillCategory}>
        <Text style={styles.skillCategoryTitle}>Frontend & Immersive</Text>
        <Text style={styles.skillList}>{skills.frontend.join(', ')}</Text>
      </View>
    </View>
  </View>
);

const CVBridge = ({ qrCode }: { qrCode?: string }) => (
  <View style={styles.footer}>
    <View style={styles.bridgeContent}>
      <Text style={styles.bridgeTitle}>Interactive Architectural Bridge</Text>
      <Text style={styles.bridgeText}>
        Scan to explore immersive 3D case studies, deep-dive ADRs, and live project demonstrations in the digital portfolio.
      </Text>
      <Text style={styles.bridgeLink}>w1d.pro/deep-dives</Text>
    </View>
    {qrCode && <Image src={qrCode} style={styles.qrCode} />}
  </View>
);

export const CVDocument = ({ data, qrCode }: { data: CVData; qrCode?: string }) => (
  <Document
    author="Wenceslaus Dsilva"
    title="Wenceslaus Dsilva CV 2026"
    subject="Chief Technology Officer & Technical Architect CV"
    keywords="CTO, Architect, Serverless, Cloud, Leadership, ROI"
    creator="Wenceslaus Dsilva Portfolio (w1d.pro)"
    producer="react-pdf"
  >
    <Page size="A4" style={styles.page}>
      <CVHeader personalInfo={data.personalInfo} />
      <CVSummary summary={data.summary} />
      <CVMetrics metrics={data.metrics} />
      <CVExperience experience={data.experience} />
      <CVSkills skills={data.skills} />
      <CVBridge qrCode={qrCode} />
    </Page>
  </Document>
);
