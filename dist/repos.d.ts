interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    languages: string[];
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    topics: string[];
    fork: boolean;
    private: boolean;
}

export const repos: Repository[];