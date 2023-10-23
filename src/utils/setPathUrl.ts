
export const setMovieUrl = (title: string, id: number | string): string => "/movie/" + id + "/" + title.replaceAll(" ", "-");

export const setTvUrl = (title: string, id: number | string): string => "/tv/" + id + "/" + title.replaceAll(" ", "-");
