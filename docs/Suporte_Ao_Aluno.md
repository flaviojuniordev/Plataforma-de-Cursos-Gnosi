### 3.3.4 Processo 4 – Suporte ao Aluno (Professor)

### Suporte ao Aluno (Professor)

O processo descreve o suporte ao aluno no site Gnosi. Esse processo consiste em: durante a realização do curso, se o aluno possuir dúvidas ele pode recorrer ao fórum, (seção de comentários destinada para cada curso), e com isso pode perguntar ao professor o que for necessário. O professor tem acesso as mensagens do seu curso e pode respondê-las de maneira humanizada. Outros alunos também podem interagir, respondendo e se ajudando na resolução das dúvidas de um curso. A seção também é aberta para comentários gerais e feedbacks

<img src =https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti2-3687100-gnosi/blob/main/docs/images/Suporte%20ao%20Aluno%20Diagrama.png>


#### Detalhamento das atividades

Detalhamento das atividades
Descrição do processo BPMN: <br> <br>
1- Início do processo: O aluno escolhe um dos cursos . <br>
2- Inserção da dúvida ou comentário: O aluno insere seu comentário ou dúvida no campo específico. <br>
3- Recebimento da dúvida: O professor recebe a dúvida do aluno na mesma tela <br>
4- Resposta do professor: A dúvida é respondida pelo  professor. Caso a dúvida tenha sido resolvida, o processo é encerrado. Se o aluno precisar de mais esclarecimentos, o processo retorna à etapa de inserção de dúvidas novamente.<br>



### **Escolher Curso**

| **Campo**                | **Tipo**           | **Restrições**                                | **Valor Default** |
|---------------------------|--------------------|-----------------------------------------------|--------------------|
| Lista de Cursos           | Lista de Cards    | Exibe apenas os cursos inscritos pelo usuário |                    |
| Nome do Curso             | Texto             | Exibido no card do curso                      |                    |
| Descrição do Curso        | Texto             | Opcional, resumo do curso                     |                    |
| Categoria do Curso        | Texto             | Exibido no card do curso                      |                    |
| Imagem do Curso           | Arquivo/Imagem    | Obrigatório, exibido no card (ex.: 500x500)   | Imagem padrão      |


| **Comando**                 | **Destino/Descrição**                                     | **Tipo**             |
|-----------------------------|---------------------------------------------------------|----------------------|
| Card do curso     | Navega para a tela do curso   | Ação padrão (click)  |

---

### **Escrever comentário**

| **Campo**         | **Tipo**         | **Restrições**                       | **Valor default**  |
|--------------------|------------------|---------------------------------------|--------------------|
| Comentário         | Caixa de texto   | Mínimo de 1 caracter                  |                    |


| **Comandos**       | **Destino**                                  | **Tipo**           |
|--------------------|----------------------------------------------|--------------------|
| Enviar comentário  | Comentário é enviado ao banco de dados       | default            |
| Cancelar           | Cancela o envio do comentário                | cancel             |
| Excluir comentário  | Comentário é excluído do fórum docurso       | default            |


---


### **Responder comentário**

| **Campo**         | **Tipo**         | **Restrições**                       | **Valor default**  |
|--------------------|------------------|---------------------------------------|--------------------|
| Comentário         | Caixa de texto   | Mínimo de 1 caracter                  |                    |


| **Comandos**       | **Destino**                                  | **Tipo**           |
|--------------------|----------------------------------------------|--------------------|
| Enviar resposta    | Resposta é enviada ao banco de dados         | default            |
| Cancelar           | Cancela o envio da resposta                  | cancel             |
| Excluir resposta  | Resposta é excluído do fórum docurso       | default            |


---

