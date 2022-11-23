const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const bewertungenById = [];

app.post("/bewertung/:uid", async (req, res) => {

  const newBewertung = {
    bewertungId: randomBytes(4).toString("hex"),
    uid: req.params.uid,
    description: req.body.description,
    percent: req.body.percent
  }

  bewertungenById.push(newBewertung);

  res.send(bewertungenById);
});

app.get("/bewertung/:uid", async (req, res) => {
  const bewertungenByUid = [];

  bewertungenById.forEach((bewertung) => {
    if(bewertung.uid === req.params.uid)
    {
      bewertungenByUid.push(bewertung);
    }
  });

  if(bewertungenByUid !== null) res.status(201).send(bewertungenByUid);
  else res.status(404).send("Keine Bewertungen gefunden");
})

app.put("/bewertungen/:uid", async (req, res) => {
  console.log("UPDATE METHOD CALLED");
  const uid = req.params.uid;
  const putBewertung = null;
  const description = req.body.description;
  const percent = req.body.percent;

  bewertungenById.forEach(
  (bewertung) => {
    if(bewertung.uid === uid)
    {
      putBewertung = bewertung;
      putBewertung.description = description;
      putBewertung.percent = percent;
    }
  });

  if (putBewertung !== null) res.status(201).send(putBewertung);
  else res.status(404).send("Bewertung not found");
})

app.listen(4000, () => {
  console.log('Listening on 4000');
});

/*
Bewertungen:
BID: Zufälliges ID
Unternehmen ID: UID vom Unternehmen (siehe oben)
Beschreibung: String
Prozentzahl: Integer
*/