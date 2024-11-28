// renderComponentToHtml.js
import React from "react";
import ReactDOMServer from "react-dom/server";
import EmailTemplate from "./EmailTemplate";

const renderComponentToHtml = (name) => {
  return ReactDOMServer.renderToStaticMarkup(<EmailTemplate name={name} />);
};

export default renderComponentToHtml;
