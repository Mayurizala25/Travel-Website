// Bundled travel guides used as a resilient fallback for the Blog page and
// the home "Recent Stories" section. Live posts from Supabase always take
// precedence — these only render when the request fails or returns nothing,
// so the site never shows visitors a broken/empty state.
//
// Shape matches a `public.blogs` row (the fields the UI reads), so the same
// components and mappers work for both sources.

export const fallbackBlogPosts = [
  {
    id: 'guide-kashmir-best-time',
    title: 'Best Time to Visit Kashmir',
    slug: 'best-time-to-visit-kashmir',
    category: 'Mountains',
    cover_image_url:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
    image_alt_text: 'Shikara boats on Dal Lake, Kashmir',
    excerpt:
      'Gardens in spring, cool escapes in summer, golden chinars in autumn or deep snow in winter — how to pick the season that fits the trip you want.',
    publish_date: '2026-07-28',
    status: 'published',
    content: `Kashmir works almost year round, but each season is a different trip.

March to May is the classic window. The Mughal gardens are in full bloom, Srinagar is mild, and the higher meadows are just opening up. Expect the busiest crowds around the tulip garden in early April.

June to August is the comfortable summer escape while the plains are baking. Days are warm and clear, Gulmarg and Sonamarg are green, and this is the best stretch for gentle treks and long days on the water.

September to November brings the chinar trees turning gold and rust. Mornings get crisp, prices ease, and the light is at its best for photography. Carry warm layers for the evenings.

December to February is snow season. Gulmarg becomes a proper ski destination, Dal Lake can freeze at the edges, and some high roads close. Beautiful, but plan for delays and heated rooms.

Whenever you go, keep a buffer day for weather. Mountain excursions like Gulmarg and Sonamarg are the first things to be rescheduled when conditions change.`,
  },
  {
    id: 'guide-manali-first-timer',
    title: "A First-Timer's Guide to Manali",
    slug: 'first-timers-guide-to-manali',
    category: 'Mountains',
    cover_image_url:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
    image_alt_text: 'Snow-capped peaks above the Manali valley',
    excerpt:
      'Where to stay, how many days you need and which day trips are worth it for a first visit to the Kullu valley.',
    publish_date: '2026-06-15',
    status: 'published',
    content: `Manali is easy to reach and easy to enjoy, which is exactly why a little planning goes a long way.

Give it four nights if you can. One to arrive and slow down, one for Old Manali and the riverside walks, one for Solang Valley, and one for a longer drive up the valley toward the Atal Tunnel and Sissu.

Stay in Old Manali or Vashisht for cafes, greenery and quiet, or on Mall Road if you want to be in the middle of everything. The area around Prini and Shuru is calmer again and still close.

Solang Valley is the standard adventure stop — paragliding, a ropeway and snow points higher up. Go early to beat both the crowds and the afternoon clouds.

Roads beyond Manali are weather dependent. If snow closes the higher routes, the lower valley, Naggar Castle and the Great Himalayan National Park gate near Sainj are good alternatives.

Altitude is mild here, but the drive up is long. Keep your first evening light and drink plenty of water.`,
  },
  {
    id: 'guide-ladakh-planning',
    title: 'Planning a Trip to Ladakh: Roads, Permits and Altitude',
    slug: 'planning-a-trip-to-ladakh',
    category: 'Mountains',
    cover_image_url:
      'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1600&q=85',
    image_alt_text: 'Still blue water at Pangong Lake, Ladakh',
    excerpt:
      'Ladakh rewards slow, well-sequenced planning. Here is how to think about acclimatisation, permits and the drive-versus-fly decision.',
    publish_date: '2026-05-09',
    status: 'published',
    content: `Ladakh is a high-altitude desert, and the single biggest factor in a good trip is giving your body time to adjust.

Fly into Leh and do almost nothing for the first two days. No Khardung La, no Pangong, no overnight trips. Short walks around Leh, the palace, and an early night. Most altitude problems come from moving too fast, too soon.

Build the itinerary outward in rings. Leh and the nearby monasteries first, then Nubra Valley, then Pangong, returning to lower elevation to sleep whenever possible.

Inner Line Permits are required for Nubra, Pangong, Tso Moriri and the Dahanu villages. Indian travellers apply online or through an agent in Leh; foreign nationals need a Protected Area Permit. Carry several photocopies — they are collected at checkposts.

The roads are the attraction and the challenge. Passes can close briefly after snow even in summer, fuel stops are far apart, and mobile coverage is patchy. Only postpaid Indian SIMs work, and only intermittently.

May to September is the reliable season. Carry cash, sunscreen, a warm layer for every day, and any regular medication in your hand luggage.`,
  },
  {
    id: 'guide-rajasthan-where-to-go',
    title: 'Where to Go in Rajasthan: Forts, Cities and Desert',
    slug: 'where-to-go-in-rajasthan',
    category: 'Culture',
    cover_image_url:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=85',
    image_alt_text: 'Palace architecture reflected in a lake in Rajasthan',
    excerpt:
      'Jaipur, Jodhpur, Udaipur and Jaisalmer each have a distinct character. A simple way to plan a route that is not exhausting.',
    publish_date: '2026-04-02',
    status: 'published',
    content: `Rajasthan is large, and the classic mistake is trying to see all of it in a week.

Pick a shape. The northern loop is Jaipur, Jodhpur and Jaisalmer — forts, blue lanes and the desert. The southern option pairs Udaipur with Bundi or Chittorgarh for lakes, palaces and quieter towns. Most first trips do Jaipur, then choose one direction.

Jaipur is the arrival city: Amber Fort, the old pink bazaars and a day to adjust. Give Jodhpur two nights so Mehrangarh gets a proper morning. Jaisalmer is worth the long drive for the living fort and one night near the dunes, not in a large tented camp but a smaller one further out.

Udaipur is the place to slow down — lake views, a walkable old city and easy day trips to Kumbhalgarh and the Ranakpur temples.

October to March is the comfortable season. Book heritage stays early, keep modest clothing for temples, and expect distances to take longer than the map suggests.`,
  },
  {
    id: 'guide-kerala-houseboat',
    title: 'Kerala Backwaters: How to Choose Your Houseboat',
    slug: 'kerala-backwaters-houseboat-guide',
    category: 'Coast & Backwaters',
    cover_image_url:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
    image_alt_text: 'A houseboat moving through the palm-lined Kerala backwaters',
    excerpt:
      'One night or two, Alleppey or Kumarakom, private cruise or moored stay — the small decisions that make the backwaters memorable.',
    publish_date: '2026-02-20',
    status: 'published',
    content: `A backwater cruise is the centrepiece of most Kerala trips, and a few choices shape how it feels.

One night is enough for a first taste. Two nights suit travellers who want to reach the wider lakes and quieter canals rather than the busy Alleppey stretch.

Alleppey has the most boats and the liveliest waterways. Kumarakom is calmer and better for birdlife. Departing in the early afternoon means you cruise through the golden evening light and wake up moored somewhere peaceful.

Most boats stop cruising by sunset for safety and moor for the night, so do not expect to be moving at midnight. Air-conditioning usually runs only for set hours on generator power — ask before booking if that matters to you.

Meals are cooked fresh on board and are a highlight. Mention dietary needs in advance.

Pair the cruise with a night or two in Fort Kochi beforehand and the Munnar tea country afterward for a well-rounded week.`,
  },
  {
    id: 'guide-himalaya-packing',
    title: 'What to Pack for a Himalayan Trip',
    slug: 'what-to-pack-for-a-himalayan-trip',
    category: 'Trip Planning',
    cover_image_url:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85',
    image_alt_text: 'A traveller looking out over a wide Himalayan valley',
    excerpt:
      'A practical layering-first packing list for Kashmir, Manali, Ladakh and other mountain trips, whatever the season.',
    publish_date: '2026-01-12',
    status: 'published',
    content: `Mountain weather changes through the day, so pack to layer rather than for a single temperature.

Base layers: two or three quick-dry tops and one pair of thermal bottoms. Avoid cotton for anything active — it stays wet and cold.

Mid layer: a fleece or light down jacket that packs small. This is the piece you will use most on cool evenings.

Outer layer: a windproof and water-resistant shell. Even in clear seasons, passes and early mornings are cold and breezy.

Legs and feet: comfortable trekking trousers, warm socks, and broken-in walking shoes with grip. Sandals for the evening.

Sun and cold: sunglasses, a high-SPF sunscreen, lip balm, a warm hat and a sun hat. High-altitude sun is stronger than it feels.

Health: any regular medication in your hand luggage, a basic first-aid kit, rehydration salts, and a reusable water bottle. If you are heading above 3,000 m, speak to a doctor about altitude medication before you travel.

Documents: printed copies of IDs and permits, kept separate from the originals.`,
  },
]
