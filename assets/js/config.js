/* ==========================================================================
   SITE CONFIG — edit this one file to update church details everywhere.
   Anything marked TODO is a placeholder: replace it with your real details.
   ========================================================================== */
window.SITE = {
  name: "Freedom Worship Center",
  city: "Würzburg",
  shortName: "FWC Würzburg",

  // Address — TODO: replace with your real address
  street: "Musterstraße 1",          // TODO
  zip: "97070",                      // TODO
  town: "Würzburg",
  // Google Maps search used for the map + "directions" links
  mapsQuery: "Freedom Worship Center Würzburg",

  email: "info@freedomworshipcenterwue.de", // TODO: confirm
  phone: "+49 931 000000",                  // TODO

  // Weekly gatherings — TODO: confirm days and times
  services: [
    { day: { de: "Sonntag", en: "Sunday" }, time: "10:30", title: { de: "Gottesdienst", en: "Sunday Service" }, note: { de: "Lobpreis, Predigt & Kinderprogramm", en: "Worship, message & kids program" } },
    { day: { de: "Mittwoch", en: "Wednesday" }, time: "19:00", title: { de: "Gebetsabend", en: "Prayer Night" }, note: { de: "Gemeinsam beten und Gott suchen", en: "Praying and seeking God together" } },
    { day: { de: "Freitag", en: "Friday" }, time: "19:00", title: { de: "Jugend", en: "Youth" }, note: { de: "Für junge Leute von 13–25", en: "For young people aged 13–25" } }
  ],
  // Used for the "next service" countdown in the hero (0 = Sunday ... 6 = Saturday)
  mainService: { weekday: 0, hour: 10, minute: 30, durationMin: 120 },

  // YouTube: paste your channel ID (starts with "UC...") to embed the latest livestream/uploads.
  youtubeChannelId: "",                       // TODO
  youtubeUrl: "https://www.youtube.com/",     // TODO
  instagramUrl: "https://www.instagram.com/", // TODO
  facebookUrl: "https://www.facebook.com/",   // TODO

  // Giving — TODO: replace with the real bank details / PayPal link
  give: {
    accountHolder: "Freedom Worship Center Würzburg e.V.", // TODO
    iban: "DE00 0000 0000 0000 0000 00",                   // TODO
    bic: "XXXXDEXXXXX",                                    // TODO
    bank: "Bankname",                                      // TODO
    paypalUrl: ""                                          // TODO (optional)
  },

  // Contact form: create a free form at https://formspree.io and paste the endpoint here.
  // While empty, the form opens the visitor's email program instead.
  formEndpoint: ""
};
