import {
  limitToFirst,
  onChildAdded,
  onChildRemoved,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";
import { initializeFirebase } from "../../deps/build/firebase";

const addData = async () => {
  await fetch("http://127.0.0.1:5001/demo-project-id/us-central1/addData", {
    method: "POST",
  });
};

export default function Home() {
  const { rtdb } = initializeFirebase();
  const [data, setData] = useState<string[]>([]);

  const conversationsQuery = query(
    ref(rtdb, "data"),
    limitToFirst(5),
    orderByChild("updatedAt")
  );

  useEffect(() => {
    const onChildAddedUnsubscribe = onChildAdded(conversationsQuery, (data) => {
      console.log("added");
      setData((prev) => [...prev, data.key as string]);
    });

    const onChildRemovedUnsubscribe = onChildRemoved(
      conversationsQuery,
      (data) => {
        console.log("removed");
        setData((prev) => prev.filter((id) => id !== data.key));
      }
    );

    return () => {
      setData([]);
      onChildAddedUnsubscribe();
      onChildRemovedUnsubscribe();
    };
  }, []);

  console.log(data);

  return (
    <>
      <button
        style={{ width: "200px", padding: "10px" }}
        onClick={() => addData()}
      >
        Add Data!
      </button>
    </>
  );
}
