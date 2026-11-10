import { VidalsLink, VidalsLinkLabel } from '@vidals/react-components';
import { Arrow } from '@/components/Arrow';
import { SignatureIntro } from '@/components/SignatureIntro';
import { contactEmail } from '@/config/site';
import { localizedPath } from '@/i18n/paths';
import { getTranslator } from '@/i18n/translator';
import { TypedGreeting } from './components/TypedGreeting';
import {
  glowStyles,
  nowArrowStyles,
  nowLinkStyles,
  nowValueStyles,
  sectionStyles,
  titleStyles,
} from './styles';
import type { IntroProps as Props } from './types';

/**
 * The homepage introduction: greeting, role, calls to action and what Eduardo is doing these days,
 * with the handwritten EV flying in beside it.
 * @example
 * ```tsx
 * <Intro locale="en" />
 * ```
 */
export async function Intro(props: Props) {
  const { locale } = props;
  const { messages } = await getTranslator(locale);
  const intro = messages.home.intro;

  return (
    <section id="home" aria-labelledby="intro-title" className={sectionStyles}>
      <div aria-hidden="true" className={glowStyles} />
      <div className="relative min-w-0">
        <TypedGreeting
          label={intro.roleAnimation}
          roles={intro.roles}
          pauseLabel={intro.pauseTyping}
          resumeLabel={intro.resumeTyping}
        />
        <h1 id="intro-title" className={titleStyles}>
          {intro.greeting} <span className="block text-vidals-accent">{intro.name}</span>
        </h1>
        <p className="mt-5 text-pretty text-lg font-medium sm:text-2xl">{intro.headline}</p>
        <p className="mt-2 max-w-[48ch] text-pretty text-base leading-relaxed text-vidals-muted sm:text-lg">
          {intro.subline}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <VidalsLink variant="primary" href="#projects">
            {intro.myWork} <Arrow direction="down" />
          </VidalsLink>
          <VidalsLink variant="secondary" href={'mailto:' + contactEmail}>
            {intro.emailMe} <Arrow direction="up-right" />
          </VidalsLink>
        </div>
      </div>
      <SignatureIntro>
        <div className="w-fit max-w-full py-4 lg:mx-auto">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs text-vidals-accent">
            <span aria-hidden="true" className="h-px w-8 bg-current" /> {intro.theseDays}
          </p>
          <dl className="space-y-5">
            <div>
              <dt className="text-sm text-vidals-muted">{intro.atPrudential}</dt>
              <dd className={nowValueStyles}>
                <VidalsLink
                  variant="plain"
                  href={localizedPath(locale, '/projects/#design-system')}
                  className={nowLinkStyles}
                >
                  <VidalsLinkLabel>{intro.designSystems}</VidalsLinkLabel>
                  <Arrow className={nowArrowStyles} />
                </VidalsLink>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-vidals-muted">{intro.myCompany}</dt>
              <dd className={nowValueStyles}>
                <VidalsLink
                  variant="plain"
                  href={localizedPath(locale, '/projects/software-factory/')}
                  className={nowLinkStyles}
                >
                  <VidalsLinkLabel>{intro.company}</VidalsLinkLabel>
                  <Arrow className={nowArrowStyles} />
                </VidalsLink>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-vidals-muted">{intro.offTheClock}</dt>
              <dd className={nowValueStyles}>{intro.hobby}</dd>
            </div>
          </dl>
        </div>
      </SignatureIntro>
    </section>
  );
}
