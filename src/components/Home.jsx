import femCoffee from "../assets/fem-coffee.jpg";
import femIcedCoffee from "../assets/fem-iced-coffee.jpg";
import femLatte from "../assets/fem-latte.jpg";
import femCapuccino from "../assets/fem-capuccino.jpg";
import femCoffeeMac from "../assets/fem-coffee-mac.jpg";
import "../App.css";
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
    <>
      <p className="font-size-button">
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
      <header>
        <h1>
          Our <span className="fancy-text">Coffee</span>
        </h1>
      </header>
      <section className="card-container">
        <article className="card">
          <h2>Coffee</h2>
          <div className="card-img">
            <img
              src={femCoffee}
              alt="Black coffee in a white cup and saucer."
            />
          </div>
          <p>
            Our coffee comes from mountainous terrain in Colombia. The beans are
            hand-picked, carefully sorted, and only the finest make it into our
            everyday single-source brew.
          </p>
          <p>
            <a href="#" className="button">
              Order Now
            </a>
          </p>
        </article>
        <article className="card">
          <h2>Iced Coffee</h2>
          <div className="card-img">
            <img
              src={femIcedCoffee}
              alt="Black coffee in a white cup and saucer."
            />
          </div>
          <p>
            Our iced coffee is cold-brewed overnight, then mixed to order with
            half-and-half, sugar, and plenty of ice.
          </p>
          <p>
            <a href="#" className="button">
              Order Now
            </a>
          </p>
        </article>
        <article className="card">
          <h2>Latte</h2>
          <div className="card-img">
            <img src={femLatte} alt="Black coffee in a white cup and saucer." />
          </div>
          <p>
            Combining our amazing espresso with plenty of hot, foamy milk, our
            lattes are the talk of the town. We offer a dozen different syrup
            flavors, including popular vanilla, cinnamon, and caramel.
          </p>
          <p>
            <a href="#" className="button">
              Order Now
            </a>
          </p>
        </article>
        <article className="card">
          <h2>Cappuccino</h2>
          <div className="card-img">
            <img
              src={femCapuccino}
              alt="Black coffee in a white cup and saucer."
            />
          </div>

          <p>
            Want an even balance of milk and espresso? Our cappuccino is for
            you. Ask for a sprinkle of cocoa powder, vanilla powder, or cinnamon
            on top for an extra flavor boost.
          </p>
          <p>
            <a href="#" className="button">
              Order Now
            </a>
          </p>
        </article>
        <article className="card">
          <h2>Macchiato</h2>
          <div className="card-img">
            <img
              src={femCoffeeMac}
              alt="Black coffee in a white cup and saucer."
            />
          </div>
          <p>
            A macchiato has only espresso and milk foam - even less milk than
            the cappuccino or latte.
          </p>
          <p>
            <a href="#" className="button">
              Order Now
            </a>
          </p>
        </article>
      </section>
    </>
  );
}

export default Home;
