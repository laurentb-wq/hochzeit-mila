"use client";
import { useState } from "react";
import ScrollIntro from "./ScrollIntro";
import FullPageLayout from "./FullPageLayout";

export default function PageWithIntro() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <ScrollIntro onDone={() => setIntroDone(true)} />}
      {introDone && <FullPageLayout />}
    </>
  );
}
