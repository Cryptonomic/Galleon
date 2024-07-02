import * as React from "react";

const loader = require('../assets/loader.png').default;

function Loader() {
  return (
    <>
      <div className="w-11 h-11 m-auto">
        <img
          src={loader}
          alt="loading-gif"
          className="animate-spin w-full h-full"
        />
      </div>
      <p className='font-light text-center'> In Progress... </p>
    </>
  );
}

export default Loader;