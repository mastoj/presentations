export interface Presentation {
  id: string;
  title: string;
  description: string;
  date: string;
  recordingUrl?: string;
  slidesUrl?: string;
}

export const presentations: Presentation[] = [
  {
    id: "1",
    title:
      "What we learned rebuilding the largest Nordic electronic retail website in Next.js?",
    description:
      "What was the motivation for rebuilding the largest Nordic electronic retail website in Next.js, what did we learn and how do you go about making such a change in a larger organization?",
    date: "2025-03-20",
    recordingUrl: "https://www.youtube.com/watch?v=nYOAWjcRuBY",
    slidesUrl: "/reactparis",
  },
];
