import fish from "~/assets/images/fish.png";
import cat from "~/assets/images/cat.jpg";
import lion from "~/assets/images/lion.svg";
import { ReactComponent as LionSVG } from "~/assets/images/lion.svg";
import styles from "./sample.module.scss";
import { useCallback, useEffect, useState } from "react";
import { requests } from "~/services/api/requests";

const SamplePage = () => {
  const [result, setResult] = useState<{ [k: string]: string } | null>(null);

  const handleFetch = useCallback(async () => {
    try {
      const { data: response } = await requests.getInventory();
      setResult(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await handleFetch();
    })();
  }, [handleFetch]);

  return (
    <div className={styles.container}>
      <h1>Sample Page</h1>
      <img src={fish} alt="fish" width={482} height={246} />
      <img src={cat} alt="fish" width={439} height={293} />
      <img src={lion} alt="lion" width={777} height={544} />
      <LionSVG />
      {JSON.stringify(result)}
    </div>
  );
};

export default SamplePage;
