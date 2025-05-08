import { getAllData } from './lib/googleSheet';
import { generateChapter } from './lib/generateChapter';
import fs from 'fs';

(async () => {
  const { characters, events, episodes, settings } = await getAllData();

  const todayEpisode = episodes[0]; // 첫 회차 자동 선택 (나중에 조건 추가 가능)
  const chapterText = await generateChapter({
    episode: todayEpisode,
    characters,
    events,
    settings
  });

  const filename = `output/chapter_${todayEpisode[0]}.md`;
  fs.writeFileSync(filename, chapterText || '', 'utf-8');
  console.log(`✅ ${filename} 생성 완료`);
})();
