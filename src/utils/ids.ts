export function getScrollToId(title: string) {
    return `scroll-to-${title.toLowerCase().replace(/ /g, '-')}`;
}
