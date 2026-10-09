import { useState, useEffect, useMemo } from 'react'

const HEART =
  'M50 88 C20 62 6 44 6 28 C6 14 17 6 29 6 C39 6 46 12 50 20 C54 12 61 6 71 6 C83 6 94 14 94 28 C94 44 80 62 50 88 Z'

const TEASE = [
  '',
  'Adashding shekilli 😏',
  "Yana urinib ko'r 😜",
  "Qo'lingdan kelmaydi 😄",
  "Men xafa bo'ldim 😢",
]

const LOVE = [
  'Sen mening eng chiroyli tushimsan ✨',
  'Sen kulganingda butun dunyo yorishadi 🌸',
  "Sening yoningda vaqt to'xtab qoladi ⏳",
  'Sen mening baxtimsan, tinchligimsan 🕊️',
  "Har kuni seni ko'proq sevaman 💞",
  "Seni butun yuragim bilan yaxshi ko'raman ❤️",
]

function Heart({ delay }) {
  return (
    <svg viewBox="0 0 100 94">
      <path
        className="hp"
        d={HEART}
        style={{ animationDelay: `${delay}s,${delay + 1.5}s` }}
      />
    </svg>
  )
}

function Background() {
  const items = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        left: Math.random() * 100,
        size: 16 + Math.random() * 26,
        dur: 7 + Math.random() * 7,
        delay: Math.random() * 8,
        e: ['❤', '💗', '💖', '🌹', '✨'][Math.floor(Math.random() * 5)],
      })),
    []
  )
  return (
    <div className="bg">
      {items.map((it, i) => (
        <span
          key={i}
          style={{
            left: `${it.left}%`,
            fontSize: it.size,
            animationDuration: `${it.dur}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.e}
        </span>
      ))}
    </div>
  )
}

function Yes() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t0 = setTimeout(() => setI(1), 6500)
    return () => clearTimeout(t0)
  }, [])

  useEffect(() => {
    if (i < 1 || i > LOVE.length) return
    const t = setTimeout(() => setI(i + 1), 3300)
    return () => clearTimeout(t)
  }, [i])

  const done = i > LOVE.length

  return (
    <div className="page">
      <div className="top">
        <h1>Men ham seni sevaman! ❤️</h1>
        <div className="hearts">
          {Array.from({ length: 9 }, (_, k) => (
            <Heart key={k} delay={0.6 + k * 0.6} />
          ))}
        </div>
        {done ? (
          <div className="final">Faqat sen — abadiy 💍</div>
        ) : (
          i >= 1 && (
            <div className="love" key={i}>
              {LOVE[i - 1]}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [yes, setYes] = useState(false)
  const [moves, setMoves] = useState(0)
  const [pos, setPos] = useState(null)

  const runAway = () => {
    if (moves >= 4) return
    const w = Math.min(160, window.innerWidth * 0.4)
    const hh = 64
    setPos({
      x: Math.random() * (window.innerWidth - w - 20) + 10,
      y: Math.random() * (window.innerHeight - hh - 20) + 10,
    })
    setMoves(moves + 1)
  }

  const upset = moves >= 4

  return (
    <>
      <Background />
      {yes ? (
        <Yes />
      ) : (
        <div className="page">
          <div className="top">
            <div className="emoji">{upset ? '😔' : '💌'}</div>
            <h1>Sen meni sevasanmi?</h1>
            <p className="sub" key={moves}>
              {TEASE[moves]}
            </p>
          </div>
          <div className="btns">
            <button
              className="yes"
              style={{ transform: `scale(${1 + moves * 0.12})` }}
              onClick={() => setYes(true)}
            >
              Ha
            </button>
            {!upset && (
              <button
                className={'no' + (pos ? ' fly' : '')}
                style={pos ? { left: pos.x, top: pos.y } : undefined}
                onClick={runAway}
                onTouchStart={(e) => {
                  e.preventDefault()
                  runAway()
                }}
              >
                Yo'q
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
