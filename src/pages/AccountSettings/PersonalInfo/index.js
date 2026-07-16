import React, { useState } from "react";
import cn from "classnames";
import styles from "./PersonalInfo.module.sass";
import { Link } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import TextArea from "../../../components/TextArea";
import Icon from "../../../components/Icon";
import Dropdown from "../../../components/Dropdown";
import { useSession } from "../../../features/session/SessionContext";

const optionsLocation = ["Location", "USA", "Russia"];
const optionsSpeak = ["English (United States)", "Russian", "Chinese"];

const PersonalInfo = () => {
  const [location, setLocation] = useState(optionsLocation[0]);
  const [speak, setSpeak] = useState(optionsSpeak[0]);
  const { user, updateProfile } = useSession();
  const [saved, setSaved] = useState(false);
  const saveProfile = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateProfile({
      displayName: form.get("display-name")?.trim() || user.displayName,
      realName: form.get("real-name")?.trim(),
      email: form.get("email")?.trim() || user.email,
      phone: form.get("phone")?.trim(),
      bio: form.get("bio")?.trim(),
      location,
      speak,
    });
    setSaved(true);
  };

  return (
    <form className={styles.section} onSubmit={saveProfile}>
      <div className={styles.head}>
        <div className={cn("h2", styles.title)}>Personal info</div>
        <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/profile"
        >
          View profile
        </Link>
      </div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.category}>Account info</div>
          <div className={styles.fieldset}>
            <div className={styles.row}>
              <div className={styles.col}>
                <TextInput
                  className={styles.field}
                  label="Display Name"
                  name="display-name"
                  type="text"
                  placeholder="Enter your display name"
                  defaultValue={user.displayName}
                  required
                />
              </div>
              <div className={styles.col}>
                <TextInput
                  className={styles.field}
                  label="real name"
                  name="real-name"
                  type="text"
                  placeholder="Enter your real name"
                  defaultValue={user.realName}
                  required
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <TextInput
                  className={styles.field}
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  defaultValue={user.phone}
                  required
                />
              </div>
              <div className={styles.col}>
                <TextInput
                  className={styles.field}
                  label="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user.email}
                  required
                />
              </div>
            </div>
            <TextArea
              className={styles.field}
              label="bio"
              name="bio"
              placeholder="About yourself in a few words"
              defaultValue={user.bio}
              required
            />
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.label}>lives in</div>
                <Dropdown
                  className={styles.dropdown}
                  value={location}
                  setValue={setLocation}
                  options={optionsLocation}
                />
              </div>
              <div className={styles.col}>
                <div className={styles.label}>speak</div>
                <Dropdown
                  className={styles.dropdown}
                  value={speak}
                  setValue={setSpeak}
                  options={optionsSpeak}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.category}>Social</div>
          <div className={styles.fieldset}>
            <div className={styles.row}>
              <div className={styles.col}>
                <TextInput
                  className={styles.field}
                  label="website"
                  name="site"
                  type="text"
                  placeholder="Your site URL"
                  required
                />
              </div>
              <div className={styles.col}>
                <TextInput
                  className={styles.field}
                  label="twitter"
                  name="twitter"
                  type="text"
                  placeholder="@twitter username"
                  required
                />
                <button
                  className={cn("button-stroke button-small", styles.button)}
                >
                  Verify account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <button className={cn("button", styles.button)} type="submit">Update profile</button>
        <button className={styles.clear} type="reset" onClick={() => setSaved(false)}>
          <Icon name="close" size="16" />
          Clear all
        </button>
        {saved && <span>Profile updated.</span>}
      </div>
    </form>
  );
};

export default PersonalInfo;
