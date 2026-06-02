const refs = {
  fileInput: document.getElementById('audio-file'),
  dropZone: document.getElementById('drop-zone'),
  resetButton: document.getElementById('reset-button'),
  stageResetButton: document.getElementById('stage-reset-button'),
  statusText: document.getElementById('status-text'),
  themeToggle: document.getElementById('theme-toggle'),
  themeToggleText: document.getElementById('theme-toggle-text'),
  toast: document.getElementById('toast'),
  trackKicker: document.getElementById('track-kicker'),
  trackName: document.getElementById('track-name'),
  trackSubtitle: document.getElementById('track-subtitle'),
  playButton: document.getElementById('play-button'),
  stopButton: document.getElementById('stop-button'),
  exportButton: document.getElementById('export-button'),
  channelLayout: document.getElementById('channel-layout'),
  orchestraToggle: document.getElementById('orchestra-toggle'),
  remasterToggle: document.getElementById('remaster-toggle'),
  remasterCompareBody: document.getElementById('remaster-compare-body'),
  remasterCompareTag: document.getElementById('remaster-compare-tag'),
  modeDescription: document.getElementById('mode-description'),
  seekSlider: document.getElementById('seek-slider'),
  currentTime: document.getElementById('current-time'),
  totalTime: document.getElementById('total-time'),
  modeButtons: Array.from(document.querySelectorAll('.mode-button')),
  metricTiles: Array.from(document.querySelectorAll('.metric-tile')),
  sliders: {
    width: document.getElementById('width-slider'),
    depth: document.getElementById('depth-slider'),
    room: document.getElementById('room-slider'),
    gain: document.getElementById('gain-slider')
  },
  sliderValues: {
    width: document.getElementById('width-value'),
    depth: document.getElementById('depth-value'),
    room: document.getElementById('room-value'),
    gain: document.getElementById('gain-value'),
    channel: document.getElementById('channel-value'),
    orchestra: document.getElementById('orchestra-value'),
    remaster: document.getElementById('remaster-value')
  },
  metrics: {
    duration: document.getElementById('duration-value'),
    durationNote: document.getElementById('duration-note'),
    tempo: document.getElementById('tempo-value'),
    tempoNote: document.getElementById('tempo-note'),
    key: document.getElementById('key-value'),
    keyNote: document.getElementById('key-note'),
    loudness: document.getElementById('loudness-value'),
    loudnessNote: document.getElementById('loudness-note'),
    dynamic: document.getElementById('dynamic-value'),
    dynamicNote: document.getElementById('dynamic-note'),
    peak: document.getElementById('peak-value'),
    peakNote: document.getElementById('peak-note'),
    centroid: document.getElementById('centroid-value'),
    centroidNote: document.getElementById('centroid-note'),
    rolloff: document.getElementById('rolloff-value'),
    rolloffNote: document.getElementById('rolloff-note'),
    stereo: document.getElementById('stereo-value'),
    stereoNote: document.getElementById('stereo-note'),
    flatness: document.getElementById('flatness-value'),
    flatnessNote: document.getElementById('flatness-note'),
    pitch: document.getElementById('pitch-value'),
    pitchNote: document.getElementById('pitch-note'),
    clip: document.getElementById('clip-value'),
    clipNote: document.getElementById('clip-note')
  },
  tags: {
    waveform: document.getElementById('waveform-tag'),
    spectrum: document.getElementById('spectrum-tag'),
    spectrogram: document.getElementById('spectrogram-tag'),
    loudness: document.getElementById('loudness-tag'),
    bands: document.getElementById('bands-tag'),
    stage: document.getElementById('stage-tag'),
    ai: document.getElementById('ai-tag'),
    report: document.getElementById('report-tag'),
    timeline: document.getElementById('timeline-tag')
  },
  waveform: document.getElementById('waveform-canvas'),
  spectrum: document.getElementById('spectrum-canvas'),
  spectrogram: document.getElementById('spectrogram-canvas'),
  loudness: document.getElementById('loudness-canvas'),
  bandList: document.getElementById('band-list'),
  stageMap: document.getElementById('stage-map'),
  stageList: document.getElementById('stage-list'),
  metadataList: document.getElementById('metadata-list'),
  aiSummaryGrid: document.getElementById('ai-summary-grid'),
  aiChipList: document.getElementById('ai-chip-list'),
  aiSectionGrid: document.getElementById('ai-section-grid'),
  reportCopy: document.getElementById('report-copy'),
  traitList: document.getElementById('trait-list'),
  remasterList: document.getElementById('remaster-list'),
  timelineList: document.getElementById('timeline-list')
};

const BAND_DEFS = [
  { key: 'sub', label: 'Sub', range: '20-60 Hz', min: 20, max: 60 },
  { key: 'bass', label: 'Bass', range: '60-250 Hz', min: 60, max: 250 },
  { key: 'lowMid', label: 'Low Mid', range: '250-500 Hz', min: 250, max: 500 },
  { key: 'mid', label: 'Mid', range: '500 Hz-2 kHz', min: 500, max: 2000 },
  { key: 'presence', label: 'Presence', range: '2-6 kHz', min: 2000, max: 6000 },
  { key: 'air', label: 'Air', range: '6-16 kHz', min: 6000, max: 16000 }
];

const ORCHESTRA_SECTIONS = [
  { id: 'violins1', short: 'Vn I', label: '제1바이올린', role: '전방 좌측 멜로디', type: 'bandpass', freq: 2200, q: 0.72, gain: 0.34, send: 0.28, x: -3.55, z: -1.45, band: 'presence', color: '#88b04b' },
  { id: 'violins2', short: 'Vn II', label: '제2바이올린', role: '좌측 안쪽 화성', type: 'bandpass', freq: 1450, q: 0.7, gain: 0.28, send: 0.28, x: -2.0, z: -1.85, band: 'mid', color: '#9bb7d4' },
  { id: 'violas', short: 'Va', label: '비올라', role: '중앙 중음역', type: 'bandpass', freq: 780, q: 0.82, gain: 0.28, send: 0.3, x: -0.45, z: -1.95, band: 'mid', color: '#6f8f64' },
  { id: 'cellos', short: 'Vc', label: '첼로', role: '우측 저중음', type: 'bandpass', freq: 330, q: 0.9, gain: 0.34, send: 0.3, x: 1.35, z: -1.65, band: 'lowMid', color: '#f2c879' },
  { id: 'basses', short: 'Cb', label: '더블베이스', role: '우측 저역 기반', type: 'lowpass', freq: 170, q: 0.72, gain: 0.38, send: 0.24, x: 3.15, z: -1.35, band: 'bass', color: '#a47864' },
  { id: 'woodwindsHigh', short: 'Ww H', label: '플루트/오보에', role: '중앙 후방 고음', type: 'bandpass', freq: 3100, q: 0.64, gain: 0.22, send: 0.36, x: -0.7, z: -3.05, band: 'presence', color: '#b7c9a8' },
  { id: 'woodwindsLow', short: 'Ww L', label: '클라리넷/바순', role: '중앙 후방 목관', type: 'bandpass', freq: 640, q: 0.78, gain: 0.24, send: 0.35, x: 0.85, z: -3.08, band: 'mid', color: '#7a9a65' },
  { id: 'horns', short: 'Hn', label: '호른', role: '좌후방 금관', type: 'bandpass', freq: 520, q: 0.76, gain: 0.24, send: 0.42, x: -1.45, z: -4.2, band: 'lowMid', color: '#d4b483' },
  { id: 'brass', short: 'Br', label: '트럼펫/트롬본', role: '우후방 금관', type: 'bandpass', freq: 1250, q: 0.68, gain: 0.2, send: 0.44, x: 1.35, z: -4.4, band: 'presence', color: '#ff6f61' },
  { id: 'timpani', short: 'Tmp', label: '팀파니', role: '최후방 좌측 타격 저역', type: 'bandpass', freq: 112, q: 0.9, gain: 0.25, send: 0.44, x: -2.85, z: -5.02, band: 'bass', color: '#955251' },
  { id: 'percussion', short: 'Perc', label: '퍼커션', role: '최후방 우측 어택', type: 'highpass', freq: 2600, q: 0.7, gain: 0.18, send: 0.48, x: 2.9, z: -5.1, band: 'air', color: '#c97b63' },
  { id: 'harpPiano', short: 'Hp', label: '하프/피아노', role: '좌후방 입자감', type: 'bandpass', freq: 2850, q: 0.58, gain: 0.17, send: 0.38, x: -3.25, z: -3.45, band: 'air', color: '#ffbe98' }
];

const ORCHESTRA_BY_ID = Object.fromEntries(ORCHESTRA_SECTIONS.map((section) => [section.id, section]));
const ORCHESTRA_INDEX_BY_ID = Object.fromEntries(ORCHESTRA_SECTIONS.map((section, index) => [section.id, index]));
const INSTRUMENT_SIGNATURES = {
  violins1: [
    { min: 196, max: 880, weight: 0.28 },
    { min: 880, max: 2600, weight: 0.3 },
    { min: 2600, max: 6200, weight: 0.28 },
    { min: 6200, max: 9800, weight: 0.14 }
  ],
  violins2: [
    { min: 150, max: 760, weight: 0.32 },
    { min: 760, max: 2200, weight: 0.34 },
    { min: 2200, max: 5200, weight: 0.24 },
    { min: 5200, max: 8200, weight: 0.1 }
  ],
  violas: [
    { min: 130, max: 520, weight: 0.34 },
    { min: 420, max: 1500, weight: 0.36 },
    { min: 1500, max: 3400, weight: 0.22 },
    { min: 3400, max: 5600, weight: 0.08 }
  ],
  cellos: [
    { min: 65, max: 260, weight: 0.42 },
    { min: 180, max: 720, weight: 0.36 },
    { min: 720, max: 2200, weight: 0.18 },
    { min: 2200, max: 4200, weight: 0.04 }
  ],
  basses: [
    { min: 38, max: 160, weight: 0.58 },
    { min: 160, max: 460, weight: 0.3 },
    { min: 460, max: 1000, weight: 0.12 }
  ],
  woodwindsHigh: [
    { min: 620, max: 1200, weight: 0.16 },
    { min: 1200, max: 2600, weight: 0.3 },
    { min: 2600, max: 5200, weight: 0.32 },
    { min: 5200, max: 9000, weight: 0.16 },
    { min: 9000, max: 13000, weight: 0.06 }
  ],
  woodwindsLow: [
    { min: 120, max: 360, weight: 0.14 },
    { min: 360, max: 900, weight: 0.34 },
    { min: 900, max: 1800, weight: 0.3 },
    { min: 1800, max: 3600, weight: 0.16 },
    { min: 3600, max: 6200, weight: 0.06 }
  ],
  horns: [
    { min: 80, max: 260, weight: 0.16 },
    { min: 260, max: 700, weight: 0.34 },
    { min: 700, max: 1500, weight: 0.32 },
    { min: 1500, max: 3200, weight: 0.14 },
    { min: 3200, max: 5200, weight: 0.04 }
  ],
  brass: [
    { min: 160, max: 520, weight: 0.12 },
    { min: 520, max: 1600, weight: 0.28 },
    { min: 1600, max: 3600, weight: 0.34 },
    { min: 3600, max: 6800, weight: 0.2 },
    { min: 6800, max: 10000, weight: 0.06 }
  ],
  timpani: [
    { min: 45, max: 180, weight: 0.68 },
    { min: 180, max: 360, weight: 0.22 },
    { min: 360, max: 720, weight: 0.1 }
  ],
  percussion: [
    { min: 1200, max: 3200, weight: 0.16 },
    { min: 3200, max: 7600, weight: 0.46 },
    { min: 7600, max: 14000, weight: 0.38 }
  ],
  harpPiano: [
    { min: 45, max: 120, weight: 0.1 },
    { min: 120, max: 520, weight: 0.22 },
    { min: 520, max: 1800, weight: 0.26 },
    { min: 1800, max: 5200, weight: 0.28 },
    { min: 5200, max: 9500, weight: 0.14 }
  ]
};
const DEEP_AUDIO_MODEL = {
  source: 'Essentia MusiCNN MTT',
  modelUrl: 'models/mtt-musicnn-1/model.json',
  targetSampleRate: 16000,
  maxSeconds: 54,
  hopSize: 256,
  timeoutMs: 26000,
  minTagScore: 0.08,
  classes: [
    'ambient', 'beat', 'beats', 'cello', 'choir', 'choral', 'classic', 'classical', 'country', 'dance',
    'drums', 'electronic', 'fast', 'female', 'female vocal', 'female voice', 'flute', 'guitar', 'harp',
    'harpsichord', 'indian', 'loud', 'male', 'male vocal', 'male voice', 'man', 'metal', 'new age',
    'no vocal', 'no vocals', 'no voice', 'opera', 'piano', 'pop', 'quiet', 'rock', 'singing', 'sitar',
    'slow', 'soft', 'solo', 'strings', 'synth', 'techno', 'violin', 'vocal', 'vocals', 'voice', 'weird',
    'woman'
  ],
  sectionWeights: {
    cello: { cellos: 1 },
    flute: { woodwindsHigh: 1 },
    harp: { harpPiano: 0.86 },
    harpsichord: { harpPiano: 0.64 },
    piano: { harpPiano: 1 },
    strings: { violins1: 0.68, violins2: 0.64, violas: 0.54, cellos: 0.5, basses: 0.28 },
    violin: { violins1: 1, violins2: 0.88, violas: 0.24 },
    drums: { percussion: 0.9, timpani: 0.35 }
  }
};
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const MAJOR_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const MINOR_PROFILE = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

let audioContext;
let toastTimer = 0;
let animationFrame = 0;
let restartTimer = 0;

const stageElementCache = {
  nodes: new Map(),
  rows: new Map(),
  tracks: new Map(),
  nodeLevels: new Map(),
  trackLevels: new Map(),
  liveStates: new Map()
};
const staticCanvasCache = {
  waveform: null,
  loudness: null
};
const themeValueCache = {
  key: '',
  values: new Map()
};
const impulseResponseCache = new Map();
const hannWindowCache = new Map();
const deepAudioModelState = {
  loadPromise: null,
  extractor: null,
  model: null,
  unavailable: false,
  reason: ''
};

const SPATIAL_SLIDER_KEYS = ['width', 'depth', 'room', 'gain'];
const SPATIAL_SLIDER_DEFAULTS = { width: 112, depth: 118, room: 46, gain: 100 };
const REMASTER_SLIDER_ANIMATION_MS = 620;
const PLAYBACK_TRANSPORT_UPDATE_MS = 80;
const STAGE_ACTIVITY_UPDATE_MS = 32;
const IMPULSE_RESPONSE_CACHE_LIMIT = 12;
const RENDER_MODES = ['spatial', 'atmos', 'original'];
const DEFAULT_CHANNEL_LAYOUT = 'stereo';
const OUTPUT_CHANNEL_LAYOUTS = {
  stereo: {
    label: '2.0 Stereo',
    short: '2ch',
    fileSuffix: '2ch',
    mask: 0x3,
    channels: [
      { id: 'FL', label: 'Front Left', x: -1, y: 0, z: 0.18, mask: 0x1 },
      { id: 'FR', label: 'Front Right', x: 1, y: 0, z: 0.18, mask: 0x2 }
    ]
  },
  quad: {
    label: '4.0 Quad',
    short: '4ch',
    fileSuffix: '4ch-quad',
    mask: 0x33,
    channels: [
      { id: 'FL', label: 'Front Left', x: -1, y: 0, z: 0.22, mask: 0x1 },
      { id: 'FR', label: 'Front Right', x: 1, y: 0, z: 0.22, mask: 0x2 },
      { id: 'BL', label: 'Back Left', x: -0.92, y: 0, z: -1, mask: 0x10 },
      { id: 'BR', label: 'Back Right', x: 0.92, y: 0, z: -1, mask: 0x20 }
    ]
  },
  surround51: {
    label: '5.1 Surround',
    short: '6ch',
    fileSuffix: '6ch-5-1',
    mask: 0x60f,
    channels: [
      { id: 'FL', label: 'Front Left', x: -1, y: 0, z: 0.24, mask: 0x1 },
      { id: 'FR', label: 'Front Right', x: 1, y: 0, z: 0.24, mask: 0x2 },
      { id: 'FC', label: 'Front Center', x: 0, y: 0, z: 0.32, mask: 0x4 },
      { id: 'LFE', label: 'LFE', x: 0, y: 0, z: 0, lfe: true, mask: 0x8 },
      { id: 'SL', label: 'Side Left', x: -1.16, y: 0, z: -0.48, surround: true, mask: 0x200 },
      { id: 'SR', label: 'Side Right', x: 1.16, y: 0, z: -0.48, surround: true, mask: 0x400 }
    ]
  },
  surround71: {
    label: '7.1 Surround',
    short: '8ch',
    fileSuffix: '8ch-7-1',
    mask: 0x63f,
    channels: [
      { id: 'FL', label: 'Front Left', x: -1, y: 0, z: 0.24, mask: 0x1 },
      { id: 'FR', label: 'Front Right', x: 1, y: 0, z: 0.24, mask: 0x2 },
      { id: 'FC', label: 'Front Center', x: 0, y: 0, z: 0.32, mask: 0x4 },
      { id: 'LFE', label: 'LFE', x: 0, y: 0, z: 0, lfe: true, mask: 0x8 },
      { id: 'BL', label: 'Back Left', x: -0.9, y: 0, z: -1, rear: true, mask: 0x10 },
      { id: 'BR', label: 'Back Right', x: 0.9, y: 0, z: -1, rear: true, mask: 0x20 },
      { id: 'SL', label: 'Side Left', x: -1.18, y: 0, z: -0.46, surround: true, mask: 0x200 },
      { id: 'SR', label: 'Side Right', x: 1.18, y: 0, z: -0.46, surround: true, mask: 0x400 }
    ]
  },
  atmos714: {
    label: '7.1.4 Atmos Bed',
    short: '12ch',
    fileSuffix: '12ch-7-1-4',
    mask: 0x2d63f,
    channels: [
      { id: 'FL', label: 'Front Left', x: -1, y: 0, z: 0.24, mask: 0x1 },
      { id: 'FR', label: 'Front Right', x: 1, y: 0, z: 0.24, mask: 0x2 },
      { id: 'FC', label: 'Front Center', x: 0, y: 0, z: 0.32, mask: 0x4 },
      { id: 'LFE', label: 'LFE', x: 0, y: 0, z: 0, lfe: true, mask: 0x8 },
      { id: 'BL', label: 'Back Left', x: -0.9, y: 0, z: -1, rear: true, mask: 0x10 },
      { id: 'BR', label: 'Back Right', x: 0.9, y: 0, z: -1, rear: true, mask: 0x20 },
      { id: 'SL', label: 'Side Left', x: -1.18, y: 0, z: -0.46, surround: true, mask: 0x200 },
      { id: 'SR', label: 'Side Right', x: 1.18, y: 0, z: -0.46, surround: true, mask: 0x400 },
      { id: 'TFL', label: 'Top Front Left', x: -0.82, y: 1, z: 0.1, height: true, mask: 0x1000 },
      { id: 'TFR', label: 'Top Front Right', x: 0.82, y: 1, z: 0.1, height: true, mask: 0x4000 },
      { id: 'TBL', label: 'Top Back Left', x: -0.72, y: 1, z: -0.9, height: true, rear: true, mask: 0x8000 },
      { id: 'TBR', label: 'Top Back Right', x: 0.72, y: 1, z: -0.9, height: true, rear: true, mask: 0x20000 }
    ]
  }
};

const STAGE_LIMITS = {
  xMin: -4.2,
  xMax: 4.2,
  zNear: -1.1,
  zFar: -5.3,
  percentXMin: 8,
  percentXMax: 92,
  percentYMin: 14,
  percentYMax: 80
};

const state = {
  analysis: null,
  source: null,
  graph: null,
  playing: false,
  mode: 'spatial',
  offset: 0,
  startedAt: 0,
  lastTransportUiAt: 0,
  lastStageUiAt: 0,
  renderUrl: '',
  stagePositions: loadStagePositions(),
  stageDrag: null,
  settings: getSpatialSettings(),
  manualSpatialValues: readSpatialSliderValues(),
  sliderAnimationFrame: 0,
  remasterCompareRows: [],
  remasterCompareColumn: ''
};

initialize();

function initialize() {
  initializeTheme();
  initializeMetricCards();
  refs.dropZone.addEventListener('dragenter', handleDragEnter);
  refs.dropZone.addEventListener('dragover', preventDefault);
  refs.dropZone.addEventListener('dragleave', handleDragLeave);
  refs.dropZone.addEventListener('drop', handleDrop);
  refs.fileInput.addEventListener('change', () => {
    const file = refs.fileInput.files && refs.fileInput.files[0];
    if (file) handleFile(file);
  });
  refs.resetButton.addEventListener('click', resetApp);
  refs.stageResetButton.addEventListener('click', resetStagePositions);
  refs.playButton.addEventListener('click', togglePlayback);
  refs.stopButton.addEventListener('click', () => stopPlayback(true));
  refs.exportButton.addEventListener('click', exportSpatialWav);
  refs.seekSlider.addEventListener('input', handleSeekInput);
  refs.modeButtons.forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
  });
  Object.values(refs.sliders).forEach((slider) => {
    slider.addEventListener('input', handleSpatialControlChange);
  });
  refs.channelLayout.addEventListener('change', handleSpatialControlChange);
  refs.orchestraToggle.addEventListener('change', handleSpatialControlChange);
  refs.remasterToggle.addEventListener('change', handleRemasterToggleChange);
  refs.themeToggle.addEventListener('click', toggleTheme);
  refs.stageMap.addEventListener('pointerdown', handleStagePointerDown);
  window.addEventListener('pointermove', handleStagePointerMove);
  window.addEventListener('pointerup', handleStagePointerUp);
  window.addEventListener('pointercancel', handleStagePointerUp);
  window.addEventListener('resize', debounce(drawAllCanvases, 120));
  updateModeDescription();
  updateSliderLabels();
  renderEmptyState();
}

function initializeMetricCards() {
  refs.metricTiles.forEach((tile) => {
    tile.addEventListener('pointerleave', () => {
      tile.classList.remove('is-active');
    });
    tile.addEventListener('blur', () => {
      tile.classList.remove('is-active');
    });
    tile.addEventListener('click', () => selectMetricTile(tile));
    tile.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectMetricTile(tile);
      }
      if (event.key === 'Escape') {
        clearMetricTileState();
        tile.blur();
      }
    });
  });

  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.metric-tile')) {
      clearMetricTileState();
    }
  });
}

function selectMetricTile(activeTile) {
  setMetricTileAnchor(activeTile);
  refs.metricTiles.forEach((tile) => {
    const isTarget = tile === activeTile;
    tile.classList.toggle('is-active', isTarget);
    if (!isTarget) {
      delete tile.dataset.expandAnchor;
    }
  });
}

function clearMetricTileState() {
  refs.metricTiles.forEach((tile) => {
    tile.classList.remove('is-active');
    delete tile.dataset.expandAnchor;
  });
}

function setMetricTileAnchor(tile) {
  const rect = tile.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  if (centerX < viewportWidth * 0.34) {
    tile.dataset.expandAnchor = 'left';
    return;
  }
  if (centerX > viewportWidth * 0.66) {
    tile.dataset.expandAnchor = 'right';
    return;
  }
  tile.dataset.expandAnchor = 'center';
}

function initializeTheme() {
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('spatial-orchestra-theme') || 'light';
  } catch (error) {
    savedTheme = 'light';
  }
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function applyTheme(theme) {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  invalidateThemeValueCache();
  refs.themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
  refs.themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
  refs.themeToggleText.textContent = nextTheme === 'dark' ? 'Light' : 'Dark';
  try {
    localStorage.setItem('spatial-orchestra-theme', nextTheme);
  } catch (error) {
    // Storage can be unavailable in restricted browser contexts.
  }
  window.requestAnimationFrame(drawAllCanvases);
}

function getDefaultStagePositions() {
  return Object.fromEntries(ORCHESTRA_SECTIONS.map((section) => [
    section.id,
    { x: section.x, z: section.z }
  ]));
}

function loadStagePositions() {
  const defaults = getDefaultStagePositions();
  try {
    const raw = localStorage.getItem('spatial-orchestra-stage-positions');
    if (!raw) return defaults;
    const saved = JSON.parse(raw);
    const merged = { ...defaults };
    ORCHESTRA_SECTIONS.forEach((section) => {
      const item = saved && saved[section.id];
      if (!item || !Number.isFinite(item.x) || !Number.isFinite(item.z)) return;
      merged[section.id] = {
        x: clamp(item.x, STAGE_LIMITS.xMin, STAGE_LIMITS.xMax),
        z: clamp(item.z, STAGE_LIMITS.zFar, STAGE_LIMITS.zNear)
      };
    });
    return merged;
  } catch (error) {
    return defaults;
  }
}

function saveStagePositions() {
  try {
    localStorage.setItem('spatial-orchestra-stage-positions', JSON.stringify(state.stagePositions));
  } catch (error) {
    // Storage can be unavailable in restricted browser contexts.
  }
}

function resetStagePositions() {
  state.stagePositions = getDefaultStagePositions();
  saveStagePositions();
  if (state.analysis) {
    renderStage(state.analysis, getLiveLevel(state.analysis, getPlaybackTime()));
    refs.tags.stage.textContent = '기본 배치';
  } else {
    renderEmptyStage();
    refs.tags.stage.textContent = '대기';
  }
  updateAllLivePanners();
  showToast('오케스트라 위치를 기본 배치로 되돌렸습니다.');
}

function preventDefault(event) {
  event.preventDefault();
}

function handleDragEnter(event) {
  event.preventDefault();
  refs.dropZone.classList.add('is-dragging');
}

function handleDragLeave(event) {
  event.preventDefault();
  if (!refs.dropZone.contains(event.relatedTarget)) {
    refs.dropZone.classList.remove('is-dragging');
  }
}

function handleDrop(event) {
  event.preventDefault();
  refs.dropZone.classList.remove('is-dragging');
  const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
  if (file) handleFile(file);
}

async function handleFile(file) {
  // 사용자가 음원을 올리면 파일 검증, 디코딩, 분석, 공간 재생 상태 초기화를 한 번에 수행한다.
  // 이후 재생/정지/Export 버튼은 이 함수에서 만든 state.analysis와 source 정보를 사용한다.
  if (!isAudioFile(file)) {
    showToast('오디오 파일을 선택해 주세요.');
    return;
  }

  stopPlayback(true);
  clearRenderedUrl();
  setBusy(true, '파일 읽는 중');
  resetTags('분석 중');

  try {
    initAudioContext();
    const arrayBuffer = await file.arrayBuffer();
    await nextFrame();

    setBusy(true, '오디오 디코딩 중');
    const audioBuffer = await decodeAudio(arrayBuffer.slice(0));
    const mono = createMonoSignal(audioBuffer);
    await nextFrame();

    setBusy(true, '파형과 라우드니스 계산 중');
    const waveform = makeWaveformPeaks(mono, 2600);
    const loudness = analyzeLoudness(mono, audioBuffer.sampleRate);
    await nextFrame();

    setBusy(true, '템포와 조성 추정 중');
    const tempo = estimateTempo(mono, audioBuffer.sampleRate);
    const key = estimateKey(mono, audioBuffer.sampleRate);
    await nextFrame();

    setBusy(true, '스펙트럼과 스테레오 분석 중');
    const spectrum = analyzeSpectrum(mono, audioBuffer.sampleRate);
    const stereo = analyzeStereo(audioBuffer);
    const pitch = estimateDominantPitch(spectrum);
    const zeroCrossing = estimateZeroCrossing(mono, audioBuffer.sampleRate);
    await nextFrame();

    setBusy(true, '스펙트로그램과 구간 구조 계산 중');
    const spectrogram = makeSpectrogram(mono, audioBuffer.sampleRate);
    const sections = analyzeTimelineSections(mono, audioBuffer.sampleRate, 8);
    const tags = parseAudioTags(arrayBuffer, file);
    const stageLevels = estimateStageLevels(spectrum);
    setBusy(true, 'AI instrument model analyzing');
    const aiProfile = await analyzeWithDeepAudioModel(mono, audioBuffer.sampleRate);
    await nextFrame();
    const stageActivity = buildStageActivityTimeline({ spectrogram, tempo, loudness, zeroCrossing, stageLevels, aiProfile });
    const stageDisplay = estimateInstrumentStageDisplay({ spectrum, tempo, loudness, zeroCrossing, stageLevels, stageActivity, aiProfile });
    const mixHealth = analyzeMixHealth({ loudness, spectrum, stereo, tempo, zeroCrossing });
    const traits = buildTraits({ loudness, tempo, spectrum, stereo, mixHealth });
    const remaster = buildRemasterProfile({ loudness, spectrum, stereo, tempo, mixHealth });
    const report = buildReport({ file, audioBuffer, tempo, key, loudness, spectrum, stereo, pitch, zeroCrossing, traits, remaster, mixHealth });
    const hue = deriveHue(key, spectrum);

    state.analysis = {
      file,
      audioBuffer,
      waveform,
      loudness,
      tempo,
      key,
      spectrum,
      stereo,
      pitch,
      zeroCrossing,
      mixHealth,
      spectrogram,
      sections,
      tags,
      stageLevels,
      stageLevelMap: Object.fromEntries(stageLevels.map((item) => [item.id, item.level])),
      stageDisplayLevels: stageDisplay.levels,
      stageDisplayLevelMap: Object.fromEntries(stageDisplay.levels.map((item) => [item.id, item.level])),
      stageActiveMap: Object.fromEntries(stageDisplay.levels.map((item) => [item.id, item.active])),
      instrumentProfile: stageDisplay.profile,
      aiProfile,
      stageActivity,
      traits,
      remaster,
      report,
      hue,
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate,
      channels: audioBuffer.numberOfChannels,
      bitrate: audioBuffer.duration > 0 ? (file.size * 8) / audioBuffer.duration / 1000 : 0
    };

    state.offset = 0;
    invalidateStaticCanvasCache();
    applyAnalysis(state.analysis);
    setBusy(false, '분석 완료');
    document.body.classList.add('has-analysis');
  } catch (error) {
    console.error(error);
    setBusy(false, '분석 실패');
    showToast('브라우저에서 이 파일을 디코딩하지 못했습니다.');
    renderEmptyState();
  }
}

