/* ==========================================================================
   SITE CONFIG — edit this one file to update church details everywhere.
   Empty values ("") are simply hidden on the website.
   ========================================================================== */
window.SITE = {
  name: "Freedom Worship Center",
  city: "Würzburg",

  street: "Ohmstraße 8",
  zip: "97076",
  town: "Würzburg",
  mapsQuery: "Freedom Worship Center, Ohmstraße 8, 97076 Würzburg",

  phone: "+49 931 4607608",
  email: "info@freedomworshipcenter.de",

  // Weekly gatherings
  services: [
    { day: { de: "Sonntag", en: "Sunday" }, time: "10:00", title: { de: "Gottesdienst", en: "Sunday Service" }, note: { de: "Anbetung, Wort & Wunder – auf Englisch und Deutsch. Mit Kinderkirche.", en: "Worship, the Word & miracles – in English and German. Kids church included." } },
    { day: { de: "Montag", en: "Monday" }, time: "19:00", title: { de: "Gebet", en: "Prayer" }, note: { de: "Wir treffen uns in der Kirche, um gemeinsam zu beten.", en: "We meet at church to pray together." } },
    { day: { de: "Dienstag", en: "Tuesday" }, time: "19:30", title: { de: "Jugendgebet", en: "Youth Prayer" }, note: { de: "Chosen Generation auf Zoom – jeden 2. Dienstag um 18:30 live in der Kirche.", en: "Chosen Generation on Zoom – every 2nd Tuesday at 6:30 pm live at church." } },
    { day: { de: "Mittwoch", en: "Wednesday" }, time: "19:00", end: "20:00", title: { de: "Bibelstudium", en: "Bible Study" }, note: { de: "Online per Zoom – Zugangsdaten auf Anfrage.", en: "Online via Zoom – ask us for the link." } }
  ],
  // Used for the "next service" countdown (0 = Sunday ... 6 = Saturday)
  mainService: { weekday: 0, hour: 10, minute: 0, durationMin: 180 },

  youtubeChannelId: "UCeRUwYuNwXCq6N0ajPA0CXw",
  youtubeUrl: "https://www.youtube.com/@freedomworshipcenterwurzbu5957",
  youtubeLiveUrl: "https://www.youtube.com/@freedomworshipcenterwurzbu5957/streams",
  instagramUrl: "https://www.instagram.com/fwc.wuerzburg/",
  facebookUrl: "https://www.facebook.com/FreedomWorshipCenterGermany/",
  tiktokUrl: "https://www.tiktok.com/@fwc.wuerzburg",

  // Giving — empty fields are hidden
  give: {
    accountHolder: "Freedom Worship Center e.V.",
    iban: "DE34 7905 0000 0049 6838 99",
    bic: "",
    bank: "Sparkasse Mainfranken",
    paypalUrl: ""
  },

  // Contact form: by default it opens the visitor's email program addressed to the email above.
  // To receive messages directly, create a free form at https://formspree.io and paste the endpoint here.
  formEndpoint: ""
};
