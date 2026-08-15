import Image from "next/image";
import IntroOverlay from "./IntroOverlay";
import ScrollReveal from "./ScrollReveal";

const activities = [
  { image: "/images/ipoh-3.jpg", tag: "Heritage", title: "Old Town shophouses", text: "Concubine Lane, the Birch Memorial Clock Tower and rows of British-era façades—all inside an easy twenty-minute loop." },
  { image: "/images/ipoh-2.jpg", tag: "Outdoors", title: "Limestone hills & caves", text: "Cave temples cut into the karst at the edge of the city, including the much-loved Perak Tong and Sam Poh Tong." },
  { image: "/images/ipoh-1.jpg", tag: "Food", title: "Kopitiam breakfast", text: "White coffee, bean sprout chicken and caramel custard. Go early—the best places run out rather than close." },
  { image: "/images/ipoh-4.jpg", tag: "Street art", title: "Murals & back lanes", text: "Follow Mural Art’s Lane and discover Ernest Zacharevic’s pieces tucked across the walls of Old Town." },
  { image: "/images/ipoh-6.jpg", tag: "After dark", title: "Markets & riverside", text: "Wander the Kinta riverfront after dark, then find the pasar malam that pops up on a different street each night." },
  { image: "/images/ipoh-5.jpg", tag: "Day trip", title: "Kellie’s Castle", text: "An unfinished Scottish planter’s mansion in Batu Gajah—half an hour south and Perak’s most photogenic ruin." },
];

const features = [
  { icon: "↗", image: "/images/tour-1.jpg", title: "Your pace, your plan", text: "Start, pause or vanish down a side street—resume the story whenever you're ready.", href: "#" },
  { icon: "◎", image: "/images/tour-3.jpg", title: "GPS-guided stories", text: "Narration begins on its own the moment you reach each stop. No tapping, no waiting.", href: "#" },
  { icon: "✦", image: "/images/earbuds-demo.jpg", imagePosition: "50% 78%", title: "Ask Dengarlah anything", text: "Curious about that mural, or what's cooking behind that stall? Ask out loud—our AI guide answers in real time, no script required.", href: "#", demoHref: "#" },
  { icon: "↓", image: "/images/gallery-1.jpg", title: "Offline & multilingual", text: "Download once and explore in your language, signal-free, for as long as you like.", href: "#" },
];

const steps = [
  ["01", "Get the app", "Download the app for free before you set out."],
  ["02", "Choose a route", "Pick by theme, length or the mood you're in."],
  ["03", "Find the start", "Walk to the marked spot—we'll show you where."],
  ["04", "Press play", "The stories unfold, one quiet stop at a time."],
];

const reviews = [
  ["Dengarlah turned our free afternoon into the best part of the trip.", "J. Okafor · App Store"],
  ["I loved being able to pause and detour for lunch without losing the thread.", "R. Santos · Google Play"],
  ["It never once felt like I was being led. Just told—right when I wanted to know.", "A. Meyer · App Store"],
];

