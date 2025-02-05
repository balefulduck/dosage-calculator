// pages/api/config.js
import fs from 'fs';
import path from 'path';

const configFilePath = path.join(process.cwd(), 'data', 'config.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Read config file and return its content
    try {
      const fileContents = fs.readFileSync(configFilePath, 'utf8');
      const config = JSON.parse(fileContents);
      res.status(200).json(config);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading config file.' });
    }
  } else if (req.method === 'POST') {
    // Write updated config to file
    try {
      const newConfig = req.body;
      fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2), 'utf8');
      res.status(200).json({ message: 'Config updated successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error writing config file.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
