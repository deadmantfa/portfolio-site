import fs from 'fs';
import path from 'path';
import { careerData } from '../src/data/career';
import { projects } from '../src/data/projects';
import { skillModules } from '../src/data/skills';
import { mapCareerToMarkdown, mapProjectsToMarkdown, mapSkillsToMarkdown } from '../src/utils/github-sync-utils';

function generateREADME() {
  const careerSection = mapCareerToMarkdown(careerData);
  const projectsSection = mapProjectsToMarkdown(projects);
  const skillsSection = mapSkillsToMarkdown(skillModules);

  const template = `
<h1 align="center">Hi 👋, I'm Wenceslaus Dsilva</h1>
<h3 align="center">CTO | Software Architect | 20+ Years of Technology Leadership</h3>

<p align="center"> 
  <a href="https://github.com/ryo-ma/github-profile-trophy">
    <img src="https://github-profile-trophy.vercel.app/?username=deadmantfa&theme=onedark" alt="deadmantfa" />
  </a> 
</p>

---

## 🚀 Professional Summary
Directed technology strategy and innovation, implementing AI solutions and modern architectures to drive project success and operational efficiency. Expert in scaling platforms and leading high-performance engineering cultures.

---

## 🛠️ Technical Arsenal
${skillsSection}

---

## 💼 Architectural Journey
${careerSection}

---

## 🏗️ Featured Projects
${projectsSection}

---

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://dev.to/deadmantfa" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/dev-dot-to.svg" alt="deadmantfa" height="30" width="40" /></a>
<a href="https://twitter.com/deadmantfa" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg" alt="deadmantfa" height="30" width="40" /></a>
<a href="https://linkedin.com/in/deadmantfa" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg" alt="deadmantfa" height="30" width="40" /></a>
<a href="https://fb.com/deadmantfa" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/facebook.svg" alt="deadmantfa" height="30" width="40" /></a>
<a href="https://instagram.com/deadmantfa" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg" alt="deadmantfa" height="30" width="40" /></a>
</p>

<h3 align="left">Support:</h3>
<p>
<a href="https://www.buymeacoffee.com/deadmantfa"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="25" width="105" alt="deadmantfa" /></a>
&nbsp;[![ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/deadmantfa)
</p>

| [![Top Langs](https://github-readme-stats-one.vercel.app/api/top-langs/?username=deadmantfa&layout=compact&theme=material-palenight)](https://github.com/deadmantfa) | <img align="center" src="https://github-readme-stats-one.vercel.app/api?username=deadmantfa&show_icons=true&locale=en&layout=compact&theme=material-palenight" alt="deadmantfa" /> | <img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=deadmantfa&show_icons=true&locale=en&layout=compact&theme=material-palenight" alt="deadmantfa" /> |
| --- | --- | --- |

| [![willianrod's wakatime stats](https://github-readme-stats-one.vercel.app/api/wakatime?username=@deadmantfa&layout=compact&theme=material-palenight)](https://github.com/deadmantfa) | [![Readme Card](https://github-readme-stats-one.vercel.app/api/pin/?username=deadmantfa&repo=yii2-advanced-template-starter&theme=material-palenight&layout=compact)](https://github.com/deadmantfa/yii2-advanced-template-starter) | [![spotify-github-profile](https://spotify-github-profile.vercel.app/api/view?uid=12173715755&cover_image=true&theme=compact)](https://spotify-github-profile.vercel.app/api/view?uid=12173715755&redirect=true) |
| --- | --- | --- |

| <p align="center"><a href="https://app.daily.dev/deadmantfa"><img src="https://github.com/deadmantfa/deadmantfa/blob/main/devcard.svg" width="400" alt="Wenceslaus Dsilva's Dev Card"/></a></p> | <img src="https://raw.githubusercontent.com/deadmantfa/deadmantfa/main/metrics.plugin.skyline.svg" alt=""></img><img width="900" height="1" alt=""> |
| --- | --- |
  `.trim();

  const outputPath = process.argv[2] || path.join(__dirname, '../../deadmantfa/README.md');
  fs.writeFileSync(outputPath, template);
  console.log('README.md generated successfully at:', outputPath);
}

generateREADME();
