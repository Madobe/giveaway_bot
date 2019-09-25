/*
 * Populates the database with data.
 */
const sqlite3 = require('sqlite3');

const data = {
  donations: [
    {
      ign: 'Uwu',
      platform: 'UWU',
      items: 'uwu',
      anonymous: false,
      restrictions: 'uwu',
      notes: 'uwu',
      tag: 'shin#8431'
    },
    {
      ign: 'uwu',
      platform: 'UWU',
      items: 'uwu',
      anonymous: false,
      restrictions: 'uwu',
      notes: 'uwu',
      tag: 'shin#8431'
    },
    {
      ign: 'Shin',
      platform: 'PC',
      items: 'My giant penis',
      anonymous: false,
      restrictions: 'Novice, unowned, unmastered, MY BIG MOMMA',
      notes: 'Novice, unowned, unmastered, MY BIG MOMMA',
      tag: 'shin#8431'
    },
    {
      ign: 'Hewwo.',
      platform: 'PC',
      items: 'Giant toe',
      anonymous: false,
      restrictions: 'Unowned',
      notes: 'Unowned',
      tag: 'shin#8431'
    },
    {
      ign: 'Shin.',
      platform: 'PC',
      items: '1000 Platinum, Valkyr Prime, My big butt',
      anonymous: false,
      restrictions: 'Unowned',
      notes: 'Unowned',
      tag: 'shin#8431'
    },
    {
      ign: 'Yoooo',
      platform: 'PC',
      items: 'Test, test',
      anonymous: true,
      restrictions: '',
      notes: '',
      tag: 'shin#8431'
    },
    {
      ign: 'Test',
      platform: 'PC',
      items: 'Test',
      anonymous: true,
      restrictions: '',
      notes: '',
      tag: 'shin#8431'
    },
    {
      ign: 'No',
      platform: 'NO',
      items: 'No',
      anonymous: true,
      restrictions: '',
      notes: '',
      tag: 'shin#8431'
    },
    {
      ign: 'HornyGuy11',
      platform: 'PC',
      items: 'Idk, mom',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'shin#8431'
    },
    {
      ign: 'gay',
      platform: 'GAY',
      items: 'gay',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'shin#8431'
    },
    {
      ign: 'Yet another test.',
      platform: 'PC',
      items: 'Yo, yo , yo',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'shin#8431'
    },
    {
      ign: 'Yes.',
      platform: 'YES.',
      items: 'Yes, yes, yes, yes',
      anonymous: true,
      restrictions: '',
      notes: '',
      tag: 'shin#8431'
    },
    {
      ign: 'Big nibba 9000',
      platform: 'A CONCRETE ONE',
      items: 'my memes',
      anonymous: false,
      restrictions: 'unowned',
      notes: 'unowned',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Shin.',
      platform: 'PC',
      items: 'Hai, hai, hai',
      anonymous: false,
      restrictions: 'Beginner',
      notes: 'Beginner',
      tag: 'shin#8431'
    },
    {
      ign: 'you answer the next question',
      platform: 'OK COOL ITS JUST ME',
      items: 'but yeah it doesnt cancel',
      anonymous: false,
      restrictions: 'thats',
      notes: 'thats',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'FrostWitch',
      platform: 'PC',
      items: 'Oberon Prime',
      anonymous: false,
      restrictions: 'Novice',
      notes: 'Novice',
      tag: 'Frost#6618'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Telos Boltor',
      anonymous: false,
      restrictions: 'Unmastered - The winner must have not already mastered the item being donated.',
      notes: 'Unmastered - The winner must have not already mastered the item being donated.',
      tag: 'Frostillus#1060'
    },
    {
      ign: 'Persephonessoul',
      platform: 'PC',
      items: 'Helios Prime set, Vectis BP, 10 small cuthol',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Persephone7#2997'
    },
    {
      ign: 'xxgirlgamerbabexx',
      platform: 'PC',
      items: 'venka riven mod',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'ariellaX#2351'
    },
    {
      ign: '--Q--SeaCamul',
      platform: 'PC',
      items: 'Dehtat Riven https://imgur.com/a/BC19CAc',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'SeaCamul#4790'
    },
    {
      ign: 'Trapologist',
      platform: 'PC',
      items: 'Trinity Prime Set',
      anonymous: true,
      restrictions: 'Unmastered',
      notes: 'Unmastered',
      tag: 'Stexen(Trapologist)#7618'
    },
    {
      ign: 'Trapologist',
      platform: 'PC',
      items: 'Volt prime set, ash prime set',
      anonymous: true,
      restrictions: 'Unmastered',
      notes: 'Unmastered',
      tag: 'Stexen(Trapologist)#7618'
    },
    {
      ign: 'SirTombstone',
      platform: 'PS4',
      items: 'Argon Scope',
      anonymous: false,
      restrictions: 'Unowned',
      notes: 'Unowned',
      tag: 'Tomb#0028'
    },
    {
      ign: 'MissileSlayz',
      platform: 'PC',
      items: 'Cernos Prime set',
      anonymous: true,
      restrictions: 'Unmastered, Mastery Rank 12 or higher',
      notes: 'Unmastered, Mastery Rank 12 or higher',
      tag: 'MissileSlayz#9068'
    },
    {
      ign: 'test',
      platform: 'THAT ONE',
      items: 'ur mom',
      anonymous: false,
      restrictions: 'meme',
      notes: 'meme',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Mudar',
      platform: 'PC',
      items: '500 Platinum, 500 Platinum',
      anonymous: false,
      restrictions: 'Novice',
      notes: 'Novice',
      tag: 'Mudar#1508'
    },
    {
      ign: 'pkplaya2',
      platform: 'PC',
      items: '500 platinum',
      anonymous: false,
      restrictions: 'novice',
      notes: 'novice',
      tag: 'pkplaya2#8031'
    },
    {
      ign: 'SSI_LordOfErebus',
      platform: 'PC',
      items: 'Arcane Awakening R3, Arcane Deflection R3, Arcane Momentum R3, Arcane Strike R3, Arcane Trickery R3, Trinity Prime Set, Detron Igni-critatis, Miter Hexa-fevasus, Ankyros Toxi-acricta, Gorgon Wraith',
      anonymous: false,
      restrictions: 'Unowned (under the definition of the upcoming new ruling)',
      notes: 'Unowned (under the definition of the upcoming new ruling)',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'SSI_LordOfErebus',
      platform: 'PC',
      items: '50 Platinum',
      anonymous: false,
      restrictions: 'Unowned (under the definition of the upcoming new ruling)',
      notes: 'Unowned (under the definition of the upcoming new ruling)',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: '--Q--SeaCamul',
      platform: 'PC',
      items: '5308 platinum',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'SeaCamul#4790'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Hydroid Prime Set',
      anonymous: false,
      restrictions: "Must not have platinum balance more than item's market price.",
      notes: "Must not have platinum balance more than item's market price.",
      tag: 'Frostillus#1060'
    },
    {
      ign: 'baf1d',
      platform: 'PC',
      items: '75 Platinum',
      anonymous: true,
      restrictions: 'Beginner',
      notes: 'Beginner',
      tag: 'baf1d#7614'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Aksomati Decido',
      anonymous: false,
      restrictions: 'Must be under MR 15.',
      notes: 'Must be under MR 15.',
      tag: 'Frostillus#1060'
    },
    {
      ign: 'Tezcatl-Ladra',
      platform: 'PC',
      items: 'Telos Boltace, Insatiable (Nidus 4th ability augment) x2',
      anonymous: false,
      restrictions: 'Unowned',
      notes: 'Unowned',
      tag: 'Tezcatl#7419'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: '250p',
      anonymous: false,
      restrictions: 'Must be under MR12.',
      notes: 'Must be under MR12.',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'test',
      platform: 'TEST',
      items: 'test',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'test',
      platform: 'TEST',
      items: 'test',
      anonymous: true,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Momma',
      platform: 'PC',
      items: 'Item',
      anonymous: true,
      restrictions: 'Anon',
      notes: 'Anon',
      tag: 'shin#8431'
    },
    {
      ign: 'SquinkyJunior',
      platform: 'PC',
      items: 'Vigilante Armaments, Malignant Force, Magistar Tempicron',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'SquinkyJunior#2787'
    },
    {
      ign: 'Sig.Watda',
      platform: 'PC',
      items: 'Nekros Prime Set, Condition Overload',
      anonymous: false,
      restrictions: 'Unowned',
      notes: 'Unowned',
      tag: 'Watda#4752'
    },
    {
      ign: 'Rusalka',
      platform: 'PC',
      items: 'Veiled Pistol Riven 2x, Ack&Brunt Riven, Hek Riven, Marelok Riven, Redeemer Riven, Sonicor Riven, 400plat.',
      anonymous: false,
      restrictions: 'Unowned',
      notes: 'Unowned',
      tag: 'Shichi#6811'
    },
    {
      ign: '--RV--Halcyoner',
      platform: 'PC',
      items: 'Cephalon Shy Glyph Code',
      anonymous: false,
      restrictions: 'Unowned - The winner must have never owned this item.',
      notes: 'Unowned - The winner must have never owned this item.',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Tezcatl-Ladra',
      platform: 'PC',
      items: 'Inflitrate (Ivara 3rd ability augment)',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Tezcatl#7419'
    },
    {
      ign: 'GhostFReax',
      platform: 'PC',
      items: 'split chamber',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Ghostfreax#4079'
    },
    {
      ign: 'Rusalka',
      platform: 'PC',
      items: 'Fortuna UI Theme&Background',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Shichi#6811'
    },
    {
      ign: 'Mudar',
      platform: 'PC',
      items: '1500 Platinum',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Mudar#1508'
    },
    {
      ign: '--Q--Shin',
      platform: 'PC',
      items: 'Dakra Prime Decido, Ripkas Toxi-gelicta',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'shin#8431'
    },
    {
      ign: 'Cypher7464',
      platform: 'PC',
      items: 'Any item from Arbiters of Hexis',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Vad3r#8702'
    },
    {
      ign: 'Cypher7464',
      platform: 'PC',
      items: 'Any item from Cephalon Suda',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Vad3r#8702'
    },
    {
      ign: 'Karv_Protein',
      platform: 'PC',
      items: 'Valkyr Prime set, Cernos Prime set,',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Concrete#4871'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Magnus Crita-Ampilis',
      anonymous: false,
      restrictions: 'Must not own more than 4 pistol rivens.',
      notes: 'Must not own more than 4 pistol rivens.',
      tag: 'Frostillus#1060'
    },
    {
      ign: 'NinjaNL',
      platform: 'PC',
      items: 'Ignis wraith',
      anonymous: false,
      restrictions: 'Must be MR9',
      notes: 'Must be MR9',
      tag: 'Nagoku#5801'
    },
    {
      ign: 'LondonUndercover',
      platform: 'PC',
      items: 'Boltor Toxi-Satinok',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Pandaboi#4933'
    },
    {
      ign: 'SSI_LordOfErebus',
      platform: 'PC',
      items: 'Peculiar Growth',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'paavis99',
      platform: 'PC',
      items: 'Boar CritaAta, Ripkas Igni-TempiAta',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'paavis99#1352'
    },
    {
      ign: 'LondonUndercover',
      platform: 'PC',
      items: 'Condition Overload R0',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. Below MR 16',
      notes: 'Unowned - The winner must not already have a copy of this item. Below MR 16',
      tag: 'Pandaboi#4933'
    },
    {
      ign: 'Kousey1993',
      platform: 'PC',
      items: '3 forma blueprint',
      anonymous: false,
      restrictions: 'Below MR7',
      notes: 'Below MR7',
      tag: 'Kousei#8542'
    },
    {
      ign: 'TIME PUNCHER',
      platform: 'XB1',
      items: 'Quanta Riven Mod, Melee Riven Mod',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'TIME PUNCHER#2404'
    },
    {
      ign: 'Sig.Watda',
      platform: 'PC',
      items: 'Ash Prime Set, Condition Overload',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Watda#4752'
    },
    {
      ign: 'Sicarius_Avindar',
      platform: 'PC',
      items: 'Snipetron Vandal Set, Scimitar Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Sicarius Avindar#0027'
    },
    {
      ign: 'RWBY_Whiterose',
      platform: 'PC',
      items: '7 day affinity booster',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'RWBY_Whiterose#2625'
    },
    {
      ign: 'BlancBlack',
      platform: 'PC',
      items: 'Imperator Vandal Set, Sweeping Serration, Buzz Kill',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Kcalb#8664'
    },
    {
      ign: 'Infinyt3',
      platform: 'PC',
      items: 'Bolto Saticak, Burston Acri-heratio, Cassowar Insidex',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Infinyte#5257'
    },
    {
      ign: 'f',
      platform: 'F',
      items: 'f',
      anonymous: false,
      restrictions: 'f',
      notes: 'f',
      tag: 'shin#8431'
    },
    {
      ign: 'n',
      platform: 'N',
      items: 'n',
      anonymous: false,
      restrictions: 'n',
      notes: 'n',
      tag: 'shin#8431'
    },
    {
      ign: 'n',
      platform: 'N',
      items: 'n',
      anonymous: false,
      restrictions: 'n',
      notes: 'n',
      tag: 'shin#8431'
    },
    {
      ign: 'nn',
      platform: 'N',
      items: 'n',
      anonymous: false,
      restrictions: 'n',
      notes: 'n',
      tag: 'shin#8431'
    },
    {
      ign: 'n',
      platform: 'N',
      items: 'n',
      anonymous: false,
      restrictions: 'n',
      notes: 'n',
      tag: 'shin#8431'
    },
    {
      ign: 'EroSeth',
      platform: 'PC',
      items: 'Dark Split-Sword Insicon',
      anonymous: false,
      restrictions: 'Must have Dark Split-Sword, must not have mastered Dark Split-Sword, must be MR 10 or above',
      notes: 'Must have Dark Split-Sword, must not have mastered Dark Split-Sword, must be MR 10 or above',
      tag: 'AielRou#8249'
    },
    {
      ign: 'Gamer_Crest',
      platform: 'PC',
      items: 'Primed Charged Shell (Rank-7)',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Gamer_Crest#7434'
    },
    {
      ign: 'fgiveme',
      platform: 'PC',
      items: 'Anemic Agility, Blaze, Barrel Diffusion, Charm, Carving Mantis, Bleeding Willow, Constitution',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'fgiveme#9526'
    },
    {
      ign: 'PADORU_PADORU',
      platform: 'PC',
      items: 'Riven mod. Twin Vipers Croni-Visinok. https://imgur.com/a/vvjgEcI',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'SeaCamul#4790'
    },
    {
      ign: '--Q--Bionix',
      platform: 'PC',
      items: 'Mantis Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'bioonix#2594'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Unranked Primed Pistol Ammo Mutation',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time. Must not have more than 100 Platinum Balance',
      notes: 'Novice - Less than 250h in-game time. Must not have more than 100 Platinum Balance',
      tag: 'RH#1060'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Unranked Primed Rifle Ammo Mutation',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time. Must not have more than 100 Platinum in balance.',
      notes: 'Novice - Less than 250h in-game time. Must not have more than 100 Platinum in balance.',
      tag: 'RH#1060'
    },
    {
      ign: 'Vlyrew',
      platform: 'PC',
      items: 'Acrid Argi-hexatio',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'GrilledNappa#3545'
    },
    {
      ign: 'yo',
      platform: 'YO',
      items: 'yo',
      anonymous: false,
      restrictions: 'yo',
      notes: 'yo',
      tag: 'shin#8431'
    },
    {
      ign: 'PeterVonBerry',
      platform: 'PC',
      items: 'Destreza Prime',
      anonymous: false,
      restrictions: '11pm to 3am GMT+7',
      notes: '11pm to 3am GMT+7',
      tag: 'PeterVonBerry#8742'
    },
    {
      ign: 'Asho31',
      platform: 'PC',
      items: 'Riven',
      anonymous: false,
      restrictions: 'UTC+1 20:00',
      notes: 'UTC+1 20:00',
      tag: 'Asho31#9814'
    },
    {
      ign: 'test',
      platform: 'TEST',
      items: 'test',
      anonymous: false,
      restrictions: 'now',
      notes: 'now',
      tag: 'Revanx#1857'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Unranked Unrolled Spira Argimag (MR13+)',
      anonymous: false,
      restrictions: 'Weekends Asian Time',
      notes: 'Weekends Asian Time',
      tag: 'RH#1060'
    },
    {
      ign: 'test',
      platform: 'TEST',
      items: 'test',
      anonymous: false,
      restrictions: 'a time',
      notes: 'a time',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Merleawe',
      platform: 'PC',
      items: '2 Ivara Prime, 1 Rhino Prime, 10 Memeing Strike',
      anonymous: true,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'Nanamin#1103'
    },
    {
      ign: 'N/A',
      platform: 'ANY PLATFORM',
      items: '1 Month of Discord Nitro',
      anonymous: false,
      restrictions: 'Must not have active Nitro subscription',
      notes: 'Must not have active Nitro subscription',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Mudar',
      platform: 'PC',
      items: '1-month Discord Nitro',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Mudar#1508'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Unranked Unrolled Kogake Igni-visitron',
      anonymous: false,
      restrictions: 'Must not own more than 5 rivens.',
      notes: 'Must not own more than 5 rivens.',
      tag: 'RH#1060'
    },
    {
      ign: 'lynxthe1st',
      platform: 'PC',
      items: 'riven',
      anonymous: false,
      restrictions: 'mr 15 or above',
      notes: 'mr 15 or above',
      tag: 'Teshin#6178'
    },
    {
      ign: 'kanekinzou0',
      platform: 'PC',
      items: 'Little Nightmares (Steam key)',
      anonymous: true,
      restrictions: '',
      notes: '',
      tag: 'YaseiKane#5543'
    },
    {
      ign: 'TheK_HK',
      platform: 'PC',
      items: 'Rabvee Vexi-cronibo',
      anonymous: false,
      restrictions: 'novice, unowned',
      notes: 'novice, unowned',
      tag: 'Karsten#0121'
    },
    {
      ign: 'Rusalka',
      platform: 'PC',
      items: 'Smeeta Kavat Imprints, Adarza Kavat Imprints',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Shichi#1904'
    },
    {
      ign: 'SeeDelion',
      platform: 'XBOX',
      items: 'R2 Primed Ravage',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'SeeDelion#8137'
    },
    {
      ign: 'Corbeena',
      platform: 'PC',
      items: 'Paris croni-deciata',
      anonymous: false,
      restrictions: 'Only enter if you will actually put it to use <:GWqlabsLove:392307831363076096>',
      notes: 'Only enter if you will actually put it to use <:GWqlabsLove:392307831363076096>',
      tag: 'Corbeena#7232'
    },
    {
      ign: 'Sage1312',
      platform: 'PC',
      items: 'Free commission of an environment piece',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'SaveTERRARIAN#6218'
    },
    {
      ign: 'Tenarsha',
      platform: 'PC',
      items: 'Twitch key SNK pack, Twitch key Hacknet: Complete Edition, Twitch keySmoke & Sacrifice, Twitch key Poi',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Deadlock#2384'
    },
    {
      ign: '--Q--Bionix',
      platform: 'PC',
      items: 'Rattleguts Crita-Visibin, Arca Plasmor Acri-Cronicron',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'bioonix#2594'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: '200p',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'Zozdnvil',
      platform: 'PC',
      items: 'Quartakk riven mod',
      anonymous: false,
      restrictions: 'Mr 11 or above',
      notes: 'Mr 11 or above',
      tag: 'Zozdnvil#3716'
    },
    {
      ign: 'SSI_LordOfErebus',
      platform: 'PC',
      items: 'Latron Critamag, Detron Visi-Hexapha',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Polymarskia',
      platform: 'PC',
      items: '183 Platinum',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Sicarius_Avindar',
      platform: 'PC',
      items: 'Carrier Prime Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Sicarius Avindar#0027'
    },
    {
      ign: 'PeterVonBerry',
      platform: 'PC',
      items: 'Magus Husk',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'PeterVonBerry#8742'
    },
    {
      ign: 'lynxthe1st',
      platform: 'PC',
      items: 'limbo prime set',
      anonymous: false,
      restrictions: 'noivce unowned/unmastered',
      notes: 'noivce unowned/unmastered',
      tag: 'Teshin#6178'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'MR11 Dokrahm Hexacon',
      anonymous: false,
      restrictions: 'Must not own a Zaw Riven Mod.',
      notes: 'Must not own a Zaw Riven Mod.',
      tag: 'RH#1060'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'MR14 Rank 7 Kronen Visidex',
      anonymous: false,
      restrictions: 'Must not be owning more than 5 riven mods., MR14 and above.',
      notes: 'Must not be owning more than 5 riven mods., MR14 and above.',
      tag: 'RH#1060'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: '30 Day Credit Booster (200 Platinum)',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'RH#1060'
    },
    {
      ign: 'Darkblob2',
      platform: 'PC',
      items: 'riven',
      anonymous: false,
      restrictions: 'MR11 or above',
      notes: 'MR11 or above',
      tag: 'Darkblob2#6702'
    },
    {
      ign: 'MythrillGamer',
      platform: 'PC',
      items: 'Nami Skyla Riven, Marelok Riven, Burston Riven, Hek Riven',
      anonymous: false,
      restrictions: 'weapon in top five used',
      notes: 'weapon in top five used',
      tag: 'MythGrill#5157'
    },
    {
      ign: 'Sig.Watda',
      platform: 'PC',
      items: 'Mesa Prime Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Watda#4752'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Telos Boltace',
      anonymous: false,
      restrictions: 'Must not have more than 70 Platinum balance.',
      notes: 'Must not have more than 70 Platinum balance.',
      tag: 'RH#1060'
    },
    {
      ign: 'lynxthe1st',
      platform: 'PC',
      items: 'pax charge r3',
      anonymous: false,
      restrictions: 'must own a kitgun at least',
      notes: 'must own a kitgun at least',
      tag: 'Teshin#6178'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: '200 Platinum',
      anonymous: false,
      restrictions: 'Must have completed the War Within quest',
      notes: 'Must have completed the War Within quest',
      tag: 'RH#1060'
    },
    {
      ign: 'lynxthe1st',
      platform: 'PC',
      items: 'arcane velocity r3',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. Novice - Less than 250h in-game time.',
      notes: 'Unowned - The winner must not already have a copy of this item. Novice - Less than 250h in-game time.',
      tag: 'Teshin#6178'
    },
    {
      ign: 'lynxthe1st',
      platform: 'PC',
      items: 'no',
      anonymous: false,
      restrictions: 'NO',
      notes: 'NO',
      tag: 'Teshin#6178'
    },
    {
      ign: 'lynxthe1st',
      platform: 'PC',
      items: 'zenith riv',
      anonymous: false,
      restrictions: 'must have a zenith',
      notes: 'must have a zenith',
      tag: 'Teshin#6178'
    },
    {
      ign: 'Sicarius_Avindar',
      platform: 'PC',
      items: 'Marelok Croni-geliata',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Sicarius Avindar#0027'
    },
    {
      ign: 'lynxthe1st',
      platform: 'PC',
      items: 'pax seeker r3',
      anonymous: false,
      restrictions: 'must have kitgun',
      notes: 'must have kitgun',
      tag: 'Teshin#6178'
    },
    {
      ign: 'Turtleinarock',
      platform: 'XBOX',
      items: 'Riven Mod',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'TurtleInARock#4625'
    },
    {
      ign: 'WindShark',
      platform: 'PC',
      items: 'SniperElite3',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'WindShark#8436'
    },
    {
      ign: 'Remelody',
      platform: 'PC',
      items: '250 Plat',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Sleigh#2084'
    },
    {
      ign: 'Guinylen',
      platform: 'PC',
      items: 'Riven mods',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Porphy#2698'
    },
    {
      ign: 'LynxThe1st',
      platform: 'PC',
      items: 'Pax seeker r3',
      anonymous: false,
      restrictions: 'Must own kitgun',
      notes: 'Must own kitgun',
      tag: 'Teshin#6178'
    },
    {
      ign: 'zaza7',
      platform: 'PC',
      items: 'augur secret, augur secret, 10 warframe slots',
      anonymous: false,
      restrictions: 'augur secrets under MR 12, warframe slots less than 8 frames under MR 14',
      notes: 'augur secrets under MR 12, warframe slots less than 8 frames under MR 14',
      tag: 'Zaza#7777'
    },
    {
      ign: 'SSI_LordOfErebus',
      platform: 'PC',
      items: 'Balla Crita-insido, Detron Visi-hexapha, Kogake Vexi-critatron, Latron Critamag, Nikana Visi-vexitron, Okina Insi-visido, Tigris Feva-gelisus',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'StarGuardianShaco',
      platform: 'PC',
      items: 'Riven Mod',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'StarGuardianShaco#2283'
    },
    {
      ign: 'Kiri',
      platform: 'PC',
      items: 'Max rank Magnum Force, Primed Fever Strike, Primed Ravage, Primed Target Cracker, Catchmoon Hera-Saticon, Catchmoon Hexacron',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Kiri#9773'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Plague Kripath Vexinent',
      anonymous: false,
      restrictions: 'Must not have a riven for this weapon',
      notes: 'Must not have a riven for this weapon',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'RWBY-WhiteRose',
      platform: 'PC',
      items: 'Hek unrolled',
      anonymous: false,
      restrictions: 'Must be MR13 or above, Unowned, must own a Hek.',
      notes: 'Must be MR13 or above, Unowned, must own a Hek.',
      tag: 'RWBY-WhiteRose#2625'
    },
    {
      ign: 'TonyTheX1',
      platform: 'PC',
      items: 'Akmagnus Sati-lexicat , Cyath Insi-toritron , Pistol Riven Mod (veiled) , Pistol Riven Mod (veiled)',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Tony.#4284'
    },
    {
      ign: 'Dlareg101',
      platform: 'PC',
      items: 'Forma',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'Dlareg2005#6209'
    },
    {
      ign: 'SSI_LordOfErebus',
      platform: 'PC',
      items: 'Galatine Acri-gelidex',
      anonymous: false,
      restrictions: 'Must be MR16 or above',
      notes: 'Must be MR16 or above',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'TheGeekCritic',
      platform: 'PC',
      items: 'Berserker R5, Berserker R5, Corrosive Projection R5, Dead eye R5, Enemy Radar R5, Energy Siphon R5, Infested Impedance R5, Loot Detector R5, Physique R5, Pistol Scavenger R5, Rejuvination R5, Rifle Amp R5, Rifle Scavenger R5, Shield Disruption R5, Shotgun Scavenger R5, Sniper Scavenger R5, Speed Holster R5, Sprint Boost R5, Steel Charge R5',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'MMonikaebi',
      platform: 'PC',
      items: 'Pupacyst Locti-critadex',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. Must own Pupacyst',
      notes: 'Unowned - The winner must not already have a copy of this item. Must own Pupacyst',
      tag: 'RipeyAurora#8003'
    },
    {
      ign: 'spiros2204',
      platform: 'PS4',
      items: 'Mag Prime Set',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'Mystery#0018'
    },
    {
      ign: 'Kaizar60',
      platform: 'PC',
      items: 'Lecta Acrides, Ogris Mantitox, Prova Pleci-loctinem',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'o πρόγονος#9674'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Primed Point Blank (Rank 0)',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Chroma Prime set',
      anonymous: false,
      restrictions: 'Unmastered',
      notes: 'Unmastered',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'PlayerOO1',
      platform: 'PC',
      items: 'Marelok Zeti-concisus riven, Gaze Acrido riven, Akstiletto Acritron riven',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. must be above mr16 for gaze riven must be above mr 11 for akstilleto riven must be above mr12 for marelok riven',
      notes: 'Unowned - The winner must not already have a copy of this item. must be above mr16 for gaze riven must be above mr 11 for akstilleto riven must be above mr12 for marelok riven',
      tag: 'PlayerOne#4418'
    },
    {
      ign: 'SSI_LordOfErebus',
      platform: 'PC',
      items: 'Zenistar Visi-gelitox',
      anonymous: false,
      restrictions: 'Must be MR10 or above',
      notes: 'Must be MR10 or above',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Soulless_Spartan',
      platform: 'PC',
      items: 'Pax Seeker R3',
      anonymous: true,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Soulless Spartan#8376'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Helios Prime Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. Must have donated at least 20 Platinum to this community.',
      notes: 'Unowned - The winner must not already have a copy of this item. Must have donated at least 20 Platinum to this community.',
      tag: 'RH#1060'
    },
    {
      ign: 'xDaban',
      platform: 'PC',
      items: '{Ferrox Visicron} * + 164.6% Critical Chance * + 194.3% Damage {5} Rerolls {MR 16}',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'CraziiFX#5599'
    },
    {
      ign: '!bathalo',
      platform: '!XBOX',
      items: '!1500 platinum',
      anonymous: false,
      restrictions: '!cancel',
      notes: '!cancel',
      tag: 'dayummmm#4746'
    },
    {
      ign: 'Revanx',
      platform: 'PC',
      items: 'Despair Visitin, Mewan Croni-tempisus',
      anonymous: false,
      restrictions: 'Must be MR16 or higher',
      notes: 'Must be MR16 or higher',
      tag: 'Revanx#1857'
    },
    {
      ign: 'RWBY-Whiterose',
      platform: 'PC',
      items: 'Ankyros Uti-Visitox (+10.9% channeling eff, +10% toxin, +18.7% DMG, unranked)',
      anonymous: false,
      restrictions: 'Must be MR9 or higher must own ankyros (will need proof)',
      notes: 'Must be MR9 or higher must own ankyros (will need proof)',
      tag: 'Rose#7002'
    },
    {
      ign: 'My IGN is DaniloNB',
      platform: 'I AM ON PC',
      items: 'I would like to donate a rank 9/10 Primed Ravage',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time. Unowned - The winner must not already have a copy of this item.',
      notes: 'Beginner - Up to 100h in-game time. Unowned - The winner must not already have a copy of this item.',
      tag: 'Danilo_NB#3985'
    },
    {
      ign: 'integritydivination',
      platform: 'PC',
      items: 'Imperator Vandal',
      anonymous: true,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Øppai#2159'
    },
    {
      ign: 'Altharch',
      platform: 'PC',
      items: 'Fluctus Hera-Zetidra, Lanka Croni-ignides, Mutalist Cernos Manti-satiada, Mutalist Quanta Geli-Argibin, Tetra heratron, Tonkor Zeti-insitio, Attica Hera-gelitox',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Altharch Snowbell#1009'
    },
    {
      ign: 'jetstream64',
      platform: 'PC',
      items: 'wolf sledge [set]',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Jetstream{PC}#8866'
    },
    {
      ign: 'LostSpark13',
      platform: 'XBOX',
      items: 'Braton prime',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Salamandre#9788'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Supra Vandal',
      anonymous: false,
      restrictions: 'Unmastered',
      notes: 'Unmastered',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'Sicarius_Avindar',
      platform: 'PC',
      items: 'Maiming Strike, Weeping Wounds, Nano-Applicator, Atomos Vexi-ampican, Hikou Sati-Ignibin, Arca Scisco Visi-Toxitron, Secura Dual Cestra, Nikana Prime Set, Tigris Prime Set, *Dakra Prime Exitis + Dakra Prime Set (Same Giveaway on this one please)*',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Sicarius Avindar#0027'
    },
    {
      ign: 'Nonstopgamer2',
      platform: 'XBOX',
      items: 'Catchmoon Riven (MR 9)',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: '我爱我的女朋友#6639'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Nova Prime Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. Must have plat balance lower than market value',
      notes: 'Unowned - The winner must not already have a copy of this item. Must have plat balance lower than market value',
      tag: 'RH#1060'
    },
    {
      ign: 'SeeDelion',
      platform: 'XBOX',
      items: 'Condition Overload',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time. Unowned - The winner must not already have a copy of this item.',
      notes: 'Beginner - Up to 100h in-game time. Unowned - The winner must not already have a copy of this item.',
      tag: '╲⎝⧹SeeDelion⧸⎠╱#8137'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Nyx Pasithea Collection',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'xDaban',
      platform: 'PC',
      items: 'Adaptation mod',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'ItsD0zzy#5599'
    },
    {
      ign: 'Defining_Purpose',
      platform: 'PC',
      items: 'Any Red Veil augment mod',
      anonymous: true,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Yendri#7459'
    },
    {
      ign: 'sludgefest',
      platform: 'PC',
      items: 'Plasma Sword Locti-decitis Riven',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'sludgebot#6329'
    },
    {
      ign: 'Ornithos',
      platform: 'PC',
      items: '[Dex Dakra Crita-toritox]',
      anonymous: false,
      restrictions: 'MR16 or above',
      notes: 'MR16 or above',
      tag: 'Ornithos#2471'
    },
    {
      ign: 'sludgebot',
      platform: 'PC',
      items: 'Afuris Argi-satitis Riven',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. Focus on Newbies Focus on those without many Rivens',
      notes: 'Unowned - The winner must not already have a copy of this item. Focus on Newbies Focus on those without many Rivens',
      tag: 'sludgebot#6329'
    },
    {
      ign: 'Zaza7',
      platform: 'PC',
      items: 'Augur Secrets',
      anonymous: false,
      restrictions: 'Not owned 250 Hours or less.',
      notes: 'Not owned 250 Hours or less.',
      tag: 'Zaza#7777'
    },
    {
      ign: 'Esserlon',
      platform: 'PC',
      items: 'Paris Prime Set, Orthos Prime Set',
      anonymous: false,
      restrictions: "Unowned - The winner must not already have a copy of this item. Unmastered Must meet weapon's MR requirement",
      notes: "Unowned - The winner must not already have a copy of this item. Unmastered Must meet weapon's MR requirement",
      tag: 'Makishima#0476'
    },
    {
      ign: 'Pixelisator',
      platform: 'PC',
      items: 'equinox prime set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Pixelisator#4679'
    },
    {
      ign: '.Yes',
      platform: 'PC',
      items: 'nova prime x3',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Phanini#0001'
    },
    {
      ign: 'xDaban',
      platform: 'PC',
      items: 'age of wonders 2 wizard edition steam key',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. preferably only enter if interested in those sorts of games',
      notes: 'Unowned - The winner must not already have a copy of this item. preferably only enter if interested in those sorts of games',
      tag: 'xDaban#5599'
    },
    {
      ign: 'Jeansaurus',
      platform: 'PC',
      items: 'zephyr prime set',
      anonymous: false,
      restrictions: 'beginner - up to 100h in-game time Unowned - The winner must not already have a copy of this item. mr 6 to mr 9',
      notes: 'beginner - up to 100h in-game time Unowned - The winner must not already have a copy of this item. mr 6 to mr 9',
      tag: 'Jean#2241'
    },
    {
      ign: 'Trapologist',
      platform: 'PC',
      items: 'GW2 path of fire dlc key 1, GW2 path of fire dlc key 2, GW2 path of fire dlc key 3',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Stexen(Trapologist)#7618'
    },
    {
      ign: 'Neon_Fighter',
      platform: 'SWITCH',
      items: 'Animal instinct, Lethal torrent, Rending strike',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Neon_Fighter#7250'
    },
    {
      ign: 'Soulless_Spartan',
      platform: 'PC',
      items: 'Mantis Set, Pax Seeker R3 (x2)',
      anonymous: true,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Soulless Spartan#8376'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: '1490 Platinum',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'streamer_memer',
      platform: 'PS4',
      items: 'Primed regen',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'STREAMER_MEMERRRRRRRRRRRRRRR#2814'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: 'Primed Heated Charge R10, Primed Morphic Transformer R10, Primed Point Blank R10, Primed Reach R10, Mag Prime Set, Arcane Strike R3, Helios Prime Set',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: 'Arcane Awakening R3, Arcane Awakening R3, Arcane Conequence R3, Arcane Deflection R3, Arcane Eruption R3, Arcane Momentum R3, Arcane Momentum R3, Arcane Strike R3, Arcane Tempo R3, Arcane Trickery R3, Arcane Trickery R3, Pax Charge R3, Pax Bolt R3, Pax Soar R3, Arcane Chorus Helmet, Nova Prime Set, Gorgon Wraith Set, Crimson Dervish R0, Steel Fiber R10, Vitality R10, Redirection R10, Ice Spring R10, Lightning Dash R10, Toxic Flight R10, Bite R10, Maul R10, Link Shields R10',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: 'R10 Hornet Strike, R10 Serration, R10 Firewalker,R10 Provoked, R10 Healing Return, R10 Blood Rush, R10 Sanctuary, R10 Enhanced Vitality, R10 Link Health, R10 Hyperion Thrusters',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'streamer_memer',
      platform: 'PS4',
      items: 'Arcane strike, peculiar bloom, insatiable, acid shells, ayatan valana sculpture',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'STREAMER_MEMERRRRRRRRRRRRRRR#2814'
    },
    {
      ign: 'Briggston',
      platform: 'PC',
      items: 'Hystrix Satiada',
      anonymous: false,
      restrictions: 'MR 8 or higher',
      notes: 'MR 8 or higher',
      tag: 'Briggs#0700'
    },
    {
      ign: 'Briggston',
      platform: 'PC',
      items: 'Dual Ichor Toxi-acridra',
      anonymous: false,
      restrictions: 'MR 8 or higher',
      notes: 'MR 8 or higher',
      tag: 'Briggs#0700'
    },
    {
      ign: 'Briggston',
      platform: 'PC',
      items: 'Dual Decurion Ampi-visidra',
      anonymous: false,
      restrictions: 'MR 8 or higher',
      notes: 'MR 8 or higher',
      tag: 'Briggs#0700'
    },
    {
      ign: 'Briggston',
      platform: 'PC',
      items: 'Flux Rifle Ampido',
      anonymous: false,
      restrictions: 'MR 8 or higher',
      notes: 'MR 8 or higher',
      tag: 'Briggs#0700'
    },
    {
      ign: 'Briggston',
      platform: 'PC',
      items: 'Sydon Visitor',
      anonymous: false,
      restrictions: 'MR 8 or higher',
      notes: 'MR 8 or higher',
      tag: 'Briggs#0700'
    },
    {
      ign: 'jetstream64',
      platform: 'PC',
      items: 'arcane guardian, arcane rage, arcane fury, arcane avenger',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'Jetstream#8866'
    },
    {
      ign: 'Lucid02',
      platform: 'PC',
      items: '200p',
      anonymous: true,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'synthesis08#2816'
    },
    {
      ign: 'Lucid02',
      platform: 'PC',
      items: '200p',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'synthesis08#2816'
    },
    {
      ign: 'ElmoIsNowGodly',
      platform: 'PC',
      items: '2 veiled rifle riven mods',
      anonymous: false,
      restrictions: "At least MR8. I'll give it to the donation person when I reach it.I've reached max riven capacity and I need to trade some away.",
      notes: "At least MR8. I'll give it to the donation person when I reach it.I've reached max riven capacity and I need to trade some away.",
      tag: 'Mentally Scarred#9817'
    },
    {
      ign: 'ElmoIsNowGodly',
      platform: 'PC',
      items: '2 Veiled Rifle Riven Mods',
      anonymous: false,
      restrictions: 'At least MR8',
      notes: 'At least MR8',
      tag: 'Mentally Scarred#9817'
    },
    {
      ign: 'Gernix',
      platform: 'PC',
      items: 'Odonata Prime Sets',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Gernix#5179'
    },
    {
      ign: 'SH-Mike',
      platform: 'PC',
      items: 'Bolto Saticak Riven Mod',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: "SH'Mike#6532"
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: 'Tennocon 2019 Sanctuary Showcase Glyph, Tennocon 2019 Grineer Security Glyph',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Tigris Prime set, Cernos Prime set',
      anonymous: false,
      restrictions: 'Unmastered',
      notes: 'Unmastered',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Mara Detron',
      anonymous: false,
      restrictions: 'Unmastered',
      notes: 'Unmastered',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Secura Dual Cestra, Odonata Prime set, Nyx Prime set, Trinity Prime set, Nikana Prime set, Helios Prime set',
      anonymous: false,
      restrictions: 'Unmastered',
      notes: 'Unmastered',
      tag: 'Potatonana#7300'
    },
    {
      ign: 'Moleesh',
      platform: 'PC',
      items: 'helios prime 3,fragor prime, ortho prime, bronco prime, pyrana prime, vasto prime, boar prim 2, gorgon wraith 2, soma prime, banshee 2, frost 2, mag 2, nova 2, oberon 2,valk 2, zeph 2, rand arcames',
      anonymous: true,
      restrictions: 'Novice - Less than 250h in-game time. Unowned - The winner must not already have a copy of this item.',
      notes: 'Novice - Less than 250h in-game time. Unowned - The winner must not already have a copy of this item.',
      tag: 'Moleesh#1234'
    },
    {
      ign: '---EG---DoctorTee6',
      platform: 'PC',
      items: 'Pax Charge R3',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'DoctorTee | Soblow#3475'
    },
    {
      ign: 'maxsayer01',
      platform: 'PC',
      items: 'Euphona Prime Igni-fevacan, Gaze Ampi-fevacron, Peculiar Growth',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'CounterSlash#8171'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: 'Sybaris Critacan',
      anonymous: false,
      restrictions: 'Must not already have a Sybaris riven',
      notes: 'Must not already have a Sybaris riven',
      tag: 'Potatonana#7300'
    },
    {
      ign: '.Yes',
      platform: 'PC',
      items: 'nova prime set x2, nyx prime set, boltor prime, ankyros prime, ballistica prime set x5, pyrana prime set x3, mag prime set, bo prime set, boar prime, scindo prime, hydroid prime set x2, hikou prime set, helios prime, gram prime set x2, galatine prime, fragor prime set x2, equinox prime set, wyrm prime, wolf sledge, valkyr prime, trinity prime, soma prime set x2, silva and aegis prime, redeemer prime, reaper prime set x2, nami skyla prime, mirage prime set x3, latron prime',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Phanini#0001'
    },
    {
      ign: 'Ornithos',
      platform: 'PC',
      items: 'Hystrix Acri-puratio',
      anonymous: false,
      restrictions: 'MR11+',
      notes: 'MR11+',
      tag: 'Ornithos#2471'
    },
    {
      ign: '.Yes',
      platform: 'PC',
      items: 'Dokrahm hexa-plecitox, Euphona Prime Acri-toxicron',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Phanini#0001'
    },
    {
      ign: 'Cloudy_Kiteer',
      platform: 'PC',
      items: 'Nekros Prime Set, Nekros Prime Set, Nekros Prime Set, Nekros Prime Set, Banshee Prime Set, Banshee Prime Set, Banshee Prime Set, Hydroid Prime set, Nova Prime set, Oberon Prime set, Fragor Prime set, Tigris Prime set, Euphona Prime set, Vauban Prime set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Cloudy#0001'
    },
    {
      ign: 'xDaban',
      platform: 'PC',
      items: 'Riven',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item. MR 8 minimum',
      notes: 'Unowned - The winner must not already have a copy of this item. MR 8 minimum',
      tag: 'xDaban#5599'
    },
    {
      ign: 'iisaltyi 2RGR',
      platform: 'XBOX ONE',
      items: 'Hikou lexi-toxicak, Paris satibin, twin vipers decibin',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'communist manifesto#1803'
    },
    {
      ign: 'Azul',
      platform: 'PC',
      items: 'Arcane energize R3',
      anonymous: false,
      restrictions: 'More than 150h in-game time Less than 50 hydrolyst captures',
      notes: 'More than 150h in-game time Less than 50 hydrolyst captures',
      tag: 'Schrödingerの猫#7693'
    },
    {
      ign: 'BlancBlack',
      platform: 'PC',
      items: '!donation',
      anonymous: false,
      restrictions: 'Mantis set, unrolled rivens (twin vipers akbronco, Oothla)',
      notes: 'Mantis set, unrolled rivens (twin vipers akbronco, Oothla)',
      tag: 'Zay#5015'
    },
    {
      ign: 'Kiri',
      platform: 'PC',
      items: 'Battacor Critatio, Baza Toxiata, Dual Kamas Visinent, Dual Toxocyst Croni-Argitox, Mewan Visi-Insidra, Synapse Visi-Cronicron',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Kiri#9773'
    },
    {
      ign: 'test',
      platform: 'TEST',
      items: 'TEST',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'test',
      platform: 'TEST',
      items: 'test prime, test prime set',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'test',
      platform: 'TEST',
      items: 'ember prime set x3, 3 ember prime sets',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'BoatPoot',
      platform: 'PC',
      items: '400p',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Potatonana#7300'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: 'Mantis landing craft set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: 'Scimitar landing craft set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '5x Virtuos Shadow sets',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '3x Magus Lockdown sets',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '3x Pax Bolt sets; 2x Pax Charge sets; 3x Pax Seeker sets',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '2x Quick Thinking mod',
      anonymous: false,
      restrictions: 'Less than 250h in-game time',
      notes: 'Less than 250h in-game time',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: 'Strun Wraith set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '10x Gorgon Wraith sets',
      anonymous: false,
      restrictions: 'Less than 250h in-game time',
      notes: 'Less than 250h in-game time',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '2x Vigorous Swap; 2x Adaptation',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '5x Corrosive Projection aura',
      anonymous: false,
      restrictions: 'Less than 100h in-game time',
      notes: 'Less than 100h in-game time',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '5x Enemy Radar aura',
      anonymous: false,
      restrictions: 'Less than 100h in-game time Must not already have a copy of this item',
      notes: 'Less than 100h in-game time Must not already have a copy of this item',
      tag: 'Sintharius#4284'
    },
    {
      ign: '--Q--Camul',
      platform: 'PC',
      items: 'Gauss Collection, Gauss Noble Animation Set, Gauss Agile Animation Set, Aura Forma Bundle, Forma Bundle',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'SeaCamul#4790'
    },
    {
      ign: '--Q--Camul',
      platform: 'PC',
      items: 'Catchmoon Visi-vexican neg slash, Vectis Sati-visitis neg corpus, Vulkar Visi-satitox neg ammo https://imgur.com/a/DqGat2P',
      anonymous: false,
      restrictions: 'Must be able to accept the riven in trade post. Does not matter if does not meet the specific MR requirement for each riven. To be given out in 3 separate giveaways',
      notes: 'Must be able to accept the riven in trade post. Does not matter if does not meet the specific MR requirement for each riven. To be given out in 3 separate giveaways',
      tag: 'SeaCamul#4790'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: 'Staticor Toxi-satiata, Rubico Acritox, Baza Hexa-visitis, Jaw Sword Critatio, Tiberon Toxi-acrican',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Shadow_Factor',
      platform: 'PC',
      items: 'Ember Prime set, Frost Prime set,Hydroid Prime set, Kavasa Prime Kubrow Collar set, Oberon Prime set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Shadow#4431'
    },
    {
      ign: 'Remelody',
      platform: 'PC',
      items: 'Akbolto Prime Set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item Must be above MR 13',
      notes: 'Must not already have a copy of this item Must be above MR 13',
      tag: 'Sleigh#2084'
    },
    {
      ign: 'Remelody',
      platform: 'PC',
      items: 'Akjagara Prime Set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item Must be at or above MR 12',
      notes: 'Must not already have a copy of this item Must be at or above MR 12',
      tag: 'Sleigh#2084'
    },
    {
      ign: 'Remelody',
      platform: 'PC',
      items: 'Braton Prime Set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item Less than 250h in-game time',
      notes: 'Must not already have a copy of this item Less than 250h in-game time',
      tag: 'Sleigh#2084'
    },
    {
      ign: 'Remelody',
      platform: 'PC',
      items: 'Bronco Prime Set, Dakra Prime Set, Euphona Prime Set, Fang Prime Set, Fragor Prime Set, Galatine Prime Set, Gram Prime Set, Helios Prime Set, Lex Prime Set, Nami Skyla Prime Set, Nikana Prime Set, Orthos Prime Set, Paris Prime Set, Pyrana Prime Set, Rubico Prime Set, Sicarus Prime Set, Silva & Aegis Prime Set, Spira Prime Set, Sybaris Prime Set, Tiberon Prime Set, Vasto Prime Set, Hydroid Prime Set, Mirage Prime Set, Trinity Prime Set, Vauban Prime Set, Volt Prime Set, Zephyr Prime Set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Sleigh#2084'
    },
    {
      ign: 'IllogicalLogic420',
      platform: 'PC',
      items: 'Plinx Fevatis Riven',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item MR9',
      notes: 'Must not already have a copy of this item MR9',
      tag: 'CatGirls420#2383'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: 'veiled zaw riven',
      anonymous: false,
      restrictions: 'MR8+',
      notes: 'MR8+',
      tag: 'Sintharius#4284'
    },
    {
      ign: 'UltimateSmeagol',
      platform: 'PC',
      items: '4 Cernos Prime Sets, Latron Prime Set, 4 Rubico Prime Sets, Soma Prime Set, 2 Stradavar Prime Sets, 2 Sybaris Prime Sets, 2 Tiberon Prime Sets, Akjagara Prime Set, 2 Akbolto Prime Set, 4 Ballistica Prime Sets, Hikou Prime Set, 7 Pyrana Prime Sets, Sicarus Prime Set',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'UltimateSmeagol#0297'
    },
    {
      ign: 'Neon_Fighter',
      platform: 'SWITCH',
      items: 'Rattleguts Arma-lexiata, Kulstar acriton',
      anonymous: false,
      restrictions: 'Pro- 350 hours or above',
      notes: 'Pro- 350 hours or above',
      tag: 'Neon_Fighter#7250'
    },
    {
      ign: 'Chefkebab',
      platform: 'PC',
      items: 'Wukong Prime Set',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'sdheha#3863'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: '100 Platinum',
      anonymous: false,
      restrictions: '',
      notes: '',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Briggston',
      platform: 'PC',
      items: 'Unranked Primed Point Blank (1), unranked Primed Continuity (1), unranked Primed Flow (1), Mantis Set (avionics, fuselage, engines)',
      anonymous: false,
      restrictions: 'Must not already have a copy of this item',
      notes: 'Must not already have a copy of this item',
      tag: 'Briggs#0700'
    },
    {
      ign: 'Test',
      platform: 'TEST',
      items: 'Test',
      anonymous: true,
      restrictions: 'Test',
      notes: 'Test',
      tag: 'Nanamin#1103'
    },
    {
      ign: 'HegemonJoy',
      platform: 'PC',
      items: 'Tenora Riven',
      anonymous: false,
      restrictions: 'Must not own more than 5 Rivens',
      notes: 'Must not own more than 5 Rivens',
      tag: 'HegemonJoy#8807'
    },
    {
      ign: '--Q--Sintharius',
      platform: 'PC',
      items: '2x Condition Overload',
      anonymous: false,
      restrictions: 'Novice | Unowned',
      notes: 'Novice | Unowned',
      tag: 'Sintharius#4284'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: 'Arcane Arachne R0 X3, Arcane Avenger R0 X2, Arcane Awakening R0 X6, Arcane Deflection R0 X4, Arcane Momentum R0 X1',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Revanx',
      platform: 'PC',
      items: 'Arcane Acceleration R0 X3, Arcane Agility R0 X9, Arcane Consequence R0 X8, Arcane Eruption R0 X5, Arcane Fury R0 X7, Arcane Nullifier R0 X8, Arcane Phantasm R0 X2',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Revanx#0001'
    },
    {
      ign: 'HegemonJoy',
      platform: 'PC',
      items: 'Tenora Riven',
      anonymous: false,
      restrictions: 'Must not own more than 5 Rivens',
      notes: 'Must not own more than 5 Rivens',
      tag: 'HegemonJoy#8807'
    },
    {
      ign: 'shadowmega',
      platform: 'NINTENDO SWITCH',
      items: 'Acrid Sati-armaata',
      anonymous: false,
      restrictions: 'Must be mr15',
      notes: 'Must be mr15',
      tag: 'mesaprime300#0499'
    },
    {
      ign: 'persialex',
      platform: 'PC',
      items: 'Gorgon Wraith Set, Gorgon Wraith Set',
      anonymous: false,
      restrictions: 'must be MR7+ and not already own the item',
      notes: 'must be MR7+ and not already own the item',
      tag: 'persi#6899'
    },
    {
      ign: 'Azul',
      platform: 'PC',
      items: 'Arcane Energize R3',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Schrödingerの猫#7693'
    },
    {
      ign: 'd3zcx',
      platform: 'PC',
      items: 'Gorgon Wraith Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'D3zcx_ALT#4707'
    },
    {
      ign: 'JusCola',
      platform: 'SWITCH',
      items: 'Jolt',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'Cola#1111'
    },
    {
      ign: '-SG-BlamBlam',
      platform: 'PC',
      items: '250 Platinum',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Blam Blam!#7628'
    },
    {
      ign: 'dark20knight',
      platform: 'STEAM',
      items: 'Ayatan Sah Sculpture',
      anonymous: false,
      restrictions: 'non',
      notes: 'non',
      tag: 'mahmoud#3153'
    },
    {
      ign: 'Neon_Fighter',
      platform: 'SWITCH',
      items: 'Combustion Beam, Accelerated Blast, Coacation Drift, Constitution, Critical Deceleration, Quick Thinking, Seeking Fury',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'Neon_Fighter#7250'
    },
    {
      ign: 'Remelody',
      platform: 'PC',
      items: 'Bronco Prime Set, Dakra Prime Set, Euphona Prime Set, Fang Prime Set, Fragor Prime Set, Galatine Prime Set, Gram Prime Set, Helios Prime Set, Lex Prime Set, Nami Skyla Prime Set, Nikana Prime Set, Orthos Prime Set, Paris Prime Set, Pyrana Prime Set, Rubico Prime Set, Sicarus Prime Set, Silva & Aegis Prime Set, Spira Prime Set, Sybaris Prime Set, Tiberon Prime Set, Vasto Prime Set, Hydroid Prime Set, Mirage Prime Set, Trinity Prime Set, Vauban Prime Set, Volt Prime Set, Zephyr Prime Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Phanini#0001'
    },
    {
      ign: 'BEBrowntrey',
      platform: 'PS4',
      items: 'Stubba Gelisus, Sybaris Armahexaton',
      anonymous: true,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'BEBrowntrey#0505'
    },
    {
      ign: 'KentangKemplu',
      platform: 'PC',
      items: 'Platinum',
      anonymous: true,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'Isa Habsyi#8956'
    },
    {
      ign: '-SG-BlamBlam',
      platform: 'PC',
      items: 'Arcane Grace Rank3',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Blam Blam!#7628'
    },
    {
      ign: 'Melon',
      platform: 'PC',
      items: 'Corinth Critatin, Tombfinger Sci-zetitron, Stubba Argi-zetitio, Strun Pura-ignicron',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'MelonDaMelon🍈#1069'
    },
    {
      ign: 'Melon',
      platform: 'PC',
      items: 'Rhino Prime Sets X 2',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'MelonDaMelon🍈#1069'
    },
    {
      ign: 'addon666',
      platform: 'PC',
      items: 'Boltor Visinok R8',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Sorrow#9604'
    },
    {
      ign: 'addon666',
      platform: 'PC',
      items: 'Boltor Visinok R8',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Sorrow#9604'
    },
    {
      ign: 'dark20knight',
      platform: 'STEAM',
      items: 'Ayatan Sah Sculpture',
      anonymous: true,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'mahmoud#3153'
    },
    {
      ign: 'MAX20091',
      platform: 'PC',
      items: 'Armored Agility',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'max20091#7318'
    },
    {
      ign: 'MAX20091',
      platform: 'PC',
      items: 'Chilling Reload',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'max20091#7318'
    },
    {
      ign: 'MAX20091',
      platform: 'PC',
      items: 'Blaze, Chilling Reload',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'max20091#7318'
    },
    {
      ign: 'MAX20091',
      platform: 'PC',
      items: 'Blaze, Chilling Reload',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'max20091#7318'
    },
    {
      ign: 'shadowmega',
      platform: 'NINTENDO SWITCH',
      items: 'Azima Arma-ignicon Arca Scisco Sci-vexiata Attica Visi-ignido',
      anonymous: false,
      restrictions: 'Must be at least mr14 or above',
      notes: 'Must be at least mr14 or above',
      tag: 'mesaprime300#0499'
    },
    {
      ign: 'Insaniqli',
      platform: 'PC',
      items: 'Mesa Prime Blueprint, Mesa Prime Chassis Blueprint',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Hatted Tiktik#5952'
    },
    {
      ign: '--Q--Camul',
      platform: 'PC',
      items: 'Gauss Noble Animation Set, Gauss Agile Animation Set',
      anonymous: false,
      restrictions: 'N',
      notes: 'N',
      tag: 'SeaCamul#4790'
    },
    {
      ign: 'Hannah_Teresa',
      platform: 'PC',
      items: '4 Huras Kubrow Imprints, 4 Sunika Kubrow Imprints',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Hannah#5157'
    },
    {
      ign: 'Melon',
      platform: 'PC',
      items: 'Rhino Prime Set * 2',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'MelonDaMelon🍈#1069'
    },
    {
      ign: 'KentangKemplu',
      platform: 'PC',
      items: 'Gram Riven, Paracesis Riven',
      anonymous: false,
      restrictions: 'MR 8',
      notes: 'MR 8',
      tag: 'Isa Habsyi#8956'
    },
    {
      ign: 'RWBY-WhiteRose',
      platform: 'PC',
      items: 'Kunai Zetiata Https://media.discordapp.net/attachments/487093399741267972/620983577491931146/image0.png',
      anonymous: false,
      restrictions: 'Recipients must either have the Kunai but not a riven for it or have a riven transmuter Must be MR9+',
      notes: 'Recipients must either have the Kunai but not a riven for it or have a riven transmuter Must be MR9+',
      tag: 'Rose#7002'
    },
    {
      ign: 'Melon',
      platform: 'PC',
      items: 'Peculiar Bloom *3, Peculiar Growth *1',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'MelonDaMelon🍈#1069'
    },
    {
      ign: 'GetPumpedWithNut',
      platform: 'PS4',
      items: 'Sets, Rivens.',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Tyler.#9202'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: '500 Platinum',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: '--Q--DrJaska',
      platform: 'PC',
      items: 'Vulkar Critatio, Vulkar Critapha',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Dr. Jaska#7517'
    },
    {
      ign: 'TheForbiddenSniper',
      platform: 'PC',
      items: 'Vectis Riven, Lex Riven',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Un-Necessary#0043'
    },
    {
      ign: 'SSI_Erebus',
      platform: 'PC',
      items: '100 Platinum',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Lord Of Erebus#5302'
    },
    {
      ign: 'Ursin',
      platform: 'STEAM PC',
      items: 'Hiveswap: Act 1',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Novibear of Pants#2725'
    },
    {
      ign: 'HegemonJoy',
      platform: 'PC',
      items: 'Any Red Veil Augment Mod Of The Winners Choice',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'HegemonJoy#8807'
    },
    {
      ign: 'Trapologist',
      platform: 'PC',
      items: 'Kappa Beacon 1x',
      anonymous: false,
      restrictions: 'MR 12+',
      notes: 'MR 12+',
      tag: 'Stexen(Trapologist)#7618'
    },
    {
      ign: 'XanZath',
      platform: 'PC',
      items: 'Arcane Avenger R3',
      anonymous: true,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'XanZath#4335'
    },
    {
      ign: 'chirpingcodpeice',
      platform: 'PC',
      items: 'Any Steel Meridian Augments, Winners Choice',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Emotionalism#4672'
    },
    {
      ign: 'Oriens',
      platform: 'PC',
      items: 'Bite (R10)',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Kuriyens#0004'
    },
    {
      ign: 'TheForbiddenSniper',
      platform: 'PC',
      items: 'Hate Riven, Galatine Riven',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Un-Necessary#0043'
    },
    {
      ign: 'Squarewave',
      platform: 'PC',
      items: 'Braton Visipha,burston Scitron',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'saltyeyes#9386'
    },
    {
      ign: 'Jaguwar',
      platform: 'PC',
      items: 'Paris Prime Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'PC_Pierce#3668'
    },
    {
      ign: 'BlaydeArmyGames',
      platform: 'XBOX',
      items: 'Call Of Duty: Modern Warfare Beta Redemption Code',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: '/u/Blayde_Army#5598'
    },
    {
      ign: 'Warrior-EN-',
      platform: 'PC',
      items: 'Bulky Sahasa Kubrow',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'Cosmos96#3856'
    },
    {
      ign: 'Warrior-EN-',
      platform: 'PC',
      items: 'Wolf Sledge Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Cosmos96#3856'
    },
    {
      ign: 'ElmoIsNowGOdly',
      platform: 'PC',
      items: 'Magus Vigor R3',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'Meth Man#9817'
    },
    {
      ign: 'JamesTwice',
      platform: 'PC',
      items: 'Attica Gelitak, Cyath Puranent',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'JamesTwice#9548'
    },
    {
      ign: 'LilPisces',
      platform: 'PC',
      items: 'Riven Mod (Galatine Critatox)',
      anonymous: true,
      restrictions: 'Must be MR15 or above Unowned - The winner must not already have a copy of this item.',
      notes: 'Must be MR15 or above Unowned - The winner must not already have a copy of this item.',
      tag: 'Pisces#4270'
    },
    {
      ign: 'LilPisces',
      platform: 'PC',
      items: 'Galatine Critatox',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Pisces#4270'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Tiberon Prime Set',
      anonymous: false,
      restrictions: 'Unmastered Must have Plat Balance Less than 50P',
      notes: 'Unmastered Must have Plat Balance Less than 50P',
      tag: 'RH#1060'
    },
    {
      ign: 'Frostillus',
      platform: 'PC',
      items: 'Tiberon Prime Set (Minimum Mastery: 15)',
      anonymous: false,
      restrictions: 'Unowned - Must not already have a copy of this item Plat balance less than 50P.',
      notes: 'Unowned - Must not already have a copy of this item Plat balance less than 50P.',
      tag: 'RH#1060'
    },
    {
      ign: 'Zaza7',
      platform: 'PC',
      items: 'Magus Repair',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time. Unowned - The winner must not already have a copy of this item.',
      notes: 'Novice - Less than 250h in-game time. Unowned - The winner must not already have a copy of this item.',
      tag: 'Zaza#7777'
    },
    {
      ign: 'Zaza7',
      platform: 'PC',
      items: 'Pyrana Prime Set',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time. Unowned - The winner must not already have a copy of this item.',
      notes: 'Novice - Less than 250h in-game time. Unowned - The winner must not already have a copy of this item.',
      tag: 'Zaza#7777'
    },
    {
      ign: 'LT Seanoodle',
      platform: 'XBOX ONE',
      items: "Mirage Set, Mesa Set, Banshee Set, And A Ps4 Glyph Code (Glyph Image Can Be Issued If You'd Like, I Don't Know How Long These Kind Of Codes Last, But I've Been Sitting On It For Months)",
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Amev#0004'
    },
    {
      ign: '--Q--Camul',
      platform: 'PC',
      items: 'Https://imgur.com/a/pnk9xus, Mire Riven 47k Endo Value. Im Sick Of Looking At This Damned Thing',
      anonymous: false,
      restrictions: 'N',
      notes: 'N',
      tag: 'SeaCamul#4790'
    },
    {
      ign: 'Warrior-EN-',
      platform: 'PC',
      items: 'Brief Respite, Emp Aura, Rejuvenation, Shotgun Amp, Stand United, Toxin Resistance All Maxed.',
      anonymous: false,
      restrictions: 'Novice - Less than 250h in-game time.',
      notes: 'Novice - Less than 250h in-game time.',
      tag: 'Cosmos96#3856'
    },
    {
      ign: 'VSPreston',
      platform: 'PC',
      items: 'Detron Sati-decitox, Detron Visi-fevatis',
      anonymous: false,
      restrictions: 'above or at required MR for respective rivens',
      notes: 'above or at required MR for respective rivens',
      tag: 'VSPreston#7835'
    },
    {
      ign: 'NovaBlade321',
      platform: 'PC',
      items: 'Xbox One Umbra Noggle+170p Code, Nintendo Switch Umbra Noggle+170p Code, Ps4 Umbra Noggle+170p Code',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Wraith#1958'
    },
    {
      ign: 'Warrior-EN-',
      platform: 'PC',
      items: 'Virtous Shadow R3',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time.',
      notes: 'Beginner - Up to 100h in-game time.',
      tag: 'Cosmos96#3856'
    },
    {
      ign: 'SkaRiot',
      platform: 'PC',
      items: 'Ignis Wraith',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'SkaRiot#5121'
    },
    {
      ign: 'Zaza7',
      platform: 'PC',
      items: 'Forma Bundle',
      anonymous: false,
      restrictions: 'n',
      notes: 'n',
      tag: 'Zaza#7777'
    },
    {
      ign: 'Rev',
      platform: 'TEST',
      items: 'Test',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Revanx#0001'
    },
    {
      ign: 'Remelody',
      platform: 'PC',
      items: 'Akbolto Prime Set, Akjagara Prime Set, Bronco Prime Set, Dakra Prime Set, Euphona Prime Set, Fang Prime Set, Fragor Prime Set, Galatine Prime Set, Gram Prime Set, Helios Prime Set, Lex Prime Set, Nami Skyla Prime Set, Nikana Prime Set, Orthos Prime Set, Paris Prime Set, Pyrana Prime Set, Rubico Prime Set, Sicarus Prime Set, Silva & Aegis Prime Set, Spira Prime Set, Sybaris Prime Set, Tiberon Prime Set, Vasto Prime Set, Hydroid Prime Set, Mirage Prime Set, Trinity Prime Set, Vauban Prime Set, Volt Prime Set, Zephyr Prime Set',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'Sleigh#2084'
    },
    {
      ign: 'LT Seanoodle',
      platform: 'XBOX ONE',
      items: 'Saryn Prime, Mirage Prime, Gram Prime, Rubico Prime, Destreza Prime',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Amev#0004'
    },
    {
      ign: 'MunsuLight',
      platform: 'PC',
      items: 'Krohkur Crita-loctinem Riven',
      anonymous: false,
      restrictions: 'Unowned - The winner must not already have a copy of this item.',
      notes: 'Unowned - The winner must not already have a copy of this item.',
      tag: 'MetalEmmanuel(MunsuLight)#3129'
    },
    {
      ign: 'Impulse Craft',
      platform: 'XBOX ONE',
      items: 'Forma Bundle',
      anonymous: false,
      restrictions: 'Beginner - Up to 100h in-game time. Novice - Less than 250h in-game time.',
      notes: 'Beginner - Up to 100h in-game time. Novice - Less than 250h in-game time.',
      tag: 'Zenith Gaming#2354'
    },
    {
      ign: 'LT Seanoodle',
      platform: 'XBOX ONE',
      items: 'Tiberon Prime, Reaper Prime, Mesa Prime, Sybaris Prime, Nyx Prime, Ember Prime, Nami Skyla Prime',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Amev#0004'
    },
    {
      ign: 'TheCakeFR',
      platform: 'XBOX',
      items: 'Glyph Code',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Élitross#1056'
    },
    {
      ign: 'TheCakeFR',
      platform: 'XBOX ONE',
      items: 'Glyph',
      anonymous: false,
      restrictions: 'N/A',
      notes: 'N/A',
      tag: 'Élitross#1056'
    }
  ]
};

const db = new sqlite3.Database("wfgb.db")
const tables = Object.keys(data);

for (let table in tables) {
}