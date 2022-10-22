import "./Index.css";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [work, setWork] = useState("");
  const [age, setAge] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    axios
      .get("/getall")
      .then((response) => setUsers(response.data))
      .catch((e) => console.log(e));
  }, []);

  const handleSearch = () => {
    axios
      .get(`/search?name=${name}&family=${family}&age=${age}&work=${work}`)
      .then((response) => setUsers(response.data))
      .catch((e) => console.log(e));
  };

  const clickHande = () => {
    handleSearch();
    setPageNumber(0);
  };

  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className="user">
          <ul className="list">
            <li>نام:{user.name}</li>
            <li>نام خانوادگی:{user.family}</li>
            <li>سن:{user.age}</li>
            <li>شغل:{user.work}</li>
          </ul>
          <img src={user.profile_image} />
        </div>
      );
    });

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      <div className="main">
        <div className="all_inputs">
          <div id="container"></div>
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            name="family"
            type="text"
            placeholder="Family"
            onChange={(e) => setFamily(e.target.value)}
          />
          <input
            name="age"
            type="text"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            name="work"
            type="text"
            placeholder="Work"
            onChange={(e) => setWork(e.target.value)}
          />
        </div>
        <input
          type="submit"
          placeholder="Search"
          value="search"
          onClick={clickHande}
        />
      </div>

      {displayUsers}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        breakLabel="..."
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default App;
