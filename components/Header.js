import { Fragment, useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRefresh } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

const Header = ({ update, reset }) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/SearchUser/", {
      method: "POST",
      body: JSON.stringify(searchText),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { characters, error } = await res.json();
    if (res.status === 200) {
      update(characters);
    } else if (res.status === 404) {
      swal(
        "Character Not Found",
        "The requested character was not found on this server",
        "error"
      );
    } else if (res.status === 500) {
      swal(
        "Internal Server Error",
        "There was a problem while fetching your request, kindly try again later.",
        "error"
      );
    }
  };

  const handleReset = () => {
    setSearchText("");
    reset();
  };

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content="This is the Header." />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
      </Head>
      <main>
        <div className="w-100 row p-0 m-0">
          <div className="col-md-12 bg-dark d-flex align-items-center justify-content-between p-3 m-0 mx-auto">
            <h3 className="text-warning text-shadow fw-bold">
              Rick and Morty Api for Kings.
            </h3>
            <form className="p-2 d-flex align-items-center justify-content-center">
              <input
                type="text"
                name="searchtext"
                className="form-control"
                placeholder="Search here"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <span
                onClick={handleSubmit}
                className={`btn btn-sm btn-success m-2 d-flex align-items-center justify-content-center ${
                  !searchText && "disabled"
                }`}
                style={{
                  cursor: `${
                    searchText.length > 0 ? "pointer" : "not-allowed !important"
                  }`,
                }}
              >
                Search
                <FontAwesomeIcon
                  role="button"
                  icon={faSearch}
                  className="ms-1"
                />
              </span>
              <span
                onClick={handleReset}
                className={`btn btn-sm btn-danger m-2 d-flex align-items-center justify-content-center ${
                  !searchText && "disabled"
                }`}
                style={{
                  cursor: `${
                    searchText.length > 0 ? "pointer" : "not-allowed !important"
                  }`,
                }}
              >
                Reset
                <FontAwesomeIcon
                  role="button"
                  icon={faRefresh}
                  className="ms-1"
                />
              </span>
            </form>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Header;
