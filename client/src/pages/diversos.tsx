
import { useParams, Link } from "wouter";
import { ChevronRight, Users, Crosshair, MapPin, Package, BookOpen, Skull, Crown, ArrowLeft, ArrowRight } from "lucide-react";
import { getContentById } from "@/lib/content-data";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";

export default function Diversos() {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState<'chat' | 'diversos'>('chat');

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ID do conteúdo não encontrado</h1>
          <Link href="/" className="text-primary hover:underline">Voltar para o início</Link>
        </div>
      </div>
    );
  }

  const content = getContentById(id);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Conteúdo não encontrado</h1>
          <Link href="/" className="text-primary hover:underline">Voltar para o início</Link>
        </div>
      </div>
    );
  }

  // Get the actual categories from the content data
  const contentCategories = content.categories || {};
  
  const getCategoryInfo = (type: string, categoryData: any[]) => {
    const count = categoryData ? categoryData.length : 0;
    
    switch (type) {
      case 'characters':
        return {
          name: 'Personagens',
          description: 'Conheça todos os personagens principais e secundários, suas histórias, motivações e relacionamentos.',
          icon: <Users className="h-8 w-8" />,
          color: 'primary',
          image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'entities':
      case 'entidades':
        return {
          name: 'Entidades',
          description: 'Todas as entidades sobrenaturais que você pode encontrar, suas características e como lidar com elas.',
          icon: <Skull className="h-8 w-8" />,
          color: 'red-500',
          image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'locations':
        return {
          name: 'Localizações',
          description: 'Explore todas as localizações importantes, seus segredos e características únicas.',
          icon: <MapPin className="h-8 w-8" />,
          color: 'green-500',
          image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'weapons':
        return {
          name: 'Armas',
          description: 'Arsenal completo disponível, incluindo armas de fogo, corpo a corpo e explosivos.',
          icon: <Crosshair className="h-8 w-8" />,
          color: 'orange-500',
          image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'items':
      case 'itens':
        return {
          name: 'Itens',
          description: 'Todos os itens coletáveis, ferramentas essenciais e objetos especiais encontrados.',
          icon: <Package className="h-8 w-8" />,
          color: 'blue-500',
          image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'pisos':
        return {
          name: 'Pisos',
          description: 'Diferentes andares e áreas do jogo, cada um com suas características únicas.',
          icon: <MapPin className="h-8 w-8" />,
          color: 'purple-500',
          image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c13a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'eventos':
        return {
          name: 'Eventos',
          description: 'Momentos especiais e desafios únicos que acontecem durante o jogo.',
          icon: <Crown className="h-8 w-8" />,
          color: 'accent',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'story':
        return {
          name: 'História',
          description: 'Análise completa da narrativa, temas abordados e desenvolvimento dos arcos dramáticos.',
          icon: <BookOpen className="h-8 w-8" />,
          color: 'secondary',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'vehicles':
        return {
          name: 'Veículos',
          description: 'Todos os veículos disponíveis, suas características e funcionalidades.',
          icon: <Package className="h-8 w-8" />,
          color: 'blue-500',
          image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'factions':
        return {
          name: 'Facções',
          description: 'Grupos e organizações importantes, suas motivações e relacionamentos.',
          icon: <Crown className="h-8 w-8" />,
          color: 'orange-500',
          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      case 'infected':
        return {
          name: 'Infectados',
          description: 'Criaturas e monstros infectados que você encontrará pelo caminho.',
          icon: <Skull className="h-8 w-8" />,
          color: 'red-500',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
      default:
        return {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          description: `Explore todos os ${type} disponíveis neste conteúdo.`,
          icon: <Package className="h-8 w-8" />,
          color: 'primary',
          image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
        };
    }
  };

  // Build categories array from the actual content data - only the categories that exist!
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
      color: info.color,
      image: info.image
    };
  }).filter(category => category.count !== "0 itens"); // Only show categories that have items

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/20',
          text: 'text-primary',
          tag: 'bg-primary/10 text-primary'
        };
      case 'accent':
        return {
          bg: 'bg-accent/20',
          text: 'text-accent',
          tag: 'bg-accent/10 text-accent'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary/20',
          text: 'text-secondary',
          tag: 'bg-secondary/10 text-secondary'
        };
      case 'red-500':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-500',
          tag: 'bg-red-500/10 text-red-500'
        };
      case 'green-500':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-500',
          tag: 'bg-green-500/10 text-green-500'
        };
      case 'purple-500':
        return {
          bg: 'bg-purple-500/20',
          text: 'text-purple-500',
          tag: 'bg-purple-500/10 text-purple-500'
        };
      case 'blue-500':
        return {
          bg: 'bg-blue-500/20',
          text: 'text-blue-500',
          tag: 'bg-blue-500/10 text-blue-500'
        };
      case 'orange-500':
        return {
          bg: 'bg-orange-500/20',
          text: 'text-orange-500',
          tag: 'bg-orange-500/10 text-orange-500'
        };
      default:
        return {
          bg: 'bg-primary/20',
          text: 'text-primary',
          tag: 'bg-primary/10 text-primary'
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors" data-testid="link-breadcrumb-home">
            Início
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link 
            href={`/content/${id}`} 
            className="hover:text-primary transition-colors"
            data-testid="link-breadcrumb-content"
          >
            {content.title}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Diversos</span>
        </div>
      </nav>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg text-muted-foreground">
          Explore todos os aspectos do universo de {content.title}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveSection('chat')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeSection === 'chat'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveSection('diversos')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeSection === 'diversos'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Diversos
          </button>
        </div>
      </div>

      {/* Content Sections */}
      {activeSection === 'chat' && (
        <section className="mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Crown className="h-6 w-6 text-primary" />
              <span>Chat sobre {content.title}</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Participe da conversa com outros fãs de {content.title}. Compartilhe teorias, dicas e experiências!
            </p>
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <p className="text-muted-foreground">Sistema de chat em desenvolvimento...</p>
              <p className="text-sm text-muted-foreground mt-2">Em breve você poderá conversar com outros usuários!</p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'diversos' && (
        <section>
          {/* Show message if no categories */}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Ainda não há categorias disponíveis para {content.title}</p>
              <p className="text-sm text-muted-foreground mt-2">As categorias serão adicionadas em breve!</p>
            </div>
          )}

          {/* Categories Carousel - Only show categories that actually exist for this content */}
          {categories.length > 0 && (
            <div className="relative">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Package className="h-6 w-6 text-primary" />
                <span>Categorias de {content.title}</span>
              </h2>
              
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {categories.map((category) => {
                    const colorClasses = getColorClasses(category.color);
                    
                    return (
                      <CarouselItem key={category.type} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <Link
                          href={`/content/${id}/category/${category.type}`}
                          className="category-detailed bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer block h-full"
                          data-testid={`card-category-${category.type}`}
                        >
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className={`w-12 h-12 ${colorClasses.bg} rounded-full flex items-center justify-center`}>
                                <div className={colorClasses.text}>
                                  {category.icon}
                                </div>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">{category.name}</h3>
                                <p className="text-sm text-muted-foreground">{category.count}</p>
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {category.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {category.tags.slice(0, 2).map((tag) => (
                                <span 
                                  key={tag}
                                  className={`${colorClasses.tag} px-2 py-1 rounded-full text-xs`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
