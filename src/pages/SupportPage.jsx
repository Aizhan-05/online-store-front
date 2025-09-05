import { useState } from "react";

export default function SupportPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const errorsObj = {};

    if (fullName.length === 0) {
      errorsObj.fullName = "Введите свое имя";
    }

    if (email.length === 0) {
      errorsObj.email = "Введите свою электронную почту";
    }

    if (text.length === 0) {
      errorsObj.text = "Введите ваше сообщение";
    }

    return errorsObj;
  }

  async function sendForm(e) {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:5173/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            text,
          }),
        });
        const data = await res.json();
        alert(data.message);
        setFullName("");
        setEmail("");
        setText("");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    setErrors(formErrors);
  }

  return (
    <section id="support">
      <h2 className="title">Служба поддержки</h2>
      <p className="support-text">
        Если у вас возникли трудности по работе сайта, сложности в оплате или есть вопрос, вы можете
        обратиться в службу поддержки, мы обязательно вам поможем.
      </p>
      <form className="support-form" onSubmit={e => sendForm(e)}>
        <div className="support-form__container">
          <div id="name-input" className="support-form__block">
            <label className="support-form__label">Имя</label>
            <input
              type="text"
              name="name"
              className={errors.fullName ? "support-form__input error" : "support-form__input"}
              placeholder="Введите ваше имя"
              value={fullName}
              onChange={event => setFullName(event.target.value)}
            />
            <span className="error-message">{errors.fullName}</span>
          </div>
          <div id="email-input" className="support-form__block">
            <label className="support-form__label">E-mail</label>
            <input
              type="email"
              name="email"
              className={errors.email ? "support-form__input error" : "support-form__input"}
              placeholder="Введите вашу почту"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <span className="error-message">{errors.email}</span>
          </div>
          <div id="message-input" className="support-form__block">
            <label className="support-form__label">Сообщение</label>
            <textarea
              className={errors.text ? "support-form__input error" : "support-form__input"}
              name="message"
              placeholder="Расскажите нам о возникшем вопросе"
              value={text}
              onChange={event => setText(event.target.value)}
            ></textarea>
            <span className="error-message">{errors.text}</span>
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="support-form__submit">
            Отправить
          </button>
          {isLoading && <div className="sm-loader"></div>}
        </div>
      </form>
    </section>
  );
}
