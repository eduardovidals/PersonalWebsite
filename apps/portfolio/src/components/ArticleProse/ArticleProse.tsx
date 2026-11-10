import { twMerge } from 'tailwind-merge';
import { articleProseStyles } from './styles';
import type { ArticleProseProps as Props } from './types';

/**
 * Long-form reading typography shared by the Velton story and the career story.
 * @example
 * ```tsx
 * <ArticleProse className="mt-8">
 *   <p>I build design systems and products that scale.</p>
 * </ArticleProse>
 * ```
 */
export function ArticleProse(props: Props) {
  const { children, className } = props;

  return <div className={twMerge(articleProseStyles, className)}>{children}</div>;
}
