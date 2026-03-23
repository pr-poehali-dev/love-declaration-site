import { useState, useRef, useCallback, useEffect } from "react";

const sadPhrases = [
  "Ой, не туда...",
  "Подумай ещё раз!",
  "Ты точно уверена?",
  "Нет — это не вариант",
  "Кнопка не для тебя",
  "Попробуй другую!",
  "Я тут не стою...",
  "Ой-ой-ой...",
  "Не смеши сердечко",
  "Туда нельзя!",
];

const hearts = ["💙", "💫", "✨", "🌙", "⭐", "💎"];

function FloatingParticle({ style }: { style: React.CSSProperties }) {
  return <div className="particle" style={style} />;
}

export default function Index() {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [phrase, setPhrase] = useState("");
  const [phraseVisible, setPhraseVisible] = useState(false);
  const [phrasePos, setPhrasePos] = useState({ x: 0, y: 0 });
  const [loved, setLoved] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const noRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phraseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      opacity: 0.3 + Math.random() * 0.5,
    } as React.CSSProperties,
  }));

  const runAway = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const container = containerRef.current;
      const btn = noRef.current;
      if (!container || !btn) return;

      const rect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const btnCenterX = btnRect.left + btnRect.width / 2 - rect.left;
      const btnCenterY = btnRect.top + btnRect.height / 2 - rect.top;
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      const dx = btnCenterX - mouseX;
      const dy = btnCenterY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      const pushX = (-dx / dist) * (120 + Math.random() * 100);
      const pushY = (-dy / dist) * (120 + Math.random() * 100);

      const maxX = rect.width - btnRect.width;
      const maxY = rect.height - btnRect.height;

      const newX = Math.min(Math.max(noPos.x + pushX, 0), maxX);
      const newY = Math.min(Math.max(noPos.y + pushY, 0), maxY);

      setNoPos({ x: newX, y: newY });

      const idx = noCount % sadPhrases.length;
      const newPhrase = sadPhrases[idx];
      setPhrase(newPhrase);
      setPhrasePos({ x: newX + btnRect.width / 2, y: newY - 10 });
      setPhraseVisible(true);
      setNoCount((c) => c + 1);

      if (phraseTimerRef.current) clearTimeout(phraseTimerRef.current);
      phraseTimerRef.current = setTimeout(() => setPhraseVisible(false), 1500);
    },
    [noPos, noCount]
  );

  useEffect(() => {
    return () => {
      if (phraseTimerRef.current) clearTimeout(phraseTimerRef.current);
    };
  }, []);

  if (loved) {
    return (
      <div className="love-screen">
        {particles.map((p) => (
          <FloatingParticle key={p.id} style={p.style} />
        ))}
        <div className="love-content">
          <div className="big-heart">💙</div>
          <h1 className="love-title">Аня, я знал это!</h1>
          <p className="love-subtitle">
            Ты — моя вселенная, моё небо и мои звёзды.
            <br />
            Аня, я люблю тебя больше всех слов на свете 💙
          </p>
          <div className="hearts-row">
            {hearts.map((h, i) => (
              <span
                key={i}
                className="float-heart"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-screen" ref={containerRef}>
      {particles.map((p) => (
        <FloatingParticle key={p.id} style={p.style} />
      ))}

      <div className="center-card">
        <div className="card-glow" />
        <div className="emoji-top">💙</div>
        <h1 className="main-question">
          Аня, любишь ли ты меня?
        </h1>
        <p className="sub-text">Подумай хорошенько перед ответом...</p>

        <div className="buttons-wrap">
          <button className="btn-yes" onClick={() => setLoved(true)}>
            Да 💙
          </button>
        </div>
      </div>

      {phraseVisible && (
        <div
          className="sad-phrase"
          style={{ left: phrasePos.x, top: phrasePos.y }}
        >
          {phrase}
        </div>
      )}

      <button
        ref={noRef}
        className="btn-no"
        style={{
          position: "absolute",
          left: noPos.x || "calc(50% + 100px)",
          top: noPos.y || "calc(50% + 30px)",
          transform: noPos.x ? "none" : "translateX(0)",
        }}
        onMouseEnter={runAway}
        onTouchStart={runAway}
        onClick={runAway}
      >
        Нет
      </button>
    </div>
  );
}