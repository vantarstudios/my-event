import type { NavigationLink } from '@/types';

export function getMatchingPath(
    contextPath: string,
    paths: NavigationLink[]
): NavigationLink | undefined {
    return paths.reduce((prev, current) => {
        return contextPath.startsWith(current.href) && current.href.length > prev!.href.length ? current : prev;
    }, paths[0]);
}
