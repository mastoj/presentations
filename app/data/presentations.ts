export interface Presentation {
  id: string;
  title: string;
  event: string;
  description: string;
  date: string;
  recordingUrl?: string;
  slidesUrl?: string;
}

export const presentations: Presentation[] = [
  {
    id: "1",
    event: "React Paris 2025",
    title:
      "What we learned rebuilding the largest Nordic electronic retail website in Next.js?",
    description:
      "What was the motivation for rebuilding the largest Nordic electronic retail website in Next.js, what did we learn and how do you go about making such a change in a larger organization?",
    date: "2025-03-20",
    recordingUrl: "https://www.youtube.com/watch?v=nYOAWjcRuBY",
    slidesUrl: "/reactparis",
  },
  {
    id: "2",
    event: "Refill 2025",
    title:
      "What we learned rebuilding the largest Nordic electronic retail website in Next.js?",
    description:
      "What was the motivation for rebuilding the largest Nordic electronic retail website in Next.js, what did we learn and how do you go about making such a change in a larger organization?",
    date: "2025-04-04",
    recordingUrl: "https://www.youtube.com/watch?v=EvAIoqRrG_k",
    slidesUrl: "/refill/2025",
  },
  {
    id: "3",
    event: "NDC Oslo 2025",
    title: "Learnings from One Year in Production with Next.js on Vercel",
    description:
      "What was the motivation for rebuilding the largest Nordic electronic retail website in Next.js, what did we learn and how do you go about making such a change in a larger organization?",
    date: "2025-05-21",
    // recordingUrl: "https://www.youtube.com/watch?v=nYOAWjcRuBY",
    slidesUrl: "/ndcoslo/2025",
  },
  {
    id: "4",
    event: "Vercel Ship 2025",
    title: "Rebuilding an ecommerce site with Next.js and Vercel",
    description: "",
    date: "2025-06-25",
    recordingUrl: "https://www.youtube.com/watch?v=85TRYRhBEmI",
    slidesUrl:
      "https://docs.google.com/presentation/d/1-Trgy-dwBdSEdBsJP7Np312FSv8Elqj8kST_b_xg7-o/edit?usp=sharing",
  },
  {
    id: "5",
    event: "NDC Copenhagen Developers Festival",
    title:
      "What we learned rebuilding the largest Nordic electronic retail website in Next.js?",
    description:
      "What was the motivation for rebuilding the largest Nordic electronic retail website in Next.js, what did we learn and how do you go about making such a change in a larger organization?",
    date: "2025-09-11",
    // recordingUrl: "https://www.youtube.com/watch?v=nYOAWjcRuBY",
    slidesUrl: "/ndccopenhagen/2025",
  },
  {
    id: "6",
    event: "Cloud Native Bergen 2025",
    title: "Learnings from One Year in Production with Next.js on Vercel",
    description:
      "What was the motivation for rebuilding the largest Nordic electronic retail website in Next.js, what did we learn and how do you go about making such a change in a larger organization?",
    date: "2025-10-28",
    // recordingUrl: "https://www.youtube.com/watch?v=nYOAWjcRuBY",
    slidesUrl: "/cloudnativebergen/2025",
  },
];
