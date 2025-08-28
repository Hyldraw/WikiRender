/*
 * CONFIGURAÇÃO FÁCIL PARA ADICIONAR CONTEÚDO
 * 
 * Este arquivo facilita a adição de novos jogos, filmes e séries à plataforma.
 * Para adicionar novo conteúdo, basta seguir os exemplos abaixo.
 * 
 * ESTRUTURA:
 * 1. Definir as informações básicas (título, tipo, ano, etc.)
 * 2. Adicionar metadados específicos do tipo de conteúdo
 * 3. Definir categorias com seus respectivos itens
 */

export interface ContentItem {
  id: string;                    // ID único (usar kebab-case)
  title: string;                 // Título do conteúdo
  type: 'game' | 'movie' | 'series'; // Tipo de conteúdo
  year: string;                  // Ano de lançamento
  rating: string;                // Avaliação (ex: "9.2/10")
  description: string;           // Descrição detalhada
  poster: string;                // URL da imagem poster
  background: string;            // URL da imagem de fundo
  metadata: Record<string, any>; // Informações específicas do tipo
  categories: {                  // Categorias do conteúdo
    [key: string]: CategoryItem[];
  };
  trending?: number;             // Posição no trending (opcional)
  featured?: boolean;            // Se está em destaque (opcional)
}

export interface CategoryItem {
  id: string;                    // ID único da categoria
  name: string;                  // Nome da categoria
  type: string;                  // Tipo (characters, weapons, locations, etc.)
  data: Record<string, any>;     // Dados específicos da categoria
}

/*
 * EXEMPLOS DE USO:
 * 
 * PARA JOGOS:
 * metadata: {
 *   platform: "PlayStation/Xbox/PC/Multi-plataforma",
 *   developer: "Nome do desenvolvedor",
 *   genre: "Gênero do jogo"
 * }
 * 
 * PARA FILMES:
 * metadata: {
 *   director: "Nome do diretor",
 *   studio: "Estúdio/Distribuidora",
 *   genre: "Gênero do filme"
 * }
 * 
 * PARA SÉRIES:
 * metadata: {
 *   network: "Rede/Streaming",
 *   creator: "Criador da série",
 *   seasons: "Número de temporadas"
 * }
 * 
 * CATEGORIAS COMUNS:
 * - characters: Personagens principais e secundários
 * - weapons: Armas (para jogos/ação)
 * - locations: Localizações importantes
 * - items: Itens especiais
 * - story: Elementos da história
 * - vehicles: Veículos (se aplicável)
 * - factions: Facções/Grupos
 */

