const fs = require("fs").promises;
const exists = require("fs").exists;
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/message", express.static("message"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "pages", "message.html");
  res.sendFile(filePath);
});

app.get("/exists", (req, res) => {
  const filePath = path.join(__dirname, "pages", "exists.html");
  res.sendFile(filePath);
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;

  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, "temp", adjTitle + ".txt");
  const finalFilePath = path.join(__dirname, "message", adjTitle + ".txt");

  await fs.writeFile(tempFilePath, content);
  exists(finalFilePath, async (exists) => {
    if (exists) {
      res.redirect("/exists");
    } else {
      await fs.copyFile(tempFilePath, finalFilePath);
      await fs.unlink(tempFilePath);
      const fileLink = `/message/${adjTitle}.txt`;
      res.send(`
        <p>Email uspešno sačuvan! Pogledajte ga <a href="${fileLink}">ovde</a>.</p>
        <form action="/" method="GET">
          <button>Povratak</button>
        </form>
      `);
      // res.redirect("/");
    }
  });
});

app.listen(80);