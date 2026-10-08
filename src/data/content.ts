/**
 * Luxury Horology Content & Data Model
 * AURA SWISS - Precision Horology & Calibre 10 Movement
 */

export interface WatchPart {
  id: string;
  name: string;
  subtitle: string;
  material: string;
  tolerance: string;
  description: string;
  offsetX: number; // percentage offset when exploded
  zIndex: number;
}

export interface Timepiece {
  id: string;
  name: string;
  edition: string;
  caliber: string;
  priceEur: number;
  status: 'Available' | 'Last Ones' | 'On Enquiry';
  caseSize: string;
  waterResistance: string;
  reserve: string;
  image: string;
  description: string;
}

export interface PlanTier {
  id: string;
  name: string;
  tierSubtitle: string;
  depositPrice: number;
  fullPrice: number;
  popular?: boolean;
  editionLimit: string;
  features: string[];
  specs: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  city: string;
  verifiedOwner: boolean;
  timepiece: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  kicker: string;
  description: string;
  specValue: string;
  specUnit: string;
  icon: 'movement' | 'case' | 'crystal' | 'lume' | 'seal' | 'warranty';
}

export const EXPLODED_PARTS: WatchPart[] = [
  {
    id: 'crystal',
    name: 'Dual-Curved Sapphire Crystal',
    subtitle: 'Chapter 01 · Optical Clarity',
    material: 'Corundum Crystal (Mohs 9 Hardness)',
    tolerance: '± 0.2 microns',
    description: 'Double anti-reflective treated sapphire dome withstands 30 bars of hydrostatic pressure without distortion.',
    offsetX: -42,
    zIndex: 60,
  },
  {
    id: 'dial',
    name: 'Sunray Lacquered Dial & Luminescent Indices',
    subtitle: 'Chapter 02 · Chronometric Legibility',
    material: 'Galvanised Brass & Super-LumiNova BGW9',
    tolerance: '± 0.5 microns',
    description: 'Deep midnight blue sunburst galvanic finish with diamond-cut rhodium hands filled with grade A Swiss pigment.',
    offsetX: -26,
    zIndex: 50,
  },
  {
    id: 'calendar',
    name: 'Instantaneous Date Disk',
    subtitle: 'Chapter 03 · Mechanical Complication',
    material: 'Micro-etched Nickel-Phosphorus',
    tolerance: '± 0.3 microns',
    description: 'Jumping date mechanism driven by a snail cam that shifts digits in less than 4 milliseconds at midnight.',
    offsetX: -12,
    zIndex: 40,
  },
  {
    id: 'case',
    name: '316L Monobloc Middle Case & Bezel',
    subtitle: 'Chapter 04 · Hydrodynamic Monolith',
    material: 'Cold-Forged Surgical Stainless Steel',
    tolerance: '± 0.8 microns',
    description: 'Laser-welded crown tube and ceramic uni-directional countdown bezel with platinum PVD gradations.',
    offsetX: 4,
    zIndex: 35,
  },
  {
    id: 'movement',
    name: 'Calibre 10 In-House Skeleton Movement',
    subtitle: 'Chapter 05 · The Mechanical Heart',
    material: 'Cupro-Beryllium & German Silver with 29 Rubies',
    tolerance: '± 0.1 microns',
    description: 'Free-sprung Glucydur balance wheel vibrating at 28,800 beats per hour with paramagnetic hairspring.',
    offsetX: 20,
    zIndex: 30,
  },
  {
    id: 'rotor',
    name: '22K Gold Bi-Directional Rotor',
    subtitle: 'Chapter 06 · Kinetic Momentum',
    material: 'Solid 22-Karat Gold with Ceramic Ball Bearings',
    tolerance: '± 0.4 microns',
    description: 'High-density winding mass generates 70 hours of autonomous chronometer reserve with every wrist gesture.',
    offsetX: 34,
    zIndex: 20,
  },
  {
    id: 'caseback',
    name: 'Hermetic Exhibition Caseback & Bracelet',
    subtitle: 'Chapter 07 · Sealed Against The Deep',
    material: '316L Stainless Steel & Fluorocarbon Gasket',
    tolerance: '± 0.3 microns',
    description: 'Six micro-screws securing dual O-rings rated to 300 meters, completed with solid 3-link oyster bracelet.',
    offsetX: 48,
    zIndex: 10,
  },
];