function isAudioFile(file) {
  const knownExtension = /\.(mp3|wav|m4a|aac|ogg|oga|flac|opus|webm)$/i.test(file.name);
  return file.type.startsWith('audio/') || knownExtension;
}

function initAudioContext() {
  if (!window.AudioContext && !window.webkitAudioContext) {
    throw new Error('AudioContext is not supported.');
  }
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

async function decodeAudio(arrayBuffer) {
  try {
    return await audioContext.decodeAudioData(arrayBuffer);
  } catch (error) {
    return new Promise((resolve, reject) => {
      audioContext.decodeAudioData(arrayBuffer, resolve, reject);
    });
  }
}

function createMonoSignal(buffer) {
  const length = buffer.length;
  const channels = buffer.numberOfChannels;
  if (channels === 1) {
    return buffer.getChannelData(0);
  }

  const mono = new Float32Array(length);
  for (let channel = 0; channel < channels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      mono[i] += data[i] / channels;
    }
  }
  return mono;
}

function makeWaveformPeaks(samples, pointCount) {
  const peaks = new Float32Array(pointCount * 3);
  const block = Math.max(1, Math.floor(samples.length / pointCount));

  for (let i = 0; i < pointCount; i += 1) {
    const start = i * block;
    const end = Math.min(samples.length, start + block);
    let min = 1;
    let max = -1;
    let sum = 0;

    for (let j = start; j < end; j += 1) {
      const value = samples[j] || 0;
      min = Math.min(min, value);
      max = Math.max(max, value);
      sum += value * value;
    }

    const count = Math.max(1, end - start);
    peaks[i * 3] = min;
    peaks[i * 3 + 1] = max;
    peaks[i * 3 + 2] = Math.sqrt(sum / count);
  }

  return peaks;
}

function analyzeLoudness(samples, sampleRate) {
  const windowSize = Math.max(1024, Math.floor(sampleRate * 0.42));
  const windows = [];
  let sumSquares = 0;
  let peak = 0;
  let clipCount = 0;
  let dcSum = 0;

  for (let i = 0; i < samples.length; i += 1) {
    const value = samples[i] || 0;
    const abs = Math.abs(value);
    sumSquares += value * value;
    dcSum += value;
    peak = Math.max(peak, abs);
    if (abs >= 0.999) clipCount += 1;
  }

  for (let start = 0; start < samples.length; start += windowSize) {
    const end = Math.min(samples.length, start + windowSize);
    let localSum = 0;
    let localPeak = 0;
    for (let i = start; i < end; i += 1) {
      const value = samples[i] || 0;
      localSum += value * value;
      localPeak = Math.max(localPeak, Math.abs(value));
    }
    const rms = Math.sqrt(localSum / Math.max(1, end - start));
    windows.push({
      time: start / sampleRate,
      rms,
      db: ampToDb(rms),
      peak: localPeak
    });
  }

  const rms = Math.sqrt(sumSquares / Math.max(1, samples.length));
  const windowDbs = windows.map((item) => item.db).filter(Number.isFinite).sort((a, b) => a - b);
  const p10 = percentile(windowDbs, 0.1);
  const p90 = percentile(windowDbs, 0.9);
  const rmsDb = ampToDb(rms);
  const peakDb = ampToDb(peak);
  const dynamicRange = Number.isFinite(p90 - p10) ? Math.max(0, p90 - p10) : 0;

  return {
    rms,
    rmsDb,
    approximateLufs: rmsDb - 0.7,
    peak,
    peakDb,
    crest: Math.max(0, peakDb - rmsDb),
    dynamicRange,
    clippingPercent: samples.length ? (clipCount / samples.length) * 100 : 0,
    dcOffset: samples.length ? dcSum / samples.length : 0,
    windows,
    energyScore: clamp((rmsDb + 38) / 32, 0, 1)
  };
}

function estimateTempo(samples, sampleRate) {
  const hopSize = Math.max(256, Math.floor(sampleRate * 0.02));
  const frameSize = Math.max(hopSize * 2, Math.floor(sampleRate * 0.046));
  const maxSamples = Math.min(samples.length, sampleRate * 420);
  const envelope = [];

  for (let start = 0; start + frameSize < maxSamples; start += hopSize) {
    let energy = 0;
    for (let i = start; i < start + frameSize; i += 1) {
      energy += Math.abs(samples[i] || 0);
    }
    envelope.push(energy / frameSize);
  }

  if (envelope.length < 24) {
    return { bpm: 0, confidence: 0, onsetDensity: 0 };
  }

  const flux = new Float32Array(envelope.length);
  for (let i = 1; i < envelope.length; i += 1) {
    flux[i] = Math.max(0, envelope[i] - envelope[i - 1]);
  }

  const smoothed = smoothArray(flux, 4);
  const mean = average(smoothed);
  const deviation = Math.sqrt(average(Array.from(smoothed, (value) => (value - mean) ** 2)));
  const onsetThreshold = mean + deviation * 0.72;
  let onsetCount = 0;
  for (let i = 1; i < smoothed.length - 1; i += 1) {
    if (smoothed[i] > onsetThreshold && smoothed[i] > smoothed[i - 1] && smoothed[i] >= smoothed[i + 1]) {
      onsetCount += 1;
    }
  }

  const frameRate = sampleRate / hopSize;
  let bestBpm = 0;
  let bestScore = 0;
  const scores = [];

  for (let bpm = 55; bpm <= 195; bpm += 1) {
    const lag = Math.round((60 / bpm) * frameRate);
    if (lag < 2 || lag >= smoothed.length) continue;
    let score = 0;
    for (let i = lag; i < smoothed.length; i += 1) {
      score += smoothed[i] * smoothed[i - lag];
    }
    scores.push(score);
    if (score > bestScore) {
      bestScore = score;
      bestBpm = bpm;
    }
  }

  const averageScore = average(scores);
  const confidence = bestBpm ? clamp((bestScore / Math.max(averageScore, 1e-9) - 1) / 2.5, 0, 1) : 0;
  const seconds = maxSamples / sampleRate;

  return {
    bpm: bestBpm,
    confidence,
    onsetDensity: seconds ? onsetCount / seconds : 0
  };
}

function analyzeSpectrum(samples, sampleRate) {
  // 여러 FFT 프레임을 평균해 스펙트럼 중심, rolloff, 밝기, 대역별 에너지 비율을 계산한다.
  // 이 값들은 화면의 믹스 지표뿐 아니라 무대 배치와 리마스터 추천에도 사용된다.
  const fftSize = 4096;
  const frameCount = Math.min(96, Math.max(14, Math.floor(samples.length / sampleRate * 1.2)));
  const magnitudes = new Float32Array(fftSize / 2);
  const window = hannWindow(fftSize);
  const real = new Float32Array(fftSize);
  const imag = new Float32Array(fftSize);
  const maxStart = Math.max(0, samples.length - fftSize - 1);
  const frameSpectra = [];

  for (let frame = 0; frame < frameCount; frame += 1) {
    const start = Math.floor((maxStart * frame) / Math.max(1, frameCount - 1));
    real.fill(0);
    imag.fill(0);
    for (let i = 0; i < fftSize; i += 1) {
      real[i] = (samples[start + i] || 0) * window[i];
    }
    fft(real, imag);

    const current = new Float32Array(fftSize / 2);
    for (let bin = 1; bin < fftSize / 2; bin += 1) {
      const mag = Math.hypot(real[bin], imag[bin]);
      current[bin] = mag;
      magnitudes[bin] += mag / frameCount;
    }
    frameSpectra.push(current);
  }

  const binHz = sampleRate / fftSize;
  let total = 0;
  let weighted = 0;
  let maxMagnitude = 0;
  const bands = BAND_DEFS.map((band) => ({ ...band, energy: 0, percent: 0 }));

  for (let bin = 1; bin < magnitudes.length; bin += 1) {
    const freq = bin * binHz;
    const value = magnitudes[bin];
    total += value;
    weighted += value * freq;
    maxMagnitude = Math.max(maxMagnitude, value);
    bands.forEach((band) => {
      if (freq >= band.min && freq < band.max) band.energy += value;
    });
  }

  const centroid = total ? weighted / total : 0;
  let spreadSum = 0;
  let cumulative = 0;
  let rolloff = 0;
  const threshold = total * 0.85;
  let highEnergy = 0;
  let lowEnergy = 0;
  let geometric = 0;
  let arithmetic = 0;
  let flatnessCount = 0;

  for (let bin = 1; bin < magnitudes.length; bin += 1) {
    const freq = bin * binHz;
    const value = magnitudes[bin];
    spreadSum += value * (freq - centroid) ** 2;
    cumulative += value;
    if (!rolloff && cumulative >= threshold) rolloff = freq;
    if (freq >= 3000) highEnergy += value;
    if (freq <= 250) lowEnergy += value;
    if (freq >= 80 && freq <= 12000 && value > 0) {
      geometric += Math.log(value + 1e-12);
      arithmetic += value;
      flatnessCount += 1;
    }
  }

  const fluxValues = [];
  for (let frame = 1; frame < frameSpectra.length; frame += 1) {
    let flux = 0;
    const prev = frameSpectra[frame - 1];
    const current = frameSpectra[frame];
    for (let bin = 1; bin < current.length; bin += 3) {
      flux += Math.max(0, current[bin] - prev[bin]);
    }
    fluxValues.push(flux);
  }

  bands.forEach((band) => {
    band.percent = total ? band.energy / total : 0;
  });

  const flatness = flatnessCount
    ? Math.exp(geometric / flatnessCount) / Math.max(arithmetic / flatnessCount, 1e-12)
    : 0;

  return {
    magnitudes,
    binHz,
    maxMagnitude,
    bands,
    centroid,
    spread: total ? Math.sqrt(spreadSum / total) : 0,
    rolloff,
    brightness: total ? highEnergy / total : 0,
    warmth: total ? lowEnergy / total : 0,
    flatness: clamp(flatness, 0, 1),
    flux: average(fluxValues)
  };
}

function makeSpectrogram(samples, sampleRate) {
  const fftSize = 2048;
  const duration = samples.length / Math.max(1, sampleRate);
  const frameCount = Math.min(360, Math.max(168, Math.floor(duration * 2)));
  const binCount = 124;
  const window = hannWindow(fftSize);
  const real = new Float32Array(fftSize);
  const imag = new Float32Array(fftSize);
  const previousMagnitude = new Float32Array(fftSize / 2);
  const values = Array.from({ length: frameCount }, () => new Float32Array(binCount));
  const bandFrames = Array.from({ length: frameCount }, () => new Float32Array(BAND_DEFS.length));
  const instrumentFrames = Array.from({ length: frameCount }, () => new Float32Array(ORCHESTRA_SECTIONS.length));
  const energyFrames = new Float32Array(frameCount);
  const centroidFrames = new Float32Array(frameCount);
  const flatnessFrames = new Float32Array(frameCount);
  const fluxFrames = new Float32Array(frameCount);
  const maxStart = Math.max(0, samples.length - fftSize - 1);
  const binHz = sampleRate / fftSize;
  const instrumentWeights = buildInstrumentSignatureWeights(fftSize, binHz);
  const minHz = 45;
  const maxHz = Math.min(16000, sampleRate / 2);
  let maxValue = 0;
  let maxFrameEnergy = 0;
  let maxFlux = 0;
  let maxInstrumentValue = 0;

  for (let frame = 0; frame < frameCount; frame += 1) {
    const start = Math.floor((maxStart * frame) / Math.max(1, frameCount - 1));
    real.fill(0);
    imag.fill(0);
    for (let i = 0; i < fftSize; i += 1) {
      real[i] = (samples[start + i] || 0) * window[i];
    }
    fft(real, imag);

    const bandEnergy = new Float32Array(BAND_DEFS.length);
    const instrumentEnergy = new Float32Array(ORCHESTRA_SECTIONS.length);
    let frameEnergy = 0;
    let weighted = 0;
    let geometric = 0;
    let arithmetic = 0;
    let flatnessCount = 0;
    let flux = 0;

    for (let bin = 1; bin < fftSize / 2; bin += 1) {
      const freq = bin * binHz;
      const mag = Math.hypot(real[bin], imag[bin]);
      frameEnergy += mag;
      weighted += mag * freq;
      flux += Math.max(0, mag - previousMagnitude[bin]);
      previousMagnitude[bin] = mag;
      if (freq >= 80 && freq <= 12000 && mag > 0) {
        geometric += Math.log(mag + 1e-12);
        arithmetic += mag;
        flatnessCount += 1;
      }
      for (let instrumentIndex = 0; instrumentIndex < instrumentWeights.length; instrumentIndex += 1) {
        const weight = instrumentWeights[instrumentIndex][bin];
        if (weight > 0) instrumentEnergy[instrumentIndex] += mag * weight;
      }
      for (let bandIndex = 0; bandIndex < BAND_DEFS.length; bandIndex += 1) {
        const band = BAND_DEFS[bandIndex];
        if (freq >= band.min && freq < band.max) {
          bandEnergy[bandIndex] += mag;
          break;
        }
      }
    }

    for (let bandIndex = 0; bandIndex < BAND_DEFS.length; bandIndex += 1) {
      bandFrames[frame][bandIndex] = frameEnergy ? bandEnergy[bandIndex] / frameEnergy : 0;
    }
    for (let instrumentIndex = 0; instrumentIndex < ORCHESTRA_SECTIONS.length; instrumentIndex += 1) {
      const compressedInstrument = Math.log10(1 + instrumentEnergy[instrumentIndex]);
      instrumentFrames[frame][instrumentIndex] = compressedInstrument;
      maxInstrumentValue = Math.max(maxInstrumentValue, compressedInstrument);
    }
    const compressedEnergy = Math.log10(1 + frameEnergy);
    energyFrames[frame] = compressedEnergy;
    centroidFrames[frame] = frameEnergy ? weighted / frameEnergy : 0;
    flatnessFrames[frame] = flatnessCount
      ? clamp(Math.exp(geometric / flatnessCount) / Math.max(arithmetic / flatnessCount, 1e-12), 0, 1)
      : 0;
    fluxFrames[frame] = flux;
    maxFrameEnergy = Math.max(maxFrameEnergy, compressedEnergy);
    maxFlux = Math.max(maxFlux, flux);

    for (let y = 0; y < binCount; y += 1) {
      const ratio = 1 - y / Math.max(1, binCount - 1);
      const freq = minHz * Math.pow(maxHz / minHz, ratio);
      const bin = clamp(Math.round(freq / binHz), 1, fftSize / 2 - 1);
      const mag = Math.hypot(real[bin], imag[bin]);
      const value = Math.log10(1 + mag * 18);
      values[frame][y] = value;
      maxValue = Math.max(maxValue, value);
    }
  }

  if (maxValue > 0) {
    values.forEach((frame) => {
      for (let i = 0; i < frame.length; i += 1) {
        frame[i] /= maxValue;
      }
    });
  }

  if (maxFrameEnergy > 0) {
    for (let frame = 0; frame < frameCount; frame += 1) {
      energyFrames[frame] = clamp(energyFrames[frame] / maxFrameEnergy, 0, 1);
    }
  }
  if (maxFlux > 0) {
    for (let frame = 0; frame < frameCount; frame += 1) {
      fluxFrames[frame] = clamp(fluxFrames[frame] / maxFlux, 0, 1);
    }
    fluxFrames[0] = frameCount > 1 ? Math.min(fluxFrames[1], 0.82) : 0;
  }
  if (maxInstrumentValue > 0) {
    for (let frame = 0; frame < frameCount; frame += 1) {
      for (let instrumentIndex = 0; instrumentIndex < ORCHESTRA_SECTIONS.length; instrumentIndex += 1) {
        instrumentFrames[frame][instrumentIndex] = clamp(instrumentFrames[frame][instrumentIndex] / maxInstrumentValue, 0, 1);
      }
    }
  }

  return {
    values,
    frameCount,
    binCount,
    minHz,
    maxHz,
    bandFrames,
    instrumentFrames,
    energyFrames,
    centroidFrames,
    flatnessFrames,
    fluxFrames
  };
}

function buildInstrumentSignatureWeights(fftSize, binHz) {
  return ORCHESTRA_SECTIONS.map((section) => {
    const weights = new Float32Array(fftSize / 2);
    const ranges = INSTRUMENT_SIGNATURES[section.id] || [];
    ranges.forEach((range) => {
      const startBin = Math.max(1, Math.floor(range.min / binHz));
      const endBin = Math.min(weights.length - 1, Math.ceil(range.max / binHz));
      const binCount = Math.max(1, endBin - startBin + 1);
      const normalizedWeight = range.weight / binCount;
      for (let bin = startBin; bin <= endBin; bin += 1) {
        weights[bin] += normalizedWeight;
      }
    });
    return weights;
  });
}

function estimateKey(samples, sampleRate) {
  // 주파수 성분을 12개 pitch class로 접어 chroma를 만들고 장/단조 프로파일과 비교한다.
  // 추정된 key는 리포트 문장, 컬러 액센트, 음악적 해석 정보에 쓰인다.
  const fftSize = 4096;
  const frameCount = Math.min(76, Math.max(10, Math.floor(samples.length / sampleRate)));
  const chroma = new Float32Array(12);
  const window = hannWindow(fftSize);
  const real = new Float32Array(fftSize);
  const imag = new Float32Array(fftSize);
  const maxStart = Math.max(0, samples.length - fftSize - 1);
  const binHz = sampleRate / fftSize;

  for (let frame = 0; frame < frameCount; frame += 1) {
    const start = Math.floor((maxStart * frame) / Math.max(1, frameCount - 1));
    real.fill(0);
    imag.fill(0);
    for (let i = 0; i < fftSize; i += 1) {
      real[i] = (samples[start + i] || 0) * window[i];
    }
    fft(real, imag);

    for (let bin = 1; bin < fftSize / 2; bin += 1) {
      const freq = bin * binHz;
      if (freq < 55 || freq > 5000) continue;
      const midi = Math.round(69 + 12 * Math.log2(freq / 440));
      const pitchClass = ((midi % 12) + 12) % 12;
      const magnitude = Math.hypot(real[bin], imag[bin]);
      chroma[pitchClass] += magnitude / Math.sqrt(freq);
    }
  }

  normalizeArray(chroma);
  let best = { root: 0, mode: 'major', score: -Infinity };
  const allScores = [];

  for (let root = 0; root < 12; root += 1) {
    const major = profileScore(chroma, MAJOR_PROFILE, root);
    const minor = profileScore(chroma, MINOR_PROFILE, root);
    allScores.push(major, minor);
    if (major > best.score) best = { root, mode: 'major', score: major };
    if (minor > best.score) best = { root, mode: 'minor', score: minor };
  }

  const avg = average(allScores);
  const max = Math.max(...allScores);
  const confidence = clamp((max - avg) / Math.max(Math.abs(max), 1e-9) * 2.2, 0, 1);
  const rootName = NOTE_NAMES[best.root];
  const modeKo = best.mode === 'major' ? '장조' : '단조';

  return {
    root: rootName,
    mode: best.mode,
    label: `${rootName} ${modeKo}`,
    confidence,
    chroma: Array.from(chroma)
  };
}

function analyzeStereo(buffer) {
  if (buffer.numberOfChannels < 2) {
    return { width: 0, correlation: 1, midSideRatio: 0, label: 'Mono' };
  }

  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);
  const step = Math.max(1, Math.floor(left.length / 280000));
  let sumLr = 0;
  let sumL2 = 0;
  let sumR2 = 0;
  let sumMid2 = 0;
  let sumSide2 = 0;
  let count = 0;

  for (let i = 0; i < left.length; i += step) {
    const l = left[i] || 0;
    const r = right[i] || 0;
    const mid = (l + r) * 0.5;
    const side = (l - r) * 0.5;
    sumLr += l * r;
    sumL2 += l * l;
    sumR2 += r * r;
    sumMid2 += mid * mid;
    sumSide2 += side * side;
    count += 1;
  }

  const correlation = sumL2 && sumR2 ? sumLr / Math.sqrt(sumL2 * sumR2) : 1;
  const midRms = Math.sqrt(sumMid2 / Math.max(count, 1));
  const sideRms = Math.sqrt(sumSide2 / Math.max(count, 1));
  const midSideRatio = sideRms / Math.max(midRms, 1e-9);
  const width = clamp(midSideRatio, 0, 2);
  const label = width < 0.18 ? 'Narrow' : width < 0.55 ? 'Balanced' : width < 1.05 ? 'Wide' : 'Very Wide';

  return { width, correlation, midSideRatio, label };
}