const faqs = [
  ["What is a self-guided walking tour?", "It's a route with recorded narration that plays automatically as you walk, using your phone's GPS. You explore alone, at your own rhythm—no live guide, no group to keep pace with."],
  ["Do I need a data connection during the tour?", "No. Download your tour before setting out and it works fully offline, so a weak signal never interrupts the story."],
  ["Can I pause or replay parts of a tour?", "Yes. Pause, rewind, skip ahead or disappear for a coffee. The story picks up exactly where you left it."],
  ["Is it suitable for solo travellers?", "It's built for them. No one to wait for, no small talk required—just you, your earbuds, and a city that's finally speaking directly to you."],
  ["What can I actually ask the AI guide?", "Anything in front of you—a building's history, a dish's name, where to find some quiet nearby. Dengarlah's AI knows the route and the city, and it won't waste your time with chit-chat."],
];

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <ScrollReveal />
      <a className="skip" href="#main">Skip to content</a>
      <header className="header">
        <nav aria-label="Primary navigation">
          <a href="#discover">Discover Ipoh</a><a href="#how">How it works</a><a href="#locals">Local voices</a><a href="#faq">FAQ</a>
        </nav>
        <a className="buttonSmall" href="#download">Get the app <span>↗</span></a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="heroImage">
            <Image src="/images/hero-banner.jpg" alt="The clock tower of Dewan Bandaran Ipoh against a clear sky" fill priority sizes="100vw" />
          </div>
          <div className="heroContent">
            <p className="heroBrand">Dengarlah</p>
            <p className="eyebrow badge"><span /> Self-guided audio walks</p>
            <h1>Wander quietly.<br /><em>Listen closely.</em></h1>
            <p className="heroCopy">No group to keep up with, no guide to make small talk with. Just a pair of earbuds, a quiet route through Ipoh, and an AI companion that answers only when you ask.</p>
            <div className="heroActions"><a className="button" href="#download">Start listening <span>→</span></a><a className="textLink" href="#how"><b>▶</b> See how it works</a></div>
          </div>
          <dl className="heroStats"><div><dt>3,669</dt><dd>walking tours</dd></div><div><dt>4.7 <i>★</i></dt><dd>average rating</dd></div><div><dt>73k+</dt><dd>happy ratings</dd></div></dl>
          <div className="heroNote"><span>🎧</span><p><b>Built for solo wanderers.</b><br />No groups. No rush. Just you and the city.</p></div>
        </section>

        <section className="intro section" id="locals">
          <p className="eyebrow" data-reveal><span /> Stories from people who live them</p>
          <div className="introGrid">
            <h2 data-reveal>A local voice in your ear,<br /><em>Ipoh at your feet.</em></h2>
            <div data-reveal><p>Our tours are narrated by restaurant owners, fifth-generation locals, historians and quiet-spoken guides who’d rather tell you a secret than shout a fact. You get the history—and the parts nobody writes down.</p><div className="guides">{[1,2,3,4,5,6].map((n) => <Image key={n} src={`/images/guide-${n}.jpg`} alt="Local Dengarlah storyteller" width={64} height={64} />)}<strong>+ local storytellers</strong></div></div>
          </div>
        </section>

        <section className="discover section" id="discover">
          <div className="sectionHead" data-reveal><div><p className="eyebrow light"><span /> Six ways to disappear into Ipoh</p><h2>So much to overhear.<br /><em>Where do you start?</em></h2></div><p>A tin-mining boomtown tucked between limestone hills, filled with cave temples, quiet shophouses and a food culture worth wandering for—best explored without a crowd.</p></div>
          <div className="activityGrid">{activities.map((item, i) => <article className={`activity a${i+1}`} key={item.title} data-reveal style={{ transitionDelay: `${i * 70}ms` }}><Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 100vw, 40vw" /><div className="activityShade" /><div className="activityText"><span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </section>

        <section className="features section" id="how">
          <div className="sectionHead" data-reveal><div><p className="eyebrow"><span /> Explore without the timetable</p><h2>The city moves<br /><em>at your speed.</em></h2></div><a className="button" href="#download">Try it out <span>→</span></a></div>
          <div className="featureGrid">{features.map((f, i) => <article key={f.title} data-reveal style={{ transitionDelay: `${i * 70}ms` }}><div className="featureGraphic"><Image src={f.image} alt="" fill sizes="(max-width: 900px) 50vw, 25vw" style={f.imagePosition ? { objectPosition: f.imagePosition } : undefined} /></div><div className="featureBody"><span className="featureIcon">{f.icon}</span><h3>{f.title}</h3><div className="rule"/><p>{f.text}</p>{f.demoHref ? <a className="textLink cardLink" href={f.demoHref}><b>▶</b> Play demo</a> : <a className="cardLink" href={f.href}>Learn more <span>→</span></a>}</div></article>)}</div>
          <div className="walkFeature" data-reveal><div className="walkPhoto"><Image src="/images/tour-2.jpg" alt="Looking up at the colonial clock tower of Dewan Bandaran Ipoh" fill sizes="50vw" /></div><div className="walkCopy"><p className="eyebrow light"><span /> Freedom looks good on you</p><h2>Pause for lunch.<br />Take the wrong turn.<br /><em>Keep the story.</em></h2><p>Start whenever you want, alone or with the one person who also hates group tours. Pause, skip a stop, or just sit somewhere quiet—the story waits for you, not the other way around.</p><a className="button cream" href="#download">Start exploring <span>→</span></a></div></div>
        </section>

        <section className="food section">
          <div className="foodMap"><Image src="/images/map-bg.jpg" alt="Aerial view of a road intersection in Ipoh" fill sizes="50vw" /></div>
          <div className="foodCopy" data-reveal><p className="eyebrow"><span /> Fast Track · Old Town route</p><h2>Skip the queue.<br /><em>Keep the appetite.</em></h2><p>Claim a place in line at partner eateries while your tour carries on. When it’s time, show your code and sit down—no booking fee, no printed voucher, no waiting in a crowd.</p><div className="foodPlaces"><span>Kong Heng</span><span>Funny Mountain</span><span>Thean Chun</span><span>Lou Wong</span></div></div>
        </section>

        <section className="steps section">
          <p className="eyebrow" data-reveal><span /> Four quiet steps</p><h2 data-reveal>From download to<br /><em>disappearing act.</em></h2>
          <ol>{steps.map(([n,t,d], i) => <li key={n} data-reveal style={{ transitionDelay: `${i * 70}ms` }}><b>{n}</b><span>↘</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </section>

        <section className="reviews section"><p className="eyebrow light" data-reveal><span /> Loved by curious wanderers</p><div className="reviewsTop" data-reveal><h2>“Like exploring with<br /><em>a friend who knows when to be quiet.”</em></h2><div><strong>4.7 / 5</strong><span>★★★★★</span><p>from 73,428 ratings</p></div></div><div className="reviewCards">{reviews.map(([quote, cite], i) => <blockquote key={cite} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>“{quote}”<cite>{cite}</cite></blockquote>)}</div></section>

        <section className="faq section" id="faq"><div data-reveal><p className="eyebrow"><span /> Good to know</p><h2>A few questions,<br /><em>answered quietly.</em></h2><p>Still curious? Drop us a note and a real human—not the AI—will help.</p><a href="mailto:hello@dengarlah.app">hello@dengarlah.app →</a></div><div>{faqs.map(([q,a],i) => <details key={q} open={i===0} data-reveal style={{ transitionDelay: `${i * 60}ms` }}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

        <section className="download section" id="download"><div data-reveal><p className="eyebrow light"><span /> Your next walk is waiting</p><h2>Hear Ipoh<br /><em>differently.</em></h2><p>Download the app, choose a story and let the city find you instead.</p><div className="storeButtons"><a href="#"> &nbsp; App Store</a><a href="#">▶ &nbsp; Google Play</a></div></div><div className="postcard" data-reveal><Image src="/images/gallery-3.jpg" alt="Mirror Lake reflecting the forested limestone hills near Ipoh" fill sizes="360px"/><span>Jom jalan! ✦</span></div></section>
      </main>

      <footer><div className="footerTop"><div><span className="logo">Dengarlah</span><p>Self-guided stories for people who’d rather listen than talk.</p></div><div><b>Explore</b><a href="#discover">Discover Ipoh</a><a href="#how">How it works</a><a href="#locals">Local voices</a></div><div><b>Say hello</b><a href="mailto:hello@dengarlah.app">Email us</a><a href="#">Instagram</a><a href="#">Facebook</a></div></div><div className="footerBottom"><span>© 2026 ABC Dengarlah</span><span>Made quietly in Ipoh, Perak</span></div></footer>
    </>
  );
}
