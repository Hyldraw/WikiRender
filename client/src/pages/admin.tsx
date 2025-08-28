import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FileText } from "lucide-react";

export default function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Code className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Gerenciamento por Código</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-muted-foreground">
              <p>O painel admin foi removido. Agora você pode editar todo o conteúdo diretamente pelo código!</p>
              <p className="mt-2">Consulte o arquivo <code className="bg-muted px-2 py-1 rounded">client/src/lib/content-data.ts</code> para adicionar/editar conteúdo.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <FileText className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-2">Arquivo Principal</h3>
                <p className="text-sm text-muted-foreground">
                  <code>client/src/lib/content-data.ts</code><br />
                  Contém toda a base de dados de jogos, filmes e séries
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <Code className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-2">Como Editar</h3>
                <p className="text-sm text-muted-foreground">
                  Adicione novos itens ao objeto <code>contentDatabase</code><br />
                  Salve o arquivo e as mudanças aparecerão automaticamente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}