import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { ChevronRight, Users, Search, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import type { Content, Category } from "@shared/schema";

export default function CategoryDetail() {
  const { id, categoryType } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const { data: content, isLoading: contentLoading } = useQuery<Content>({
    queryKey: ["/api/content", id],
    enabled: !!id,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/content", id, "categories"],
    enabled: !!id,
  });

  if (contentLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

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

  const getCategoryInfo = (type: string) => {
    switch (type) {
      case 'characters':
        return {
          name: 'Personagens',
          description: 'Todos os personagens memoráveis do universo de ' + content.title,
          icon: <Users className="h-8 w-8" />
        };
      default:
        return {
          name: 'Categoria',
          description: 'Conteúdo da categoria',
          icon: <Users className="h-8 w-8" />
        };
    }
  };

  const categoryInfo = getCategoryInfo(categoryType || '');

  // Mock character data for demonstration
  const characters = [
    {
      id: 'joel-miller',
      name: 'Joel Miller',
      role: 'Principal',
      age: '50 anos',
      location: 'Boston QZ',
      status: 'Vivo',
      description: 'Contrabandista veterano que perdeu sua filha no início do apocalipse. Protetor relutante de Ellie, desenvolvendo uma relação paternal com ela ao longo da jornada.',
      image: 'https://pixabay.com/get/g486dea1afd02682f04cde45d638a6681d95aa7eb342a66cef3a2e162ad369f6c7bed1f62e0fbf15a63b5853712babb3efed76ced847943d10006c8aa987c829a_1280.jpg',
      tags: ['Sobrevivente', 'Contrabandista', 'Protetor']
    },
    {
      id: 'ellie-williams',
      name: 'Ellie Williams',
      role: 'Principal',
      age: '14 anos',
      location: 'Boston QZ',
      status: 'Viva',
      description: 'Adolescente corajosa e determinada que é imune à infecção. Sua imunidade representa a esperança para uma possível cura da humanidade.',
      image: 'https://pixabay.com/get/g7e98680c08ec3899b85a7b38000a227f009fd6e65bae0edbabd0701413138f25701286025fdcb0b3b001c7a27f7196813a0505320b3695e66e451268b0a3fb83_1280.jpg',
      tags: ['Imune', 'Esperança', 'Corajosa']
    },
    {
      id: 'tess-servopoulos',
      name: 'Tess Servopoulos',
      role: 'Secundário',
      age: '45 anos',
      location: 'Boston QZ',
      status: 'Falecida',
      description: 'Parceira de Joel no contrabando e figura maternal para Ellie. Pragmática e determinada, faz o sacrifício supremo para proteger a missão.',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
      tags: ['Contrabandista', 'Leal', 'Sacrifício']
    },
    {
      id: 'bill',
      name: 'Bill',
      role: 'Secundário',
      age: '42 anos',
      location: 'Lincoln',
      status: 'Vivo',
      description: 'Survivista paranóico que vive isolado em uma cidade armadilhada. Apesar de sua atitude hostil, ajuda Joel e Ellie em sua jornada.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
      tags: ['Survivista', 'Paranóico', 'Engenhoso']
    },
    {
      id: 'marlene',
      name: 'Marlene',
      role: 'Antagonista',
      age: '48 anos',
      location: 'Salt Lake City',
      status: 'Falecida',
      description: 'Líder dos Vaga-lumes, grupo rebelde que busca uma cura. Disposta a sacrificar Ellie pelo bem maior da humanidade.',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
      tags: ['Líder', 'Vaga-lumes', 'Controversa']
    },
    {
      id: 'david',
      name: 'David',
      role: 'Antagonista',
      age: '55 anos',
      location: 'Lakeside Resort',
      status: 'Falecido',
      description: 'Líder carismático e manipulador de um grupo de canibais. Representa uma das ameaças mais perturbadoras que Ellie enfrenta.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500',
      tags: ['Canibal', 'Manipulador', 'Perigoso']
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Principal':
        return 'bg-primary/10 text-primary';
      case 'Secundário':
        return 'bg-secondary/10 text-secondary';
      case 'Antagonista':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Vivo':
      case 'Viva':
        return 'text-green-500';
      case 'Falecido':
      case 'Falecida':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         character.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || character.role.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

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
          <Link 
            href={`/content/${id}/diversos`} 
            className="hover:text-primary transition-colors"
            data-testid="link-breadcrumb-diversos"
          >
            Diversos
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{categoryInfo.name}</span>
        </div>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <div className="text-primary">
              {categoryInfo.icon}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold">{categoryInfo.name}</h1>
            <p className="text-lg text-muted-foreground">
              {categoryInfo.description}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Filtrar por:</label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40" data-testid="select-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="principal">Principais</SelectItem>
                <SelectItem value="secundário">Secundários</SelectItem>
                <SelectItem value="antagonista">Antagonistas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Buscar personagem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
              data-testid="input-search-characters"
            />
            <Button className="px-4 py-2" data-testid="button-search">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCharacters.map((character) => (
          <div 
            key={character.id}
            className="character-card bg-card border border-border rounded-xl overflow-hidden"
            data-testid={`card-character-${character.id}`}
          >
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{character.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(character.role)}`}>
                  {character.role}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                {character.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground w-16">Idade:</span>
                  <span>{character.age}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground w-16">Local:</span>
                  <span>{character.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground w-16">Status:</span>
                  <span className={getStatusColor(character.status)}>{character.status}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {character.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="px-3 py-2"
            data-testid="button-prev-page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            className="px-3 py-2 bg-primary text-primary-foreground"
            data-testid="button-page-1"
          >
            1
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="px-3 py-2"
            data-testid="button-page-2"
          >
            2
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="px-3 py-2"
            data-testid="button-page-3"
          >
            3
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="px-3 py-2"
            data-testid="button-next-page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
}
