import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hi" | "bn";

export interface T {
  // Nav
  nav_marketplace: string; nav_mentorship: string; nav_schemes: string;
  nav_content: string; nav_ai_search: string; nav_knowledge: string;
  nav_resources: string;
  nav_login: string; nav_register: string; nav_dashboard: string;
  // Hero
  hero_badge: string; hero_headline: string; hero_sub: string;
  cta_register: string; cta_mentor: string; cta_marketplace: string;
  // Search
  search_placeholder: string; search_btn: string;
  search_cats: string[];
  // About
  about_tag: string; about_heading: string; about_highlight: string; about_body: string;
  about_join: string; about_services: string;
  about_cards: { title: string; desc: string }[];
  // Sections
  services_tag: string; services_heading: string; services_highlight: string;
  articles_tag: string; articles_heading: string; articles_highlight: string;
  activities_tag: string; activities_heading: string;
  partners_tag: string; partners_heading: string; partners_sub: string;
  notices_tag: string; notices_heading: string; notices_sub: string;
  testimonials_tag: string; testimonials_heading: string; testimonials_highlight: string;
  contact_tag: string; contact_heading: string; contact_highlight: string;
  // Footer
  footer_tagline: string; footer_copyright: string; footer_made: string;
  footer_quick: string; footer_services_label: string; footer_connect: string;
  footer_helpline: string; footer_tollfree: string;
}

