### 3.3.2 Processo 2 - Gerenciamento de Cursos
### Oportunidades de melhoria
- Automatização de Verificações: Implementar uma validação automática dos dados do curso, como se o nome já existe, para evitar redundâncias.<br>
- Notificações Automatizadas: Enviar notificações automáticas ao responsável pelo curso quando o cadastro for finalizado ou necessitar de ajustes.<br>

O processo descreve o gerenciamento de cursos no site Gnosi. 
O cadastro é realizado pelo professor, que insere informações gerais do curso (nome, descrição, categorias), divide os modulos do curso, faz upload dos vídeos, cria a avaliação e envia o curso para a plataforma. O curso então é salvo e carregado, vai para a tela inicial do site e fica disponível para os alunos acessarem. Além disso, o professor possui a opção de editar os dados do curso, dos módulos e excluir

![BPMN do PROCESSO de gerenciamento de usuário](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti2-3687100-gnosi/blob/main/docs/images/Cadastro%20de%20curso%20Diagrama.png)

### Detalhamento das atividades

### **Criar curso**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome do Curso   | Caixa de Texto   | Obrigatório; max 100 chars               |                   |
| Categoria       | Seleção Multipla | Min 1 opção               |                   |
| Descrição       | Caixa de Texto   | Obrigatório               |                   |
| Imagem do Curso | Arquivo          | 500x500;max 1gb|                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Avançar para criação de modulo | Avança para a proxima etapa | Botão |

---

### **Criar módulo**

| **Campo**             | **Tipo**         | **Restrições** | **Valor default** |
|------------------------|------------------|---------------|--------------------|
| Nome do módulo         | Caixa de Texto  | Obrigatório; max 100 chars               |                    |
| Descrição do módulo    | Caixa de Texto  | Obrigatório; max 100 chars               |                    |
| Título da aula          | Caixa de Texto  | Obrigatório; max 100 chars               |                    |
| Link da Videoaula    | Link            | URL Youtube               |                    |


| **Comando**                | **Destino/Descrição**                           | **Tipo**             |
|----------------------------|-------------------------------------------------|----------------------|
| Adicionar aula             | Adiciona e vincula a aula ao módulo que está sendo criado | Botão     |
| Criar módulo               | Conclui a criação do módulo e permite a criação de outro | Botão         |
| Criar avaliação            | Conclui a criação do curso e avança para a tela de criação da avaliação | Botão      |
| Cancelar                   | Volta para a home | Botão     |

---

### **Criar avaliação**

| **Campo**             | **Tipo**         | **Restrições** | **Valor default** |
|------------------------|------------------|---------------|--------------------|
| Título da avaliação      | Caixa de Texto  | Obrigatório; max 100 chars               |                    |
| Questão (enunciado)   | Caixa de Texto  | Obrigatório; max 100 chars               |                    |
| Alternativas          | Caixa de Texto  | Obrigatório; max 100 chars               |                    |
| Alternativa correta    | Seleção única       |                |                    |


| **Comando**                | **Destino/Descrição**                           | **Tipo**             |
|----------------------------|-------------------------------------------------|----------------------|
| Adicionar questão          | Adiciona e vincula a questão ao quiz e limpa a tela | Botão     |
| Criar avaliação            | Conclui a criação do avaliação e volta para a home | Botão      |

---



### **Editar Curso** 

| **Campo**                | **Tipo**          | **Restrições**                        | **Valor Default** |
|--------------------------|-------------------|---------------------------------------|--------------------|
| Nome do Curso     | Caixa de Texto   | Obrigatório, máximo 100 caracteres    |                    |
|  Categoria         | Seleção Múltipla | Pelo menos 1 item deve ser selecionado |                    |
|  Descrição         | Caixa de Texto   | Opcional, máximo 500 caracteres       |                    |
|  Imagem do Curso   | Arquivo JPEG       | Dimensões mínimas: 500x500, tamanho máximo: 1GB |         |


| **Comando**                     | **Destino/Descrição**                     | **Tipo**             |
|----------------------------------|-------------------------------------------|----------------------|
| Salvar edição  | Salva a edição do curso | Botão/ação padrão   |
| Editar módulos    | Avança para a edição dos módulos | Botão/ação padrão   |
| Excluir curso | Exclui curso da plataforma | Botão/ação padrão   |

---

### **Editar módulos do curso** 

| **Campo**                | **Tipo**          | **Restrições**                        | **Valor Default** |
|--------------------------|-------------------|---------------------------------------|--------------------|
|  Nome do módulo     | Caixa de Texto   | Obrigatório, máximo 100 caracteres    |                    |
|  Descrição         | Seleção Múltipla | Pelo menos 1 item deve ser selecionado |                    |
|  Título da aula         | Caixa de Texto   | Opcional, máximo 500 caracteres       |                    |
|  Link da aula   | URL          |          |         |


| **Comando**                     | **Destino/Descrição**                     | **Tipo**             |
|----------------------------------|-------------------------------------------|----------------------|
| Adicionar aula  | Adiciona aula ao módulo | Botão/ação padrão   |
| Excluir aula  | Exclui aula do módulo | Botão/ação padrão   |
| Criar módulo   | Cria módulo para curso existente | Botão/ação padrão   |
| Salvar alterações | Salva as alterações do curso existente | Botão/ação padrão   |
| Cancelar | Cancela as alterações realizadas em um módulo| Botão/ação padrão   |

---

### **Visualizar curso** 

| **Campo**             | **Tipo**          | **Restrições**                                 | **Valor Default**    |
|------------------------|-------------------|-----------------------------------------------|-----------------------|
|  Visualizar Módulos     | Seleção          |  |                       |
|  Visualizar Aulas        | Seleção | |                       |
|  Visualizar Avaliação        | Seleção | |                       |




