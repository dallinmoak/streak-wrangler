import localFont from "next/font/local";

const mainSerif = localFont({
  src: "./fonts/Piazzolla-V.ttf",
  variable: "--font-main-serif",
  weight: "100 900",
});
const mainSans = localFont({
  src: "./fonts/Montserrat-V.ttf",
  variable: "--font-main-sans",
  weight: "100 900",
});
const mainMono = localFont({
  src: "./fonts/SourceCodePro-V.ttf",
  variable: "--font-main-mono",
  weight: "100 900",
});

const vars = `${mainSans.variable} ${mainMono.variable} ${mainSerif.variable}`;

export {
  vars,
  mainSerif,
  mainSans,
  mainMono,
};