const translations: Record<Lang, T> = {
  en: {
    nav_marketplace: "Services", nav_mentorship: "Mentorship", nav_schemes: "Schemes",
    nav_content: "Content", nav_ai_search: "AI Search", nav_knowledge: "Knowledge",
    nav_resources: "Resources",
    nav_login: "Login", nav_register: "Register", nav_dashboard: "Dashboard",
    hero_badge: "IIT Kharagpur · MSME & Startup Growth Platform",
    hero_headline: "One Platform to Grow, Connect and Scale Your Business",
    hero_sub: "Services · Mentorship · Funding · Training · Business Support · Government Schemes",
    cta_register: "Register Business", cta_mentor: "Find Mentor", cta_marketplace: "Explore Services",
    search_placeholder: "Search businesses, services, mentors, schemes, training programs…",
    search_btn: "Search",
    search_cats: ["Businesses", "Services", "Mentors", "Government Schemes", "Training Programs"],
    about_tag: "About Us",
    about_heading: "Built for Entrepreneurs.",
    about_highlight: "Powered by IIT Kharagpur.",
    about_body: "MSME Growth Hub is a flagship initiative of the Rajendra Mishra School of Engineering Entrepreneurship, IIT Kharagpur (RMSOEE-IITKGP). We partner with government bodies, industry leaders, and incubators to build India's most comprehensive MSME and startup support ecosystem — helping 280+ ventures establish, scale, and succeed.",
    about_join: "Join the Platform", about_services: "Our Services",
    about_cards: [
      { title: "IIT KGP Backed", desc: "Directly supported by the Rajendra Mishra School of Engineering Entrepreneurship (RMSOEE), IIT Kharagpur." },
      { title: "Curated Network", desc: "280+ startups, 47 active mentors, and a growing IIT alumni investor community." },
      { title: "Proven Process", desc: "A 6-step engagement arc from discovery to scale, refined across hundreds of ventures." },
      { title: "Results-Driven", desc: "91% seed round success rate across our actively mentored startup portfolio." },
    ],
    services_tag: "Our Services", services_heading: "Everything your startup", services_highlight: "needs to grow.",
    articles_tag: "Latest Articles", articles_heading: "Insights for", articles_highlight: "builders.",
    activities_tag: "Activities & Events", activities_heading: "Workshops, Meetups &",
    partners_tag: "Partners & Collaborators", partners_heading: "Backed by", partners_sub: "India's Best.",
    notices_tag: "Notice Board", notices_heading: "Announcements &", notices_sub: "Opportunities.",
    testimonials_tag: "Founder Stories", testimonials_heading: "Straight from", testimonials_highlight: "the builders.",
    contact_tag: "Let's Talk", contact_heading: "Your startup.", contact_highlight: "Our mission.",
    footer_tagline: "An IIT Kharagpur Initiative — One Platform to Grow, Connect and Scale Your Business.",
    footer_copyright: "© 2026 MSME Growth Hub · IIT Kharagpur Initiative · All Rights Reserved.",
    footer_made: "Made for founders, by IIT Kharagpur.",
    footer_quick: "Quick Links", footer_services_label: "Services", footer_connect: "Connect",
    footer_helpline: "Emergency Helpline", footer_tollfree: "Toll-free · 24/7 support",
  },

  hi: {
    nav_marketplace: "सेवाएं", nav_mentorship: "मेंटरशिप", nav_schemes: "योजनाएं",
    nav_content: "सामग्री", nav_ai_search: "AI खोज", nav_knowledge: "ज्ञान केंद्र",
    nav_resources: "संसाधन",
    nav_login: "लॉगिन", nav_register: "पंजीकरण", nav_dashboard: "डैशबोर्ड",
    hero_badge: "आईआईटी खड़गपुर · एमएसएमई और स्टार्टअप ग्रोथ प्लेटफॉर्म",
    hero_headline: "व्यापार को बढ़ाने, जोड़ने और स्केल करने का एक मंच",
    hero_sub: "सेवाएं · मेंटरशिप · फंडिंग · प्रशिक्षण · व्यापार सहायता · सरकारी योजनाएं",
    cta_register: "व्यवसाय पंजीकृत करें", cta_mentor: "मेंटर खोजें", cta_marketplace: "सेवाएं देखें",
    search_placeholder: "व्यवसाय, सेवाएं, मेंटर, योजनाएं, प्रशिक्षण कार्यक्रम खोजें…",
    search_btn: "खोजें",
    search_cats: ["व्यवसाय", "सेवाएं", "मेंटर", "सरकारी योजनाएं", "प्रशिक्षण कार्यक्रम"],
    about_tag: "हमारे बारे में",
    about_heading: "उद्यमियों के लिए निर्मित।",
    about_highlight: "आईआईटी खड़गपुर द्वारा संचालित।",
    about_body: "एमएसएमई ग्रोथ हब आईआईटी खड़गपुर के राजेंद्र मिश्रा स्कूल ऑफ इंजीनियरिंग एंटरप्रेन्योरशिप (RMSOEE-IITKGP) की एक प्रमुख पहल है। हम सरकारी निकायों, उद्योग जगत के नेताओं और इन्क्यूबेटरों के साथ मिलकर भारत का सबसे व्यापक एमएसएमई और स्टार्टअप सहायता पारितंत्र बना रहे हैं — 280 से अधिक उद्यमों को स्थापित करने, विस्तार करने और सफल होने में मदद कर रहे हैं।",
    about_join: "प्लेटफॉर्म से जुड़ें", about_services: "हमारी सेवाएं",
    about_cards: [
      { title: "आईआईटी KGP समर्थित", desc: "आईआईटी खड़गपुर के राजेंद्र मिश्रा स्कूल ऑफ इंजीनियरिंग एंटरप्रेन्योरशिप (RMSOEE) द्वारा सीधे समर्थित।" },
      { title: "चुनिंदा नेटवर्क", desc: "280+ स्टार्टअप, 47 सक्रिय मेंटर और बढ़ता हुआ आईआईटी एलुमनी निवेशक समुदाय।" },
      { title: "सिद्ध प्रक्रिया", desc: "खोज से लेकर विस्तार तक 6 चरण की प्रक्रिया, सैकड़ों उद्यमों में परिष्कृत।" },
      { title: "परिणाम-उन्मुख", desc: "हमारे सक्रिय रूप से मेंटर किए गए पोर्टफोलियो में 91% सीड राउंड सफलता दर।" },
    ],
    services_tag: "हमारी सेवाएं", services_heading: "आपके स्टार्टअप को", services_highlight: "बढ़ने के लिए सब कुछ।",
    articles_tag: "नवीनतम लेख", articles_heading: "निर्माताओं के लिए", articles_highlight: "जानकारी।",
    activities_tag: "गतिविधियां और कार्यक्रम", activities_heading: "कार्यशालाएं, मीटअप और",
    partners_tag: "भागीदार और सहयोगी", partners_heading: "भारत के", partners_sub: "सर्वश्रेष्ठ द्वारा समर्थित।",
    notices_tag: "सूचना पट्ट", notices_heading: "घोषणाएं और", notices_sub: "अवसर।",
    testimonials_tag: "संस्थापक कहानियां", testimonials_heading: "सीधे", testimonials_highlight: "संस्थापकों से।",
    contact_tag: "बात करें", contact_heading: "आपका स्टार्टअप।", contact_highlight: "हमारा मिशन।",
    footer_tagline: "आईआईटी खड़गपुर की एक पहल — व्यापार को बढ़ाने, जोड़ने और स्केल करने का एक मंच।",
    footer_copyright: "© 2026 एमएसएमई ग्रोथ हब · आईआईटी खड़गपुर पहल · सर्वाधिकार सुरक्षित।",
    footer_made: "आईआईटी खड़गपुर द्वारा संस्थापकों के लिए बनाया गया।",
    footer_quick: "त्वरित लिंक", footer_services_label: "सेवाएं", footer_connect: "संपर्क करें",
    footer_helpline: "आपातकालीन हेल्पलाइन", footer_tollfree: "टोल-फ्री · 24/7 सहायता",
  },

  bn: {
    nav_marketplace: "সেবাসমূহ", nav_mentorship: "মেন্টরশিপ", nav_schemes: "প্রকল্পসমূহ",
    nav_content: "বিষয়বস্তু", nav_ai_search: "AI অনুসন্ধান", nav_knowledge: "জ্ঞান কেন্দ্র",
    nav_resources: "সম্পদ",
    nav_login: "লগইন", nav_register: "নিবন্ধন", nav_dashboard: "ড্যাশবোর্ড",
    hero_badge: "আইআইটি খড়গপুর · এমএসএমই ও স্টার্টআপ গ্রোথ প্ল্যাটফর্ম",
    hero_headline: "ব্যবসা বৃদ্ধি, সংযোগ ও স্কেল করার একটি প্ল্যাটফর্ম",
    hero_sub: "সেবাসমূহ · মেন্টরশিপ · ফান্ডিং · প্রশিক্ষণ · ব্যবসায়িক সহায়তা · সরকারি প্রকল্প",
    cta_register: "ব্যবসা নিবন্ধন করুন", cta_mentor: "মেন্টর খুঁজুন", cta_marketplace: "সেবাসমূহ দেখুন",
    search_placeholder: "ব্যবসা, সেবাসমূহ, মেন্টর, প্রকল্প, প্রশিক্ষণ কর্মসূচি খুঁজুন…",
    search_btn: "খুঁজুন",
    search_cats: ["ব্যবসা", "সেবাসমূহ", "মেন্টর", "সরকারি প্রকল্প", "প্রশিক্ষণ কর্মসূচি"],
    about_tag: "আমাদের সম্পর্কে",
    about_heading: "উদ্যোক্তাদের জন্য তৈরি।",
    about_highlight: "আইআইটি খড়গপুর দ্বারা পরিচালিত।",
    about_body: "এমএসএমই গ্রোথ হাব হল আইআইটি খড়গপুরের রাজেন্দ্র মিশ্র স্কুল অফ ইঞ্জিনিয়ারিং এন্টারপ্রেনারশিপ (RMSOEE-IITKGP)-এর একটি প্রধান উদ্যোগ। আমরা সরকারি সংস্থা, শিল্প নেতা এবং ইনকিউবেটরদের সাথে অংশীদারিত্বে ভারতের সবচেয়ে ব্যাপক এমএসএমই ও স্টার্টআপ সহায়তা ইকোসিস্টেম গড়ে তুলেছি — ২৮০টিরও বেশি উদ্যোগকে প্রতিষ্ঠিত, বিস্তৃত ও সফল করতে সাহায্য করছি।",
    about_join: "প্ল্যাটফর্মে যোগ দিন", about_services: "আমাদের সেবা",
    about_cards: [
      { title: "আইআইটি KGP সমর্থিত", desc: "আইআইটি খড়গপুরের রাজেন্দ্র মিশ্র স্কুল অফ ইঞ্জিনিয়ারিং এন্টারপ্রেনারশিপ (RMSOEE) দ্বারা সরাসরি সমর্থিত।" },
      { title: "বাছাই করা নেটওয়ার্ক", desc: "২৮০+ স্টার্টআপ, ৪৭ জন সক্রিয় মেন্টর এবং ক্রমবর্ধমান আইআইটি প্রাক্তন বিনিয়োগকারী সম্প্রদায়।" },
      { title: "প্রমাণিত প্রক্রিয়া", desc: "আবিষ্কার থেকে স্কেল পর্যন্ত ৬-ধাপের পদ্ধতি, শত শত উদ্যোগে পরিমার্জित।" },
      { title: "ফলাফলমুখী", desc: "আমাদের সক্রিয়ভাবে মেন্টর করা পোর্টফোলিওতে ৯১% সিড রাউন্ড সাফল্যের হার।" },
    ],
    services_tag: "আমাদের সেবা", services_heading: "আপনার স্টার্টআপের", services_highlight: "বৃদ্ধির জন্য সবকিছু।",
    articles_tag: "সর্বশেষ নিবন্ধ", articles_heading: "নির্মাতাদের জন্য", articles_highlight: "অন্তর্দৃষ্টি।",
    activities_tag: "কার্যক্রম ও অনুষ্ঠান", activities_heading: "কর্মশালা, মিটআপ ও",
    partners_tag: "অংশীদার ও সহযোগী", partners_heading: "ভারতের", partners_sub: "সেরাদের দ্বারা সমর্থিত।",
    notices_tag: "নোটিশ বোর্ড", notices_heading: "ঘোষণা ও", notices_sub: "সুযোগসমূহ।",
    testimonials_tag: "প্রতিষ্ঠাতার গল্প", testimonials_heading: "সরাসরি", testimonials_highlight: "নির্মাতাদের কাছ থেকে।",
    contact_tag: "কথা বলুন", contact_heading: "আপনার স্টার্টআপ।", contact_highlight: "আমাদের মিশন।",
    footer_tagline: "আইআইটি খড়গপুরের একটি উদ্যোগ — ব্যবসা বৃদ্ধি, সংযোগ ও স্কেল করার একটি প্ল্যাটফর্ম।",
    footer_copyright: "© ২০২৬ এমএসএমই গ্রোথ হাব · আইআইটি খড়গপুর উদ্যোগ · সর্বস্বত্ব সংরক্ষিত।",
    footer_made: "আইআইটি খড়গপুর দ্বারা প্রতিষ্ঠাতাদের জন্য তৈরি।",
    footer_quick: "দ্রুত লিংক", footer_services_label: "সেবাসমূহ", footer_connect: "যোগাযোগ করুন",
    footer_helpline: "জরুরি হেল্পলাইন", footer_tollfree: "টোল-ফ্রি · ২৪/৭ সহায়তা",
  },
};

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: T; }

const LanguageContext = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: translations.en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
