export function formatPokemonName(name: string): string {
    const capitalized =
        name.charAt(0).toUpperCase()
        + name.slice(1).toLowerCase();
    return capitalized.replace(/-/g, ' ');
}