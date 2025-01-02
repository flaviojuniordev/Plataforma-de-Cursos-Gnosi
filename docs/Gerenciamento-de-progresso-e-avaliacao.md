### 3.3.3 Processo 3 – Gerenciamento de progresso e avaliação

O processo descreve o gerenciamento de progresso e avaliação no site Gnosi. Nesse processo, o aluno já cadastrado escolhe um curso na home e se inscreve nele, após isso ele é redirecionado para a tela do curso onde aparece todos os módulos e aulas para ele assistir. Assistido todas as aulas, o aluno pode realizar a avaliação do curso, criada pelo professor, e após concluída a avaliação do curso, o aluno recebe um certificado personalizado do curso, a qual ele pode salvar e imprimir.

![Gerenciamento de progresso e avaliação Diagrama](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti2-3687100-gnosi/blob/main/docs/images/Gerenciamento%20de%20avalia%C3%A7%C3%A3o%20Gnosi%20Diagrama.png)


#### Detalhamento das atividades

**Selecionar curso e assistir aulas**

| **Campo**       | **Tipo**         | **Restrições**    | **Valor default** |
| ---             | ---              | ---               | ---               |
| Selecionar curso | Seleção   |                   |                   |
| Escolher aula | Seleção   |         |                   |

| **Comandos**  |  **Destino**       | **Tipo** |
| ---           | ---                | ---      |
| Checkbox da aula         | 	Marca aula como concluída           | default  |

---

**Realizar avaliação**

| **Campo**       | **Tipo**      | **Restrições**               | **Valor default** |
| ---             | ---           | ---                          | ---               |
| Questões         | Caixa de texto |                   |                   |
| Alternativa 1         | Seleção única |                   |                   |
| Alternativa 2         | Seleção única |                   |                   |
| Alternativa 3         | Seleção única |                   |                   |
| Alternativa 4         | Seleção única |                   |                   |
| Alternativa Correta   | Seleção única |                   |                   |


| **Comandos**         |  **Destino**       | **Tipo** |
| ---                  | ---                | ---      |
| Enviar respostas    | 	Total de acertos   | default  |
| Gerar certificado    | 	Tela do certificado   | default  |

---

**Receber certificado**

| **Campo**       | **Tipo**         | **Restrições**    | **Valor default** |
| ---             | ---              | ---               | ---               |
| Nome do aluno | Texto   |                   |                   |
| Nome do curso | Texto   |         |                   |
| Descrição do curso | Texto   |         |                   |
| Categoria do curso | Texto   |         |                   |

| **Comandos**        |  **Destino**                    | **Tipo**          |
| ---                 | ---                             | ---               |
| Imprimir certificado    | Certificado salvo em pdf e pronto para imprimir               | default           |


