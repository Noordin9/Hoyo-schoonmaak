document.addEventListener('DOMContentLoaded', function () {
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isDesktop) return;
  document.querySelectorAll('.offerte-form select').forEach(enhanceSelect);
});

function enhanceSelect(select) {
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select';
  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);
  select.tabIndex = -1;
  select.setAttribute('aria-hidden', 'true');

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');

  const list = document.createElement('ul');
  list.className = 'custom-select-options';
  list.setAttribute('role', 'listbox');

  const placeholder = select.querySelector('option[value=""]');
  const items = [];

  Array.from(select.options).forEach(function (opt) {
    if (opt.value === '') return;
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.tabIndex = -1;
    li.dataset.value = opt.value;
    li.textContent = opt.textContent;
    li.addEventListener('click', function () { choose(li); });
    list.appendChild(li);
    items.push(li);
  });

  wrapper.append(trigger, list);

  function render() {
    const hasValue = select.value !== '';
    trigger.textContent = hasValue
      ? select.options[select.selectedIndex].textContent
      : (placeholder ? placeholder.textContent : 'Kies een optie');
    trigger.classList.toggle('is-placeholder', !hasValue);
    items.forEach(function (li) {
      const selected = li.dataset.value === select.value;
      li.classList.toggle('is-selected', selected);
      li.setAttribute('aria-selected', selected);
    });
  }

  function open() {
    wrapper.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    const current = items.find(li => li.classList.contains('is-selected')) || items[0];
    if (current) current.focus();
  }

  function close(returnFocus) {
    wrapper.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    if (returnFocus) trigger.focus();
  }

  function choose(li) {
    select.value = li.dataset.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    wrapper.classList.remove('is-invalid');
    render();
    close(true);
  }

  trigger.addEventListener('click', function () {
    wrapper.classList.contains('open') ? close(false) : open();
  });

  trigger.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      open();
    }
  });

  list.addEventListener('keydown', function (e) {
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[Math.min(i + 1, items.length - 1)].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[Math.max(i - 1, 0)].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (i > -1) choose(items[i]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close(true);
    } else if (e.key === 'Tab') {
      close(false);
    }
  });

  document.addEventListener('click', function (e) {
    if (!wrapper.contains(e.target)) close(false);
  });

  select.addEventListener('invalid', function () {
    wrapper.classList.add('is-invalid');
  });

  if (select.form) {
    select.form.addEventListener('reset', function () { setTimeout(render, 0); });
  }

  render();
}
