/* ==========================================================================
   SITE CONFIG — edit this one file to update church details everywhere.
   Empty values ("") are simply hidden on the website.
   ========================================================================== */
window.SITE = {
  name: "Freedom Worship Center",
  city: "Würzburg",
  tagline: { de: "Where Freedom Reigns", en: "Where Freedom Reigns" },

  street: "Ohmstraße 8",
  zip: "97076",
  town: "Würzburg",
  mapsQuery: "Freedom Worship Center, Ohmstraße 8, 97076 Würzburg",

  phone: "+49 931 4607608",
  email: "", // add the church email address here to show it on the site

  // Weekly gatherings
  services: [
    { day: { de: "Sonntag", en: "Sunday" }, time: "10:00", end: "13:00", title: { de: "Gottesdienst", en: "Sunday Service" }, note: { de: "Lobpreis & Predigt auf Englisch und Deutsch", en: "Worship & message in English and German" } },
    { day: { de: "Montag", en: "Monday" }, time: "19:00", end: "20:30", title: { de: "Abendtreffen", en: "Evening Gathering" }, note: { de: "Unter der Woche gemeinsam Gott suchen", en: "Seeking God together midweek" } },
    { day: { de: "Donnerstag", en: "Thursday" }, time: "19:00", end: "20:30", title: { de: "Abendtreffen", en: "Evening Gathering" }, note: { de: "Unter der Woche gemeinsam Gott suchen", en: "Seeking God together midweek" } }
  ],
  // Used for the "next service" countdown (0 = Sunday ... 6 = Saturday)
  mainService: { weekday: 0, hour: 10, minute: 0, durationMin: 180 },

  youtubeChannelId: "UCeRUwYuNwXCq6N0ajPA0CXw",
  youtubeUrl: "https://www.youtube.com/@freedomworshipcenterwurzbu5957",
  youtubeLiveUrl: "https://www.youtube.com/@freedomworshipcenterwurzbu5957/streams",
  instagramUrl: "https://www.instagram.com/fwc.wuerzburg/",
  facebookUrl: "https://www.facebook.com/FreedomWorshipCenterGermany/",

  // Giving — while iban is empty, the Give page asks people to get in touch instead.
  give: {
    accountHolder: "",
    iban: "",
    bic: "",
    bank: "",
    paypalUrl: ""
  },

  // Contact form: create a free form at https://formspree.io and paste the endpoint here.
  // Without it (and without an email above) the form is replaced by call/message buttons.
  formEndpoint: ""
};
