import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchInput from "@/components/ui/search-input";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-card/80 border-b border-border sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <Crown className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">FandomHub</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={`nav-link transition-colors ${
                  isActive("/") ? "text-foreground" : "text-muted-foreground hover:text-primary"
                }`}
                data-testid="link-inicio"
              >
                Início
              </Link>
              <button className="nav-link text-muted-foreground hover:text-primary transition-colors" data-testid="button-trending">
                Em Alta
              </button>
              <button className="nav-link text-muted-foreground hover:text-primary transition-colors" data-testid="button-games">
                Jogos
              </button>
              <button className="nav-link text-muted-foreground hover:text-primary transition-colors" data-testid="button-movies">
                Filmes
              </button>
              <button className="nav-link text-muted-foreground hover:text-primary transition-colors" data-testid="button-series">
                Séries
              </button>
              <Link 
                href="/admin" 
                className={`nav-link transition-colors ${
                  isActive("/admin") ? "text-foreground" : "text-muted-foreground hover:text-primary"
                }`}
                data-testid="link-admin"
              >
                Admin
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchInput />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-foreground"
              data-testid="button-search-mobile"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card py-4">
            <div className="space-y-4">
              <SearchInput />
              <div className="space-y-2">
                <Link 
                  href="/" 
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid="link-inicio-mobile"
                >
                  Início
                </Link>
                <button className="block py-2 text-muted-foreground hover:text-primary transition-colors" data-testid="button-trending-mobile">
                  Em Alta
                </button>
                <button className="block py-2 text-muted-foreground hover:text-primary transition-colors" data-testid="button-games-mobile">
                  Jogos
                </button>
                <button className="block py-2 text-muted-foreground hover:text-primary transition-colors" data-testid="button-movies-mobile">
                  Filmes
                </button>
                <button className="block py-2 text-muted-foreground hover:text-primary transition-colors" data-testid="button-series-mobile">
                  Séries
                </button>
                <Link 
                  href="/admin" 
                  className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid="link-admin-mobile"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}