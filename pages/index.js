import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useQRCode } from "next-qrcode";
import { useRef, useEffect } from "react";
export default function Home({ data }) {
  const { Image } = useQRCode();
  const imgDivRef = useRef();
  useEffect(() => {
    const aTag = document.getElementsByTagName("a")[0];
    aTag.href = `${imgDivRef.current.children[0].src}`;
    aTag.download = data;
    aTag.click();
  }, [data, imgDivRef]);

  return (
    <>
      <div ref={imgDivRef}>
        <Image text={data}></Image>
      </div>
      <a href=""></a>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://54.180.115.105:8000/code");
  const data = await res.json();
  return { props: { data } };
}
