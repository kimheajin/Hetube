import dotenv from 'dotenv';
import './db';
import app from './app';

dotenv.config();

import './models/Video';
import './models/User';
import './models/Comment';

// PORT번호를 dotenv로 숨겼다.
const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);