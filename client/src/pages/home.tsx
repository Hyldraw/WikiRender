import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Gamepad2, Film, Tv, Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchInput from "@/components/ui/search-input";
import { getFormattedRating, populateInitialRatings } from "@/lib/ratings-storage";
import { useEffect } from "react";
import type { Content } from "@shared/schema";

export default function Home() {
  const { data: trendingContent } = useQuery<Content[]>({
    queryKey: ["/api/content/trending"],
  });

  const { data: featuredContent } = useQuery<Content[]>({
    queryKey: ["/api/content/featured"],
  });

  // Initialize ratings system
  useEffect(() => {
    populateInitialRatings();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(245, 158, 11, 0.2) 100%), url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary/60 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-accent/60 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary/60 rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-8 max-w-6xl mx-auto px-4">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight">
              Bem-vindo ao{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FandomHub
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto">
              A plataforma definitiva para explorar o universo dos jogos, filmes e séries que você ama
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              <SearchInput />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <span className="text-white font-medium">+1000 Jogos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Film className="h-5 w-5 text-secondary" />
              <span className="text-white font-medium">+500 Filmes</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Tv className="h-5 w-5 text-accent" />
              <span className="text-white font-medium">+300 Séries</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Quick Categories */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore por Categoria</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mergulhe nos universos que mais te interessam e descubra todos os detalhes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="category-card group bg-gradient-to-br from-primary to-primary/70 rounded-2xl p-8 text-center relative overflow-hidden" data-testid="card-category-games">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Jogos</h3>
                <p className="text-white/90 mb-4">Explore universos interativos e seus segredos</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">RPG</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">FPS</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Aventura</span>
                </div>
              </div>
            </div>
            <div className="category-card group bg-gradient-to-br from-red-600 to-red-500/70 rounded-2xl p-8 text-center relative overflow-hidden" data-testid="card-category-movies">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Film className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Filmes</h3>
                <p className="text-white/90 mb-4">Cinema e suas histórias épicas</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Ação</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Ficção</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Drama</span>
                </div>
              </div>
            </div>
            <div className="category-card group bg-gradient-to-br from-accent to-accent/70 rounded-2xl p-8 text-center relative overflow-hidden" data-testid="card-category-series">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Tv className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Séries</h3>
                <p className="text-white/90 mb-4">Maratonas e narrativas envolventes</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Crime</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Fantasia</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Sci-Fi</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center space-x-2">
              <Flame className="h-8 w-8 text-secondary" />
              <span>Em Alta</span>
            </h2>
            <Button variant="link" className="text-primary hover:text-primary/80 font-medium" data-testid="button-view-all-trending">
              Ver todos
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingContent?.slice(0, 8).map((content, index: number) => (
              <Link
                key={content.id}
                href={`/content/${content.id}`}
                className="content-card group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
                data-testid={`card-trending-${content.id}`}
              >
                <div className="relative">
                  <img 
                    src={content.poster || ''} 
                    alt={content.title} 
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
                  
                  {/* Trending Badge */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1 bg-secondary text-black px-3 py-1 rounded-full text-xs font-bold">
                    <Flame className="h-3 w-3" />
                    <span>#{index + 1}</span>
                  </div>
                  
                  {/* Content Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white mb-1">{content.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/80 capitalize flex items-center space-x-1">
                        {content.type === 'game' && <Gamepad2 className="h-3 w-3" />}
                        {content.type === 'movie' && <Film className="h-3 w-3" />}
                        {content.type === 'series' && <Tv className="h-3 w-3" />}
                        <span>{content.type === 'game' ? 'Jogo' : content.type === 'movie' ? 'Filme' : 'Série'}</span>
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-secondary">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{getFormattedRating(content.id)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommendations Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center space-x-2">
              <Star className="h-8 w-8 text-accent" />
              <span>Recomendados Para Você</span>
            </h2>
            <Button variant="link" className="text-primary hover:text-primary/80 font-medium" data-testid="button-view-all-featured">
              Ver todos
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredContent?.slice(0, 12).map((content) => (
              <Link
                key={content.id}
                href={`/content/${content.id}`}
                className="content-card group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
                data-testid={`card-featured-${content.id}`}
              >
                <div className="relative">
                  <img 
                    src={content.poster || ''} 
                    alt={content.title} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 right-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center space-x-1 text-xs text-white">
                      <Star className="h-3 w-3 fill-current text-secondary" />
                      <span>{getFormattedRating(content.id)}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm truncate">{content.title}</h4>
                  <p className="text-xs text-muted-foreground capitalize">{content.type === 'game' ? 'Jogo' : content.type === 'movie' ? 'Filme' : 'Série'} • {content.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 text-primary">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.79C16.16 26.74 20 22.55 20 17V7l-10-5z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-primary">FandomHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Sua central definitiva para explorar o universo do entretenimento.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-games">Jogos</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-movies">Filmes</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-series">Séries</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-anime">Animes</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Comunidade</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-forums">Fóruns</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-discord">Discord</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-reddit">Reddit</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-twitter">Twitter</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-help">Central de Ajuda</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-contact">Contato</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-privacy">Política de Privacidade</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" data-testid="link-footer-terms">Termos de Uso</Button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FandomHub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
