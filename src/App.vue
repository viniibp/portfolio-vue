<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  UserRound,
} from 'lucide-vue-next'
import { portfolioData, type ProjectItem, type TimelineItem } from './content/portfolio'
import profileFallbackJpg from './assets/profile.jpg'

const appRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const navItems = [
  { label: 'Sobre', href: '#sobre', icon: UserRound },
  { label: 'Skills', href: '#skills', icon: Sparkles },
  { label: 'Timeline', href: '#timeline', icon: BriefcaseBusiness },
  { label: 'Projetos', href: '#projetos', icon: FolderKanban },
  { label: 'Contato', href: '#contato', icon: Mail },
]

const kindLabel: Record<TimelineItem['kind'], string> = {
  work: 'Experiência',
  education: 'Formação',
}

const presentationLabel: Record<NonNullable<ProjectItem['presentation']>, string> = {
  mobile: 'Mobile',
  web: 'Web',
  backend: 'Backend',
}

const getPresentationLabel = (project: ProjectItem) =>
  project.presentation ? presentationLabel[project.presentation] : 'Projeto'

const profileImageSrc = ref('/assets/profile.png')
const showProfileImage = ref(true)

const onProfileImageError = () => {
  if (profileImageSrc.value !== profileFallbackJpg) {
    profileImageSrc.value = profileFallbackJpg
    return
  }

  showProfileImage.value = false
}

const hiddenProjectImages = ref(new Set<string>())

const onProjectImageError = (src: string) => {
  hiddenProjectImages.value.add(src)
}

const getVisibleImages = (images?: string[]) =>
  (images ?? []).filter((src) => !hiddenProjectImages.value.has(src))

const getProjectPreviewImage = (project: ProjectItem) => getVisibleImages(project.images)[0] ?? null

const projectList = portfolioData.projects
const selectedProjectIndex = ref(0)
const selectedProjectImageIndex = ref(0)

const projectCards = computed(() =>
  projectList.map((project, index) => ({
    project,
    index,
    previewImage: getProjectPreviewImage(project),
  })),
)

const selectedProject = computed(() => projectList[selectedProjectIndex.value] ?? null)
const selectedProjectImages = computed(() =>
  selectedProject.value ? getVisibleImages(selectedProject.value.images) : [],
)
const selectedProjectMainImage = computed(() =>
  selectedProjectImages.value[selectedProjectImageIndex.value] ?? null,
)

watch(selectedProjectIndex, () => {
  selectedProjectImageIndex.value = 0
})

watch(selectedProjectImages, (images) => {
  if (!images.length || selectedProjectImageIndex.value >= images.length) {
    selectedProjectImageIndex.value = 0
  }
})

const selectProject = (index: number) => {
  selectedProjectIndex.value = index
}

const previousProject = () => {
  if (!projectList.length) {
    return
  }

  selectedProjectIndex.value =
    (selectedProjectIndex.value - 1 + projectList.length) % projectList.length
}

const nextProject = () => {
  if (!projectList.length) {
    return
  }

  selectedProjectIndex.value = (selectedProjectIndex.value + 1) % projectList.length
}

const previousProjectImage = () => {
  if (!selectedProjectImages.value.length) {
    return
  }

  selectedProjectImageIndex.value =
    (selectedProjectImageIndex.value - 1 + selectedProjectImages.value.length) %
    selectedProjectImages.value.length
}

const nextProjectImage = () => {
  if (!selectedProjectImages.value.length) {
    return
  }

  selectedProjectImageIndex.value =
    (selectedProjectImageIndex.value + 1) % selectedProjectImages.value.length
}

const selectProjectImage = (index: number) => {
  selectedProjectImageIndex.value = index
}

