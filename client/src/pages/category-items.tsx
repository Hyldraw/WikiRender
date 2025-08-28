import { Link, useParams } from "wouter";
import { ChevronRight, Users, Search, ChevronLeft, Skull, MapPin, Crosshair, Package, BookOpen, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { getContentById } from "@/lib/content-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Helper component for item details popup
function ItemDetailDialog({ item, isOpen, onClose, categoryType }) {
  if (!item) return null;

  const getCategoryInfo = (type) => {
    switch (type) {
      case 'characters': return { name: 'Personagens', icon: <Users className="h-8 w-8" /> };
      case 'entities': case 'entidades': return { name: 'Entidades', icon: <Skull className="h-8 w-8" /> };
      case 'locations': return { name: 'Localizações', icon: <MapPin className="h-8 w-8" /> };
      case 'weapons': return { name: 'Armas', icon: <Crosshair className="h-8 w-8" /> };
      case 'items': case 'itens': return { name: 'Itens', icon: <Package className="h-8 w-8" /> };
      case 'pisos': return { name: 'Pisos', icon: <MapPin className="h-8 w-8" /> };
      case 'eventos': return { name: 'Eventos', icon: <Crown className="h-8 w-8" /> };
      default: return { name: type.charAt(0).toUpperCase() + type.slice(1), icon: <Users className="h-8 w-8" /> };
    }
  };

  const categoryInfo = getCategoryInfo(categoryType);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="text-primary">
                  {categoryInfo.icon}
                </div>
              </div>
              {item.name}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {item.data.image && (
            <img src={item.data.image} alt={item.name} className="w-full h-48 object-cover rounded-md" />
          )}
          <div className="space-y-4">
            {item.data.description && (
              <p className="text-muted-foreground">{item.data.description}</p>
            )}
            {Object.entries(item.data || {}).map(([key, value]) => (
              <div key={key}>
                <span className="font-semibold capitalize">{key.replace('_', ' ')}:</span> {String(value)}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CategoryItems() {
  const { id, categoryType } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Use static content data instead of API
  const content = id ? getContentById(id) : undefined;

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

  const getCategoryInfo = (type) => {
    switch (type) {
      case 'characters':
        return {
          name: 'Personagens',
          description: 'Todos os personagens memoráveis do universo de ' + content.title,
          icon: <Users className="h-8 w-8" />
        };
      case 'entities':
      case 'entidades':
        return {
          name: 'Entidades',
          description: 'Todas as entidades sobrenaturais de ' + content.title,
          icon: <Skull className="h-8 w-8" />
        };
      case 'locations':
        return {
          name: 'Localizações',
          description: 'Todos os lugares importantes de ' + content.title,
          icon: <MapPin className="h-8 w-8" />
        };
      case 'weapons':
        return {
          name: 'Armas',
          description: 'Arsenal completo disponível em ' + content.title,
          icon: <Crosshair className="h-8 w-8" />
        };
      case 'items':
      case 'itens':
        return {
          name: 'Itens',
          description: 'Todos os itens coletáveis de ' + content.title,
          icon: <Package className="h-8 w-8" />
        };
      case 'pisos':
        return {
          name: 'Pisos',
          description: 'Diferentes andares e áreas de ' + content.title,
          icon: <MapPin className="h-8 w-8" />
        };
      case 'eventos':
        return {
          name: 'Eventos',
          description: 'Momentos especiais que acontecem em ' + content.title,
          icon: <Crown className="h-8 w-8" />
        };
      default:
        return {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          description: 'Conteúdo da categoria',
          icon: <Users className="h-8 w-8" />
        };
    }
  };

  const categoryInfo = getCategoryInfo(categoryType || '');

  // Get items from static content data
  const categoryItems = content.categories?.[categoryType || ''] || [];

  const filteredItems = categoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
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

      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/content/${id}/diversos`}
          className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
          data-testid="link-back-diversos"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para Diversos
        </Link>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <div className="text-primary">
              {categoryInfo.icon}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold">{categoryInfo.name}</h1>
            <p className="text-lg text-muted-foreground">{categoryInfo.description}</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={`Buscar ${categoryInfo.name.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-48" data-testid="select-filter">
            <SelectValue placeholder="Filtrar por..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="main">Principais</SelectItem>
            <SelectItem value="secondary">Secundários</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredItems.length} {filteredItems.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </p>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Nenhum resultado encontrado</p>
          <p className="text-sm text-muted-foreground mt-2">Tente ajustar os filtros ou termo de busca</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
              data-testid={`card-item-${item.id}`}
              onClick={() => handleItemClick(item)}
            >
              {item.data.image && (
                <img
                  src={item.data.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                {item.data.description && (
                  <p className="text-muted-foreground mb-4">{item.data.description}</p>
                )}
                {item.data.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.data.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.data.role && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Função:</strong> {item.data.role}
                  </p>
                )}
                {item.data.behavior && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Comportamento:</strong> {item.data.behavior}
                  </p>
                )}
                {item.data.danger && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Perigo:</strong> {item.data.danger}
                  </p>
                )}
                {item.data.function && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Função:</strong> {item.data.function}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Detail Dialog */}
      <ItemDetailDialog
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        categoryType={categoryType || ''}
      />
    </div>
  );
}