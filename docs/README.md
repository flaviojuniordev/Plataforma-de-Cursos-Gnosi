# GNOSI


**Bernardo de Resende Marcelino, bresende66@gmail.com**

**Flávio de Souza Ferreira Júnior, devflaviojunior@gmail.com**

**João Marcelo Carvalho Pereira, jmcparaujo@sga.pucminas.br**

**Maria Clara Gomes Silva de Oliveira, mariaclariagomes@gmail.com**

**Miguel Figueiredo Diniz, miguelfdiniz@gmail.com**

**Thiago Costa Soares, tcsoares@sga.pucminas.br**

**Kauã Agner Duarte Moura,
kauaag6@gmail.com**

---

Professores:

**Prof. Aline Norberta de Brito**

**Prof. Eveline Alonso Veloso**

**Prof. Juliana Amaral Baroni de Carvalho**

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

**Resumo**

Este trabalho apresenta o desenvolvimento de um sistema educacional voltado para facilitar o aprendizado e a interação entre alunos e professores. O objetivo principal foi criar uma plataforma intuitiva, funcional e acessível, com funcionalidades como cadastro e gestão de cursos, exibição de aulas, emissão de certificados e um sistema interativo de comentários. Os resultados demonstraram que a plataforma atende de forma eficiente às expectativas, promovendo um ambiente colaborativo e inovador. Além disso, foram propostas sugestões para futuras melhorias, como gamificação, personalização com inteligência artificial e avanços em acessibilidade. O trabalho reafirma a importância da tecnologia como ferramenta transformadora na educação.

---


## 1. Introdução

Gnosi, cujo nome deriva do grego "conhecimento", é uma plataforma de ensino a distância (EAD) que oferece cursos gratuitos. O Gnosi cria uma ponte entre professores independentes que oferecem cursos, mas precisam de uma plataforma com funcionalidades específicas, e alunos que buscam acesso a esse conhecimento de forma direta e organizada, utilizando ferramentas que aprimoram a experiência de aprendizado.

### 1.1 Contextualização

Dados da Associação Brasileira de Educação a Distância (ABED) mostram um aumento de 474% nas matrículas em cursos EAD no Brasil na última década [1.1], evidenciando a necessidade e o potencial de plataformas como a Gnósi para atender a essa demanda crescente. Com a recente aceitação do aprendizado digital, muitos professores independentes e alunos enxergam nessa mudança uma oportunidade tanto para ensinar quanto para aprender.

### 1.2 Problema

Como em toda mudança repentina, a pandemia acelerou a adoção do EAD, e a demanda por ensino digital superou a oferta de infraestrutura adequada. Mesmo atualmente, muitas das grandes plataformas de hospedagem de cursos continuam sendo caras e inacessíveis para a maioria dos professores independentes. Além disso, as alternativas mais acessíveis frequentemente não oferecem a qualidade de suporte, nem as ferramentas necessárias para garantir um ensino eficiente e interativo. Isso cria um cenário desafiador, onde educadores que desejam compartilhar seu conhecimento acabam limitados por barreiras financeiras e tecnológicas. A falta de plataformas acessíveis, com funcionalidades adequadas, compromete a experiência tanto de professores quanto de alunos, que carecem de recursos como suporte técnico, organização eficiente de conteúdo, e ferramentas de acompanhamento do progresso.

### 1.3 Objetivo geral

O objetivo do Gnosi é fornecer uma plataforma acessível e eficiente para que professores independentes possam compartilhar seus cursos com qualidade, sem as barreiras financeiras e tecnológicas das grandes plataformas. Esse sistema busca democratizar o ensino a distância, oferecendo as ferramentas necessárias para que tanto professores quanto alunos tenham uma experiência de aprendizado organizada, interativa e de alto nível.

#### 1.3.1 Objetivos específicos

O projeto consiste no desenvolvimento de uma plataforma E-Learning web, na qual será criado um ambiente virtual onde os professores podem cadastrar e editar seus cursos, além de gerenciar os alunos, enquanto os alunos podem se cadastrar, acessar materiais e favoritar os de seu interesse. O sistema busca facilitar a comunicação e o aprendizado, oferecendo uma interface intuitiva para a gestão das atividades educacionais e permitindo o acompanhamento personalizado dos estudantes. Além disso, a plataforma oferecerá uma área dedicada onde os alunos poderão esclarecer dúvidas diretamente com os professores, facilitando a comunicação e o suporte personalizado. Esse recurso visa garantir uma interação contínua e ágil, promovendo um aprendizado mais profundo e colaborativo. Avaliações interativas por curso e feedback instantâneo também farão parte do sistema, fortalecendo o acompanhamento individualizado e o engajamento dos estudantes.

### 1.4 Justificativas

