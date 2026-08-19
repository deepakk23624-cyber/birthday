const ytdl = require('./node_modules/@distube/ytdl-core');
const fs = require('fs');

async function downloadYoutubeAudio() {
  const url = 'https://www.youtube.com/watch?v=9vw2MvyBjUQ';
  console.log('Fetching info for:', url);
  try {
    const stream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });
    const writeStream = fs.createWriteStream('public/song.mp3');
    stream.pipe(writeStream);
    writeStream.on('finish', () => {
      console.log('SUCCESS! Downloaded Naach Meri Jaan to public/song.mp3');
      const stats = fs.statSync('public/song.mp3');
      console.log('File size:', stats.size);
      process.exit(0);
    });
    stream.on('error', (err) => {
      console.error('Stream error:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('YTDL Error:', err);
    process.exit(1);
  }
}

downloadYoutubeAudio();