onMounted(() => {
  const targets = appRef.value?.querySelectorAll<HTMLElement>('.reveal') ?? []
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    targets.forEach((element) => element.classList.add('is-visible'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  targets.forEach((element) => observer?.observe(element))
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <div ref="appRef" class="portfolio">
    <header class="topbar">
      <a class="brand" href="#inicio">
        <span class="brand-badge">VB</span>
        <span class="brand-copy">
          <strong>{{ portfolioData.hero.name }}</strong>
          <small>{{ portfolioData.hero.role }}</small>
        </span>
      </a>

      <nav class="nav-links" aria-label="Navegação principal">
        <a v-for="item in navItems" :key="item.href" :href="item.href">
          <component :is="item.icon" :size="14" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </a>
      </nav>

      <div class="topbar-social">
        <a :href="portfolioData.social.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin :size="15" />
        </a>
        <a :href="portfolioData.social.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github :size="15" />
        </a>
      </div>
    </header>

    <main id="inicio">
      <section class="hero section">
        <div class="hero-copy reveal">
          <p class="eyebrow eyebrow-inline">
            <MapPin :size="13" aria-hidden="true" />
            <span>{{ portfolioData.hero.location }}</span>
          </p>
          <h1>{{ portfolioData.hero.name }}</h1>
          <p class="hero-role">
            <BriefcaseBusiness :size="15" aria-hidden="true" />
            <span>{{ portfolioData.hero.role }}</span>
          </p>
          <p class="hero-intro">{{ portfolioData.hero.intro }}</p>

          <div class="cta-row">
            <a class="btn btn-primary" :href="portfolioData.social.linkedin" target="_blank" rel="noopener noreferrer">
              <Linkedin :size="16" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a class="btn btn-ghost" :href="portfolioData.social.github" target="_blank" rel="noopener noreferrer">
              <Github :size="16" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>

          <p class="availability">{{ portfolioData.hero.availability }}</p>
        </div>

        <aside class="photo-card reveal" aria-label="Espaço para foto de perfil">
          <div class="photo-placeholder">
            <img
              v-if="showProfileImage"
              class="profile-photo"
              :src="profileImageSrc"
              alt="Foto de perfil de Vinicius Batista Pereira"
              loading="lazy"
              @error="onProfileImageError"
            />
            <span v-else>VB</span>
          </div>
          <p>Foto de perfil</p>
        </aside>
      </section>

      <section id="sobre" class="section">
        <div class="section-heading reveal">
          <p class="eyebrow">Apresentação</p>
          <h2>{{ portfolioData.about.title }}</h2>
        </div>

        <div class="about-grid reveal">
          <p v-for="paragraph in portfolioData.about.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
          <p class="company-note">
            Também atuo com projetos sob a marca <strong>{{ portfolioData.company.name }}</strong>.
          </p>
        </div>
      </section>

      <section id="skills" class="section">
        <div class="section-heading reveal">
          <p class="eyebrow">Competências</p>
          <h2>Skills</h2>
        </div>

        <ul class="skills-list reveal">
          <li v-for="skill in portfolioData.skills" :key="skill">{{ skill }}</li>
        </ul>
      </section>

      <section id="timeline" class="section">
        <div class="section-heading reveal">
          <p class="eyebrow">Trajetória</p>
          <h2>Timeline</h2>
        </div>

        <ol class="timeline reveal">
          <li v-for="item in portfolioData.timeline" :key="`${item.title}-${item.start}`" class="timeline-item">
            <span class="timeline-dot" aria-hidden="true"></span>
            <article class="timeline-card">
              <header>
                <p class="timeline-kind">
                  <component :is="item.kind === 'work' ? BriefcaseBusiness : GraduationCap" :size="13" aria-hidden="true" />
                  <span>{{ kindLabel[item.kind] }}</span>
                </p>
                <h3>{{ item.title }}</h3>
                <p class="timeline-org">{{ item.org }}</p>
              </header>
              <p class="timeline-period">{{ item.start }} - {{ item.end }}</p>
              <p>{{ item.description }}</p>
            </article>
          </li>
        </ol>
      </section>

      <section id="projetos" class="section">
        <div class="section-heading reveal">
          <p class="eyebrow">Portfólio</p>
          <h2>Projetos</h2>
        </div>

        <div class="project-showcase reveal">
          <div class="showcase-header">
            <p class="showcase-caption">
              <FolderKanban :size="14" aria-hidden="true" />
              <span>Catálogo de projetos</span>
            </p>
            <div class="showcase-controls">
              <button class="carousel-btn" type="button" aria-label="Projeto anterior" @click="previousProject">
                <ChevronLeft :size="17" />
              </button>
              <button class="carousel-btn" type="button" aria-label="Próximo projeto" @click="nextProject">
                <ChevronRight :size="17" />
              </button>
            </div>
          </div>

          <div class="project-strip">
            <button
              v-for="card in projectCards"
              :key="card.project.name"
              type="button"
              class="strip-item"
              :class="{
                'is-active': card.index === selectedProjectIndex,
                'is-mobile': card.project.presentation === 'mobile',
                'is-web': card.project.presentation === 'web',
                'is-backend': card.project.presentation === 'backend',
              }"
              @click="selectProject(card.index)"
            >
              <div v-if="card.previewImage" class="strip-media">
                <img
                  :src="card.previewImage"
                  :alt="`Capa do projeto ${card.project.name}`"
                  loading="lazy"
                  @error="onProjectImageError(card.previewImage)"
                />
              </div>

              <div class="strip-body" :class="{ 'is-text-only': !card.previewImage }">
                <p class="project-type">{{ getPresentationLabel(card.project) }}</p>
                <h3>{{ card.project.name }}</h3>
                <ul v-if="card.project.tags?.length" class="project-tags compact">
                  <li v-for="tag in card.project.tags" :key="card.project.name + '-' + tag">{{ tag }}</li>
                </ul>
                <p>{{ card.project.summary }}</p>
              </div>
            </button>
          </div>

          <article v-if="selectedProject" class="project-detail">
            <header class="detail-header">
              <p class="eyebrow">Projeto em destaque</p>
              <h3>{{ selectedProject.name }}</h3>
              <p class="project-type detail-type">{{ getPresentationLabel(selectedProject) }}</p>
              <p>{{ selectedProject.summary }}</p>
              <ul v-if="selectedProject.tags?.length" class="project-tags">
                <li v-for="tag in selectedProject.tags" :key="selectedProject.name + '-' + tag">{{ tag }}</li>
              </ul>
            </header>

            <div v-if="selectedProjectMainImage" class="detail-media">
              <div
                class="detail-main-image-wrap"
                :class="{
                  'is-mobile': selectedProject.presentation === 'mobile',
                  'is-web': selectedProject.presentation === 'web',
                }"
              >
                <img
                  class="detail-main-image"
                  :src="selectedProjectMainImage"
                  :alt="`Imagem principal do projeto ${selectedProject.name}`"
                  loading="lazy"
                  @error="onProjectImageError(selectedProjectMainImage)"
                />

                <button
                  v-if="selectedProjectImages.length > 1"
                  type="button"
                  class="detail-nav prev"
                  aria-label="Imagem anterior"
                  @click="previousProjectImage"
                >
                  <ChevronLeft :size="17" />
                </button>
                <button
                  v-if="selectedProjectImages.length > 1"
                  type="button"
                  class="detail-nav next"
                  aria-label="Próxima imagem"
                  @click="nextProjectImage"
                >
                  <ChevronRight :size="17" />
                </button>
              </div>

              <div v-if="selectedProjectImages.length > 1" class="detail-thumbs" :class="{ 'is-mobile': selectedProject.presentation === 'mobile' }">
                <button
                  v-for="(image, imageIndex) in selectedProjectImages"
                  :key="image"
                  type="button"
                  class="thumb-btn"
                  :class="{ 'is-active': imageIndex === selectedProjectImageIndex }"
                  @click="selectProjectImage(imageIndex)"
                >
                  <img
                    :src="image"
                    :alt="`Miniatura ${imageIndex + 1} do projeto ${selectedProject.name}`"
                    loading="lazy"
                    @error="onProjectImageError(image)"
                  />
                </button>
              </div>
            </div>

            <div v-else class="detail-no-image">
              Este projeto ainda não possui imagens. Confira os destaques abaixo.
            </div>

            <ul v-if="selectedProject.highlights?.length" class="detail-highlights">
              <li v-for="highlight in selectedProject.highlights" :key="highlight">{{ highlight }}</li>
            </ul>

            <ul class="stack-list">
              <li v-for="tech in selectedProject.stack" :key="tech">{{ tech }}</li>
            </ul>

            <a v-if="selectedProject.link" class="project-link" :href="selectedProject.link" target="_blank" rel="noopener noreferrer">
              <span>Ver projeto</span>
              <ArrowUpRight :size="15" />
            </a>
          </article>
        </div>
      </section>

      <section id="contato" class="section contact reveal">
        <p class="eyebrow">Conexão</p>
        <h2>Contato</h2>
        <p>{{ portfolioData.contact.note }}</p>
        <a class="email-link" :href="`mailto:${portfolioData.contact.email}`">
          <Mail :size="16" aria-hidden="true" />
          <span>{{ portfolioData.contact.email }}</span>
        </a>

        <div class="contact-links">
          <a :href="portfolioData.social.linkedin" target="_blank" rel="noopener noreferrer">
            <Linkedin :size="15" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a :href="portfolioData.social.github" target="_blank" rel="noopener noreferrer">
            <Github :size="15" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            v-if="portfolioData.contact.whatsappUrl && portfolioData.contact.whatsappLabel"
            :href="portfolioData.contact.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail :size="15" aria-hidden="true" />
            <span>WhatsApp: {{ portfolioData.contact.whatsappLabel }}</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2026 {{ portfolioData.company.shortName }}</p>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');

:global(html) {
  scroll-behavior: smooth;
}

:global(html),
:global(body),
:global(#app) {
  min-height: 100%;
  overflow-x: hidden;
}

:global(body) {
  overflow-y: auto;
}

:global(*),
:global(*::before),
:global(*::after) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  font-family: 'Sora', sans-serif;
  color: var(--text-main);
  background:
    radial-gradient(1100px 650px at 8% 12%, rgba(41, 88, 78, 0.38), transparent 60%),
    radial-gradient(980px 520px at 92% 20%, rgba(133, 90, 47, 0.28), transparent 58%),
    linear-gradient(165deg, #0a1117 0%, #0c1622 52%, #111720 100%);
  min-height: 100vh;
}

.portfolio {
  --bg-card: linear-gradient(150deg, rgba(17, 26, 37, 0.92), rgba(12, 19, 30, 0.9));
  --bg-soft: linear-gradient(145deg, rgba(20, 31, 45, 0.82), rgba(15, 24, 37, 0.78));
  --text-main: #ecf3ff;
  --text-muted: #a5b6ce;
  --accent: #7adfca;
  --accent-strong: #95eddc;
  --accent-alt: #efb76c;
  --stroke: rgba(174, 197, 224, 0.23);
  --stroke-soft: rgba(174, 197, 224, 0.14);
  --shadow-lg: 0 22px 48px rgba(3, 8, 15, 0.45);
  --radius-lg: 24px;
  --radius-md: 16px;
  position: relative;
  isolation: isolate;
  width: min(1120px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding: 1.6rem 0 3.2rem;
  color: var(--text-main);
}

.topbar {
  position: sticky;
  top: 0.75rem;
  z-index: 20;
  margin-top: 0;
  padding: 0.72rem 0.85rem;
  border: 1px solid var(--stroke-soft);
  border-radius: 18px;
  background: rgba(10, 16, 25, 0.72);
  backdrop-filter: blur(12px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9rem;
  align-items: center;
}

.brand {
  min-width: 0;
  color: var(--text-main);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
}

.brand-badge {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 0.78rem;
  font-weight: 800;
  color: #0f1b27;
  background: linear-gradient(130deg, var(--accent-strong), var(--accent-alt));
}

.brand-copy {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}

.brand-copy strong {
  display: block;
  font-size: 0.9rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-copy small {
  display: block;
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.nav-links {
  display: flex;
  gap: 0.35rem;
  justify-content: center;
  min-width: 0;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.82rem;
  display: inline-flex;
  align-items: center;
  gap: 0.32rem;
  padding: 0.36rem 0.56rem;
  border-radius: 8px;
  transition: color 180ms ease, background-color 180ms ease;
}

.nav-links a:hover,
.nav-links a:focus-visible {
  color: var(--text-main);
  background: rgba(124, 151, 181, 0.14);
}

.topbar-social {
  display: flex;
  gap: 0.36rem;
}

.topbar-social a {
  width: 31px;
  height: 31px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  color: var(--text-main);
  border: 1px solid var(--stroke-soft);
  background: rgba(23, 34, 49, 0.58);
  transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.topbar-social a:hover,
.topbar-social a:focus-visible {
  color: #ffe3b7;
  border-color: rgba(239, 183, 108, 0.54);
  transform: translateY(-1px);
}

.section {
  margin-top: 4.2rem;
}

.hero {
  display: grid;
  grid-template-columns: 1.3fr 0.9fr;
  gap: 1.8rem;
  margin-top: 3.2rem;
  align-items: start;
}

.hero-copy {
  position: relative;
  padding: 2.1rem;
  border: 1px solid var(--stroke);
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.hero-copy::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent-alt));
  opacity: 0.9;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.76rem;
  color: var(--accent);
  font-weight: 700;
}

.eyebrow-inline {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
}

h1,
h2,
h3 {
  font-family: 'Fraunces', serif;
  margin: 0;
  color: var(--text-main);
}

h1 {
  margin-top: 0.5rem;
  font-size: clamp(2rem, 5vw, 3.1rem);
  background: linear-gradient(130deg, #f4f7ff 14%, #c6dcff 56%, #ffd08e 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h2 {
  margin-top: 0.4rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
}

h3 {
  font-size: 1.18rem;
}

.hero-role {
  margin: 0.65rem 0 0;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  color: #dbe9ff;
}

.hero-intro {
  margin: 1rem 0 0;
  color: var(--text-muted);
  line-height: 1.72;
}

.cta-row {
  margin-top: 1.35rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 42px;
  padding: 0 1.1rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.btn:hover,
.btn:focus-visible {
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(130deg, var(--accent-strong) 0%, var(--accent-alt) 100%);
  color: #1a2129;
  box-shadow: 0 12px 24px rgba(214, 156, 88, 0.25);
}

.btn-primary:hover,
.btn-primary:focus-visible {
  box-shadow: 0 14px 28px rgba(214, 156, 88, 0.34);
}

.btn-ghost {
  border: 1px solid var(--stroke-soft);
  color: var(--text-main);
  background: rgba(23, 34, 49, 0.5);
}

.availability {
  margin: 1rem 0 0;
  color: #ffd9a6;
  font-size: 0.92rem;
}

.photo-card {
  padding: 1.3rem;
  border: 1px solid var(--stroke);
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  box-shadow: var(--shadow-lg);
  display: grid;
  place-items: center;
  text-align: center;
  gap: 0.6rem;
}

.photo-placeholder {
  width: min(250px, 100%);
  aspect-ratio: 4 / 5;
  max-height: 340px;
  border-radius: 24px;
  background: linear-gradient(148deg, #1b2f43 0%, #173136 52%, #37291d 100%);
  border: 1px solid rgba(224, 239, 255, 0.16);
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06), 0 18px 35px rgba(3, 8, 15, 0.45);
  overflow: hidden;
}

.photo-placeholder span {
  font-family: 'Fraunces', serif;
  font-size: clamp(2.2rem, 7vw, 4.4rem);
  color: rgba(231, 242, 255, 0.94);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 24%;
  display: block;
}

.photo-card p {
  margin: 0;
  font-weight: 700;
}

.section-heading p + h2 {
  margin-top: 0.35rem;
}

.section-heading h2 {
  letter-spacing: -0.02em;
}

.about-grid {
  margin-top: 1.15rem;
  padding: 1.5rem;
  border: 1px solid var(--stroke-soft);
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  display: grid;
  gap: 0.95rem;
}

.about-grid p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.8;
}

.company-note strong {
  color: #e5f2ff;
}

.skills-list {
  list-style: none;
  padding: 0;
  margin: 1.2rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skills-list li {
  padding: 0.58rem 0.9rem;
  border: 1px solid var(--stroke-soft);
  border-radius: 999px;
  background: rgba(22, 35, 50, 0.74);
  color: #d8e4f5;
  font-weight: 600;
  font-size: 0.9rem;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 1.4rem 0 0;
  position: relative;
  display: grid;
  gap: 1.2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(to bottom, rgba(122, 223, 202, 0.9), rgba(239, 183, 108, 0.16));
}

.timeline-item {
  position: relative;
  padding-left: 2.35rem;
}

.timeline-dot {
  position: absolute;
  left: 4px;
  top: 14px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid #0d1523;
  background: linear-gradient(145deg, var(--accent), var(--accent-alt));
  box-shadow: 0 0 0 3px rgba(122, 223, 202, 0.2);
}

.timeline-card {
  padding: 1.15rem 1.2rem;
  border: 1px solid var(--stroke-soft);
  border-radius: var(--radius-md);
  background: var(--bg-soft);
}

.timeline-kind {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.34rem;
  color: #90ddcc;
  font-size: 0.77rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}

.timeline-org {
  margin: 0.35rem 0 0;
  color: var(--text-muted);
}

.timeline-period {
  margin: 0.6rem 0;
  font-weight: 700;
  color: #cad8ee;
  font-size: 0.92rem;
}

.timeline-card p:last-child {
  margin: 0;
  line-height: 1.65;
  color: var(--text-muted);
}

.project-showcase {
  margin-top: 1.2rem;
  padding: 1rem;
  border: 1px solid var(--stroke);
  border-radius: var(--radius-lg);
  background: linear-gradient(150deg, rgba(15, 26, 39, 0.82), rgba(12, 21, 33, 0.75));
  display: grid;
  gap: 1rem;
}

.showcase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.showcase-caption {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #d7e6ff;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.showcase-controls {
  display: flex;
  gap: 0.4rem;
}

.carousel-btn {
  border: 1px solid var(--stroke-soft);
  background: rgba(26, 38, 55, 0.78);
  color: #deecff;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.carousel-btn:hover,
.carousel-btn:focus-visible {
  border-color: rgba(122, 223, 202, 0.85);
  background: rgba(39, 53, 72, 0.85);
}

.project-strip {
  display: flex;
  gap: 0.7rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scroll-snap-type: x proximity;
}

.strip-item {
  flex: 0 0 260px;
  border: 1px solid var(--stroke-soft);
  border-radius: 12px;
  background: rgba(20, 33, 49, 0.84);
  display: grid;
  grid-template-columns: 102px 1fr;
  gap: 0.65rem;
  padding: 0.55rem;
  color: inherit;
  text-align: left;
  cursor: pointer;
  min-height: 98px;
  scroll-snap-align: start;
}

.strip-item.is-active {
  border-color: rgba(122, 223, 202, 0.84);
  box-shadow: inset 0 0 0 1px rgba(122, 223, 202, 0.26);
}

.strip-item:not(.is-active) .strip-media img {
  filter: brightness(0.34) saturate(0.72);
}

.strip-item.is-active .strip-media img {
  filter: brightness(1);
}

.strip-media {
  border-radius: 9px;
  overflow: hidden;
  border: 1px solid var(--stroke-soft);
  min-height: 92px;
}

.strip-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.strip-item.is-mobile {
  flex-basis: 248px;
  grid-template-columns: 82px 1fr;
}

.strip-item.is-mobile .strip-media {
  background: #070c16;
  min-height: 122px;
}

.strip-item.is-mobile .strip-media img {
  object-fit: contain;
}

.strip-item.is-web {
  flex-basis: 336px;
  grid-template-columns: 1fr;
}

.strip-item.is-web .strip-media {
  height: 152px;
  min-height: 152px;
}

.strip-item.is-web .strip-body {
  gap: 0.45rem;
}

.strip-item.is-backend {
  flex-basis: 286px;
  grid-template-columns: 1fr;
}

.strip-body {
  display: grid;
  gap: 0.35rem;
  align-content: start;
}

.strip-body.is-text-only {
  grid-column: 1 / -1;
}

.strip-body h3 {
  font-family: 'Sora', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  margin: 0;
}

.strip-body p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.78rem;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-type {
  margin: 0;
  color: #9de4d4;
  font-size: 0.64rem;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  font-weight: 800;
}

.detail-type {
  margin-top: 0.5rem;
  font-size: 0.68rem;
}

.project-tags {
  margin: 0.45rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-tags li {
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(157, 228, 212, 0.33);
  color: #d7ecff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  background: rgba(24, 40, 58, 0.55);
}

.project-tags.compact {
  margin-top: 0.1rem;
}

.project-tags.compact li {
  font-size: 0.66rem;
  padding: 0.16rem 0.4rem;
}

.project-detail {
  border: 1px solid var(--stroke-soft);
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  padding: 1rem;
  display: grid;
  gap: 0.9rem;
}

.detail-header p:last-child {
  margin: 0.65rem 0 0;
  color: var(--text-muted);
  line-height: 1.65;
}

.detail-media {
  display: grid;
  gap: 0.65rem;
}

.detail-main-image-wrap {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--stroke-soft);
}

.detail-main-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.detail-main-image-wrap.is-mobile {
  max-width: 380px;
  margin: 0 auto;
  background: #070c16;
}

.detail-main-image-wrap.is-mobile .detail-main-image {
  aspect-ratio: 9 / 16;
  object-fit: contain;
}

.detail-main-image-wrap.is-web {
  background: #0b1320;
}

.detail-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(180, 206, 238, 0.3);
  background: rgba(11, 18, 30, 0.62);
  color: #e9f4ff;
  cursor: pointer;
}

.detail-nav.prev {
  left: 10px;
}

.detail-nav.next {
  right: 10px;
}

.detail-thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  gap: 0.5rem;
}

.thumb-btn {
  border: 1px solid var(--stroke-soft);
  border-radius: 10px;
  padding: 0;
  background: transparent;
  overflow: hidden;
  cursor: pointer;
}

.thumb-btn.is-active {
  border-color: rgba(122, 223, 202, 0.88);
  box-shadow: inset 0 0 0 1px rgba(122, 223, 202, 0.3);
}

.thumb-btn img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
}

.thumb-btn:not(.is-active) img {
  filter: brightness(0.5) saturate(0.75);
}

.detail-thumbs.is-mobile {
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
}

.detail-thumbs.is-mobile .thumb-btn img {
  aspect-ratio: 9 / 16;
  object-fit: cover;
}

.detail-no-image {
  border: 1px dashed rgba(145, 168, 200, 0.35);
  border-radius: 10px;
  padding: 0.95rem;
  color: var(--text-muted);
  background: rgba(18, 30, 46, 0.6);
}

.detail-highlights {
  margin: 0;
  padding-left: 1rem;
  color: #cfddf2;
  display: grid;
  gap: 0.35rem;
}

.detail-highlights li {
  line-height: 1.45;
}

.stack-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.stack-list li {
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--stroke-soft);
  color: #d8e4f5;
  font-size: 0.78rem;
  background: rgba(20, 35, 53, 0.6);
}

.project-link {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.34rem;
  color: #ffcf8f;
  text-decoration: none;
  font-weight: 700;
}

.project-link:hover,
.project-link:focus-visible {
  color: #ffe3b7;
}

.contact {
  margin-top: 4.4rem;
  border: 1px solid var(--stroke-soft);
  border-radius: var(--radius-lg);
  background: linear-gradient(125deg, rgba(22, 37, 52, 0.88), rgba(19, 28, 40, 0.78));
  padding: 1.8rem;
}

.contact p {
  margin: 0.8rem 0 0;
  color: var(--text-muted);
  line-height: 1.7;
}

.email-link {
  margin-top: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #eef6ff;
  text-decoration: none;
  font-weight: 700;
}

.contact-links {
  margin-top: 1.15rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.contact-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #ffcf8f;
  text-decoration: none;
  font-weight: 700;
}

.contact-links a:hover,
.contact-links a:focus-visible,
.email-link:hover,
.email-link:focus-visible {
  color: #ffe3b7;
}

.footer {
  margin-top: 2.5rem;
  padding: 1.1rem 0 0.2rem;
  border-top: 1px solid var(--stroke-soft);
  text-align: center;
}

.footer p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.86rem;
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 460ms ease, transform 520ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 940px) {
  .hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .portfolio {
    width: min(1120px, calc(100% - 1.4rem));
  }

  .topbar {
    border-radius: 18px;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.7rem;
  }

  .nav-links {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.2rem;
  }

  .hero-copy,
  .photo-card,
  .about-grid,
  .timeline-card,
  .project-showcase,
  .project-detail,
  .contact {
    padding: 1.1rem;
  }

  .timeline-item {
    padding-left: 2.15rem;
  }

  .strip-item {
    flex-basis: min(84vw, 300px);
  }

  .strip-item.is-web {
    flex-basis: min(88vw, 360px);
  }

  .strip-item.is-backend {
    flex-basis: min(84vw, 300px);
  }

  .strip-media {
    height: 110px;
    min-height: 110px;
  }

  .strip-item.is-mobile {
    grid-template-columns: 82px 1fr;
  }

  .strip-item.is-mobile .strip-media {
    min-height: 118px;
  }
}

@media (prefers-reduced-motion: reduce) {
  :global(html) {
    scroll-behavior: auto;
  }

  .reveal,
  .btn,
  .nav-links a {
    transition: none;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>



