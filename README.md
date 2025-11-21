# 🍳 Chef IA - Receitas Inteligentes com IA

<div align="center">

![Chef IA](https://img.shields.io/badge/Chef%20IA-v1.0.0-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green?style=for-the-badge&logo=openai)

**Transforme ingredientes em receitas incríveis com inteligência artificial**

[Demo](https://chef-ia.vercel.app) • [Documentação](./DOCUMENTATION.md) • [Guia de Implementação](./IMPLEMENTATION_GUIDE.md)

</div>

---

## 🎯 O que é o Chef IA?

Chef IA é uma aplicação revolucionária que usa inteligência artificial para identificar ingredientes através de fotos e gerar receitas personalizadas completas. Nunca mais se pergunte "o que vou cozinhar hoje?" - tire uma foto do seu frigorífico e deixe a IA fazer a magia!

### ✨ Funcionalidades Principais

- 📸 **Identificação Automática** - Tire foto dos ingredientes e a IA identifica tudo
- 🤖 **Receitas Personalizadas** - Receitas completas geradas por IA com passos detalhados
- 🥗 **Análise Nutricional** - Calorias, proteínas, hidratos e índice glicémico
- 📅 **Planos Semanais** - Planeamento automático de refeições para 7 dias
- 💰 **Modo Económico** - Receitas filtradas por custo (até 3€, 5€, 10€)
- ⚡ **Modo Ultra-Rápido** - Receitas em 5, 10 ou 15 minutos
- 💑 **MealMatch** - Combine ingredientes com amigos para receitas sociais
- 🛒 **Lista de Compras** - Geração automática e inteligente
- 🧊 **Frigorífico Virtual** - Gerencie ingredientes e receba notificações de validade

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- Conta OpenAI com API Key

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/chef-ia.git

# Entre na pasta
cd chef-ia

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e adicione sua OPENAI_API_KEY

# Execute em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` e comece a criar receitas!

---

## 📸 Screenshots

<div align="center">

### Página Principal
![Home](docs/screenshots/home.png)

### Identificação de Ingredientes
![Ingredients](docs/screenshots/ingredients.png)

### Receita Gerada
![Recipe](docs/screenshots/recipe.png)

### Plano Semanal
![Weekly Plan](docs/screenshots/weekly-plan.png)

</div>

---

## 🏗️ Arquitetura

```
┌─────────────────┐
│   Utilizador    │
└────────┬────────┘
         │ Foto
         ▼
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Routes    │
│   (Next.js)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   OpenAI API    │
│   (GPT-4o)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Receita       │
│   Personalizada │
└─────────────────┘
```

### Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **IA:** OpenAI GPT-4o + Vision API
- **Storage:** Local Storage (MVP) → Supabase (futuro)
- **Deploy:** Vercel

---

## 📚 Documentação

- **[Documentação Completa](./DOCUMENTATION.md)** - Arquitetura, funcionalidades e roadmap
- **[Guia de Implementação](./IMPLEMENTATION_GUIDE.md)** - Detalhes técnicos e código
- **[API Reference](./docs/API.md)** - Documentação das APIs

---

## 🎨 Design System

### Cores

```css
/* Gradiente Principal */
background: linear-gradient(135deg, #f97316 0%, #ec4899 100%);

/* Cores Sólidas */
--orange-500: #f97316;
--pink-600: #db2777;
```

### Componentes

- **Cards Premium** - Cantos arredondados (28px), sombras multicamadas
- **Botões Gradiente** - Hover com scale e sombra
- **Animações Suaves** - Transições de 300ms

---

## 🔧 Funcionalidades em Desenvolvimento

### Fase Atual (v1.0)
- ✅ Identificação básica de ingredientes
- ✅ Geração de receitas simples
- ✅ Histórico local
- ✅ Interface responsiva

### Próxima Fase (v1.1)
- 🚧 Identificação profunda (estado, quantidade)
- 🚧 Receitas completas (nutrição, variações)
- 🚧 Frigorífico virtual
- 🚧 Lista de compras inteligente

### Futuro (v2.0)
- 📝 Assistente de voz em tempo real
- 📝 Notificações inteligentes
- 📝 MealMatch social
- 📝 Integração com supermercados

Ver [Roadmap completo](./DOCUMENTATION.md#roadmap-de-desenvolvimento)

---

## 💎 Monetização

### Modelo Freemium

**Grátis:**
- 3 receitas por dia
- Identificação básica
- Histórico limitado

**Premium (9.99€/mês):**
- Receitas ilimitadas
- Planos semanais
- Assistente de voz
- Frigorífico virtual
- Análise nutricional completa

**Packs Adicionais:**
- Pack Fitness (4.99€)
- Pack Receitas Portuguesas (4.99€)
- Pack Receitas Rápidas (3.99€)

---

## 🤝 Contribuir

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

---

## 📊 Status do Projeto

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![License](https://img.shields.io/badge/license-MIT-blue)

- **Versão Atual:** 1.0.0
- **Status:** MVP em Produção
- **Última Atualização:** Janeiro 2024

---

## 🐛 Reportar Bugs

Encontrou um bug? [Abra uma issue](https://github.com/seu-usuario/chef-ia/issues/new?template=bug_report.md)

---

## 💬 Comunidade

- **Discord:** [Junte-se à comunidade](https://discord.gg/chefia)
- **Twitter:** [@ChefIA](https://twitter.com/chefia)
- **Email:** suporte@chefia.app

---

## 📄 Licença

Este projeto está sob a licença MIT. Ver [LICENSE](./LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

- [OpenAI](https://openai.com) - Pela incrível API GPT-4o
- [Vercel](https://vercel.com) - Pelo hosting e deploy
- [shadcn/ui](https://ui.shadcn.com) - Pelos componentes UI
- [Lucide](https://lucide.dev) - Pelos ícones

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=seu-usuario/chef-ia&type=Date)](https://star-history.com/#seu-usuario/chef-ia&Date)

---

<div align="center">

**Desenvolvido com ❤️ por [Lasy AI](https://lasy.ai)**

[Website](https://chefia.app) • [Documentação](./DOCUMENTATION.md) • [Blog](https://blog.chefia.app)

</div>
