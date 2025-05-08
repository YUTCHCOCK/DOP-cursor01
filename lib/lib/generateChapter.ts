import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateChapter({
  episode,
  characters,
  events,
  settings,
}: {
  episode: string[];
  characters: string[][];
  events: string[][];
  settings: string[][];
}) {
  const [
    no, title, mainChars, eventDesc, place, tone, dialogue,
    cliché, theme, plotFunc, openingLine, note
  ] = episode;

  const prompt = `
[회차: ${no}화]
[제목] ${title}
[주요 인물] ${mainChars}
[사건 개요] ${eventDesc}
[장소] ${place}
[감정톤] ${tone}
[주요 대사] ${dialogue}
[플롯 기능] ${plotFunc}
[도입부 문장] ${openingLine}
[작가 메모] ${note}

[등장인물 정보]
${characters.map(c => `- ${c[1]} (${c[2]}세, ${c[3]}, ${c[4]}): ${c[7]}`).join('\n')}

[세계관 주요 사건]
${events.map(e => `- ${e[0]}: ${e[1]}`).join('\n')}

[세계 설정]
${settings.map(s => `- ${s[0]}: ${s[1]}`).join('\n')}

[지시사항]
위의 정보를 참고해 ${theme}와 ${cliché} 요소가 담긴, 문피아 스타일의 무협 웹소설 한 회차 분량을 써줘.
- 분량: 4000자 내외
- 구분: 도입 → 사건 발생 → 갈등 고조 → 클리프행어 마무리
- 문체: 감정 표현이 풍부하고 대사가 자연스러워야 함
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.75,
  });

  return completion.choices[0].message.content;
}
