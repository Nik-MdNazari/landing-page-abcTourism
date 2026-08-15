import Image from "next/image";

const activities = [
  { image: "/images/ipoh-3.jpg", tag: "Heritage", title: "Old Town shophouses", text: "Concubine Lane, the Birch Memorial Clock Tower and rows of British-era façades—all inside an easy twenty-minute loop." },
  { image: "/images/ipoh-2.jpg", tag: "Outdoors", title: "Limestone hills & caves", text: "Cave temples cut into the karst at the edge of the city, including the much-loved Perak Tong and Sam Poh Tong." },
  { image: "/images/ipoh-1.jpg", tag: "Food", title: "Kopitiam breakfast", text: "White coffee, bean sprout chicken and caramel custard. Go early—the best places run out rather than close." },
  { image: "/images/ipoh-4.jpg", tag: "Street art", title: "Murals & back lanes", text: "Follow Mural Art’s Lane and discover Ernest Zacharevic’s pieces tucked across the walls of Old Town." },
  { image: "/images/ipoh-6.jpg", tag: "After dark", title: "Markets & riverside", text: "Wander the Kinta riverfront after dark, then find the pasar malam that pops up on a different street each night." },
  { image: "/images/ipoh-5.jpg", tag: "Day trip", title: "Kellie’s Castle", text: "An unfinished Scottish planter’s mansion in Batu Gajah—half an hour south and Perak’s most photogenic ruin." },
];

const features = [
  ["↗", "Your pace, your plan", "Start, pause or resume a tour whenever it suits you."],
  ["◎", "GPS-guided stories", "Narration starts automatically as you approach each stop."],
  ["✦", "Ask your local guide", "Go deeper with follow-up questions about what you just heard."],
  ["↓", "Offline & multilingual", "Download once and explore in your language, signal-free."],
];

