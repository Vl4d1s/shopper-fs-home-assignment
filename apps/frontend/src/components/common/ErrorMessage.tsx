import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
}
