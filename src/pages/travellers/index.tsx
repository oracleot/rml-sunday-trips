import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/BookTrip.module.css";
import blueBus from "../../../public/blue-bus.svg";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import React from "react";
import Button from "@/components/Button";

interface Traveller {
  id: string;
  family_name: string;
  address_line_1: string;
  post_code: string;
  contact_no: string;
}

interface TravellersProps {
  travellers: Traveller[];
}

export default function Travellers({ travellers }: TravellersProps) {
  const getDirections = (addressLine1: string, postCode: string) => {
    //handle get directions
    window.open(
      `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${addressLine1}, ${postCode}`
    );
  };
  return (
    <>
      <Head>
        <title>RML Sunday Trips | Book Trip</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container min-full-height white-wrapper">
        <Link href="/">
          <Image src={blueBus} alt="Bus Image" className={styles.busImg} />
        </Link>
        <h1 className={`secondary-text my-min`}>Travellers</h1>
        <ul>
          {travellers.map((traveller: Traveller) => (
            <React.Fragment key={traveller.id}>
              <li
                className="my-min"
                style={{
                  listStyle: "none",
                  padding: 15,
                  border: "solid thin",
                  borderRadius: 5,
                }}
              >
                <p>
                  <strong>{traveller.family_name} family</strong>
                </p>
                <p>
                  {traveller.address_line_1}
                  {", "}
                  {traveller.post_code}
                </p>
                <p className="my-min">
                  <Button
                    variant="primary"
                    btnText="Directions ????"
                    handleClick={() =>
                      getDirections(
                        traveller.address_line_1,
                        traveller.post_code
                      )
                    }
                  />{" "}
                  <Link href={`tel:${traveller.contact_no}`}>
                    <Button variant="secondary" btnText="Call ????????" />
                  </Link>
                </p>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("travellers").select();
  return {
    props: {
      travellers: data,
    },
  };
}
