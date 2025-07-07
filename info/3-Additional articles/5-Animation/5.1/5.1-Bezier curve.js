// Claro! Aqui está a adaptação completa do conteúdo para o **português**, mantendo a estrutura e explicações detalhadas:

// ---

// # Curva de Bézier

// As curvas de Bézier são usadas em computação gráfica para desenhar formas, em animações com CSS e em muitos outros contextos.

// Elas são um conceito muito simples, valem a pena ser estudadas ao menos uma vez, e depois disso você se sentirá mais confortável no mundo dos gráficos vetoriais e animações avançadas.

// ---

// ## Um pouco de teoria

// Este artigo fornece uma visão teórica, porém essencial, sobre o que são curvas de Bézier. O próximo passo seria aprender como utilizá-las em animações CSS.

// Reserve um tempo para ler e compreender o conceito — isso será útil em muitos contextos.

// ---

// ## Pontos de controle

// Uma curva de Bézier é definida por **pontos de controle**.

// Podem ser 2, 3, 4 ou mais pontos.

// ### Exemplos:

// * Curva com dois pontos (reta):

// * Curva com três pontos:

// * Curva com quatro pontos:

// ---

// Se você observar bem essas curvas, notará que:

// * **Os pontos nem sempre estão sobre a curva.** Isso é perfeitamente normal — veremos depois como a curva é construída.

// * **A ordem da curva é igual ao número de pontos menos um.**

//   * 2 pontos → curva linear (reta)
//   * 3 pontos → curva quadrática (parábola)
//   * 4 pontos → curva cúbica

// * A curva **sempre fica dentro do invólucro convexo** dos pontos de controle:

// !\[exemplo de invólucro convexo]

// Graças a essa propriedade, é possível otimizar testes de interseção em gráficos computacionais. Se os invólucros convexos **não se interceptam**, então as curvas também **não se interceptam**. Checar a interseção entre invólucros convexos (retângulos, triângulos, etc.) é muito mais simples do que entre curvas.

// ---

// ## A principal utilidade

// A grande vantagem das curvas de Bézier é que **ao mover os pontos de controle, a curva muda de forma intuitiva.**

// Experimente mover os pontos com o mouse no exemplo abaixo:

// Você verá que a curva se estica ao longo das linhas tangentes dos pares de pontos (1 → 2 e 3 → 4).

// Com um pouco de prática, você saberá posicionar os pontos para obter a forma desejada. E ao conectar várias curvas, podemos desenhar praticamente qualquer coisa.

// ### Exemplos:

// (Desenhos com curvas combinadas formando formas complexas)

// ---

// ## Algoritmo de De Casteljau

// Existe uma fórmula matemática para curvas de Bézier, mas vamos abordá-la depois. Antes, veremos o **algoritmo de De Casteljau**, que é equivalente à definição matemática, mas com uma visualização clara de como a curva é construída.

// ---

// ### Exemplo com 3 pontos:

// Veja a demonstração abaixo (os pontos podem ser movidos com o mouse):

// **Passo a passo:**

// 1. Desenhe os pontos de controle (1, 2 e 3).
// 2. Construa segmentos entre os pontos (1 → 2 → 3), na cor marrom.
// 3. O parâmetro **t** varia de 0 a 1 (em passos como 0.05, por exemplo).
// 4. Para cada valor de t:

//    * Pegue um ponto proporcional a t em cada segmento marrom.
//    * Conecte esses dois pontos com um segmento azul.
//    * Pegue um ponto proporcional a t nesse segmento azul (será o ponto vermelho).
// 5. À medida que t varia, os pontos vermelhos formam a curva (parabólica).

// ### Visualização:

// * Para t=0.25 → ponto está a 25% do segmento.
// * Para t=0.5 → ponto está no meio.

// ---

// ### Exemplo com 4 pontos:

// Semelhante ao anterior, mas com mais etapas intermediárias:

