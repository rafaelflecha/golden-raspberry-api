/**
 * Function to split a string of producers into an array
 * @param producers String of producers separated by commas or "and"
 * @returns Array of producers
 */
export function splitProducers(producers: string): string[] {
    if (!producers) return [];
    return producers.split(/\s*(?:,|\sand)\s*/).map((p) => p.trim()).filter((p) => p.length > 0);
}
