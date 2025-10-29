const flashcards = [
  { kana: 'あ', romaji: 'a' },
  { kana: 'い', romaji: 'i' },
  { kana: 'う', romaji: 'u' },
  { kana: 'え', romaji: 'e' },
  { kana: 'お', romaji: 'o' },
  { kana: 'か', romaji: 'ka' },
  { kana: 'き', romaji: 'ki' },
  { kana: 'く', romaji: 'ku' },
  { kana: 'け', romaji: 'ke' },
  { kana: 'こ', romaji: 'ko' },
  { kana: 'さ', romaji: 'sa' },
  { kana: 'し', romaji: 'shi' }
];

const dialogues = [
  {
    topic: 'Theme: Café Meetup',
    lines: [
      { japanese: 'A: 今日、一緒にカフェ行かない？', romaji: 'Kyō, issho ni kafe ikanai?', english: "Hey, want to hit the café today?" },
      { japanese: 'B: いいね！期間限定の抹茶ラテ飲んでみたい。', romaji: 'Ī ne! Kikan gentei no matcha rate nonde mitai.', english: 'Sounds great! I want to try the seasonal matcha latte.' },
      { japanese: 'A: じゃあ放課後に駅で待ち合わせしよう。', romaji: 'Jā hōkago ni eki de machiawase shiyō.', english: "Let’s meet at the station after class then." }
    ]
  },
  {
    topic: 'Theme: Anime Premiere Night',
    lines: [
      { japanese: 'A: 今夜の新作アニメ、一緒に見る？', romaji: 'Konya no shinsaku anime, issho ni miru?', english: 'Do you want to watch the new anime tonight?' },
      { japanese: 'B: もちろん！お菓子とラムネ用意するね。', romaji: 'Mochiron! Okashi to ramune yōi suru ne.', english: "Of course! I’ll prepare snacks and ramune." },
      { japanese: 'A: 配信は午後９時からだって。', romaji: 'Haishin wa gogo kuji kara datte.', english: 'The stream starts at 9 p.m.' }
    ]
  },
  {
    topic: 'Theme: School Festival Prep',
    lines: [
      { japanese: 'A: 文化祭の衣装、できあがった？', romaji: 'Bunkasai no ishō, dekiagatta?', english: 'Did the costumes for the school festival get finished?' },
      { japanese: 'B: うん、最後の飾りを今日つけるよ。', romaji: 'Un, saigo no kazari o kyō tsukeru yo.', english: "Yep, I’m adding the last decorations today." },
      { japanese: 'A: リハーサルは明日の朝にしよう。', romaji: 'Rihāsaru wa ashita no asa ni shiyō.', english: 'Let’s rehearse tomorrow morning.' }
    ]
  },
  {
    topic: 'Theme: Weekend Getaway',
    lines: [
      { japanese: 'A: 今週末、箱根温泉に行かない？', romaji: 'Konshūmatsu, Hakone onsen ni ikanai?', english: "Want to visit the Hakone hot springs this weekend?" },
      { japanese: 'B: 行きたい！ロープウェイにも乗ろうよ。', romaji: 'Ikitai! Rōpuwei ni mo norō yo.', english: 'I’d love to! Let’s ride the ropeway too.' },
      { japanese: 'A: チケットは私が予約しておくね。', romaji: 'Chiketto wa watashi ga yoyaku shite oku ne.', english: "I’ll handle the tickets." }
    ]
  }
];

function renderFlashcards() {
  const container = document.getElementById('flashcard-grid');
  if (!container) return;
  const fragment = document.createDocumentFragment();

  flashcards.forEach(({ kana, romaji }) => {
    const card = document.createElement('button');
    card.className = 'flashcard';
    card.type = 'button';
    card.setAttribute('aria-label', `${kana} flashcard`);

    card.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-face front">${kana}</div>
        <div class="flashcard-face back">${romaji}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function renderDialogue(index = 0) {
  const dialogue = dialogues[index];
  const topicEl = document.getElementById('dialogue-topic');
  const linesEl = document.getElementById('dialogue-lines');

  if (!dialogue || !topicEl || !linesEl) return;

  topicEl.textContent = dialogue.topic;
  linesEl.innerHTML = '';

  dialogue.lines.forEach(({ japanese, romaji, english }) => {
    const line = document.createElement('div');
    line.className = 'dialogue-line';
    line.innerHTML = `
      <strong>${japanese}</strong>
      <em>${romaji}</em>
      <p class="dialogue-translation">${english}</p>
    `;
    linesEl.appendChild(line);
  });
}

function shuffleDialogue() {
  const randomIndex = Math.floor(Math.random() * dialogues.length);
  renderDialogue(randomIndex);
}

function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderFlashcards();
  renderDialogue();
  setCurrentYear();

  const newDialogueButton = document.getElementById('new-dialogue');
  if (newDialogueButton) {
    newDialogueButton.addEventListener('click', shuffleDialogue);
  }
});
