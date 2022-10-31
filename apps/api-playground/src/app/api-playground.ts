import cors from 'cors';
import express from 'express';
export const runDefaultNodeApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const PORT: Readonly<number> = 3000;

  app.get('/', async (req, res) => {
    //
  });
  app.get('/test-code-here-or-wherever', async (req, res) => {
    // ex: createDerivedKey()
  });

  //  in order to use the window callback you'll need to port fort your local host
  // using ngrok https://ngrok.com/ makes it as easy as ngrok http http://localhost:3000
  app.get('/window-callback', async (req, res) => {
    console.log(req);
  });

  app.listen(PORT, async () => {
    console.log('hello');
  });
  return `app is running ${PORT}`;
};
