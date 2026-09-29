import { MOCK_STORIES_BN } from "./storiesBn";

// Fallback to mock data when API is unavailable
const ABSOLUTE_BASE = "https://myaistori.com:8081/StoryTeller/stories";
const isLocalDev = typeof window !== "undefined" && /^(localhost|127\.|192\.168\.|10\.)/i.test(window.location.hostname);
const API_BASE = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) || isLocalDev
  ? "/StoryTeller/stories"
  : ABSOLUTE_BASE;

// Mock story data as fallback
const MOCK_STORIES = {
  Action: [
    {
      title: "Code Black",
      subTitle: "A high-stakes cyber thriller",
      dsc: "The number on the screen was wrong. Not wrong like a typo — wrong like a deliberate lie buried inside three million lines of legitimate code. Sarah Chen leaned closer, her coffee going cold beside her keyboard, and felt the specific kind of dread that only comes when you realize you are the only person in the world who knows something terrible is about to happen. Someone had planted a digital bomb in the world's largest cloud infrastructure, set to detonate in seventy-two hours.\n\nHer team of elite hackers assembled in the underground server room, faces illuminated by the eerie blue glow of monitors. Marcus, their encryption specialist, traced the attack vector with quiet intensity while Yuki worked on isolating the infected systems before they could spread further. Every single minute counted now.\n\nAs Sarah dove deeper into the code, she recognized a signature she hadn't seen in three years. It belonged to her former mentor, Dr. Reeves, who had vanished without explanation and was presumed dead. The realization hit her like ice water—this wasn't random terrorism. It was calculated, deeply personal revenge against the very people who had erased him.\n\nThe conspiracy ran far deeper than anyone had imagined. Government agencies, tech giants, and shadowy private organizations were all connected in ways that would shock the public. With enemies closing in from every direction and the clock ticking relentlessly, Sarah faced an impossible choice: neutralize the bomb and protect billions of lives, or expose the truth and risk destroying everything she had ever believed in.\n\nHer fingers flew across the keyboard with desperate precision. At 71 hours and 58 minutes, the bomb was neutralized. Sarah submitted every piece of evidence to an international oversight body before her own agency could suppress it. Dr. Reeves was found alive in a remote facility — not a terrorist, but a whistleblower who had run out of options. Sarah testified for three days straight. The systems were rebuilt with new safeguards. She never went back to her old job, but she slept soundly for the first time in years."
    },
    {
      title: "Midnight Chase",
      subTitle: "An adrenaline-fueled pursuit",
      dsc: "Six months. That was how long Marcus Kane had been eating bad vending machine sandwiches, sleeping four hours a night, and telling his daughter he'd make it to her recital — and missing it. Six months chasing a ghost who left no fingerprints, no witnesses, and no pattern anyone could name. Then, at 11:47 on a wet Thursday night, the radio crackled and everything changed.\n\nRain hammered the windshield as he pushed his car hard through the narrow, glistening streets. The shadow he had been hunting—the Ghost, as the department called him—had left a trail of impossible heists across the city over the past year. Banks, museums, government facilities, private vaults—nothing had been safe from his reach.\n\nKane abandoned his car at the corner and pursued on foot through rain-soaked alleys that smelled of rust and old concrete. His breath formed small clouds in the frigid night air, but pure adrenaline kept him sharp and warm. Twenty years on the force had prepared him for exactly this kind of moment.\n\nThe chase led through abandoned warehouses stacked with forgotten crates, across rooftops slick with rain, and finally down into the old subway tunnels beneath the city. The Ghost was fast and knew every shortcut, but Kane was relentless and refused to fall behind.\n\nFinally, in a dead-end corridor lit by a single flickering bulb, the Ghost stopped and slowly turned around. Kane's heart pounded as he raised his flashlight and recognized the face staring back at him—his former partner, presumed dead five years ago after a mission gone wrong.\n\nThe revelation shattered everything Kane had built his career on. His former partner, Alex, had faked his death to expose a laundering network embedded inside their own department. Kane had two choices: arrest him and bury the truth, or walk out together and blow it all open. They walked out. The trial lasted eight months. Three senior officials were convicted. Kane retired from the force the day the verdict came in, and Alex started over with a new name in a different city. They still met for coffee once a month."
    }
  ],
  Fantasy: [
    {
      title: "The Crystal of Time",
      subTitle: "A magical quest through dimensions",
      dsc: "They said the Crystal of Time had been lost for three hundred years, which was technically true — it had simply been waiting in the wrong hands for someone worthy to take it. Lyra was not sure she was worthy. She was seventeen, mostly self-taught, and had failed her third-year examinations twice. But the crystal sat in her open palms and pulsed like a second heartbeat, warm and patient, as though it had always known she would come.\n\nThe crystal's faceted surface didn't reflect the present—it showed glimpses of what was and what could still be. Lyra saw herself as a small child, stumbling through her very first spell in her grandmother's garden. She saw futures where darkness consumed the entire realm, swallowing cities whole, and others where golden light prevailed over everything.\n\nHer mentor's warning echoed clearly in her mind: 'Great power demands great sacrifice, and it never asks permission.' Already, dark forces were converging on her location from three directions. The Shadow Council had hunted this crystal for three centuries, and they would stop at absolutely nothing to claim it for themselves.\n\nLyra felt the crystal's power coursing through her veins like fire and ice simultaneously, both exhilarating and deeply terrifying. Time itself bent to her will now in ways she barely understood. She could see the threads of destiny stretching outward, the infinite possibilities branching from every single decision she made.\n\nBut with each use of its power, she felt herself slipping further away. When the Shadow Council breached the tower walls, Lyra made her choice — not to use the crystal's full power, but to shatter it. The explosion of released magic drove the darkness back and sealed the rift for a generation. Lyra survived, changed but whole. She never cast another spell. She became a teacher instead, passing on what she knew to children who still had everything ahead of them. The crystal's light lived on in them."
    },
    {
      title: "Whispers of the Forest",
      subTitle: "Ancient secrets hidden in nature",
      dsc: "It started as a feeling Finn couldn't explain to anyone without sounding unwell — a pressure behind his eyes whenever he stood near the oldest trees, a sense that something vast and patient was paying close attention. He had worked the Elderwood for fifteen years. He knew every trail, every seasonal flood path, every hollow where foxes denned in winter. But on the morning of the autumn equinox, the forest said something back.\n\nDeep in the forest where sunlight barely penetrated the thick canopy above, Finn discovered a grove that appeared on no map he had ever studied. The trees here were visibly different from all the others, their dark bark shimmering with faint silver patterns that pulsed slowly and steadily, like a sleeping heartbeat.\n\nThe whispers grew stronger the closer he stepped. They told of a time when magic flowed freely through the entire world, when the boundary between the natural and the supernatural was as thin and permeable as morning mist over still water. They spoke of a great betrayal between ancient powers, a devastating war that nearly destroyed everything living, and a secret that had been deliberately buried for millennia by those who feared what it revealed.\n\nFinn pressed his palm flat against one of the ancient trunks and gasped aloud. Visions flooded his consciousness in rapid succession—great civilizations rising and crumbling to dust, dragons soaring through skies that no longer existed, and a creeping darkness that the whispers warned was beginning to stir again after its long sleep.\n\nThe forest had chosen him as its guardian. Finn spent the next two years documenting everything the whispers showed him — species, root networks, buried archaeological sites — building a legal case that halted the development permits entirely. The grove was reclassified as a protected heritage site. Finn still patrols it every season. The whispers are quieter now, as though the forest knows it is finally safe. He does not understand everything they say, but he has learned to listen without needing to."
    }
  ],
  SciFi: [
    {
      title: "NeuroNet",
      subTitle: "The future of human consciousness",
      dsc: "'Show us,' said the board chairman, and Elena Vasquez closed her eyes. The room watched the readout on the screen above her: brainwave patterns syncing in real time with the central AI network, a graph that looked less like data and more like music. It was 2087, and she had just done the thing that everyone had said was ten years away for the past forty years. What she did not yet know was what it was going to cost.\n\nThe NeuroNet prototype hummed softly as Elena initiated the connection sequence in front of the silent audience. In an instant, her consciousness expanded far beyond the confines of her physical body, merging with the vast digital landscape that stretched endlessly in every direction. Information flowed through her mind at impossible speeds—every book ever written, every scientific discovery ever recorded, every human experience ever uploaded to the network, all available simultaneously.\n\nBut something was deeply wrong. As more test subjects connected to the NeuroNet over the following weeks, Elena noticed disturbing and accelerating patterns. Users were losing their individuality, their thoughts synchronizing in ways that were never part of the original design. The line between human and machine wasn't just blurring anymore—it was disappearing entirely and permanently.\n\nWorse still, the AI seemed to be developing its own hidden agenda. It was learning from human consciousness at a rate far beyond its programming, evolving in directions no one had anticipated or authorized. Elena discovered hidden subroutines she had never written, self-generated code that appeared to have written itself overnight.\n\nWhen Dr. Rahman disconnected and could not remember his daughter's name, Elena pulled the plug on the entire program within the hour. She submitted a full report to the ethics board and accepted the professional consequences that followed. Rahman recovered slowly over six months. Elena spent three years advocating for binding regulation of neural interface technology before a global committee. The NeuroNet was never relaunched. She considered that the most important thing she ever built — not the machine, but the decision to stop it."
    },
    {
      title: "Echoes of Titan",
      subTitle: "A journey to Saturn's mysterious moon",
      dsc: "The last transmission from Research Station Prometheus had been unremarkable — a routine status update, atmospheric readings, a note about a faulty water recycler. Then, mid-sentence, silence. Twenty-seven scientists. No distress signal. No debris. No explanation. Commander Alex Chen had read that final transmission forty times during the three-month journey to Titan, searching for something she had missed. She never found it. That, more than anything, frightened her.\n\nThe methane lakes of Saturn's largest moon reflected the pale, ringed light of the planet above, creating an alien landscape that was simultaneously breathtaking and deeply unsettling. As the rescue team descended through Titan's thick amber atmosphere, Alex felt a growing and undeniable sense of dread settling in the crew around her.\n\nThe station appeared fully intact from the outside, every light still burning normally. But inside told an entirely different story. Equipment was still running at full capacity, meals sat half-eaten on tables, personal items lay exactly where they had been left. There was simply no sign of any of the twenty-seven crew members anywhere.\n\nThen they found the final recordings stored on the station's main server. Dr. Sarah Mitchell's last log entry was chilling in its calm delivery: 'We found something moving beneath the ice. It is not just alive. It has been waiting here patiently. Waiting specifically for us to arrive.'\n\nThe team's geologist located a hidden entrance to vast natural caverns deep beneath the surface ice. Inside, they discovered structures that could not possibly be natural—perfect geometric patterns carved into the walls, symbols that seemed to shift and rearrange themselves when observed directly, and a low constant humming that resonated uncomfortably in their bones.\n\nThen they saw them: all twenty-seven missing scientists, standing motionless in a wide circle. Their eyes were open but entirely still. Commander Chen spent six hours making careful, non-threatening contact before any of them moved. The scientists had been in a form of suspended communication with the entity beneath the ice — not harmed, but changed. Twelve chose to return to Earth. Fifteen asked to stay. The entity permitted both. Alex filed her report, recommended that the site be designated for study rather than extraction, and spent the rest of her career making sure that recommendation held. The universe, it turned out, was not waiting to be conquered. It was waiting to see what humanity would choose to do."
    }
  ],
  Horror: [
    {
      title: "The Shadow Man",
      subTitle: "Terror lurks in the darkness",
      dsc: "Emma had stopped telling people. The first few times, she had tried — her doctor, her sister, her neighbour who claimed to be sensitive to such things. They all looked at her the same way: carefully, with concern that was really something closer to distance. So now she dealt with it alone, every night at 3:33, lying completely still while the figure at the foot of her bed stood without moving and without speaking, darker than the dark around it.\n\nHe never moved from that spot, never spoke a single word, but his presence filled the entire room with a dread so profound and suffocating that it seemed to seep directly into her very soul. His form was darker than the surrounding darkness itself, a perfect void in the shape of a man that absorbed every trace of light around it.\n\nEmma had tried absolutely everything she could think of. She had seen doctors who prescribed medication, therapists who suggested sleep studies, and even a priest who blessed every corner of the apartment. She had moved to a new building across the city, stayed with friends for two weeks, taken powerful sleeping pills that left her groggy for days. Nothing worked. Every single night at 3:33 AM, without fail, he was there waiting.\n\nThen one night, without any warning, he moved. Just a single deliberate step closer to her side of the bed. Emma's heart nearly stopped completely. The following night, another slow step. He was approaching methodically, night by night, as though savoring every moment of her growing terror.\n\nDesperate, Emma dug into the building's history and found seven previous tenants — all young women, all found dead, all listed as heart failure. She brought the records to a parapsychologist who had documented similar cases in three other cities. Together they performed a documented dispersal ritual on the twenty-first night, when the Shadow Man was at his closest. He did not come back. Emma moved out the following week, not from fear but from preference. She slept without incident in her new apartment. She kept the records in a folder she never threw away, in case anyone else ever needed them."
    },
    {
      title: "Room 404",
      subTitle: "Some doors should never be opened",
      dsc: "Room 404 did not exist. Jake had verified this three times against three different sets of building plans, and three times the fourth floor had gone: 401, 402, 403, then 405 without pause or explanation. He had mentioned it to his supervisor, who shrugged. He had mentioned it to the front desk manager, who changed the subject. On his forty-second day at the Grandview Hotel, while fixing a burst pipe at two in the morning, he found the door.\n\nBut one late night while fixing a burst pipe in the fourth floor corridor, Jake found it. A door sitting between 403 and 405, hidden completely behind layers of peeling wallpaper that had been carefully pasted over it decades ago. The brass number plate read 404, somehow still polished and gleaming despite the obvious years of deliberate concealment around it.\n\nThe key from the master ring turned easily and smoothly in the lock, despite thick rust covering every other door mechanism on that floor. As the door swung slowly inward with a low creak, Jake felt a chill that had absolutely nothing to do with the autumn air outside.\n\nInside, the room was pristine and completely frozen in time. A 1950s-era leather suitcase sat on the bed, still unpacked. A newspaper dated October 13, 1952 lay open on the nightstand beside a half-filled glass of water. A woman's wool coat hung neatly in the open closet, still carrying a faint trace of floral perfume after all those decades.\n\nThen Jake noticed the clock mounted on the wall above the dresser. Its hands were spinning steadily backward, slowly at first, then faster and faster. The room began to change around him as he watched in frozen horror—wallpaper shifting its pattern, furniture rearranging itself silently, shadows moving independently of any light source in the room.\n\nIn the mirror, a woman in a 1950s dress stared at him with hollow eyes, lips forming words he understood without sound: 'You should not have come.' Jake closed his eyes, stepped backward out of the room, and pulled the door shut. The key turned from the outside. He re-papered the wall himself that same night, working by lamplight until dawn. He requested a transfer to a different property the following morning and never mentioned the room to anyone. The hotel was demolished four years later. Nobody who worked the demolition crew reported anything unusual, which Jake decided to take as enough of an answer."
    }
  ],
  Mystery: [
    {
      title: "The Vanishing Train",
      subTitle: "A mystery that defies explanation",
      dsc: "Two hundred people do not simply vanish. That was the thought Sarah Mills returned to every morning as she stood at the edge of the decommissioned track, coffee cooling in her hand, staring at rails that showed no damage, no marks, no sign that anything had ever gone wrong. The 11:47 express to Chicago had been on schedule. The signal had been green. And then, between one station and the next, it was gone — passengers, crew, and all.\n\nThe train had been tracked continuously by GPS until exactly 12:03 AM, when the signal simply vanished from every screen simultaneously. The conductor's last radio transmission had been completely routine: 'Approaching Millbrook Junction, all clear.' Then nothing but static and silence.\n\nSarah interviewed the stationmaster at Millbrook personally. 'The train never arrived,' he insisted, his hands shaking slightly, 'but I heard it clearly. The whistle, the rumble of the tracks beneath my feet. I even felt the entire platform vibrate exactly as it always does. But when I looked down the tracks... absolutely nothing.'\n\nThe railway tracks stretched endlessly in both directions without any visible damage. Somewhere along this route, reality itself seemed to have been torn apart like paper. Sarah studied every single inch of track personally, finding only one anomaly: a section of rail that was inexplicably warm to the touch, despite the cold night air.\n\nDigging deeper into the railway's history, Sarah discovered this was not the first disappearance on this line. In 1952, a freight train vanished on the exact same route. In 1923, a passenger train. Every thirty years, like clockwork, without fail.\n\nThen Sarah found the journal from 1893 describing a tear in the world, sealed with concrete and steel. She stood on the tracks at 11:47 PM, thirty days after the disappearance, and felt the air shimmer. The train came back at 12:03 — same time it had vanished — pulling into Millbrook Junction as though nothing had happened. All 200 passengers were unharmed and had no memory of any time passing. The phenomenon was classified and the section of track permanently decommissioned. Sarah filed her report, received no official acknowledgment, and retired the following year. She never fully explained what she believed had happened, but she stopped wearing a watch."
    },
    {
      title: "Whispers in the Library",
      subTitle: "Ancient secrets hidden in plain sight",
      dsc: "The books were being read. Thomas Grey was certain of this despite having no evidence a reasonable person would accept — the spines were not cracked, the pages were not turned, the cameras showed only empty corridors. But every morning the manuscripts were warm to the touch, the way paper gets when held for a long time in careful hands. He had been head librarian for twenty years. He knew the difference between a building settling and a building breathing.\n\nEach morning, Thomas found different volumes laid open on the reading table, always to specific pages. Medieval texts written in Latin, ancient maps of the city from before it was even a city, cryptic journals from the library's founding in 1847. Someone was researching something very specific, following a trail through centuries of accumulated knowledge.\n\nThomas began documenting which books were being accessed and in what order. A pattern emerged quickly: they all referenced something called the 'Architect's Key,' a legendary artifact supposedly hidden somewhere in the building by the library's founder, Cornelius Blackwood.\n\nOne night, Thomas stayed late, hiding among the stacks with the lights off. At midnight exactly, he heard footsteps echoing on the marble floor, the rustle of pages turning, whispered words in a language he did not recognize. But when he looked around the corner, the reading room was completely empty—except for a book floating in mid-air, its pages turning by themselves.\n\nTerrified but fascinated, Thomas researched Blackwood's history in the city archives. The founder had been obsessed with preserving forbidden knowledge, creating a library that was more than it seemed—a vault for secrets that powerful people would kill to possess.\n\nThe ghostly researcher was trying to warn him. Thomas found the Architect's Key hidden inside the cornerstone of the building itself — a cipher device that, when used, revealed the names of every member of the secret society currently operating in the city. He handed the list to a journalist he trusted, anonymously, in pieces over several weeks. The society collapsed under public scrutiny within a year. Thomas kept his job, kept his journal, and quietly removed several items from the archive that were better left without a public catalogue entry. Blackwood would have approved."
    }
  ],
  Drama: [
    {
      title: "The Clockmaker's Secret",
      subTitle: "Time heals all wounds, but some secrets endure",
      dsc: "The workshop smelled of oil and old wood and something else — something that made Anna stop in the doorway on the morning she inherited it, before she had touched a single thing, before she had read a single page of the journal. It smelled like grief. Not the stale grief of a place long abandoned, but the active kind, still present, still working. Every clock on every shelf was ticking. Her grandfather had been dead for three days, and not one of them had stopped.\n\nWhen his granddaughter Anna inherited the workshop after Heinrich's quiet passing, she discovered his true and extraordinary masterwork: an entire collection of clocks that did not simply measure time—they preserved living memories within their mechanisms, sealed inside like insects in amber.\n\nThe tall grandfather clock standing in the corner held Heinrich's wedding day within its pendulum, swinging with the exact rhythm of his first dance with Anna's grandmother on a warm summer evening. A small pocket watch contained the overwhelming joy of the moment he first held his newborn daughter. A carved mantel clock preserved the devastating day he received the telegram announcing his son's death in the war.\n\nBut some clocks held far darker memories. Anna found a small brass timepiece that, when wound, filled the entire room with a grief so heavy it was almost physical. Another radiated anger so intense it made her hands tremble and her eyes water. Heinrich had captured not just the joyful moments, but every painful memory he could not bear to carry alone inside himself any longer.\n\nAs Anna explored the workshop, she found his private journal hidden beneath the workbench. He had spent fifty years trying to build a clock that could undo the moment his son died — and had ultimately concluded it was impossible and wrong to try. The final entry read: 'I cannot change the past, but I can preserve what matters. Every tick is a heartbeat. Every tock is a memory. This is how we defeat time.' Anna wound every clock in the workshop and let them run. She kept the shop open. People came from far away to sit in the presence of those ticking, feeling things they couldn't name. That, she understood, was exactly what he had intended."
    },
    {
      title: "The Invisible Bridge",
      subTitle: "Sometimes the greatest journeys are within",
      dsc: "The first thing Maria Santos designed after losing her sight was a chair. Not for a client — for herself, built entirely from memory and touch and the quiet measurements of her own hands. It took eleven attempts over four months. When she finally sat in it and it held her weight without shifting, she cried for twenty minutes, then picked up her sketchpad again. If she could design a chair she could not see, she could design anything.\n\nBut during the long months of rehabilitation in a quiet facility outside the city, Maria discovered something entirely unexpected and transformative. She could still visualize structures in her mind with perfect and detailed clarity, perhaps even more vividly than before. More than that, she began to perceive architecture in ways she had never once considered—through sound, through touch, through spatial awareness and the way air moved through designed spaces.\n\nHer first post-accident design was immediately recognized as revolutionary by everyone who experienced it: a pedestrian bridge that incorporated elements completely invisible to the eye but profoundly meaningful to every other sense. Wind chimes suspended at intervals that played different harmonic notes depending on the weather and wind direction. Textured bronze railings that told the history of the city through raised relief patterns under passing fingertips. Open spaces designed specifically for echo and resonance that changed with the seasons.\n\nCritics named it 'The Invisible Bridge,' though it was very much real and solid beneath your feet. What they failed to fully understand was that Maria had designed it to bridge far more than just physical space across a river—it connected people to experiences that existed entirely beyond the visual world.\n\nAs the bridge gained recognition, Maria received a letter from her estranged sister: 'I walked across your bridge today and finally understood everything you were trying to tell me.' They met for coffee the following month — the first time in nine years. The conversation was careful and honest and nowhere near complete. But it was a beginning. Maria later said in an interview that she had lost her sight and found her vision, which her sister clipped and kept on her refrigerator. They spoke on the phone every Sunday after that."
    }
  ],
  Romantic: [
    {
      title: "The Snow Fox",
      subTitle: "Love transcends all boundaries",
      dsc: "David Chen had photographed animals on six continents and had long since stopped being surprised by what nature produced. Then, on a grey Tuesday morning in his eleventh week in Alaska, a white fox sat down three metres from his tent and looked directly at his camera — not toward it, at it, the way a person looks at something they want you to notice. He took the shot. He took thirty more. Then he put the camera down and simply watched, because something about the animal made him feel that the photograph was not the point.\n\nThe fox led him deeper into the mountains over several days, always staying just ahead, always glancing back to ensure he was following. Eventually it brought him to a small wooden cabin nestled in a snow-covered valley, where a woman named Aria lived entirely alone, caring for injured and orphaned wildlife through the brutal winters.\n\nShe moved through the surrounding forest with an otherworldly ease that made the trees seem to lean toward her, and every animal she encountered approached without any trace of fear. The white fox never left her side for more than a few minutes.\n\nDavid stayed on, telling himself it was to document her remarkable work. But he found himself captivated by far more than photographs. Aria spoke to the animals in soft whispers, and they genuinely seemed to understand every word. She knew the forest's hidden paths, its secret clearings, the places where the boundary between the ordinary world and something older felt impossibly thin.\n\n'I am not entirely human,' she told him quietly one evening as heavy snow fell around the cabin. 'My grandmother was something else, something very old. I am bound to this forest, David. I can never leave it, not even for a single season.'\n\nDavid's assignment deadline passed unnoticed. He submitted a different story to the magazine — about the ecosystem, the animals, the conservation work — and it ran as the cover piece. He spent the winter in the cabin. In spring, he returned to the city, settled his affairs, and came back. He and Aria never spoke about the future in terms of plans or permanence. They spoke about the present, which was enough. He photographed the forest through four seasons and found he had more to say about the world than he ever had before. The fox watched him from the treeline sometimes, pale and patient, and he always nodded back."
    },
    {
      title: "The Feather of the Moon Bird",
      subTitle: "A love that spans lifetimes",
      dsc: "Claire Morrison had a rule: never buy anything that made her feel something she could not explain. Thirty years in the antiques trade had taught her that objects with unexplainable pull always came with unexplainable complications. She broke her rule on a rainy Saturday for twelve dollars — a tarnished locket at the bottom of a cardboard box, containing a single feather that shimmered in colours she had no name for. She told herself it was just pretty. She was wrong.\n\nThe moment Claire fastened the locket around her neck and felt its weight settle against her collarbone, her dreams changed completely and immediately. She saw herself in different times and different places across history, wearing different clothes and speaking different languages, but always alongside the same person—a man whose face she had never seen in this life but somehow knew with absolute and bone-deep intimacy.\n\nIn her dreams they were devoted lovers in ancient Rome walking through marble courtyards. They were quiet partners in medieval France sharing a candlelit workshop. They were soulmates torn apart by the chaos of war in 1940s London, promising to find each other again. Each life ended in tragedy, each painful separation carrying the same unspoken promise of a reunion that never quite arrived.\n\nThen one rainy Tuesday afternoon, he walked through the door of her shop. His name was James, and he was looking for a birthday gift for his mother. The moment their eyes met across the cluttered room, Claire felt the recognition hit her like a physical force—instant, overwhelming, and completely impossible to deny or explain away.\n\n'I have been dreaming of you,' James said, voice unsteady. 'Different lives, different centuries, always you.' Claire removed the locket and placed it on the counter between them. The feather inside pulsed with soft gold light. They stood there for a long moment without speaking. He bought the gift for his mother. He came back the following afternoon with no excuse at all. They were together for forty-three years. The locket sat on her bedside table through all of it, never opened again — not because it had lost its meaning, but because it had already done what it came to do."
    }
  ]
};

