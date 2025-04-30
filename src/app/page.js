import Image from "next/image";
import { GoogleAnalytics } from '@next/third-parties/google'


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <GoogleAnalytics gaId="G-5ZJY5MZT6M" />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center w-full max-w-3xl mx-auto">

        <Image
          src="/joyanna-profile-yoga.jpg"
          alt="Joyoga Logo"
          width={200}
          height={200}
          className="rounded-full"
        />
        <section className="justify-items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:txt-8xl space-y-5">Joyoga</h1>
          <h2 className="text-2xl space-y-2 md:text-3xl lg:txt-4xl text-align-center">Yoga is a Moving Meditation</h2>
          <p>
            <span className="text-lg font-bold">Joyanna</span> is a yoga instructor based in Knoxville, TN. She is passionate about helping others find their own joy through movement and mindfulness.
          </p>
        </section>
        <section className="flex gap-4 items-start sm:flex-row">
          {/* <h3 className="text-2xl">Connect with Me</h3> */}
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://www.instagram.com/joyogaflow/?igsh=MXVkOXRlMTM4ejY3dQ%3D%3D#" target="_blank"
            rel="noopener noreferrer"
          >
          Instagram</a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://open.spotify.com/user/31wikm4sn5jyzmi7w74zaf4aara4?si=e29518e8157e41de" target="_blank"
            rel="noopener noreferrer"
          >
          Playlists</a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://venmo.com/u/Joyogaflow" target="_blank"
            rel="noopener noreferrer"
          >
            Venmo
          </a>
        </section>
        <section>
          <h3 className="text-3xl text-center">Classes & Purpose</h3>
          <p className="text-lg">My classes are designed to be fun and challenging, while also being accessible to all levels of practitioners. I believe that yoga should be a joyful experience, and I strive to create a welcoming and inclusive environment for all students. 👏</p>
          <p>I teach a variety of classes, including power yoga, slow flow, and restorative yoga. 📍 Currently, you can find me at <a
            className="underline"
            href="https://www.crunch.com/locations/fountain-city" target="_blank"
            rel="noopener noreferrer"
          >Crunch Fitness in Fountain City</a> and  <a
          className="underline"
          href="https://www.yogasix.com/location/bearden" target="_blank"
          rel="noopener noreferrer"
        >Yoga Six in Bearden</a>.</p>
        <p>Each location has their own rules for booking, most places have options for drop-in visits or a free trials.</p>
          <br />
          <hr />
          <br />
          <h4 className="text-2xl">💪 Power Yoga</h4>
          <p className="text-lg">I really enjoy teaching power classes. Using a faster flow and adding complexity to the postures each round of flow. ✨ High energy and fun!</p>
          <br />
              <h5 className="text-1xl font-bold">Tuesdays at 6:15pm</h5>
              <h6>Crunch Fitness, Fountain City</h6>
              <ul>
            <li>🔥🔥 100 Degrees</li>
            <li>⏰ 60 Minutes</li>
            <li>🙏 Balancing & Pulsing</li>
          </ul>
          <br />
             <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[240px]"
            href="https://www.crunch.com/locations/fountain-city" target="_blank"
            rel="noopener noreferrer"
          >
            Book at Crunch Fitness
          </a>
          <br />
          <hr />
          <br />
          <h4 className="text-2xl">🌊 Slow Flow Yoga</h4>
          <p className="text-lg">In slow flow we hold the postures for a longer period of time than power. This gives enough time to deepen each pose. Challenging and strengthening!</p>
          <h5 className="text-1xl font-bold">Thursdays at 4:00pm</h5>
          <h6>YogaSix, Bearden</h6>
          <ul>
            <li>🔥 90 Degrees</li>
            <li>⏰ 60 Minutes</li>
            <li>😎 Extra Chill</li>
          </ul>
          <br />
             <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[190px]"
            href="https://www.yogasix.com/location/bearden" target="_blank"
            rel="noopener noreferrer"
          >
            Book at Yoga Six
          </a>
          <br />
          <hr />
          <br />
          <h5 className="text-1xl font-bold">Saturdays at 10:30am</h5>
          <h6>YogaSix, Bearden</h6>
          <ul>
            <li>🔥 90 Degrees</li>
            <li>⏰ 60 Minutes</li>
            <li>🎶 Extra Vibes</li>
          </ul>
          <br />
             <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[190px]"
            href="https://www.yogasix.com/location/bearden" target="_blank"
            rel="noopener noreferrer"
          >
            Book at Yoga Six
          </a>
          <br />
          <hr />
        </section>
        <section>
        <h3 className="text-2xl">🧪 Methodologies</h3>
        <h4 className="text-1xl font-bold">🧘‍♀️ Meditation</h4>
          <p>Yoga offers a 2-5min meditation at the end of every session. This helps to calm your anxieties and work on your ability to stay present.</p>
          <a
            className="underline"
            href="https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858" target="_blank"
            rel="noopener noreferrer"
          >
            Benefits of Meditation • Mayo Clinic
          </a>
        </section>
      </main>
    </div>
  );
}
