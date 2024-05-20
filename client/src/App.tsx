import { useEffect, useState } from "react";
import "./App.css";

type User = {
  _id: string;
  name: string;
  email: string;
};

type Marks = {
  _id: string;
  userId: User;
  subject: string;
  marks: number;
};

function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [marks, setMarks] = useState<number | "">("");
  const [marksData, setMarksData] = useState<Marks[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersRes = await fetch("http://localhost:3000/users");
        const usersData = await usersRes.json();
        setUsers(usersData.users);

        const marksRes = await fetch("http://localhost:3000/marks");
        const marksData = await marksRes.json();
        setMarksData(marksData.marks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.text();
      console.log(data);
      // Optionally, you can fetch the updated user list here
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleMarksSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/add-marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUserId, subject, marks }),
      });

      const data = await res.text();
      console.log(data);
      // Optionally, you can fetch the updated marks list here
    } catch (error) {
      console.error("Error adding marks:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "100px" }}>
        <form onSubmit={handleUserSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button style={{ marginTop: "20px" }} type="submit">
            Submit User
          </button>
        </form>

        <form style={{ marginTop: "100px" }} onSubmit={handleMarksSubmit}>
          <div>
            <label>User:</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <label>Marks:</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
            />
          </div>
          <button style={{ marginTop: "20px" }} type="submit">
            Submit Marks
          </button>
        </form>
      </div>

      <div>
        <h1>Users</h1>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} - {user.email}
          </p>
        ))}
      </div>

      <div>
        <h1>Marks</h1>
        {marksData.map((mark) => (
          <p key={mark._id}>
             {mark.subject} -{" "}
            {mark.marks}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