const faqs = [
  ["What is a self-guided walking tour?", "It’s a route with recorded narration that plays automatically as you walk, using your phone’s GPS. You can explore without a live guide or a fixed group schedule."],
  ["Do I need a data connection during the tour?", "No. Download your tour before setting out and it will work fully offline, so weak signal never interrupts the story."],
  ["Can I pause or replay parts of a tour?", "Yes. Pause, rewind, skip ahead or take a coffee detour. The tour picks up again whenever you are ready."],
  ["Is it suitable for solo travellers?", "Absolutely. Many travellers choose self-guided tours because there is no group pace to follow and no fixed time to book around."],
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="header">
        <a className="logo" href="#top" aria-label="ABC Tourism home">
          <Image src="/images/abc-tourism-logo.png" alt="ABC Tourism" width={640} height={430} priority />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#discover">Discover Ipoh</a><a href="#how">How it works</a><a href="#locals">Local guides</a><a href="#faq">FAQ</a>
        </nav>
        <a className="button buttonSmall" href="#download">Get the app <span>↗</span></a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="heroImage">
            <Image src="/images/hero-banner.jpg" alt="A lively street in Ipoh Old Town" fill priority sizes="100vw" />
          </div>
          <div className="heroCard">
            <p className="eyebrow"><span /> Your Ipoh story starts here</p>
            <h1>Walk curious.<br /><em>Meet Ipoh.</em></h1>
            <p className="heroCopy">Locally told audio walks that begin when you do. Discover old streets, brilliant food and the stories hiding in plain sight.</p>
            <div className="heroActions"><a className="button" href="#discover">Explore Ipoh <span>→</span></a><a className="textLink" href="#how"><b>▶</b> See how it works</a></div>
            <dl className="stats"><div><dt>3,669</dt><dd>walking tours</dd></div><div><dt>4.7 <i>★</i></dt><dd>average rating</dd></div><div><dt>73k+</dt><dd>happy ratings</dd></div></dl>
          </div>
          <div className="heroNote"><span>📍</span><p><b>Made for wandering</b><br />No groups. No rush. Just Ipoh.</p></div>
        </section>

        <section className="intro section" id="locals">
          <p className="eyebrow"><span /> Stories from people who live them</p>
          <div className="introGrid">
            <h2>A local in your ear,<br /><em>Ipoh at your feet.</em></h2>
            <div><p>Our tours are created by restaurant owners, fifth-generation locals, historians, chefs and experienced guides. You get the facts, but also the personal details that make a place feel alive.</p><div className="guides">{[1,2,3,4,5,6].map((n) => <Image key={n} src={`/images/guide-${n}.jpg`} alt="Local ABC Tourism guide" width={64} height={64} />)}<strong>+ local storytellers</strong></div></div>
          </div>
        </section>

        <section className="discover section" id="discover">
          <div className="sectionHead"><div><p className="eyebrow light"><span /> Pick your kind of adventure</p><h2>So much Ipoh.<br /><em>Where to first?</em></h2></div><p>A tin-mining boomtown tucked between limestone hills, filled with cave temples, handsome shophouses and a food culture worth travelling for.</p></div>
          <div className="activityGrid">{activities.map((item, i) => <article className={`activity a${i+1}`} key={item.title}><Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 100vw, 40vw" /><div className="activityShade" /><div className="activityText"><span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </section>

        <section className="features section" id="how">
          <div className="sectionHead darkText"><div><p className="eyebrow"><span /> Explore without the timetable</p><h2>The city moves<br /><em>at your speed.</em></h2></div><p>Pop in your earbuds and let GPS do the guiding. Your tour follows your pace, whether you linger at a mural or detour for another white coffee.</p></div>
          <div className="featureGrid">{features.map(([icon,title,text], i) => <article key={title}><span className={`featureIcon f${i}`}>{icon}</span><p>0{i+1}</p><h3>{title}</h3><div className="rule"/><p>{text}</p></article>)}</div>
          <div className="walkFeature"><div className="walkPhoto"><Image src="/images/tour-2.jpg" alt="Traveller exploring an Ipoh heritage street" fill sizes="50vw" /></div><div className="walkCopy"><p className="eyebrow light"><span /> Freedom looks good on you</p><h2>Pause for lunch.<br />Take the wrong turn.<br /><em>Keep the story.</em></h2><p>Start whenever you want, alone or with your favourite people. Pause, skip a stop or linger as long as you like—there’s no guide flag disappearing around the corner.</p><a className="button cream" href="#download">Start exploring <span>→</span></a></div></div>
        </section>

        <section className="food section">
          <div className="foodMap"><Image src="/images/map-bg.jpg" alt="Map of eateries along the Ipoh Old Town route" fill sizes="50vw" /></div>
          <div className="foodCopy"><p className="eyebrow"><span /> Fast App · Old Town route</p><h2>Skip the queue.<br /><em>Keep the appetite.</em></h2><p>Claim a place in line at partner eateries while your tour carries on. When it’s time, show your code and sit down—no booking fee or printed voucher.</p><div className="foodPlaces"><span>Kong Heng</span><span>Funny Mountain</span><span>Thean Chun</span><span>Lou Wong</span></div></div>
        </section>

        <section className="steps section">
          <p className="eyebrow"><span /> Four little steps</p><h2>From download to<br /><em>day out.</em></h2>
          <ol>{[["01","Get the app","Download the app for free before you set out."],["02","Choose a route","Pick by theme, length or the mood you’re in."],["03","Find the start","Walk to the marked spot—we’ll show you where."],["04","Press play","The stories unfold, one stop at a time."]].map(([n,t,d]) => <li key={n}><b>{n}</b><span>↘</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </section>

        <section className="reviews section"><p className="eyebrow light"><span /> Loved by curious walkers</p><div className="reviewsTop"><h2>“Like exploring with<br /><em>a local friend.”</em></h2><div><strong>4.7 / 5</strong><span>★★★★★</span><p>from 73,428 ratings</p></div></div><div className="reviewCards"><blockquote>“VoiceMap turned our free afternoon into the best part of the trip.”<cite>J. Okafor · App Store</cite></blockquote><blockquote>“I loved being able to pause and detour for lunch without losing the thread.”<cite>R. Santos · Google Play</cite></blockquote><blockquote>“Well-informed, personal and never felt like we were following a script.”<cite>A. Meyer · App Store</cite></blockquote></div></section>

        <section className="faq section" id="faq"><div><p className="eyebrow"><span /> Good to know</p><h2>A few questions,<br /><em>answered.</em></h2><p>Still curious? Drop us a note and a real human will help.</p><a href="mailto:hello@abctourism.my">hello@abctourism.my →</a></div><div>{faqs.map(([q,a],i) => <details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

        <section className="download section" id="download"><div><p className="eyebrow light"><span /> Your next walk is waiting</p><h2>See Ipoh<br /><em>differently.</em></h2><p>Download the app, choose a story and let the city surprise you.</p><div className="storeButtons"><a href="#"> &nbsp; App Store</a><a href="#">▶ &nbsp; Google Play</a></div></div><div className="postcard"><Image src="/images/gallery-3.jpg" alt="A colourful detail from Ipoh" fill sizes="360px"/><span>Jom jalan! ✦</span></div></section>
      </main>

      <footer><div className="footerTop"><div><Image src="/images/abc-tourism-logo.png" alt="ABC Tourism" width={640} height={430}/><p>Self-guided stories by local experts,<br />for the endlessly curious.</p></div><div><b>Explore</b><a href="#discover">Discover Ipoh</a><a href="#how">How it works</a><a href="#locals">Our guides</a></div><div><b>Say hello</b><a href="mailto:hello@abctourism.my">Email us</a><a href="#">Instagram</a><a href="#">Facebook</a></div></div><div className="footerBottom"><span>© 2026 ABC Tourism</span><span>Made with ♥ in Ipoh, Perak</span></div></footer>
    </>
  );
}
