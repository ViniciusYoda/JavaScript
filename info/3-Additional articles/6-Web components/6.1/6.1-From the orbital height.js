// Claro! Aqui está o texto todo adaptado para o português:

// ---

// # Do alto da órbita

// Esta seção descreve um conjunto de padrões modernos para “componentes web”.

// Atualmente, esses padrões ainda estão em desenvolvimento. Algumas funcionalidades já são bem suportadas e integradas ao padrão moderno de HTML/DOM, enquanto outras ainda estão em fase de rascunho. Você pode testar os exemplos em qualquer navegador; o Google Chrome provavelmente é o que está mais atualizado com essas funcionalidades. Acho que isso acontece porque os engenheiros do Google estão por trás de muitas dessas especificações relacionadas.

// ## O que há em comum entre…

// A ideia de componente não é nada nova. Ela é usada em muitos frameworks e em outras áreas.

// Antes de entrarmos nos detalhes de implementação, dê uma olhada nesta grande conquista da humanidade:

// *Imagem “/article/webcomponents-intro/satellite.jpg” está corrompida*
// Essa é a Estação Espacial Internacional (ISS).

// E é mais ou menos assim que ela é feita por dentro:

// *Imagem “/article/webcomponents-intro/satellite-expanded.jpg” está corrompida*
// A Estação Espacial Internacional:

// * É composta por muitos componentes.
// * Cada componente, por sua vez, tem muitos detalhes menores dentro dele.
// * Os componentes são muito complexos, muito mais complicados do que a maioria dos sites.
// * Os componentes são desenvolvidos internacionalmente, por equipes de diferentes países, falando diferentes idiomas.
// * ...E essa coisa voa, mantém humanos vivos no espaço!

// ## Como são criados dispositivos tão complexos?

// Quais princípios poderíamos “emprestar” para tornar nosso desenvolvimento igualmente confiável e escalável? Ou, pelo menos, próximo disso?

// ## Arquitetura de componentes

// A regra bem conhecida para desenvolver softwares complexos é: **não faça software complexo**.

// Se algo fica complexo — divida em partes mais simples e conecte de forma óbvia.

// Um bom arquiteto é aquele que consegue tornar o complexo simples.

// Podemos dividir a interface do usuário em componentes visuais: cada um tem seu próprio lugar na página, pode “fazer” uma tarefa bem descrita e é separado dos outros.

// Vamos dar uma olhada em um site, por exemplo, o Twitter.

// Ele se divide naturalmente em componentes:

// * Navegação superior.
// * Informações do usuário.
// * Sugestões de pessoas para seguir.
// * Formulário de postagem.
// * (e também 6, 7) – mensagens.

// Componentes podem ter subcomponentes, por exemplo, mensagens podem fazer parte de um componente “lista de mensagens” de nível superior. A própria foto clicável do usuário pode ser um componente, e assim por diante.

// ## Como decidir o que é um componente?

// Isso vem da intuição, experiência e bom senso. Normalmente é uma entidade visual separada que conseguimos descrever pelo que faz e como interage com a página. No exemplo acima, a página tem blocos e cada um desempenha seu papel, então faz sentido torná-los componentes.

// Um componente tem:

// * Sua própria classe JavaScript.
// * Estrutura DOM, gerenciada apenas por sua própria classe, sem acesso externo (“princípio da encapsulação”).
// * Estilos CSS aplicados ao componente.
// * API: eventos, métodos da classe, etc., para interagir com outros componentes.

// Repetindo, o conceito de “componente” não é nada especial.

// Existem muitos frameworks e metodologias para construí-los, cada um com seus recursos e detalhes. Geralmente, classes CSS especiais e convenções são usadas para dar a “sensação de componente” — escopo CSS e encapsulamento DOM.

// Os **componentes web** oferecem funcionalidades nativas nos navegadores para isso, então não precisamos mais emular.

// * **Elementos personalizados** — para definir elementos HTML personalizados.
// * **Shadow DOM** — para criar um DOM interno para o componente, escondido dos outros.
// * **Escopo CSS** — para declarar estilos que se aplicam somente dentro do Shadow DOM do componente.
// * Redirecionamento de eventos e outras pequenas funcionalidades para melhorar a integração dos componentes personalizados.

// No próximo capítulo, vamos nos aprofundar nos detalhes dos **Elementos Personalizados** — a funcionalidade fundamental e bem suportada dos componentes web, que já é excelente por si só.

// ---

// Quer que eu traduza/adapte mais alguma parte?
