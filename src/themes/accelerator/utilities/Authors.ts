import type { Frontmatter } from '@config';
import type { MarkdownInstance } from 'astro';

import { getPages } from "@util/PageQueries";
import { isAuthor } from "@util/PageTypeFilters";

type BannerImage = { src: string; alt: string } | null;
type AuthorList = {
    image: BannerImage | null;
    writers: MarkdownInstance<Record<string, any>>[];
};

export async function getAuthors () {
    const authors = await getPages(isAuthor);
    return authors;
}

export async function getAuthorList (frontmatter: Frontmatter) {
    const authors = await getAuthors();

    const result: AuthorList = {
        image: null,
        writers: [],
    };

    (frontmatter.authors ?? []).forEach((a) => {
        const matches = authors.filter((x) => x.frontmatter.id == a);

        if (matches.length == 0) {
            console.warn("Unknown author", a);
        }

        if (matches.length > 1) {
            console.warn("Multiple authors with id", a);
        }

        if (matches.length == 1) {
            result.writers.push(matches[0]);
            if (result.image == null) {
                result.image = matches[0].frontmatter.bannerImage;
            }
        }
    });

    return result;
}