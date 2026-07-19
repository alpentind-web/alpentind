const planningEnvironmentState = {
  projectId: null,
  projectTitle: '',
  area: null,
  questionStatus: {},
  selectedAccommodationRefs: [],
};

function getPlanningProject(projectId) {
  const projects = (mockData && mockData.planningProjects) || [];
  return projects.find(project => project.id === projectId) || null;
}

function getAccommodationRegisterData() {
  return (mockData && mockData.accommodationRegister) || { regions: [] };
}

function buildQuestionStatus(areaTemplate, projectAreaState, selectionState) {
  const result = {};
  const projectQuestions = (projectAreaState && projectAreaState.questions) || {};
  const selectionQuestions = (selectionState && selectionState.questionStatus) || {};

  areaTemplate.questions.forEach(question => {
    const sourceValue = selectionQuestions[question.id] || projectQuestions[question.id];
    result[question.id] = sourceValue === 'answered' ? 'answered' : 'unanswered';
  });

  return result;
}

function getSelectedAccommodationRefs(projectAreaState, selectionState) {
  const sourceRefs = (selectionState && selectionState.selectedAccommodationRefs)
    || (projectAreaState && projectAreaState.selectedAccommodationRefs)
    || [];

  return sourceRefs.map(function(reference) {
    return Object.assign({}, reference);
  });
}

function resolveAccommodationReference(reference) {
  const regions = getAccommodationRegisterData().regions || [];
  const region = regions.find(function(regionItem) {
    if (reference && reference.regionSlug) {
      return regionItem.slug === reference.regionSlug;
    }

    return (regionItem.accommodations || []).some(function(accommodation) {
      return accommodation.id === (reference && reference.objectId);
    });
  }) || null;

  const accommodation = ((region && region.accommodations) || []).find(function(accommodationItem) {
    return accommodationItem.id === (reference && reference.objectId);
  }) || null;

  return region && accommodation ? { region, accommodation } : null;
}

function getUnansweredQuestions(area, questionStatus) {
  return area.questions.filter(question => questionStatus[question.id] !== 'answered');
}

function getCurrentSituationLabel(area, questionStatus) {
  const unansweredQuestions = getUnansweredQuestions(area, questionStatus);
  if (unansweredQuestions.length === 0) return area.title + ' complete';
  if (unansweredQuestions.length === 1) return '1 fråga återstår';
  return unansweredQuestions.length + ' frågor återstår';
}

function renderPlanningProjectEnvironment(projectId) {
  const project = getPlanningProject(projectId);
  const area = (mockData && mockData.planningAreaTemplates && mockData.planningAreaTemplates.accommodation) || null;
  const projectAreaState = project && project.planningAreas ? project.planningAreas.accommodation : null;
  const selectionState = typeof getSelectionStateFromUrl === 'function' ? getSelectionStateFromUrl() : null;

  if (!area) return;

  planningEnvironmentState.projectId = projectId;
  planningEnvironmentState.projectTitle = project ? project.title : 'Nytt planeringsuppdrag';
  planningEnvironmentState.area = area;
  planningEnvironmentState.questionStatus = buildQuestionStatus(area, projectAreaState, selectionState);
  planningEnvironmentState.selectedAccommodationRefs = getSelectedAccommodationRefs(projectAreaState, selectionState);

  renderPlanningProjectHeader();
  renderPlanningArea();
}

function renderPlanningProjectHeader() {
  const titleElement = document.getElementById('planning-project-title');
  const subtitleElement = document.getElementById('planning-project-subtitle');

  if (titleElement) {
    titleElement.textContent = planningEnvironmentState.projectTitle;
  }

  if (subtitleElement) {
    subtitleElement.textContent = 'Pågående planering · ' + planningEnvironmentState.projectId;
  }
}

