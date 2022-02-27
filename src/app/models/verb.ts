export interface Verb {
    french: string;
    russian: VerbForm;
    priority?: number;
}

export interface VerbForm {
    imperfective: string;
    perfective?: string;
    undeterminated?: string;
}

