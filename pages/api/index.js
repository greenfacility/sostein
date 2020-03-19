import express from 'express';
const app = express();

app.get('*', (req, res) => {
	res.send('This is the api documentation page!');
});

export default app;
