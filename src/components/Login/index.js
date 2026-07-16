import React, { useState } from "react";
import cn from "classnames";
import styles from "./Login.module.sass";
import Icon from "../Icon";
import Form from "../Form";
import TextInput from "../TextInput";
import Radio from "../Radio";
import { useSession } from "../../features/session/SessionContext";

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [confirmPhone, setConfirmPhone] = useState(true);
  const { login } = useSession();

  const handleSubmit = (e) => {
    if (email.trim()) { login(email.trim()); onSuccess?.(); }
  };

  return (
    <div className={cn(styles.login)}>
      <div className={styles.item}>
        <div className={cn("h3", styles.title)}>Sign up on Fleet</div>
        <div className={styles.info}>Use Your OpenID to Sign up</div>
        <div className={styles.btns}>
          <button className={cn("button", styles.button)}>
            <Icon name="google" size="16" />
            <span>Google</span>
          </button>
          <button className={cn("button-black", styles.button)}>
            <Icon name="apple" size="16" />
            <span>Apple</span>
          </button>
        </div>
        <div className={styles.note}>Or continue with email</div>
        <Form
          className={styles.form}
          value={email}
          setValue={setEmail}
          onSubmit={() => handleSubmit()}
          placeholder="Enter your email"
          type="email"
          name="email"
          icon="arrow-next"
        />
        <div className={styles.foot}>
          Already have an account?{" "}
          <a className={styles.link} href="/#" rel="noopener noreferrer">
            Login
          </a>
        </div>
      </div>
      <div className={styles.item}>
        <div className={cn("h3", styles.title)}>Sign in</div>
        <form className={styles.form} onSubmit={(event) => { event.preventDefault(); login(email || "guest@fleet.travel"); onSuccess?.(); }}>
          <TextInput
            className={styles.field}
            name="password"
            type="password"
            placeholder="Password"
            required
            view
          />
          <button className={cn("button", styles.button)}>Login</button>
        </form>
        <div className={styles.foot}>
          <a className={styles.password} href="/#" rel="noopener noreferrer">
            Forgot password?
          </a>
        </div>
      </div>
      <div className={styles.item}>
        <div className={cn("h3", styles.title)}>
          Let’s confirm it’s really you
        </div>
        <div className={styles.info}>
          Help us secure your account. Please complete the verifications below
        </div>
        <form className={styles.form}>
          <div className={styles.variants}>
            <Radio
              className={styles.radio}
              name="confirm"
              value={confirmPhone}
              onChange={() => setConfirmPhone(true)}
              content="Get the code by text message (SM) at +1 234 567 890"
            />
            <Radio
              className={styles.radio}
              name="confirm"
              value={!confirmPhone}
              onChange={() => setConfirmPhone(false)}
              content="Get the code by email at tranm••••••••••••@gm•••.com"
            />
          </div>
          <button className={cn("button", styles.button)}>Continue</button>
        </form>
      </div>
      <div className={styles.item}>
        <div className={cn("h3", styles.title)}>Enter your security code</div>
        <div className={styles.info}>We texted your code to +1 234 567 890</div>
        <form className={styles.form}>
          <div className={styles.code}>
            <div className={styles.number}>
              <input type="tel" />
            </div>
            <div className={styles.number}>
              <input type="tel" />
            </div>
            <div className={styles.number}>
              <input type="tel" />
            </div>
            <div className={styles.number}>
              <input type="tel" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
