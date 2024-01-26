import { promises as fs } from "fs";
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();

//* MIDDELEWARES================================
app.use(express.json());

// global middleware якщо не передається /шлях вона працює на всі запити
app.use((req, res, next) => {
  console.log("Hello from middleware!");
  req.time = new Date().toLocaleString("uk-UA");

  next();
});

app.use("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  if (id.length < 10) {
    res.status(400).json({
      msg: "Failed...",
    });
    return;
  }

  const usersDB = await fs.readFile("test-data.json");

  const users = JSON.parse(usersDB);
  const user = users.find((item) => item.id === req.params.id);

  if (!user) {
    return res.status(404).json({
      msg: "Not found",
    });
  }
  req.user = user;
  next();
});

//* СONTROLLERS =============================
app.get("/ping", (req, res) => {
  //   console.log({ req });
  //   res.send("<p>Hello server</p>");
  //   res.sendStatus(201);
  res.status(200).json({
    msg: "Hello from JSON...",
  });
});

app.post("/users", async (req, res) => {
  try {
    const { name, year } = req.body;
    console.log({ user: req.body });

    //todo req ,ody validation!!!!!

    const newUser = {
      id: nanoid(),
      name,
      year,
    };

    // save user to the DB
    const usersDB = await fs.readFile("test-data.json");

    const users = JSON.parse(usersDB);
    console.log(users);
    // console.log({ users });
    users.push(newUser);
    console.log(users);

    await fs.writeFile("test-data.json", JSON.stringify(users, null, 2));
    res.status(201).json({ msg: "Success!", user: newUser });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const usersDB = await fs.readFile("test-data.json");
    const users = JSON.parse(usersDB);

    res.status(201).json({
      msg: "Success!",
      users,
    });
  } catch (error) {}
});

app.get("/users/:id", async (req, res) => {
  console.log(req.params);

  res.status(201).json({
    msg: "Success",
    user: req.user,
    time: req.time,
  });
});

//* Server init=====================================
const port = 3001;

app.listen(port, () => {
  console.log(`Server ${port}`);
});

console.log(10);
