import { useState, useEffect } from "react";

function Home() {
  const [size, setSize] = useState(1);

  const handleSizeChange = (val) => {
    setSize((prevVal) => prevVal + val);
  };

  useEffect(() => {
    let root = document.documentElement;
    root.style.setProperty("--base-size", `${1.2 * size}rem`);
  }, [size]);

  return (
    <div>
      <p>
        <a
          href=""
          id="decrement-button"
          className="header-button"
          onClick={(event) => {
            event.preventDefault();
            if (size === 1) {
              return;
            }
            handleSizeChange(-1);
          }}
        >
          -
        </a>
        {size}x
        <a
          href=""
          id="increment-button"
          className="header-button"
          onClick={(event) => {
            event.preventDefault();
            if (size === 15) {
              return;
            }
            handleSizeChange(1);
          }}
        >
          +
        </a>
      </p>
      <div className="card-container">
        <article className="card">
          <h2>Coffee</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
            natus at magni soluta cum repellat earum ut! Officiis natus
            excepturi officia qui facilis dolores nam, placeat corrupti at
            quidem unde?
          </p>
        </article>
        <article className="card">
          <h2>Tea</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
            natus at magni soluta cum repellat earum ut! Officiis natus
            excepturi officia qui facilis dolores nam, placeat corrupti at
            quidem unde?
          </p>
        </article>
        <article className="card">
          <h2>Tea</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
            natus at magni soluta cum repellat earum ut! Officiis natus
            excepturi officia qui facilis dolores nam, placeat corrupti at
            quidem unde?
          </p>
        </article>
      </div>
    </div>
  );
}

export default Home;
