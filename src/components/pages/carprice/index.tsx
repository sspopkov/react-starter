import styles from "./sample.module.scss";
import { useCallback, useEffect, useState } from "react";
import { requests } from "~/services/api/requests";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";

const SamplePage = () => {
  const [result, setResult] = useState<{ [k: string]: string } | null>(null);
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [voleng, setVoleng] = useState(0);
  const [fuel, setFuel] = useState("");
  const [show, setShow] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { data: response } = await requests.getInventory({
          mark,
          model,
          year,
          mileage,
          voleng,
          fuel,
        });
        setResult(response);
      } catch (error) {
        console.log(error);
        setShow((error as any).toString());
        console.error(error);
      }
    },
    [mark, model, year, mileage, voleng],
  );

  return (
    <Form className={styles.container} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Mark</Form.Label>
        <Form.Control
          value={mark}
          required
          type="text"
          onChange={(e) => setMark(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Model</Form.Label>
        <Form.Control
          value={model}
          required
          type="text"
          onChange={(e) => setModel(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Year</Form.Label>
        <Form.Control
          value={year}
          required
          type="number"
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mileage</Form.Label>
        <Form.Control
          value={mileage}
          required
          type="number"
          onChange={(e) => setMileage(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Voleng</Form.Label>
        <Form.Control
          value={voleng}
          required
          type="number"
          onChange={(e) => setVoleng(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Fuel</Form.Label>
        <Form.Control
          value={fuel}
          required
          type="text"
          onChange={(e) => setFuel(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button type="submit">Отправить</Button>
      </Form.Group>
      {show && (
        <Alert variant="danger" onClose={() => setShow("")} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{show}</p>
        </Alert>
      )}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Score:</Accordion.Header>
          {result && <Accordion.Body>{JSON.stringify(result)}</Accordion.Body>}
        </Accordion.Item>
      </Accordion>
    </Form>
  );
};

export default SamplePage;