function estimateDominantPitch(spectrum) {
  const { magnitudes, binHz } = spectrum;
  let bestBin = 0;
  let bestValue = 0;
  for (let bin = 1; bin < magnitudes.length; bin += 1) {
    const freq = bin * binHz;
    if (freq < 55 || freq > 3200) continue;
    const weighted = magnitudes[bin] / Math.sqrt(freq);
    if (weighted > bestValue) {
      bestValue = weighted;
      bestBin = bin;
    }
  }

  if (!bestBin) return { frequency: 0, note: '--', midi: 0 };
  const frequency = bestBin * binHz;
  const midi = Math.round(69 + 12 * Math.log2(frequency / 440));
  const note = `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
  return { frequency, note, midi };
}

function estimateZeroCrossing(samples, sampleRate) {
  const step = Math.max(1, Math.floor(samples.length / 500000));
  let crossings = 0;
  let previous = samples[0] || 0;
  let count = 0;
  for (let i = step; i < samples.length; i += step) {
    const value = samples[i] || 0;
    if ((previous >= 0 && value < 0) || (previous < 0 && value >= 0)) crossings += 1;
    previous = value;
    count += 1;
  }
  const seconds = samples.length / sampleRate;
  return {
    rate: count ? crossings / count : 0,
    perSecond: seconds ? crossings / seconds : 0
  };
}

function analyzeTimelineSections(samples, sampleRate, sectionCount) {
  const sections = [];
  const length = samples.length;
  const segmentLength = Math.max(1, Math.floor(length / sectionCount));

  for (let section = 0; section < sectionCount; section += 1) {
    const start = section * segmentLength;
    const end = section === sectionCount - 1 ? length : Math.min(length, start + segmentLength);
    let sum = 0;
    let peak = 0;
    let absSum = 0;
    let diffSum = 0;
    let previous = samples[start] || 0;
    let localCrossings = 0;
    const hop = Math.max(1, Math.floor((end - start) / 12000));

    for (let i = start; i < end; i += hop) {
      const value = samples[i] || 0;
      sum += value * value;
      absSum += Math.abs(value);
      diffSum += Math.abs(value - previous);
      peak = Math.max(peak, Math.abs(value));
      if ((previous >= 0 && value < 0) || (previous < 0 && value >= 0)) localCrossings += 1;
      previous = value;
    }

    const count = Math.max(1, Math.ceil((end - start) / hop));
    const rms = Math.sqrt(sum / count);
    const brightness = clamp(diffSum / Math.max(absSum, 1e-9) / 1.8, 0, 1);
    const density = clamp(localCrossings / count * 18, 0, 1);
    const energy = clamp((ampToDb(rms) + 48) / 42, 0, 1);
    sections.push({
      index: section + 1,
      startTime: start / sampleRate,
      endTime: end / sampleRate,
      rms,
      peak,
      energy,
      brightness,
      density,
      label: classifyTimelineSection(energy, brightness, density)
    });
  }

  return sections;
}

function classifyTimelineSection(energy, brightness, density) {
  if (energy > 0.72 && brightness > 0.52) return '강한 투티형';
  if (energy > 0.62) return '확장된 합주형';
  if (density > 0.62 && brightness > 0.45) return '리듬 집중형';
  if (brightness > 0.58) return '밝은 선율형';
  if (energy < 0.3) return '저밀도 완충형';
  return '균형 전개형';
}

function estimateStageLevels(spectrum) {
  const maxPercent = Math.max(...spectrum.bands.map((band) => band.percent), 1e-9);
  const bandMap = Object.fromEntries(spectrum.bands.map((band) => [band.key, band.percent]));
  return ORCHESTRA_SECTIONS.map((section) => {
    const bandPercent = bandMap[section.band] || 0;
    const bandLevel = Math.sqrt(bandPercent / maxPercent);
    const gainWeight = clamp(section.gain / 0.38, 0.2, 1.1);
    return {
      id: section.id,
      level: clamp(bandLevel * 0.72 + gainWeight * 0.22, 0.08, 1)
    };
  });
}

function estimateInstrumentStageDisplay({ spectrum, tempo, loudness, zeroCrossing, stageLevels, stageActivity = null, aiProfile = null }) {
  const profile = buildInstrumentProfile({ spectrum, tempo, loudness, zeroCrossing });
  const selectedScores = applyAiToSelectedScores(selectActiveInstrumentScores(profile.scores, profile.features), profile.scores, profile.features, aiProfile);
  const stageLevelMap = Object.fromEntries((stageLevels || []).map((item) => [item.id, item.level]));
  const maxScore = Math.max(...Object.values(selectedScores), 1e-9);
  const levels = ORCHESTRA_SECTIONS.map((section) => {
    const dynamicLevel = stageActivity && stageActivity.maxLevels ? stageActivity.maxLevels[section.id] || 0 : 0;
    const dynamicActive = stageActivity && stageActivity.activeMap ? stageActivity.activeMap[section.id] === true : false;
    const score = selectedScores[section.id] || 0;
    const globalConfidence = score > 0 ? clamp(score / maxScore, 0.18, 1) : 0;
    let active = dynamicActive || score > 0;
    if (isWindSectionId(section.id) && score <= 0) {
      const windConfidence = getWindFeatureForId(profile.features, section.id);
      active = dynamicActive && dynamicLevel >= 0.42 && windConfidence >= getWindProtectionThreshold(section.id);
    } else if (section.id === 'harpPiano' && score <= 0) {
      active = dynamicActive &&
        dynamicLevel >= 0.52 &&
        (profile.features.pianoConfidence || 0) >= 0.68 &&
        (
          (profile.features.pianoPercussiveGate || 0) >= 0.62 ||
          (profile.features.pianoHammerEvidence || 0) >= 0.78 ||
          profile.features.rangeCoverage > 0.82
        );
    }
    const confidence = active ? Math.max(globalConfidence, dynamicLevel) : 0;
    const sourceLevel = Number.isFinite(stageLevelMap[section.id]) ? stageLevelMap[section.id] : 0;
    return {
      id: section.id,
      active,
      confidence,
      level: active ? clamp(sourceLevel * 0.28 + confidence * 0.72, 0.12, 1) : 0
    };
  });

  return {
    levels,
    profile: {
      ...profile,
      dynamicActiveIds: stageActivity && stageActivity.activeIds ? stageActivity.activeIds : [],
      ai: summarizeAiInstrumentProfile(aiProfile),
      activeIds: levels.filter((item) => item.active).map((item) => item.id)
    }
  };
}

function buildStageActivityTimeline({ spectrogram, tempo, loudness, zeroCrossing, stageLevels, aiProfile = null }) {
  const frameCount = spectrogram && spectrogram.frameCount ? spectrogram.frameCount : 0;
  const stageLevelMap = Object.fromEntries((stageLevels || []).map((item) => [item.id, item.level]));
  const levelsBySection = Object.fromEntries(ORCHESTRA_SECTIONS.map((section) => [
    section.id,
    new Float32Array(frameCount)
  ]));
  if (!frameCount || !spectrogram.bandFrames || !spectrogram.energyFrames) {
    return {
      frameCount: 0,
      levelsBySection,
      maxLevels: {},
      activeMap: {},
      activeIds: []
    };
  }

  let pianoFrameMemory = 0;
  for (let frame = 0; frame < frameCount; frame += 1) {
    const energy = spectrogram.energyFrames[frame] || 0;
    if (energy < 0.025) continue;
    const frameSpectrum = buildFrameSpectrum(spectrogram, frame);
    const frameFlux = spectrogram.fluxFrames ? spectrogram.fluxFrames[frame] || 0 : 0;
    const signatureScores = getFrameInstrumentSignatureScores(spectrogram, frame);
    const frameProfile = buildInstrumentProfile({
      spectrum: frameSpectrum,
      tempo: { onsetDensity: Math.max((tempo && tempo.onsetDensity ? tempo.onsetDensity : 0) * 0.2, frameFlux * 7.2) },
      loudness: {
        crest: 8 + frameFlux * 14,
        energyScore: energy
      },
      zeroCrossing: { rate: Math.max((zeroCrossing && zeroCrossing.rate ? zeroCrossing.rate : 0) * 0.45, (frameSpectrum.flatness || 0) * 0.24) }
    });
    const combinedScores = combineInstrumentScores(frameProfile.scores, signatureScores, frameProfile.features);
    const keyboardTransient = isKeyboardTransientFrame(combinedScores, signatureScores, frameProfile.features);
    let activeScores = keyboardTransient
      ? selectKeyboardFrameScores(combinedScores, frameProfile.features)
      : selectFrameInstrumentScores(combinedScores, frameProfile.features);
    const pianoSignature = signatureScores.harpPiano || 0;
    const pianoContinuation = (
      pianoFrameMemory > 0.16 &&
      pianoSignature > 0.42 &&
      frameProfile.features.transient < 0.32
    );
    if (keyboardTransient || pianoContinuation) {
      activeScores = { ...activeScores };
      activeScores.harpPiano = Math.max(
        activeScores.harpPiano || 0,
        combinedScores.harpPiano || 0,
        pianoSignature * (pianoContinuation ? 0.82 : 0.92)
      );
      if (pianoContinuation) {
        ['woodwindsLow', 'horns', 'brass'].forEach((id) => {
          if ((activeScores[id] || 0) < activeScores.harpPiano * 1.18) delete activeScores[id];
        });
        if ((activeScores.woodwindsHigh || 0) < activeScores.harpPiano * 0.94 && (frameProfile.features.woodwindHighConfidence || 0) < 0.68) {
          delete activeScores.woodwindsHigh;
        }
      }
    }
    activeScores = applyAiToFrameScores(activeScores, combinedScores, signatureScores, frameProfile.features, aiProfile);
    pianoFrameMemory = clamp((keyboardTransient ? 0.9 : pianoFrameMemory * 0.86) + (activeScores.harpPiano ? 0.08 : 0), 0, 1);
    const maxFrameScore = Math.max(...Object.values(activeScores), 1e-9);

    Object.entries(activeScores).forEach(([id, score]) => {
      const section = ORCHESTRA_BY_ID[id];
      if (!section) return;
      const sourceLevel = Number.isFinite(stageLevelMap[id]) ? stageLevelMap[id] : 0.5;
      const confidence = clamp(score / maxFrameScore, 0, 1);
      const bandBoost = getFrameBandStrength(frameSpectrum, section.band);
      const signatureBoost = signatureScores[id] || 0;
      levelsBySection[id][frame] = clamp(
        energy * (0.22 + confidence * 0.5 + bandBoost * 0.1 + signatureBoost * 0.18) * (0.74 + sourceLevel * 0.26),
        0,
        1
      );
    });
  }

  ORCHESTRA_SECTIONS.forEach((section) => {
    smoothStageActivity(levelsBySection[section.id]);
  });

  const maxLevels = {};
  const activeMap = {};
  const activeIds = [];
  ORCHESTRA_SECTIONS.forEach((section) => {
    const levels = levelsBySection[section.id];
    let maxLevel = 0;
    let activeFrames = 0;
    for (let frame = 0; frame < levels.length; frame += 1) {
      const level = levels[frame];
      maxLevel = Math.max(maxLevel, level);
      if (level >= 0.085) activeFrames += 1;
    }
    maxLevels[section.id] = maxLevel;
    const threshold = getStageActivationThreshold(section.id);
    const active = maxLevel >= threshold.level && (activeFrames >= threshold.frames || maxLevel >= threshold.peak);
    activeMap[section.id] = active;
    if (active) activeIds.push(section.id);
  });

  return {
    frameCount,
    levelsBySection,
    maxLevels,
    activeMap,
    activeIds
  };
}

function getStageActivationThreshold(sectionId) {
  const strict = {
    harpPiano: { level: 0.52, frames: 2, peak: 0.58 },
    basses: { level: 0.84, frames: 6, peak: 0.9 },
    woodwindsHigh: { level: 0.34, frames: 4, peak: 0.46 },
    woodwindsLow: { level: 0.34, frames: 4, peak: 0.46 },
    horns: { level: 0.38, frames: 5, peak: 0.52 },
    brass: { level: 0.32, frames: 4, peak: 0.46 },
    timpani: { level: 0.68, frames: 5, peak: 0.78 },
    percussion: { level: 0.38, frames: 4, peak: 0.52 }
  };
  return strict[sectionId] || { level: 0.2, frames: 3, peak: 0.36 };
}

function isKeyboardTransientFrame(scores, signatureScores, features) {
  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  const pianoGate = features.pianoPercussiveGate || 0;
  const pianoEvidence = (features.pianoHammerEvidence || 0) > 0.12 ||
    features.rangeCoverage > 0.78 ||
    features.lowRegister < 0.74;
  return (
    pianoConfidence > 0.52 &&
    pianoGate > 0.18 &&
    pianoEvidence &&
    features.rangeCoverage > 0.42 &&
    features.noisy < 0.72 &&
    ((scores.harpPiano || 0) > 0.28 || (signatureScores.harpPiano || 0) > 0.16)
  );
}

function selectKeyboardFrameScores(scores, features) {
  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  const selected = { harpPiano: Math.max(scores.harpPiano || 0, 0.44 + pianoConfidence * 0.26) };
  if (features.stringConfidence > 0.58 && features.transient < 0.52) {
    const followerRatio = pianoConfidence > 0.68 ? 0.8 : 0.64;
    ['violins1', 'violins2', 'violas', 'cellos']
      .map((id) => [id, scores[id] || 0])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .forEach(([id, score]) => {
        if (score >= selected.harpPiano * followerRatio) selected[id] = score;
      });
  }
  return selected;
}

function getFrameInstrumentSignatureScores(spectrogram, frame) {
  const frameValues = spectrogram && spectrogram.instrumentFrames ? spectrogram.instrumentFrames[frame] : null;
  const scores = {};
  ORCHESTRA_SECTIONS.forEach((section, index) => {
    scores[section.id] = frameValues ? frameValues[index] || 0 : 0;
  });
  return scores;
}

function isWindSectionId(id) {
  return id === 'woodwindsHigh' || id === 'woodwindsLow' || id === 'horns' || id === 'brass';
}

function getWindFeatureForId(features, id) {
  const windMap = {
    woodwindsHigh: features.woodwindHighConfidence || 0,
    woodwindsLow: features.woodwindLowConfidence || 0,
    horns: features.hornConfidence || 0,
    brass: features.brassConfidence || 0
  };
  return windMap[id] || 0;
}

function getStrongestWindScore(scores) {
  return ['woodwindsHigh', 'woodwindsLow', 'horns', 'brass']
    .map((id) => [id, scores[id] || 0])
    .sort((a, b) => b[1] - a[1])[0] || ['', 0];
}

function getWindProtectionThreshold(id) {
  const thresholds = {
    woodwindsHigh: 0.52,
    woodwindsLow: 0.82,
    horns: 0.82,
    brass: 0.72
  };
  return thresholds[id] || 0.74;
}

function hasProtectedWindLead(features, id) {
  return getWindFeatureForId(features, id) >= getWindProtectionThreshold(id);
}

function hasProtectedStringLead(features) {
  const violinConfidence = features.violinConfidence || 0;
  const bowedStringConfidence = features.bowedStringConfidence || features.stringConfidence || 0;
  const staccatoConfidence = features.stringStaccatoConfidence || 0;
  const pianoStrike = hasPianoStrike(features);
  return (
    (
      bowedStringConfidence >= 0.58 &&
      violinConfidence >= 0.48 &&
      (features.transient || 0) < 0.48
    ) ||
    (
      staccatoConfidence >= 0.5 &&
      violinConfidence >= 0.34 &&
      (features.transient || 0) < 0.78 &&
      (!pianoStrike || staccatoConfidence >= 0.62)
    )
  );
}

function hasPianoStrike(features) {
  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  return (
    pianoConfidence >= 0.6 &&
    (features.pianoPercussiveGate || 0) >= 0.52 &&
    (features.pianoHammerEvidence || 0) >= 0.48 &&
    (features.noisy || 0) < 0.72
  );
}

function hasProtectedPianoLead(features) {
  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  return (
    pianoConfidence >= 0.54 &&
    (features.pianoPercussiveGate || 0) >= 0.38 &&
    (features.pianoHammerEvidence || 0) >= 0.42 &&
    (features.rangeCoverage || 0) >= 0.42 &&
    (features.noisy || 0) < 0.68 &&
    (features.stringStaccatoConfidence || 0) < 0.55 &&
    !hasProtectedStringLead(features)
  );
}

function combineInstrumentScores(profileScores, signatureScores, features) {
  const combined = {};
  ORCHESTRA_SECTIONS.forEach((section) => {
    const profile = profileScores[section.id] || 0;
    let signature = signatureScores[section.id] || 0;
    if (section.id === 'harpPiano') {
      const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
      if (pianoConfidence > 0.52) signature = Math.max(signature, pianoConfidence * 0.76);
      if (pianoConfidence < 0.48 && features.transient < 0.22) signature *= 0.6;
      if ((features.pianoHammerEvidence || 0) < 0.08 && features.lowRegister > 0.78 && features.rangeCoverage < 0.74) {
        signature *= 0.48;
      }
      if ((features.windConfidence || 0) > pianoConfidence + 0.12 && (features.pianoHammerEvidence || 0) < 0.78) {
        signature *= 0.58;
      }
    } else if (isWindSectionId(section.id)) {
      const windFeature = getWindFeatureForId(features, section.id);
      if (windFeature > 0.48) signature = Math.max(signature, windFeature * 0.8);
      if ((features.windConfidence || 0) < 0.38 && signature < 0.24) signature *= 0.72;
      const pianoStrike = hasPianoStrike(features);
      if (pianoStrike && !hasProtectedWindLead(features, section.id)) signature *= 0.48;
      if (hasProtectedStringLead(features)) signature *= 0.52;
    }
    const signatureWeight = section.id === 'harpPiano'
      ? 0.5
      : isWindSectionId(section.id)
        ? 0.54
        : section.id === 'percussion' || section.id === 'timpani' ? 0.58 : 0.46;
    let score = profile * (1 - signatureWeight) + signature * signatureWeight;
    if (signature > 0.62) score = Math.max(score, signature * 0.86);
    if (signature < 0.18 && profile < 0.56) score *= 0.62;
    if (isWindSectionId(section.id)) {
      const windFeature = getWindFeatureForId(features, section.id);
      const pianoStrike = hasPianoStrike(features);
      if (pianoStrike && !hasProtectedWindLead(features, section.id)) score *= 0.58;
      if (hasProtectedStringLead(features)) score *= clamp(0.42 + windFeature * 0.22, 0.42, 0.64);
    } else if (section.id === 'harpPiano' && (features.windConfidence || 0) > (features.pianoConfidence || 0) + 0.12 && (features.pianoHammerEvidence || 0) < 0.78) {
      score *= 0.72;
    } else if (section.id === 'harpPiano' && hasProtectedStringLead(features)) {
      score *= 0.46;
    }
    combined[section.id] = clamp(score, 0, 1);
  });

  const piano = combined.harpPiano || 0;
  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  if (piano > 0.56 && pianoConfidence > 0.52) {
    ['woodwindsHigh', 'woodwindsLow', 'horns', 'brass'].forEach((id) => {
      const protection = getWindFeatureForId(features, id);
      combined[id] *= clamp(0.62 + protection * 0.38, 0.62, 1);
    });
  }

  if (features.stringConfidence > 0.62 && features.transient < 0.42) {
    ['woodwindsHigh', 'woodwindsLow', 'horns', 'brass'].forEach((id) => {
      const protection = getWindFeatureForId(features, id);
      combined[id] *= clamp(0.54 + protection * 0.4, 0.54, 0.98);
    });
  }

  if (features.lowRegister > 0.45 && features.stringConfidence > 0.55) {
    ['woodwindsHigh', 'woodwindsLow', 'horns', 'brass'].forEach((id) => {
      const protection = getWindFeatureForId(features, id);
      combined[id] *= clamp(0.42 + protection * 0.48, 0.42, 0.96);
    });
    if (features.transient < 0.36) combined.timpani *= 0.35;
  }

  if (features.transient < 0.42 || features.noisy < 0.38) {
    combined.timpani *= 0.48;
    combined.percussion *= 0.42;
  }

  return combined;
}

function buildFrameSpectrum(spectrogram, frame) {
  const bands = BAND_DEFS.map((band, index) => ({
    ...band,
    percent: spectrogram.bandFrames[frame][index] || 0,
    energy: spectrogram.bandFrames[frame][index] || 0
  }));
  const bandMap = Object.fromEntries(bands.map((band) => [band.key, band.percent]));
  return {
    magnitudes: null,
    binHz: 0,
    maxMagnitude: 1,
    bands,
    centroid: spectrogram.centroidFrames ? spectrogram.centroidFrames[frame] || 0 : 0,
    spread: 0,
    rolloff: 0,
    brightness: (bandMap.presence || 0) + (bandMap.air || 0),
    warmth: (bandMap.sub || 0) + (bandMap.bass || 0),
    flatness: spectrogram.flatnessFrames ? spectrogram.flatnessFrames[frame] || 0 : 0,
    flux: spectrogram.fluxFrames ? spectrogram.fluxFrames[frame] || 0 : 0
  };
}

function getFrameBandStrength(frameSpectrum, bandKey) {
  const bands = frameSpectrum.bands || [];
  const maxBand = Math.max(...bands.map((band) => band.percent), 1e-9);
  const item = bands.find((band) => band.key === bandKey);
  return item ? clamp(Math.sqrt((item.percent || 0) / maxBand), 0, 1) : 0;
}

function smoothStageActivity(levels) {
  let previous = 0;
  for (let i = 0; i < levels.length; i += 1) {
    const target = levels[i];
    const alpha = target > previous ? 0.68 : 0.55;
    previous += (target - previous) * alpha;
    levels[i] = previous < 0.025 ? 0 : previous;
  }
}

function buildInstrumentProfile({ spectrum, tempo, loudness, zeroCrossing }) {
  const bandMap = Object.fromEntries(spectrum.bands.map((band) => [band.key, band.percent]));
  const maxBand = Math.max(...spectrum.bands.map((band) => band.percent), 1e-9);
  const strength = (key) => Math.sqrt((bandMap[key] || 0) / maxBand);
  const sub = bandMap.sub || 0;
  const bass = bandMap.bass || 0;
  const lowMid = bandMap.lowMid || 0;
  const mid = bandMap.mid || 0;
  const presence = bandMap.presence || 0;
  const air = bandMap.air || 0;
  const low = sub + bass;
  const body = lowMid + mid;
  const upper = presence + air;
  const spectralImpulse = spectrum.magnitudes
    ? clamp((((spectrum.flux || 0) / Math.max(spectrum.maxMagnitude || 1, 1)) - 0.38) / 1.6, 0, 1)
    : clamp(((spectrum.flux || 0) - 0.08) / 0.72, 0, 1);
  const onsetImpulse = clamp((tempo && tempo.onsetDensity ? tempo.onsetDensity : 0) / 6.5, 0, 1);
  const crestImpulse = clamp(((loudness && loudness.crest ? loudness.crest : 0) - 8) / 16, 0, 1);
  const transient = clamp(
    onsetImpulse * 0.48 +
      crestImpulse * 0.3 +
      spectralImpulse * 0.22,
    0,
    1
  );
  const tonal = clamp(1 - (spectrum.flatness || 0) * 2.1, 0, 1);
  const noisy = clamp((spectrum.flatness || 0) * 2.4 + ((zeroCrossing && zeroCrossing.rate) || 0) * 1.2, 0, 1);
  const sustain = clamp(1 - transient * 0.72, 0, 1);
  const centroidHigh = clamp((spectrum.centroid - 700) / 3400, 0, 1);
  const centroidLow = clamp(1 - (spectrum.centroid - 150) / 1700, 0, 1);
  const rangeCoverage = clamp((
    clamp(low / 0.14, 0, 1) +
    clamp(body / 0.36, 0, 1) +
    clamp(upper / 0.18, 0, 1)
  ) / 3, 0, 1);
  const pianoBandBalance = weightedScore([
    [rangeCoverage, 0.3],
    [strength('mid'), 0.18],
    [strength('presence'), 0.16],
    [Math.max(strength('bass'), strength('lowMid')), 0.14],
    [Math.max(strength('air'), strength('lowMid')), 0.08],
    [tonal, 0.14]
  ]);
  const hammerBand = clamp((presence + air * 0.7) / 0.018, 0, 1);
  const pianoHammerEvidence = clamp(hammerBand * (0.28 + spectralImpulse * 0.42 + transient * 0.3), 0, 1);
  const pianoAttack = clamp(
    (transient * 0.52 + spectralImpulse * 0.48) * (0.48 + pianoHammerEvidence * 0.52),
    0,
    1
  );
  const pianoPercussiveGate = clamp(
    (spectralImpulse * 0.48 + transient * 0.28) * (0.36 + pianoHammerEvidence * 0.64) +
      clamp(upper / 0.12, 0, 1) * 0.12 +
      pianoHammerEvidence * 0.12,
    0,
    1
  );
  const lowBowedPenalty = clamp((centroidLow - 0.72) / 0.25, 0, 1) *
    (1 - pianoHammerEvidence) *
    clamp((bass + lowMid) / 0.55, 0, 1) *
    0.34;
  const sustainedHighStringEvidence = clamp(weightedScore([
    [strength('presence'), 0.28],
    [strength('air'), 0.2],
    [centroidHigh, 0.18],
    [tonal, 0.18],
    [sustain, 0.12],
    [clamp(1 - low / 0.28, 0, 1), 0.04]
  ]) * clamp(1 - transient * 1.28, 0, 1), 0, 1);
  let pianoConfidence = clamp(
    pianoBandBalance * 0.3 +
      pianoAttack * 0.36 +
      tonal * 0.12 +
      clamp((body + upper) / 0.48, 0, 1) * 0.1 +
      pianoPercussiveGate * 0.12 -
      noisy * 0.14 -
      lowBowedPenalty -
      sustainedHighStringEvidence * 0.32,
    0,
    1
  );
  const keyboardBase = clamp(
    rangeCoverage * 0.28 +
      transient * 0.42 +
      tonal * 0.12 +
      clamp(body / 0.48, 0, 1) * 0.08 +
      strength('bass') * 0.1 -
      noisy * 0.16,
    0,
    1
  );
  const keyboardConfidence = clamp(Math.max(keyboardBase, pianoConfidence * 0.94), 0, 1);
  const stringConfidence = clamp(weightedScore([
    [strength('presence'), 0.26],
    [strength('mid'), 0.24],
    [strength('lowMid'), 0.24],
    [tonal, 0.16],
    [sustain, 0.1]
  ]) * sustain * (1 - transient * 0.25), 0, 1);
  const violinConfidence = clamp(weightedScore([
    [sustainedHighStringEvidence, 0.28],
    [strength('presence'), 0.24],
    [centroidHigh, 0.18],
    [tonal, 0.14],
    [sustain, 0.1],
    [strength('air'), 0.06]
  ]) * clamp(1 - pianoPercussiveGate * 0.34, 0.48, 1) - noisy * 0.06, 0, 1);
  const stringStaccatoConfidence = clamp(weightedScore([
    [transient, 0.2],
    [strength('presence'), 0.22],
    [centroidHigh, 0.16],
    [tonal, 0.16],
    [clamp(1 - centroidLow * 0.95, 0, 1), 0.12],
    [clamp(1 - low / 0.24, 0, 1), 0.08],
    [strength('air'), 0.06]
  ]) * clamp(1 - noisy * 0.42, 0.48, 1) * clamp(1 - centroidLow * 0.72, 0.34, 1), 0, 1);
  const bowedStringConfidence = clamp(Math.max(stringConfidence, violinConfidence * 0.94, stringStaccatoConfidence * 0.86), 0, 1);
  const lowSparse = clamp(1 - low / 0.26, 0, 1);
  const airSparse = clamp(1 - air / 0.16, 0, 1);
  const energy = loudness ? loudness.energyScore : 0.5;
  const windSustain = clamp(sustain * 0.78 + tonal * 0.14 + (1 - transient) * 0.08, 0, 1);
  const breathAir = clamp(strength('air') * 0.62 + clamp(air / 0.055, 0, 1) * 0.26 + noisy * 0.12, 0, 1);
  const pianoStrikePenalty = clamp(
    pianoPercussiveGate * pianoConfidence * clamp(1 - breathAir * 0.48, 0, 1),
    0,
    0.44
  );
  const highWoodwindCentroid = clamp((spectrum.centroid - 820) / 3200, 0, 1);
  const lowWoodwindCentroid = clamp(1 - Math.abs(spectrum.centroid - 1050) / 1750, 0, 1);
  const hornCentroid = clamp(1 - Math.abs(spectrum.centroid - 780) / 1350, 0, 1);
  const brassCentroid = clamp((spectrum.centroid - 780) / 2800, 0, 1);
  const woodwindHighConfidence = clamp(weightedScore([
    [strength('presence'), 0.28],
    [breathAir, 0.16],
    [highWoodwindCentroid, 0.16],
    [lowSparse, 0.13],
    [tonal, 0.11],
    [windSustain, 0.1],
    [clamp(1 - pianoPercussiveGate * 0.75, 0, 1), 0.06]
  ]) - clamp(low / 0.34, 0, 1) * 0.1 - pianoStrikePenalty * 0.18, 0, 1);
  const woodwindLowConfidence = clamp(weightedScore([
    [strength('mid'), 0.3],
    [strength('lowMid'), 0.2],
    [lowWoodwindCentroid, 0.16],
    [lowSparse, 0.1],
    [tonal, 0.1],
    [windSustain, 0.1],
    [clamp(1 - pianoPercussiveGate * 0.56, 0, 1), 0.04]
  ]) - clamp(sub / 0.12, 0, 1) * 0.08 - pianoStrikePenalty * 0.22, 0, 1);
  const hornConfidence = clamp(weightedScore([
    [strength('lowMid'), 0.26],
    [strength('mid'), 0.22],
    [hornCentroid, 0.18],
    [energy, 0.12],
    [tonal, 0.1],
    [windSustain, 0.08],
    [clamp(1 - air / 0.12, 0, 1), 0.04]
  ]) - clamp(sub / 0.2, 0, 1) * 0.08 - pianoStrikePenalty * 0.16, 0, 1);
  const brassEdge = clamp(
    strength('presence') * 0.44 +
      strength('mid') * 0.22 +
      brassCentroid * 0.16 +
      energy * 0.12 +
      clamp(1 - airSparse, 0, 1) * 0.06,
    0,
    1
  );
  const brassConfidence = clamp(weightedScore([
    [brassEdge, 0.38],
    [strength('presence'), 0.22],
    [energy, 0.14],
    [tonal, 0.1],
    [clamp(1 - lowSparse * 0.5, 0, 1), 0.08],
    [windSustain, 0.08]
  ]) - noisy * 0.12 - pianoStrikePenalty * 0.12, 0, 1);
  const windConfidence = Math.max(woodwindHighConfidence, woodwindLowConfidence, hornConfidence, brassConfidence);
  const windProtectionById = {
    woodwindsHigh: woodwindHighConfidence,
    woodwindsLow: woodwindLowConfidence,
    horns: hornConfidence,
    brass: brassConfidence
  };
  const ensembleDensity = clamp(
    rangeCoverage * 0.34 +
      clamp(body / 0.55, 0, 1) * 0.22 +
      clamp(upper / 0.32, 0, 1) * 0.2 +
      energy * 0.14 +
      (1 - lowSparse) * 0.1,
    0,
    1
  );

  const scores = {
    violins1: weightedScore([
      [violinConfidence, 0.34],
      [strength('presence'), 0.26],
      [stringStaccatoConfidence, 0.16],
      [strength('air'), 0.12],
      [centroidHigh, 0.08],
      [tonal, 0.04]
    ]),
    violins2: weightedScore([
      [violinConfidence, 0.26],
      [strength('mid'), 0.3],
      [strength('presence'), 0.18],
      [stringStaccatoConfidence, 0.14],
      [centroidHigh, 0.1],
      [tonal, 0.02]
    ]),
    violas: weightedScore([
      [strength('mid'), 0.42],
      [strength('lowMid'), 0.24],
      [tonal, 0.16],
      [sustain, 0.12],
      [clamp(1 - centroidHigh * 0.55, 0, 1), 0.06]
    ]),
    cellos: weightedScore([
      [strength('lowMid'), 0.48],
      [strength('bass'), 0.2],
      [centroidLow, 0.08],
      [tonal, 0.14],
      [sustain, 0.1]
    ]),
    basses: weightedScore([
      [strength('bass'), 0.42],
      [strength('sub'), 0.26],
      [centroidLow, 0.2],
      [airSparse, 0.08],
      [sustain, 0.04]
    ]),
    woodwindsHigh: weightedScore([
      [woodwindHighConfidence, 0.5],
      [strength('presence'), 0.18],
      [breathAir, 0.12],
      [lowSparse, 0.08],
      [windSustain, 0.08],
      [tonal, 0.04]
    ]),
    woodwindsLow: weightedScore([
      [woodwindLowConfidence, 0.5],
      [strength('mid'), 0.2],
      [strength('lowMid'), 0.12],
      [lowWoodwindCentroid, 0.08],
      [windSustain, 0.06],
      [tonal, 0.04]
    ]),
    horns: weightedScore([
      [hornConfidence, 0.52],
      [strength('lowMid'), 0.18],
      [strength('mid'), 0.12],
      [hornCentroid, 0.08],
      [energy, 0.06],
      [windSustain, 0.04]
    ]),
    brass: weightedScore([
      [brassConfidence, 0.52],
      [brassEdge, 0.16],
      [strength('presence'), 0.14],
      [centroidHigh, 0.08],
      [energy, 0.06],
      [tonal, 0.04]
    ]),
    timpani: weightedScore([
      [strength('sub'), 0.34],
      [strength('bass'), 0.34],
      [transient, 0.16],
      [airSparse, 0.1],
      [centroidLow, 0.06]
    ]),
    percussion: weightedScore([
      [strength('air'), 0.3],
      [transient, 0.3],
      [noisy, 0.18],
      [centroidHigh, 0.14],
      [energy, 0.08]
    ]),
    harpPiano: weightedScore([
      [pianoConfidence, 0.36],
      [rangeCoverage, 0.18],
      [pianoAttack, 0.18],
      [tonal, 0.1],
      [Math.max(strength('bass'), strength('presence')), 0.1],
      [strength('mid'), 0.08],
    ])
  };

  const pianoLikely = pianoConfidence > 0.56 && (
    pianoPercussiveGate > 0.22 ||
    rangeCoverage > 0.76 ||
    strength('presence') > 0.38 ||
    pianoHammerEvidence > 0.24
  );

  if (hasProtectedStringLead({ violinConfidence, bowedStringConfidence, stringStaccatoConfidence, transient, pianoConfidence, pianoPercussiveGate, pianoHammerEvidence, noisy })) {
    scores.violins1 = clamp(Math.max(scores.violins1, violinConfidence * 0.92), 0, 1);
    scores.violins2 = clamp(Math.max(scores.violins2, violinConfidence * 0.78), 0, 1);
    scores.violas = clamp(Math.max(scores.violas, bowedStringConfidence * 0.48), 0, 1);
    scores.harpPiano *= clamp(0.52 - violinConfidence * 0.18, 0.28, 0.52);
    ['woodwindsHigh', 'woodwindsLow', 'horns', 'brass'].forEach((id) => {
      scores[id] *= clamp(0.38 + (windProtectionById[id] || 0) * 0.24, 0.38, 0.68);
    });
  }

  if (stringStaccatoConfidence > 0.5) {
    scores.violins1 = clamp(Math.max(scores.violins1, stringStaccatoConfidence * 0.94), 0, 1);
    scores.violins2 = clamp(Math.max(scores.violins2, stringStaccatoConfidence * 0.78), 0, 1);
    scores.violas = clamp(Math.max(scores.violas, stringStaccatoConfidence * 0.42), 0, 1);
    scores.harpPiano *= clamp(0.42 - stringStaccatoConfidence * 0.12, 0.24, 0.42);
    ['woodwindsHigh', 'woodwindsLow', 'horns', 'brass'].forEach((id) => {
      scores[id] *= clamp(0.42 + (windProtectionById[id] || 0) * 0.18, 0.42, 0.64);
    });
  }

  if (stringConfidence > 0.48 && transient < 0.34 && !pianoLikely) {
    const highStringBias = clamp((presence - lowMid * 0.75) / 0.18, 0, 1);
    ['violins1', 'violins2', 'violas', 'cellos', 'basses'].forEach((id) => {
      scores[id] = clamp(scores[id] * (1 + stringConfidence * 0.16), 0, 1);
    });
    scores.violins1 = clamp(scores.violins1 * (1 + highStringBias * 0.24), 0, 1);
    scores.violins2 = clamp(scores.violins2 * (1 + highStringBias * 0.14), 0, 1);
    scores.violas *= 1 - highStringBias * 0.24;
    ['woodwindsHigh', 'woodwindsLow', 'horns', 'brass'].forEach((id) => {
      const protection = windProtectionById[id] || 0;
      scores[id] *= 1 - stringConfidence * (protection > 0.52 ? 0.08 : 0.28);
    });
    scores.harpPiano *= 1 - stringConfidence * 0.36;
  } else if (pianoLikely) {
    const stringReduction = 1 - pianoConfidence * (pianoPercussiveGate > 0.32 ? 0.46 : 0.3);
    ['violins1', 'violins2', 'violas', 'cellos', 'basses'].forEach((id) => {
      scores[id] *= stringReduction;
    });
  }

  if (keyboardConfidence > 0.52) {
    const reduction = 1 - keyboardConfidence * (pianoLikely ? 0.48 : 0.34);
    Object.keys(scores).forEach((id) => {
      if (id === 'harpPiano' || id === 'percussion' || id === 'timpani') return;
      if (isWindSectionId(id)) {
        const protection = windProtectionById[id] || 0;
        const windReduction = 1 - keyboardConfidence * (protection > 0.52 ? 0.12 : pianoLikely ? 0.28 : 0.22);
        scores[id] *= windReduction;
        return;
      }
      scores[id] *= reduction;
    });
    scores.harpPiano = clamp(Math.max(scores.harpPiano, pianoConfidence * 0.84) + keyboardConfidence * 0.14, 0, 1);
  }

  return {
    scores,
    features: {
      transient,
      tonal,
      noisy,
      rangeCoverage,
      keyboardConfidence,
      pianoConfidence,
      pianoAttack,
      pianoPercussiveGate,
      pianoHammerEvidence,
      woodwindHighConfidence,
      woodwindLowConfidence,
      hornConfidence,
      brassConfidence,
      windConfidence,
      stringConfidence,
      violinConfidence,
      bowedStringConfidence,
      sustainedHighStringEvidence,
      stringStaccatoConfidence,
      lowRegister: centroidLow,
      ensembleDensity
    }
  };
}

function selectStringInstrumentScores(scores, features, maxScore) {
  if (!hasProtectedStringLead(features)) return null;
  const entries = ['violins1', 'violins2', 'violas', 'cellos', 'basses']
    .map((id) => [id, scores[id] || 0])
    .sort((a, b) => b[1] - a[1]);
  const [bestId, bestScore] = entries[0] || ['', 0];
  if (!bestScore) return null;
  const violinConfidence = features.violinConfidence || 0;
  const requiredRatio = violinConfidence > 0.68 ? 0.34 : 0.46;
  if (bestScore < maxScore * requiredRatio) return null;

  const selected = {};
  const staccatoConfidence = features.stringStaccatoConfidence || 0;
  const maxCount = violinConfidence > 0.64 || staccatoConfidence > 0.58 ? 3 : 2;
  const followerRatio = violinConfidence > 0.64 || staccatoConfidence > 0.58 ? 0.48 : 0.58;
  entries.slice(0, maxCount).forEach(([id, score]) => {
    if (score >= bestScore * followerRatio) selected[id] = score;
  });

  if (violinConfidence > 0.5 || staccatoConfidence > 0.5) {
    const lead = Math.max(violinConfidence, staccatoConfidence);
    selected.violins1 = Math.max(selected.violins1 || 0, scores.violins1 || 0, lead * 0.88);
    selected.violins2 = Math.max(selected.violins2 || 0, scores.violins2 || 0, lead * 0.72);
  }
  if (features.lowRegister > 0.68 && (scores.cellos || 0) >= bestScore * 0.68) {
    selected.cellos = scores.cellos;
  }

  return Object.keys(selected).length ? selected : { [bestId]: bestScore };
}

function selectPianoInstrumentScores(scores, features, maxScore) {
  if (!hasProtectedPianoLead(features)) return null;
  const pianoScore = scores.harpPiano || 0;
  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  if (!pianoScore && pianoConfidence < 0.68) return null;
  const selected = {
    harpPiano: Math.max(pianoScore, pianoConfidence * 0.9)
  };

  if ((features.stringConfidence || 0) > 0.64 && (features.pianoPercussiveGate || 0) < 0.52) {
    ['violins1', 'violins2', 'violas', 'cellos']
      .map((id) => [id, scores[id] || 0])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .forEach(([id, score]) => {
        if (score >= selected.harpPiano * 0.72) selected[id] = score;
      });
  }

  return selected;
}

function selectWindInstrumentScores(scores, features, maxScore) {
  const windConfidence = features.windConfidence || 0;
  if (hasProtectedStringLead(features) && windConfidence < (features.bowedStringConfidence || 0) + 0.18) return null;
  const windEntries = ['woodwindsHigh', 'woodwindsLow', 'horns', 'brass']
    .map((id) => [id, scores[id] || 0])
    .sort((a, b) => b[1] - a[1]);
  const [bestWindId, bestWindScore] = windEntries[0] || ['', 0];
  if (!bestWindScore || windConfidence < 0.52) return null;
  const pianoStrike = hasPianoStrike(features);
  if (pianoStrike && !hasProtectedWindLead(features, bestWindId)) return null;
  const leadRatio = windConfidence > 0.68 ? 0.58 : 0.68;
  if (bestWindScore < maxScore * leadRatio) return null;

  const selected = {};
  const maxWindCount = windConfidence > 0.72 ? 3 : 2;
  const followerRatio = windConfidence > 0.72 ? 0.58 : 0.68;
  windEntries.slice(0, maxWindCount).forEach(([id, score]) => {
    const feature = getWindFeatureForId(features, id);
    if (score >= bestWindScore * followerRatio && feature > 0.38) selected[id] = score;
  });

  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  const pianoHasAttack = (features.pianoPercussiveGate || 0) > 0.68 || (features.pianoHammerEvidence || 0) > 0.82;
  if (pianoConfidence > 0.56 && pianoHasAttack && (scores.harpPiano || 0) >= bestWindScore * 0.72) {
    selected.harpPiano = scores.harpPiano;
  }

  if (features.stringConfidence > 0.58) {
    ['violins1', 'violins2', 'violas', 'cellos']
      .map((id) => [id, scores[id] || 0])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .forEach(([id, score]) => {
        if (score >= Math.max(bestWindScore * 0.68, maxScore * 0.5)) selected[id] = score;
      });
  }

  return Object.keys(selected).length ? selected : null;
}

function selectActiveInstrumentScores(scores, features) {
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const maxScore = entries.length ? entries[0][1] : 0;
  if (!maxScore) return {};

  const runnerUp = entries[1] ? entries[1][1] : 0;
  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  const [bestWindId] = getStrongestWindScore(scores);
  const protectedWindLead = hasProtectedWindLead(features, bestWindId);
  const stringSelected = selectStringInstrumentScores(scores, features, maxScore);
  if (stringSelected) return stringSelected;
  const pianoSelected = selectPianoInstrumentScores(scores, features, maxScore);
  if (pianoSelected) return pianoSelected;
  const windSelected = selectWindInstrumentScores(scores, features, maxScore);
  if (windSelected) return windSelected;

  const pianoDominant = (
    pianoConfidence > 0.58 &&
    scores.harpPiano >= maxScore * (pianoConfidence > 0.7 ? 0.72 : 0.84) &&
    scores.harpPiano >= runnerUp * (pianoConfidence > 0.7 ? 0.88 : 0.98) &&
    features.rangeCoverage > 0.42 &&
    features.noisy < 0.62 &&
    ((features.windConfidence || 0) < 0.66 || (
      !protectedWindLead &&
      pianoConfidence > 0.72 &&
      (features.pianoPercussiveGate || 0) > 0.58
    ))
  );
  if (pianoDominant) {
    return { harpPiano: scores.harpPiano };
  }

  const percussionDominant = (
    scores.percussion >= maxScore * 0.94 &&
    features.transient > 0.58 &&
    features.noisy > 0.42
  );
  if (percussionDominant) {
    const selected = { percussion: scores.percussion };
    if (scores.timpani > maxScore * 0.62) selected.timpani = scores.timpani;
    return selected;
  }

  const maxActive = features.stringConfidence > 0.5 && features.transient < 0.28
    ? 3
    : features.ensembleDensity > 0.72 ? 8 : features.ensembleDensity > 0.54 ? 5 : features.ensembleDensity > 0.36 ? 3 : 2;
  const threshold = Math.max(0.2, maxScore * (features.ensembleDensity > 0.6 ? 0.5 : 0.58));
  const selected = {};
  entries.forEach(([id, score]) => {
    if (Object.keys(selected).length >= maxActive) return;
    if (score >= threshold) selected[id] = score;
  });

  if (!Object.keys(selected).length) {
    selected[entries[0][0]] = entries[0][1];
  }
  return selected;
}

function selectFrameInstrumentScores(scores, features) {
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const maxScore = entries.length ? entries[0][1] : 0;
  if (!maxScore) return {};

  const pianoConfidence = features.pianoConfidence || features.keyboardConfidence || 0;
  const pianoEvidence = (features.pianoHammerEvidence || 0) > 0.12 ||
    features.rangeCoverage > 0.78 ||
    features.lowRegister < 0.74;
  const stringSelected = selectStringInstrumentScores(scores, features, maxScore);
  if (stringSelected) return stringSelected;
  const pianoSelected = selectPianoInstrumentScores(scores, features, maxScore);
  if (pianoSelected) return pianoSelected;
  const windSelected = selectWindInstrumentScores(scores, features, maxScore);
  if (windSelected) return windSelected;

  const keyboardLead = (
    pianoConfidence > 0.52 &&
    pianoEvidence &&
    scores.harpPiano >= maxScore * (pianoConfidence > 0.68 ? 0.62 : 0.74) &&
    features.rangeCoverage > 0.42 &&
    features.noisy < 0.68 &&
    (features.windConfidence || 0) < 0.66
  );
  if (keyboardLead) {
    const selected = { harpPiano: scores.harpPiano };
    const stringIds = ['violins1', 'violins2', 'violas', 'cellos', 'basses'];
    if (features.stringConfidence > 0.58 && features.transient < 0.52) {
      stringIds
        .map((id) => [id, scores[id] || 0])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .forEach(([id, score]) => {
          if (score >= maxScore * 0.6) selected[id] = score;
        });
    }
    return selected;
  }

  const lowStringLead = (
    features.lowRegister > 0.58 &&
    features.stringConfidence > 0.58 &&
    (features.windConfidence || 0) < 0.58 &&
    features.transient < 0.3 &&
    scores.cellos >= maxScore * 0.92
  );
  if (lowStringLead) {
    const selected = { cellos: scores.cellos };
    if (features.lowRegister > 0.72 && scores.basses >= maxScore * 0.9) selected.basses = scores.basses;
    return selected;
  }

  const selected = selectActiveInstrumentScores(scores, features);
  const pianoLikely = pianoConfidence > 0.56 && (
    (features.pianoPercussiveGate || 0) > 0.22 ||
    features.rangeCoverage > 0.76 ||
    (features.pianoHammerEvidence || 0) > 0.24
  );
  if (!pianoLikely && features.stringConfidence > 0.6 && features.transient < 0.34 && selected.harpPiano && Object.keys(selected).length > 1) {
    delete selected.harpPiano;
  }
  suppressWeakFrameFollowers(selected);
  return selected;
}

function suppressWeakFrameFollowers(selected) {
  const entries = Object.entries(selected).sort((a, b) => b[1] - a[1]);
  if (entries.length <= 1) return;
  const best = entries[0][1];
  entries.slice(1).forEach(([id, score]) => {
    const keepWindFollower = isWindSectionId(id) && score >= best * 0.42;
    if (!keepWindFollower && score < best * 0.52) delete selected[id];
  });
}

function weightedScore(parts) {
  let total = 0;
  let weight = 0;
  parts.forEach(([value, itemWeight]) => {
    total += clamp(value, 0, 1) * itemWeight;
    weight += itemWeight;
  });
  return weight ? clamp(total / weight, 0, 1) : 0;
}

async function analyzeWithDeepAudioModel(samples, sampleRate) {
  if (!samples || !samples.length) return createEmptyAiProfile('skipped', 'empty audio');

  try {
    const runtime = await withTimeout(loadDeepAudioModel(), DEEP_AUDIO_MODEL.timeoutMs, 'AI model load timed out');
    if (!runtime || !runtime.extractor || !runtime.model) {
      return createEmptyAiProfile('unavailable', deepAudioModelState.reason || 'model unavailable');
    }

    const modelInput = prepareDeepAudioInput(samples, sampleRate);
    if (!modelInput || modelInput.length < DEEP_AUDIO_MODEL.targetSampleRate) {
      return createEmptyAiProfile('skipped', 'audio too short');
    }

    await nextFrame();
    const features = runtime.extractor.computeFrameWise(modelInput, DEEP_AUDIO_MODEL.hopSize);
    const predictions = await withTimeout(runtime.model.predict(features, true), DEEP_AUDIO_MODEL.timeoutMs, 'AI model inference timed out');
    return buildAiProfileFromPredictions(predictions);
  } catch (error) {
    console.warn('Deep audio model unavailable:', error);
    return createEmptyAiProfile('unavailable', error && error.message ? error.message : String(error));
  }
}

function loadDeepAudioModel() {
  if (deepAudioModelState.model && deepAudioModelState.extractor) {
    return Promise.resolve(deepAudioModelState);
  }
  if (deepAudioModelState.unavailable) {
    return Promise.resolve(null);
  }
  if (deepAudioModelState.loadPromise) return deepAudioModelState.loadPromise;

  deepAudioModelState.loadPromise = (async () => {
    if (!window.tf) throw new Error('TensorFlow.js is not loaded');
    if (!window.EssentiaWASM || !window.EssentiaModel) throw new Error('Essentia.js model runtime is not loaded');

    if (window.tf.setBackend && window.tf.getBackend && window.tf.getBackend() !== 'webgl') {
      try {
        await window.tf.setBackend('webgl');
      } catch (error) {
        console.warn('TF.js WebGL backend unavailable; using current backend.', error);
      }
    }
    if (window.tf.ready) await window.tf.ready();

    const wasmModule = await window.EssentiaWASM();
    const extractor = new window.EssentiaModel.EssentiaTFInputExtractor(wasmModule, 'musicnn', false);
    const model = new window.EssentiaModel.TensorflowMusiCNN(window.tf, DEEP_AUDIO_MODEL.modelUrl, false);
    await model.initialize();

    deepAudioModelState.extractor = extractor;
    deepAudioModelState.model = model;
    deepAudioModelState.unavailable = false;
    deepAudioModelState.reason = '';
    return deepAudioModelState;
  })().catch((error) => {
    deepAudioModelState.unavailable = true;
    deepAudioModelState.reason = error && error.message ? error.message : String(error);
    deepAudioModelState.loadPromise = null;
    return null;
  });

  return deepAudioModelState.loadPromise;
}

function prepareDeepAudioInput(samples, sampleRate) {
  const sourceRate = Math.max(1, sampleRate || DEEP_AUDIO_MODEL.targetSampleRate);
  const totalSeconds = samples.length / sourceRate;
  if (totalSeconds <= DEEP_AUDIO_MODEL.maxSeconds + 1) {
    return normalizeAudioForModel(resampleAudioRange(samples, sourceRate, DEEP_AUDIO_MODEL.targetSampleRate, 0, samples.length));
  }

  const clipSeconds = 6;
  const clipCount = Math.min(9, Math.max(4, Math.ceil(totalSeconds / 48)));
  const sourceClipLength = Math.max(1, Math.floor(clipSeconds * sourceRate));
  const targetClipLength = Math.max(1, Math.round(clipSeconds * DEEP_AUDIO_MODEL.targetSampleRate));
  const output = new Float32Array(targetClipLength * clipCount);

  for (let clip = 0; clip < clipCount; clip += 1) {
    const ratio = clipCount === 1 ? 0.5 : clip / (clipCount - 1);
    const center = Math.floor(ratio * Math.max(0, samples.length - 1));
    const start = clamp(Math.floor(center - sourceClipLength / 2), 0, Math.max(0, samples.length - sourceClipLength));
    const segment = resampleAudioRange(samples, sourceRate, DEEP_AUDIO_MODEL.targetSampleRate, start, sourceClipLength);
    output.set(segment.subarray(0, targetClipLength), clip * targetClipLength);
  }

  return normalizeAudioForModel(output);
}

function resampleAudioRange(samples, sourceRate, targetRate, sourceStart, sourceLength) {
  const targetLength = Math.max(1, Math.round((sourceLength / sourceRate) * targetRate));
  const output = new Float32Array(targetLength);
  const ratio = sourceRate / targetRate;
  const maxIndex = samples.length - 1;

  for (let i = 0; i < targetLength; i += 1) {
    const sourcePosition = sourceStart + i * ratio;
    const left = clamp(Math.floor(sourcePosition), 0, maxIndex);
    const right = Math.min(maxIndex, left + 1);
    const mix = sourcePosition - left;
    output[i] = (samples[left] || 0) * (1 - mix) + (samples[right] || 0) * mix;
  }

  return output;
}

function normalizeAudioForModel(samples) {
  let peak = 0;
  let dc = 0;
  for (let i = 0; i < samples.length; i += 1) {
    const value = samples[i] || 0;
    peak = Math.max(peak, Math.abs(value));
    dc += value;
  }
  const offset = samples.length ? dc / samples.length : 0;
  const scale = peak > 1 ? 1 / peak : 1;
  const output = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i += 1) {
    output[i] = clamp(((samples[i] || 0) - offset) * scale, -1, 1);
  }
  return output;
}

function buildAiProfileFromPredictions(predictions) {
  const rows = normalizePredictionRows(predictions);
  if (!rows.length) return createEmptyAiProfile('empty', 'no model predictions');

  const tagScores = {};
  DEEP_AUDIO_MODEL.classes.forEach((tag, index) => {
    let peak = 0;
    let sum = 0;
    rows.forEach((row) => {
      const value = clamp(Number(row[index]) || 0, 0, 1);
      peak = Math.max(peak, value);
      sum += value;
    });
    const mean = sum / rows.length;
    tagScores[tag] = clamp(peak * 0.72 + mean * 0.28, 0, 1);
  });

  const sectionScores = {};
  Object.entries(DEEP_AUDIO_MODEL.sectionWeights).forEach(([tag, weights]) => {
    const tagScore = tagScores[tag] || 0;
    Object.entries(weights).forEach(([sectionId, weight]) => {
      sectionScores[sectionId] = Math.max(sectionScores[sectionId] || 0, clamp(tagScore * weight, 0, 1));
    });
  });

  const topTags = Object.entries(tagScores)
    .filter(([, score]) => score >= DEEP_AUDIO_MODEL.minTagScore)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag, score]) => ({ tag, score }));

  return {
    enabled: true,
    source: DEEP_AUDIO_MODEL.source,
    status: 'ready',
    tagScores,
    sectionScores,
    topTags,
    activeIds: Object.entries(sectionScores)
      .filter(([id, score]) => score >= getAiActivationThreshold(id))
      .map(([id]) => id)
  };
}

function normalizePredictionRows(predictions) {
  if (!Array.isArray(predictions)) return [];
  if (!predictions.length) return [];
  if (Array.isArray(predictions[0])) return predictions;
  if (predictions.length === DEEP_AUDIO_MODEL.classes.length) return [predictions];
  return [];
}

function createEmptyAiProfile(status, reason) {
  return {
    enabled: false,
    source: DEEP_AUDIO_MODEL.source,
    status,
    reason: reason || '',
    tagScores: {},
    sectionScores: {},
    topTags: [],
    activeIds: []
  };
}

function applyAiToSelectedScores(selectedScores, profileScores, features, aiProfile) {
  if (!aiProfile || !aiProfile.enabled || !aiProfile.sectionScores) return selectedScores;
  const selected = { ...selectedScores };
  ORCHESTRA_SECTIONS.forEach((section) => {
    const aiScore = getAiSectionScore(aiProfile, section.id);
    if (aiScore < getAiActivationThreshold(section.id)) return;
    if (section.id === 'harpPiano' && hasProtectedStringLead(features)) return;
    if (isWindSectionId(section.id) && hasProtectedStringLead(features) && aiScore < 0.42) return;
    const localFeature = getAiLocalFeature(section.id, features);
    const profileScore = profileScores[section.id] || 0;
    const evidence = Math.max(profileScore, localFeature, aiScore * 0.64);
    selected[section.id] = Math.max(selected[section.id] || 0, clamp(evidence * 0.55 + aiScore * 0.58, 0, 1));
  });
  return selected;
}

function applyAiToFrameScores(activeScores, combinedScores, signatureScores, features, aiProfile) {
  if (!aiProfile || !aiProfile.enabled || !aiProfile.sectionScores) return activeScores;
  let next = activeScores;

  ORCHESTRA_SECTIONS.forEach((section) => {
    const aiScore = getAiSectionScore(aiProfile, section.id);
    if (aiScore < getAiActivationThreshold(section.id)) return;
    if (section.id === 'harpPiano' && hasProtectedStringLead(features)) return;
    if (isWindSectionId(section.id) && hasProtectedStringLead(features) && aiScore < 0.42) return;
    const localFeature = getAiLocalFeature(section.id, features);
    const localEvidence = Math.max(combinedScores[section.id] || 0, signatureScores[section.id] || 0, localFeature);
    if (localEvidence < getAiFrameEvidenceThreshold(section.id, aiScore)) return;
    if (next === activeScores) next = { ...activeScores };
    next[section.id] = Math.max(next[section.id] || 0, clamp(localEvidence * (0.72 + aiScore * 0.28), 0, 1));
  });

  return next;
}

function getAiSectionScore(aiProfile, sectionId) {
  return aiProfile && aiProfile.sectionScores ? aiProfile.sectionScores[sectionId] || 0 : 0;
}

function getAiActivationThreshold(sectionId) {
  const thresholds = {
    harpPiano: 0.11,
    woodwindsHigh: 0.1,
    violins1: 0.12,
    violins2: 0.12,
    violas: 0.14,
    cellos: 0.12,
    basses: 0.2,
    percussion: 0.26,
    timpani: 0.3
  };
  return thresholds[sectionId] || 0.18;
}

function getAiFrameEvidenceThreshold(sectionId, aiScore) {
  const base = {
    harpPiano: 0.2,
    woodwindsHigh: 0.18,
    cellos: 0.2,
    violins1: 0.18,
    violins2: 0.18,
    percussion: 0.32,
    timpani: 0.42
  };
  return Math.max((base[sectionId] || 0.24) - aiScore * 0.08, 0.12);
}

function getAiLocalFeature(sectionId, features) {
  if (!features) return 0;
  if (sectionId === 'harpPiano') {
    return Math.max(
      features.pianoConfidence || 0,
      features.keyboardConfidence || 0,
      (features.pianoHammerEvidence || 0) * 0.9,
      (features.pianoPercussiveGate || 0) * 0.72
    );
  }
  if (sectionId === 'woodwindsHigh') return Math.max(features.woodwindHighConfidence || 0, features.windConfidence || 0);
  if (isWindSectionId(sectionId)) return getWindFeatureForId(features, sectionId);
  if (sectionId === 'basses') return Math.max(features.lowRegister || 0, (features.stringConfidence || 0) * 0.52);
  if (sectionId === 'cellos' || sectionId === 'violas' || sectionId === 'violins1' || sectionId === 'violins2') {
    return Math.max(
      features.stringConfidence || 0,
      features.bowedStringConfidence || 0,
      features.stringStaccatoConfidence || 0,
      sectionId.startsWith('violins') ? features.violinConfidence || 0 : 0
    );
  }
  if (sectionId === 'percussion' || sectionId === 'timpani') {
    return Math.max(features.transient || 0, (features.noisy || 0) * 0.78);
  }
  return 0;
}

function summarizeAiInstrumentProfile(aiProfile) {
  if (!aiProfile) return createEmptyAiProfile('skipped', 'not run');
  return {
    enabled: aiProfile.enabled,
    source: aiProfile.source,
    status: aiProfile.status,
    reason: aiProfile.reason || '',
    topTags: aiProfile.topTags || [],
    activeIds: aiProfile.activeIds || []
  };
}

function withTimeout(promise, timeoutMs, message) {
  let timer = 0;
  const timeout = new Promise((_, reject) => {
    timer = window.setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => {
    window.clearTimeout(timer);
  });
}

function analyzeMixHealth({ loudness, spectrum, stereo, tempo, zeroCrossing }) {
  const bandMap = Object.fromEntries(spectrum.bands.map((band) => [band.key, band.percent]));
  const sub = bandMap.sub || 0;
  const bass = bandMap.bass || 0;
  const lowMid = bandMap.lowMid || 0;
  const mid = bandMap.mid || 0;
  const presence = bandMap.presence || 0;
  const air = bandMap.air || 0;
  const lowWeight = sub + bass;
  const bodyWeight = lowMid + mid * 0.45;
  const upperWeight = presence + air;
  const mud = clamp((lowMid - 0.145) * 7.2 + (lowWeight - 0.34) * 1.4, 0, 1);
  const harshness = clamp((presence - 0.13) * 6.4 + spectrum.brightness * 1.4 + ((zeroCrossing && zeroCrossing.rate) || 0) * 1.2, 0, 1);
  const thinness = clamp((0.22 - lowWeight - lowMid * 0.35) * 3.4 + (upperWeight - 0.26) * 1.15, 0, 1);
  const airDeficit = clamp((0.105 - air) * 7.8 + (0.24 - spectrum.brightness) * 1.35, 0, 1);
  const transientStress = clamp((loudness.crest - 12) / 10 + tempo.onsetDensity / 8, 0, 1);
  const density = clamp(tempo.onsetDensity / 5.2, 0, 1);
  const phaseRisk = clamp((0.18 - stereo.correlation) * 2.5 + Math.max(0, stereo.width - 1.05) * 0.55, 0, 1);
  const monoCompatibility = clamp((stereo.correlation + 1) / 2 - phaseRisk * 0.25, 0, 1);
  const clarity = clamp(1 - mud * 0.44 - harshness * 0.28 + air * 1.4 - spectrum.flatness * 0.22, 0, 1);
  const warmth = clamp(lowWeight * 2.7 + bodyWeight * 1.5 - harshness * 0.24, 0, 1);
  const polishNeed = clamp((mud + harshness + thinness + airDeficit + phaseRisk) / 5, 0, 1);
  return { mud, harshness, thinness, airDeficit, transientStress, density, phaseRisk, monoCompatibility, clarity, warmth, polishNeed };
}

function buildTraits({ loudness, tempo, spectrum, stereo, mixHealth }) {
  return [
    { key: 'energy', label: '에너지', value: loudness.energyScore },
    { key: 'pace', label: '속도감', value: tempo.bpm ? clamp((tempo.bpm - 55) / 140, 0, 1) : 0 },
    { key: 'brightness', label: '밝기', value: clamp(spectrum.brightness * 3.2, 0, 1) },
    { key: 'warmth', label: '온기', value: mixHealth ? mixHealth.warmth : clamp(spectrum.warmth * 6, 0, 1) },
    { key: 'space', label: '공간감', value: clamp(stereo.width / 1.25 + (mixHealth ? (1 - mixHealth.phaseRisk) * 0.08 : 0), 0, 1) },
    { key: 'texture', label: '질감', value: mixHealth ? clamp(1 - mixHealth.clarity * 0.72 + spectrum.flatness * 0.55, 0, 1) : clamp(spectrum.flatness * 3, 0, 1) }
  ];
}

function buildRemasterProfile({ loudness, spectrum, stereo, tempo, mixHealth }) {
  const bandMap = Object.fromEntries(spectrum.bands.map((band) => [band.key, band.percent]));
  const bass = (bandMap.sub || 0) + (bandMap.bass || 0);
  const lowMid = bandMap.lowMid || 0;
  const presence = bandMap.presence || 0;
  const air = bandMap.air || 0;
  const health = mixHealth || analyzeMixHealth({
    loudness,
    spectrum,
    stereo,
    tempo,
    zeroCrossing: { rate: 0, perSecond: 0 }
  });
  const targetRmsDb = clamp(-16.7 - (loudness.dynamicRange - 10) * 0.06 + health.density * 0.55 - health.transientStress * 0.35, -18.2, -15.2);
  const peakSafetyDb = -1.1;
  const desiredGainDb = targetRmsDb - loudness.rmsDb;
  const peakLimitedGainDb = peakSafetyDb - loudness.peakDb + 1.9 - health.transientStress * 0.55;
  const inputGainDb = clamp(Math.min(desiredGainDb, peakLimitedGainDb), -4.8, 8.2);
  const lowShelfDb = clamp((0.225 - bass) * 9.8 + health.thinness * 1.25 - health.mud * 0.72, -3.2, 3.0);
  const lowMidDb = clamp((0.145 - lowMid) * 12.4 - health.mud * 1.65 + health.thinness * 0.42, -3.6, 2.4);
  const presenceDb = clamp((0.125 - presence) * 7.6 + health.clarity * 0.55 - health.harshness * 1.65, -3.1, 2.7);
  const highShelfDb = clamp(health.airDeficit * 2.45 + (0.11 - air) * 5.4 - health.harshness * 0.72 - spectrum.flatness * 0.85, -2.9, 3.4);
  const harshnessTameDb = clamp(-0.35 - health.harshness * 2.4 - spectrum.flatness * 0.45, -3.2, 0);
  const compressorThreshold = clamp(-14 - loudness.dynamicRange * 0.55 - health.transientStress * 2.4 + health.density * 1.2, -25, -12);
  const compressorRatio = clamp(1.35 + loudness.dynamicRange / 13 + health.transientStress * 0.55 - health.density * 0.15, 1.35, 3.15);
  const compressorAttack = clamp(0.0035 + (1 - health.transientStress) * 0.007 + health.density * 0.0015, 0.003, 0.014);
  const compressorRelease = tempo.bpm > 145 ? 0.12 : tempo.bpm > 95 ? 0.18 : 0.25;
  const widthScale = clamp(1 + (0.55 - stereo.width) * 0.23 - health.phaseRisk * 0.2, 0.86, 1.18);
  const roomScale = clamp(1 + (loudness.dynamicRange - 10) * 0.018 - loudness.energyScore * 0.08 + health.airDeficit * 0.04, 0.88, 1.12);
  const depthScale = clamp(1 + (loudness.dynamicRange - 10) * 0.025 - health.density * 0.06 + health.airDeficit * 0.035, 0.9, 1.18);
  const clarityMix = clamp(0.12 + (1 - health.clarity) * 0.08 + health.phaseRisk * 0.06, 0.1, 0.24);
  const harmonicDrive = clamp(0.018 + health.thinness * 0.035 + health.airDeficit * 0.018 - health.harshness * 0.012, 0.006, 0.07);
  const outputTrimDb = clamp(-Math.max(0, inputGainDb - 3.2) * 0.18 - health.transientStress * 0.16, -1.5, 0);
  const sectionFocus = {
    strings: clamp(1 + health.airDeficit * 0.1 - health.harshness * 0.06, 0.88, 1.14),
    woodwinds: clamp(1 + health.clarity * 0.08 + health.airDeficit * 0.04, 0.9, 1.14),
    brass: clamp(1 - health.harshness * 0.08 + loudness.energyScore * 0.04, 0.86, 1.1),
    low: clamp(1 + health.thinness * 0.12 - health.mud * 0.14, 0.84, 1.16),
    percussion: clamp(1 + health.transientStress * 0.08 - health.harshness * 0.05, 0.9, 1.14)
  };
  const limiterThreshold = -1.1;

  return {
    targetRmsDb,
    inputGainDb,
    lowShelfDb,
    lowMidDb,
    presenceDb,
    highShelfDb,
    harshnessTameDb,
    compressorThreshold,
    compressorRatio,
    compressorAttack,
    compressorRelease,
    widthScale,
    roomScale,
    depthScale,
    clarityMix,
    harmonicDrive,
    outputTrimDb,
    sectionFocus,
    limiterThreshold,
    rows: [
      { label: 'Loudness', detail: `목표 RMS ${targetRmsDb.toFixed(1)} dBFS 기준 자동 보정`, value: signedDb(inputGainDb) },
      { label: 'Low EQ', detail: bass > 0.28 ? '저역 과밀을 정리' : '저역 기반을 보강', value: signedDb(lowShelfDb) },
      { label: 'Body EQ', detail: lowMid > 0.18 ? '250-500 Hz 혼탁도 감소' : '중저역 밀도 보정', value: signedDb(lowMidDb) },
      { label: 'Presence', detail: presence > 0.18 ? '존재감 대역 자극 완화' : '선명도 보강', value: signedDb(presenceDb) },
      { label: 'Air', detail: air > 0.12 ? '초고역 거칠음 완화' : '공기감 보강', value: signedDb(highShelfDb) },
      { label: 'De-harsh', detail: '5-7 kHz 거친 질감 완화', value: signedDb(harshnessTameDb) },
      { label: 'Glue', detail: `다이내믹 ${loudness.dynamicRange.toFixed(1)} dB 기준 버스 컴프레션`, value: `${compressorRatio.toFixed(1)}:1` },
      { label: 'Limiter', detail: '렌더링 피크 보호', value: `${limiterThreshold.toFixed(1)} dB` },
      { label: 'Stage', detail: stereo.width < 0.32 ? '좁은 원본을 더 넓게 배치' : stereo.width > 0.95 ? '과도한 폭을 안정화' : '원본 폭 유지', value: `${Math.round(widthScale * 100)}%` },
      { label: 'Depth', detail: '다이내믹과 밀도에 맞춘 홀 깊이 보정', value: `${Math.round(depthScale * 100)}%` }
    ]
  };
}

function createNeutralRemasterProfile() {
  return {
    targetRmsDb: -16.5,
    inputGainDb: 0,
    lowShelfDb: 0,
    lowMidDb: 0,
    presenceDb: 0,
    highShelfDb: 0,
    harshnessTameDb: 0,
    compressorThreshold: -14,
    compressorRatio: 1.4,
    compressorAttack: 0.01,
    compressorRelease: 0.22,
    widthScale: 1,
    roomScale: 1,
    depthScale: 1,
    clarityMix: 0.12,
    harmonicDrive: 0,
    outputTrimDb: 0,
    sectionFocus: {
      strings: 1,
      woodwinds: 1,
      brass: 1,
      low: 1,
      percussion: 1
    },
    limiterThreshold: -1.1,
    rows: []
  };
}

function buildReport({ audioBuffer, tempo, key, loudness, spectrum, stereo, pitch, zeroCrossing, traits, remaster, mixHealth }) {
  const energyTrait = traits.find((trait) => trait.key === 'energy');
  const brightnessTrait = traits.find((trait) => trait.key === 'brightness');
  const warmthTrait = traits.find((trait) => trait.key === 'warmth');
  const energy = energyTrait ? energyTrait.value : 0;
  const brightness = brightnessTrait ? brightnessTrait.value : 0;
  const warmth = warmthTrait ? warmthTrait.value : 0;
  const mood = key.mode === 'minor' ? '어두운 긴장감' : '개방적인 안정감';
  const tempoText = tempo.bpm ? `${tempo.bpm} BPM` : '불명확한 템포';
  const toneText = brightness > 0.62 ? '고역이 선명한 편' : warmth > 0.55 ? '저역과 중저역이 두꺼운 편' : '대역 균형이 중립적인 편';
  const dynamicText = loudness.dynamicRange > 13 ? '다이내믹 변화가 넓습니다' : loudness.dynamicRange > 7 ? '다이내믹 변화가 적절합니다' : '압축감이 강한 편입니다';
  const spatialText = stereo.width > 0.75 ? '원본도 넓은 스테레오 이미지를 갖고 있어 무대 폭을 과도하게 키우지 않는 설정이 좋습니다' : '원본 폭이 비교적 좁아 오케스트라 좌우 배치가 공간감을 크게 확장합니다';
  const healthText = mixHealth
    ? `믹스 상태는 명료도 ${Math.round(mixHealth.clarity * 100)}%, 모노 호환성 ${Math.round(mixHealth.monoCompatibility * 100)}%, 폴리싱 필요도 ${Math.round(mixHealth.polishNeed * 100)}%로 해석했습니다.`
    : '';
  const masterText = `자동 리마스터는 ${signedDb(remaster.inputGainDb)} 라우드니스 보정, ${signedDb(remaster.lowShelfDb)} 저역 EQ, ${signedDb(remaster.highShelfDb)} 에어 EQ, ${signedDb(remaster.harshnessTameDb || 0)} 디하싱, ${remaster.compressorRatio.toFixed(1)}:1 글루 컴프레션으로 계산했습니다.`;
  const copy = `${key.label} 기반으로 ${mood}이 감지되고, ${tempoText} 흐름에서 ${toneText}입니다. ${dynamicText}. ${spatialText}. 공간화는 전방 현악, 중앙 목관, 후방 금관과 타악의 깊이를 분리해 대편성 무대처럼 들리도록 구성했습니다. ${healthText} ${masterText}`;

  return {
    copy,
    facts: [
      `샘플레이트 ${formatNumber(audioBuffer.sampleRate)} Hz`,
      `${audioBuffer.numberOfChannels} 채널`,
      `추정 피치 ${pitch.note} ${formatHz(pitch.frequency)}`,
      `영교차 ${zeroCrossing.perSecond.toFixed(1)} /s`,
      `크레스트 ${loudness.crest.toFixed(1)} dB`,
      `스펙트럼 확산 ${formatHz(spectrum.spread)}`
    ],
    energy
  };
}

function deriveHue(key, spectrum) {
  const rootIndex = NOTE_NAMES.indexOf(key.root);
  const rootHue = rootIndex >= 0 ? rootIndex * 30 : 170;
  return (rootHue + spectrum.brightness * 80 + (key.mode === 'minor' ? 24 : 0)) % 360;
}

function applyAnalysis(analysis) {
  const displayTitle = analysis.tags.title || stripExtension(analysis.file.name);
  refs.trackKicker.textContent = 'ANALYZED';
  refs.trackName.textContent = displayTitle;
  refs.trackSubtitle.textContent = `${formatTime(analysis.duration)} · ${analysis.channels}채널 · ${formatBytes(analysis.file.size)}`;

  refs.metrics.duration.textContent = formatTime(analysis.duration);
  refs.metrics.durationNote.textContent = `${formatNumber(analysis.sampleRate)} Hz`;
  refs.metrics.tempo.textContent = analysis.tempo.bpm ? `${analysis.tempo.bpm}` : '--';
  refs.metrics.tempoNote.textContent = `${Math.round(analysis.tempo.confidence * 100)}% confidence`;
  refs.metrics.key.textContent = analysis.key.label;
  refs.metrics.keyNote.textContent = `${Math.round(analysis.key.confidence * 100)}% confidence`;
  refs.metrics.loudness.textContent = `${analysis.loudness.rmsDb.toFixed(1)} dBFS`;
  refs.metrics.loudnessNote.textContent = `${analysis.loudness.approximateLufs.toFixed(1)} LUFS approx`;
  refs.metrics.dynamic.textContent = `${analysis.loudness.dynamicRange.toFixed(1)} dB`;
  refs.metrics.dynamicNote.textContent = `crest ${analysis.loudness.crest.toFixed(1)} dB`;
  refs.metrics.peak.textContent = `${analysis.loudness.peakDb.toFixed(1)} dBFS`;
  refs.metrics.peakNote.textContent = `${Math.round(analysis.loudness.peak * 100)}% amplitude`;
  refs.metrics.centroid.textContent = formatHz(analysis.spectrum.centroid);
  refs.metrics.centroidNote.textContent = `spread ${formatHz(analysis.spectrum.spread)}`;
  refs.metrics.rolloff.textContent = formatHz(analysis.spectrum.rolloff);
  refs.metrics.rolloffNote.textContent = 'spectral rolloff';
  refs.metrics.stereo.textContent = analysis.stereo.label;
  refs.metrics.stereoNote.textContent = `corr ${analysis.stereo.correlation.toFixed(2)}`;
  refs.metrics.flatness.textContent = analysis.spectrum.flatness.toFixed(2);
  refs.metrics.flatnessNote.textContent = analysis.spectrum.flatness > 0.22 ? 'noise-like' : 'tonal';
  refs.metrics.pitch.textContent = analysis.pitch.note;
  refs.metrics.pitchNote.textContent = formatHz(analysis.pitch.frequency);
  refs.metrics.clip.textContent = `${analysis.loudness.clippingPercent.toFixed(3)}%`;
  refs.metrics.clipNote.textContent = `DC ${analysis.loudness.dcOffset.toFixed(4)}`;

  refs.totalTime.textContent = formatTime(analysis.duration);
  refs.currentTime.textContent = '0:00';
  refs.seekSlider.value = 0;
  refs.seekSlider.disabled = false;
  refs.playButton.disabled = false;
  refs.stopButton.disabled = false;
  refs.exportButton.disabled = false;
  refs.resetButton.hidden = false;

  renderMetadata(analysis);
  renderBands(analysis);
  renderStage(analysis, 0.22);
  renderReport(analysis);
  renderRemasterProfile(analysis);
  renderRemasterComparison(analysis);
  renderTimeline(analysis);
  if (state.settings.remaster) {
    applyRemasterSpatialPreset({ animate: true, rememberManual: false });
  } else {
    updateRemasterModeUi({ animateCompare: true });
  }
  resetTags('완료');
  refs.tags.stage.textContent = getStageDetectionSummary(analysis);
  renderAiInsights(analysis);
  drawAllCanvases();
}

function renderMetadata(analysis) {
  const rows = [
    ['파일명', analysis.file.name],
    ['형식', analysis.file.type || 'unknown'],
    ['크기', formatBytes(analysis.file.size)],
    ['길이', formatTime(analysis.duration)],
    ['비트레이트 추정', `${analysis.bitrate.toFixed(0)} kbps`],
    ['채널', `${analysis.channels}`],
    ['샘플레이트', `${formatNumber(analysis.sampleRate)} Hz`],
    ['제목 태그', analysis.tags.title || '-'],
    ['아티스트 태그', analysis.tags.artist || '-'],
    ['앨범 태그', analysis.tags.album || '-'],
    ['장르 태그', analysis.tags.genre || '-'],
    ['AI model', getAiMetadataLabel(analysis.aiProfile)]
  ];

  refs.metadataList.innerHTML = rows.map(([label, value]) => `
    <div>
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(String(value))}</dd>
    </div>
  `).join('');
}

function getAiMetadataLabel(aiProfile) {
  if (!aiProfile) return 'not run';
  if (!aiProfile.enabled) return `${aiProfile.source}: ${aiProfile.status}${aiProfile.reason ? ` (${aiProfile.reason})` : ''}`;
  const tags = (aiProfile.topTags || []).slice(0, 4).map((item) => `${item.tag} ${Math.round(item.score * 100)}%`);
  return tags.length ? `${aiProfile.source}: ${tags.join(', ')}` : `${aiProfile.source}: ready`;
}

function renderAiInsights(analysis) {
  if (!refs.aiSummaryGrid || !refs.aiChipList || !refs.aiSectionGrid) return;
  const aiProfile = analysis.aiProfile || createEmptyAiProfile('skipped', 'not run');
  refs.tags.ai.textContent = getAiTagLabel(aiProfile);

  const cards = buildAiSummaryCards(analysis, aiProfile);
  refs.aiSummaryGrid.innerHTML = cards.map((card) => `
    <div class="ai-summary-card">
      <span>${escapeHtml(card.label)}</span>
      <strong>${escapeHtml(card.value)}</strong>
      <small>${escapeHtml(card.note)}</small>
    </div>
  `).join('');

  const topTags = aiProfile.enabled && aiProfile.topTags && aiProfile.topTags.length
    ? aiProfile.topTags.slice(0, 8)
    : [];
  refs.aiChipList.innerHTML = topTags.length
    ? topTags.map((item) => `
      <span class="ai-chip" style="--value:${Math.round(item.score * 100)}%">
        <strong>${escapeHtml(item.tag)}</strong>
        <em>${Math.round(item.score * 100)}%</em>
      </span>
    `).join('')
    : '<span class="ai-chip is-muted"><strong>AI tags</strong><em>대기</em></span>';

  const rows = buildAiSectionRows(analysis, aiProfile);
  refs.aiSectionGrid.innerHTML = rows.map((row) => `
    <div class="ai-section-row ${row.active ? '' : 'is-inactive'}" style="--section-color:${row.color};--value:${Math.round(row.value * 100)}%">
      <strong>${escapeHtml(row.short)}</strong>
      <span>${escapeHtml(row.label)}</span>
      <em>${Math.round(row.value * 100)}%</em>
      <i aria-hidden="true"><b></b></i>
    </div>
  `).join('');
}

function buildAiSummaryCards(analysis, aiProfile) {
  const activeIds = analysis.instrumentProfile && analysis.instrumentProfile.activeIds
    ? analysis.instrumentProfile.activeIds
    : [];
  const backend = window.tf && window.tf.getBackend ? window.tf.getBackend() : 'native';
  const aiState = aiProfile.enabled ? 'ON' : 'Fallback';
  const mix = analysis.mixHealth || {};
  const mixScore = Math.round(clamp(
    (mix.clarity || 0) * 0.44 +
    (mix.monoCompatibility || 0) * 0.34 +
    (1 - (mix.polishNeed || 0.5)) * 0.22,
    0,
    1
  ) * 100);
  const dynamicDensity = analysis.stageActivity && analysis.stageActivity.activeIds
    ? analysis.stageActivity.activeIds.length
    : activeIds.length;
  const spatialScore = Math.round(clamp(activeIds.length / 8 * 0.55 + dynamicDensity / 12 * 0.45, 0, 1) * 100);

  return [
    { label: 'Model', value: aiState, note: aiProfile.enabled ? `${aiProfile.source} · ${backend}` : aiProfile.reason || aiProfile.status },
    { label: 'Detected', value: `${activeIds.length}`, note: activeIds.length ? activeIds.map((id) => ORCHESTRA_BY_ID[id] ? ORCHESTRA_BY_ID[id].short : id).slice(0, 4).join(', ') : 'active sections' },
    { label: 'Mix Readiness', value: `${mixScore}%`, note: `clarity ${Math.round((mix.clarity || 0) * 100)}%` },
    { label: 'Stage Depth', value: `${spatialScore}%`, note: `${dynamicDensity} live lanes` }
  ];
}

function buildAiSectionRows(analysis, aiProfile) {
  const displayMap = getStageDisplayLevelMap(analysis);
  const activeMap = getStageActiveMap(analysis);
  const dynamicMax = analysis.stageActivity && analysis.stageActivity.maxLevels ? analysis.stageActivity.maxLevels : {};
  return ORCHESTRA_SECTIONS.map((section) => {
    const aiScore = getAiSectionScore(aiProfile, section.id);
    const display = displayMap[section.id] || 0;
    const dynamic = dynamicMax[section.id] || 0;
    const value = clamp(Math.max(aiScore, display * 0.88, dynamic), 0, 1);
    return {
      id: section.id,
      short: section.short,
      label: section.label,
      color: section.color,
      value,
      active: activeMap[section.id] !== false && value > 0.05
    };
  }).sort((a, b) => Number(b.active) - Number(a.active) || b.value - a.value);
}

function getAiTagLabel(aiProfile) {
  if (!aiProfile) return '대기';
  if (aiProfile.enabled) return 'AI 활성';
  return aiProfile.status === 'unavailable' ? 'AI 폴백' : 'AI 대기';
}

function renderBands(analysis) {
  refs.bandList.innerHTML = analysis.spectrum.bands.map((band) => {
    const value = clamp(band.percent * 6, 0, 1);
    return `
      <div class="band-row">
        <strong>${escapeHtml(band.label)}</strong>
        <span class="band-track" title="${escapeHtml(band.range)}"><span style="--value:${Math.round(value * 100)}%"></span></span>
        <em>${Math.round(band.percent * 100)}%</em>
      </div>
    `;
  }).join('');
}

function renderStage(analysis, liveLevel = 0.18) {
  const levelMap = getStageDisplayLevelMap(analysis);
  refs.stageMap.innerHTML = renderConcertHallArt() + ORCHESTRA_SECTIONS.map((section) => {
    const position = getStagePosition(section);
    const active = isStageSectionActive(analysis, section.id);
    const level = active ? clamp((levelMap[section.id] || 0) * (0.54 + liveLevel * 0.64), 0.08, 1) : 0;
    const size = active ? 44 + level * 22 : 40;
    const glow = active ? 14 + level * 28 : 6;
    return `
      <div class="stage-node ${active ? '' : 'is-inactive'}" data-stage="${section.id}" style="--x:${position.x}%;--y:${position.y}%;--level:${level.toFixed(3)};--scale:${(size / 48).toFixed(3)};--glow:${glow.toFixed(1)}px;--node-color:${section.color}" title="${escapeHtml(section.label)} · ${escapeHtml(section.role)} · 드래그로 위치 이동">
        ${escapeHtml(section.short)}
      </div>
    `;
  }).join('');

  refs.stageList.innerHTML = ORCHESTRA_SECTIONS.map((section) => {
    const active = isStageSectionActive(analysis, section.id);
    const level = active ? clamp((levelMap[section.id] || 0), 0, 1) : 0;
    return `
      <div class="stage-row ${active ? '' : 'is-inactive'}" data-stage-row="${section.id}">
        <strong>${escapeHtml(section.label)}</strong>
        <span class="stage-track"><span style="--value:${Math.round(level * 100)}%"></span></span>
        <em>${escapeHtml(section.role)}</em>
      </div>
    `;
  }).join('');
  cacheStageElements();
}

function renderConcertHallArt() {
  return `
    <div class="concert-hall-art" aria-hidden="true">
      <div class="hall-proscenium"></div>
      <div class="hall-curtain hall-curtain-left"></div>
      <div class="hall-curtain hall-curtain-right"></div>
      <div class="hall-shell"></div>
      <div class="hall-floor">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="hall-front-rail"></div>
    </div>
  `;
}

function getStageLevelMap(analysis) {
  if (!analysis) return {};
  if (!analysis.stageLevelMap) {
    analysis.stageLevelMap = Object.fromEntries((analysis.stageLevels || []).map((item) => [item.id, item.level]));
  }
  return analysis.stageLevelMap;
}

function getStageDisplayLevelMap(analysis) {
  if (!analysis) return {};
  if (!analysis.stageDisplayLevelMap) {
    const levels = analysis.stageDisplayLevels || analysis.stageLevels || [];
    analysis.stageDisplayLevelMap = Object.fromEntries(levels.map((item) => [item.id, item.level]));
  }
  return analysis.stageDisplayLevelMap;
}

function getStageActiveMap(analysis) {
  if (!analysis) return {};
  if (!analysis.stageActiveMap) {
    const levels = analysis.stageDisplayLevels || analysis.stageLevels || [];
    analysis.stageActiveMap = Object.fromEntries(levels.map((item) => [item.id, item.active !== false && (item.level || 0) > 0]));
  }
  return analysis.stageActiveMap;
}

function isStageSectionActive(analysis, sectionId) {
  const activeMap = getStageActiveMap(analysis);
  return activeMap[sectionId] !== false;
}

function getStageDetectionSummary(analysis) {
  const activeIds = analysis && analysis.instrumentProfile && analysis.instrumentProfile.activeIds
    ? analysis.instrumentProfile.activeIds
    : Object.entries(getStageActiveMap(analysis)).filter(([, active]) => active).map(([id]) => id);
  if (!activeIds.length) return '악기 분석 대기';
  const names = activeIds.slice(0, 3).map((id) => {
    const section = ORCHESTRA_BY_ID[id];
    return section ? section.short : id;
  });
  return activeIds.length > 3 ? `감지 ${names.join(', ')} +${activeIds.length - 3}` : `감지 ${names.join(', ')}`;
}

function cacheStageElements() {
  stageElementCache.nodes.clear();
  stageElementCache.rows.clear();
  stageElementCache.tracks.clear();
  stageElementCache.nodeLevels.clear();
  stageElementCache.trackLevels.clear();
  stageElementCache.liveStates.clear();
  refs.stageMap.querySelectorAll('.stage-node[data-stage]').forEach((node) => {
    stageElementCache.nodes.set(node.dataset.stage, node);
  });
  refs.stageList.querySelectorAll('[data-stage-row]').forEach((row) => {
    stageElementCache.rows.set(row.dataset.stageRow, row);
    const track = row.querySelector('.stage-track span');
    if (track) stageElementCache.tracks.set(row.dataset.stageRow, track);
  });
}

function updateStageActivity(liveLevel, { force = false } = {}) {
  if (!state.analysis) return;
  const now = performance.now();
  if (!force && state.playing && state.lastStageUiAt && now - state.lastStageUiAt < STAGE_ACTIVITY_UPDATE_MS) return;
  state.lastStageUiAt = now;
  const playbackTime = getPlaybackTime();
  ORCHESTRA_SECTIONS.forEach((section) => {
    const node = stageElementCache.nodes.get(section.id);
    const row = stageElementCache.rows.get(section.id);
    const track = stageElementCache.tracks.get(section.id);
    const globallyActive = isStageSectionActive(state.analysis, section.id);
    const realtimeLevel = getStageRealtimeSectionLevel(state.analysis, section.id, playbackTime);
    const level = globallyActive ? clamp(realtimeLevel, 0, 1) : 0;
    const liveActive = globallyActive && level >= 0.075;
    const nodeLevelKey = Math.round(level * 1000);
    if (node) {
      if (stageElementCache.nodeLevels.get(section.id) !== nodeLevelKey) {
        const size = globallyActive ? 42 + level * 26 : 40;
        node.style.setProperty('--level', level.toFixed(3));
        node.style.setProperty('--scale', (size / 48).toFixed(3));
        node.style.setProperty('--glow', `${(globallyActive ? 8 + level * 36 : 6).toFixed(1)}px`);
        stageElementCache.nodeLevels.set(section.id, nodeLevelKey);
      }
      updateStageLiveClass(section.id, node, liveActive, globallyActive);
    }
    if (row) updateStageLiveClass(`${section.id}:row`, row, liveActive, globallyActive);
    if (track) {
      const trackLevelKey = Math.round(level * 100);
      if (stageElementCache.trackLevels.get(section.id) !== trackLevelKey) {
        track.style.setProperty('--value', `${trackLevelKey}%`);
        stageElementCache.trackLevels.set(section.id, trackLevelKey);
      }
    }
  });
}

function updateStageLiveClass(key, element, liveActive, globallyActive) {
  const stateKey = `${globallyActive ? 1 : 0}:${liveActive ? 1 : 0}`;
  if (stageElementCache.liveStates.get(key) === stateKey) return;
  element.classList.toggle('is-inactive', !globallyActive);
  element.classList.toggle('is-silent', globallyActive && !liveActive);
  stageElementCache.liveStates.set(key, stateKey);
}

function getStageRealtimeSectionLevel(analysis, sectionId, time) {
  const activity = analysis && analysis.stageActivity;
  const levels = activity && activity.levelsBySection ? activity.levelsBySection[sectionId] : null;
  if (!levels || !levels.length || !analysis.duration) {
    const displayLevelMap = getStageDisplayLevelMap(analysis);
    return displayLevelMap[sectionId] || 0;
  }
  const ratio = clamp(time / analysis.duration, 0, 1);
  const position = ratio * (levels.length - 1);
  const leftIndex = Math.floor(position);
  const rightIndex = Math.min(levels.length - 1, leftIndex + 1);
  const mix = position - leftIndex;
  return levels[leftIndex] * (1 - mix) + levels[rightIndex] * mix;
}

function getStagePosition(section) {
  const placement = getSectionPlacement(section);
  const x = clamp(50 + (placement.x / STAGE_LIMITS.xMax) * 40, STAGE_LIMITS.percentXMin, STAGE_LIMITS.percentXMax);
  const distance = clamp((Math.abs(placement.z) - Math.abs(STAGE_LIMITS.zNear)) / (Math.abs(STAGE_LIMITS.zFar) - Math.abs(STAGE_LIMITS.zNear)), 0, 1);
  const y = clamp(76 - distance * 56, STAGE_LIMITS.percentYMin, STAGE_LIMITS.percentYMax);
  return { x, y };
}

function getSectionPlacement(section) {
  return state.stagePositions[section.id] || { x: section.x, z: section.z };
}

function stagePercentToCoordinates(percentX, percentY) {
  const x = clamp(((percentX - 50) / 40) * STAGE_LIMITS.xMax, STAGE_LIMITS.xMin, STAGE_LIMITS.xMax);
  const distance = clamp((76 - percentY) / 56, 0, 1);
  const zMagnitude = Math.abs(STAGE_LIMITS.zNear) + distance * (Math.abs(STAGE_LIMITS.zFar) - Math.abs(STAGE_LIMITS.zNear));
  return {
    x,
    z: clamp(-zMagnitude, STAGE_LIMITS.zFar, STAGE_LIMITS.zNear)
  };
}

function handleStagePointerDown(event) {
  const node = event.target.closest('.stage-node');
  if (!node || !refs.stageMap.contains(node)) return;

  event.preventDefault();
  state.stageDrag = {
    id: node.dataset.stage,
    node,
    pointerId: event.pointerId
  };
  node.classList.add('is-dragging');
  refs.stageMap.classList.add('is-dragging');
  if (node.setPointerCapture) {
    try {
      node.setPointerCapture(event.pointerId);
    } catch (error) {
      // Synthetic pointer events in tests may not create a capturable pointer.
    }
  }
  updateStagePositionFromPointer(event);
}

function handleStagePointerMove(event) {
  if (!state.stageDrag || state.stageDrag.pointerId !== event.pointerId) return;
  event.preventDefault();
  updateStagePositionFromPointer(event);
}

function handleStagePointerUp(event) {
  if (!state.stageDrag || state.stageDrag.pointerId !== event.pointerId) return;
  const { node } = state.stageDrag;
  if (node && node.releasePointerCapture) {
    try {
      node.releasePointerCapture(event.pointerId);
    } catch (error) {
      // The pointer may already be released by the browser.
    }
  }
  if (node) node.classList.remove('is-dragging');
  refs.stageMap.classList.remove('is-dragging');
  state.stageDrag = null;
  saveStagePositions();
  if (state.analysis) refs.tags.stage.textContent = '배치 저장됨';
}

function updateStagePositionFromPointer(event) {
  if (!state.stageDrag) return;
  const rect = refs.stageMap.getBoundingClientRect();
  const percentX = clamp(((event.clientX - rect.left) / rect.width) * 100, STAGE_LIMITS.percentXMin, STAGE_LIMITS.percentXMax);
  const percentY = clamp(((event.clientY - rect.top) / rect.height) * 100, STAGE_LIMITS.percentYMin, STAGE_LIMITS.percentYMax);
  state.stagePositions[state.stageDrag.id] = stagePercentToCoordinates(percentX, percentY);
  updateStageNodeElement(state.stageDrag.id);
  updateLivePanner(state.stageDrag.id);
  if (state.analysis) refs.tags.stage.textContent = '배치 편집 중';
}

function updateStageNodeElement(sectionId) {
  const section = ORCHESTRA_BY_ID[sectionId];
  if (!section) return;
  const node = stageElementCache.nodes.get(sectionId);
  if (!node) return;
  const position = getStagePosition(section);
  node.style.setProperty('--x', `${position.x}%`);
  node.style.setProperty('--y', `${position.y}%`);
}

function updateLivePanner(sectionId) {
  if (!state.graph || !state.graph.panners || !state.graph.panners[sectionId] || !state.analysis) return;
  const section = ORCHESTRA_BY_ID[sectionId];
  if (!section) return;
  const placement = getSectionPlacement(section);
  const remaster = state.settings.remaster !== false && state.analysis.remaster
    ? state.analysis.remaster
    : createNeutralRemasterProfile();
  const stageLevelMap = getStageLevelMap(state.analysis);
  const level = Number.isFinite(stageLevelMap[section.id]) ? stageLevelMap[section.id] : 0.5;
  const y = state.mode === 'atmos' ? getAtmosHeightForSection(section, level) * 0.42 : 0;
  const atmosScale = state.mode === 'atmos' ? 1.08 : 1;
  setPannerPosition(
    state.graph.panners[sectionId],
    placement.x * state.settings.width * remaster.widthScale * atmosScale,
    y,
    placement.z * state.settings.depth * (remaster.depthScale || 1) * atmosScale
  );
}

function updateAllLivePanners() {
  ORCHESTRA_SECTIONS.forEach((section) => updateLivePanner(section.id));
}

function renderReport(analysis) {
  refs.reportCopy.textContent = analysis.report.copy;
  refs.traitList.innerHTML = analysis.traits.map((trait) => `
    <div class="trait-row">
      <strong>${escapeHtml(trait.label)}</strong>
      <span class="trait-track"><span style="--value:${Math.round(trait.value * 100)}%"></span></span>
      <em>${Math.round(trait.value * 100)}%</em>
    </div>
  `).join('');
}

function renderRemasterProfile(analysis) {
  refs.remasterList.innerHTML = analysis.remaster.rows.map((row) => `
    <div class="remaster-row">
      <strong>${escapeHtml(row.label)}</strong>
      <span>${escapeHtml(row.detail)}</span>
      <em>${escapeHtml(row.value)}</em>
    </div>
  `).join('');
}

function renderRemasterComparison(analysis, { animate = true } = {}) {
  const rows = buildRemasterComparisonRows(analysis);
  const currentColumn = state.settings.remaster ? 'after' : 'before';
  const previousRows = state.remasterCompareRows || [];
  const columnChanged = Boolean(state.remasterCompareColumn && state.remasterCompareColumn !== currentColumn);

  refs.remasterCompareBody.innerHTML = rows.map((row, index) => {
    const previous = previousRows[index];
    const beforeChanged = animate && (columnChanged || !previous || previous.before !== row.before);
    const afterChanged = animate && (columnChanged || !previous || previous.after !== row.after);
    const rowChanged = beforeChanged || afterChanged || (animate && previous && previous.note !== row.note);
    return `
    <div class="compare-row ${rowChanged ? 'is-updating' : ''}" role="row">
      <strong role="cell">${escapeHtml(row.label)}</strong>
      <span class="compare-cell ${currentColumn === 'before' ? 'is-current' : ''} ${beforeChanged ? 'is-updating' : ''}" role="cell" data-cell-index="${index}" data-cell-kind="before"><span class="compare-value">${escapeHtml(row.before)}</span></span>
      <span class="compare-cell ${currentColumn === 'after' ? 'is-current' : ''} ${afterChanged ? 'is-updating' : ''}" role="cell" data-cell-index="${index}" data-cell-kind="after"><span class="compare-value">${escapeHtml(row.after)}</span></span>
      <em role="cell">${escapeHtml(row.note)}</em>
    </div>
  `;
  }).join('');

  if (animate) {
    rows.forEach((row, index) => {
      const previous = previousRows[index];
      if (!previous) return;
      animateCompareValue(index, 'before', previous.before, row.before);
      animateCompareValue(index, 'after', previous.after, row.after);
    });
    window.requestAnimationFrame(() => {
      refs.remasterCompareBody.querySelectorAll('.compare-row.is-updating, .compare-cell.is-updating').forEach((element) => {
        element.classList.add('is-settled');
      });
    });
    window.setTimeout(() => {
      refs.remasterCompareBody.querySelectorAll('.is-updating, .is-settled').forEach((element) => {
        element.classList.remove('is-updating', 'is-settled');
      });
    }, 760);
  }

  state.remasterCompareRows = rows.map((row) => ({
    label: row.label,
    before: row.before,
    after: row.after,
    note: row.note
  }));
  state.remasterCompareColumn = currentColumn;
}

function animateCompareValue(index, kind, fromText, toText) {
  if (fromText === toText) return;
  const valueElement = refs.remasterCompareBody.querySelector(`[data-cell-index="${index}"][data-cell-kind="${kind}"] .compare-value`);
  if (!valueElement) return;
  const fromParts = getAnimatedNumberParts(fromText);
  const toParts = getAnimatedNumberParts(toText);
  if (!fromParts || !toParts) return;

  const startedAt = performance.now();
  const duration = 520;
  const tick = (now) => {
    if (!valueElement.isConnected) return;
    const progress = clamp((now - startedAt) / duration, 0, 1);
    const eased = easeOutCubic(progress);
    const value = fromParts.value + (toParts.value - fromParts.value) * eased;
    valueElement.textContent = formatAnimatedNumberText(toParts, value);
    if (progress < 1) {
      window.requestAnimationFrame(tick);
      return;
    }
    valueElement.textContent = toText;
  };
  window.requestAnimationFrame(tick);
}

function getAnimatedNumberParts(text) {
  const match = String(text).match(/[+-]?\d+(?:\.\d+)?/);
  if (!match) return null;
  const raw = match[0];
  return {
    value: Number(raw),
    prefix: String(text).slice(0, match.index),
    suffix: String(text).slice(match.index + raw.length),
    decimals: raw.includes('.') ? raw.split('.')[1].length : 0,
    showPlus: raw.startsWith('+')
  };
}

function formatAnimatedNumberText(parts, value) {
  const absolute = Math.abs(value);
  const rounded = absolute.toFixed(parts.decimals);
  const sign = value < 0 ? '-' : parts.showPlus ? '+' : '';
  return `${parts.prefix}${sign}${rounded}${parts.suffix}`;
}

function buildRemasterComparisonRows(analysis) {
  const { loudness, remaster, stereo } = analysis;
  const modeLabel = getRenderModeLabel(state.mode);
  const afterRms = loudness.rmsDb + remaster.inputGainDb;
  const afterPeak = Math.min(loudness.peakDb + remaster.inputGainDb, remaster.limiterThreshold);
  const afterDynamic = Math.max(2, loudness.dynamicRange / (1 + (remaster.compressorRatio - 1) * 0.35));
  const beforeWidth = clamp(stereo.width, 0, 2);
  const afterWidth = clamp(stereo.width * remaster.widthScale, 0, 2);
  const outputGainDb = ampToDb(state.settings.gain);
  const afterOutputGainDb = outputGainDb;
  const beforeDepth = Math.round(state.settings.depth * 100);
  const afterDepth = Math.round(state.settings.depth * 100 * (remaster.depthScale || 1));
  const beforeRoom = Math.round(state.settings.room * 100);
  const afterRoom = Math.round(state.settings.room * 100 * (remaster.roomScale || 1));

  return [
    {
      label: '라우드니스',
      before: `${loudness.rmsDb.toFixed(1)} dBFS`,
      after: `${afterRms.toFixed(1)} dBFS`,
      note: '평균 음량을 목표 RMS에 가깝게 정렬합니다.'
    },
    {
      label: '피크 보호',
      before: `${loudness.peakDb.toFixed(1)} dBFS`,
      after: `${afterPeak.toFixed(1)} dBFS`,
      note: '리미터로 렌더링 피크를 안전하게 묶습니다.'
    },
    {
      label: '다이내믹',
      before: `${loudness.dynamicRange.toFixed(1)} dB`,
      after: `${afterDynamic.toFixed(1)} dB`,
      note: '글루 컴프레션으로 큰 변화는 유지하되 과한 튐을 줄입니다.'
    },
    {
      label: '저역 EQ',
      before: '+0.0 dB',
      after: signedDb(remaster.lowShelfDb),
      note: '저역 과밀 또는 부족을 자동으로 보정합니다.'
    },
    {
      label: '중역 EQ',
      before: '+0.0 dB',
      after: signedDb(remaster.lowMidDb),
      note: '250-500 Hz의 혼탁도와 밀도를 조절합니다.'
    },
    {
      label: '선명도 EQ',
      before: '+0.0 dB',
      after: signedDb(remaster.presenceDb),
      note: '2-6 kHz 대역의 존재감과 자극을 정리합니다.'
    },
    {
      label: '공기감 EQ',
      before: '+0.0 dB',
      after: signedDb(remaster.highShelfDb),
      note: '초고역의 개방감 또는 거칠음을 조절합니다.'
    },
    {
      label: '스테레오 폭',
      before: `${Math.round(beforeWidth * 100)}%`,
      after: `${Math.round(afterWidth * 100)}%`,
      note: '원본 폭을 기준으로 오케스트라 무대 폭을 보정합니다.'
    },
    {
      label: '무대 깊이',
      before: `${beforeDepth}%`,
      after: `${afterDepth}%`,
      note: '다이내믹과 밀도에 맞춰 앞뒤 깊이를 자동 보정합니다.'
    },
    {
      label: '홀 잔향',
      before: `${beforeRoom}%`,
      after: `${afterRoom}%`,
      note: '홀 잔향 길이와 초기 반사를 곡의 에너지에 맞춰 조절합니다.'
    },
    {
      label: '거친 고역',
      before: '+0.0 dB',
      after: signedDb(remaster.harshnessTameDb || 0),
      note: '거친 고역은 좁은 EQ로 누르고, 에어감은 별도로 보존합니다.'
    },
    {
      label: '출력 경로',
      before: `${modeLabel} ${signedDb(outputGainDb)}`,
      after: `리마스터+${modeLabel} ${signedDb(afterOutputGainDb)}`,
      note: '자동 리마스터 체크 상태에 따라 실제 재생/저장 경로가 바뀝니다.'
    }
  ];
}

function renderTimeline(analysis) {
  refs.timelineList.innerHTML = analysis.sections.map((section) => `
    <div class="timeline-card">
      <strong>${formatTime(section.startTime)}-${formatTime(section.endTime)}</strong>
      <div>
        <p>${escapeHtml(section.label)}</p>
        <span class="timeline-track"><span style="--value:${Math.round(section.energy * 100)}%"></span></span>
      </div>
      <small>밝기 ${Math.round(section.brightness * 100)}% · 밀도 ${Math.round(section.density * 100)}%</small>
    </div>
  `).join('');
}

async function togglePlayback() {
  if (!state.analysis) return;
  if (state.playing) {
    pausePlayback();
    return;
  }
  await startPlayback(state.offset);
}

async function startPlayback(offset = 0) {
  if (!state.analysis) return;
  initAudioContext();
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  stopCurrentSource();
  state.settings = getSpatialSettings();
  const graph = createPlaybackRenderGraph(audioContext, state.analysis.audioBuffer, state.settings, state.analysis, state.mode);

  const safeOffset = clamp(offset, 0, Math.max(0, state.analysis.duration - 0.02));
  state.graph = graph;
  state.source = graph.source;
  state.playing = true;
  state.startedAt = audioContext.currentTime - safeOffset;
  state.offset = safeOffset;
  state.lastTransportUiAt = 0;
  state.lastStageUiAt = 0;
  refs.playButton.textContent = 'Ⅱ';
  refs.playButton.setAttribute('aria-label', '일시정지');

  graph.source.onended = () => {
    if (state.source === graph.source && state.playing) {
      stopPlayback(true);
    }
  };
  graph.source.start(0, safeOffset);
  startPlaybackLoop();
}

function pausePlayback() {
  if (!state.playing) return;
  state.offset = getPlaybackTime();
  state.playing = false;
  stopCurrentSource();
  stopPlaybackLoop();
  refs.playButton.textContent = '▶';
  refs.playButton.setAttribute('aria-label', '재생');
  updateTransportTime();
}

function stopPlayback(resetOffset) {
  state.playing = false;
  stopCurrentSource();
  stopPlaybackLoop();
  if (resetOffset) state.offset = 0;
  refs.playButton.textContent = '▶';
  refs.playButton.setAttribute('aria-label', '재생');
  updateTransportTime();
  if (state.analysis) {
    drawWaveform(state.analysis, state.offset);
    drawLoudness(state.analysis, state.offset);
    updateStageActivity(0.18, { force: true });
  }
}

function stopCurrentSource() {
  if (state.source) {
    try {
      state.source.onended = null;
      state.source.stop();
      state.source.disconnect();
    } catch (error) {
      // A stopped AudioBufferSourceNode throws on repeated stop calls.
    }
  }
  state.source = null;
  state.graph = null;
}

function startPlaybackLoop() {
  stopPlaybackLoop();
  const tick = () => {
    if (!state.playing || !state.analysis) return;
    const time = getPlaybackTime();
    if (time >= state.analysis.duration - 0.02) {
      stopPlayback(true);
      return;
    }
    state.offset = time;
    const now = performance.now();
    if (!state.lastTransportUiAt || now - state.lastTransportUiAt >= PLAYBACK_TRANSPORT_UPDATE_MS) {
      updateTransportTime();
      state.lastTransportUiAt = now;
    }
    const liveLevel = getLiveLevel(state.analysis, time);
    document.documentElement.style.setProperty('--live', liveLevel.toFixed(3));
    drawWaveform(state.analysis, time);
    drawLoudness(state.analysis, time);
    updateStageActivity(liveLevel);
    animationFrame = requestAnimationFrame(tick);
  };
  tick();
}

function stopPlaybackLoop() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = 0;
  state.lastTransportUiAt = 0;
  state.lastStageUiAt = 0;
  document.documentElement.style.setProperty('--live', '0.12');
}

function getPlaybackTime() {
  if (!state.analysis) return 0;
  if (!state.playing || !audioContext) return clamp(state.offset, 0, state.analysis.duration);
  return clamp(audioContext.currentTime - state.startedAt, 0, state.analysis.duration);
}

function updateTransportTime() {
  const duration = state.analysis ? state.analysis.duration : 0;
  const time = getPlaybackTime();
  refs.currentTime.textContent = formatTime(time);
  refs.totalTime.textContent = formatTime(duration);
  refs.seekSlider.value = duration ? Math.round((time / duration) * 1000) : 0;
}

function handleSeekInput() {
  if (!state.analysis) return;
  const duration = state.analysis.duration;
  const nextOffset = (Number(refs.seekSlider.value) / 1000) * duration;
  state.offset = clamp(nextOffset, 0, duration);
  updateTransportTime();
  drawWaveform(state.analysis, state.offset);
  drawLoudness(state.analysis, state.offset);
  if (state.playing) {
    startPlayback(state.offset);
  }
}

function setMode(mode) {
  if (!RENDER_MODES.includes(mode) || state.mode === mode) return;
  state.mode = mode;
  refs.modeButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.mode === mode);
  });
  updateModeDescription();
  updateRemasterModeUi({ animateCompare: true });
  if (state.playing) {
    startPlayback(getPlaybackTime());
  }
}

function updateModeDescription() {
  if (!refs.modeDescription) return;
  const descriptions = {
    spatial: {
      title: '공간음향',
      copy: '무대 폭, 전후 깊이, 홀 잔향, 출력으로 대편성 오케스트라 무대를 재구성합니다.'
    },
    atmos: {
      title: 'DOLBY ATMOS',
      copy: '오브젝트 높이감, 상부 반사, 후방 확산, 바이노럴 HRTF 레이어를 추가합니다.'
    },
    original: {
      title: '원본',
      copy: '공간화와 리마스터 체인을 거치지 않는 기준 재생입니다.'
    }
  };
  const item = descriptions[state.mode] || descriptions.spatial;
  const orchestraNotice = state.settings && state.settings.orchestraStage === false && state.mode !== 'original'
    ? ' 대편성 오케스트라 위치 기준 OFF: 악기 위치 분해와 무대 배치는 오디오에 적용되지 않습니다.'
    : '';
  refs.modeDescription.classList.toggle('is-atmos', state.mode === 'atmos');
  refs.modeDescription.innerHTML = `<strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.copy + orchestraNotice)}</span>`;
}

function isSpatialRenderMode(mode) {
  return mode === 'spatial' || mode === 'atmos';
}

function getRenderModeLabel(mode) {
  if (mode === 'atmos') return 'DOLBY ATMOS';
  if (mode === 'original') return '원본';
  return '공간음향';
}

function getRenderFileSuffix(mode) {
  if (mode === 'atmos') return 'dolby-atmos-binaural';
  if (mode === 'original') return 'original';
  return 'orchestra-spatial';
}

function handleSpatialControlChange(event) {
  const channelChanged = event && event.target === refs.channelLayout;
  const orchestraChanged = event && event.target === refs.orchestraToggle;
  cancelSpatialSliderAnimation();
  if (event && isSpatialSlider(event.target) && !refs.remasterToggle.checked) {
    state.manualSpatialValues = readSpatialSliderValues();
  }
  state.settings = getSpatialSettings();
  updateSliderLabels();
  if (orchestraChanged) {
    updateModeDescription();
  }
  updateRemasterModeUi({ animateCompare: true });
  if (state.playing && isSpatialRenderMode(state.mode) && !channelChanged) {
    window.clearTimeout(restartTimer);
    restartTimer = window.setTimeout(() => startPlayback(getPlaybackTime()), 120);
  }
}

function handleRemasterToggleChange() {
  applyRemasterSpatialPreset({ animate: true, rememberManual: refs.remasterToggle.checked });
}

function applyRemasterSpatialPreset({ animate = true, rememberManual = true } = {}) {
  cancelSpatialSliderAnimation();
  if (refs.remasterToggle.checked && rememberManual) {
    state.manualSpatialValues = readSpatialSliderValues();
  }

  const targets = refs.remasterToggle.checked
    ? getRemasterSpatialTargets(state.analysis)
    : normalizeSpatialSliderValues(state.manualSpatialValues || SPATIAL_SLIDER_DEFAULTS);

  if (animate) {
    animateSpatialSliders(targets);
    return;
  }

  setSpatialSliderValues(targets);
  state.settings = getSpatialSettings();
  updateSliderLabels();
  updateRemasterModeUi({ animateCompare: true });
  if (state.playing && isSpatialRenderMode(state.mode)) {
    window.clearTimeout(restartTimer);
    restartTimer = window.setTimeout(() => startPlayback(getPlaybackTime()), 120);
  }
}

function getRemasterSpatialTargets(analysis) {
  if (!analysis || !analysis.remaster) {
    return normalizeSpatialSliderValues(SPATIAL_SLIDER_DEFAULTS);
  }

  const { loudness, remaster, spectrum, stereo } = analysis;
  const dynamicLift = clamp((loudness.dynamicRange - 9) / 18, -0.28, 0.34);
  const energyTame = loudness.energyScore > 0.72 ? -0.08 : 0;
  const brightnessRoom = spectrum.brightness < 0.18 ? 0.08 : spectrum.brightness > 0.45 ? -0.06 : 0;
  const width = SPATIAL_SLIDER_DEFAULTS.width * remaster.widthScale + (stereo.width < 0.32 ? 8 : stereo.width > 0.95 ? -8 : 0);
  const depth = SPATIAL_SLIDER_DEFAULTS.depth * (1 + dynamicLift + energyTame) * (remaster.depthScale || 1);
  const room = SPATIAL_SLIDER_DEFAULTS.room * remaster.roomScale * (1 + dynamicLift * 0.65 + brightnessRoom);
  const gain = SPATIAL_SLIDER_DEFAULTS.gain;

  return normalizeSpatialSliderValues({
    width: Math.round(width),
    depth: Math.round(depth),
    room: Math.round(room),
    gain: Math.round(gain)
  });
}

function animateSpatialSliders(targetValues) {
  const startValues = readSpatialSliderValues();
  const targets = normalizeSpatialSliderValues(targetValues);
  const startedAt = performance.now();
  state.settings = getSpatialSettings();
  updateSliderLabels();
  updateRemasterModeUi({ animateCompare: true });

  const tick = (now) => {
    const progress = clamp((now - startedAt) / REMASTER_SLIDER_ANIMATION_MS, 0, 1);
    const eased = easeOutCubic(progress);
    const nextValues = {};
    SPATIAL_SLIDER_KEYS.forEach((key) => {
      nextValues[key] = Math.round(startValues[key] + (targets[key] - startValues[key]) * eased);
    });
    setSpatialSliderValues(nextValues);
    state.settings = getSpatialSettings();
    updateSliderLabels();

    if (progress < 1) {
      state.sliderAnimationFrame = window.requestAnimationFrame(tick);
      return;
    }

    state.sliderAnimationFrame = 0;
    setSpatialSliderValues(targets);
    state.settings = getSpatialSettings();
    updateSliderLabels();
    updateRemasterModeUi({ animateCompare: true });
    if (state.playing && isSpatialRenderMode(state.mode)) {
      window.clearTimeout(restartTimer);
      restartTimer = window.setTimeout(() => startPlayback(getPlaybackTime()), 80);
    }
  };

  state.sliderAnimationFrame = window.requestAnimationFrame(tick);
}

function cancelSpatialSliderAnimation() {
  if (!state.sliderAnimationFrame) return;
  window.cancelAnimationFrame(state.sliderAnimationFrame);
  state.sliderAnimationFrame = 0;
}

function readSpatialSliderValues() {
  return Object.fromEntries(SPATIAL_SLIDER_KEYS.map((key) => [
    key,
    getSliderNumber(key)
  ]));
}

function setSpatialSliderValues(values) {
  SPATIAL_SLIDER_KEYS.forEach((key) => {
    refs.sliders[key].value = clampSliderValue(key, values[key]);
  });
}

function normalizeSpatialSliderValues(values) {
  return Object.fromEntries(SPATIAL_SLIDER_KEYS.map((key) => [
    key,
    clampSliderValue(key, values && Number.isFinite(Number(values[key])) ? Number(values[key]) : SPATIAL_SLIDER_DEFAULTS[key])
  ]));
}

function getSliderNumber(key) {
  const slider = refs.sliders[key];
  return Number(slider && slider.value ? slider.value : SPATIAL_SLIDER_DEFAULTS[key]);
}

function clampSliderValue(key, value) {
  const slider = refs.sliders[key];
  const min = Number(slider ? slider.min : 0);
  const max = Number(slider ? slider.max : 100);
  const numeric = Number(value);
  const fallback = SPATIAL_SLIDER_DEFAULTS[key];
  return clamp(Math.round(Number.isFinite(numeric) ? numeric : fallback), min, max);
}

function isSpatialSlider(element) {
  return SPATIAL_SLIDER_KEYS.some((key) => refs.sliders[key] === element);
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function getSpatialSettings() {
  const width = Number(refs.sliders && refs.sliders.width ? refs.sliders.width.value : 112) / 100;
  const depth = Number(refs.sliders && refs.sliders.depth ? refs.sliders.depth.value : 118) / 100;
  const room = Number(refs.sliders && refs.sliders.room ? refs.sliders.room.value : 46) / 100;
  const gain = Number(refs.sliders && refs.sliders.gain ? refs.sliders.gain.value : 100) / 100;
  const remaster = refs.remasterToggle ? refs.remasterToggle.checked : true;
  const orchestraStage = refs.orchestraToggle ? refs.orchestraToggle.checked : true;
  const channelLayout = refs.channelLayout && refs.channelLayout.value
    ? refs.channelLayout.value
    : DEFAULT_CHANNEL_LAYOUT;
  return { width, depth, room, gain, remaster, channelLayout, orchestraStage };
}

function updateSliderLabels() {
  const settings = getSpatialSettings();
  const channelLayout = getOutputChannelLayout(settings.channelLayout);
  refs.sliderValues.width.textContent = `${Math.round(settings.width * 100)}%`;
  refs.sliderValues.depth.textContent = `${Math.round(settings.depth * 100)}%`;
  refs.sliderValues.room.textContent = `${Math.round(settings.room * 100)}%`;
  refs.sliderValues.gain.textContent = `${Math.round(settings.gain * 100)}%`;
  refs.sliderValues.channel.textContent = channelLayout.short;
  refs.sliderValues.orchestra.textContent = settings.orchestraStage ? 'ON' : 'OFF';
  refs.sliderValues.remaster.textContent = settings.remaster ? 'ON' : 'OFF';
}

function updateRemasterModeUi({ animateCompare = true } = {}) {
  const enabled = state.settings.remaster;
  const modeLabel = getRenderModeLabel(state.mode);
  const channelLayout = getOutputChannelLayout(state.settings.channelLayout);
  refs.exportButton.textContent = state.mode === 'original'
    ? '원본 WAV 저장'
    : enabled
      ? `${modeLabel} 리마스터 WAV 저장`
      : `${modeLabel} WAV 저장`;
  refs.exportButton.textContent = refs.exportButton.textContent.replace('WAV', `${channelLayout.short} WAV`);
  if (state.analysis) {
    refs.remasterCompareTag.textContent = enabled ? '현재 적용 후' : '현재 적용 전';
    renderRemasterComparison(state.analysis, { animate: animateCompare });
  } else {
    refs.remasterCompareTag.textContent = enabled ? '리마스터 ON' : '리마스터 OFF';
  }
}

function getOutputChannelLayout(key) {
  return OUTPUT_CHANNEL_LAYOUTS[key] || OUTPUT_CHANNEL_LAYOUTS[DEFAULT_CHANNEL_LAYOUT];
}

function createPlaybackRenderGraph(ctx, buffer, settings, analysis, mode) {
  const layout = getRealtimeOutputLayout(ctx, settings.channelLayout);
  if (layout.channels.length > 2) {
    return mode === 'original'
      ? createOriginalMultichannelGraph(ctx, buffer, settings, layout)
      : settings.orchestraStage === false
        ? createDirectMultichannelGraph(ctx, buffer, settings, layout, analysis)
      : createMultichannelSpatialGraph(ctx, buffer, settings, analysis, layout, mode);
  }
  return createRenderGraph(mode, ctx, buffer, settings, analysis);
}

function getRealtimeOutputLayout(ctx, key) {
  const requested = getOutputChannelLayout(key);
  const requestedChannels = requested.channels.length;
  const maxChannels = ctx.destination.maxChannelCount || ctx.destination.channelCount || 2;
  if (requestedChannels <= maxChannels) {
    setDiscreteChannelMode(ctx.destination, requestedChannels);
    return requested;
  }
  setDiscreteChannelMode(ctx.destination, 2);
  return OUTPUT_CHANNEL_LAYOUTS[DEFAULT_CHANNEL_LAYOUT];
}

function createRenderGraph(mode, ctx, buffer, settings, analysis = null) {
  if (mode !== 'original' && settings.orchestraStage === false) {
    return createDirectGraph(ctx, buffer, settings, analysis);
  }
  if (mode === 'atmos') {
    return createAtmosGraph(ctx, buffer, settings, analysis);
  }
  if (mode === 'original') {
    return createOriginalGraph(ctx, buffer, settings);
  }
  return createSpatialGraph(ctx, buffer, settings, analysis);
}

function createOriginalGraph(ctx, buffer, settings) {
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  source.buffer = buffer;
  gain.gain.value = settings.gain;
  source.connect(gain);
  gain.connect(ctx.destination);
  return { source, output: gain };
}

function createDirectGraph(ctx, buffer, settings, analysis = null) {
  const source = ctx.createBufferSource();
  const output = ctx.createGain();
  source.buffer = buffer;
  output.gain.value = settings.gain;
  const directOutput = shouldApplyDirectRemaster(settings, analysis)
    ? createRemasterToneChain(ctx, source, analysis.remaster)
    : source;
  directOutput.connect(output);
  output.connect(ctx.destination);
  return { source, output, panners: {} };
}

function shouldApplyDirectRemaster(settings, analysis) {
  return settings.remaster !== false && !!(analysis && analysis.remaster);
}

function createSpatialGraph(ctx, buffer, settings, analysis = null) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const remasterEnabled = settings.remaster !== false;
  const remaster = remasterEnabled && analysis && analysis.remaster ? analysis.remaster : createNeutralRemasterProfile();
  const toneOutput = remasterEnabled ? createRemasterToneChain(ctx, source, remaster, { spatialSafe: true }) : source;
  const stageLevelMap = getStageLevelMap(analysis);

  const dryBus = ctx.createGain();
  dryBus.gain.value = remasterEnabled ? 0.72 : 0.76;
  const wetSend = ctx.createGain();
  wetSend.gain.value = (0.08 + settings.room * 0.14) * (remasterEnabled ? remaster.roomScale : 1);
  const convolver = ctx.createConvolver();
  convolver.buffer = createImpulseResponse(ctx, (0.56 + settings.room * 1.72) * (remasterEnabled ? remaster.roomScale : 1), 1.9 + settings.room * 2.35);
  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.055 + settings.room * 0.19;
  const clarityAnchor = ctx.createGain();
  clarityAnchor.gain.value = remasterEnabled ? clamp(remaster.clarityMix * 4.2, 0.72, 0.88) : 0.72;
  const masterInput = ctx.createGain();
  masterInput.gain.value = getSpatialBusHeadroom('spatial', settings);
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = remasterEnabled ? Math.min(remaster.compressorThreshold, -13.5) : -14;
  compressor.knee.value = remasterEnabled ? 10 : 14;
  compressor.ratio.value = remasterEnabled ? clamp(remaster.compressorRatio, 1.45, 2.45) : 2.4;
  compressor.attack.value = remasterEnabled ? remaster.compressorAttack : 0.008;
  compressor.release.value = remasterEnabled ? Math.max(remaster.compressorRelease, 0.16) : 0.24;
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = remasterEnabled ? Math.min(remaster.limiterThreshold, -1.4) : -1.4;
  limiter.knee.value = 0;
  limiter.ratio.value = 14;
  limiter.attack.value = 0.0015;
  limiter.release.value = 0.09;
  const output = ctx.createGain();
  output.gain.value = settings.gain * 1.06;
  const panners = {};

  toneOutput.connect(clarityAnchor);
  clarityAnchor.connect(masterInput);
  dryBus.connect(masterInput);
  wetSend.connect(convolver);
  convolver.connect(wetGain);
  wetGain.connect(masterInput);
  masterInput.connect(compressor);
  compressor.connect(limiter);
  limiter.connect(output);
  output.connect(ctx.destination);

  ORCHESTRA_SECTIONS.forEach((section) => {
    const placement = getSectionPlacement(section);
    const filter = ctx.createBiquadFilter();
    filter.type = section.type;
    filter.frequency.value = section.freq;
    filter.Q.value = section.q;

    const panner = ctx.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 0.38;
    setPannerPosition(
      panner,
      placement.x * settings.width * remaster.widthScale,
      0,
      placement.z * settings.depth * remaster.depthScale
    );
    panners[section.id] = panner;

    const delay = ctx.createDelay(0.08);
    delay.delayTime.value = clamp((Math.abs(placement.z) * 0.0028 + Math.abs(placement.x) * 0.0007) * settings.depth * remaster.depthScale, 0, 0.062);

    const gain = ctx.createGain();
    const level = clamp(stageLevelMap[section.id] || 0.5, 0, 1);
    gain.gain.value = section.gain * getSpatialSectionTrim('spatial', settings) * (0.7 + level * 0.48) * getSectionRemasterWeight(section, remaster);
    const sectionSend = ctx.createGain();
    sectionSend.gain.value = section.send * 0.58 * (0.78 + Math.abs(placement.z) * 0.024) * (remaster.roomScale || 1);

    toneOutput.connect(filter);
    filter.connect(panner);
    panner.connect(delay);
    delay.connect(gain);
    gain.connect(dryBus);
    gain.connect(sectionSend);
    sectionSend.connect(wetSend);
  });

  return { source, output, panners };
}

function createAtmosGraph(ctx, buffer, settings, analysis = null) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const remasterEnabled = settings.remaster !== false;
  const remaster = remasterEnabled && analysis && analysis.remaster ? analysis.remaster : createNeutralRemasterProfile();
  const toneOutput = remasterEnabled ? createRemasterToneChain(ctx, source, remaster, { spatialSafe: true }) : source;
  const stageLevelMap = getStageLevelMap(analysis);

  const bedBus = ctx.createGain();
  bedBus.gain.value = 0.62;
  const heightBus = ctx.createGain();
  heightBus.gain.value = 0.24 + settings.room * 0.08;
  const clarityAnchor = ctx.createGain();
  clarityAnchor.gain.value = remasterEnabled ? clamp(remaster.clarityMix * 3.8, 0.62, 0.78) : 0.64;
  const wetSend = ctx.createGain();
  wetSend.gain.value = (0.085 + settings.room * 0.13) * (remaster.roomScale || 1);
  const convolver = ctx.createConvolver();
  convolver.buffer = createImpulseResponse(ctx, (0.72 + settings.room * 1.95) * (remaster.roomScale || 1), 2.1 + settings.room * 2.6);
  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.055 + settings.room * 0.18;
  const heightAir = ctx.createBiquadFilter();
  heightAir.type = 'highshelf';
  heightAir.frequency.value = 6800;
  heightAir.gain.value = remasterEnabled ? clamp((remaster.highShelfDb || 0) * 0.35 + 0.8, -0.8, 1.8) : 0.5;
  const masterInput = ctx.createGain();
  masterInput.gain.value = getSpatialBusHeadroom('atmos', settings);
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = remasterEnabled ? Math.min(remaster.compressorThreshold - 0.8, -14.5) : -15;
  compressor.knee.value = 12;
  compressor.ratio.value = remasterEnabled ? clamp(remaster.compressorRatio * 0.86, 1.35, 2.35) : 2.15;
  compressor.attack.value = remasterEnabled ? remaster.compressorAttack : 0.008;
  compressor.release.value = remasterEnabled ? Math.max(remaster.compressorRelease, 0.18) : 0.24;
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = remasterEnabled ? Math.min(remaster.limiterThreshold, -1.5) : -1.5;
  limiter.knee.value = 0;
  limiter.ratio.value = 14;
  limiter.attack.value = 0.0015;
  limiter.release.value = 0.095;
  const output = ctx.createGain();
  output.gain.value = settings.gain * 1.04;
  const panners = {};

  toneOutput.connect(clarityAnchor);
  clarityAnchor.connect(masterInput);
  bedBus.connect(masterInput);
  heightBus.connect(heightAir);
  heightAir.connect(masterInput);
  heightBus.connect(wetSend);
  wetSend.connect(convolver);
  convolver.connect(wetGain);
  wetGain.connect(masterInput);
  masterInput.connect(compressor);
  compressor.connect(limiter);
  limiter.connect(output);
  output.connect(ctx.destination);

  ORCHESTRA_SECTIONS.forEach((section) => {
    const placement = getSectionPlacement(section);
    const level = clamp(stageLevelMap[section.id] || 0.5, 0, 1);
    const height = getAtmosHeightForSection(section, level);
    const filter = ctx.createBiquadFilter();
    filter.type = section.type;
    filter.frequency.value = section.freq;
    filter.Q.value = section.q * 0.92;

    const panner = ctx.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 0.8;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 0.32;
    setPannerPosition(
      panner,
      placement.x * settings.width * remaster.widthScale * 1.08,
      height * 0.42,
      placement.z * settings.depth * remaster.depthScale * 1.06
    );
    panners[section.id] = panner;

    const delay = ctx.createDelay(0.09);
    delay.delayTime.value = clamp((Math.abs(placement.z) * 0.0034 + Math.abs(placement.x) * 0.0009 + height * 0.004) * settings.depth, 0, 0.075);
    const gain = ctx.createGain();
    gain.gain.value = section.gain * getSpatialSectionTrim('atmos', settings) * (0.66 + level * 0.42) * getSectionRemasterWeight(section, remaster);

    const heightFilter = ctx.createBiquadFilter();
    heightFilter.type = 'highpass';
    heightFilter.frequency.value = section.band === 'bass' || section.band === 'lowMid' ? 380 : 1400;
    heightFilter.Q.value = 0.55;
    const heightPanner = ctx.createPanner();
    heightPanner.panningModel = 'HRTF';
    heightPanner.distanceModel = 'inverse';
    heightPanner.refDistance = 0.75;
    heightPanner.maxDistance = 10000;
    heightPanner.rolloffFactor = 0.26;
    setPannerPosition(
      heightPanner,
      placement.x * settings.width * remaster.widthScale * 0.72,
      height,
      placement.z * settings.depth * remaster.depthScale * 0.84
    );
    const heightGain = ctx.createGain();
    heightGain.gain.value = section.gain * clamp(0.07 + height * 0.12 + level * 0.05, 0.045, 0.24);

    const send = ctx.createGain();
    send.gain.value = section.send * 0.54 * (0.88 + height * 0.12) * (remaster.roomScale || 1);

    toneOutput.connect(filter);
    filter.connect(panner);
    panner.connect(delay);
    delay.connect(gain);
    gain.connect(bedBus);
    gain.connect(send);
    send.connect(wetSend);

    filter.connect(heightFilter);
    heightFilter.connect(heightPanner);
    heightPanner.connect(heightGain);
    heightGain.connect(heightBus);
  });

  return { source, output, panners };
}

function getAtmosHeightForSection(section, level = 0.5) {
  const baseHeight = {
    violins1: 0.24,
    violins2: 0.22,
    violas: 0.2,
    cellos: 0.16,
    basses: 0.1,
    woodwindsHigh: 0.72,
    woodwindsLow: 0.48,
    horns: 0.36,
    brass: 0.44,
    timpani: 0.24,
    percussion: 0.86,
    harpPiano: 0.78
  }[section.id] || 0.3;
  return clamp(baseHeight + level * 0.18, 0.08, 1.08);
}

function getSectionRemasterWeight(section, remaster) {
  const focus = remaster.sectionFocus || {};
  const focusMap = {
    sub: focus.low,
    bass: focus.low,
    lowMid: focus.low,
    mid: section.id.includes('woodwinds') ? focus.woodwinds : focus.strings,
    presence: section.id === 'brass' ? focus.brass : focus.strings,
    air: section.id === 'percussion' ? focus.percussion : focus.woodwinds
  };
  const focusWeight = Number.isFinite(focusMap[section.band]) ? focusMap[section.band] : 1;
  const eqDb = section.band === 'bass' || section.band === 'sub'
    ? remaster.lowShelfDb
    : section.band === 'lowMid'
      ? remaster.lowMidDb
      : section.band === 'presence'
        ? remaster.presenceDb
        : section.band === 'air'
          ? remaster.highShelfDb
          : 0;
  return clamp(focusWeight * dbToGain((eqDb || 0) * 0.28), 0.74, 1.26);
}

function getSpatialBusHeadroom(mode, settings) {
  const roomTrim = 1 - clamp(settings.room || 0, 0, 1) * (mode === 'atmos' ? 0.18 : 0.14);
  const modeTrim = mode === 'atmos' ? 0.78 : 0.78;
  return clamp(modeTrim * roomTrim, 0.56, 0.82);
}

function getSpatialSectionTrim(mode, settings) {
  const roomTrim = 1 - clamp(settings.room || 0, 0, 1) * (mode === 'atmos' ? 0.22 : 0.16);
  const modeTrim = mode === 'atmos' ? 0.86 : 0.9;
  return clamp(modeTrim * roomTrim, 0.58, 0.94);
}

function clampSpatialEqDb(value, scale = 0.72) {
  return clamp((Number(value) || 0) * scale, -2.4, 2.4);
}

function createRemasterToneChain(ctx, source, profile, options = {}) {
  const spatialSafe = options.spatialSafe === true;
  const inputGain = ctx.createGain();
  inputGain.gain.value = dbToGain(spatialSafe ? clamp(profile.inputGainDb, -8, 2.2) : profile.inputGainDb);

  const highpass = ctx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.value = 24;
  highpass.Q.value = 0.55;

  const lowShelf = ctx.createBiquadFilter();
  lowShelf.type = 'lowshelf';
  lowShelf.frequency.value = 105;
  lowShelf.gain.value = spatialSafe ? clampSpatialEqDb(profile.lowShelfDb, 0.68) : profile.lowShelfDb;

  const lowMid = ctx.createBiquadFilter();
  lowMid.type = 'peaking';
  lowMid.frequency.value = 360;
  lowMid.Q.value = 0.9;
  lowMid.gain.value = spatialSafe ? clampSpatialEqDb(profile.lowMidDb, 0.68) : profile.lowMidDb;

  const presence = ctx.createBiquadFilter();
  presence.type = 'peaking';
  presence.frequency.value = 3200;
  presence.Q.value = 0.82;
  presence.gain.value = spatialSafe ? clampSpatialEqDb(profile.presenceDb, 0.64) : profile.presenceDb;

  const highShelf = ctx.createBiquadFilter();
  highShelf.type = 'highshelf';
  highShelf.frequency.value = 9200;
  highShelf.gain.value = spatialSafe ? clampSpatialEqDb(profile.highShelfDb, 0.58) : profile.highShelfDb;

  const deHarsh = ctx.createBiquadFilter();
  deHarsh.type = 'peaking';
  deHarsh.frequency.value = 5800;
  deHarsh.Q.value = 2.2;
  deHarsh.gain.value = spatialSafe ? clamp(profile.harshnessTameDb || 0, -2.2, 0.6) : profile.harshnessTameDb || 0;

  const polish = ctx.createWaveShaper();
  polish.curve = createSoftSaturationCurve(spatialSafe ? Math.min(profile.harmonicDrive || 0, 0.012) : profile.harmonicDrive || 0);
  polish.oversample = '2x';

  source.connect(inputGain);
  inputGain.connect(highpass);
  highpass.connect(lowShelf);
  lowShelf.connect(lowMid);
  lowMid.connect(presence);
  presence.connect(highShelf);
  highShelf.connect(deHarsh);
  deHarsh.connect(polish);
  return polish;
}

function createSoftSaturationCurve(amount) {
  const samples = 2048;
  const curve = new Float32Array(samples);
  const driveAmount = clamp(amount, 0, 0.12);
  if (driveAmount <= 0.001) {
    for (let i = 0; i < samples; i += 1) {
      curve[i] = (i / (samples - 1)) * 2 - 1;
    }
    return curve;
  }
  const drive = 1 + driveAmount * 12;
  for (let i = 0; i < samples; i += 1) {
    const x = (i / (samples - 1)) * 2 - 1;
    curve[i] = Math.tanh(x * drive) / Math.tanh(drive);
  }
  return curve;
}

function setPannerPosition(panner, x, y, z) {
  if ('positionX' in panner) {
    panner.positionX.value = x;
    panner.positionY.value = y;
    panner.positionZ.value = z;
  } else {
    panner.setPosition(x, y, z);
  }
}

function createImpulseResponse(ctx, seconds, decay) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const cacheKey = [
    ctx.sampleRate,
    length,
    Math.round(decay * 1000)
  ].join('|');
  if (impulseResponseCache.has(cacheKey)) {
    return impulseResponseCache.get(cacheKey);
  }
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
  const earlyReflections = [
    { time: 0.012, gain: 0.55 },
    { time: 0.021, gain: -0.42 },
    { time: 0.034, gain: 0.34 },
    { time: 0.052, gain: -0.24 }
  ];

  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    const channelSkew = channel === 0 ? 0.92 : 1.08;
    for (let i = 0; i < length; i += 1) {
      const t = i / length;
      const secondsAtSample = i / ctx.sampleRate;
      const envelope = Math.pow(1 - t, decay);
      const tailStart = Math.floor(ctx.sampleRate * 0.046);
      let value = 0;
      earlyReflections.forEach((reflection, index) => {
        const reflectionSample = Math.floor(ctx.sampleRate * reflection.time * channelSkew);
        const distance = Math.abs(i - reflectionSample);
        if (distance <= 2) {
          value += reflection.gain * (1 - distance / 3) * (channel === 0 ? 1 : (index % 2 ? -0.86 : 0.9));
        }
      });
      if (i > tailStart) {
        const damp = 1 / (1 + secondsAtSample * 1.7);
        const noise = seededNoise(i, channel);
        value += noise * envelope * damp;
      }
      data[i] = value * 0.72;
    }
  }

  impulseResponseCache.set(cacheKey, impulse);
  if (impulseResponseCache.size > IMPULSE_RESPONSE_CACHE_LIMIT) {
    const oldestKey = impulseResponseCache.keys().next().value;
    impulseResponseCache.delete(oldestKey);
  }
  return impulse;
}

function seededNoise(index, channel) {
  const value = Math.sin((index + 1) * 12.9898 + (channel + 1) * 78.233) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
}

async function renderExportAudioBuffer(buffer, mode, settings, analysis, layout) {
  const channelCount = layout.channels.length;
  const offline = new OfflineAudioContext(channelCount, buffer.length, buffer.sampleRate);
  const graph = channelCount <= 2
    ? createRenderGraph(mode, offline, buffer, settings, analysis)
    : mode === 'original'
      ? createOriginalMultichannelGraph(offline, buffer, settings, layout)
      : settings.orchestraStage === false
        ? createDirectMultichannelGraph(offline, buffer, settings, layout, analysis)
      : createMultichannelSpatialGraph(offline, buffer, settings, analysis, layout, mode);
  graph.source.start(0);
  const rendered = await offline.startRendering();
  return normalizeRenderedAudioBuffer(rendered, mode === 'original' ? -0.4 : -1.2);
}

function normalizeRenderedAudioBuffer(buffer, targetPeakDb = -1.2) {
  const target = dbToGain(targetPeakDb);
  let peak = 0;
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < data.length; i += 1) {
      peak = Math.max(peak, Math.abs(data[i] || 0));
    }
  }
  if (!peak || peak <= target) return buffer;
  const scale = target / peak;
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < data.length; i += 1) {
      data[i] *= scale;
    }
  }
  return buffer;
}

function createOriginalMultichannelGraph(ctx, buffer, settings, layout) {
  const source = ctx.createBufferSource();
  const inputChannels = Math.max(1, buffer.numberOfChannels);
  const splitter = ctx.createChannelSplitter(inputChannels);
  const merger = ctx.createChannelMerger(layout.channels.length);
  const output = ctx.createGain();
  source.buffer = buffer;
  output.gain.value = settings.gain;
  setDiscreteChannelMode(merger, layout.channels.length);
  setDiscreteChannelMode(output, layout.channels.length);

  source.connect(splitter);
  layout.channels.forEach((speaker, channelIndex) => {
    connectOriginalSpeakerChannel(ctx, splitter, inputChannels, merger, speaker, channelIndex);
  });
  merger.connect(output);
  output.connect(ctx.destination);
  return { source, output };
}

function createDirectMultichannelGraph(ctx, buffer, settings, layout, analysis = null) {
  const source = ctx.createBufferSource();
  const inputChannels = Math.max(1, buffer.numberOfChannels);
  const splitChannels = Math.max(2, inputChannels);
  const splitter = ctx.createChannelSplitter(splitChannels);
  const merger = ctx.createChannelMerger(layout.channels.length);
  const output = ctx.createGain();
  source.buffer = buffer;
  output.gain.value = settings.gain;
  setDiscreteChannelMode(merger, layout.channels.length);
  setDiscreteChannelMode(output, layout.channels.length);

  const directOutput = shouldApplyDirectRemaster(settings, analysis)
    ? createRemasterToneChain(ctx, source, analysis.remaster)
    : source;
  directOutput.connect(splitter);
  layout.channels.forEach((speaker, channelIndex) => {
    connectOriginalSpeakerChannel(ctx, splitter, inputChannels, merger, speaker, channelIndex);
  });
  merger.connect(output);
  output.connect(ctx.destination);
  return { source, output, panners: {} };
}

function connectOriginalSpeakerChannel(ctx, splitter, inputChannels, merger, speaker, channelIndex) {
  const left = 0;
  const right = inputChannels > 1 ? 1 : 0;
  const isRight = speaker.id.endsWith('R');
  const sideInput = isRight ? right : left;

  if (speaker.id === 'FL') {
    connectSplitterOutputToMerger(ctx, splitter, left, merger, channelIndex, 1);
    return;
  }
  if (speaker.id === 'FR') {
    connectSplitterOutputToMerger(ctx, splitter, right, merger, channelIndex, 1);
    return;
  }
  if (speaker.id === 'FC') {
    connectSplitterOutputToMerger(ctx, splitter, left, merger, channelIndex, 0.5);
    connectSplitterOutputToMerger(ctx, splitter, right, merger, channelIndex, 0.5);
    return;
  }
  if (speaker.lfe) {
    connectSplitterOutputToMerger(ctx, splitter, left, merger, channelIndex, 0.36, {
      filter: { type: 'lowpass', frequency: 120, q: 0.6 }
    });
    connectSplitterOutputToMerger(ctx, splitter, right, merger, channelIndex, 0.36, {
      filter: { type: 'lowpass', frequency: 120, q: 0.6 }
    });
    return;
  }
  if (speaker.height) {
    connectSplitterOutputToMerger(ctx, splitter, sideInput, merger, channelIndex, 0.2, {
      delay: speaker.rear ? 0.036 : 0.026,
      filter: { type: 'highpass', frequency: 1500, q: 0.55 }
    });
    return;
  }
  connectSplitterOutputToMerger(ctx, splitter, sideInput, merger, channelIndex, speaker.rear ? 0.34 : 0.42, {
    delay: speaker.rear ? 0.024 : 0.016,
    filter: { type: 'highpass', frequency: 150, q: 0.5 }
  });
}

function createMultichannelSpatialGraph(ctx, buffer, settings, analysis, layout, mode) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const remasterEnabled = settings.remaster !== false;
  const remaster = remasterEnabled && analysis && analysis.remaster ? analysis.remaster : createNeutralRemasterProfile();
  const toneOutput = remasterEnabled ? createRemasterToneChain(ctx, source, remaster, { spatialSafe: true }) : source;
  const stageLevelMap = getStageLevelMap(analysis);
  const merger = ctx.createChannelMerger(layout.channels.length);
  const output = ctx.createGain();
  output.gain.value = settings.gain * (mode === 'atmos' ? 0.82 : 0.88);
  setDiscreteChannelMode(merger, layout.channels.length);
  setDiscreteChannelMode(output, layout.channels.length);

  ORCHESTRA_SECTIONS.forEach((section) => {
    const level = clamp(stageLevelMap[section.id] || 0.5, 0, 1);
    const filter = ctx.createBiquadFilter();
    filter.type = section.type;
    filter.frequency.value = section.freq;
    filter.Q.value = mode === 'atmos' ? section.q * 0.92 : section.q;

    const sectionGain = ctx.createGain();
    const modeTrim = mode === 'atmos' ? 0.86 : 0.92;
    sectionGain.gain.value = section.gain * modeTrim * getSpatialSectionTrim(mode, settings) * (0.58 + level * 0.38) * getSectionRemasterWeight(section, remaster);

    toneOutput.connect(filter);
    filter.connect(sectionGain);

    const object = getMultichannelObjectPosition(section, settings, remaster, mode, level);
    const weights = getSpeakerWeights(layout, object, section, mode);
    weights.forEach((weight, channelIndex) => {
      if (weight <= 0.0005) return;
      const speaker = layout.channels[channelIndex];
      const delay = getSpeakerDelay(object, speaker, settings, mode);
      const options = {};
      if (delay > 0.0005) options.delay = delay;
      if (speaker.lfe) {
        options.filter = { type: 'lowpass', frequency: section.id === 'timpani' ? 132 : 105, q: 0.62 };
      } else if (speaker.height) {
        options.filter = { type: 'highpass', frequency: isLowSection(section) ? 420 : 1450, q: 0.56 };
      }
      connectNodeToMergerChannel(ctx, sectionGain, merger, channelIndex, weight, options);
    });
  });

  connectFrontAnchor(ctx, toneOutput, merger, layout, settings, remaster, mode);
  merger.connect(output);
  output.connect(ctx.destination);
  return { source, output };
}

function getMultichannelObjectPosition(section, settings, remaster, mode, level) {
  const placement = getSectionPlacement(section);
  const stageDepthRatio = clamp(
    (Math.abs(placement.z) - Math.abs(STAGE_LIMITS.zNear)) /
      (Math.abs(STAGE_LIMITS.zFar) - Math.abs(STAGE_LIMITS.zNear)),
    0,
    1
  );
  const atmosScale = mode === 'atmos' ? 1.08 : 1;
  return {
    x: clamp((placement.x / STAGE_LIMITS.xMax) * settings.width * (remaster.widthScale || 1) * atmosScale, -1.34, 1.34),
    y: mode === 'atmos'
      ? getAtmosHeightForSection(section, level)
      : clamp(0.04 + level * 0.18 + settings.room * 0.08, 0.04, 0.34),
    z: clamp(0.2 - stageDepthRatio * settings.depth * (remaster.depthScale || 1) * atmosScale, -1.18, 0.28)
  };
}

function getSpeakerWeights(layout, object, section, mode) {
  const raw = layout.channels.map((speaker) => {
    if (speaker.lfe) {
      return isLowSection(section) ? (section.id === 'timpani' ? 0.42 : 0.26) : 0;
    }
    const dx = object.x - speaker.x;
    const dy = (object.y || 0) - (speaker.y || 0);
    const dz = object.z - speaker.z;
    const distance = Math.sqrt(dx * dx + dy * dy * 1.45 + dz * dz * 0.92);
    let weight = 1 / Math.pow(0.36 + distance, 1.72);
    if (speaker.id === 'FC') {
      weight *= section.id.includes('woodwinds') || section.id === 'violas' || section.id === 'horns' ? 1.08 : 0.72;
    }
    if (speaker.surround || speaker.rear) {
      weight *= 0.9;
    }
    if (speaker.height) {
      weight *= mode === 'atmos' ? 0.62 + object.y * 0.34 : 0.18 + object.y * 0.18;
    }
    return weight;
  });
  const sum = raw.reduce((total, value) => total + value, 0) || 1;
  return raw.map((value) => value / sum);
}

function getSpeakerDelay(object, speaker, settings, mode) {
  if (speaker.lfe) return 0.004;
  const dx = Math.abs(object.x - speaker.x);
  const dz = Math.abs(object.z - speaker.z);
  const heightOffset = Math.abs((object.y || 0) - (speaker.y || 0));
  const base = dx * 0.0018 + dz * 0.0038 + heightOffset * 0.0025;
  const roomTail = (speaker.surround || speaker.rear || speaker.height) ? settings.room * 0.012 : 0;
  const atmosLift = mode === 'atmos' && speaker.height ? 0.006 : 0;
  return clamp((base + roomTail + atmosLift) * settings.depth, 0, 0.075);
}

function connectFrontAnchor(ctx, node, merger, layout, settings, remaster, mode) {
  const frontIds = ['FL', 'FR', 'FC'];
  const frontChannels = layout.channels
    .map((speaker, index) => ({ speaker, index }))
    .filter((item) => frontIds.includes(item.speaker.id));
  if (!frontChannels.length) return;
  const gain = (mode === 'atmos' ? 0.05 : 0.07) + clamp(remaster.clarityMix || 0.1, 0.08, 0.22) * 0.26;
  frontChannels.forEach(({ speaker, index }) => {
    const channelGain = speaker.id === 'FC' ? gain * 0.52 : gain;
    connectNodeToMergerChannel(ctx, node, merger, index, channelGain, {
      delay: speaker.id === 'FC' ? 0.0015 : 0,
      filter: { type: 'highpass', frequency: 38 + settings.room * 18, q: 0.5 }
    });
  });
}

function connectSplitterOutputToMerger(ctx, splitter, inputIndex, merger, channelIndex, gainValue, options = {}) {
  const gain = ctx.createGain();
  gain.gain.value = gainValue;
  splitter.connect(gain, inputIndex, 0);
  connectNodeToMergerChannel(ctx, gain, merger, channelIndex, 1, options);
}

function connectNodeToMergerChannel(ctx, node, merger, channelIndex, gainValue, options = {}) {
  if (!Number.isFinite(gainValue) || Math.abs(gainValue) <= 0.00001) return null;
  let current = node;
  if (options.filter) {
    const filter = ctx.createBiquadFilter();
    filter.type = options.filter.type;
    filter.frequency.value = options.filter.frequency;
    filter.Q.value = options.filter.q || 0.5;
    if (Number.isFinite(options.filter.gain)) {
      filter.gain.value = options.filter.gain;
    }
    current.connect(filter);
    current = filter;
  }
  if (options.delay) {
    const delay = ctx.createDelay(0.12);
    delay.delayTime.value = clamp(options.delay, 0, 0.11);
    current.connect(delay);
    current = delay;
  }
  const gain = ctx.createGain();
  gain.gain.value = gainValue;
  current.connect(gain);
  gain.connect(merger, 0, channelIndex);
  return gain;
}

function setDiscreteChannelMode(node, channelCount) {
  try {
    node.channelCount = channelCount;
    node.channelCountMode = 'explicit';
    node.channelInterpretation = 'discrete';
  } catch (error) {
    void error;
  }
}

function isLowSection(section) {
  return section.band === 'sub' || section.band === 'bass' || section.id === 'timpani' || section.id === 'basses';
}

async function exportSpatialWav() {
  // 현재 UI에서 선택한 공간 폭, 깊이, 룸, 채널 레이아웃을 기준으로 오프라인 렌더링한다.
  // 사용자가 듣고 조정한 설정과 다운로드되는 WAV 결과가 일치하도록 하는 Export 진입점이다.
  if (!state.analysis) return;
  stopPlayback(false);
  state.settings = getSpatialSettings();
  const modeLabel = getRenderModeLabel(state.mode);
  const channelLayout = getOutputChannelLayout(state.settings.channelLayout);
  setBusy(true, `${modeLabel} WAV 렌더링 중`);
  refs.exportButton.disabled = true;

  try {
    const buffer = state.analysis.audioBuffer;
    const rendered = await renderExportAudioBuffer(buffer, state.mode, state.settings, state.analysis, channelLayout);
    const wavBlob = encodeWav(rendered, channelLayout);
    clearRenderedUrl();
    state.renderUrl = URL.createObjectURL(wavBlob);
    const link = document.createElement('a');
    link.href = state.renderUrl;
    link.download = `${stripExtension(state.analysis.file.name)}-${getRenderFileSuffix(state.mode)}-${channelLayout.fileSuffix}.wav`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`${modeLabel} WAV 렌더링을 완료했습니다.`);
  } catch (error) {
    console.error(error);
    showToast('렌더링 중 오류가 발생했습니다.');
  } finally {
    refs.exportButton.disabled = false;
    setBusy(false, state.analysis ? '분석 완료' : '음악 파일 대기 중');
  }
}

function encodeWav(buffer, layout = null) {
  const channelCount = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = channelCount * bytesPerSample;
  const dataSize = length * blockAlign;
  const useExtensible = channelCount > 2;
  const fmtSize = useExtensible ? 40 : 16;
  const headerSize = 12 + 8 + fmtSize + 8;
  const arrayBuffer = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(arrayBuffer);
  let offset = 0;

  writeString(view, offset, 'RIFF'); offset += 4;
  view.setUint32(offset, 4 + (8 + fmtSize) + (8 + dataSize), true); offset += 4;
  writeString(view, offset, 'WAVE'); offset += 4;
  writeString(view, offset, 'fmt '); offset += 4;
  view.setUint32(offset, fmtSize, true); offset += 4;
  view.setUint16(offset, useExtensible ? 0xfffe : 1, true); offset += 2;
  view.setUint16(offset, channelCount, true); offset += 2;
  view.setUint32(offset, sampleRate, true); offset += 4;
  view.setUint32(offset, sampleRate * blockAlign, true); offset += 4;
  view.setUint16(offset, blockAlign, true); offset += 2;
  view.setUint16(offset, 16, true); offset += 2;
  if (useExtensible) {
    view.setUint16(offset, 22, true); offset += 2;
    view.setUint16(offset, 16, true); offset += 2;
    view.setUint32(offset, layout && layout.mask ? layout.mask : 0, true); offset += 4;
    writePcmSubFormatGuid(view, offset); offset += 16;
  }
  writeString(view, offset, 'data'); offset += 4;
  view.setUint32(offset, dataSize, true); offset += 4;

  const channels = Array.from({ length: channelCount }, (_, index) => buffer.getChannelData(index));
  for (let i = 0; i < length; i += 1) {
    for (let channel = 0; channel < channelCount; channel += 1) {
      const dither = (seededNoise(i, channel) - seededNoise(i + 8191, channel)) / 65536;
      const sample = clamp((channels[channel][i] || 0) + dither, -1, 1);
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function writePcmSubFormatGuid(view, offset) {
  view.setUint32(offset, 0x00000001, true); offset += 4;
  view.setUint16(offset, 0x0000, true); offset += 2;
  view.setUint16(offset, 0x0010, true); offset += 2;
  view.setUint8(offset, 0x80); offset += 1;
  view.setUint8(offset, 0x00); offset += 1;
  view.setUint8(offset, 0x00); offset += 1;
  view.setUint8(offset, 0xaa); offset += 1;
  view.setUint8(offset, 0x00); offset += 1;
  view.setUint8(offset, 0x38); offset += 1;
  view.setUint8(offset, 0x9b); offset += 1;
  view.setUint8(offset, 0x71);
}

function writeString(view, offset, text) {
  for (let i = 0; i < text.length; i += 1) {
    view.setUint8(offset + i, text.charCodeAt(i));
  }
}

function invalidateStaticCanvasCache() {
  staticCanvasCache.waveform = null;
  staticCanvasCache.loudness = null;
}

function invalidateThemeValueCache() {
  themeValueCache.key = '';
  themeValueCache.values.clear();
  invalidateStaticCanvasCache();
}

function getThemeCacheKey() {
  return document.documentElement.dataset.theme || 'light';
}

function getStaticCanvasKey(kind, analysis, width, height, dpr) {
  return [
    kind,
    getThemeCacheKey(),
    width,
    height,
    dpr,
    analysis.duration,
    analysis.sampleRate,
    analysis.hue
  ].join('|');
}

function createCanvasSurface(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return {
    canvas,
    ctx: canvas.getContext('2d')
  };
}

function drawAllCanvases() {
  if (!state.analysis) {
    renderEmptyCanvases();
    return;
  }
  const time = getPlaybackTime();
  drawWaveform(state.analysis, time);
  drawSpectrum(state.analysis);
  drawSpectrogram(state.analysis);
  drawLoudness(state.analysis, time);
}

function drawWaveform(analysis, currentTime = 0) {
  const { ctx, width, height, dpr } = prepareCanvas(refs.waveform);
  const staticCanvas = getStaticWaveformCanvas(analysis, width, height, dpr);
  ctx.drawImage(staticCanvas, 0, 0);
  if (currentTime > 0) {
    const cursorX = analysis.duration ? (currentTime / analysis.duration) * width : 0;
    drawCursor(ctx, cursorX, height, dpr);
  }
}

function getStaticWaveformCanvas(analysis, width, height, dpr) {
  const key = getStaticCanvasKey('waveform', analysis, width, height, dpr);
  if (staticCanvasCache.waveform && staticCanvasCache.waveform.key === key) {
    return staticCanvasCache.waveform.canvas;
  }
  const surface = createCanvasSurface(width, height);
  drawStaticWaveform(surface.ctx, analysis, width, height, dpr);
  staticCanvasCache.waveform = { key, canvas: surface.canvas };
  return surface.canvas;
}

function drawStaticWaveform(ctx, analysis, width, height, dpr) {
  const peaks = analysis.waveform;
  const count = peaks.length / 3;
  const center = height * 0.5;

  drawCanvasBackground(ctx, width, height, analysis.hue);
  ctx.strokeStyle = themeVar('--canvas-center-line', 'rgba(70, 89, 53, 0.16)');
  ctx.lineWidth = Math.max(1, dpr);
  ctx.beginPath();
  ctx.moveTo(0, center);
  ctx.lineTo(width, center);
  ctx.stroke();

  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, `hsl(${analysis.hue} 62% 62% / 0.88)`);
  gradient.addColorStop(0.55, themeVar('--canvas-gold', 'rgba(242, 200, 121, 0.86)'));
  gradient.addColorStop(1, themeVar('--canvas-coral', 'rgba(255, 111, 97, 0.82)'));
  ctx.strokeStyle = gradient;
  ctx.lineWidth = Math.max(1.5, dpr * 1.4);
  ctx.beginPath();

  for (let i = 0; i < count; i += 1) {
    const x = (i / Math.max(1, count - 1)) * width;
    const max = peaks[i * 3 + 1];
    const y = center - Math.abs(max) * height * 0.42;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  for (let i = count - 1; i >= 0; i -= 1) {
    const x = (i / Math.max(1, count - 1)) * width;
    const min = peaks[i * 3];
    const y = center + Math.abs(min) * height * 0.42;
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.globalAlpha = 0.78;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.fillStyle = `hsl(${analysis.hue} 70% 58% / 0.12)`;
  for (let i = 0; i < count; i += 3) {
    const x = (i / Math.max(1, count - 1)) * width;
    const rms = peaks[i * 3 + 2];
    const barHeight = Math.max(1, rms * height * 0.9);
    ctx.fillRect(x, center - barHeight / 2, Math.max(1, width / count), barHeight);
  }
}

function drawSpectrum(analysis) {
  const { ctx, width, height, dpr } = prepareCanvas(refs.spectrum);
  const { magnitudes, binHz, maxMagnitude } = analysis.spectrum;
  drawCanvasBackground(ctx, width, height, analysis.hue);

  const barCount = 96;
  const minHz = 35;
  const maxHz = Math.min(18000, analysis.sampleRate / 2);
  const gap = Math.max(1, dpr * 2);
  const barWidth = (width - gap * (barCount - 1)) / barCount;

  for (let i = 0; i < barCount; i += 1) {
    const a = i / barCount;
    const b = (i + 1) / barCount;
    const startHz = minHz * Math.pow(maxHz / minHz, a);
    const endHz = minHz * Math.pow(maxHz / minHz, b);
    const startBin = Math.max(1, Math.floor(startHz / binHz));
    const endBin = Math.min(magnitudes.length - 1, Math.ceil(endHz / binHz));
    let sum = 0;
    let localMax = 0;
    for (let bin = startBin; bin <= endBin; bin += 1) {
      sum += magnitudes[bin];
      localMax = Math.max(localMax, magnitudes[bin]);
    }
    const value = Math.max(sum / Math.max(1, endBin - startBin + 1), localMax * 0.55) / Math.max(maxMagnitude, 1e-12);
    const normalized = clamp(Math.log10(1 + value * 18) / Math.log10(19), 0, 1);
    const barHeight = Math.max(2 * dpr, normalized * height * 0.82);
    const x = i * (barWidth + gap);
    const y = height - barHeight - 18 * dpr;
    const hue = (analysis.hue + i * 1.6) % 360;
    ctx.fillStyle = `hsl(${hue} 58% ${50 + normalized * 18}% / ${0.36 + normalized * 0.56})`;
    roundRect(ctx, x, y, barWidth, barHeight, Math.min(6 * dpr, barWidth / 2));
    ctx.fill();
  }

  drawAxisLabel(ctx, `${formatHz(analysis.spectrum.centroid)} centroid`, width, height, dpr);
}

function drawSpectrogram(analysis) {
  const { ctx, width, height, dpr } = prepareCanvas(refs.spectrogram);
  const { values, frameCount, binCount } = analysis.spectrogram;
  drawCanvasBackground(ctx, width, height, analysis.hue);
  const cellW = width / frameCount;
  const cellH = height / binCount;

  for (let x = 0; x < frameCount; x += 1) {
    for (let y = 0; y < binCount; y += 1) {
      const value = values[x][y];
      if (value < 0.015) continue;
      const hue = (analysis.hue + value * 76 + y * 0.18) % 360;
      const light = 16 + value * 54;
      ctx.fillStyle = `hsl(${hue} 62% ${light}% / ${0.24 + value * 0.72})`;
      ctx.fillRect(x * cellW, y * cellH, Math.ceil(cellW) + 0.5, Math.ceil(cellH) + 0.5);
    }
  }

  drawAxisLabel(ctx, `${formatHz(analysis.spectrogram.minHz)} - ${formatHz(analysis.spectrogram.maxHz)}`, width, height, dpr);
}

function drawLoudness(analysis, currentTime = 0) {
  const { ctx, width, height, dpr } = prepareCanvas(refs.loudness);
  const staticCanvas = getStaticLoudnessCanvas(analysis, width, height, dpr);
  ctx.drawImage(staticCanvas, 0, 0);
  if (currentTime > 0) {
    const cursorX = analysis.duration ? (currentTime / analysis.duration) * width : 0;
    drawCursor(ctx, cursorX, height, dpr);
  }
}

function getStaticLoudnessCanvas(analysis, width, height, dpr) {
  const key = getStaticCanvasKey('loudness', analysis, width, height, dpr);
  if (staticCanvasCache.loudness && staticCanvasCache.loudness.key === key) {
    return staticCanvasCache.loudness.canvas;
  }
  const surface = createCanvasSurface(width, height);
  drawStaticLoudness(surface.ctx, analysis, width, height, dpr);
  staticCanvasCache.loudness = { key, canvas: surface.canvas };
  return surface.canvas;
}

function drawStaticLoudness(ctx, analysis, width, height, dpr) {
  const windows = analysis.loudness.windows;
  drawCanvasBackground(ctx, width, height, analysis.hue);
  if (!windows.length) return;

  let minWindowDb = Infinity;
  for (let i = 0; i < windows.length; i += 1) {
    minWindowDb = Math.min(minWindowDb, windows[i].db);
  }
  const minDb = Math.min(-72, Math.floor(minWindowDb / 6) * 6);
  const maxDb = 0;
  const yForDb = (db) => {
    const ratio = clamp((db - minDb) / (maxDb - minDb), 0, 1);
    return height - (ratio * (height - 34 * dpr) + 18 * dpr);
  };

  ctx.strokeStyle = themeVar('--canvas-grid', 'rgba(70, 89, 53, 0.12)');
  ctx.lineWidth = Math.max(1, dpr);
  for (let line = -60; line <= 0; line += 12) {
    const y = yForDb(line);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, `hsl(${analysis.hue} 62% 62%)`);
  gradient.addColorStop(0.55, themeVar('--canvas-gold', 'rgba(242, 200, 121, 0.95)'));
  gradient.addColorStop(1, themeVar('--canvas-coral', 'rgba(255, 111, 97, 0.9)'));
  ctx.strokeStyle = gradient;
  ctx.lineWidth = Math.max(2.5, dpr * 2.2);
  ctx.beginPath();
  windows.forEach((item, index) => {
    const x = (index / Math.max(1, windows.length - 1)) * width;
    const y = yForDb(item.db);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  drawAxisLabel(ctx, `${analysis.loudness.rmsDb.toFixed(1)} dBFS RMS`, width, height, dpr);
}

function drawCursor(ctx, x, height, dpr) {
  ctx.strokeStyle = themeVar('--canvas-cursor', 'rgba(45, 63, 36, 0.82)');
  ctx.lineWidth = Math.max(1.4, dpr * 1.3);
  ctx.beginPath();
  ctx.moveTo(x, 10 * dpr);
  ctx.lineTo(x, height - 10 * dpr);
  ctx.stroke();
}

function drawCanvasBackground(ctx, width, height, hue) {
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, themeVar('--canvas-bg-start', 'rgba(255, 253, 247, 0.82)'));
  bg.addColorStop(0.52, `hsl(${hue} 36% ${themeVar('--canvas-hsl-lightness', '76%')} / ${themeVar('--canvas-hsl-alpha', '0.36')})`);
  bg.addColorStop(1, themeVar('--canvas-bg-end', 'rgba(220, 231, 205, 0.54)'));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = themeVar('--canvas-grid', 'rgba(70, 89, 53, 0.11)');
  ctx.lineWidth = 1;
  const spacing = Math.max(30, Math.round(width / 16));
  for (let x = spacing; x < width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
}

function drawAxisLabel(ctx, text, width, height, dpr) {
  ctx.fillStyle = themeVar('--canvas-axis', 'rgba(45, 63, 36, 0.72)');
  ctx.font = `${Math.max(11, 11 * dpr)}px system-ui, sans-serif`;
  ctx.fillText(text, 12 * dpr, height - 12 * dpr);
}

function themeVar(name, fallback) {
  const key = getThemeCacheKey();
  if (themeValueCache.key !== key) {
    themeValueCache.key = key;
    themeValueCache.values.clear();
  }
  if (themeValueCache.values.has(name)) {
    return themeValueCache.values.get(name);
  }
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  themeValueCache.values.set(name, value);
  return value;
}

function prepareCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const width = Math.max(320, Math.floor(rect.width * dpr));
  const height = Math.max(180, Math.floor(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  return { ctx, width, height, dpr };
}

function renderEmptyState() {
  stopPlayback(true);
  cancelSpatialSliderAnimation();
  invalidateStaticCanvasCache();
  state.remasterCompareRows = [];
  state.remasterCompareColumn = '';
  document.body.classList.remove('has-analysis', 'is-busy');
  refs.statusText.textContent = '음악 파일 대기 중';
  refs.trackKicker.textContent = 'READY';
  refs.trackName.textContent = '아직 선택된 파일이 없습니다';
  refs.trackSubtitle.textContent = '브라우저 안에서만 분석하고 변환합니다.';
  refs.playButton.disabled = true;
  refs.stopButton.disabled = true;
  refs.exportButton.disabled = true;
  refs.seekSlider.disabled = true;
  refs.seekSlider.value = 0;
  refs.currentTime.textContent = '0:00';
  refs.totalTime.textContent = '0:00';
  refs.resetButton.hidden = true;

  refs.metrics.duration.textContent = '--:--';
  refs.metrics.durationNote.textContent = 'duration';
  refs.metrics.tempo.textContent = '--';
  refs.metrics.tempoNote.textContent = 'tempo';
  refs.metrics.key.textContent = '--';
  refs.metrics.keyNote.textContent = 'tonality';
  refs.metrics.loudness.textContent = '-- dBFS';
  refs.metrics.loudnessNote.textContent = 'RMS';
  refs.metrics.dynamic.textContent = '-- dB';
  refs.metrics.dynamicNote.textContent = 'range';
  refs.metrics.peak.textContent = '-- dBFS';
  refs.metrics.peakNote.textContent = 'peak';
  refs.metrics.centroid.textContent = '-- Hz';
  refs.metrics.centroidNote.textContent = 'centroid';
  refs.metrics.rolloff.textContent = '-- Hz';
  refs.metrics.rolloffNote.textContent = '85%';
  refs.metrics.stereo.textContent = '--';
  refs.metrics.stereoNote.textContent = 'width';
  refs.metrics.flatness.textContent = '--';
  refs.metrics.flatnessNote.textContent = 'flatness';
  refs.metrics.pitch.textContent = '--';
  refs.metrics.pitchNote.textContent = 'dominant';
  refs.metrics.clip.textContent = '--%';
  refs.metrics.clipNote.textContent = 'samples';

  refs.bandList.innerHTML = BAND_DEFS.map((band) => `
    <div class="band-row">
      <strong>${band.label}</strong>
      <span class="band-track" title="${band.range}"><span style="--value:0%"></span></span>
      <em>0%</em>
    </div>
  `).join('');
  refs.metadataList.innerHTML = '<div><dt>상태</dt><dd>업로드 대기</dd></div>';
  refs.reportCopy.textContent = '파일을 선택하면 음악적 성격과 공간화 전략이 정리됩니다.';
  refs.traitList.innerHTML = ['에너지', '속도감', '밝기', '온기', '공간감', '질감'].map((label) => `
    <div class="trait-row">
      <strong>${label}</strong>
      <span class="trait-track"><span style="--value:0%"></span></span>
      <em>0%</em>
    </div>
  `).join('');
  refs.remasterList.innerHTML = `
    <div class="remaster-row">
      <strong>Remaster</strong>
      <span>분석 후 자동 EQ, 라우드니스, 컴프레션, 리미터 설정이 표시됩니다.</span>
      <em>대기</em>
    </div>
  `;
  refs.remasterCompareTag.textContent = state.settings.remaster ? '리마스터 ON' : '리마스터 OFF';
  refs.remasterCompareBody.innerHTML = `
    <div class="compare-row">
      <strong>대기</strong>
      <span class="compare-cell ${state.settings.remaster ? '' : 'is-current'}">파일 선택 전</span>
      <span class="compare-cell ${state.settings.remaster ? 'is-current' : ''}">분석 후 표시</span>
      <em>오디오를 업로드하면 자동 리마스터 적용 전/후가 계산됩니다.</em>
    </div>
  `;
  refs.timelineList.innerHTML = '<div class="timeline-card"><strong>--:--</strong><p>구간 분석 대기</p><small>파일 선택 후 표시</small></div>';
  renderEmptyStage();
  resetTags('대기');
  renderEmptyAiInsights();
  renderEmptyCanvases();
}

function renderEmptyAiInsights() {
  if (!refs.aiSummaryGrid || !refs.aiChipList || !refs.aiSectionGrid) return;
  refs.tags.ai.textContent = '대기';
  refs.aiSummaryGrid.innerHTML = [
    ['Model', '대기', '파일 분석 후 활성화'],
    ['Detected', '0', 'active sections'],
    ['Mix Readiness', '--', 'clarity'],
    ['Stage Depth', '--', 'live lanes']
  ].map(([label, value, note]) => `
    <div class="ai-summary-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </div>
  `).join('');
  refs.aiChipList.innerHTML = '<span class="ai-chip is-muted"><strong>AI tags</strong><em>대기</em></span>';
  refs.aiSectionGrid.innerHTML = ORCHESTRA_SECTIONS.map((section) => `
    <div class="ai-section-row is-inactive" style="--section-color:${section.color};--value:0%">
      <strong>${escapeHtml(section.short)}</strong>
      <span>${escapeHtml(section.label)}</span>
      <em>0%</em>
      <i aria-hidden="true"><b></b></i>
    </div>
  `).join('');
}

function renderEmptyStage() {
  refs.stageMap.innerHTML = renderConcertHallArt() + ORCHESTRA_SECTIONS.map((section) => {
    const position = getStagePosition(section);
    return `
      <div class="stage-node is-inactive" data-stage="${section.id}" style="--x:${position.x}%;--y:${position.y}%;--level:0;--scale:0.833;--glow:6px;--node-color:${section.color}" title="${escapeHtml(section.label)} · 드래그로 위치 이동">
        ${escapeHtml(section.short)}
      </div>
    `;
  }).join('');
  refs.stageList.innerHTML = ORCHESTRA_SECTIONS.map((section) => `
    <div class="stage-row is-inactive">
      <strong>${escapeHtml(section.label)}</strong>
      <span class="stage-track"><span style="--value:0%"></span></span>
      <em>${escapeHtml(section.role)}</em>
    </div>
  `).join('');
  cacheStageElements();
}

function renderEmptyCanvases() {
  [refs.waveform, refs.spectrum, refs.spectrogram, refs.loudness].forEach((canvas) => {
    const { ctx, width, height, dpr } = prepareCanvas(canvas);
    drawCanvasBackground(ctx, width, height, 172);
    ctx.fillStyle = themeVar('--canvas-empty', 'rgba(45, 63, 36, 0.62)');
    ctx.font = `${Math.max(13, 13 * dpr)}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('음악 파일을 선택하면 시각 분석이 표시됩니다', width / 2, height / 2);
    ctx.textAlign = 'left';
  });
}

