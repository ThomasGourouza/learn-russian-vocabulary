export interface Noun {
    category?: string;
    french: NounDetail;
    russian: NounDetail;
    priority?: number;
}

export interface NounDetail {
    value: string;
    gender: string;
}
