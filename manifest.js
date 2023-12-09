export const manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "EDU ECG",
    short_name: "ECUECG",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    // screenshots: [
    //   {
    //     src: "/screenshots/decker_cards_page.png",
    //     form_factor: "narrow",
    //     sizes: "462x822",
    //     type: "image/png",
    //     label: "cards page",
    //   },
    //   {
    //     src: "/screenshots/fullscreen_card_view.png",
    //     form_factor: "narrow",
    //     sizes: "462x820",
    //     type: "image/png",
    //     label: "fullscreen card view",
    //   },
    //   ,
    //   {
    //     src: "/screenshots/windows_cards_page.png",
    //     form_factor: "wide",
    //     sizes: "1920x933",
    //     type: "image/png",
    //     label: "cards page ",
    //   },
    //   {
    //     src: "/screenshots/windows_full_screen_view.png",
    //     form_factor: "wide",
    //     sizes: "1920x936",
    //     type: "image/png",
    //     label: "fullscreen card view",
    //   },
    // ],
  },
};