// Base de dados de conteúdo - ADICIONE NOVOS CONTEÚDOS AQUI
export const contentDatabase: Record<string, ContentItem> = {
  // ===== JOGOS =====
  'the-last-of-us': {
    id: 'the-last-of-us',
    title: 'The Last of Us',
    type: 'game',
    year: '2013',
    rating: '9.2/10',
    description: 'Em um mundo devastado por uma infecção fúngica que transformou humanos em criaturas hostis, Joel deve escoltar Ellie através dos Estados Unidos em uma jornada perigosa que testará os limites de resistência e humanidade.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      platform: 'PlayStation',
      developer: 'Naughty Dog',
      genre: 'Action/Survival'
    },
    trending: 1,
    featured: true,
    categories: {
      characters: [
        {
          id: 'joel-miller',
          name: 'Joel Miller',
          type: 'characters',
          data: {
            role: 'Principal',
            age: '50 anos',
            location: 'Boston QZ',
            status: 'Vivo',
            description: 'Contrabandista veterano que perdeu sua filha no início do apocalipse. Protetor relutante de Ellie.',
            image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66',
            tags: ['Sobrevivente', 'Contrabandista', 'Protetor']
          }
        },
        {
          id: 'ellie-williams',
          name: 'Ellie Williams',
          type: 'characters',
          data: {
            role: 'Principal',
            age: '14 anos',
            location: 'Boston QZ',
            status: 'Viva',
            description: 'Adolescente corajosa e determinada que é imune à infecção fúngica.',
            image: 'https://images.unsplash.com/photo-1494790108755-2616c9d2acbe',
            tags: ['Imune', 'Esperança', 'Corajosa']
          }
        }
      ],
      weapons: [
        {
          id: 'revolver',
          name: 'Revólver',
          type: 'weapons',
          data: {
            type: 'Arma de Fogo',
            damage: 'Alto',
            rarity: 'Comum',
            description: 'Arma confiável para combate de média distância.',
            image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f'
          }
        }
      ],
      locations: [
        {
          id: 'boston-qz',
          name: 'Boston QZ',
          type: 'locations',
          data: {
            type: 'Zona de Quarentena',
            description: 'Área controlada pelo governo militar após o surto.',
            image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df'
          }
        }
      ]
    }
  },

  // ===== EXEMPLO DE COMO ADICIONAR UM NOVO JOGO =====
  'cyberpunk-2077': {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    type: 'game',
    year: '2020',
    rating: '8.1/10',
    description: 'RPG de ação em mundo aberto ambientado em Night City, uma megalópole obcecada por poder, glamour e modificações corporais.',
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      platform: 'Multi-plataforma',
      developer: 'CD Projekt RED',
      genre: 'RPG/Cyberpunk'
    },
    trending: 4,
    featured: true,
    categories: {
      characters: [
        {
          id: 'v',
          name: 'V',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Mercenário em Night City buscando imortalidade.',
            tags: ['Protagonista', 'Mercenário', 'Cyberpunk']
          }
        }
      ]
    }
  },

  // ===== EXEMPLO DE SÉRIE =====
  'breaking-bad': {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    type: 'series',
    year: '2008',
    rating: '9.5/10',
    description: 'Um professor de química do ensino médio diagnosticado com câncer no pulmão se junta a um ex-aluno para fabricar e vender metanfetamina.',
    poster: 'https://images.unsplash.com/photo-1489599735734-79b4638ea74a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1489599735734-79b4638ea74a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      network: 'AMC',
      creator: 'Vince Gilligan',
      seasons: '5 temporadas'
    },
    trending: 2,
    featured: true,
    categories: {
      characters: [
        {
          id: 'walter-white',
          name: 'Walter White',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Professor de química que se torna fabricante de drogas.',
            tags: ['Protagonista', 'Anti-herói', 'Químico']
          }
        }
      ]
    }
  },

  // ===== EXEMPLO DE FILME =====
  'interstellar': {
    id: 'interstellar',
    title: 'Interstellar',
    type: 'movie',
    year: '2014',
    rating: '8.6/10',
    description: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
    poster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      director: 'Christopher Nolan',
      studio: 'Paramount Pictures',
      genre: 'Ficção Científica/Drama'
    },
    trending: 3,
    featured: true,
    categories: {
      characters: [
        {
          id: 'cooper',
          name: 'Cooper',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Ex-piloto da NASA que lidera a missão interestelar.',
            tags: ['Protagonista', 'Piloto', 'Pai']
          }
        }
      ]
    }
  },

  // ===== MAIS JOGOS =====
  'god-of-war': {
    id: 'god-of-war',
    title: 'God of War',
    type: 'game',
    year: '2018',
    rating: '9.0/10',
    description: 'Kratos e seu filho Atreus embarcam em uma jornada épica pela mitologia nórdica, enfrentando deuses e monstros.',
    poster: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      platform: 'PlayStation',
      developer: 'Santa Monica Studio',
      genre: 'Action/Adventure'
    },
    trending: 5,
    featured: true,
    categories: {
      characters: [
        {
          id: 'kratos',
          name: 'Kratos',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Ex-Deus da Guerra grego, agora vive nas terras nórdicas.',
            tags: ['Protagonista', 'Guerreiro', 'Pai']
          }
        }
      ]
    }
  },

  'minecraft': {
    id: 'minecraft',
    title: 'Minecraft',
    type: 'game',
    year: '2011',
    rating: '8.9/10',
    description: 'Jogo de mundo aberto onde você pode construir, explorar e sobreviver em um mundo feito de blocos.',
    poster: 'https://images.unsplash.com/photo-1606259806160-3ffd4fbef1ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1606259806160-3ffd4fbef1ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      platform: 'Multi-plataforma',
      developer: 'Mojang Studios',
      genre: 'Sandbox/Survival'
    },
    trending: 6,
    featured: true,
    categories: {
      items: [
        {
          id: 'diamond-sword',
          name: 'Espada de Diamante',
          type: 'items',
          data: {
            type: 'Arma',
            description: 'Uma das armas mais poderosas do jogo.',
            tags: ['Arma', 'Diamante', 'Melee']
          }
        }
      ]
    }
  },

  'zelda-breath-of-the-wild': {
    id: 'zelda-breath-of-the-wild',
    title: 'The Legend of Zelda: Breath of the Wild',
    type: 'game',
    year: '2017',
    rating: '9.7/10',
    description: 'Link desperta de um sono de 100 anos para salvar Hyrule da Calamidade Ganon.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      platform: 'Nintendo Switch',
      developer: 'Nintendo EPD',
      genre: 'Action/Adventure'
    },
    trending: 7,
    featured: true,
    categories: {
      characters: [
        {
          id: 'link',
          name: 'Link',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Herói de Hyrule que deve derrotar Ganon.',
            tags: ['Protagonista', 'Herói', 'Guerreiro']
          }
        }
      ]
    }
  },

  // ===== MAIS FILMES =====
  'avengers-endgame': {
    id: 'avengers-endgame',
    title: 'Avengers: Endgame',
    type: 'movie',
    year: '2019',
    rating: '8.4/10',
    description: 'Após os eventos devastadores de Guerra Infinita, os heróis restantes se unem para uma última batalha.',
    poster: 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      director: 'Anthony & Joe Russo',
      studio: 'Marvel Studios',
      genre: 'Ação/Ficção Científica'
    },
    trending: 8,
    featured: true,
    categories: {
      characters: [
        {
          id: 'iron-man',
          name: 'Tony Stark / Homem de Ferro',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Gênio bilionário filantropo com armadura tecnológica.',
            tags: ['Vingador', 'Gênio', 'Herói']
          }
        }
      ]
    }
  },

  'inception': {
    id: 'inception',
    title: 'A Origem',
    type: 'movie',
    year: '2010',
    rating: '8.8/10',
    description: 'Dom Cobb é um ladrão especializado em extrair segredos do subconsciente durante os sonhos.',
    poster: 'https://images.unsplash.com/photo-1489599735734-79b4638ea74a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1489599735734-79b4638ea74a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      director: 'Christopher Nolan',
      studio: 'Warner Bros',
      genre: 'Ficção Científica/Thriller'
    },
    trending: 9,
    featured: true,
    categories: {
      characters: [
        {
          id: 'dom-cobb',
          name: 'Dom Cobb',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Especialista em extração de informações através de sonhos.',
            tags: ['Protagonista', 'Ladrão', 'Sonhador']
          }
        }
      ]
    }
  },

  'matrix': {
    id: 'matrix',
    title: 'Matrix',
    type: 'movie',
    year: '1999',
    rating: '8.7/10',
    description: 'Neo descobre que a realidade como ele conhece é uma simulação e deve escolher entre duas pílulas.',
    poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      director: 'Lana & Lilly Wachowski',
      studio: 'Warner Bros',
      genre: 'Ficção Científica/Ação'
    },
    trending: 10,
    featured: true,
    categories: {
      characters: [
        {
          id: 'neo',
          name: 'Neo',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'O Escolhido que pode manipular a Matrix.',
            tags: ['Protagonista', 'Escolhido', 'Hacker']
          }
        }
      ]
    }
  },

  // ===== MAIS SÉRIES =====
  'stranger-things': {
    id: 'stranger-things',
    title: 'Stranger Things',
    type: 'series',
    year: '2016',
    rating: '8.7/10',
    description: 'Um grupo de crianças em uma pequena cidade enfrenta forças sobrenaturais e experimentos governamentais secretos.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      network: 'Netflix',
      creator: 'Duffer Brothers',
      seasons: '4 temporadas'
    },
    trending: 11,
    featured: true,
    categories: {
      characters: [
        {
          id: 'eleven',
          name: 'Eleven',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Garota com poderes psíquicos que escapou de um laboratório.',
            tags: ['Protagonista', 'Poderes', 'Criança']
          }
        }
      ]
    }
  },

  'the-witcher': {
    id: 'the-witcher',
    title: 'The Witcher',
    type: 'series',
    year: '2019',
    rating: '8.2/10',
    description: 'Geralt de Rivia, um caçador de monstros solitário, luta para encontrar seu lugar em um mundo onde as pessoas são mais perversas que as feras.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      network: 'Netflix',
      creator: 'Lauren Schmidt Hissrich',
      seasons: '3 temporadas'
    },
    trending: 12,
    featured: true,
    categories: {
      characters: [
        {
          id: 'geralt',
          name: 'Geralt de Rivia',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Bruxo mutante que caça monstros por dinheiro.',
            tags: ['Protagonista', 'Bruxo', 'Caçador']
          }
        }
      ]
    }
  },

  'house-of-dragon': {
    id: 'house-of-dragon',
    title: 'House of the Dragon',
    type: 'series',
    year: '2022',
    rating: '8.5/10',
    description: 'Prequel de Game of Thrones que conta a história da Casa Targaryen 200 anos antes dos eventos da série original.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      network: 'HBO',
      creator: 'Ryan J. Condal, George R.R. Martin',
      seasons: '2 temporadas'
    },
    trending: 13,
    featured: true,
    categories: {
      characters: [
        {
          id: 'rhaenyra',
          name: 'Rhaenyra Targaryen',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Herdeira do Trono de Ferro e cavaleira de dragão.',
            tags: ['Protagonista', 'Targaryen', 'Dragão']
          }
        }
      ]
    }
  },

  'wednesday': {
    id: 'wednesday',
    title: 'Wednesday',
    type: 'series',
    year: '2022',
    rating: '8.1/10',
    description: 'Wednesday Addams navega pelos seus anos como estudante na Academia Nevermore, tentando dominar sua habilidade psíquica emergente.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    background: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    metadata: {
      network: 'Netflix',
      creator: 'Alfred Gough, Miles Millar',
      seasons: '1 temporada'
    },
    trending: 14,
    featured: true,
    categories: {
      characters: [
        {
          id: 'wednesday-addams',
          name: 'Wednesday Addams',
          type: 'characters',
          data: {
            role: 'Principal',
            description: 'Adolescente gótica com poderes psíquicos.',
            tags: ['Protagonista', 'Gótica', 'Estudante']
          }
        }
      ]
    }
  },

  'doors-roblox': {
    id: 'doors-roblox',
    title: 'Doors',
    type: 'game',
    year: '2022',
    rating: '8.8/10',
    description: 'Um jogo de horror cooperativo no Roblox onde você deve atravessar 100 portas assombradas, enfrentando entidades sobrenaturais e resolvendo quebra-cabeças em um hotel misterioso.',
    poster: 'https://pbs.twimg.com/profile_images/1780045103714684929/riqHZ3nv_400x400.jpg',
    background: 'https://tr.rbxcdn.com/180DAY-af2d9b55dbc9b730d098c2fbc60902f5/768/432/Image/Webp/noFilter',
    metadata: {
      platform: 'Roblox',
      developer: 'LSPLASH',
      genre: 'Horror/Survival'
    },
    trending: 3,
    featured: true,
    categories: {
      entidades: [
        {
          id: 'rush',
          name: 'Rush',
          type: 'entidades',
          data: {
            behavior: 'Corre pelos corredores em alta velocidade',
            danger: 'Alto',
            avoidance: 'Esconda-se em armários ou camas',
            appearance: 'Criatura escura com múltiplos olhos brilhantes',
            sound: 'Rugido alto e passos rápidos'
          }
        },
        {
          id: 'ambush',
          name: 'Ambush',
          type: 'entidades',
          data: {
            behavior: 'Vai e volta múltiplas vezes pelo corredor',
            danger: 'Muito Alto',
            avoidance: 'Saia do armário entre as passadas',
            appearance: 'Similar ao Rush mas com padrão diferente',
            sound: 'Múltiplos rugidos em sequência'
          }
        },
        {
          id: 'screech',
          name: 'Screech',
          type: 'entidades',
          data: {
            behavior: 'Aparece quando você não usa lanterna em quartos escuros',
            danger: 'Médio',
            avoidance: 'Sempre use lanterna em quartos escuros',
            appearance: 'Pequena criatura preta com olhos brancos',
            sound: 'Grito agudo "Screech!"'
          }
        },
        {
          id: 'seek',
          name: 'Seek',
          type: 'entidades',
          data: {
            behavior: 'Perseguição em sequência de chase',
            danger: 'Extremo',
            avoidance: 'Corra e evite obstáculos',
            appearance: 'Massa preta com um grande olho',
            sound: 'Batimentos cardíacos intensos'
          }
        },
        {
          id: 'figure',
          name: 'Figure',
          type: 'entidades',
          data: {
            behavior: 'Cego mas com audição apurada',
            danger: 'Extremo',
            avoidance: 'Mova-se silenciosamente, use heartbeat como guia',
            appearance: 'Criatura alta e magra sem olhos',
            sound: 'Respiração pesada e passos lentos'
          }
        },
        {
          id: 'halt',
          name: 'Halt',
          type: 'entidades',
          data: {
            behavior: 'Aparece em corredores com luzes piscando',
            danger: 'Médio',
            avoidance: 'Pare quando as luzes piscarem',
            appearance: 'Figura translúcida azulada',
            sound: 'Zumbido elétrico'
          }
        }
      ],
      pisos: [
        {
          id: 'hotel-floors',
          name: 'Pisos do Hotel',
          type: 'pisos',
          data: {
            range: 'Portas 1-100',
            theme: 'Hotel clássico assombrado',
            difficulty: 'Progressivo',
            description: 'O ambiente principal do jogo com corredores intermináveis'
          }
        },
        {
          id: 'rooms',
          name: 'The Rooms',
          type: 'pisos',
          data: {
            range: 'Área secreta',
            theme: 'Backrooms amarelados',
            difficulty: 'Extremo',
            description: 'Área secreta infinita com entidades únicas'
          }
        },
        {
          id: 'floor-2',
          name: 'Piso 2 - Mines',
          type: 'pisos',
          data: {
            range: 'Portas 101-150',
            theme: 'Minas subterrâneas',
            difficulty: 'Muito Alto',
            description: 'Área de mineração com novos desafios e entidades'
          }
        }
      ],
      eventos: [
        {
          id: 'seek-chase',
          name: 'Perseguição do Seek',
          type: 'eventos',
          data: {
            trigger: 'Portas 30-45',
            duration: '2-3 minutos',
            objective: 'Correr e evitar obstáculos',
            description: 'Sequência intensa de fuga da entidade Seek'
          }
        },
        {
          id: 'library-puzzle',
          name: 'Quebra-cabeça da Biblioteca',
          type: 'eventos',
          data: {
            trigger: 'Porta 50',
            duration: '5-10 minutos',
            objective: 'Encontrar 8 livros sem fazer barulho',
            description: 'Resolver puzzle na biblioteca evitando o Figure'
          }
        },
        {
          id: 'greenhouse-maze',
          name: 'Labirinto da Estufa',
          type: 'eventos',
          data: {
            trigger: 'Portas 90-95',
            duration: '3-5 minutos',
            objective: 'Navegar no escuro usando pistas sonoras',
            description: 'Encontrar a saída da estufa no escuro'
          }
        },
        {
          id: 'door-100',
          name: 'Confronto Final',
          type: 'eventos',
          data: {
            trigger: 'Porta 100',
            duration: '1-2 minutos',
            objective: 'Escapar do Figure final',
            description: 'Batalha final contra o Figure gigante'
          }
        }
      ],
      itens: [
        {
          id: 'flashlight',
          name: 'Lanterna',
          type: 'itens',
          data: {
            function: 'Ilumina quartos escuros',
            battery: 'Limitada - use com moderação',
            importance: 'Essencial',
            location: 'Encontrada em gavetas e mesas'
          }
        },
        {
          id: 'key',
          name: 'Chave',
          type: 'itens',
          data: {
            function: 'Abre portas sem chave',
            rarity: 'Comum',
            importance: 'Necessário',
            location: 'Espalhadas pelos quartos'
          }
        },
        {
          id: 'crucifix',
          name: 'Crucifixo',
          type: 'itens',
          data: {
            function: 'Repele certas entidades',
            usage: 'Segure quando entidade se aproxima',
            effectiveness: 'Funciona contra Rush, Ambush, Eyes',
            rarity: 'Raro'
          }
        },
        {
          id: 'lockpick',
          name: 'Gazua',
          type: 'itens',
          data: {
            function: 'Abre portas sem chave',
            usage: 'Mini-jogo de timing',
            rarity: 'Incomum',
            location: 'Loja de Jeff'
          }
        },
        {
          id: 'vitamins',
          name: 'Vitaminas',
          type: 'itens',
          data: {
            function: 'Aumenta velocidade de corrida',
            duration: 'Temporário',
            rarity: 'Incomum',
            location: 'Loja de Jeff'
          }
        },
        {
          id: 'shakelight',
          name: 'Lanterna de Emergência',
          type: 'itens',
          data: {
            function: 'Lanterna que recarrega ao balançar',
            battery: 'Infinita com uso manual',
            rarity: 'Raro',
            location: 'Loja de Jeff ou quartos especiais'
          }
        }
      ]
    }
  },

  // ===== FILMES =====
};

// Helper functions for easy content management
export function addContent(content: ContentItem): void {
  contentDatabase[content.id] = content;
}

export function getContentById(id: string): ContentItem | undefined {
  return contentDatabase[id];
}

export function getAllContent(): ContentItem[] {
  return Object.values(contentDatabase);
}

export function getContentByType(type: 'game' | 'movie' | 'series'): ContentItem[] {
  return Object.values(contentDatabase).filter(content => content.type === type);
}

// Easy way to add new categories to existing content
export function addCategory(contentId: string, categoryType: string, items: CategoryItem[]): void {
  if (contentDatabase[contentId]) {
    if (!contentDatabase[contentId].categories) {
      contentDatabase[contentId].categories = {};
    }
    contentDatabase[contentId].categories[categoryType] = items;
    
    // Also update localStorage if it exists
    const storedData = localStorage.getItem('content_database');
    if (storedData) {
      const contentDb = JSON.parse(storedData);
      if (contentDb[contentId]) {
        if (!contentDb[contentId].categories) {
          contentDb[contentId].categories = {};
        }
        contentDb[contentId].categories[categoryType] = items;
        localStorage.setItem('content_database', JSON.stringify(contentDb));
      }
    }
  }
}