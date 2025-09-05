export default function ContactPage() {
  return (
    <section className="contact-page container">
      <h1 className="title">Контакты</h1>
      <p className="contact-subtitle">
        Это учебный проект, выполненный в рамках курса <strong>"Веб-разработка, Batch 3.0"</strong>.
      </p>

      <div className="contact-info">
        <p>
          <b>Студент:</b> Қадыр Айжан Дәуреновна
        </p>
        <p>
          <b>Курс:</b> Веб-разработка (Batch 3.0)
        </p>
        <p>
          <b>Модуль:</b> React
        </p>
        <p>
          <b>Домашнее задание №15:</b> Индивидуальный проект по React
        </p>
        <p>
          <b>Почта:</b> <a href="mailto:aizhan.daurenkyzy@gmail.com">aizhan.daurenkyzy@gmail.com</a>
        </p>
        <p>
          <b>Телефон:</b> <a href="tel:+77076932539">+7 (707) 693-25-39</a>
        </p>
      </div>
    </section>
  );
}
