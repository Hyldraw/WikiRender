
// Sistema de armazenamento local para avaliações
export interface Rating {
  contentId: string;
  userId: string;
  type: 'like' | 'dislike';
  timestamp: number;
}

export interface ContentRatingStats {
  contentId: string;
  likes: number;
  dislikes: number;
  totalVotes: number;
  averageRating: number; // 0-10 scale
}

const RATINGS_KEY = 'content_ratings';
const USER_RATINGS_KEY = 'user_ratings';

// Simular um ID de usuário único por sessão
const getUserId = (): string => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('user_id', userId);
  }
  return userId;
};

// Obter todas as avaliações do localStorage
const getRatings = (): Rating[] => {
  const ratings = localStorage.getItem(RATINGS_KEY);
  return ratings ? JSON.parse(ratings) : [];
};

// Salvar avaliações no localStorage
const saveRatings = (ratings: Rating[]): void => {
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
};

// Obter avaliações do usuário atual
const getUserRatings = (): Record<string, 'like' | 'dislike'> => {
  const userRatings = localStorage.getItem(USER_RATINGS_KEY);
  return userRatings ? JSON.parse(userRatings) : {};
};

// Salvar avaliações do usuário atual
const saveUserRatings = (userRatings: Record<string, 'like' | 'dislike'>): void => {
  localStorage.setItem(USER_RATINGS_KEY, JSON.stringify(userRatings));
};

// Adicionar ou atualizar avaliação
export const addOrUpdateRating = (contentId: string, ratingType: 'like' | 'dislike'): ContentRatingStats => {
  const userId = getUserId();
  const ratings = getRatings();
  const userRatings = getUserRatings();

  // Remover avaliação anterior do usuário para este conteúdo
  const filteredRatings = ratings.filter(r => !(r.contentId === contentId && r.userId === userId));

  // Adicionar nova avaliação
  const newRating: Rating = {
    contentId,
    userId,
    type: ratingType,
    timestamp: Date.now()
  };

  filteredRatings.push(newRating);
  saveRatings(filteredRatings);

  // Atualizar avaliações do usuário
  userRatings[contentId] = ratingType;
  saveUserRatings(userRatings);

  return getContentRatingStats(contentId);
};

// Remover avaliação do usuário
export const removeRating = (contentId: string): ContentRatingStats => {
  const userId = getUserId();
  const ratings = getRatings();
  const userRatings = getUserRatings();

  // Remover avaliação do usuário
  const filteredRatings = ratings.filter(r => !(r.contentId === contentId && r.userId === userId));
  saveRatings(filteredRatings);

  // Remover das avaliações do usuário
  delete userRatings[contentId];
  saveUserRatings(userRatings);

  return getContentRatingStats(contentId);
};

// Obter estatísticas de avaliação para um conteúdo
export const getContentRatingStats = (contentId: string): ContentRatingStats => {
  const ratings = getRatings();
  const contentRatings = ratings.filter(r => r.contentId === contentId);

  const likes = contentRatings.filter(r => r.type === 'like').length;
  const dislikes = contentRatings.filter(r => r.type === 'dislike').length;
  const totalVotes = likes + dislikes;

  // Calcular rating médio (0-10 scale)
  // Fórmula: (likes / totalVotes) * 10
  // Se não há votos, retorna 0
  let averageRating = 0;
  if (totalVotes > 0) {
    const likePercentage = likes / totalVotes;
    averageRating = Math.round(likePercentage * 100) / 10; // Arredondar para 1 casa decimal
  }

  return {
    contentId,
    likes,
    dislikes,
    totalVotes,
    averageRating
  };
};

// Obter avaliação do usuário para um conteúdo específico
export const getUserRating = (contentId: string): 'like' | 'dislike' | null => {
  const userRatings = getUserRatings();
  return userRatings[contentId] || null;
};

// Obter todas as estatísticas de avaliação
export const getAllRatingStats = (): ContentRatingStats[] => {
  const ratings = getRatings();
  const contentIds = [...new Set(ratings.map(r => r.contentId))];
  
  return contentIds.map(contentId => getContentRatingStats(contentId));
};

// Função para popular com dados iniciais (para demonstração)
export const populateInitialRatings = (): void => {
  // Não popular com dados iniciais - começar com tudo zerado
  // As avaliações serão criadas conforme os usuários interagem
};

// Calcular e atualizar rating de um conteúdo no formato "X.X/10"
export const getFormattedRating = (contentId: string): string => {
  const stats = getContentRatingStats(contentId);
  return `${stats.averageRating.toFixed(1)}/10`;
};