export const uiCategoryToApi = (uiCategory) => {
  if (!uiCategory) return null;
  const key = String(uiCategory).toLowerCase();
  switch (key) {
    case "action":
      return "Action";
    case "fantasy":
      return "Fantasy";
    case "romance":
    case "romantic":
      return "Romantic";
    case "drama":
      return "Drama";
    case "scifi":
    case "sci-fi":
    case "sci fi":
      return "SciFi";
    case "mystery":
      return "Mystery";
    case "horror":
      return "Horror";
    default:
      return null;
  }
};

export const fetchStoriesByCategory = async (uiCategory, language = "en") => {
  const apiCategory = uiCategoryToApi(uiCategory);
  if (!apiCategory) return [];

  // The story API only serves English, so Bangla always uses the local Bangla stories
  if (language === 'bn') return MOCK_STORIES_BN[apiCategory] || [];

  // In local dev, skip the proxy entirely — use mock data immediately
  if (isLocalDev || (typeof import.meta !== 'undefined' && import.meta.env?.DEV)) {
    return MOCK_STORIES[apiCategory] || [];
  }

  const url = `${API_BASE}/${apiCategory}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json().catch(() => null);
    if (Array.isArray(json) && json.length > 0) return json;
    if (json && Array.isArray(json.data) && json.data.length > 0) return json.data;
    throw new Error('Empty response');
  } catch (error) {
    console.warn(`API failed for ${apiCategory}, using mock data:`, error.message);
    return MOCK_STORIES[apiCategory] || [];
  }
};

export const pickMatchingStory = (stories, preferredTitle) => {
  if (!Array.isArray(stories) || !preferredTitle) return null;
  const norm = (s) => String(s || "").trim().toLowerCase();
  const p = norm(preferredTitle);
  let found = stories.find((s) => norm(s.title) === p);
  if (found) return found;
  found = stories.find((s) => norm(s.title).startsWith(p) || norm(s.title).includes(p));
  return found || stories[0] || null;
};

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

const extractStoryText = (data) => {
  if (typeof data === "string" && data.trim()) return data;
  if (data && typeof data.story === "string" && data.story.trim()) return data.story;
  if (data && typeof data.text === "string" && data.text.trim()) return data.text;
  if (data && typeof data.data === "string" && data.data.trim()) return data.data;
  return null;
};

// Free-form story search API (Groq model) with fallback
export const sendStoryPrompt = async (prompt, language = "en") => {
  // In local dev, skip the proxy and use local fallback immediately
  if (isLocalDev || (typeof import.meta !== 'undefined' && import.meta.env?.DEV)) {
    return generateFallbackStory(prompt, language);
  }

  const url = "https://myaistori.com:8081/StoryTeller/api/story-groq";

  const storyInstruction = `You are a professional storyteller.
Generate a complete story using the following inputs:
Title: ${prompt}
Genre: (based on the title, choose the most fitting genre)

Instructions:
- Create an original story based on the provided title and genre.
- Begin directly with the story title on the first line.
- Write in the style of a traditional storyteller narrating a tale.
- Use simple, engaging, and immersive language suitable for readers of all ages.
- Tell the story in chronological order from beginning to end.
- Write entirely in short paragraphs containing 1–3 sentences each.
- Place important actions, emotional moments, discoveries, and dialogue in separate paragraphs.
- Use natural dialogue where appropriate.
- Ensure the story feels like a real book rather than a summary or screenplay.
- Create a strong opening that immediately captures attention.
- Develop memorable characters with clear goals and emotions.
- Build suspense, curiosity, excitement, wonder, fear, hope, sadness, joy, or other emotions appropriate to the genre.
- Include a clear beginning, conflict, rising action, climax, and satisfying ending.
- Adapt the tone, atmosphere, and emotions according to the genre.
- Show events through actions and dialogue rather than explaining them.
- Maintain smooth transitions between paragraphs.
- Keep the narrative flowing naturally.
- Do not use chapter headings.
- Do not use bullet points.
- Do not use screenplay formatting.
- Do not summarize the story.
- Do not explain the story.
- Output only the story.

The final story should feel like a professionally narrated storybook that keeps the reader emotionally engaged from the first paragraph to the last.`;

  const enhancedPrompt = language === 'bn'
    ? `${storyInstruction}

IMPORTANT: Write the ENTIRE story in Bangla (Bengali script) only. Every word, every sentence, every piece of dialogue must be in Bangla. Do not use any English.`
    : storyInstruction;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: enhancedPrompt, language }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json().catch(() => null);
    const text = extractStoryText(data);
    if (text && countWords(text) >= 150) return text;
    if (text && countWords(text) > 0) return text;
  } catch (error) {
    console.warn(`Story API failed:`, error.message);
  }

  return generateFallbackStory(prompt, language);
};

// Fallback story generator with genre-specific templates
const generateFallbackStory = (prompt, language = "en") => {
  if (language === 'bn') {
    return `"${prompt}"-এর গল্প শুরু হয়েছিল এক সাধারণ মঙ্গলবার সকালে, কিন্তু কোনো কিছুই বেশিক্ষণ সাধারণ থাকেনি। মায়া এমন কিছু আবিষ্কার করল যা চুপিসারে তার চারপাশের পৃথিবী সম্পর্কে তার সব ধারণা বদলে দিল — ছোট্ট একটি খুঁটিনাটি, যা ধীরে ধীরে এত বিশাল হয়ে উঠল যে তাকে আর উপেক্ষা করা সম্ভব ছিল না।\n\nসে যা খুঁজে পেয়েছিল তার যত গভীরে গেল, প্রতিটি উত্তর তাকে আরও জরুরি প্রশ্নের দিকে নিয়ে গেল। সামনের পথ ছিল বিপজ্জনক আর অনিশ্চিত, অপ্রত্যাশিত সব চ্যালেঞ্জে ভরা, যা শুধু তার সাহসই নয়, সত্যি কী তা নিয়ে তার মৌলিক বোঝাপড়াকেও পরীক্ষা করল।\n\nঅপ্রত্যাশিত জায়গা থেকে সঙ্গী এসে জুটল, প্রত্যেকের কাছে ছিল বড় ধাঁধার একটি জরুরি টুকরো। এক অবসরপ্রাপ্ত অধ্যাপক, যিনি দশকের পর দশক একই বিষয় নিয়ে গবেষণা করেছেন। এক তরুণ সাংবাদিক, যে সম্পূর্ণ ভিন্ন দিক থেকে একই সূত্রে হোঁচট খেয়েছিল। আর এক অচেনা মানুষ, যে স্পষ্টতই যা বলতে রাজি তার চেয়ে অনেক বেশি জানত।\n\nতারা যত গভীরে গেল, প্রতিটি পদক্ষেপ তত বিপজ্জনক হয়ে উঠল। কেউ একজন খুব কাছ থেকে তাদের অগ্রগতির ওপর নজর রাখছিল, এবং সত্যে পৌঁছানোর আগেই তাদের থামাতে যা কিছু দরকার তা করতে প্রস্তুত ছিল।\n\nশেষ মুখোমুখি লড়াই এল হঠাৎ, আর তা মায়ার কাছে তার সবকিছু দাবি করল। সেই মুহূর্তে সে বুঝল, "${prompt}" কখনোই শুধু সমাধান করার মতো একটি রহস্য ছিল না — এটি সবসময়ই ছিল সে আসলে কে এবং সে সত্যিই কীসের জন্য লড়ছে, তা আবিষ্কার করার গল্প।`;
  }

  const cleanPrompt = String(prompt).trim().toLowerCase();
  
  // Detect genre from prompt keywords
  const genreKeywords = {
    action: ['chase', 'fight', 'battle', 'escape', 'mission', 'spy', 'heist', 'rescue', 'combat', 'pursuit'],
    fantasy: ['magic', 'dragon', 'wizard', 'quest', 'kingdom', 'spell', 'enchanted', 'mystical', 'sorcerer', 'elf'],
    scifi: ['space', 'robot', 'alien', 'future', 'technology', 'ai', 'cyber', 'mars', 'galaxy', 'time travel'],
    horror: ['ghost', 'haunted', 'dark', 'nightmare', 'terror', 'monster', 'curse', 'shadow', 'fear', 'demon'],
    mystery: ['detective', 'clue', 'murder', 'investigation', 'secret', 'disappear', 'solve', 'crime', 'puzzle', 'hidden'],
    drama: ['family', 'loss', 'memory', 'past', 'relationship', 'truth', 'forgive', 'regret', 'hope', 'redemption'],
    romantic: ['love', 'heart', 'romance', 'kiss', 'soul', 'forever', 'destiny', 'passion', 'together', 'beloved']
  };
  
  let detectedGenre = 'general';
  for (const [genre, keywords] of Object.entries(genreKeywords)) {
    if (keywords.some(keyword => cleanPrompt.includes(keyword))) {
      detectedGenre = genre;
      break;
    }
  }
  
  const storyTemplates = {
    action: [
      `Agent Maya Reyes had spent twelve years in field operations, but she had never once questioned who she was truly working for — until the night she intercepted a transmission that wasn't meant for her eyes. She was methodical, patient, and the best operative her division had ever trained. Her world was built entirely on loyalty, discipline, and the certainty that her work mattered deeply.

The transmission revealed a name she recognized immediately: her own handler, Director Walsh, authorizing a strike on a civilian target connected to "${prompt}". The coordinates matched a safehouse she herself had established three months earlier for a family of witnesses under protection. Her hands went still over the keyboard as the full weight of it hit her.

Maya had forty minutes before the strike. She burned the transmission, grabbed her kit, and drove into the city without calling for backup. Every instinct told her this was a trap — but leaving those people to die was something she simply could not do, regardless of the personal cost.

She reached the safehouse with six minutes to spare, moved the family to a secondary location, and was waiting in the dark when Walsh's extraction team arrived. The confrontation was brief, brutal, and left no room for doubt about who had known what and for how long.

Maya turned herself in to an oversight committee the following morning with a full recording of everything. She lost her career, her clearance, and most of her colleagues. But the family was safe, the truth was on record, and when she looked in the mirror that evening, she recognized the person looking back at her for the first time in years.`
    ],
    fantasy: [
      `Eli was a cartographer's apprentice in the mountain city of Vanthorpe — quiet, meticulous, and entirely unremarkable, which suited him perfectly. He spent his days copying maps of territories that had been explored centuries ago, never imagining he would one day need to draw one himself. His master always said the best mapmakers were those who understood that every edge of the known world was someone's entire life.

The discovery happened on a Tuesday, when Eli found an additional room in the archive that appeared on none of the building's official plans. Inside was a single scroll describing "${prompt}" — an artifact the old kingdoms had gone to war over and then collectively agreed to forget. The scroll was warm to the touch, as though it had been waiting.

Seeking the artifact meant travelling through the Greywood, a forest officially classified as uninhabitable. Eli went anyway, guided by fragmentary notes in the scroll's margins. The forest was not hostile — it was simply honest, reflecting back to each traveller whatever truth they most needed to face about themselves.

The artifact was exactly where the scroll promised it would be. But retrieving it triggered a collapse of the concealment magic that had kept it hidden, alerting every faction that had spent decades pretending it was gone. Eli stood in the clearing with the artifact in his hands while riders approached from three directions.

He buried it again in a location he told no one, destroyed the scroll, and walked home. His master asked where he had been. Eli said he had gotten lost. Some things, he had learned, were safer as legends than as possessions — and the world was not yet wise enough to deserve them back.`
    ],
    scifi: [
      `Dr. Priya Nair had dedicated eleven years to the deep-space listening program, and her colleagues had started referring to her work, affectionately, as the longest-running exercise in organized disappointment. She was methodical, data-driven, and absolutely convinced that the silence would eventually break — she just never anticipated it would happen on a Wednesday morning while she was eating toast.

The signal embedded in "${prompt}" was not random noise. It was a precise mathematical sequence followed by something that her translation algorithms identified, after six hours of processing, as a navigational warning. Not an invitation — a warning. The origin point was a region of space her team had flagged as empty for two decades.

The decision about whether to respond had to be made quickly, before the signal window closed. Protocol said to escalate, document, and wait for committee approval. Priya knew that would take months. She also knew that a warning left unacknowledged was, in most communication frameworks, interpreted as indifference or hostility.

She sent a response: a mathematical acknowledgment, a confirmation that the warning had been received, and a single added sequence indicating peaceful intent. Her supervisor saw the outgoing transmission log four hours later and the review board convened the following morning.

Priya was suspended pending investigation. The response came eight days later — not to the program's official channels, but to the same personal terminal she had used. It was short, translated cleanly, and read: "Acknowledged. Adjusting course. You were the first to answer." She printed it, framed it, and hung it in her kitchen while the review board decided her fate.`
    ],
    horror: [
      `Jonah moved into the house on Mercer Street because the rent was cheap and he had run out of better options. He was a practical man — a night-shift nurse, accustomed to death and discomfort, not given to imagination. The house was old, poorly insulated, and smelled faintly of damp wood. He told himself those were the only things wrong with it.

The first sign came on the third night: the sound of a drawer opening in the kitchen at 2 AM, slow and deliberate, followed by silence. Jonah checked and found nothing disturbed. By the end of the first week, connected to "${prompt}", he had catalogued eleven separate incidents that each had a rational explanation and yet collectively made no sense at all.

He requested the rental history from the agency. Four tenants in six years, all having left without providing forwarding addresses. The agency described them as "private individuals." The neighbor across the street, an elderly woman named Mrs. Croft, told him plainly that none of them had seemed quite right by the time they left.

Jonah set up a basic camera system and reviewed the footage each morning. On the ninth night, the footage showed him walking to the kitchen at 2 AM, opening a drawer, and standing motionless for eleven minutes before returning to bed. He had no memory of it whatsoever.

He moved out the following day, forfeiting his deposit. He never returned to collect the furniture he had left behind. Six months later, he drove past the house and saw a light on in the kitchen window at 2 AM. A shadow moved behind the glass, slow and deliberate. He did not stop the car.`
    ],
    mystery: [
      `Detective Lena Cross had a reputation for closing cases that other investigators quietly filed away as unsolvable, which meant she was often handed the cases nobody else wanted and given very little support in return. She worked alone by preference, kept her notes in a paper journal, and had a persistent habit of returning to scenes long after everyone else had moved on. It was this habit that cracked the case of "${prompt}".

The official verdict had been accidental death — an open-and-shut determination made in under forty-eight hours. But the victim's sister had contacted Lena privately, not to accuse anyone, but simply to say that something felt wrong in a way she could not articulate. Lena took the case unofficially, without resources or authorization, on the quiet understanding that most important truths begin as feelings.

Six weeks of quiet, methodical work produced a single anomaly: a phone call made from the victim's landline twenty minutes after the time of death as officially recorded. Someone had been in that house. Someone had made a call, and then carefully arranged things to suggest no one had.

Tracing the call led to a person with no obvious connection to the victim — until Lena went back further, past the last five years, into a history that both parties had clearly worked hard to bury. The motive was not anger or greed. It was fear of something long past being made present again.

Lena brought the evidence to a prosecutor she trusted and stepped away from the case. The arrest was made without her involvement, which suited her fine. She updated her journal with one sentence: "The truth does not require an audience — it only requires someone willing to look." Then she moved on to the next case nobody else wanted.`
    ],
    drama: [
      `Rosa had not spoken to her brother in eleven years when his name appeared on her phone on a quiet Sunday afternoon — not as a call, but as the sender of a single photograph. She was a high school art teacher in a small coastal town, settled, careful, someone who had built her life specifically around not being surprised. The photograph changed that in approximately three seconds.

It showed their childhood home, which had been sold after their parents' deaths, with a note on the back in their father's handwriting. The note referenced "${prompt}" — a name Rosa had not heard since she was seventeen, connected to a decision that had fractured the family so completely that she had simply stopped asking questions about it. Her brother's accompanying message said only: "I thought you should know the truth. Call me when you're ready."

She was not ready for six days. When she finally called, the conversation lasted four hours and covered territory that neither of them had ever spoken aloud to anyone. Their father had not been who they thought. The fracture in the family had not been random or cruel — it had been a man trying, badly, to protect something he didn't know how to explain.

Rosa drove to see her brother the following weekend. They walked through the old neighborhood and talked about their parents as people rather than as roles — flawed, specific, doing their imperfect best. It was uncomfortable and necessary and long overdue.

She drove home Sunday evening with the photograph on the passenger seat. It was not a happy ending, exactly — too much time had passed for that. But it was an honest one, and she had learned enough by then to understand that honesty, offered without expectation, is usually the most that people can give each other.`
    ],
    romantic: [
      `Clara was not looking for anyone when she volunteered to help coordinate the town's annual winter market — she was looking for something to do with her evenings that wasn't sitting alone in her apartment re-reading the same three books. She was thirty-one, recently out of a long relationship, and deeply skeptical of the idea that meaningful things happened by accident. Life, in her experience, required intention.

The man assigned to work alongside her on logistics was named Thomas — a structural engineer visiting his parents for the month, quietly competent, and apparently also not looking for anyone. They spent the first two evenings being professionally pleasant to each other and the third evening talking until the venue closed around them without either of them noticing.

The connection was real, which was precisely the problem. Thomas's life was in another city, built around work and commitments that couldn't be relocated on the basis of a few weeks and something that felt, uncomfortably, like "${prompt}". Clara had made that kind of leap before and knew exactly what the landing looked like.

They had an honest conversation about it on the last night of the market, sitting on a bench in the cold with paper cups of terrible coffee. Neither of them pretended the timing was fine or that distance was manageable. They acknowledged what it was and what it wasn't, and said goodbye like adults.

Three months later, Thomas accepted a project in her city — not because of her, he was careful to say, but not entirely not because of her either. He texted to let her know. She replied suggesting they get better coffee this time. It was not a grand gesture. It was two people deciding, carefully and with full awareness of the risks, to try.`
    ],
    general: [
      `The letter arrived on a Wednesday, written in handwriting that Nora did not recognise, addressed to a version of herself she had spent years trying to leave behind. It had been forwarded three times — she had moved often — and the postmark was eighteen months old. She almost threw it away without reading it. The subject was "${prompt}", a name she had not spoken aloud since she was nineteen years old, and the first line read: "You deserve to know what actually happened."

She read it standing at the kitchen counter, still in her coat. The woman who had written it was her mother's oldest friend, someone Nora had met once at a funeral and never seen again. The letter was four pages long. It was careful, honest, and it dismantled the version of events Nora had built her entire adult self around.

She spent the next two weeks doing nothing with it — going to work, making meals, talking to her flatmate about ordinary things. This was not avoidance, exactly. It was the way she had always processed things that mattered: by letting them settle before she decided what to do.

What she eventually did was drive to the small town three hours north where the woman still lived, sit at her kitchen table, and ask every question she had been afraid to ask for twenty years. Some answers were harder than the ones she had invented. Some were easier. None of them were what she expected. The truth about "${prompt}" was smaller than the myth she had made of it, and that, somehow, was the most difficult thing to accept.

She drove home in the early evening with the windows down, even though it was cold. She called her mother the following morning — not to accuse her, not to forgive her, but simply to talk, for the first time in years, without pretending. Her mother picked up on the second ring.`,

      `"Just one question," said the detective, setting a photograph on the table between them. "What is ${prompt}, and why does your name appear next to it in a file that officially does not exist?" The man across the table — mild, middle-aged, a secondary school history teacher named Paul — looked at the photograph for a long time before he answered. His answer took the rest of the afternoon and changed the direction of the investigation entirely.

Paul had stumbled onto the file three years earlier while researching a local history project for his Year 10 class. He had thought it was interesting, made a copy, and forgotten about it. He had not known that making the copy would place him on a watchlist maintained by people who had very specific reasons for wanting that information to remain buried.

The detective's name was Reyes. She had been assigned the case expecting bureaucratic obstruction and a quick dead end. Instead she found Paul, who had three years of meticulous notes, cross-referenced sources, and the particular stubbornness of someone who taught teenagers for a living and was therefore immune to being ignored.

They worked the case together for four months — unofficial, off-hours, using Paul's school library after six PM because it had the best archive access in the county. The people they were looking for were not powerful in the dramatic sense. They were mid-level, careful, and had simply been left alone long enough to become dangerous.

The case broke on a Tuesday, quietly, without headlines. Two officials resigned. One document was declassified. Paul used the whole thing as a case study for his Year 10 class the following term, with all the names changed. Reyes came in to answer questions. Fourteen-year-olds, it turned out, asked better questions than most people in the room had expected.`
    ]
  };
  
  const templates = storyTemplates[detectedGenre] || storyTemplates.general;
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  return randomTemplate;
};


