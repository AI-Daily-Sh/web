export function randomTag(tags: { id: string, name: string, slug: string}[]): { id: string, name: string, slug: string} {
    return tags[Math.floor(Math.random() * tags.length)];
}