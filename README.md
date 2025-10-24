# ME EXPLICA WEB - Plataforma de Reforço Escolar

Plataforma completa de reforço escolar para estudantes do 6º ao 9º ano, oferecendo conteúdo educacional de qualidade e acompanhamento personalizado.

## 🚀 Sobre o Projeto

O ME EXPLICA WEB é uma solução educacional que ajuda estudantes a alcançarem boas notas através de uma metodologia estruturada e acompanhamento constante. A plataforma oferece:

- 📚 Conteúdo didático completo do 6º ao 9º ano
- 👥 Sistema de gestão para organizações e funcionários
- 📊 Acompanhamento de progresso dos alunos
- 🔐 Sistema de autenticação seguro
- 📱 Interface responsiva e moderna

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI acessíveis e customizáveis
- **Framer Motion** - Animações e transições
- **React Router** - Roteamento client-side
- **TanStack Query** - Gerenciamento de estado assíncrono

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Authentication
  - Row Level Security (RLS)
  - Edge Functions
  - Storage

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Supabase (para backend)

## 🔧 Instalação e Desenvolvimento Local

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/me-explica-web.git
cd me-explica-web
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_publica
VITE_SUPABASE_PROJECT_ID=seu_project_id
```

### 4. Execute o projeto localmente

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:8080`

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

## 🚀 Deploy em Servidor Próprio

### Opção 1: Servidor VPS/Dedicado com Nginx

1. **Build do projeto:**
```bash
npm run build
```

2. **Upload dos arquivos:**
```bash
scp -r dist/* usuario@seu-servidor:/var/www/meexplicaweb/
```

3. **Configuração Nginx:**
```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;
    root /var/www/meexplicaweb;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuração de cache para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **SSL com Let's Encrypt:**
```bash
sudo certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

### Opção 2: Docker

Crie um `Dockerfile` na raiz:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build e execute:
```bash
docker build -t meexplicaweb .
docker run -p 80:80 meexplicaweb
```

## 🗄️ Configuração do Backend (Supabase)

### 1. Criar projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote a URL e as chaves de API

### 2. Executar migrations

```bash
# Instalar Supabase CLI
npm install -g supabase

# Fazer login
supabase login

# Linkar com seu projeto
supabase link --project-ref seu-project-id

# Executar migrations
supabase db push
```

### 3. Deploy das Edge Functions

```bash
supabase functions deploy process-bulk-registration
supabase functions deploy send-bulk-registration-email
```

### 4. Configurar Secrets

No dashboard do Supabase, adicione os seguintes secrets:
- `RESEND_API_KEY` - Para envio de emails
- Outros secrets necessários para suas edge functions

## 📁 Estrutura do Projeto

```
me-explica-web/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/         # Imagens e recursos
│   ├── components/     # Componentes React
│   │   ├── ui/        # Componentes UI base
│   │   └── ...        # Componentes da aplicação
│   ├── hooks/         # Custom hooks
│   ├── integrations/  # Integrações (Supabase)
│   ├── lib/           # Utilitários
│   ├── pages/         # Páginas da aplicação
│   └── main.tsx       # Entry point
├── supabase/
│   ├── functions/     # Edge functions
│   └── migrations/    # Database migrations
└── package.json
```

## 🔐 Segurança

- Todas as tabelas utilizam Row Level Security (RLS)
- Autenticação via Supabase Auth
- Variáveis sensíveis em secrets do Supabase
- HTTPS obrigatório em produção

## 📝 Licença

Este projeto é propriedade de [Sua Empresa]. Todos os direitos reservados.

## 👥 Equipe

Desenvolvido pela equipe ME EXPLICA WEB.

## 📞 Suporte

Para suporte técnico, entre em contato através de:
- Email: suporte@meexplicaweb.com.br
- Website: https://meexplicaweb.com.br

## 🔄 Atualizações

Para atualizar o projeto:

```bash
git pull origin main
npm install
npm run build
# Deploy conforme método escolhido
```

---

**Versão:** 1.0.0  
**Última atualização:** 2025