function renderPlanningArea() {
  const area = planningEnvironmentState.area;
  const container = document.getElementById('planning-area-root');
  if (!area || !container) return;

  const unansweredQuestions = getUnansweredQuestions(area, planningEnvironmentState.questionStatus);
  const currentSituation = getCurrentSituationLabel(area, planningEnvironmentState.questionStatus);
  const blockerItems = unansweredQuestions.map(question => '<li>' + question.blocker + '</li>').join('');
  const selectedAccommodationItems = planningEnvironmentState.selectedAccommodationRefs
    .map(renderSelectedAccommodationReference)
    .join('');

  const purposeSection = `
    <article class="card planning-area-card" aria-labelledby="planning-purpose-heading">
      <div class="card-header">
        <h3 id="planning-purpose-heading">Purpose</h3>
      </div>
      <div class="card-body">
        <p class="planning-area-purpose">${area.purpose}</p>
      </div>
    </article>
  `;

  const questionsSection = `
    <article class="card planning-area-card" aria-labelledby="planning-questions-heading">
      <div class="card-header">
        <h3 id="planning-questions-heading">Planning Questions</h3>
      </div>
      <div class="card-body">
        <ul class="planning-question-list">
          ${area.questions.map(question => renderPlanningQuestion(question)).join('')}
        </ul>
      </div>
    </article>
  `;

  const selectedAccommodationSection = `
    <article class="card planning-area-card" aria-labelledby="selected-accommodation-heading">
      <div class="card-header">
        <h3 id="selected-accommodation-heading">Selected Accommodation</h3>
        <span class="badge ${planningEnvironmentState.selectedAccommodationRefs.length > 0 ? 'badge-success' : 'badge-warning'}">
          ${planningEnvironmentState.selectedAccommodationRefs.length > 0 ? planningEnvironmentState.selectedAccommodationRefs.length + ' referenser' : 'Inga valda referenser'}
        </span>
      </div>
      <div class="card-body">
        <p class="text-sm text-muted">Planning references register objects. Accommodation Register remains source of truth.</p>
        ${selectedAccommodationItems ? `<ul class="planning-selection-list">${selectedAccommodationItems}</ul>` : '<p class="planning-selection-empty">Inga boendereferenser har valts ännu.</p>'}
        <div class="planning-selection-actions">
          <button class="btn btn-primary" type="button" onclick="openAccommodationSelection()">Select Accommodation</button>
        </div>
      </div>
    </article>
  `;

  const currentSituationSection = `
    <article class="card planning-area-card" aria-labelledby="planning-status-heading">
      <div class="card-header">
        <h3 id="planning-status-heading">Current Situation</h3>
        <span class="badge ${unansweredQuestions.length === 0 ? 'badge-success' : 'badge-warning'}">${currentSituation}</span>
      </div>
      <div class="card-body">
        <p class="text-sm text-muted">
          ${unansweredQuestions.length === 0 ? 'Inga återstående osäkerheter i Accommodation just nu.' : 'Readiness blockeras av kvarvarande osäkerheter i Accommodation.'}
        </p>
        ${unansweredQuestions.length === 0 ? '' : `
          <div class="planning-blockers" aria-live="polite">
            <p class="planning-blockers-title">Vad blockerar readiness</p>
            <ul>${blockerItems}</ul>
          </div>
        `}
      </div>
    </article>
  `;

  const dependenciesSection = `
    <article class="card planning-area-card" aria-labelledby="planning-dependencies-heading">
      <div class="card-header">
        <h3 id="planning-dependencies-heading">Dependencies</h3>
      </div>
      <div class="card-body">
        <p class="text-sm text-muted">Visar påverkan mellan områden. Ingen tvingad ordning.</p>
        <ul class="planning-dependency-list">
          ${area.dependencies.map(function(dependency) {
            return '<li><strong>Accommodation</strong> → <strong>' + dependency.area + '</strong><span>' + dependency.note + '</span></li>';
          }).join('')}
        </ul>
      </div>
    </article>
  `;

  container.innerHTML = `
    <section class="planning-area-layout" aria-label="Accommodation Planning Area">
      ${purposeSection}
      ${selectedAccommodationSection}
      ${questionsSection}
      ${currentSituationSection}
      ${dependenciesSection}
    </section>
  `;

  if (typeof feather !== 'undefined') feather.replace();
}

