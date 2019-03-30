export interface IDefineResult {
    list: IDefineWord[];
}

export interface IDefineWord {
    author: string;
    current_vote: string;
    defid: number;
    definition: string;
    example: string;
    permalink: string;
    sound_urls: string[];
    thumbs_down: number
    thumbs_up: number
    word: string;
    written_on: string;
}