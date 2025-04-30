import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <div className="justify-items-center text-align-center">
          <h1 className="text-4xl md:text-6xl lg:txt-8xl">Joyoga</h1>
          <h2 className="text-2xl md:text-4xl lg:txt-6xl">See you in class!</h2>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://www.instagram.com/joyogaflow/?igsh=MXVkOXRlMTM4ejY3dQ%3D%3D#" target="_blank"
            rel="noopener noreferrer"
          >
          Instagram</a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://open.spotify.com/user/31wikm4sn5jyzmi7w74zaf4aara4?si=e29518e8157e41de" target="_blank"
            rel="noopener noreferrer"
          >
          Spotify Playlists</a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://venmo.com/u/Joyogaflow" target="_blank"
            rel="noopener noreferrer"
          >
            Venmo
          </a>
        </div>
      </main>
    </div>
  );
}
