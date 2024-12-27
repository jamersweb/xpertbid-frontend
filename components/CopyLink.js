import React from "react";

const CopyLink = ({ productId }) => {
  const handleCopyLink = () => {
    const productUrl = `http://localhost:3000/product/${productId}`;
    navigator.clipboard.writeText(productUrl).then(() => {
      alert("Product link copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy link: ", err);
    });
  };

  return (
    <button onClick={handleCopyLink}>Copy Product Link</button>
  );
};

export default CopyLink;
