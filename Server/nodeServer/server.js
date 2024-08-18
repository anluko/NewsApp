const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Article = require('./model/article');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/articles', async (req, res) => {
  const article = await Article.findAll();
  res.json(article);
});

app.post('/addArticle', async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ error: 'Ошибка при создании статьи' });
  }
});

app.delete('/deleteArticle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (article) {
      await article.destroy(); 
      res.status(200).json({ message: 'Статья успешно удалена' });
    } else {
      res.status(404).json({ message: 'Статья не найдена' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Ошибка при удаление статьи' });
  }
});

app.put('/editArticle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }

    article.Name = name || article.Name;
    article.Description = description || article.Description;
    article.Image = image || article.Image;

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: 'Ошибка при изменении статьи' });
  }
});

const PORT = process.env.PORT || 8080;

Article.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
