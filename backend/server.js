const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); // Pra API externa

const app = express();
const PORT = 3000;

// Configurações
app.use(cors()); // Libera acesso pro Front
app.use(bodyParser.json()); // Permite ler JSON no corpo das requisições

// Dados baseados na coleção de perfumes
const perfumes = [
    {
        id: 1,
        nome: "Noir Elegance",
        notas: "Sândalo, cedro e âmbar",
        categoria: "Noturno",
        imagem: "url_da_imagem_noire" 
    },
    {
        id: 2,
        nome: "Rose Divine",
        notas: "Rosa damascena, jasmim e peônia",
        categoria: "Floral",
        imagem: "url_da_imagem_rose"
    },
    {
        id: 3,
        nome: "Ocean Breeze",
        notas: "Bergamota, almíscar e água marinha",
        categoria: "Fresh",
        imagem: "url_da_imagem_ocean"
    },
    {
        id: 4,
        nome: "Citrus Gold",
        notas: "Limão siciliano, tangerina e neroli",
        categoria: "Cítrico",
        imagem: "url_da_imagem_citrus"
    }
];

const contatos = [];

// endpoints

// O front vai chamar essa rota para preencher a página de Galeria/Coleção
app.get('/api/perfumes', (req, res) => {
    res.json(perfumes);
});

// Rota POST (Criação de dados + Validação)
// Recebe o formulário da Home
app.post('/api/inscricao', (req, res) => {
    const { nome, email } = req.body;

    // Validação básica no Backend
    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome e e-mail são obrigatórios!" });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ mensagem: "E-mail inválido." });
    }

    // Salva o contato (Simulação de DB)
    const novoContato = { id: contatos.length + 1, nome, email, data: new Date() };
    contatos.push(novoContato);

    console.log("Novo inscrito:", novoContato); //terminal
    
    return res.status(201).json({ 
        mensagem: "Inscrição realizada com sucesso! Avisaremos sobre a pré-compra." 
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});