// **Código Ninja**

// > *"Aprender sem pensar é trabalho perdido; pensar sem aprender é perigoso."*
// > Confúcio (*Analectos*)

// Programadores ninjas do passado usavam certos truques para aguçar a mente de quem tentasse dar manutenção em seu código.

// Especialistas em revisão de código estão sempre atentos a esses padrões em testes técnicos.

// Desenvolvedores iniciantes, às vezes, usam essas práticas ainda melhor que os próprios ninjas.

// Leia com atenção e descubra quem você é — um ninja, um novato ou talvez um revisor de código?

// ---

// ### Ironia detectada

// Muitos tentam seguir o caminho ninja. Poucos conseguem.

// ---

// ### Brevidade é a alma da sagacidade

// Deixe o código o mais curto possível. Mostre como você é esperto.

// Use recursos sutis da linguagem a seu favor.

// Por exemplo, veja o operador ternário `?`:

// ```js
// // extraído de uma biblioteca JavaScript famosa
// i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
// ```

// Legal, né? Se você escrever assim, qualquer desenvolvedor que tentar entender o valor de `i` terá um belo desafio. E provavelmente virá te perguntar.

// Diga a ele que "quanto mais curto, melhor". Inicie-o no caminho ninja.

// ---

// ### Variáveis com uma letra só

// > *"O Dao se oculta no silêncio. Só o Dao começa e termina bem."*
// > Laozi (*Tao Te Ching*)

// Outra maneira de deixar o código curto é usar variáveis de uma única letra: `a`, `b`, `c`.

// Essas variáveis desaparecem no código como verdadeiros ninjas na floresta. Ninguém vai achá-las com o "buscar" do editor. E mesmo que encontrem, não vão entender o que significam.

// Mas há uma exceção: um verdadeiro ninja *nunca* usa `i` como contador em um `for`. Em qualquer lugar, menos aqui. Use letras exóticas — como `x` ou `y`.

// E o efeito é ainda melhor se o corpo do `for` tiver uma ou duas páginas de código. Assim, quem tentar entender o que `x` faz ficará completamente perdido.

// ---

// ### Use abreviações

// Se as regras da equipe proíbem variáveis de uma letra ou sem sentido, então abrevie tudo.

// Exemplos:

// * `list` → `lst`
// * `userAgent` → `ua`
// * `browser` → `brsr`

// Somente alguém com intuição de verdade entenderá esses nomes. Encurte tudo. Só os dignos devem ser capazes de manter seu código.

// ---

// ### Voe alto. Seja abstrato.

// > *"O grande quadrado não tem canto.
// > O grande som é quase silêncio.
// > A grande imagem não tem forma."*
// > Laozi (*Tao Te Ching*)

// Ao nomear variáveis, escolha termos o mais abstratos possível. Como `obj`, `data`, `value`, `item`, `elem`...

// * O nome ideal de variável é `data`. Use em todo lugar.
// * `value` também serve. Afinal, toda variável tem um valor, certo?
// * Dê nomes como `str`, `num`, `bool`.

// Mas e se já tiver usado todos esses nomes? Basta numerar: `data1`, `item2`, `elem5`...

// A meditação será necessária para qualquer um que tente entender o significado dessas variáveis. Um simples debug mostra o tipo da variável... Mas seu real propósito? Só com iluminação espiritual.

// ---

// ### Teste de atenção

// Quer saber se alguém está mesmo prestando atenção? Use nomes parecidos: `date` e `data`.

// Misture-os. Uma leitura rápida se torna impossível. E quando surgir um erro de digitação… é hora de tomar um chá e esperar o debugger fazer seu trabalho.

// ---

// ### Sinônimos engenhosos

// > *"O Tao que pode ser dito não é o Tao eterno."*
// > Laozi (*Tao Te Ching*)

// Use nomes diferentes para a mesma coisa. Isso mostra sua criatividade.

