import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
} from "react";
import { FiCheck, FiClock, FiMail, FiMapPin, FiPhone, FiSend, FiUser } from "react-icons/fi";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Textarea from "../ui/Textarea/Textarea";
import Reveal from "../Reveal/Reveal";
import SectionDivider from "../SectionDivider/SectionDivider";
import { MESSAGE_MAX, validate, type FormValues } from "./validate";
import "./Contact.scss";

const SUBMIT_DELAY_MS = 900;
const initialValues: FormValues = { name: "", email: "", message: "" };

type Touched = Partial<Record<keyof FormValues, boolean>>;
type Status = "idle" | "sending" | "sent";

const info = [
  {
    icon: FiMail,
    label: "Email",
    value: "asrulrojin@gmail.com",
    href: "mailto:asrulrojin@gmail.com",
  },
  { icon: FiPhone, label: "Telepon", value: "+62 8810 1046 4853", href: "tel:+62881010464853" },
  {
    icon: FiMapPin,
    label: "Lokasi",
    value: "Jakarta, Indonesia",
    href: "https://www.google.com/maps/search/?api=1&query=Jakarta",
    external: true,
  },
  { icon: FiClock, label: "Jam operasional", value: "Senin–Jumat, 09.00–17.00 WIB" },
];

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Touched>({});
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);

  const errors = validate(values);
  const fieldError = (name: keyof FormValues) => (touched[name] ? errors[name] : undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof FormValues;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = (Object.keys(errors) as (keyof FormValues)[])[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    timer.current = window.setTimeout(() => setStatus("sent"), SUBMIT_DELAY_MS);
  };

  const handleReset = () => {
    setValues(initialValues);
    setTouched({});
    setStatus("idle");
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>Hubungi Kami</h2>
            <p>Ada pertanyaan soal paket atau fitur? Tulis pesan, kami balas secepatnya.</p>
          </div>
        </Reveal>

        <div className="contact__grid">
          <Reveal direction="left">
            <aside className="contact__aside">
              <h3>Ngobrol langsung dengan tim kami</h3>
              <p>Tanya soal paket, minta demo, atau ceritakan kebutuhan khusus bisnis kamu.</p>

              <ul className="contact__info">
                {info.map(({ icon: Icon, label, value, href, external }) => {
                  const content = (
                    <>
                      <span className="contact__icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <span>
                        <small>{label}</small>
                        <strong>{value}</strong>
                      </span>
                    </>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="contact__item"
                          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="contact__item">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="contact__reply">Rata-rata balasan kurang dari 24 jam kerja</p>
            </aside>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="contact__card">
              {status === "sent" ? (
                <div className="contact__success" role="status" tabIndex={-1} ref={successRef}>
                  <span className="contact__check">
                    <FiCheck aria-hidden="true" />
                  </span>
                  <h3>Pesan terkirim!</h3>
                  <p>
                    Terima kasih, {values.name}. Kami akan membalas ke{" "}
                    <strong>{values.email}</strong> secepatnya.
                  </p>
                  <Button variant="outline" onClick={handleReset}>
                    Kirim pesan lain
                  </Button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit} noValidate>
                  <div className="contact__form-head">
                    <h3>Kirim pesan</h3>
                    <p>Isi formulir di bawah, kami balas lewat email.</p>
                  </div>

                  <Input
                    label="Nama"
                    name="name"
                    autoComplete="name"
                    placeholder="Nama lengkap kamu"
                    leftIcon={<FiUser />}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={fieldError("name")}
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nama@email.com"
                    leftIcon={<FiMail />}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={fieldError("email")}
                  />

                  <Textarea
                    label="Pesan"
                    name="message"
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    placeholder="Ceritakan kebutuhan bisnis kamu..."
                    hint="Minimal 10 karakter"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={fieldError("message")}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={status === "sending"}
                    rightIcon={<FiSend />}
                  >
                    {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <SectionDivider tone="dark" flip />
    </section>
  );
}
