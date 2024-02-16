import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, Setlength] = useState(8);
  const [password, SetPassword] = useState("");
  const [checked, Setchecked] = useState(false);
  const [numberAllowed, SetnumberAllowed] = useState(false);
  const [btnClick, SetbtnClick] = useState(false);
  // making a ariable with useRef
  const passRef = useRef(null);

  // same type of code ko catch mai rkho
  const passwordSetter = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvWxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passlist = "";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (checked) {
      str += "!@#$%^&*()_?";
    }

    for (let i = 1; i <= length; i++) {
      let pass = Math.floor(Math.random() * str.length + 1); // received index
      passlist = passlist + str.charAt(pass);
    }
    SetPassword(passlist);
  }, [length, checked, numberAllowed, SetPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    SetbtnClick((pre) => !pre);
    passRef.current?.select(); // to select
    // passRef.current?.setSelectionRange(0,6);
    window.navigator.clipboard.writeText(password); // to copy
  }, [password]);

  useEffect(() => {
    passwordSetter();
  }, [numberAllowed, checked, length, passwordSetter]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            value={password}
            ref={passRef}
          />
          <button
            className={`outline-none ${
              btnClick ? "bg-red-700" : "bg-blue-700"
            } text-white px-3 py-0.5 shrink-0`}
            onClick={copyPasswordToClipBoard}
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => Setlength(e.target.value)}
              className="cursor-pointer"
            />
            <label>length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name="number"
              className="cursor-pointer"
              onChange={() => {
                SetnumberAllowed((pre) => !pre);
              }}
            />
            <label>Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                Setchecked((pre) => !pre);
              }}
            />
            <label>Special character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