function resetApp() {
  stopPlayback(true);
  clearRenderedUrl();
  state.analysis = null;
  refs.fileInput.value = '';
  renderEmptyState();
}

function clearRenderedUrl() {
  if (state.renderUrl) URL.revokeObjectURL(state.renderUrl);
  state.renderUrl = '';
}

function resetTags(text) {
  Object.values(refs.tags).forEach((tag) => {
    tag.textContent = text;
  });
}

function setBusy(isBusy, message) {
  document.body.classList.toggle('is-busy', isBusy);
  refs.statusText.textContent = message;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  refs.toast.textContent = message;
  refs.toast.hidden = false;
  toastTimer = window.setTimeout(() => {
    refs.toast.hidden = true;
  }, 2600);
}

function getLiveLevel(analysis, time) {
  const windows = analysis.loudness.windows;
  if (!windows.length || !analysis.duration) return 0.16;
  const index = clamp(Math.floor((time / analysis.duration) * windows.length), 0, windows.length - 1);
  return clamp((windows[index].db + 54) / 42, 0.08, 1);
}

function parseAudioTags(arrayBuffer, file) {
  const tags = {
    title: '',
    artist: '',
    album: '',
    genre: '',
    year: '',
    track: '',
    bpm: '',
    key: ''
  };

  if (/\.mp3$/i.test(file.name) || file.type.includes('mpeg')) {
    Object.assign(tags, parseId3(arrayBuffer));
  }

  return tags;
}

