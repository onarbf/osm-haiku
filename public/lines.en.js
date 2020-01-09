// https://openweathermap.org/weather-conditions

const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ']
const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/

const getNumWord = (num) => {
  if ((num = num.toString()).length > 9) {
    throw new Error('overflow') // Does not support converting more than 9 digits yet
  }

  const n = ('000000000' + num).substr(-9).match(regex)
  if (!n) return

  let str = ''
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : ''
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : ''
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : ''
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : ''
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : ''

  return str.trim()
}

const getOrdinal = (n) => {
  const s = ['th','st','nd','rd']
  const v = n % 100
  return n+(s[(v-20)%10]||s[v]||s[0])
}


window.lines = [
  {
    template: ['El mundo es grande', 'Perdido en la ciudad', 'El paso del tiempo', 'Pensamientos de casa', 'Pienso en mi hogar', 'Abandono mi hogar', 'Pienso en ti', 'Me acerco', 'Muy lejos', 'Esta es la esencia que queda']
  },
  {
    template: ['La noche está oscura', 'Under the moonlight', 'A moonless night', 'The stars far away', 'Murmurs in her sleep', 'A night stroll', 'Sweet dreams'],
    condition: (el, env) => env.moment === 'night',
  },
  {
    template: ['Buenas... tardes?', 'El día se acaba', 'es mediodía', 'El día pasa'],
    condition: (el, env) => env.moment === 'afternoon',
  },
  {
    template: ['El día es joven', 'El aire está crispado', 'Buenos días', 'Mañana triste'],
    condition: (el, env) => env.moment === 'morning',
  },
  {
    template: el => [
      `Bienvenido a ${el.name}`,
      `Así es como es en ${el.name}`,
      `Otro día en${el.name}`,
      `La vida en ${el.name}`,
      `Me siento mal en ${el.name}`,
      `Hoy en ${el.name}`,
    ][Math.floor(Math.random() * 6)],
    tags: [['admin_level', '4'], ['admin_level', '5'],  ['admin_level', '6'], ['boundary', 'political']],
    needsName: true
  },
  {
    template: ['Your reflection', 'Water like glass', 'Floating there', 'Quiet water', 'On the water\'s surface'],
    tags: [['waterway', 'canal'], ['waterway', 'river'], ['natural', 'water'], ['water', 'river']]
  },
  {
    template: ['Frostbite', 'It\'s freezing', 'So cold'],
    condition: (el, env) => env.temperature < 0,
  },
  {
    template: ['Cold bites', 'Quite chilly'],
    condition: (el, env) => env.temperature < 10,
  },
  {
    template: ['Quite warm here'],
    condition: (el, env) => env.temperature > 20,
  },
  {
    template: ['It is very hot.', 'A drop of sweat'],
    condition: (el, env) => env.temperature > 30,
  },
  {
    template: ['Into sunshine', 'The sun scatters', 'Toward the sun', 'A ray of sunlight', 'With sunlight', 'The sun strikes', 'Sun is shining'],
    condition: (el, env) => (env.weatherConditions.clear && env.moment !== 'night'),
  },
  {
    template: ['Wet to the bone', 'Rain on the road like a mirror', 'Soaked pants', 'Pouring rain', 'Rain drops', 'A dark rain'],
    condition: (el, env) => env.weatherConditions.rain || env.weatherConditions.drizzle,
  },
  {
    template: ['So many books', 'Falls from the book', 'On the shelves', 'Yellowed pages', 'A blurry paragraph', 'An old book'],
    tags: [['amenity','library'], ['shop', 'books']],
  },
  {
    template: ['Yawns in the classroom', 'A day of learning starts'],
    tags: [['amenity','university'],['amenity','school']],
    condition: (el, env) => env.moment === 'morning',
  },
  {
    template: ['Those kids would rather be outside', 'Another depressed teacher'],
    tags: [['amenity','school']],
    condition: (el, env) => env.moment === 'afternoon',
  },
  {
    template: ['No one sends letters anymore', 'Where are those letters going to?', 'To whom it may concern', 'Dear you', 'A love letter'],
    tags: [['amenity','post_box']]
  },
  {
    template: ['Meando', 'Necesito mear', 'Tiran de la cadena'],
    tags: [['amenity','toilets']]
  },
  {
    template: 'The ferry arrives late again',
    tags: [['route','ferry']]
  },
  {
    template: ['A couple getting a loan', 'A couple getting a mortgage'],
    tags: [['amenity','bank']],
    condition: (el, env) => env.moment === 'morning',
  },
  {
    template: ['The scent of money', 'On the bank statement', 'On the cashpoint screen', 'No money left'],
    tags: [['amenity','bank'], ['amenity', 'atm']]
  },
  {
    template: ['A supermarket hustle and bustle', 'Salad cabbage and carrots', 'The cashier\'s bored', 'A lonely aisle', 'Under the neon', 'Fresh produce'],
    tags: [['shop', 'supermarket']]
  },
  {
    template: ['A deserved vacation', 'Planning our trip', 'All inclusive'],
    tags: [['shop', 'travel_agency']]
  },
  {
    template: ['Dummies staring behind the glass', 'A red dress', 'A blue shirt', 'My summer dress', 'Fabric on skin'],
    tags: [['shop', 'clothes']]
  },
  {
    template: ['Cooking ustensils', 'I need new knives'],
    tags: [['shop', 'houseware']]
  },
  {
    template: ['The smell of fresh bread', 'Our daily bread', 'A baker rests', 'No bread left', 'Bread crumbs'],
    tags: [['shop', 'bakery']]
  },
  {
    template: ['Dead animals', 'Meat is murder', 'Carcasses hanging', 'A bloody scene', 'Death for no reason is murder', 'The calf that you carve with a smile', 'Do you know how animals die?'],
    tags: [['shop', 'butcher']]
  },
  {
    template: ['Short around the ears?', 'Snip snip snip', 'Start with the shampoo', 'Just a little trim to tidy it up', 'Just a little bit shorter', 'Hairdresser on fire'],
    tags: [['shop', 'hairdresser']]
  },
  {
    template: ['You\'ll fall down the stairs', 'A flight of steps', 'Slippery stairs', 'Step by step'],
    tags: [['highway', 'steps']]
  },
  {
    template: (el, env) => `Cafe café en ${el.name}`,
    tags: [['amenity', 'cafe'], ['cuisine', 'coffee_shop']],
    condition: (el, env) => env.moment === 'morning',
    needsName: true
  },
  {
    template: (el, env) => [
      `El aire sabe  ${el.name}`,
      `${el.name}, placer`,
      `Morder ${el.name} en ${env.moment}?`,
      `Hay una mesa en el ${el.name}`,
    ][Math.floor(Math.random()*4)],
    tags: [['amenity', 'restaurant']],
    needsName: true
  },
  {
    template: ['Eres lo que comes', 'El camarero me mira'],
    tags: [['amenity', 'restaurant']]
  },
  {
    template: ['Necesito un cafe', 'El café huele bien', 'Le cojo un café', 'El mismo café otra vez', 'La taza aún está caliente'],
    tags: [['amenity', 'cafe'], ['cuisine', 'coffee_shop']]
  },
  {
    template: ['La botella está vacía', 'Ella bebe', 'La camarera sirve', 'El ardor del whisky', 'El ardor del whisky', 'El ardor del whisky', 'Muerdo vino', 'Soy un borracho'],
    tags: [['amenity', 'bar'], ['amenity', 'pub']]
  },
  {
    template: (el) => `Emborrachándome en ${el.name}`,
    tags: [['amenity', 'bar'], ['amenity', 'pub']],
    needsName: true
  },
  {
    template: (el) => `Una cerveza en ${el.name}`,
    tags: [['amenity', 'bar'], ['amenity', 'pub']],
    needsName: true
  },
  {
    template: ['Pineapple on pizzas ?', 'I don\'t eat the pizza crust', 'High on wheat and cheese', 'Pepperoni and cheese', 'The faint memory of Napoli', 'Hot calzone'],
    tags: [['cuisine', 'pizza']]
  },
  {
    template: ['Smells garlic', 'Buon appetito'],
    tags: [['cuisine', 'italian']]
  },
  {
    template: ['A round bun with sesame', 'Juicy burgers and moist buns', 'Flipping burgers'],
    tags: [['cuisine', 'burger']]
  },
  {
    template: ['Spring roll', 'Dim sum', 'A lonely noodle', 'A century old egg'],
    tags: [['cuisine', 'chinese']]
  },
  {
    template: ['A plate of sushi', 'Ginger and wasabi', 'Sake to wash it down'],
    tags: [['cuisine', 'japanese']]
  },
  {
    template: ['Hot jalapeños', 'Mexico in my heart'],
    tags: [['cuisine', 'mexican']]
  },
  {
    template: ['Remember Istanbul', 'Delicious köfte'],
    tags: [['cuisine', 'turkish'], ['cuisine', 'kebab']],
  },
  {
    template: ['A lonely shoe there','These boots are made for walking'],
    tags: [['shop','shoes']]
  },
  {
    template: 'Calor en los pabellones',
    tags: [['surface', 'paving_stones']],
    condition: (el, env) => env.temperature > 20
  },
  {
    template: ['Huele a grasa', 'Patatas fritas tristes', 'Profundamente quemado'],
    tags: [['amenity', 'fast_food']]
  },
  {
    template: 'A poor soul on a bench',
    tags: [['amenity', 'bench'], ['bench', 'yes']],
    condition: (el, env) => env.moment === 'night'
  },
  {
    template: 'Glass shattered',
    tags: [['recycling:glass', 'true']],
  },
  {
    template: 'Commuting back home',
    tags: [['subway', 'yes'], ['railway', 'subway_entrance']]
  },
  {
    template: ['Should we take the metro?', 'Warm air from the subway entrance'],
    tags: [['railway', 'subway_entrance']]
  },
  {
    template: 'Going to work',
    tags: [['subway', 'yes'], ['railway', 'subway_entrance']],
    condition: (el, env) => env.moment === 'morning'
  },
  {
    template: 'Someone has cut in line at the theater',
    tags: [['amenity', 'theatre']],
    condition: (el, env) => env.moment === 'evening'
  },
  {
    template: 'Is it too early for a beer?',
    tags: [['amenity', 'pub']],
    condition: (el, env) => env.moment === 'morning'
  },
  {
    template: ['The tourists are already sleeping'],
    tags: [['tourism', 'hotel']],
    condition: (el, env) => env.moment === 'evening'
  },
  {
    template: ['Otra vez contra las ventantas', 'El gerente escucha', 'Se escurren las cucarachas', `Room ${Math.floor(Math.random() * 100)}`],
    tags: [['tourism', 'hotel']]
  },
  {
    template: el => `En el hall de ${el.name}`,
    tags: [['tourism', 'hotel']],
    needsName: true
  },
  {
    template: ['Praise him', 'Time to pray'],
    tags: [['amenity', 'place_of_worship']],
    condition: (el, env) => new Date().getDay() >= 6 && env.moment === 'morning'
  },
  {
    template: ['In the garage', 'In the garage where I belong'],
    tags: [['building', 'garage']]
  },
  {
    template: ['A skyscraper', 'A skyscraper towers above the city', 'Reaching the sky'],
    tags: [['building:levels', '*']],
    condition: (el) => parseInt(el.tags['building:levels']) >= 20
  },
  {
    template: el => {
      const ele = parseInt(el.tags['building:levels'])

      const ordinal = getOrdinal(ele)
      console.log(ele)

      const line = [
        `Looking at you from the ${ordinal} floor`,
        `She looks from the ${ordinal} floor`,
        `All the way up to the ${ordinal} floor`
      ][Math.floor(Math.random() * 3)]
      return line
    },
    tags: [['building:levels', '*']],
    condition: (el) => parseInt(el.tags['building:levels']) >= 1
  },
  {
    template: el => {
      const ele = parseInt(el.tags['building:levels'])
      const num = getNumWord(ele)
      const line = [
        `Yo cuento ${num} pisos`,
        `Un ${num} piso`,
        `${num.charAt(0).toUpperCase() + num.slice(1)} floors high`,
      ][Math.floor(Math.random() * 3)]
      return line
    },
    tags: [['building:levels', '*']],
    condition: (el) => parseInt(el.tags['building:levels']) >= 3
  },
  {
    template: ['Cruzando el paso de cebra', 'Lineas blancas en el suelo', 'Cruzando la acera'],
    tags: [['footway', 'crossing'], ['highway', 'crossing']],
  },
  {
    template: 'A hero remembered',
    tags: [['historic', 'memorial'], ['historic', 'monumet']],
  },
  {
    template: ['Verde. Rojo. Verde. Rojo.', 'Las luces se ponen en rojo'],
    tags: [['highway', 'traffic_signals']],
  },
  {
    template: ['En la carretera', 'Un camión hace ruido', 'Carretera ocupada', 'a través de la ruidosa carretera', 'Un camión pasa'],
    tags: [['highway', 'motorway']],
  },
  {
    template: ['On the bridge with love locks', 'On the other side', 'Of the bridge', 'Over the bridge', 'Under the bridge'],
    tags: [['bridge', 'yes']],
  },
  {
    template: ['A halo in the dark', 'Moths flocking around the light'],
    tags: [['highway', 'street_lamp']],
    condition: (el, env) => env.moment === 'night'
  },
  {
    template: 'A train underneath',
    tags: [['subway', 'route']],
  },
  {
    template: ['Buses passing through', 'The bus honking', 'The warm belly of the bus'],
    tags: [['route', 'bus']],
  },
  {
    template: ['Una parada de bus', 'Un autobús espera', 'El autobús no espera'],
    tags: [['highway', 'bus_stop']],
  },
  {
    template: (el) => `A bus arriving at ${el.name}`,
    tags: [['highway', 'bus_stop']],
    needsName: true,
  },
  {
    template: ['The grass is green', 'A walk in the park', 'A bird in the tree'],
    tags: [['leisure', 'park']],
  },
  {
    template: 'Late night stroll',
    tags: [['leisure', 'park']],
    condition: (el, env) => env.moment === 'night',
  },
  {
    template: ['High up in the trees', 'Branches of the tree'],
    tags: [['natural', 'wood'], ['natural', 'tree']],
  },
  {
    template: ['Can you hear the seagulls ?', 'Scent of the sea', 'The sea breeze', 'Tide change', 'Salty air', 'Out to the sea', 'The shades of the sea', 'From the tidal pool', 'The murmur of waves'],
    tags: [['natural', 'coastline']],
  },
  {
    template: ['A vacant lot', 'In this empty place', 'This is a wasteland'],
    tags: [['landuse', 'brownfield']],
  },
  {
    template: ['Rest in peace', 'Forever remember', 'A great sadness', 'The small headstone', 'Cemetary walk', 'Her name on the marble', 'At the funeral'],
    tags: [['landuse', 'cemetery'], ['amenity', 'grave_yard']]
  },
  {
    template: ['This is spooky', 'Something evil\'s lurking from the dark', 'Thriller night'],
    tags: [['landuse', 'cemetery'], ['amenity', 'grave_yard']],
    condition: (el, env) => env.moment === 'night'
  },
  {
    template: ['A splash of green', 'The grass is always greener', 'Blades of grass', 'A small weed', 'Dry grass', 'Wind in the clover', 'Grows high grass'],
    tags: [['landuse', 'grass']]
  },
  {
    template: ['El urido de las máquinas', 'Se colma de ruido', 'A building will rise', 'Digging and drilling', 'The construction site'],
    tags: [['landuse', 'construction']]
  },
  {
    template: ['I hear the train coming', 'From a passing train', 'On the rail track'],
    tags: [['landuse', 'railway']]
  },
  {
    template: ['Two children', 'Chasing laughter', 'Children playing'],
    tags: [['landuse', 'recreation_ground']]
  },
  {
    template: ['There is electricity in the air', 'A deep buzz'],
    tags: [['power', '*']]
  },
  {
    template: ['There\'s no crossing that fence', 'The broken fence', 'Crossing the fence'],
    tags: [['barrier', 'fence']]
  },
  {
    template: ['Learn your lesson','The teacher asks the kids', 'On the school wall', 'A student writing', 'By the school gate'],
    tags: [['amenity', 'school']],
  },
  {
    template: ['A car sleeping', 'Rearview mirrors', 'A stalled car', 'That old car', 'An abandoned car', 'Hunting for a parking spot', 'Leaves on the windshield', 'Shiny new cars'],
    tags: [['amenity', 'parking']],
  },
  {
    template: ['Bikes like metal skeletons', 'Locked wheels', 'Lots of bikes', 'That bike is missing a wheel'],
    tags: [['amenity', 'bicycle_parking']],
  },
  {
    template: ['On two wheels', 'Speeding on a bike'],
    tags: [['cycleway:right', '*']],
  },
  {
    template: ['Time for contemplation', 'God is here', 'Hear our prayer'],
    tags: [['amenity', 'place_of_worship']],
  },
  {
    template: ['La azul o la roja', 'me da miedo su bata', 'Take your medication', 'escribe una receta', 'Efectos colaterales', 'Una aspirina por favor'],
    tags: [['amenity', 'pharmacy']],
  },
  {
    template: ['The hospital\'s cold corridors', 'Ambulances come and go', 'It\'s an emergency', 'A nurse smoking', 'A bubble in the syringe', 'Hospital room', 'A young nurse', 'Lifeline'],
    tags: [['amenity', 'hospital']]
  },
  {
    template: ['Night shift starts'],
    tags: [['amenity', 'hospital']],
    condition: (el, env) => env.moment === 'evening'
  },
  {
    template: ['I put on my uniform', 'You\'re under arrest', 'Bad cops', 'Good cops', 'To serve and protect'],
    tags: [['amenity', 'police']]
  },
  {
    template: ['Contestará alguien el teléfono', 'Inserte una moneda'],
    tags: [['amenity', 'telephone']],
  },
  {
    template: ['Huele a gasolina', 'Huele a libertad'],
    tags: [['amenity', 'fuel']],
  },
  {
    template: ['Basura y colillas', 'Basura en la calle', 'Huele a ciudad', 'Flies and maggots'],
    tags: [['amenity', 'waste_basket']],
  },
  {
    template: ['Olor de cloro', 'Correr está prohibido', 'El agua te atrapa', 'Bañador y gafas de buceo'],
    tags: [['leisure', 'swimming_pool']],
  },
  {
    template: ['Agua a presión', 'Agua que quiere salir'],
    tags: [['emergency', 'fire_hydrant']],
  },
  {
    template: (el) => `What would ${el.name} think?`,
    tags: [['historic', 'memorial']],
    needsName: true
  },
  {
    template: (el) => `${el.name} looks at you`,
    tags: [['historic', 'memorial']],
    needsName: true
  },
  {
    template: 'Una elegante escultura',
    tags: [['artwork_type','sculpture']]
  },
  {
    template: (el) => el.name,
    tags: [['tourism','artwork']]
  },

  {
    template: (el, env) => `Estoy en ${el.tags['addr:street']}, ${el.tags['addr:housenumber']}.`,
    condition: (el, env) => el.tags['addr:street'] !== undefined && el.tags['addr:housenumber'] !== undefined
  },
  {
    template: (el) =>
      [
        `Encuéntrame en ${el.tags['addr:street']}`,
        `A través de ${el.tags['addr:street']}`,
        `Cruzando por ${el.tags['addr:street']}`,
        `Caminando en${el.tags['addr:street']}`,
      ][Math.floor(Math.random()*4)],
    condition: (el) => el.tags['addr:street'] !== undefined
  },
  {
    template: (el) => el.tags['addr:street'],
    condition: (el, env) => el.tags['addr:street'] !== undefined
  },
]
