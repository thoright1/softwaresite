document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((question, index) => {
    const answer = question.nextElementSibling;
    const plus = question.querySelector('.faq-plus');

    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    question.setAttribute('aria-expanded', 'false');

    if (answer && answer.classList.contains('faq-answer')) {
      const answerId = answer.id || `faq-answer-${index + 1}`;
      answer.id = answerId;
      question.setAttribute('aria-controls', answerId);
      answer.hidden = true;
    }

    const toggle = () => {
      const hasAnswer = answer && answer.classList.contains('faq-answer');
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const willExpand = !isExpanded;

      question.setAttribute('aria-expanded', String(willExpand));
      question.classList.toggle('is-open', willExpand);

      if (hasAnswer) {
        answer.hidden = !willExpand;
        answer.classList.toggle('is-open', willExpand);
      }

      if (plus) {
        plus.textContent = willExpand ? '−' : '+';
      }
    };

    question.addEventListener('click', toggle);
    question.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
});
