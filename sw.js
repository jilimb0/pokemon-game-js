const CACHE = "pokemon-game-v1"

const PRECACHE = [
  "/",
  "/index.html",
  "/main.js",
  "/pokemon.js",
  "/game-logic.js",
  "/pokemons.js",
  "/logs.js",
  "/utils.js",
  "/selection.js",
  "/style.css",
  "/manifest.json",
  "/assets/Pokemon_logo.png",
  "/assets/Parkscene_Background.png",
  "/assets/SkyDay.png",
  "/assets/card.svg",
  "/assets/pockeball.svg",
  "/assets/sprites/pikachu.svg",
  "/assets/sprites/charmander.svg",
  "/assets/sprites/bulbasaur.svg",
  "/assets/sprites/squirtle.svg",
  "/assets/sprites/pidgey.svg",
  "/assets/sprites/mew.svg",
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim())
})

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)))
})
