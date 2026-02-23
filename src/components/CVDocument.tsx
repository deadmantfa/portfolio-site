import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { CVData } from '../utils/cv-data-extractor';

/**
 * Professional Dark Mode styles for the executive CV.
 * Adheres to the portfolio's aesthetic: Slate/Indigo color palette.
 */
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#030712', // Slate 950
    color: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 24,
    borderBottom: '1px solid #1f2937', // Slate 800
    paddingBottom: 16,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    color: '#6366f1', // Indigo 500
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 8,
    color: '#9ca3af', // Gray 400
  },
  summary: {
    marginBottom: 24,
    fontSize: 10,
    color: '#e5e7eb', // Gray 200
    fontStyle: 'italic',
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottom: '1px solid #1f2937',
    marginBottom: 12,
    paddingBottom: 6,
  },
  experienceItem: {
    marginBottom: 16,
  },
  roleCompanyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  role: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: '#f3f4f6', // Gray 100
  },
  company: {
    fontSize: 10,
    color: '#9ca3af', // Gray 400
    fontStyle: 'italic',
  },
  year: {
    fontSize: 8,
    color: '#818cf8', // Indigo 400
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  description: {
    marginBottom: 6,
    color: '#d1d5db', // Gray 300
    fontSize: 9.5,
  },
  highlight: {
    marginLeft: 12,
    fontSize: 8.5,
    color: '#9ca3af', // Gray 400
    marginBottom: 3,
    lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  skillCategory: {
    width: '45%',
    marginBottom: 10,
  },
  skillCategoryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#f3f4f6',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  skillList: {
    fontSize: 8.5,
    color: '#9ca3af',
  },
  metricSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0f172a', // Slate 900
    padding: 12,
    borderRadius: 4,
    marginBottom: 24,
    border: '1px solid #1e293b',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
  },
  metricLabel: {
    fontSize: 7,
    textTransform: 'uppercase',
    color: '#9ca3af',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTop: '1px solid #1f2937',
  },
  bridgeContent: {
    width: '75%',
  },
  bridgeTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  bridgeText: {
    fontSize: 7.5,
    color: '#9ca3af',
    lineHeight: 1.4,
  },
  bridgeLink: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#f3f4f6',
    marginTop: 4,
  },
  qrCode: {
    width: 60,
    height: 60,
    padding: 4,
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
  <Document author="Wenceslaus Dsilva" title="Wenceslaus Dsilva CV 2026">
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
