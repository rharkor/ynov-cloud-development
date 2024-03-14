export const Movies = {
  type: "object",
  properties: {
    movies: {
      type: "array",
      items: {
        type: "object",
        properties: {
          adult: { type: "boolean" },
          backdrop_path: { type: "string", nullable: true },
          genre_ids: { type: "array", items: { type: "number" } },
          id: { type: "number" },
          original_language: { type: "string" },
          original_title: { type: "string" },
          overview: { type: "string" },
          popularity: { type: "number" },
          poster_path: { type: "string" },
          release_date: { type: "string" },
          title: { type: "string" },
          video: { type: "boolean" },
          vote_average: { type: "number" },
          vote_count: { type: "number" },
        },
      },
    },
  },
}

export const GetMoviesResponse = {
  type: "object",
  properties: {
    page: { type: "number" },
    results: Movies,
    total_pages: { type: "number" },
    total_results: { type: "number" },
  },
}

export const GetMovieResponse = {
  type: "object",
  properties: {
    likes: { type: "number" },
    adult: { type: "boolean" },
    backdrop_path: { type: "string", nullable: true },
    belongs_to_collection: { type: "object" },
    budget: { type: "number" },
    genres: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
      },
    },
    homepage: { type: "string" },
    id: { type: "number" },
    imdb_id: { type: "string" },
    original_language: { type: "string" },
    original_title: { type: "string" },
    overview: { type: "string" },
    popularity: { type: "number" },
    poster_path: { type: "string" },
    production_companies: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          logo_path: { type: "string", nullable: true },
          name: { type: "string" },
          origin_country: { type: "string" },
        },
      },
    },
    production_countries: {
      type: "array",
      items: {
        type: "object",
        properties: {
          iso_3166_1: { type: "string" },
          name: { type: "string" },
        },
      },
    },
    release_date: { type: "string" },
    revenue: { type: "number" },
    runtime: { type: "number" },
    spoken_languages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          english_name: { type: "string" },
          iso_639_1: { type: "string" },
          name: { type: "string" },
        },
      },
    },
    status: { type: "string" },
    tagline: { type: "string" },
    title: { type: "string" },
    video: { type: "boolean" },
    vote_average: { type: "number" },
    vote_count: { type: "number" },
  },
}

export const ToggleLikeResponse = {
  type: "object",
  properties: {
    id: { type: "number" },
    liked: { type: "boolean" },
  },
}

export const GetMovieLikesResponse = {
  type: "object",
  properties: {
    id: { type: "number" },
    likes: { type: "number" },
  },
}

export const GetMovieVideosResponse = {
  type: "object",
  properties: {
    id: { type: "number" },
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          iso_639_1: { type: "string" },
          iso_3166_1: { type: "string" },
          name: { type: "string" },
          key: { type: "string" },
          site: { type: "string" },
          size: { type: "number" },
          type: { type: "string" },
          official: { type: "boolean" },
          published_at: { type: "string" },
          id: { type: "string" },
        },
      },
    },
  },
}

export const GetRecommendedMoviesResponse = {
  type: "object",
  properties: {
    results: Movies,
  },
}

export const GetPopularMoviesResponse = {
  type: "object",
  properties: {
    page: { type: "number" },
    results: Movies,
    total_pages: { type: "number" },
    total_results: { type: "number" },
  },
}
