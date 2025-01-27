import React from "react";

interface HelloWorldProps {
  name?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name = "World" }) => {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Hello, {name}!</h1>
    </div>
  );
};

export default HelloWorld;
