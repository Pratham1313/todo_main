import { useState } from "react";
import "./styles.css";

export default function App() {
  const [items, setitems] = useState([]);

  function done_task(id) {
    setitems((items) =>
      items.map((item) =>
        item.description === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handle_list(item) {
    setitems((items) => [...items, item]);
  }

  function delete_list(id) {
    setitems((items) => items.filter((item) => item.description !== id));
  }

  function clear_all() {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) setitems([]);
  }
  return (
    <div className="App">
      <Header />
      <Forumm add_new={handle_list} />
      <Packinglist
        item={items}
        delete_list={delete_list}
        done_task={done_task}
        clear_all={clear_all}
        items={items}
      />
    </div>
  );
}
function Header() {
  return (
    <div className="head">
      <p>
        <span>To</span>Do List
      </p>
    </div>
  );
}

function Forumm({ add_new }) {
  const [description, setdescriotion] = useState("");
  const [quantity, setquantity] = useState(1);

  var sss = [];
  for (var i = 1; i <= 20; i++) {
    sss.push(i);
  }
  function handle_submit(e) {
    e.preventDefault(); /*stops from reloading page */
    if (!description) return;

    let packed = false;
    const list = { description, quantity, packed };
    console.log(list);
    add_new(list);
    setdescriotion("");
    setquantity(1);
  }
  return (
    <div>
      <form className="add-form" onSubmit={handle_submit}>
        {/* to dont reload after submiting form*/}
        <select
          value={quantity}
          onChange={(e) => setquantity(Number(e.target.value))}
        >
          {sss.map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="enter item"
          value={description}
          onChange={(e) => {
            setdescriotion(e.target.value);
          }}
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}

function Packinglist({ item, delete_list, done_task, clear_all, items }) {
  const [sortby, setsortby] = useState("input");
  const sorted_item = item;

  if (sortby === "input") {
    item = sorted_item;
  } else if (sortby === "description") {
    item = sorted_item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortby === "completed") {
    item = sorted_item
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  const numtask = items.length;
  const donetask = items.filter((item) => item.packed).length;
  const percenttask = (donetask / numtask) * 100;
  return (
    <main className="hello">
      <select value={sortby} onChange={(e) => setsortby(e.target.value)}>
        <option value="input">sort by input</option>
        <option value="description">sort by description</option>
        <option value="completed">sort by completed</option>
      </select>
      {item.length > 0 ? (
        <button className="clear_but" onClick={clear_all}>
          Clear
        </button>
      ) : null}
      {items.length === 0 ? (
        <p className="stats">Add Tasks</p>
      ) : (
        <p className="stats">
          {percenttask === 100
            ? "Great completed all tasks"
            : `${donetask} of ${numtask} task completed~~${percenttask}%`}
        </p>
      )}
      <ul>
        {item.map((item) => (
          <Item
            item={item}
            delete_list={delete_list}
            done_task={done_task}
            key={item.description}
          />
        ))}
      </ul>
      ;
    </main>
  );
}

function Item({ item, delete_list, done_task }) {
  return (
    <li>
      <input type="checkbox" onClick={() => done_task(item.description)} />
      <p style={item.packed ? { textDecoration: "line-through" } : null}>
        {item.quantity}--{item.description}
      </p>
      <button onClick={() => delete_list(item.description)}>x</button>
    </li>
  );
}