export const TIMEPIECES: Timepiece[] = [
  {
    id: 'belmont',
    name: 'AURA Belmont',
    edition: 'Carré Skeleton · Ref. BL-408',
    caliber: 'Calibre 10S Automatic',
    priceEur: 8800,
    status: 'Available',
    caseSize: '39.5 × 39.5 mm',
    waterResistance: '100m / 330ft',
    reserve: '70 Hours',
    image: '/src/assets/images/timepiece_belmont_steel_1791433859721.jpg',
    description: 'Architectural geometry meeting haute horlogerie skeleton bridges. Polished bevels and blued flame hands.',
  },
  {
    id: 'steinach',
    name: 'AURA Steinach',
    edition: 'Pavilion Chronograph · Ref. ST-2716',
    caliber: 'Calibre 12 Flyback',
    priceEur: 9100,
    status: 'Last Ones',
    caseSize: '41.0 mm',
    waterResistance: '150m / 500ft',
    reserve: '65 Hours',
    image: '/src/assets/images/timepiece_steinach_rose_gold_1791433871896.jpg',
    description: 'Warm rose gold indices upon charcoal sunray finish with column-wheel clutch and sapphire exhibition display.',
  },
  {
    id: 'deep-sea',
    name: 'AURA Calibre 10 Diver',
    edition: 'Sealed Ocean Master · Ref. CV-1002',
    caliber: 'Calibre 10 Chronometer',
    priceEur: 7950,
    status: 'Available',
    caseSize: '40.5 mm',
    waterResistance: '300m / 1000ft',
    reserve: '70 Hours',
    image: '/src/assets/images/hero_aura_assembled_1791433836486.jpg',
    description: 'The definitive deep-sea instrument. 120-click ceramic dive bezel, hermetic screwdown crown, and blue BGW9 lume.',
  },
  {
    id: 'sarnen',
    name: 'AURA Sarnen',
    edition: 'Overland GMT · Ref. SA-5511',
    caliber: 'Calibre 10-GMT Dual Time',
    priceEur: 11500,
    status: 'On Enquiry',
    caseSize: '40.0 mm',
    waterResistance: '200m / 660ft',
    reserve: '72 Hours',
    image: '/src/assets/images/hero_aura_exploded_1791433820422.jpg',
    description: 'Dual timezone tracking with integrated 24-hour chapter ring and skeletonized tourbillon bridge escapement.',
  },
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Calibre 10 In-House Engine',
    kicker: 'Chronometric Precision',
    description: 'Engineered entirely in La Chaux-de-Fonds. 240 components oscillating at 4 Hz with Glucydur balance wheel.',
    specValue: '28,800',
    specUnit: 'vph',
    icon: 'movement',
  },
  {
    id: 'feat-2',
    title: 'Surgical Oystersteel 316L',
    kicker: 'Material Metallurgy',
    description: 'Cold-forged under 400 tons of pressure, offering supreme tensile strength and corrosion resistance against seawater.',
    specValue: '316L',
    specUnit: 'grade',
    icon: 'case',
  },
  {
    id: 'feat-3',
    title: '300-Meter Hermetic Seal',
    kicker: 'Oceanic Endurance',
    description: 'Triple gasket O-ring crown system with helium relief pressure valve, vacuum-tested in pressure tanks.',
    specValue: '30',
    specUnit: 'bar',
    icon: 'seal',
  },
  {
    id: 'feat-4',
    title: 'Super-LumiNova BGW9',
    kicker: 'Deep-Ocean Legibility',
    description: 'High-intensity photoluminescent compound radiating bright cyan-blue glow for up to 8 continuous nocturnal hours.',
    specValue: '8',
    specUnit: 'hrs glow',
    icon: 'lume',
  },
  {
    id: 'feat-5',
    title: 'Anti-Reflective Sapphire',
    kicker: 'Optical Purity',
    description: 'Diamond-hard corundum crystal polished with micron diamond paste and five internal anti-glare vapor layers.',
    specValue: '9',
    specUnit: 'Mohs',
    icon: 'crystal',
  },
  {
    id: 'feat-6',
    title: 'Decennial Atelier Guarantee',
    kicker: 'Lifetime Responsibility',
    description: 'Every timepiece comes backed by a 10-year comprehensive service warranty and digital blockchain certificate.',
    specValue: '10',
    specUnit: 'years',
    icon: 'warranty',
  },
];

export const STATS = [
  { label: 'Hand-Finished Parts', value: 240, suffix: '+', detail: 'Individually chamfered' },
  { label: 'Balance Frequency', value: 28800, suffix: ' VPH', detail: '4 Hz chronometer cadence' },
  { label: 'Autonomous Reserve', value: 70, suffix: ' Hours', detail: 'Dual-barrel system' },
  { label: 'Hydrostatic Rating', value: 300, suffix: ' Meters', detail: 'Sealed triplock crown' },
  { label: 'Rate Accuracy', value: 2, prefix: '±', suffix: ' sec/day', detail: 'Surpasses COSC standard' },
];

