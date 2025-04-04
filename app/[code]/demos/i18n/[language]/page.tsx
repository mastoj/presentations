import Image from "next/image";
import middleware from "../_images/middleware.png";

type Props = {
  params: Promise<{
    language: string;
  }>;
};

export const dynamic = "force-static";

export async function generateStaticParams() {
  return [];
}

// Lookup table for 20 iso 2 language to the word hello and the emoji flag for the country.
const languageLookup: Record<string, { hello: string; flag: string }> = {
  da: { hello: "Hej", flag: "🇩🇰" },
  sv: { hello: "Hej", flag: "🇸🇪" },
  no: { hello: "Hei", flag: "🇳🇴" },
  fi: { hello: "Hei", flag: "🇫🇮" },
  is: { hello: "Halló", flag: "🇮🇸" },
  us: { hello: "Hello", flag: "🇺🇸" },
  en: { hello: "Hello", flag: "🇬🇧" },
  es: { hello: "Hola", flag: "🇪🇸" },
  fr: { hello: "Bonjour", flag: "🇫🇷" },
  de: { hello: "Hallo", flag: "🇩🇪" },
  it: { hello: "Ciao", flag: "🇮🇹" },
  pt: { hello: "Olá", flag: "🇵🇹" },
  ru: { hello: "Привет", flag: "🇷🇺" },
  ja: { hello: "こんにちは", flag: "🇯🇵" },
  zh: { hello: "你好", flag: "🇨🇳" },
  ko: { hello: "안녕하세요", flag: "🇰🇷" },
  ar: { hello: "مرحبا", flag: "🇸🇦" },
  hi: { hello: "नमस्ते", flag: "🇮🇳" },
  bn: { hello: "হ্যালো", flag: "🇧🇩" },
  pa: { hello: "ਹੈਲੋ", flag: "🇮🇳" },
  te: { hello: "హలో", flag: "🇮🇳" },
  tr: { hello: "Merhaba", flag: "🇹🇷" },
  nl: { hello: "Hallo", flag: "🇳🇱" },
  pl: { hello: "Cześć", flag: "🇵🇱" },
  vi: { hello: "Xin chào", flag: "🇻🇳" },
  th: { hello: "สวัสดี", flag: "🇹🇭" },
};

const LanguagePage = async ({ params }: Props) => {
  const { language } = await params;
  const locale = languageLookup[language] ? language : "en";
  return (
    <div className="h-screen w-screen flex flex-col gap-8 justify-center items-center">
      <div className="grid grid-cols-2 p-8 gap-4 max-w-screen">
        <div className="flex flex-col justify-center items-center">
          <Image src={middleware} alt="Middleware" />
        </div>
        <div className="flex flex-col justify-center items-center text-7xl">
          {languageLookup[locale].flag}
          <div>{languageLookup[locale].hello}</div>
        </div>
      </div>
      <div className="mt-auto text-2xl flex flex-row gap-2 pb-8">
        {Object.entries(languageLookup).map(([key, value]) => (
          <a key={key} href={`/demos/i18n/${key}`}>
            {value.flag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LanguagePage;
