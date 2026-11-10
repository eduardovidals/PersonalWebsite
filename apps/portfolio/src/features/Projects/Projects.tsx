import { VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import { Arrow } from '@/components/Arrow';
import { projects } from '@/content/projects';
import { currentWork } from '@/content/projects/current-work';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { CurrentWorkCard } from './components/CurrentWorkCard';
import { EarlyProjectCard } from './components/EarlyProjectCard';
import { ProjectGallery, type GalleryEntry, type GalleryFilter } from './components/ProjectGallery';
import type { ProjectsProps as Props } from './types';

// Lead with Velton, then the newest employer work; keep all other projects in their published order.
const employerOrder: readonly string[] = ['software-factory', 'design-system', 'pgim-platform'];

function galleryRank(id: string) {
  const rank = employerOrder.indexOf(id);
  return rank < 0 ? employerOrder.length : rank;
}

const orderedWork = [...currentWork].sort((a, b) => galleryRank(a.id) - galleryRank(b.id));
const filters: readonly GalleryFilter[] = ['all', 'career', 'personal', 'business'];

/**
 * Every project: current work first, then early projects, filterable by kind.
 * @example
 * ```tsx
 * <Projects locale="en" />
 * ```
 */
export async function Projects(props: Props) {
  const { locale } = props;
  const { messages, format } = await getTranslator(locale);
  const page = messages.projects.page;
  const entries: GalleryEntry[] = [
    ...orderedWork.map((work) => ({
      id: work.id,
      kind: work.kind,
      card: <CurrentWorkCard work={work} locale={locale} />,
    })),
    ...projects.map((project) => ({
      id: project.slug,
      kind: project.kind,
      card: <EarlyProjectCard project={project} locale={locale} />,
    })),
  ];
  const countFor = (filter: GalleryFilter) =>
    format('projectCount', {
      count:
        filter === 'all' ? entries.length : entries.filter(({ kind }) => kind === filter).length,
    });

  return (
    <div className="shell pt-6 pb-12 text-vidals-text sm:pt-8 sm:pb-20">
      <header>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">{page.title}</h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-vidals-muted">{page.intro}</p>
      </header>
      <ProjectGallery
        entries={entries}
        filterLabel={page.filterLabel}
        options={filters.map((id) => ({ id, label: page.filters[id] }))}
        counts={{
          all: countFor('all'),
          career: countFor('career'),
          personal: countFor('personal'),
          business: countFor('business'),
        }}
      />
      <VidalsLink
        variant="plain"
        href={localizedPath(locale, '/')}
        className="mt-9 inline-flex min-h-11 items-center gap-2 text-sm text-vidals-accent"
      >
        <Arrow direction="left" /> <VidalsLinkLabel>{page.home}</VidalsLinkLabel>
      </VidalsLink>
    </div>
  );
}
