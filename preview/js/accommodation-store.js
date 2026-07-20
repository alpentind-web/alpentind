/* ========================================
   AlpenTind Platform Preview
   Accommodation Store – Local Persistence Layer (ESR-009 Stage 1)

   API-replaceable boundary:
     getAccommodationStore() and saveAccommodationStore()
     can be swapped for fetch() calls when a backend is available.
     All callers use the public functions below – no direct localStorage
     references exist outside this file.

   Public API:
     getAccommodationStoreRegisterData()           → { regions: [...] }
     getAccommodationWorkspaceDetailData(id)        → detail object | null
     getRegionBySlugFromStore(slug)                 → region | null
     getAccommodationFromStore(regionSlug, id)      → { region, accommodation } | null
     createAccommodationInStore(formData)           → { region, accommodation }
     updateAccommodationInStore(regionSlug, id, formData) → boolean
   ======================================== */

var ACCOMMODATION_STORE_KEY = 'alpentind-accommodation-store';

// ----------------------------------------
// Persistence boundary (replace these two
// functions when connecting to an API)
// ----------------------------------------

function getAccommodationStore() {
  var raw = typeof localStorage !== 'undefined'
    ? localStorage.getItem(ACCOMMODATION_STORE_KEY)
    : null;
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { /* fall through */ }
  }
  return { regions: [], workspaceData: {} };
}

function saveAccommodationStore(store) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(ACCOMMODATION_STORE_KEY, JSON.stringify(store));
  }
}

// ----------------------------------------
// Read helpers
// ----------------------------------------

function getAccommodationStoreRegisterData() {
  var store = getAccommodationStore();
  return { regions: store.regions || [] };
}

function getAccommodationWorkspaceDetailData(accommodationId) {
  var store = getAccommodationStore();
  return (store.workspaceData && store.workspaceData[accommodationId]) || null;
}

function getRegionBySlugFromStore(slug) {
  var store = getAccommodationStore();
  return (store.regions || []).find(function(r) { return r.slug === slug; }) || null;
}

function getAccommodationFromStore(regionSlug, accommodationId) {
  var region = getRegionBySlugFromStore(regionSlug);
  if (!region) return null;
  var accommodation = (region.accommodations || []).find(function(a) {
    return a.id === accommodationId;
  });
  return accommodation ? { region: region, accommodation: accommodation } : null;
}

// ----------------------------------------
// Write helpers
// ----------------------------------------

function slugify(text) {
  return String(text || '')
    .toLocaleLowerCase('sv-SE')
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateAccommodationId(name) {
  return slugify(name) + '-' + Date.now().toString(36);
}

function buildWorkspaceDetailFromForm(formData, history) {
  var totalBeds = formData.capacityTotalBeds !== '' && formData.capacityTotalBeds != null
    ? Number(formData.capacityTotalBeds)
    : null;
  var groupMax = formData.capacityGroupMaximum !== '' && formData.capacityGroupMaximum != null
    ? Number(formData.capacityGroupMaximum)
    : null;

  return {
    status:   String(formData.status   || 'Aktiv').trim(),
    purpose:  String(formData.purpose  || '').trim(),
    workItems: [],
    contact: {
      name:     String(formData.contactName     || '').trim(),
      phone:    String(formData.contactPhone    || '').trim(),
      email:    String(formData.contactEmail    || '').trim(),
      language: String(formData.contactLanguage || '').trim(),
    },
    pricing: {
      halfBoard:     String(formData.pricingHalfBoard     || '').trim(),
      fullBoard:     String(formData.pricingFullBoard     || '').trim(),
      groupDiscount: String(formData.pricingGroupDiscount || '').trim(),
      notes:         String(formData.pricingNotes         || '').trim(),
    },
    capacity: {
      totalBeds:    totalBeds,
      groupMaximum: groupMax,
      roomTypes:    String(formData.capacityRoomTypes || '').trim(),
    },
    season: {
      openPeriod: String(formData.seasonOpenPeriod || '').trim(),
      peakPeriod: String(formData.seasonPeakPeriod || '').trim(),
    },
    notes:     String(formData.notes     || '').trim(),
    documents: [],
    history:   history || [],
  };
}

function createAccommodationInStore(formData) {
  var store = getAccommodationStore();
  if (!store.regions)      store.regions      = [];
  if (!store.workspaceData) store.workspaceData = {};

  var regionName = String(formData.region || '').trim();
  var regionSlug = slugify(regionName);
  var region     = store.regions.find(function(r) { return r.slug === regionSlug; });
  if (!region) {
    region = { slug: regionSlug, name: regionName, accommodations: [] };
    store.regions.push(region);
  }

  var id = generateAccommodationId(formData.name);
  var accommodation = {
    id:        id,
    name:      String(formData.name      || '').trim(),
    type:      String(formData.type      || '').trim(),
    place:     String(formData.place     || '').trim(),
    readiness: String(formData.readiness || 'Ny').trim(),
  };
  region.accommodations.push(accommodation);

  store.workspaceData[id] = buildWorkspaceDetailFromForm(formData, [
    { date: new Date().toISOString().slice(0, 10), text: 'Boende registrerat i AlpenTind.' },
  ]);

  saveAccommodationStore(store);
  return { region: region, accommodation: accommodation };
}

function updateAccommodationInStore(regionSlug, accommodationId, formData) {
  var store = getAccommodationStore();
  if (!store.regions)       return false;
  if (!store.workspaceData) store.workspaceData = {};

  var region = store.regions.find(function(r) { return r.slug === regionSlug; });
  if (!region) return false;

  var accIdx = (region.accommodations || []).findIndex(function(a) {
    return a.id === accommodationId;
  });
  if (accIdx === -1) return false;

  region.accommodations[accIdx] = Object.assign(region.accommodations[accIdx], {
    name:      String(formData.name      || '').trim(),
    type:      String(formData.type      || '').trim(),
    place:     String(formData.place     || '').trim(),
    readiness: String(formData.readiness || region.accommodations[accIdx].readiness).trim(),
  });

  var existingDetail  = store.workspaceData[accommodationId] || {};
  var existingHistory = existingDetail.history || [];
  var updatedHistory  = [
    { date: new Date().toISOString().slice(0, 10), text: 'Boendeinformation uppdaterad.' },
  ].concat(existingHistory);

  store.workspaceData[accommodationId] = buildWorkspaceDetailFromForm(formData, updatedHistory);

  saveAccommodationStore(store);
  return true;
}
