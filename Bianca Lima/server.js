const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');


const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // altere conforme necessário
  password: '', // altere conforme necessário
  database: 'user_db',
});


db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL Banco user_db');
  }
});


app.post('/signup', (req, res) => {
  const { login, senha, nome, email, dataNascimento  } = req.body;
  const query = 'INSERT INTO usuario (login, senha, nome, email, dataNascimento) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [login, senha, nome, email, dataNascimento], (err, result) => {
    if (err) {
      console.error('Erro no cadastro:', err);
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});


app.post('/login', (req, res) => {
  const { login, senha } = req.body;
  const query = 'SELECT * FROM usuario WHERE login = ? AND senha = ?';
  db.query(query, [login, senha], (err, result) => {
    if (err || result.length === 0) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});


// Configuração da conexão com o banco de dados MySQL
const db2 = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Coloque seu usuário do MySQL
  password: '',      // Coloque sua senha do MySQL
  database: 'clientes_db'
});


db2.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log(`Conectado ao MySQL Banco clientes_db`);
  }
});


// Rota para buscar todos os clientes
app.get('/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db2.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


// Rota para buscar cliente por ID
app.get('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM clientes WHERE id = ?';
  db2.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});


// Rota para adicionar um novo cliente
app.post('/clientes', (req, res) => {
    const { nome, cpf, telefone, email, dataNascimento, rendaFamiliar } = req.body;
    const sql = 'INSERT INTO clientes (nome, cpf, telefone, email, dataNascimento, rendaFamiliar) VALUES (?, ?, ?, ?, ?, ?)';
    db2.query(sql, [nome, cpf, telefone, email, dataNascimento, rendaFamiliar], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: 'Cliente adicionado!', clienteId: result.insertId });
    });
  });
 


// Rota para editar um cliente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, cpf, telefone, email, dataNascimento, rendaFamiliar } = req.body;
  const sql = 'UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, email = ?, dataNascimento = ?, rendaFamiliar = ? WHERE id = ?';
  db2.query(sql, [nome, cpf, telefone, email, dataNascimento, rendaFamiliar, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Cliente atualizado!' });
  });
});


// Rota para deletar um cliente
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM clientes WHERE id = ?';
  db2.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Cliente deletado!' });
  });
});


app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});


