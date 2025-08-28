import { Link, useParams } from "wouter";
import { Calendar, Gamepad2, Star, Heart, Share, ChevronRight, Hash, Trophy, Users, MapPin, Crosshair, Package, BookOpen, ThumbsUp, ThumbsDown, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chat } from "@/components/ui/chat";
import { 
  addOrUpdateRating, 
  removeRating, 
  getContentRatingStats, 
  getUserRating, 
  getFormattedRating,
  populateInitialRatings 
} from "@/lib/ratings-storage";
import { useToast } from "@/hooks/use-toast";
import type { Content } from "@shared/schema";

export default function ContentDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [userRating, setUserRating] = useState<'like' | 'dislike' | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [ratingStats, setRatingStats] = useState({ likes: 0, dislikes: 0, averageRating: 0, totalVotes: 0 });

  // Use API data instead of static data
  const { data: content, isLoading, error } = useQuery<Content>({
    queryKey: ["/api/content", id],
    queryFn: () => fetch(`/api/content/${id}`).then(res => {
      if (!res.ok) throw new Error('Content not found');
      return res.json();
    }),
    enabled: !!id,
  });

  // Initialize ratings system and load user rating
  useEffect(() => {
    populateInitialRatings(); // Populate with demo data if empty

    if (id) {
      const stats = getContentRatingStats(id);
      setRatingStats(stats);

      const currentUserRating = getUserRating(id);
      setUserRating(currentUserRating);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-xl font-bold">Carregando...</h1>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Conteúdo não encontrado</h1>
          <Link href="/" className="text-primary hover:underline">Voltar para o início</Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (categoryType: string) => {
    switch (categoryType) {
      case 'characters':
        return <Users className="h-6 w-6" />;
      case 'weapons':
        return <Crosshair className="h-6 w-6" />;
      case 'locations':
        return <MapPin className="h-6 w-6" />;
      case 'items':
        return <Package className="h-6 w-6" />;
      case 'story':
        return <BookOpen className="h-6 w-6" />;
      default:
        return <Hash className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (categoryType: string) => {
    switch (categoryType) {
      case 'characters':
        return 'from-primary/20 to-primary/10 border-primary/30 text-primary';
      case 'weapons':
        return 'from-red-500/20 to-red-500/10 border-red-500/30 text-red-500';
      case 'locations':
        return 'from-secondary/20 to-secondary/10 border-secondary/30 text-secondary';
      case 'items':
        return 'from-green-500/20 to-green-500/10 border-green-500/30 text-green-500';
      case 'story':
        return 'from-purple-500/20 to-purple-500/10 border-purple-500/30 text-purple-500';
      default:
        return 'from-accent/20 to-accent/10 border-accent/30 text-accent';
    }
  };

  // Get the actual categories from the content data using the same logic as diversos.tsx
  const contentCategories = content.categories || {};

  const getCategoryInfo = (type: string, categoryData: any[]) => {
    const count = categoryData ? categoryData.length : 0;

    switch (type) {
      case 'characters':
        return {
          name: 'Personagens',
          description: 'Conheça todos os personagens principais e secundários, suas histórias, motivações e relacionamentos.',
          icon: <Users className="h-8 w-8" />,
          color: 'primary'
        };
      case 'entities':
      case 'entidades':
        return {
          name: 'Entidades',
          description: 'Todas as entidades sobrenaturais que você pode encontrar, suas características e como lidar com elas.',
          icon: <Users className="h-8 w-8" />,
          color: 'red-500'
        };
      case 'locations':
        return {
          name: 'Localizações',
          description: 'Explore todas as localizações importantes, seus segredos e características únicas.',
          icon: <MapPin className="h-8 w-8" />,
          color: 'green-500'
        };
      case 'weapons':
        return {
          name: 'Armas',
          description: 'Arsenal completo disponível, incluindo armas de fogo, corpo a corpo e explosivos.',
          icon: <Crosshair className="h-8 w-8" />,
          color: 'orange-500'
        };
      case 'items':
      case 'itens':
        return {
          name: 'Itens',
          description: 'Todos os itens coletáveis, ferramentas essenciais e objetos especiais encontrados.',
          icon: <Package className="h-8 w-8" />,
          color: 'blue-500'
        };
      case 'pisos':
        return {
          name: 'Pisos',
          description: 'Diferentes andares e áreas do jogo, cada um com suas características únicas.',
          icon: <MapPin className="h-8 w-8" />,
          color: 'purple-500'
        };
      case 'eventos':
        return {
          name: 'Eventos',
          description: 'Momentos especiais e desafios únicos que acontecem durante o jogo.',
          icon: <Users className="h-8 w-8" />,
          color: 'accent'
        };
      case 'story':
        return {
          name: 'História',
          description: 'Análise completa da narrativa, temas abordados e desenvolvimento dos arcos dramáticos.',
          icon: <BookOpen className="h-8 w-8" />,
          color: 'secondary'
        };
      case 'vehicles':
        return {
          name: 'Veículos',
          description: 'Todos os veículos disponíveis, suas características e funcionalidades.',
          icon: <Package className="h-8 w-8" />,
          color: 'blue-500'
        };
      case 'factions':
        return {
          name: 'Facções',
          description: 'Grupos e organizações importantes, suas motivações e relacionamentos.',
          icon: <Users className="h-8 w-8" />,
          color: 'orange-500'
        };
      case 'infected':
        return {
          name: 'Infectados',
          description: 'Criaturas e monstros infectados que você encontrará pelo caminho.',
          icon: <Users className="h-8 w-8" />,
          color: 'red-500'
        };
      default:
        return {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          description: `Explore todos os ${type} disponíveis neste conteúdo.`,
          icon: <Package className="h-8 w-8" />,
          color: 'primary'
        };
    }
  };

  // Build categories array exactly like diversos.tsx - same order and logic
  const categories = Object.keys(contentCategories).map(categoryType => {
    const categoryData = contentCategories[categoryType] || [];
    const info = getCategoryInfo(categoryType, categoryData);
    const count = categoryData.length;
    const sampleTags = categoryData.slice(0, 3).map((item: any) => item.name || item.title || 'Item');

    return {
      type: categoryType,
      name: info.name,
      description: info.description,
      count: `${count} ${count === 1 ? 'item' : 'itens'}`,
      tags: sampleTags,
      icon: info.icon,
      color: info.color
    };
  }).filter(category => category.count !== "0 itens"); // Only show categories that have items

  const handleRating = (rating: 'like' | 'dislike') => {
    if (!id) return;

    if (userRating === rating) {
      // Remove rating
      const stats = removeRating(id);
      setRatingStats(stats);
      setUserRating(null);
    } else {
      // Add or change rating
      const stats = addOrUpdateRating(id, rating);
      setRatingStats(stats);
      setUserRating(rating);
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: content?.title,
        text: content?.description,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  // Helper function to get color classes for category cards
  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'primary':
        return { bg: 'bg-primary/10', text: 'text-primary', tag: 'bg-primary/20 text-primary' };
      case 'red-500':
        return { bg: 'bg-red-500/10', text: 'text-red-500', tag: 'bg-red-500/20 text-red-500' };
      case 'green-500':
        return { bg: 'bg-green-500/10', text: 'text-green-500', tag: 'bg-green-500/20 text-green-500' };
      case 'blue-500':
        return { bg: 'bg-blue-500/10', text: 'text-blue-500', tag: 'bg-blue-500/20 text-blue-500' };
      case 'orange-500':
        return { bg: 'bg-orange-500/10', text: 'text-orange-500', tag: 'bg-orange-500/20 text-orange-500' };
      case 'purple-500':
        return { bg: 'bg-purple-500/10', text: 'text-purple-500', tag: 'bg-purple-500/20 text-purple-500' };
      case 'secondary':
        return { bg: 'bg-secondary/10', text: 'text-secondary', tag: 'bg-secondary/20 text-secondary' };
      case 'accent':
        return { bg: 'bg-accent/10', text: 'text-accent', tag: 'bg-accent/20 text-accent' };
      default:
        return { bg: 'bg-primary/10', text: 'text-primary', tag: 'bg-primary/20 text-primary' };
    }
  };

  return (
    <div className="min-h-screen">
      {/* Content Hero */}
      <section 
        className="relative h-screen flex items-end"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(10, 10, 11, 0.9), transparent), url('${content.background}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 pb-16">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors" data-testid="link-breadcrumb-home">
                Início
              </Link>
              <ChevronRight className="h-3 w-3" />
              <button className="hover:text-primary transition-colors capitalize" data-testid="button-breadcrumb-type">
                {content.type === 'game' ? 'Jogos' : content.type === 'movie' ? 'Filmes' : 'Séries'}
              </button>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{content.title}</span>
            </div>
          </nav>

          <div className="flex items-end space-x-8">
            {/* Logo/Poster */}
            <div className="flex-shrink-0">
              <img 
                src={content.poster || ''} 
                alt={`${content.title} Logo`}
                className="w-48 h-64 object-cover rounded-xl shadow-2xl border-2 border-white/20"
                data-testid="img-content-poster"
              />
            </div>

            {/* Content Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">{content.title}</h1>
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold capitalize">
                  {content.type === 'game' ? 'Jogo' : content.type === 'movie' ? 'Filme' : 'Série'}
                </span>
              </div>

              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{content.year}</span>
                </div>
                {content.metadata && typeof content.metadata === 'object' && 'platform' in content.metadata && (
                  <div className="flex items-center space-x-2">
                    <Gamepad2 className="h-4 w-4" />
                    <span>{(content.metadata as any).platform}</span>
                  </div>
                )}
                {content.metadata && typeof content.metadata === 'object' && 'director' in content.metadata && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{(content.metadata as any).director}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-secondary" />
                  <span>{id ? getFormattedRating(id) : content.rating}</span>
                  {ratingStats.totalVotes > 0 && (
                    <span className="text-sm text-white/70">
                      ({ratingStats.totalVotes} avaliações)
                    </span>
                  )}
                </div>
              </div>

              <p className="text-lg text-white/90 max-w-3xl leading-relaxed">
                {content.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {/* Rating System */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant={userRating === 'like' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRating('like')}
                    className={`${userRating === 'like' ? 'bg-green-600 hover:bg-green-700' : 'bg-card/80 hover:bg-card'} border-border`}
                    data-testid="button-like"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {ratingStats.likes}
                  </Button>
                  <Button
                    variant={userRating === 'dislike' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRating('dislike')}
                    className={`${userRating === 'dislike' ? 'bg-red-600 hover:bg-red-700' : 'bg-card/80 hover:bg-card'} border-border`}
                    data-testid="button-dislike"
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    {ratingStats.dislikes}
                  </Button>
                </div>

                {/* Favorites Button */}
                <Button 
                  variant={isFavorited ? 'default' : 'outline'}
                  className={`${isFavorited ? 'bg-red-600 hover:bg-red-700' : 'bg-card/80 hover:bg-card'} text-white border-border px-6 py-3`}
                  onClick={handleFavorite}
                  data-testid="button-add-favorites"
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Favoritado' : 'Favoritar'}
                </Button>

                {/* Share Button */}
                <Button 
                  variant="outline" 
                  className="bg-card/80 hover:bg-card text-foreground px-6 py-3 border-border" 
                  onClick={handleShare}
                  data-testid="button-share"
                >
                  {isShared ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Link Copiado!
                    </>
                  ) : (
                    <>
                      <Share className="h-4 w-4 mr-2" />
                      Compartilhar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Chat e Diversos Navigation */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <div className="h-6 w-6 text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                </svg>
              </div>
              <span>Chat e Diversos</span>
            </h2>
            <Link 
              href={`/content/${id}/diversos`} 
              className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
              data-testid="link-view-all-diversos"
            >
              Ver tudo
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground mb-4">
              Acesse o chat e explore todas as categorias de {content.title}
            </p>
            <Link 
              href={`/content/${id}/diversos`}
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span>Acessar Chat e Diversos</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Chat Section */}
        <section className="mb-12">
          <Chat contentId={id || ''} contentTitle={content.title} />
        </section>
      </div>
    </div>
  );
}