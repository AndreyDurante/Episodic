const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '215d4532dc6cfaa78fbc142a680f84dd';
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

/**
 * Gera a URL completa para imagem de pôster vertical
 */
export function getPosterUrl(path, size = 'w500') {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Gera a URL completa para imagem de fundo horizontal (backdrop)
 */
export function getBackdropUrl(path, size = 'w1280') {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Função utilitária central de requisição para a API TMDB
 */
export async function fetchFromTMDB(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'pt-BR',
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Chave de API do TMDB não configurada ou inválida. Configure a chave VITE_TMDB_API_KEY no arquivo .env.');
      }
      if (response.status === 404) {
        throw new Error('O conteúdo solicitado não foi encontrado no catálogo do TMDB.');
      }
      throw new Error(`Falha ao consultar o serviço TMDB (Código ${response.status}).`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Falha de conexão com a rede. Verifique sua conexão com a internet.', { cause: error });
    }
    throw error;
  }
}

/**
 * Retorna a lista oficial de gêneros para filmes ou séries
 */
export async function getGenres(type = 'movie') {
  const endpoint = `/genre/${type}/list`;
  const data = await fetchFromTMDB(endpoint);
  return data.genres || [];
}

/**
 * Busca recomendações no TMDB com base no tipo, gênero e clima da sessão
 */
export async function getRecommendations({ type = 'movie', genre, mood }) {
  const isTv = type === 'tv';
  const endpoint = isTv ? '/discover/tv' : '/discover/movie';

  const params = {
    sort_by: 'popularity.desc',
    'vote_count.gte': '40',
    include_adult: 'false',
  };

  if (genre) {
    params.with_genres = genre;
  }

  // Refinamento baseado no clima da sessão
  if (mood === 'tense') {
    params['vote_average.gte'] = '6.0';
  } else if (mood === 'emotional') {
    params['vote_average.gte'] = '6.5';
    params.sort_by = 'vote_average.desc';
    params['vote_count.gte'] = '100';
  } else if (mood === 'mindblowing') {
    params['vote_average.gte'] = '7.0';
  } else if (mood === 'light') {
    params.sort_by = 'popularity.desc';
  }

  const data = await fetchFromTMDB(endpoint, params);
  const results = data.results || [];

  return results.map((item) => ({
    id: item.id,
    title: item.title || item.name || 'Sem Título',
    poster: getPosterUrl(item.poster_path),
    backdrop: getBackdropUrl(item.backdrop_path),
    type: isTv ? 'tv' : 'movie',
    year: (item.release_date || item.first_air_date || '').substring(0, 4),
    rating: item.vote_average ? Number(item.vote_average.toFixed(1)) : 0,
    genres: item.genre_ids || [],
    overview: item.overview || 'Sinopse não informada pelo catálogo.',
  }));
}

/**
 * Busca detalhes completos de um título (filme ou série) por ID
 */
/**
 * Retorna os três títulos em alta do catálogo misto (filmes e séries).
 * O TMDB disponibiliza janelas de tendência diária e semanal; a semanal é
 * usada como o sinal ao vivo mais próximo para a vitrine mensal da Home.
 */
export async function getMonthlyMostWatched() {
  const data = await fetchFromTMDB('/trending/all/week');
  const rankedItems = (data.results || [])
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .slice(0, 3)
    .map((item, index) => ({
      id: item.id,
      title: item.title || item.name || 'Sem título',
      poster: getPosterUrl(item.poster_path),
      type: item.media_type,
      rankPosition: index + 1,
      rating: item.vote_average ? Number(item.vote_average.toFixed(1)) : 0,
    }));

  if (rankedItems.length !== 3) {
    throw new Error('O ranking mais assistido está indisponível no momento.');
  }

  return rankedItems;
}

export async function getContentDetails(id, type = 'movie') {
  // Se o tipo não for explícito, tenta primeiro como filme e se falhar tenta como série
  let data;
  let resolvedType = type;

  try {
    data = await fetchFromTMDB(`/${resolvedType}/${id}`);
  } catch (error) {
    if (resolvedType === 'movie') {
      resolvedType = 'tv';
      data = await fetchFromTMDB(`/${resolvedType}/${id}`);
    } else {
      throw error;
    }
  }

  const isTv = resolvedType === 'tv';

  let durationOrSeasons = 'Duração não informada';
  if (isTv) {
    const seasons = data.number_of_seasons || 1;
    durationOrSeasons = `${seasons} ${seasons === 1 ? 'temporada' : 'temporadas'}`;
  } else if (data.runtime) {
    const hours = Math.floor(data.runtime / 60);
    const minutes = data.runtime % 60;
    durationOrSeasons = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  return {
    id: data.id,
    title: data.title || data.name || 'Sem Título',
    originalTitle: data.original_title || data.original_name,
    poster: getPosterUrl(data.poster_path),
    backdrop: getBackdropUrl(data.backdrop_path),
    type: resolvedType,
    releaseDate: data.release_date || data.first_air_date || '',
    year: (data.release_date || data.first_air_date || '').substring(0, 4),
    rating: data.vote_average ? Number(data.vote_average.toFixed(1)) : 0,
    voteCount: data.vote_count || 0,
    genres: data.genres || [],
    overview: data.overview || 'Sinopse não informada pelo catálogo.',
    durationOrSeasons,
    tagline: data.tagline || null,
    status: data.status || 'Lançado',
  };
}
