import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import useAuthStore from "../stores/auth";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import QueryBuilder from "../utils/QueryBuilder";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const auth = useAuth();
  const navigate = useNavigate();

  const deviceId = new URLSearchParams(window.location.search).get("deviceId");

  useEffect(() => {
    async function getAllOrders() {
      const query = new QueryBuilder("R", `/${deviceId}`, null);
      const returnedOrders = await query.execute();
      const sortedOrdersAsc = returnedOrders.sort(
        (a, b) => new Date(a.orderTime) - new Date(b.orderTime)
      );

      setOrders(sortedOrdersAsc); // Fallback to an empty array if null
    }

    getAllOrders();
  }, []);

  /**
   * Signs the user out
   */
  function handleSignOut() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/Login", { replace: true });
      })
      .catch((error) => {
        alert(error);
      });
  }

  function redirectToNewOrder(event) {
    event.preventDefault();
    navigate("/NewOrder", { replace: true });
  }

  function redirectOrder(orderId, deviceId) {
    // navigate(`${deviceId}/orders/${orderId}`, { replace: true });
  }

  function deleteOrder(order, event) {
    event.preventDefault();
    const query = new QueryBuilder("D", `/${order.deviceId}/${order.orderId}`);
    query.execute().then(() => {
      // Remove the order from the state (which forces a re-render)
      setOrders((prevOrders) =>
        prevOrders.filter((o) => o.orderId !== order.orderId)
      );
    });
  }

  const formatTime = (epoch) => {
    const date = new Date(epoch * 1000); // Convert epoch to Date object

    // Get hours and minutes with leading zeros if necessary
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    // Get month, day, and year with leading zeros for month and day
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }-${year}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedTime} on ${formattedDate}`;
  };

  return (
    <div>
      {user && (
        <div>
          <button className="text-3xl font-bold" onClick={handleSignOut}>
            Sign Out
          </button>
          {orders ? (
            <div>
              {orders.map((order, id) => (
                <div key={id}>
                  <p>
                    <span
                      onClick={() =>
                        redirectOrder(order.orderId, order.deviceId)
                      }
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      {order.orderId}
                    </span>
                    - <strong>{order.customer}</strong>- Ordered at:
                    {formatTime(order.orderTime)} -
                    <button onClick={(event) => deleteOrder(order, event)}>
                      Delete
                    </button>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <h1>Orders is null :/</h1>
          )}

          <button onClick={redirectToNewOrder}>Create new order!</button>
        </div>
      )}
    </div>
  );
}
