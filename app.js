app.get('/newpost', (req, res) => {
    res.sendFile(__dirname + '/new_post/indexNP.html');
  });