import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../stores/auth";
import QueryBuilder from "../utils/QueryBuilder";

export default function EditOrder() {
  const [order, setOrder] = useState([]);

  const navigate = useNavigate();
  const { orderId, deviceId } = useParams(); // Extract the orderId from the URL
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    async function getOrder(orderId, deviceId) {
      const query = new QueryBuilder("R", `/${deviceId}/${orderId}`);
      const pulledOrder = await query.execute();
      setOrder(pulledOrder);
    }

    getOrder(orderId, deviceId);
  }, []);

  function backToHome(event) {
    event.preventDefault();
    navigate("/", { replace: true });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submit");

    const query = new QueryBuilder("U", `/${deviceId}/${orderId}`);
  }

  console.log(order);
  return (
    <div>
      {user ? (
        <div className="min-h-screen">
          <button onClick={backToHome}>Back To Home!</button>
          <h1>
            Editing Order: {orderId} at device {deviceId}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-44">
              {/* <AddItem formData={formData} setFormData={setFormData} /> */}

              <button type="submit">Create Order!</button>
            </div>
          </form>
        </div>
      ) : (
        navigate("/Login", { replace: true })
      )}
    </div>
  );
}