function parseId3(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  if (view.byteLength < 10 || readAscii(view, 0, 3) !== 'ID3') return {};

  const version = view.getUint8(3);
  const size = readSyncSafeInt(view, 6);
  let offset = 10;
  const end = Math.min(view.byteLength, 10 + size);
  const tags = {};
  const map = {
    TIT2: 'title',
    TPE1: 'artist',
    TALB: 'album',
    TCON: 'genre',
    TDRC: 'year',
    TYER: 'year',
    TRCK: 'track',
    TBPM: 'bpm',
    TKEY: 'key'
  };

  while (offset + 10 <= end) {
    const id = readAscii(view, offset, 4);
    if (!/^[A-Z0-9]{4}$/.test(id)) break;
    const frameSize = version === 4 ? readSyncSafeInt(view, offset + 4) : view.getUint32(offset + 4);
    if (!frameSize || offset + 10 + frameSize > view.byteLength) break;
    const frameStart = offset + 10;
    const frameEnd = frameStart + frameSize;
    if (map[id]) {
      tags[map[id]] = decodeId3Text(new Uint8Array(arrayBuffer, frameStart, frameSize));
    }
    offset = frameEnd;
  }

  return tags;
}

function decodeId3Text(bytes) {
  if (!bytes.length) return '';
  const encoding = bytes[0];
  const body = bytes.slice(1);
  try {
    if (encoding === 0) return cleanText(new TextDecoder('latin1').decode(body));
    if (encoding === 3) return cleanText(new TextDecoder('utf-8').decode(body));
    if (encoding === 1 || encoding === 2) {
      if (body[0] === 0xff && body[1] === 0xfe) {
        return cleanText(new TextDecoder('utf-16le').decode(body.slice(2)));
      }
      if (body[0] === 0xfe && body[1] === 0xff) {
        return cleanText(decodeUtf16Be(body.slice(2)));
      }
      return cleanText(new TextDecoder('utf-16le').decode(body));
    }
  } catch (error) {
    return '';
  }
  return '';
}

