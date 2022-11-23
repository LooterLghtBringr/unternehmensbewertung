const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { Console } = require('console');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const unternehmen = [];

app.post("/unternehmen", async (req, res) => {
  console.log("POST METHOD CALLED");

  const newUnternehmen = {
  uid: randomBytes(4).toString("hex"),
  unternehmenName: req.body.unternehmenName,
  adresse: req.body.adresse
  };

  console.log(newUnternehmen);

  unternehmen.push(newUnternehmen);

  res.status(201).send(unternehmen);
})

app.get("/unternehmen", async (req, res) => {
  console.log("GET ALL METHOD CALLED");
  res.send(unternehmen);
})

app.get("/unternehmen/:uid", async (req, res) => {
  console.log("GET UID METHOD CALLED");
  const uid = req.params.uid;

  toGetUnternehmen = unternehmen.find(
    (company) => company.uid == uid
  );

  res.send(toGetUnternehmen);
})

app.put("/unternehmen/:uid", async (req, res) => {
  console.log("UPDATE METHOD CALLED");
  const uid = req.params.uid;
  const putUnternehmen = null;

  unternehmen.forEach(
  (company) => {
    if(company.uid === uid)
    {
      putUnternehmen = company;
      putUnternehmen.adresse = req.body.adresse;
    }
  });

  if (putUnternehmen !== null) res.status(201).send(putUnternehmen);
  else res.status(404).send("Unternehmen not found");
})

app.listen(4001, () => {
  console.log('Listening on 4001');
});

/*
Unternehmen:
UID: Zufälliges ID
Unternehmen Name: String
Adresse: String 
*/