// 1. Conecte os pontos 1 → 2 → 3 → 4 (três segmentos marrons).
// 2. Para cada valor de t:

//    * Pegue pontos proporcionais em cada segmento marrom → conecte → obtém dois segmentos verdes.
//    * Pegue pontos proporcionais nos segmentos verdes → conecte → obtém um segmento azul.
//    * Pegue o ponto proporcional no segmento azul → ponto vermelho da curva.
// 3. A repetição para todos os valores de t gera a curva completa.

// ---

// ### Generalização (para N pontos)

// O algoritmo é **recursivo**:

// 1. Comece com N pontos de controle.
// 2. Conecte-os → forma N-1 segmentos.
// 3. Para cada valor de t:

//    * Pegue pontos proporcionais a t em cada segmento → conecte → forma N-2 segmentos.
//    * Repita o processo até restar apenas um ponto.
// 4. Os pontos finais formam a curva.

// ---

// ### Exemplos variados:

// * Curva parecida com `y = 1/t`
// * Curva com formato zigue-zague
// * Curvas com **loop**
// * Curvas **não suaves**

// Se algo não estiver claro na descrição do algoritmo, observe os exemplos interativos para ver como a curva é construída passo a passo.

// ---

// ## Como desenhar uma curva passando por pontos específicos?

// As curvas de Bézier são definidas pelos **pontos de controle**, que normalmente **não estão sobre a curva** (exceto o primeiro e o último).

// Se você precisa de uma curva que **passe exatamente por todos os pontos**, o nome do problema é **interpolação** — não é o foco aqui.

// Nesse caso, usa-se interpolação polinomial, como o **polinômio de Lagrange** ou interpolação por splines, para gerar curvas suaves que passam por todos os pontos.

// ---

// ## Matemática das curvas de Bézier

// Apesar de não ser necessário conhecer a fórmula matemática para usar curvas de Bézier, ela existe e pode ser interessante para quem gosta de matemática.

// ---

// ### Fórmulas

// Para **2 pontos**:

// ```
// P = (1−t)P1 + tP2
// ```

// Para **3 pontos**:

// ```
// P = (1−t)²P1 + 2(1−t)tP2 + t²P3
// ```

// Para **4 pontos**:

// ```
// P = (1−t)³P1 + 3(1−t)²tP2 + 3(1−t)t²P3 + t³P4
// ```

// Essas são equações **vetoriais**. Podemos separar em coordenadas **x** e **y**:

// Por exemplo, com 3 pontos:

// ```
// x = (1−t)²x1 + 2(1−t)tx2 + t²x3  
// y = (1−t)²y1 + 2(1−t)ty2 + t²y3
// ```

// Se os pontos forem:

// * P1 = (0, 0)
// * P2 = (0.5, 1)
// * P3 = (1, 0)

// Temos:

// ```
// x = (1−t)t + t² = t  
// y = 2(1−t)t = –2t² + 2t
// ```

// A variação de t entre 0 e 1 gera os pontos (x, y) da curva.

// ---

// ## Resumo

// * **Curvas de Bézier** são definidas por pontos de controle.
// * Existem duas formas de definir:

//   * **Visualmente**, com o **algoritmo de De Casteljau**
//   * **Matematicamente**, com fórmulas

// ### Vantagens:

// * Linhas suaves desenhadas apenas movendo pontos
// * Formas complexas com várias curvas conectadas

// ### Usos:

// * Em **gráficos computacionais**, modelagem, editores vetoriais (como o Illustrator ou Inkscape)
// * Fontes (tipografia) são definidas por curvas de Bézier
// * Em desenvolvimento web:

//   * **Canvas** e **SVG**
//   * **Animações CSS** (controlando curvas de aceleração)

// > Observação: os exemplos interativos mencionados normalmente são feitos em SVG — arquivos gráficos vetoriais baseados em XML.

// ---

// Se quiser, posso gerar exemplos práticos com JavaScript, SVG ou CSS para visualizar as curvas de Bézier em ação. Deseja isso?
