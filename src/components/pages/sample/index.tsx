import styles from "./sample.module.scss";
import { useCallback, useEffect, useState } from "react";
import { requests } from "~/services/api/requests";
import Form from "react-bootstrap/Form";

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
    <Form className={styles.container}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  );
};

export default SamplePage;
