import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/BookTrip.module.css";
import blueBus from "../../../public/blue-bus.svg";
import Button from "@/components/Button";
import { FormEvent } from "react";
import { useRouter } from "next/router";

export default function BookTrip() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const { familyName, addressLine1, postCode, contactNo, numberOfPeople } =
      event.currentTarget;

    const data = {
      familyName: familyName.value,
      addressLine1: addressLine1.value,
      postCode: postCode.value,
      contactNo: contactNo.value,
      numberOfPeople: numberOfPeople.value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("/api/book-trip", options);
      const result = await response.json();
      const { data, error } = result;
      if (Object.keys(error).length > 0) {
        setError(error);
        setLoading(false);
      }
      if (Object.keys(data).length > 0) {
        setSuccess(data.message);
      }
    } catch (err) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        if (error) {
          setError("");
        } else {
          setSuccess("");
          router.push("/booking-successful");
        }
      }, 2000);
    }
  }, [error, success]);

  return (
    <>
      <Head>
        <title>RML Sunday Trips | Book Trip</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container white-wrapper text-center flex flex-col justify-content-center align-items-center">
        <Image src={blueBus} alt="Bus Image" className={styles.busImg} />
        <h1 className={`${styles.h1} primary-text`}>Your Details</h1>
        <div className={styles.hr}></div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="familyName">
              Family Name
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="familyName"
              name="familyName"
              placeholder="Ayeni"
              required
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="addressLine1">
              Address Line 1
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="addressLine1"
              name="addressLine1"
              placeholder="99 Drylaw Place"
              required
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="postCode">
              Post Code
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="postCode"
              name="postCode"
              placeholder="EH45 3DT"
              required
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="contactNo">
              Contact No
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="contactNo"
              name="contactNo"
              placeholder="07003000001"
              required
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.label} htmlFor="numberOfPeople">
              Number of people joining
              <small className={styles.labelHint}>
                excluding kids under the age of 16
              </small>
            </label>
            <input
              className={styles.inputField}
              type="number"
              id="numberOfPeople"
              name="numberOfPeople"
              required
            />
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: "600",
              color: "red",
              marginBottom: 5,
            }}
          >
            {error && error}
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: "600",
              color: "green",
              marginBottom: 5,
            }}
          >
            {success && success}
          </p>
          <Button
            type="submit"
            btnText={loading ? "Please wait..." : "Submit"}
            variant="primary"
          />
        </form>
      </main>
    </>
  );
}
