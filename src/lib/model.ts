type Shape = '💎' | '🍎' | '⌛' | '🔵' | '🍐';

export type CharacterBaseMetadata = {
    name: string;
    nameSlug: string;
    heightInCm?: number;
    outfits: {
        outfitWeightThresholdInLb: number;
        mainShape: Shape;
        secondaryShape?: Shape;
        outfit?: string;
        outfitSlug?: string;
    }[];
};

export type GameBaseMetadata = {
    name: string;
    nameSlug: string;
    darkColor: string;
    lightColor: string;
    characters: CharacterBaseMetadata[];
}
