import React from "react";

import '../../styles/card.css';

export const Card = ({
  children,
}) => {
  const props = {
    children,
    className: "card"
  };

  return <div {...props} />;
};
