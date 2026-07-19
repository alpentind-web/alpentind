const planningEnvironmentState = {
  projectId: null,
  projectTitle: '',
  area: null,
  questionStatus: {},
};

function getPlanningProject(projectId) {
  const projects = (mockData && mockData.planningProjects) || [];
  return projects.find(project => project.id === projectId) || null;
}

function buildQuestionStatus(areaTemplate, projectAreaState) {
  const result = {};
  const projectQuestions = (projectAreaState && projectAreaState.questions) || {};

  areaTemplate.questions.forEach(question => {
    result[question.id] = projectQuestions[question.id] === 'answered' ? 'answered' : 'unanswered';
  });

  return result;
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

  if (!area) return;

  planningEnvironmentState.projectId = projectId;
  planningEnvironmentState.projectTitle = project ? project.title : 'Nytt planeringsuppdrag';
  planningEnvironmentState.area = area;
  planningEnvironmentState.questionStatus = buildQuestionStatus(area, projectAreaState);

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

function togglePlanningQuestion(questionId) {
  const currentValue = planningEnvironmentState.questionStatus[questionId];
  planningEnvironmentState.questionStatus[questionId] = currentValue === 'answered' ? 'unanswered' : 'answered';
  renderPlanningArea();
}
