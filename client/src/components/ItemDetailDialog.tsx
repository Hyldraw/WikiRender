
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ItemDetailDialogProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
  categoryType: string;
}

export default function ItemDetailDialog({ item, isOpen, onClose, categoryType }: ItemDetailDialogProps) {
  if (!item) return null;

  const getItemImage = (item: any, categoryType: string) => {
    // Use existing image if available, otherwise generate a placeholder
    if (item.data?.image) return item.data.image;
    
    // Generate placeholder based on category type
    switch (categoryType) {
      case 'characters':
        return 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
      case 'weapons':
        return 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
      case 'locations':
        return 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
      case 'items':
      case 'itens':
        return 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
      case 'entities':
      case 'entidades':
        return 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
      default:
        return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
    }
  };

  const renderItemDetails = () => {
    const data = item.data || {};
    const details = [];

    // Common fields
    if (data.description) {
      details.push({ label: 'Descrição', value: data.description });
    }

    // Category-specific fields
    switch (categoryType) {
      case 'characters':
        if (data.age) details.push({ label: 'Idade', value: data.age });
        if (data.occupation) details.push({ label: 'Ocupação', value: data.occupation });
        if (data.location) details.push({ label: 'Localização', value: data.location });
        if (data.status) details.push({ label: 'Status', value: data.status });
        break;
      
      case 'weapons':
        if (data.damage) details.push({ label: 'Dano', value: data.damage });
        if (data.range) details.push({ label: 'Alcance', value: data.range });
        if (data.rarity) details.push({ label: 'Raridade', value: data.rarity });
        if (data.ammo) details.push({ label: 'Munição', value: data.ammo });
        break;
      
      case 'locations':
        if (data.region) details.push({ label: 'Região', value: data.region });
        if (data.climate) details.push({ label: 'Clima', value: data.climate });
        if (data.danger) details.push({ label: 'Nível de Perigo', value: data.danger });
        break;
      
      case 'items':
      case 'itens':
        if (data.effect) details.push({ label: 'Efeito', value: data.effect });
        if (data.rarity) details.push({ label: 'Raridade', value: data.rarity });
        if (data.location) details.push({ label: 'Localização', value: data.location });
        if (data.battery) details.push({ label: 'Bateria', value: data.battery });
        break;
      
      case 'entities':
      case 'entidades':
        if (data.behavior) details.push({ label: 'Comportamento', value: data.behavior });
        if (data.weakness) details.push({ label: 'Fraqueza', value: data.weakness });
        if (data.spawn) details.push({ label: 'Aparição', value: data.spawn });
        if (data.danger) details.push({ label: 'Nível de Perigo', value: data.danger });
        break;
    }

    return details;
  };

  const details = renderItemDetails();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image */}
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img 
              src={getItemImage(item, categoryType)} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Type Badge */}
          <div>
            <Badge variant="outline" className="capitalize">
              {categoryType === 'characters' ? 'Personagem' :
               categoryType === 'weapons' ? 'Arma' :
               categoryType === 'locations' ? 'Localização' :
               categoryType === 'items' || categoryType === 'itens' ? 'Item' :
               categoryType === 'entities' || categoryType === 'entidades' ? 'Entidade' :
               categoryType}
            </Badge>
          </div>

          {/* Details */}
          {details.length > 0 && (
            <div className="space-y-4">
              <Separator />
              <div className="grid gap-3">
                {details.map((detail, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <span className="font-medium text-muted-foreground">
                      {detail.label}:
                    </span>
                    <span className="col-span-2">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          {item.data?.abilities && (
            <div>
              <Separator />
              <div className="mt-4">
                <h4 className="font-medium mb-2">Habilidades:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.data.abilities.map((ability: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {ability}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {item.data?.tags && item.data.tags.length > 0 && (
            <div>
              <Separator />
              <div className="mt-4">
                <h4 className="font-medium mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.data.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