// Exemplo: se uma função mostra algo na tela, use `displayMessage()`. Mas se mostrar outra coisa, chame de `showName()`.

// Deixe a entender que há uma diferença sutil — mesmo que não haja nenhuma.

// Faça um pacto ninja com a equipe:

// * João usa `display...`
// * Pedro usa `render...`
// * Ana usa `paint...`

// Agora o truque final: para funções com comportamentos *realmente* diferentes, use o *mesmo* prefixo!

// ```js
// printPage(page);  // imprime numa impressora
// printText(text);  // mostra na tela
// printMessage(msg); // ??? Surpresa!
// ```

// ---

// ### Reutilize nomes

// > *"Uma vez dividido, o todo precisa de nomes.
// > Já há nomes demais. É preciso saber quando parar."*
// > Laozi (*Tao Te Ching*)

// Crie uma nova variável apenas quando *for absolutamente necessário*.

// Em vez disso, reutilize variáveis existentes. Escreva novos valores nelas.

// Dentro de funções, use só os parâmetros. Assim, será muito difícil descobrir o que está dentro da variável em determinado momento.

// Um truque avançado: substitua o valor discretamente no meio de uma função.

// ```js
// function ninjaFunction(elem) {
//   // 20 linhas com 'elem'
//   elem = clone(elem);
//   // 20 linhas agora com o clone!
// }
// ```

// O colega que tentar usar `elem` depois do clone vai ter uma bela surpresa.

// ---

// ### Underscores por diversão

// Use `_` ou `__` nos nomes: `_nome`, `__valor`.

// É ainda melhor se *só você* souber o que esses prefixos significam. Ou, melhor ainda, que *não tenham significado nenhum*.

// Use em alguns lugares e não em outros. Aumenta a fragilidade do código e as chances de erros futuros.

// ---

// ### Mostre seu amor

// Mostre o quanto seus elementos são incríveis: `superElemento`, `megaFrame`, `niceItem`.

// Isso transmite emoção… e zero significado.

// Talvez alguém até pare para meditar sobre o que torna o item “nice”. Tempo bem pago.

// ---

// ### Variáveis internas sobrepondo externas

// > *"Na luz, não se enxerga a escuridão.
// > Na escuridão, vê-se tudo na luz."*
// > Guan Yin Zi

// Use os mesmos nomes para variáveis internas e externas a funções.

// ```js
// let user = autenticaUsuario();

// function render() {
//   let user = outroValor();
//   // muitas linhas depois...
//   // alguém tenta usar 'user' achando que é o externo...
// }
// ```

// A armadilha está pronta. É só esperar alguém cair.

// ---

// ### Efeitos colaterais por toda parte!

// Funções chamadas `isReady()`, `checkPermissao()` ou `findTags()` parecem inofensivas.

// Mas que tal fazer com que elas alterem o estado da aplicação?

// A surpresa no rosto do colega vale o esforço.

// Outra ideia: retorne um *objeto* em vez de `true/false`. Quem tentar fazer `if (checkPermissao(...))` vai passar raiva.

// Diga: “Leia a documentação!”. E mande esse texto.

// ---

// ### Funções superpoderosas!

// > *"O grande Tao flui por todos os lados."*
// > Laozi (*Tao Te Ching*)

// Não limite a função ao que o nome diz. Vá além.

// Exemplo:

// ```js
// function validaEmail(email) {
//   // valida
//   // exibe mensagem de erro
//   // pede reentrada
// }
// ```

// Quem quiser só validar o e-mail, que lute.

// Sua função faz tudo. E por isso ninguém poderá reutilizá-la. Vitória!

// ---

// ### Resumo

// Todos esses "conselhos" vêm de códigos reais. Às vezes escritos por programadores experientes — talvez mais do que você.

// * Siga *alguns*, e seu código terá surpresas.
// * Siga *muitos*, e ninguém mais vai querer mexer nele.
// * Siga *todos*, e seu código será um teste espiritual para qualquer jovem desenvolvedor em busca de iluminação.
