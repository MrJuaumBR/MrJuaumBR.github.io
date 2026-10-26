// ===== GAMES =====
var games = [
    {
        "name": "Cyberpunk 2077",
        "image": "cyberpunk2077.jpeg",
        "link": "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
        "description": "An open-world action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
        "releaseDate": "Dec 10, 2020",
        "developer": "CD Projekt Red",
        "publisher": "CD Projekt Red",
        "platforms": ["PC", "PlayStation", "Xbox"],
        "genre": "RPG"
    },
    {
        "name": "Forza Horizon 4",
        "image": "forzahorizon4.jpeg",
        "link": "https://store.steampowered.com/app/1293830/Forza_Horizon_4/",
        "description": "Dynamic seasons change everything at the world's greatest automotive festival. Race, stunt, and explore in beautiful open-world Britain.",
        "releaseDate": "Oct 2, 2018",
        "developer": "Playground Games",
        "publisher": "Xbox Game Studios",
        "platforms": ["PC", "Xbox"],
        "genre": "Racing"
    },
    {
        "name": "Forza Horizon 6",
        "image": "forzahorizon6.jpeg",
        "link": "https://store.steampowered.com/app/2483190/Forza_Horizon_6/",
        "description": "The ultimate open-world racing experience with stunning graphics, dynamic weather, and a massive car list across an expansive map.",
        "releaseDate": "May 19, 2026",
        "developer": "Playground Games",
        "publisher": "Xbox Game Studios",
        "platforms": ["PC", "Xbox"],
        "genre": "Racing"
    },
    {
        "name": "Terraria",
        "image": "terraria.jpeg",
        "link": "https://store.steampowered.com/app/105600/Terraria/",
        "description": "Dig, fight, explore, build! Nothing is impossible in this action-packed sandbox adventure game with over a thousand items to discover.",
        "releaseDate": "May 16, 2011",
        "developer": "Re-Logic",
        "publisher": "Re-Logic",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"],
        "genre": "Sandbox"
    },
    {
        "name": "Portal Knights",
        "image": "portalknights.jpeg",
        "link": "https://store.steampowered.com/app/374040/Portal_Knights/",
        "description": "Cooperative action-RPG with sandbox building. Travel between worlds, craft weapons, and defeat monstrous bosses.",
        "releaseDate": "May 23, 2017",
        "developer": "Keen Games",
        "publisher": "505 Games",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo"],
        "genre": "RPG"
    },
    {
        "name": "Minecraft",
        "image": "minecraft.jpeg",
        "link": "https://www.minecraft.net/",
        "description": "The iconic sandbox game where you can build anything, explore infinite worlds, and survive against creatures of the night.",
        "releaseDate": "Nov 18, 2011",
        "developer": "Mojang Studios",
        "publisher": "Mojang Studios",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"],
        "genre": "Sandbox"
    },
    {
        "name": "Joy Ride Turbo",
        "image": "joyrideturbo.jpeg",
        "link": "https://www.xbox.com/en-US/games/store/joy-ride-turbo/c1zwh2bz9tsf",
        "description": "An arcade-style kart racer with stunt arenas, power-ups, and chaotic local multiplayer action.",
        "releaseDate": "Jun 18, 2012",
        "developer": "Microsoft Studios",
        "publisher": "Microsoft Studios",
        "platforms": ["Xbox"],
        "genre": "Arcade Racing"
    },
    {
        "name": "Mortal Kombat 9",
        "image": "mk9.jpeg",
        "link": "https://store.steampowered.com/app/237110/Mortal_Kombat_Komplete_Edition/",
        "description": "The legendary fighting franchise returns with a brutal roster, X-ray moves, and a story that rewrites history.",
        "releaseDate": "Apr 19, 2011",
        "developer": "NetherRealm Studios",
        "publisher": "Warner Bros. Games",
        "platforms": ["PC", "PlayStation", "Xbox"],
        "genre": "Fighting"
    },
    {
        "name": "Mortal Kombat X",
        "image": "mk10.jpeg",
        "link": "https://store.steampowered.com/app/307780/Mortal_Kombat_X/",
        "description": "The next generation of Mortal Kombat introduces new characters, brutal fatalities, and a cinematic story mode.",
        "releaseDate": "Apr 14, 2015",
        "developer": "NetherRealm Studios",
        "publisher": "Warner Bros. Games",
        "platforms": ["PC", "PlayStation", "Xbox"],
        "genre": "Fighting"
    },
    {
        "name": "Saints Row 2",
        "image": "saintsrow2.jpeg",
        "link": "https://store.steampowered.com/app/9480/Saints_Row_2/",
        "description": "A vast open-world game where you build your criminal empire, customize everything, and cause chaos in Stilwater.",
        "releaseDate": "Oct 14, 2008",
        "developer": "Volition",
        "publisher": "THQ",
        "platforms": ["PC", "PlayStation", "Xbox"],
        "genre": "Open World"
    },
    {
        "name": "Lego Batman: Legacy of the Dark Knight",
        "image": "legobatmanldk.jpeg",
        "link": "https://store.steampowered.com/app/2215200/",
        "description": "The Dark Knight returns in a brand new LEGO adventure! Fight crime, solve puzzles, and explore Gotham City with the Caped Crusader.",
        "releaseDate": "May 22, 2026",
        "developer": "TT Games",
        "publisher": "Warner Bros. Interactive Entertainment",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo"],
        "genre": "Action Adventure"
    },
    {
        "name": "Lego The Hobbit",
        "image": "legohobbit.jpeg",
        "link": "https://store.steampowered.com/app/285160/LEGO_The_Hobbit/",
        "description": "Join Bilbo Baggins, Gandalf, and the dwarves on an epic adventure through Middle-earth in this LEGO adaptation of the classic tale.",
        "releaseDate": "Apr 8, 2014",
        "developer": "TT Games",
        "publisher": "Warner Bros. Interactive Entertainment",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo"],
        "genre": "Action Adventure"
    },
    {
        "name": "Lego Marvel Super Heroes",
        "image": "legomarvelsuperheroes.jpeg",
        "link": "https://store.steampowered.com/app/249130/LEGO_Marvel_Super_Heroes/",
        "description": "The Marvel universe comes to life in LEGO! Play as your favourite heroes and villains, save the world, and unlock hilarious characters.",
        "releaseDate": "Oct 22, 2013",
        "developer": "TT Games",
        "publisher": "Warner Bros. Interactive Entertainment",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo"],
        "genre": "Action Adventure"
    },
    {
        "name": "Scrap Mechanic",
        "image": "scrapmechanic.jpeg",
        "link": "https://store.steampowered.com/app/387990/Scrap_Mechanic/",
        "description": "A creative survival sandbox game where you build amazing machines, vehicles, and structures with a vast array of interactive parts. Survive against farmbots in a handcrafted world.",
        "releaseDate": "Jan 20, 2016",
        "developer": "Axolot Games",
        "publisher": "Axolot Games",
        "platforms": ["PC"],
        "genre": "Sandbox"
    },
    {
        "name": "Lego Batman 2: DC Super Heroes",
        "image": "legobatman2.jpeg",
        "link": "https://store.steampowered.com/app/209000/LEGO_Batman_2_DC_Super_Heroes/",
        "description": "The Dynamic Duo returns to save Gotham City from the Joker and Lex Luthor. Play as Batman, Robin, Superman, Wonder Woman, and more in an open-world LEGO adventure.",
        "releaseDate": "Jun 19, 2012",
        "developer": "TT Games",
        "publisher": "Warner Bros. Interactive Entertainment",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo"],
        "genre": "Action Adventure"
    },
    {
        "name": "No Man's Sky",
        "image": "nomanssky.jpeg",
        "link": "https://store.steampowered.com/app/275850/No_Mans_Sky/",
        "description": "An epic space exploration game set in an infinite procedurally generated universe. Discover new worlds, alien creatures, and uncover the mysteries of the cosmos.",
        "releaseDate": "Aug 9, 2016",
        "developer": "Hello Games",
        "publisher": "Hello Games",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo"],
        "genre": "Survival"
    },
    {
        "name": "Oxygen Not Included",
        "image": "oxygennotincluded.jpeg",
        "link": "https://store.steampowered.com/app/457140/Oxygen_Not_Included/",
        "description": "A colony simulation game where you manage a team of duplicants as they dig, build, and survive in a hostile asteroid. Manage oxygen, temperature, food, and more.",
        "releaseDate": "Jul 30, 2019",
        "developer": "Klei Entertainment",
        "publisher": "Klei Entertainment",
        "platforms": ["PC", "Mac", "Linux"],
        "genre": "Simulation"
    },
    {
        "name": "7 Days to Die",
        "image": "7daystodie.jpeg",
        "link": "https://store.steampowered.com/app/251570/7_Days_to_Die/",
        "description": "An open-world survival horror game combining first-person shooter, tower defense, and role-playing elements. Set in a post-apocalyptic world overrun by zombies.",
        "releaseDate": "Dec 13, 2013",
        "developer": "The Fun Pimps",
        "publisher": "The Fun Pimps",
        "platforms": ["PC", "PlayStation", "Xbox"],
        "genre": "Survival Horror"
    },
    {
        "name": "Lego Worlds",
        "image": "legoworlds.jpeg",
        "link": "https://store.steampowered.com/app/332310/LEGO_Worlds/",
        "description": "Explore, discover, and create in an infinite, procedurally generated LEGO universe. Build anything you can imagine with a vast array of bricks and tools.",
        "releaseDate": "Mar 7, 2017",
        "developer": "TT Games",
        "publisher": "Warner Bros. Interactive Entertainment",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo"],
        "genre": "Sandbox"
    },
    {
        "name": "Paradiddle (VR)",
        "image": "paradiddle.jpeg",
        "link": "https://www.meta.com/experiences/paradiddle/5719805344724551/",
        "description": "A realistic VR drumming experience that lets you play drums with intuitive controls, custom kits, and support for electronic drum pedals.",
        "releaseDate": "Jul 24, 2020",
        "developer": "Paradiddle",
        "publisher": "Paradiddle",
        "platforms": ["PC", "VR"],
        "genre": "Music"
    },
    {
        "name": "Project Zomboid",
        "image": "projectzomboid.jpeg",
        "link": "https://store.steampowered.com/app/108600/Project_Zomboid/",
        "description": "An open-ended, isometric survival RPG set in a zombie-infested world. Scavenge for supplies, build fortifications, and try to survive as long as possible.",
        "releaseDate": "Nov 8, 2013",
        "developer": "The Indie Stone",
        "publisher": "The Indie Stone",
        "platforms": ["PC", "Mac", "Linux"],
        "genre": "Survival"
    },
    {
        "name": "Pokemon Alpha Sapphire",
        "image": "pokemonalphasapphire.jpg",
        "link": "https://en.wikipedia.org/wiki/Pok%C3%A9mon_Omega_Ruby_and_Alpha_Sapphire",
        "description": "A classic Pokémon RPG set in the Hoenn region, remade with enhanced graphics, new Mega Evolutions, and a deep underwater exploration system.",
        "releaseDate": "Nov 21, 2014",
        "developer": "Game Freak",
        "publisher": "The Pokémon Company, Nintendo",
        "platforms": ["Nintendo"],
        "genre": "RPG"
    },
    {
        "name": "Necesse",
        "image": "necesse.jpeg",
        "link": "https://store.steampowered.com/app/1169040/Necesse/",
        "description": "A colony simulation and survival game where you build settlements, manage resources, and defend against monsters in a procedurally generated world.",
        "releaseDate": "Dec 12, 2021",
        "developer": "Mads Skovgaard",
        "publisher": "Mads Skovgaard",
        "platforms": ["PC"],
        "genre": "Simulation"
    },
    {
        "name": "FEZ",
        "image": "fez.jpeg",
        "link": "https://www.nintendo.com/games/detail/fez-switch/",
        "description": "A mind-bending puzzle-platformer where you rotate the world in 2D to reveal new perspectives and uncover secrets in a charming voxel universe.",
        "releaseDate": "Apr 13, 2012",
        "developer": "Polytron Corporation",
        "publisher": "Polytron Corporation",
        "platforms": ["Nintendo", "PC", "PlayStation", "Xbox"],
        "genre": "Puzzle"
    },
    {
        "name": "Spider-Man: Miles Morales",
        "image": "spidermanmilesmorales.jpeg",
        "link": "https://store.steampowered.com/app/1817190/SpiderMan_Miles_Morales/",
        "description": "Swing through a snowy New York City as Miles Morales, mastering new powers and facing a war between Roxxon and a high-tech criminal army.",
        "releaseDate": "Nov 12, 2020",
        "developer": "Insomniac Games",
        "publisher": "Sony Interactive Entertainment",
        "platforms": ["PC", "PlayStation"],
        "genre": "Action Adventure"
    },
    // ===== NEW GAMES ADDED =====
    {
        "name": "BONELAB (VR)",
        "image": "bonelab.jpeg",
        "link": "https://store.steampowered.com/app/1592190/BONELAB/",
        "description": "A physics-driven VR action game that lets you experiment, fight, and explore in a surreal world. Use your body, objects, and weapons in creative ways.",
        "releaseDate": "Sep 29, 2022",
        "developer": "Stress Level Zero",
        "publisher": "Stress Level Zero",
        "platforms": ["PC", "VR"],
        "genre": "Action"
    },
    {
        "name": "Gang Beasts",
        "image": "gangbeasts.jpeg",
        "link": "https://store.steampowered.com/app/285900/Gang_Beasts/",
        "description": "A silly physics-based party brawler where you control gelatinous characters and fight in absurd city environments. Great for local multiplayer!",
        "releaseDate": "Dec 12, 2017",
        "developer": "Boneloaf",
        "publisher": "Boneloaf",
        "platforms": ["PC", "PlayStation", "Xbox", "Nintendo"],
        "genre": "Fighting"
    }
];

