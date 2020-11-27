export interface Apikey {
    apikey: string;
}

export interface Country {
    id: string;
    country: string;
    flag: string;
}

export interface News {
    id: number;
    cid: string;
    title: string;
    sourceName: string;
    author: string;
    description: string;
    url: string;
    image: string;
    pubDateTime: string;
    content: string;
}