function decodeUtf16Be(bytes) {
  const swapped = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i += 2) {
    swapped[i] = bytes[i + 1] || 0;
    swapped[i + 1] = bytes[i] || 0;
  }
  return new TextDecoder('utf-16le').decode(swapped);
}

function cleanText(text) {
  return text.replace(/\0/g, ' ').replace(/\s+/g, ' ').trim();
}

function readAscii(view, offset, length) {
  let text = '';
  for (let i = 0; i < length; i += 1) {
    text += String.fromCharCode(view.getUint8(offset + i));
  }
  return text;
}

function readSyncSafeInt(view, offset) {
  return (
    (view.getUint8(offset) << 21) |
    (view.getUint8(offset + 1) << 14) |
    (view.getUint8(offset + 2) << 7) |
    view.getUint8(offset + 3)
  );
}

function fft(real, imag) {
  const n = real.length;
  let j = 0;
  for (let i = 1; i < n; i += 1) {
    let bit = n >> 1;
    while (j & bit) {
      j ^= bit;
      bit >>= 1;
    }
    j ^= bit;
    if (i < j) {
      const tempReal = real[i];
      const tempImag = imag[i];
      real[i] = real[j];
      imag[i] = imag[j];
      real[j] = tempReal;
      imag[j] = tempImag;
    }
  }

  for (let length = 2; length <= n; length <<= 1) {
    const angle = -2 * Math.PI / length;
    const wLenReal = Math.cos(angle);
    const wLenImag = Math.sin(angle);
    for (let i = 0; i < n; i += length) {
      let wReal = 1;
      let wImag = 0;
      for (let k = 0; k < length / 2; k += 1) {
        const evenReal = real[i + k];
        const evenImag = imag[i + k];
        const oddReal = real[i + k + length / 2] * wReal - imag[i + k + length / 2] * wImag;
        const oddImag = real[i + k + length / 2] * wImag + imag[i + k + length / 2] * wReal;
        real[i + k] = evenReal + oddReal;
        imag[i + k] = evenImag + oddImag;
        real[i + k + length / 2] = evenReal - oddReal;
        imag[i + k + length / 2] = evenImag - oddImag;

        const nextReal = wReal * wLenReal - wImag * wLenImag;
        wImag = wReal * wLenImag + wImag * wLenReal;
        wReal = nextReal;
      }
    }
  }
}

