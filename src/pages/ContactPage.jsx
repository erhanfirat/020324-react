import { useEffect, useState } from "react";
import { Counter } from "../components/Counter";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const contactformDataInitial = {
  title: "",
  type: "",
  message: "",
  color: "",
  subscribeList: [],
};

const titleInputProps = {
  id: "contact-title",
  type: "text",
};

const colors = ["red", "green", "blue"];
const subscribeListValues = ["teknoloji", "sanat", "bilim", "siyaset", "müzik"];

export const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...contactformDataInitial,
    },
  });

  const postContactForm = (formData) => {
    // contact request
    axios
      .post("http://myweb.com/api/login", formData)
      .then((res) => {
        console.log(res);
        // todo: ana sayfaya yönlendir
      })
      .catch((err) => {
        console.error("AXIOS ERR: ", err);
      });
  };

  return (
    <div>
      <h1 className="sayfa-baslik">Contact Us!</h1>
      <hr />
      <div className="form-container">
        <div className="form-bg"></div>
        <form onSubmit={handleSubmit(postContactForm)}>
          <h2>Valid {!isValid && " Değil"}</h2>
          <div>
            <label htmlFor="contact-title">Başlık</label>
            <input
              {...titleInputProps}
              {...register("title", {
                required: "Bu alan zorunludur...",
                maxLength: {
                  value: 40,
                  message: "En fazla 40 karakter girilebilir",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message:
                    "Başlık alanına rakam veya özel karakter giremezsiniz",
                },
              })}
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="login-email">Tip</label>
            <select
              {...register("type", { required: "Bu alan zorunludur..." })}
            >
              <option disabled selected value={""}>
                Lütfen ileti tipi seçiniz...
              </option>
              <option>Şikayet</option>
              <option>Öneri</option>
              <option>Andaç</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message">Mesaj</label>
            <textarea
              id="contact-message"
              {...register("message", { required: "Bu alan zorunludur..." })}
            />
          </div>
          <div>
            <label htmlFor="contact-color">Renk</label>
            {colors.map((color) => (
              <div key={color}>
                <label htmlFor={"contact-" + color}>{color}</label>
                <input
                  id={"contact-" + color}
                  type="radio"
                  value={color}
                  name="color"
                  {...register("color")}
                />
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="contact-color">Renk</label>
            {subscribeListValues.map((subcribeVal) => (
              <div key={subcribeVal}>
                <label htmlFor={"contact-" + subcribeVal}>{subcribeVal}</label>
                <input
                  id={"contact-" + subcribeVal}
                  type="checkbox"
                  value={subcribeVal}
                  {...register("subscribeList")}
                />
              </div>
            ))}
          </div>
          <div>
            <label></label>
            <div>
              <button className="btn" type="submit" disabled={isValid}>
                Submit
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  toast.success("Form datası silinmiştir!");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