A crescente demanda por ensino a distância, evidenciada pelo aumento nas matrículas em cursos EAD, ressalta a necessidade de plataformas acessíveis e eficazes como o Gnosi. Muitos professores independentes enfrentam barreiras financeiras e tecnológicas que limitam suas oportunidades de ensino. O Gnosi visa preencher essa lacuna, oferecendo um ambiente virtual que permite aos educadores cadastrar cursos, gerenciar alunos e interagir de forma direta. Com funcionalidades que facilitam o aprendizado, como suporte para dúvidas e acompanhamento personalizado, essa aplicação democratiza o acesso à educação para os alunos e valoriza o trabalho dos professores, respondendo às demandas emergentes do mercado educacional.

## 2. Participantes do processo

Os principais perfis de usuários do sistema incluem estudantes e professores. Os estudantes, com idades variadas e diferentes níveis de educação, poderão acessar uma ampla gama de cursos, atendendo às necessidades de diversos perfis, de acordo com o seu interesse. Já os professores, responsáveis pela criação e oferta dos cursos, devem garantir a produção de conteúdo de qualidade que respeite os direitos humanos e as diretrizes do Gnosi.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

A pandemia acelerou a adoção do ensino a distância, revelando uma demanda crescente por cursos online. Dados da Associação Brasileira de Educação a Distância (ABED) mostram um aumento significativo nas matrículas em cursos EAD, destacando a urgência de soluções que atendam a esse crescimento. No entanto, muitas das plataformas disponíveis são caras e não atendem às necessidades dos educadores, resultando em um mercado saturado de opções que carecem de qualidade e acessibilidade. Além disso, professores independentes e instituições enfrentam barreiras financeiras e tecnológicas, dificultando suas oportunidades de compartilhar conhecimento. A falta de suporte adequado e ferramentas interativas em plataformas convencionais compromete o engajamento dos alunos e a eficácia do aprendizado.

### 3.2. Descrição geral da proposta de solução

O Gnosi é uma plataforma de EAD que oferece uma solução flexível, acessível e inclusiva para o aprendizado contínuo, com o objetivo de transformar o cenário atual da educação a distância. A plataforma será projetada para disponibilizar cursos gratuitos em diversas áreas de conhecimento, como habilidades digitais e desenvolvimento pessoal. Com uma interface intuitiva, os professores poderão cadastrar e gerenciar seus cursos com facilidade. Os alunos, por sua vez, poderão se inscrever, acessar materiais educacionais e acompanhar seu progresso de forma simples e rápida. Além disso, o Gnosi integra funcionalidades que facilitam a comunicação direta entre alunos e professores, bem como o gerenciamento de conteúdo, garantindo uma experiência de aprendizado mais eficiente. Dessa forma, a plataforma atenderá às necessidades educacionais específicas de diversos perfis de usuários, promovendo um ambiente colaborativo e eficaz.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Gerenciamento de usuario ](Gerenciamento-de-usuario.md "Monitoramento do progresso dos alunos e fornecimento de feedback.")

[PROCESSO 2 - Gerenciamento de Cursos](Gerenciamento-de-cursos.md "Professores cadastrando novos cursos e conteúdos na plataforma.")

[PROCESSO 3 - Gerenciamento de progresso e avaliação](Gerenciamento-de-progresso-e-avaliacao.md "Processos de avaliação dos alunos e emissão de certificados de conclusão.")

[PROCESSO 4 - Suporte aos Alunos](Suporte_Ao_Aluno.md "Alunos se inscrevendo em cursos e acessando materiais.")

## 4. Projeto da solução

O documento a seguir detalha o projeto da solução, incluindo o modelo relacional para o armazenamento de dados e as tecnologias a serem utilizadas. A modelagem relacional abordará a estrutura dos dados para cursos, usuários e progressos, enquanto as tecnologias incluirão a plataforma de desenvolvimento e ferramentas de suporte ao EAD.



[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

Este trabalho detalhou o desenvolvimento e a avaliação de um sistema educacional denominado Gnosi, com o foco em garantir usabilidade, acessibilidade e interação eficaz entre alunos e professores. As soluções implementadas, como a personalização de interfaces e a integração de funcionalidades resultaram em um ambiente virtual intuitivo e colaborativo. A pesquisa evidenciou a importância de priorizar a experiência do usuário, buscando um equilíbrio entre simplicidade e robustez nas funcionalidades. O fórum de comentários e dúvidas, em particular, se mostrou um diferencial ao fomentar o engajamento e a colaboração entre alunos e professores. Os resultados obtidos demonstram que o sistema alcançou seus objetivos, proporcionando uma experiência rica e personalizada para diferentes perfis de usuários.

Como próximas etapas, propomos a implementação de gamificação com desafios e rankings para aumentar o engajamento dos usuários, a inserção de inteligência artificial para personalizar o aprendizado e a ampliação da acessibilidade do sistema. Essas novas funcionalidades visam tornar a plataforma ainda mais atrativa e inclusiva, promovendo uma experiência de aprendizado mais rica e motivadora.
# REFERÊNCIAS

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1.1]** - https://www.abed.org.br/site/pt/midiateca/noticias_ead/2167/censo_da_educacao_superior_ead_cresce_474_em_uma_decada

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._



# APÊNDICES


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






