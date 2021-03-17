// import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import { Accordion, Card } from "react-bootstrap";

function App() {
  const [orderData, setOrderData] = useState([]);
  const getOrderData = async () => {
    const response = await axios.get(`https://run.mocky.io/v3/1acb6b7d-af22-46ab-9b63-4582813ad7e6`);
    if (response.data.code === 200) {
      let data = response.data.result;
      console.log(data)
      let group = data.reduce((items, currentItem) => {
        items[currentItem.shipping_name] = [...items[currentItem.shipping_name] || [], currentItem];
        return items;
      }, {});
      setOrderData(group);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const renderAccordion = (shippinName, orders) => {
    return (
      <>
        <Accordion key={shippinName}>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={orders}>
              {shippinName} <i>+</i>
            </Accordion.Toggle>
            {orders.map((order) =>
              <Accordion.Collapse eventKey={orders}>
                <Card.Body key={order.order_id}>
                  <div>{`${order.order_id}`}</div>
                  <div>{`${order.customer_email}`}</div>
                  <hr
                    style={{
                      color: "grey",
                      backgroundColor: "grey",
                      height: 2
                    }}
                  />
                </Card.Body>
              </Accordion.Collapse>
            )}
          </Card>
        </Accordion>
      </>
    );
  };
  console.log(orderData)
  return (
    <div className="App">
      <h1 style={{ display: "flex", justifyContent: "center" }}>Orders</h1>
      {Object.keys(orderData).map((keyName) => {
        return (
          <>
            {renderAccordion(keyName, orderData[keyName])}
          </>
        )
      })}
    </div>
  );
}

export default App;