function hannWindow(size) {
  if (hannWindowCache.has(size)) return hannWindowCache.get(size);
  const window = new Float32Array(size);
  for (let i = 0; i < size; i += 1) {
    window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (size - 1)));
  }
  hannWindowCache.set(size, window);
  return window;
}

function profileScore(chroma, profile, root) {
  let score = 0;
  for (let pc = 0; pc < 12; pc += 1) {
    score += chroma[pc] * profile[(pc - root + 12) % 12];
  }
  return score;
}

function normalizeArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i += 1) sum += array[i];
  if (!sum) return;
  for (let i = 0; i < array.length; i += 1) array[i] /= sum;
}

function smoothArray(values, radius) {
  const smoothed = new Float32Array(values.length);
  for (let i = 0; i < values.length; i += 1) {
    let sum = 0;
    let count = 0;
    for (let offset = -radius; offset <= radius; offset += 1) {
      const index = i + offset;
      if (index >= 0 && index < values.length) {
        sum += values[index];
        count += 1;
      }
    }
    smoothed[i] = sum / Math.max(1, count);
  }
  return smoothed;
}

function percentile(sortedValues, ratio) {
  if (!sortedValues.length) return 0;
  const index = clamp((sortedValues.length - 1) * ratio, 0, sortedValues.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const t = index - lower;
  return sortedValues[lower] * (1 - t) + sortedValues[upper] * t;
}

function ampToDb(value) {
  return 20 * Math.log10(Math.max(value, 1e-9));
}

function dbToGain(db) {
  return Math.pow(10, db / 20);
}

function signedDb(db) {
  const rounded = Math.abs(db) < 0.05 ? 0 : db;
  return `${rounded >= 0 ? '+' : ''}${rounded.toFixed(1)} dB`;
}

function average(values) {
  if (!values.length) return 0;
  let sum = 0;
  for (let i = 0; i < values.length; i += 1) sum += values[i];
  return sum / values.length;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function debounce(fn, delay) {
  let timer = 0;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '--:--';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60).toString().padStart(2, '0');
  return hours ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs}` : `${minutes}:${secs}`;
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function formatHz(value) {
  if (!Number.isFinite(value) || value <= 0) return '-- Hz';
  return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)} kHz` : `${Math.round(value)} Hz`;
}

function formatNumber(value) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(value));
}

function stripExtension(name) {
  return name.replace(/\.[^/.]+$/, '');
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}
