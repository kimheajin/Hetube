import './db.mjs';
import dotenv from 'dotenv';
import app from './app.mjs';
import './models/Video.mjs';
import './models/Comment.mjs';

dotenv.config();

// PORT번호를 dotenv로 숨겼다.
const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);