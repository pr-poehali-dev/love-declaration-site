import { useState } from "react";

const feelings = [
  { emoji: "🍞", title: "Моя булочка", text: "Мягкая, тёплая и такая родная — ты моя любимая булочка, от которой хочется никогда не уходить." },
  { emoji: "👑", title: "Моя принцесса", text: "Ты настоящая принцесса — в каждом твоём жесте, улыбке и взгляде есть что-то волшебное и неповторимое." },
  { emoji: "🌸", title: "Моя малышка", text: "Малышка моя — я хочу обнимать тебя и держать рядом. Ты делаешь мой мир уютнее и теплее." },
  { emoji: "❤️", title: "Люблю больше всего на свете", text: "Ты — самое дорогое, что у меня есть. Я люблю тебя больше всего на свете, Аня." },
  { emoji: "✨", title: "Ты моё всё", text: "Утром думаю о тебе. Днём скучаю. Вечером хочу быть рядом. Ты стала самой важной частью моей жизни." },
  { emoji: "🌙", title: "Моя луна", text: "Даже в самые тёмные дни ты светишь мне — тихо, нежно и неизменно красиво. Ты мой свет." },
  { emoji: "🦋", title: "Ты заставляешь сердце порхать", text: "Каждый раз, когда ты пишешь мне, внутри всё переворачивается от счастья. Это ты так делаешь." },
  { emoji: "🏠", title: "Ты мой дом", text: "Не место, а человек — вот что такое дом. И мой дом — это ты, Аня. Всегда ты." },
  { emoji: "🍓", title: "Сладкая моя", text: "Ты такая сладкая — добрая, нежная, лёгкая. Быть рядом с тобой — настоящее счастье и удовольствие." },
  { emoji: "🌺", title: "Самая красивая", text: "Ты красивая не только снаружи — твоя душа, смех и забота делают тебя по-настоящему прекрасной." },
];

export default function Index() {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <div className="env-screen">
        <div className="env-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="env-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${0.6 + Math.random() * 1}rem`,
              opacity: 0.15 + Math.random() * 0.4,
            }}>
              {["💕","✨","🌸","💗","⭐","🌷"][Math.floor(Math.random() * 6)]}
            </span>
          ))}
        </div>
        <div className="env-card">
          <div className="env-glow" />
          <div className="env-icon">💌</div>
          <h1 className="env-title">Для Ани</h1>
          <p className="env-sub">Здесь кое-что важное — нажми, чтобы открыть</p>
          <button className="env-btn" onClick={() => setOpened(true)}>
            Открыть
          </button>
          <div className="env-petals">
            {["🌸","🌷","🌸","🌹","🌸","🌷","🌸"].map((p, i) => (
              <span key={i} className="env-petal" style={{ animationDelay: `${i * 0.35}s` }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feels-screen">
      <div className="feels-bg-dots" />
      <div className="feels-container">
        <div className="feels-header">
          <div className="feels-heart-icon">💝</div>
          <h1 className="feels-title">Аня, вот что я чувствую к тебе</h1>
          <p className="feels-subtitle">Читай медленно — каждое слово настоящее</p>
        </div>

        <div className="feels-grid">
          {feelings.map((f, i) => (
            <div
              key={i}
              className="feel-card"
              style={{ animationDelay: `${0.05 + i * 0.07}s` }}
            >
              <div className="feel-emoji">{f.emoji}</div>
              <h2 className="feel-card-title">{f.title}</h2>
              <p className="feel-card-text">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="feels-footer">
          <div className="feels-footer-hearts">
            {["💕","💗","💖","💗","💕"].map((h, i) => (
              <span key={i} className="feels-fheart" style={{ animationDelay: `${i * 0.2}s` }}>{h}</span>
            ))}
          </div>
          <p className="feels-footer-text">Люблю тебя, Аня 🌸</p>
          <button className="feels-back-btn" onClick={() => setOpened(false)}>
            ← Вернуться к открытке
          </button>
        </div>
      </div>
    </div>
  );
}
