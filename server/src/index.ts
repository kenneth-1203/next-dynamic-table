import express, { Express, Request, Response } from "express";
import * as path from "path";
import * as fs from "fs";

const app: Express = express();
const port = 8000;

app.get("/users", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../data/users.json");
  const ITEMS_PER_PAGE = 20;
  
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Unable to read user data" });
    } else {
      const users = JSON.parse(data);
      const page = parseInt(req.query.page as string, 10) || 1;
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const paginatedUsers = users.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );

      res.json({
        page,
        totalItems: users.length,
        totalPages: Math.ceil(users.length / ITEMS_PER_PAGE),
        users: paginatedUsers,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
