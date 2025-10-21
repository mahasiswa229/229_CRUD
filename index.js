const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'faqihMysql',
  database: 'biodata',
  port: 3307
}); 

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
    console.log('Connected to the MySQL database.');
});

app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, kelas, prodi} = req.body;
   
    if (!nama || !nim || !kelas || !prodi) {
        return res.status(400).json('semua wajib diisi');
    }

    db.query('INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)', [nama, nim, kelas, prodi], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json('Error inserting data');
        }
        res.status(201).json('Data mahasiswa berhasil ditambahkan');
    });
});