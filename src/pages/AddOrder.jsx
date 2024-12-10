import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/auth";
import AddItem from "../components/addItem";
import Order from "../utils/OrderFactory";
import QueryBuilder from "../utils/QueryBuilder";

export default function AddOrder() {
  const [formData, setFormData] = useState({
    deviceId: "",
    customer: "",
    menuItems: [],
  });
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  function backToHome(event) {
    event.preventDefault();
    navigate("/", { replace: true });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validate()) {
      const order = new Order(
        formData.deviceId,
        formData.customer,
        formData.menuItems
      );

      const query = new QueryBuilder(
        "C",
        `/${formData.deviceId}/${order.orderId}`,
        order
      );
      query.execute();
      navigate("/", { replace: true });
    }

    console.log("missing fields!");
  }

  function validate() {
    if (
      formData.customer == "" ||
      formData.deviceId == "" ||
      formData.menuItems.length == 0
    ) {
      return false;
    }
    return true;
  }

  return (
    <div>
      {user && (
        <div className="min-h-screen">
          <button onClick={backToHome}>Back To Home!</button>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-44">
              <input
                className="input"
                type="text"
                placeholder="Device ID (BrightSign)"
                name="deviceId"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <br />
              <input
                className="input"
                type="text"
                placeholder="Customer Display Name"
                name="customer"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <AddItem formData={formData} setFormData={setFormData} />
              <button type="submit">Create Order!</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