export const PRICING_PLANS: PlanTier[] = [
  {
    id: 'atelier',
    name: 'Atelier Selection',
    tierSubtitle: 'Standard chronometer production run',
    depositPrice: 1950,
    fullPrice: 7950,
    editionLimit: 'Series of 500 numbered pieces',
    specs: 'Calibre 10 Standard · 316L Stainless Steel · Steel Link Bracelet',
    features: [
      'Official Swiss COSC Chronometer Certificate',
      'Dual sapphire crystal with anti-reflective coating',
      'Handmade Italian calfskin leather travel pouch',
      '5-Year international warranty & first complimentary service',
      'Worldwide insured courier delivery via Malca-Amit',
    ],
  },
  {
    id: 'chronometer',
    name: 'Master Chronometer',
    tierSubtitle: 'Highlighted collector choice with exhibition back',
    depositPrice: 2450,
    fullPrice: 9800,
    popular: true,
    editionLimit: 'Limited to 150 individually engraved pieces',
    specs: 'Calibre 10 Skeleton · 22K Solid Gold Rotor · Dual Straps (Steel + FKM Rubber)',
    features: [
      'Master Chronometer certification (-1/+2 sec/day testing)',
      'Solid 22-Karat gold engraved oscillating rotor',
      'Custom caseback engraving (up to 20 Latin characters)',
      'Interchangeable steel bracelet & FKM vulcanised dive strap',
      '10-Year Atelier Guarantee with priority service queue',
      'Invitations to annual Geneva horology masterclasses',
    ],
  },
  {
    id: 'bespoke',
    name: 'Bespoke Atelier Boxset',
    tierSubtitle: 'Custom hand-finished commission for connoisseurs',
    depositPrice: 3800,
    fullPrice: 14500,
    editionLimit: 'Only 25 commissioned per calendar year',
    specs: 'Calibre 10 Royal Skeleton · Hand-Chased Bridges · Walnut Presentation Safe',
    features: [
      'Hand-anglage movement finishing by master artisan',
      'Custom dial hue selection and bespoke hand heat-bluing',
      'Swiss walnut presentation watch winder chest',
      'Full horological loupe, spring bar toolkit, and 3 custom straps',
      'Lifetime personal concierge and biannual inspection',
      'Private 2-day visit to the atelier in La Chaux-de-Fonds',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Marc-André Laurent',
    title: 'Senior Horology Editor, ChronoStyle',
    city: 'Geneva, Switzerland',
    verifiedOwner: true,
    timepiece: 'AURA Belmont Ref. BL-408',
    quote: 'The architectural depth of the Calibre 10 movement rivals pieces four times its price. The separation of the bridges gives an astonishing play of light on the wrist.',
  },
  {
    id: 'test-2',
    author: 'Elena Rostova',
    title: 'Deep Sea Explorer & Marine Biologist',
    city: 'Reykjavik, Iceland',
    verifiedOwner: true,
    timepiece: 'AURA Calibre 10 Diver Ref. CV-1002',
    quote: 'I tested the Calibre 10 Diver during a 45-meter cold water dive in Silfra fissure. The BGW9 lume is piercingly clear, and the bezel action clicks with absolute surgical precision.',
  },
  {
    id: 'test-3',
    author: 'David Vance',
    title: 'Founder & Venture Partner, Vance Capital',
    city: 'London, United Kingdom',
    verifiedOwner: true,
    timepiece: 'AURA Steinach Ref. ST-2716',
    quote: 'The 70-hour power reserve means I can leave it off over the weekend and it is still beating dead-on Monday morning. The finishing on the 22K rotor is pure artwork.',
  },
  {
    id: 'test-4',
    author: 'Hiroshi Tanaka',
    title: 'Industrial Design Director, Kanso Labs',
    city: 'Tokyo, Japan',
    verifiedOwner: true,
    timepiece: 'AURA Sarnen Ref. SA-5511',
    quote: 'Everything about this watch exudes restraint and purpose. No superfluous branding, just pure unadulterated mechanical honesty and ergonomic balance.',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Craftsmanship',
    question: 'How is the Calibre 10 movement regulated and tested?',
    answer: 'Every Calibre 10 movement undergoes 15 days of continuous chronometer testing across 5 spatial positions and 3 distinct temperatures (4°C, 20°C, and 38°C). Our internal benchmark requires an average daily rate within -2/+2 seconds, surpassing standard Swiss COSC criteria.',
  },
  {
    id: 'faq-2',
    category: 'Water Resistance',
    question: 'Can the watch be worn for deep scuba diving and salt water sports?',
    answer: 'Yes. The Calibre 10 Diver is individually pressure-tested to 300 meters (30 ATM / 1,000 feet) in our hyperbaric chambers. The screw-down crown features our proprietary Triplock triple-gasket seal. We recommend rinsing with fresh water after ocean exposure.',
  },
  {
    id: 'faq-3',
    category: 'Ordering & Delivery',
    question: 'How does the reservation deposit and delivery process work?',
    answer: 'You can secure your serial number today with a 20% reservation deposit or complete full pre-payment to receive complimentary atelier box accessories. Once assembled, your timepiece is dispatched via fully insured armored courier (Malca-Amit) directly to your door.',
  },
  {
    id: 'faq-4',
    category: 'Servicing & Warranty',
    question: 'What is included in the 10-Year Decennial Atelier Guarantee?',
    answer: 'Our guarantee covers all manufacturing defects, movement regulation, gasket replacements, and hydrostatic pressure testing. If your watch requires service, we arrange secure doorstep collection and return it recalibrated within 14 business days.',
  },
  {
    id: 'faq-5',
    category: 'Maintenance',
    question: 'How often does a mechanical automatic movement require servicing?',
    answer: 'Thanks to synthetic ruby jewels and advanced non-gumming lubricants, the Calibre 10 only requires routine preventative inspection once every 5 to 7 years under regular wrist wear.',
  },
];
