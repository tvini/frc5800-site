# FRC5800 — Magic Island Robotics

Site institucional responsivo criado a partir do site da equipe no Canva, do PDF de design fornecidos pela equipe. As fotos, o logotipo e as marcas em `public/assets/` vieram desses materiais.

## Executar

Requer Node.js 20.19+ e pnpm.

```bash
pnpm install
pnpm dev
```

Abra `http://127.0.0.1:5173/`. Para gerar a versão de produção, execute `pnpm build`; o resultado fica em `dist/`.

## Páginas e recursos

- Início, história, portfólio de dez projetos, páginas individuais, painel de impacto, participação na equipe, galeria de robôs, blog, patrocinadores, apoio e contato.
- Navegação móvel, busca que inclui os projetos, alternância português/inglês, filtros por área, carrossel de projetos, ampliação de fotos, seleção de temporadas, perguntas frequentes e arquivo CAD interativo.
- O arquivo CAD apresenta os quatro links de Onshape fornecidos pela equipe (2024, 2025, offseason 2025 e 2026). A visualização do modelo ocorre no Onshape, porque o serviço bloqueia a incorporação do editor em `iframe`. O acesso depende das permissões de compartilhamento de cada documento.
- Formulário de contato que prepara uma mensagem no aplicativo de e-mail do visitante. Não há servidor de envio ou armazenamento de mensagens.

Os dados das temporadas e marcos históricos foram conferidos no perfil oficial da equipe na FIRST, no perfil da equipe no LinkedIn e em notícias do IFSC. As marcas de patrocinadores são as exibidas no livro, sem afirmar que todas mantêm parceria vigente.

O PDF não traz nomes, temporadas ou fichas técnicas dos três robôs fotografados. Por isso, a galeria mostra as fotos sem atribuir dados específicos a cada robô. O blog reúne links oficiais e do acervo da equipe, sem inventar notícias. Para publicar textos próprios e receber mensagens diretamente no site, será necessário conectar um CMS e um serviço de e-mail.

Em hospedagem estática, configure o redirecionamento das rotas internas para `index.html` para que links como `/projetos` abram diretamente.
