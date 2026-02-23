import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { CVData } from '../utils/cv-data-extractor';

/**
 * Professional Dark Mode styles for the executive CV.
 * Adheres to the portfolio's aesthetic: Slate/Indigo color palette.
 * Precision-engineered for a single-page executive layout.
 */
const styles = StyleSheet.create({
  page: {
    paddingTop: 25,
    paddingBottom: 65, // Reserved for fixed footer
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: '#030712', // Slate 950
    color: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    lineHeight: 1.25,
  },
  header: {
    marginBottom: 12,
    borderBottom: '1px solid #1f2937', // Slate 800
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    fontSize: 10,
    color: '#6366f1', // Indigo 500
    fontFamily: 'Helvetica-Bold',
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    fontSize: 7.5,
    color: '#9ca3af', // Gray 400
  },
  link: {
    textDecoration: 'none',
    color: '#9ca3af',
  },
  summary: {
    marginBottom: 12,
    fontSize: 9,
    color: '#e5e7eb', // Gray 200
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottom: '1px solid #1f2937',
    marginBottom: 8,
    paddingBottom: 3,
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
    fontSize: 9.5,
    color: '#f3f4f6', // Gray 100
  },
  company: {
    fontSize: 8.5,
    color: '#9ca3af', // Gray 400
  },
  year: {
    fontSize: 7.5,
    color: '#818cf8', // Indigo 400
    marginBottom: 3,
    fontFamily: 'Helvetica-Bold',
  },
  description: {
    marginBottom: 3,
    color: '#d1d5db', // Gray 300
    fontSize: 8.5,
  },
  highlight: {
    marginLeft: 8,
    fontSize: 7.5,
    color: '#9ca3af', // Gray 400
    marginBottom: 1,
    lineHeight: 1.2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillCategory: {
    width: '48%',
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
    justifyContent: 'space-between',
    backgroundColor: '#0f172a', // Slate 900
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
    border: '1px solid #1e293b',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 6.5,
    textTransform: 'uppercase',
    color: '#9ca3af',
    marginTop: 2,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 35,
    right: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTop: '1px solid #1f2937',
  },
  bridgeContent: {
    width: '80%',
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
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#f3f4f6',
    marginTop: 2,
  },
  qrCode: {
    width: 45,
    height: 45,
    padding: 2,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});

const CVHeader = ({ personalInfo }: { personalInfo: CVData['personalInfo'] }) => (
  <View style={styles.header}>
    <View style={{ height: 28, marginBottom: 4 }}>
      <Text style={styles.name}>{personalInfo.name.toUpperCase()}</Text>
    </View>
    <View style={{ height: 14, marginBottom: 10 }}>
      <Text style={styles.title}>{personalInfo.title.toUpperCase()}</Text>
    </View>
    <View style={styles.contact}>
      <Link src={`mailto:${personalInfo.email}`} style={styles.link}>
        <Text>{personalInfo.email}</Text>
      </Link>
      <Text>•</Text>
      <Link src={`tel:${personalInfo.phone.replace(/\s/g, '')}`} style={styles.link}>
        <Text>{personalInfo.phone}</Text>
      </Link>
      <Text>•</Text>
      <Text>{personalInfo.location}</Text>
      <Text>•</Text>
      <Link src={`https://${personalInfo.linkedin}`} style={styles.link}>
        <Text>{personalInfo.linkedin}</Text>
      </Link>
      <Text>•</Text>
      <Link src={`https://${personalInfo.portfolio}`} style={styles.link}>
        <Text>{personalInfo.portfolio}</Text>
      </Link>
    </View>
  </View>
);

const CVSummary = ({ summary }: { summary: string }) => (
  <View style={styles.section}>
    <Text style={styles.summary}>{summary}</Text>
  </View>
);

const CVMetrics = ({ metrics }: { metrics: CVData['metrics'] }) => (
  <View style={styles.metricSection}>
    {metrics.slice(0, 3).map((m, i) => (
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
      <View key={i} style={styles.experienceItem} wrap={false}>
        <View style={styles.roleCompanyRow}>
          <Text style={styles.role}>{exp.role}</Text>
          <Text style={styles.company}>{exp.company}</Text>
        </View>
        <Text style={styles.year}>{exp.year}</Text>
        <Text style={styles.description}>{exp.description}</Text>
        {exp.highlights.slice(0, 2).map((h, j) => (
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
  <View style={styles.footer} fixed>
    <View style={styles.bridgeContent}>
      <Text style={styles.bridgeTitle}>Interactive Architectural Bridge</Text>
      <Text style={styles.bridgeText}>
        Scan to explore immersive 3D case studies, deep-dive ADRs, and live project demonstrations in the digital portfolio.
      </Text>
      <Link src="https://w1d.pro" style={styles.link}>
        <Text style={styles.bridgeLink}>w1d.pro</Text>
      </Link>
    </View>
    {qrCode && (
      <Link src="https://w1d.pro">
        <Image src={qrCode} style={styles.qrCode} />
      </Link>
    )}
  </View>
);

export const CVDocument = ({ data, qrCode }: { data: CVData; qrCode?: string }) => (
  <Document
    author="Wenceslaus Dsilva"
    title="Wenceslaus Dsilva CV 2026"
    subject="Chief Technology Officer & Technical Architect CV"
    keywords="CTO, Architect, Serverless, Cloud, Leadership, ROI"
    creator="Wenceslaus Dsilva (w1d.pro)"
    producer="Executive Architectural Pipeline"
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
