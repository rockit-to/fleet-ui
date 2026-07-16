import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./ListYourProperty.module.sass";
import Control from "../../components/Control";
import Dropdown from "../../components/Dropdown";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import Loader from "../../components/Loader";
import Preview from "./Preview";
import { useBooking } from "../../features/stays";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "List your property",
  },
];

const bedRoomOptions = ["1", "2", "3", "4"];
const livingRoomOptions = ["1", "2", "3", "4"];
const kitchenOptions = ["1", "2", "3", "4"];
const unitsOptions = ["%", "$", "€"];
const currencyOptions = ["$ USD", "€ EUR"];
const timeOptions = ["per Night", "per Day", "per Week"];
const DRAFT_STORAGE_KEY = "fleet:stays:listing-draft";

function loadDraft() {
  try { return JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}"); } catch { return {}; }
}

const Upload = () => {
  const navigate = useNavigate();
  const { publishStay } = useBooking();
  const [bedRoom, setBedRoom] = useState(bedRoomOptions[0]);
  const [livingRoom, setLivingRoom] = useState(livingRoomOptions[0]);
  const [kitchen, setKitchen] = useState(kitchenOptions[0]);
  const [units, setUnits] = useState(unitsOptions[0]);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [time, setTime] = useState(timeOptions[0]);

  const [visiblePreview, setVisiblePreview] = useState(false);
  const [formError, setFormError] = useState("");
  const [draft, setDraft] = useState(loadDraft);
  const [saving, setSaving] = useState(false);
  const [imageData, setImageData] = useState(() => {
    try { return sessionStorage.getItem(DRAFT_STORAGE_KEY + ":image") ?? null; } catch { return null; }
  });
  const saveTimer = useRef();
  const fileInputRef = useRef();

  const previewItem = useMemo(() => {
    const priceNum = Number(draft.price) || 0;
    const discountNum = Number(draft.discount) || 0;
    const priceActual = draft.price ? `$${priceNum}` : "$0";
    const priceOld = discountNum > 0 ? `$${Math.round(priceNum * (1 + discountNum / 100))}` : "";
    const services = [draft.service1, draft.service2].filter(Boolean).map((title) => ({ title, icon: "check" }));
    return {
      title: draft.title || "Your property title",
      priceOld,
      priceActual,
      categoryText: discountNum > 0 ? `${discountNum}% off` : "new listing",
      rating: "New",
      reviews: "0",
      cost: "Preview",
      src: imageData || "/images/content/card-pic-1.jpg",
      srcSet: imageData ? imageData : "/images/content/card-pic-1@2x.jpg",
      url: "/list-your-property",
      options: services,
    };
  }, [draft, imageData]);

  useEffect(() => () => clearTimeout(saveTimer.current), []);
  const saveDraft = (form) => {
    const nextDraft = Object.fromEntries(new FormData(form).entries());
    setDraft(nextDraft);
    setSaving(true);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try { sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(nextDraft)); } catch {}
      setSaving(false);
    }, 350);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImageData(dataUrl);
      if (dataUrl) {
        try { sessionStorage.setItem(DRAFT_STORAGE_KEY + ":image", dataUrl); } catch {}
      }
    };
    reader.readAsDataURL(file);
  };

  const toStay = (formData) => {
    const services = ["service1", "service2", "service3", "service4", "service5", "service6"]
      .map((name) => formData.get(name)?.trim())
      .filter(Boolean)
      .map((title) => ({ title, icon: "check" }));
    return {
      title: formData.get("title")?.trim(),
      priceActual: `$${formData.get("price")?.trim()}`,
      location: formData.get("location")?.trim(),
      description: formData.get("description")?.trim(),
      bedRoom: bedRoom,
      livingRoom: livingRoom,
      kitchen: kitchen,
      options: services,
      image: imageData,
    };
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const draft = toStay(new FormData(event.currentTarget));
    if (!draft.title || !draft.location || !Number(formDataPrice(draft.priceActual))) {
      setFormError("Add a title, a valid nightly price, and a location before publishing.");
      return;
    }
    const published = publishStay(draft);
    clearTimeout(saveTimer.current);
    sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    sessionStorage.removeItem(DRAFT_STORAGE_KEY + ":image");
    navigate(`/stays-product/${published.id}`);
  };
  const formDataPrice = (price) => price.replace(/[^0-9.]/g, "");

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <Control
            className={styles.control}
            urlHome="/"
            breadcrumbs={breadcrumbs}
          />
          <div className={styles.inner}>
            <div className={styles.wrapper}>
              <div className={styles.head}>
                <div className={cn("h2", styles.title)}>List your property</div>
                <button
                  className={cn("button-stroke button-small", styles.button)}
                >
                  Switch to experience
                </button>
              </div>
              <form className={styles.form} onSubmit={handleSubmit} onInput={(event) => saveDraft(event.currentTarget)}>
                <div className={styles.list}>
                  <div className={styles.item}>
                    <div className={styles.category}>Upload photos</div>
                    <div className={styles.note}>
                      Drag or choose your file to upload
                    </div>
                    <div className={styles.file}>
                      <input className={styles.load} type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
                      <div className={styles.icon}>
                        <Icon name="upload-file" size="24" />
                      </div>
                      <div className={styles.format}>
                        PNG, GIF, WEBP, MP4. Max 500Mb.
                      </div>
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.category}>Property details</div>
                    <div className={styles.fieldset}>
                      <TextInput
                        className={styles.field}
                        label="Title"
                        name="title"
                        type="text"
                        defaultValue={draft.title}
                        placeholder='e. g. "Spectacular views of Queenstown"'
                        required
                      />
                      <div className={styles.row}>
                        <div className={cn(styles.col, styles.w70)}>
                          <div className={styles.label}>price</div>
                          <div className={styles.line}>
                            <div className={styles.cell}>
                              <TextInput
                                className={styles.field}
                                name="price"
                                type="text"
                                defaultValue={draft.price}
                                placeholder='e. g. "180"'
                                required
                                empty
                              />
                            </div>
                            <div className={styles.cell}>
                              <Dropdown
                                className={styles.dropdown}
                                value={currency}
                                setValue={setCurrency}
                                options={currencyOptions}
                                empty
                              />
                            </div>
                            <div className={styles.cell}>
                              <Dropdown
                                className={styles.dropdown}
                                value={time}
                                setValue={setTime}
                                options={timeOptions}
                                empty
                              />
                            </div>
                          </div>
                        </div>
                        <div className={cn(styles.col, styles.w30)}>
                          <div className={styles.label}>Discount</div>
                          <div className={styles.line}>
                            <div className={styles.cell}>
                              <TextInput
                                className={styles.field}
                                name="discount"
                                type="text"
                                placeholder='e. g. "10"'
                                required
                                empty
                              />
                            </div>
                            <div className={styles.cell}>
                              <Dropdown
                                className={styles.dropdown}
                                value={units}
                                setValue={setUnits}
                                options={unitsOptions}
                                empty
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.box}>
                        <TextInput
                          className={styles.field}
                          label="location"
                          name="location"
                          type="text"
                          defaultValue={draft.location}
                          placeholder="e. g. “Queenstown, Otago, New Zealand”"
                          required
                        />
                        <button className={styles.map}>Google map</button>
                      </div>
                      <div className={styles.row}>
                        <div className={cn(styles.col, styles.w33)}>
                          <div className={styles.label}>bed room</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={bedRoom}
                            setValue={setBedRoom}
                            options={bedRoomOptions}
                          />
                        </div>
                        <div className={cn(styles.col, styles.w33)}>
                          <div className={styles.label}>living room</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={livingRoom}
                            setValue={setLivingRoom}
                            options={livingRoomOptions}
                          />
                        </div>
                        <div className={cn(styles.col, styles.w33)}>
                          <div className={styles.label}>kitchen</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={kitchen}
                            setValue={setKitchen}
                            options={kitchenOptions}
                          />
                        </div>
                      </div>
                      <TextArea
                        className={styles.field}
                        label="description"
                        name="description"
                        defaultValue={draft.description}
                        placeholder='e. g. "Spectacular views of Queenstown"'
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.category}>Amenities</div>
                    <div className={styles.row}>
                      <div className={cn(styles.col, styles.w50)}>
                        <TextInput
                          className={styles.field}
                          name="service1"
                          type="text"
                          placeholder="e. g. Wifi 24/7"
                          required
                        />
                      </div>
                      <div className={cn(styles.col, styles.w50)}>
                        <TextInput
                          className={styles.field}
                          name="service2"
                          type="text"
                          placeholder="e. g. Wifi 24/7"
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={cn(styles.col, styles.w50)}>
                        <TextInput
                          className={styles.field}
                          name="service3"
                          type="text"
                          placeholder="e. g. Wifi 24/7"
                          required
                        />
                      </div>
                      <div className={cn(styles.col, styles.w50)}>
                        <TextInput
                          className={styles.field}
                          name="service4"
                          type="text"
                          placeholder="e. g. Wifi 24/7"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.category}>Core features</div>
                    <div className={styles.row}>
                      <div className={cn(styles.col, styles.w50)}>
                        <TextInput
                          className={styles.field}
                          name="service5"
                          type="text"
                          placeholder="e. g. Wifi 24/7"
                          required
                        />
                      </div>
                      <div className={cn(styles.col, styles.w50)}>
                        <TextInput
                          className={styles.field}
                          name="service6"
                          type="text"
                          placeholder="e. g. Wifi 24/7"
                          required
                        />
                      </div>
                    </div>
                    <button className={cn("button-stroke", styles.button)}>
                      <Icon name="plus" size="16" />
                      <span>Add more feature</span>
                    </button>
                  </div>
                </div>
                <div className={styles.foot}>
                  <button
                    className={cn("button-stroke tablet-show", styles.button)}
                    onClick={() => setVisiblePreview(true)}
                    type="button"
                  >
                    Preview
                  </button>
                  <button className={cn("button", styles.button)} type="submit">
                    <span>Submit for review</span>
                    <Icon name="arrow-next" size="10" />
                  </button>
                  {formError && <div className={styles.saving}>{formError}</div>}
                  <div className={styles.saving}>
                    <span>{saving ? "Saving…" : Object.keys(draft).length ? "Draft saved" : "Changes save automatically"}</span>
                    {saving && <Loader className={styles.loader} />}
                  </div>
                </div>
              </form>
            </div>
            <Preview
              className={cn(styles.preview, {
                [styles.active]: visiblePreview,
              })}
              onClose={() => setVisiblePreview(false)}
              item={previewItem}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
