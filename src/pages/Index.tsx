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

const slides = [
  {
    img: "https://cdn.poehali.dev/projects/8b7d49cd-5838-428c-b3f1-67a5e0a70351/bucket/1e3a2172-b75b-4a3f-af15-cf40307a9eea.jpg",
    tag: "твои глаза",
    title: "Я влюбляюсь в тебя снова",
    text: "Каждый раз, когда ты смотришь на меня — эти тёмные глаза затягивают глубже, чем любой океан. В них я нашёл свой дом.",
    accent: "#90caf9",
  },
  {
    img: "https://cdn.poehali.dev/projects/8b7d49cd-5838-428c-b3f1-67a5e0a70351/bucket/0fc80c75-4e98-4856-89a6-0b4b8fd6fb55.jpg",
    tag: "твоя улыбка",
    title: "Я люблю тебя всё сильнее",
    text: "Эти губы, этот пирсинг — детали, которые я замечаю и запоминаю. Ты неповторима. И я хочу целовать эту улыбку каждый день.",
    accent: "#f48fb1",
  },
  {
    img: "https://cdn.poehali.dev/projects/8b7d49cd-5838-428c-b3f1-67a5e0a70351/bucket/7fa39161-93c2-4749-82fd-3d417c63485e.jpg",
    tag: "мы",
    title: "Я люблю тебя больше всего на свете",
    text: "Рядом с тобой я чувствую себя живым. Ты — моё любимое место во вселенной. Я хочу, чтобы таких моментов было бесконечно много.",
    accent: "#a5d6a7",
  },
];

function FloatingParticle({ style }: { style: React.CSSProperties }) {
  return <div className="particle" style={style} />;
}

export default function Index() {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [phrase, setPhrase] = useState("");
  const [phraseVisible, setPhraseVisible] = useState(false);
  const [phrasePos, setPhrasePos] = useState({ x: 0, y: 0 });
  const [screen, setScreen] = useState<"question" | "loved" | number>("question");
  const [noCount, setNoCount] = useState(0);
  const noRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phraseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const particles = useRef(
    Array.from({ length: 30 }, (_, i) => ({
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
    }))
  ).current;

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
      setPhrase(sadPhrases[idx]);
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

  if (typeof screen === "number") {
    const slide = slides[screen];
    const isLast = screen === slides.length - 1;
    return (
      <div className="slide-screen" key={screen}>
        {particles.map((p) => (
          <FloatingParticle key={p.id} style={p.style} />
        ))}
        <div className="slide-inner">
          <div className="slide-img-wrap">
            <img src={slide.img} alt={slide.tag} className="slide-img" />
            <div className="slide-img-overlay" style={{ background: `linear-gradient(to top, rgba(2,8,32,0.95) 0%, rgba(2,8,32,0.4) 60%, transparent 100%)` }} />
          </div>
          <div className="slide-text-block">
            <span className="slide-tag" style={{ color: slide.accent, borderColor: slide.accent }}>
              {slide.tag}
            </span>
            <h2 className="slide-title" style={{ textShadow: `0 0 40px ${slide.accent}80` }}>
              {slide.title}
            </h2>
            <p className="slide-body">{slide.text}</p>
            <button
              className="slide-btn"
              style={{ background: `linear-gradient(135deg, ${slide.accent}99, ${slide.accent}44)`, borderColor: `${slide.accent}66`, color: "#e3f2fd" }}
              onClick={() => setScreen(isLast ? "loved" : screen + 1)}
            >
              {isLast ? "К началу 💙" : "Дальше →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "loved") {
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
              <span key={i} className="float-heart" style={{ animationDelay: `${i * 0.2}s` }}>
                {h}
              </span>
            ))}
          </div>
          <button className="slide-btn slide-btn-center" onClick={() => setScreen(0)}>
            Смотреть дальше ✨
          </button>
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
        <h1 className="main-question">Аня, любишь ли ты меня?</h1>
        <p className="sub-text">Подумай хорошенько перед ответом...</p>

        <div className="buttons-wrap">
          <button className="btn-yes" onClick={() => setScreen("loved")}>
            Да 💙
          </button>
        </div>
      </div>

      {phraseVisible && (
        <div className="sad-phrase" style={{ left: phrasePos.x, top: phrasePos.y }}>
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