// ===== ARTISTS =====
var artists = [
    {
        "name": "Eminem",
        "image": "eminem.jpeg",
        "youtube": "https://www.youtube.com/@eminem"
    },
    {
        "name": "Skillet",
        "image": "skillet.jpeg",
        "youtube": "https://www.youtube.com/@skilletband"
    },
    {
        "name": "Linkin Park",
        "image": "linkinpark.png",
        "youtube": "https://www.youtube.com/@LinkinPark"
    },
    {
        "name": "System of a Down",
        "image": "systemofadown.jpg",
        "youtube": "https://www.youtube.com/@systemofadown"
    },
    {
        "name": "Marino",
        "image": "marino.jpg",
        "youtube": "https://www.youtube.com/@MarinoMakesMusic"
    },
    {
        "name": "Marshmello",
        "image": "marshmello.jpg",
        "youtube": "https://www.youtube.com/@marshmello"
    },
    {
        "name": "CG5",
        "image": "cg5.jpg",
        "youtube": "https://www.youtube.com/@CG5"
    },
    {
        "name": "Kleberiano",
        "image": "kleberiano.jpg",
        "youtube": "https://www.youtube.com/@CanalKleberiano"
    },
    {
        "name": "Fall Out Boy",
        "image": "falloutboy.jpg",
        "youtube": "https://www.youtube.com/@FallOutBoy"
    },
    {
        "name": "NEFFEX",
        "image": "neffex.png",
        "youtube": "https://www.youtube.com/@neffexmusic"
    },
    {
        "name": "Kanye West",
        "image": "kanyewest.jpg",
        "youtube": "https://www.youtube.com/@KanyeWest"
    }
];