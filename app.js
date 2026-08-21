(function () {
  const STORAGE_KEY = 'diat_robotics_sem1_tracker_v2';
  let state;
  let activeCourse;
  let saveTimer;

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function defaultState() {
    return {
      activeCourse: SYLLABUS_COURSES[0].code,
      done: {},
      notes: {},
      opened: {},
      subtopics: {},
      unitNotes: {},
      practice: { topics: [] },
      reminders: [],
      lastSaved: null
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...defaultState(), ...parsed };
      }
    } catch (e) {}
    return defaultState();
  }

  function saveState() {
    state.lastSaved = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSaveState();
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 300);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>'"]/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[m]));
  }

  function topicKey(courseCode, unitIndex, topicIndex) {
    return `${courseCode}|u${unitIndex}|t${topicIndex}`;
  }

  function unitKey(courseCode, unitIndex) {
    return `${courseCode}|u${unitIndex}`;
  }

  function currentCourse() {
    return SYLLABUS_COURSES.find(c => c.code === activeCourse) || SYLLABUS_COURSES[0];
  }

  function courseStats(course) {
    let total = 0, done = 0;
    course.units.forEach((u, ui) => u.topics.forEach((t, ti) => {
      total++;
      if (state.done[topicKey(course.code, ui, ti)]) done++;
    }));
    return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
  }

  function findPracticeTopic(id) {
    return (state.practice.topics || []).find(t => t.id === id);
  }

  function isDueSoon(dateStr) {
    if (!dateStr) return false;
    const due = new Date(dateStr + 'T23:59:59');
    const now = new Date();
    const diff = due - now;
    return diff >= 0 && diff <= 2 * 24 * 60 * 60 * 1000;
  }

  function updateSaveState() {
    const el = document.getElementById('saveState');
    if (state.lastSaved) {
      el.textContent = 'Saved automatically: ' + new Date(state.lastSaved).toLocaleString();
    } else {
      el.textContent = 'Progress is saved automatically in this browser.';
    }
  }

  function renderSidebar() {
    const el = document.getElementById('courseList');
    if (!el) return;
    el.innerHTML = '';
    SYLLABUS_COURSES.forEach(c => {
      const s = courseStats(c);
      const btn = document.createElement('button');
      btn.className = 'course-btn' + (c.code === activeCourse ? ' active' : '');
      btn.setAttribute('data-action', 'course');
      btn.setAttribute('data-key', c.code);
      btn.innerHTML = `
        <div class="course-code">${c.code}</div>
        <div class="course-name">${c.name}</div>
        <div class="course-meta">${s.done}/${s.total} topics · ${s.pct}%</div>
        <div class="course-mini"><div style="width:${s.pct}%"></div></div>
      `;
      el.appendChild(btn);
    });
  }

  function renderCourseHeader(course) {
    const el = document.getElementById('courseHeader');
    if (!el) return;
    const s = courseStats(course);
    el.innerHTML = `
      <h2>${course.code} — ${course.name}</h2>
      <p>${course.credits} credits · ${s.done}/${s.total} topics completed</p>
      <div class="progress" style="margin-top:12px"><div style="width:${s.pct}%"></div></div>
      <div class="sequence">${course.sequence.map((x, i) => `<span class="seq-chip">${i + 1}. ${escapeHtml(x)}</span>`).join('')}</div>
    `;
  }

  function renderUnits(course) {
    const container = document.getElementById('units');
    if (!container) return;
    container.innerHTML = '';

    course.units.forEach((u, ui) => {
      const key = unitKey(course.code, ui);
      const doneCount = u.topics.reduce((n, t, ti) => n + (state.done[topicKey(course.code, ui, ti)] ? 1 : 0), 0);
      const isOpen = state.opened[key] !== false;

      const topicsHtml = u.topics.map((t, ti) => {
        const k = topicKey(course.code, ui, ti);
        const done = !!state.done[k];
        const note = state.notes[k] || '';
        const practiceOpen = !!state.opened[k + ':practice'];
        const basicsOpen = !!state.opened[k + ':basics'];
        const subs = state.subtopics[k] || [];

        const subHtml = subs.map(s => `
          <div class="subtopic-item ${s.done ? 'done' : ''}">
            <input type="checkbox" data-action="toggle-subtopic" data-key="${k}" data-subid="${s.id}" ${s.done ? 'checked' : ''} />
            <span>${escapeHtml(s.text)}</span>
            <button class="mini-btn" type="button" data-action="delete-subtopic" data-key="${k}" data-subid="${s.id}">✕</button>
          </div>
        `).join('');

        return `
          <div class="topic ${done ? 'done' : ''}">
            <input type="checkbox" data-action="toggle-topic" data-key="${k}" ${done ? 'checked' : ''} aria-label="Mark complete" />
            <div class="topic-main">
              <div class="topic-title">${escapeHtml(t[0])}</div>
              <div class="topic-detail">${escapeHtml(t[1])}</div>
              <div class="practice ${practiceOpen ? 'open' : ''}">
                <div class="practice-row">
                  <span>Practice / derivation / problem notes</span>
                  <button class="mini-btn" type="button" data-action="close-practice" data-key="${k}">Close</button>
                </div>
                <textarea data-field="topic-note" data-key="${k}" placeholder="Record solved problems, derivations, mistakes, formulas rebuilt from first principles, or implementation notes.">${escapeHtml(note)}</textarea>
              </div>
              <div class="subtopic-panel ${basicsOpen ? 'open' : ''}">
                <div class="practice-row">
                  <span>Prerequisites / basics / custom sub-topics</span>
                  <button class="mini-btn" type="button" data-action="close-basics" data-key="${k}">Close</button>
                </div>
                <div class="subtopic-list">${subHtml}</div>
                <div class="subtopic-add-row">
                  <input type="text" class="subtopic-input" placeholder="Add prerequisite or basic sub-topic" />
                  <button class="mini-btn" type="button" data-action="add-subtopic" data-key="${k}">Add</button>
                </div>
              </div>
            </div>
            <div class="topic-tools">
              <button class="mini-btn" type="button" data-action="toggle-practice" data-key="${k}">Practice</button>
              <button class="mini-btn" type="button" data-action="toggle-basics" data-key="${k}">Basics +</button>
            </div>
          </div>
        `;
      }).join('');

      const unitNote = state.unitNotes[key] || '';

      const box = document.createElement('section');
      box.className = 'unit' + (isOpen ? '' : ' collapsed');
      box.innerHTML = `
        <div class="unit-head" data-action="unit-toggle" data-key="${key}">
          <h3>${escapeHtml(u.title)}</h3>
          <div class="unit-progress">${doneCount}/${u.topics.length} · ${Math.round(doneCount / u.topics.length * 100)}%</div>
        </div>
        ${topicsHtml}
        <div class="unit-notes">
          <div class="unit-notes-head"><strong>Unit notes / reminders</strong></div>
          <textarea data-field="unit-note" data-key="${key}" placeholder="Add anything: assignments, daily exercises, reminders, doubts, links, study notes...">${escapeHtml(unitNote)}</textarea>
        </div>
      `;
      container.appendChild(box);
    });
  }

  function renderStats() {
    let total = 0, done = 0, notes = 0;
    SYLLABUS_COURSES.forEach(c => {
      const s = courseStats(c);
      total += s.total;
      done += s.done;
    });
    notes = Object.values(state.notes).filter(x => String(x).trim()).length;
    const pct = total ? Math.round(done / total * 100) : 0;

    const overallBar = document.getElementById('overallBar');
    const overallPct = document.getElementById('overallPct');
    const doneCount = document.getElementById('doneCount');
    const totalCount = document.getElementById('totalCount');
    const practiceCount = document.getElementById('practiceCount');
    const reminderCount = document.getElementById('reminderCount');

    if (overallBar) overallBar.style.width = pct + '%';
    if (overallPct) overallPct.textContent = pct + '%';
    if (doneCount) doneCount.textContent = done;
    if (totalCount) totalCount.textContent = total;
    if (practiceCount) practiceCount.textContent = notes;
    if (reminderCount) reminderCount.textContent = state.reminders.filter(r => !r.done).length;
    updateSaveState();
  }

  function renderPracticeTopics() {
    const container = document.getElementById('practiceContent');
    if (!container) return;
    const topics = state.practice.topics || [];

    container.innerHTML = `
      <div class="practice-form">
        <input type="text" id="practiceTopicInput" placeholder="Add technical practice topic" />
        <button class="primary" type="button" data-action="add-practice-topic">Add topic</button>
      </div>

      <div class="practice-list">
        ${topics.map(t => {
          const subs = t.subtopics || [];
          return `
            <div class="practice-topic ${t.done ? 'done' : ''}">
              <div class="practice-topic-head">
                <input type="checkbox" data-action="toggle-practice-topic" data-id="${t.id}" ${t.done ? 'checked' : ''} />
                <strong>${escapeHtml(t.title)}</strong>
                <button class="mini-btn danger" type="button" data-action="delete-practice-topic" data-id="${t.id}">Delete</button>
              </div>
              <div class="practice-subtopics">
                ${subs.map(s => `
                  <div class="subtopic-item ${s.done ? 'done' : ''}">
                    <input type="checkbox" data-action="toggle-practice-subtopic" data-id="${t.id}" data-subid="${s.id}" ${s.done ? 'checked' : ''} />
                    <span>${escapeHtml(s.text)}</span>
                    <button class="mini-btn" type="button" data-action="delete-practice-subtopic" data-id="${t.id}" data-subid="${s.id}">✕</button>
                  </div>
                `).join('')}
              </div>
              <div class="practice-add-sub">
                <input type="text" class="practice-subtopic-input" placeholder="Add sub-topic / exercise" />
                <button class="mini-btn" type="button" data-action="add-practice-subtopic" data-id="${t.id}">Add</button>
              </div>
              <div class="practice-topic-footer">
                <input type="date" data-field="practice-date" data-id="${t.id}" value="${escapeHtml(t.reminderDate || '')}" title="Reminder date" />
                <textarea data-field="practice-note" data-id="${t.id}" placeholder="Notes / progress log">${escapeHtml(t.note || '')}</textarea>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderReminders() {
    const container = document.getElementById('remindersContent');
    if (!container) return;

    container.innerHTML = `
      <div class="reminder-form">
        <input type="text" id="reminderText" placeholder="Reminder text" />
        <input type="date" id="reminderDate" />
        <select id="reminderCourse">
          <option value="">Course</option>
          ${SYLLABUS_COURSES.map(c => `<option>${c.code}</option>`).join('')}
        </select>
        <input type="text" id="reminderUnit" placeholder="Unit (optional)" />
        <button class="primary" type="button" data-action="add-reminder">Add reminder</button>
      </div>
      <div class="reminder-list">
        ${state.reminders.map(r => `
          <div class="reminder-item ${r.done ? 'done' : ''} ${isDueSoon(r.dueDate) ? 'due-soon' : ''}">
            <input type="checkbox" data-action="toggle-reminder" data-id="${r.id}" ${r.done ? 'checked' : ''} />
            <div class="reminder-text">${escapeHtml(r.text)}</div>
            <div class="reminder-meta">${escapeHtml(r.course || '')} ${escapeHtml(r.unit || '')} ${escapeHtml(r.dueDate || '')}</div>
            <button class="mini-btn" type="button" data-action="delete-reminder" data-id="${r.id}">✕</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderAll() {
    renderSidebar();
    const course = currentCourse();
    renderCourseHeader(course);
    renderUnits(course);
    renderStats();
    renderPracticeTopics();
    renderReminders();
  }

  function togglePracticeTopic(topicId, checked) {
    const t = findPracticeTopic(topicId);
    if (t) t.done = checked;
  }

  function togglePracticeSubtopic(topicId, subId, checked) {
    const t = findPracticeTopic(topicId);
    if (!t) return;
    const s = (t.subtopics || []).find(x => x.id === subId);
    if (s) s.done = checked;
  }

  function deletePracticeSubtopic(topicId, subId) {
    const t = findPracticeTopic(topicId);
    if (!t) return;
    t.subtopics = (t.subtopics || []).filter(x => x.id !== subId);
  }

  function handleClick(e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;

    const action = el.dataset.action;
    const key = el.dataset.key;
    const id = el.dataset.id;
    const subid = el.dataset.subid;

    switch (action) {
      case 'course':
        activeCourse = key;
        state.activeCourse = activeCourse;
        saveState();
        renderSidebar();
        renderCourseHeader(currentCourse());
        renderUnits(currentCourse());
        break;

      case 'toggle-topic':
        state.done[key] = !!el.checked;
        saveState();
        renderStats();
        renderSidebar();
        renderCourseHeader(currentCourse());
        renderUnits(currentCourse());
        break;

      case 'toggle-practice':
        state.opened[key + ':practice'] = !state.opened[key + ':practice'];
        saveState();
        renderUnits(currentCourse());
        break;

      case 'close-practice':
        state.opened[key + ':practice'] = false;
        saveState();
        renderUnits(currentCourse());
        break;

      case 'toggle-basics':
        state.opened[key + ':basics'] = !state.opened[key + ':basics'];
        saveState();
        renderUnits(currentCourse());
        break;

      case 'close-basics':
        state.opened[key + ':basics'] = false;
        saveState();
        renderUnits(currentCourse());
        break;

      case 'add-subtopic': {
        const input = el.parentElement.querySelector('.subtopic-input');
        const text = input ? input.value.trim() : '';
        if (text) {
          state.subtopics[key] = state.subtopics[key] || [];
          state.subtopics[key].push({ id: uid(), text, done: false });
          saveState();
          renderUnits(currentCourse());
        }
        break;
      }

      case 'toggle-subtopic': {
        const arr = state.subtopics[key] || [];
        const s = arr.find(x => x.id === subid);
        if (s) {
          s.done = !!el.checked;
          saveState();
          renderUnits(currentCourse());
        }
        break;
      }

      case 'delete-subtopic':
        state.subtopics[key] = (state.subtopics[key] || []).filter(x => x.id !== subid);
        saveState();
        renderUnits(currentCourse());
        break;

      case 'unit-toggle':
        state.opened[key] = state.opened[key] === false;
        saveState();
        renderUnits(currentCourse());
        break;

      case 'add-practice-topic': {
        const input = document.getElementById('practiceTopicInput');
        const title = input ? input.value.trim() : '';
        if (title) {
          state.practice.topics.push({
            id: uid(),
            title,
            subtopics: [],
            done: false,
            note: '',
            reminderDate: ''
          });
          saveState();
          renderPracticeTopics();
        }
        break;
      }

      case 'toggle-practice-topic':
        togglePracticeTopic(id, !!el.checked);
        saveState();
        renderPracticeTopics();
        break;

      case 'delete-practice-topic':
        state.practice.topics = state.practice.topics.filter(t => t.id !== id);
        saveState();
        renderPracticeTopics();
        break;

      case 'add-practice-subtopic': {
        const t = findPracticeTopic(id);
        if (t) {
          const input = el.parentElement.querySelector('.practice-subtopic-input');
          const text = input ? input.value.trim() : '';
          if (text) {
            t.subtopics = t.subtopics || [];
            t.subtopics.push({ id: uid(), text, done: false });
            saveState();
            renderPracticeTopics();
          }
        }
        break;
      }

      case 'toggle-practice-subtopic':
        togglePracticeSubtopic(id, subid, !!el.checked);
        saveState();
        renderPracticeTopics();
        break;

      case 'delete-practice-subtopic':
        deletePracticeSubtopic(id, subid);
        saveState();
        renderPracticeTopics();
        break;

      case 'add-reminder': {
        const textInput = document.getElementById('reminderText');
        const dateInput = document.getElementById('reminderDate');
        const courseInput = document.getElementById('reminderCourse');
        const unitInput = document.getElementById('reminderUnit');
        const text = textInput ? textInput.value.trim() : '';
        if (text) {
          state.reminders.push({
            id: uid(),
            text,
            course: courseInput ? courseInput.value : '',
            unit: unitInput ? unitInput.value.trim() : '',
            dueDate: dateInput ? dateInput.value : '',
            done: false
          });
          saveState();
          renderReminders();
          renderStats();
        }
        break;
      }

      case 'toggle-reminder': {
        const r = state.reminders.find(x => x.id === id);
        if (r) {
          r.done = !!el.checked;
          saveState();
          renderReminders();
          renderStats();
        }
        break;
      }

      case 'delete-reminder':
        state.reminders = state.reminders.filter(x => x.id !== id);
        saveState();
        renderReminders();
        renderStats();
        break;
    }
  }

  function handleInput(e) {
    const el = e.target;

    if (el.matches('[data-field="topic-note"]')) {
      state.notes[el.dataset.key] = el.value;
      scheduleSave();
    } else if (el.matches('[data-field="unit-note"]')) {
      state.unitNotes[el.dataset.key] = el.value;
      scheduleSave();
    } else if (el.matches('[data-field="practice-note"]')) {
      const t = findPracticeTopic(el.dataset.id);
      if (t) {
        t.note = el.value;
        scheduleSave();
      }
    } else if (el.matches('[data-field="practice-date"]')) {
      const t = findPracticeTopic(el.dataset.id);
      if (t) {
        t.reminderDate = el.value;
        scheduleSave();
      }
    }
  }

  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(section => {
      section.classList.toggle('active', section.id === 'tab-' + tabId);
    });
  }

  function collapseAll() {
    SYLLABUS_COURSES.forEach(c => {
      c.units.forEach((u, ui) => {
        state.opened[unitKey(c.code, ui)] = false;
      });
    });
    saveState();
    renderUnits(currentCourse());
  }

  function exportData() {
    const payload = {
      app: 'DIAT Robotics Semester 1 Tracker',
      version: 2,
      exportedAt: new Date().toISOString(),
      state
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'diat_robotics_sem1_progress.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importData(ev) {
    const file = ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const p = JSON.parse(reader.result);
        if (!p.state) throw new Error('Invalid file');
        state = { ...defaultState(), ...p.state };
        if (!SYLLABUS_COURSES.some(c => c.code === state.activeCourse)) {
          state.activeCourse = SYLLABUS_COURSES[0].code;
        }
        activeCourse = state.activeCourse;
        saveState();
        renderAll();
        alert('Progress imported.');
      } catch (e) {
        alert('Could not import this file.');
      }
    };
    reader.readAsText(file);
  }

  function resetData() {
    if (!confirm('Reset all semester progress, notes, basics and technical practice in this browser?')) return;
    state = defaultState();
    activeCourse = state.activeCourse;
    saveState();
    renderAll();
  }

  function init() {
    state = loadState();
    if (!SYLLABUS_COURSES.some(c => c.code === state.activeCourse)) {
      state.activeCourse = SYLLABUS_COURSES[0].code;
    }
    activeCourse = state.activeCourse;

    document.addEventListener('click', handleClick);
    document.addEventListener('input', handleInput);

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importFile').addEventListener('change', importData);
    document.getElementById('collapseAllBtn').addEventListener('click', collapseAll);
    document.getElementById('resetBtn').addEventListener('click', resetData);

    renderAll();
  }

  init();
})();