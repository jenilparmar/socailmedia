import React, { useEffect, useState } from "react";

import { ReactComponent as InfinityIcon } from "./infinity.svg"; // Import the updated SVG


export default function Inbox() {

  return (
    <div className="containerInbox w-80 h-fit bg-black fixed right-0 flex flex-col justify-between gap-0">
      <h3 className="text-white font-semibold mx-0">Comments</h3>
      <div className="infinity-container relative top-32 w-12 left-36">
        <InfinityIcon /> 
      </div>
    </div>
  );
}