function renderPlanningQuestion(question) {
  const questionStatus = planningEnvironmentState.questionStatus[question.id];
  const isAnswered = questionStatus === 'answered';

  return `
    <li class="planning-question-item ${isAnswered ? 'is-answered' : 'is-unanswered'}">
      <div class="planning-question-content">
        <p class="planning-question-text">${question.text}</p>
        <p class="planning-question-unknown">${isAnswered ? 'Ingen kvarvarande osäkerhet i denna fråga.' : question.unknownState}</p>
      </div>
      <div class="planning-question-actions">
        <span class="badge ${isAnswered ? 'badge-success' : 'badge-warning'}">${isAnswered ? 'Klar' : 'Öppen fråga'}</span>
        <button class="btn btn-sm btn-secondary" type="button" onclick="togglePlanningQuestion('${question.id}')">
          ${isAnswered ? 'Markera som oklar' : 'Markera som klar'}
        </button>
      </div>
    </li>
  `;
}

function renderSelectedAccommodationReference(reference) {
  const resolvedReference = resolveAccommodationReference(reference);

  if (!resolvedReference) {
    return `
      <li class="planning-selection-item">
        <div>
          <p class="planning-selection-title">Okänd referens</p>
          <p class="planning-selection-context">Accommodation reference kunde inte lösas från registret.</p>
        </div>
      </li>
    `;
  }

  return `
    <li class="planning-selection-item">
      <div>
        <p class="planning-selection-title">${typeof escapePreviewHtml === 'function' ? escapePreviewHtml(resolvedReference.accommodation.name) : resolvedReference.accommodation.name}</p>
        <p class="planning-selection-context">${typeof escapePreviewHtml === 'function' ? escapePreviewHtml(resolvedReference.region.name) : resolvedReference.region.name} · ${typeof escapePreviewHtml === 'function' ? escapePreviewHtml(resolvedReference.accommodation.type) : resolvedReference.accommodation.type} · ${typeof escapePreviewHtml === 'function' ? escapePreviewHtml(resolvedReference.accommodation.place) : resolvedReference.accommodation.place}</p>
      </div>
      <span class="planning-selection-status">${typeof escapePreviewHtml === 'function' ? escapePreviewHtml(resolvedReference.accommodation.readiness) : resolvedReference.accommodation.readiness}</span>
    </li>
  `;
}

function togglePlanningQuestion(questionId) {
  const currentValue = planningEnvironmentState.questionStatus[questionId];
  planningEnvironmentState.questionStatus[questionId] = currentValue === 'answered' ? 'unanswered' : 'answered';
  renderPlanningArea();
}

function openAccommodationSelection() {
  const selectionContext = {
    returnTo: 'planering-projekt.html',
    returnLabel: 'Return to Planning',
    source: {
      type: 'planning-area',
      label: planningEnvironmentState.projectTitle,
      areaId: planningEnvironmentState.area ? planningEnvironmentState.area.id : 'accommodation',
      areaLabel: planningEnvironmentState.area ? planningEnvironmentState.area.title : 'Accommodation',
    },
    state: {
      projectId: planningEnvironmentState.projectId,
      questionStatus: planningEnvironmentState.questionStatus,
      selectedAccommodationRefs: planningEnvironmentState.selectedAccommodationRefs,
    },
  };

  const href = typeof buildRegisterSelectionUrl === 'function'
    ? buildRegisterSelectionUrl('accommodations.html', selectionContext)
    : 'accommodations.html?mode=select';

  window.location.href = href;
}
