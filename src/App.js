import { useEffect, useState } from 'react';
import Form from './Form';
import Table from './Table';
import db from './firebase';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
const App = () => {
  const [user, setUser] = useState();
  const fetchPost = async () => {
    await getDocs(collection(db, 'reactformik')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUser(newData);
    });
  };
  useEffect(() => {
    fetchPost();
  }, [user]);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Form setUser={setUser} user={user} fetchPost={fetchPost} />
            }
          />
          <Route path="/details" element={<Table data={user} />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
