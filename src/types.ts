export type Faculty = {
    id: number;
    faculty: string;
    subjects: string[];
    countStudents: number;
};

export type Movie = {
    id: number;
    title: string;
    year: number;
    released: string;
    runtime: string;
    genre: string[];
    director: string;
    writer: string;
    actors: string[];
    plot: string;
    country: string;
    poster: string;
    imdbRating: number;
    imdbVotes: number;
    type: string;
    boxOffice: string;
    production: string;
}